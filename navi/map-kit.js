// map-kit.js — 지도 그리기 어댑터 (카카오 지도 SDK / Leaflet)
// 투어가 meta.mapMode: 'kakao-sdk'이고 env.js(window.TOUR_ENV.KAKAO_JS_KEY)에 키가 있으면 카카오 지도 SDK를,
// 아니면 Leaflet(OSM 타일)로 그린다. env.js는 tools/build_env.py가 .env에서 만든다.
// v3-flex.js는 이 공통 함수들만 쓴다: create · line · dot · remove · fit · onClick · relayout · destroy
(function () {
  'use strict';

  function dotEl({ label, color, size, title, onClick }) {
    const el = document.createElement('div');
    el.className = 'map-dot';
    el.textContent = label;
    if (title) el.title = title;
    el.style.cssText = `background:${color};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.46)}px;`
      + (onClick ? 'cursor:pointer;' : '');
    if (onClick) el.addEventListener('click', (e) => { e.stopPropagation(); onClick(); });
    return el;
  }

  // ====== Leaflet (OSM 타일) ======
  const leafletKit = {
    name: 'leaflet',
    credit: '지도 © OpenStreetMap',
    create(el, { interactive }) {
      const map = L.map(el, interactive
        ? { zoomControl: true, zoomSnap: 0.25 }
        : { zoomControl: false, dragging: false, scrollWheelZoom: false, touchZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, zoomSnap: 0.25 });
      if (!interactive) map.attributionControl.setPrefix(false);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
      return map;
    },
    line(map, pts, o) {
      return L.polyline(pts, { color: o.color, weight: o.weight, opacity: o.opacity, dashArray: o.dashed ? '2 9' : null }).addTo(map);
    },
    dot(map, [lat, lon], o) {
      const el = dotEl(o);
      return L.marker([lat, lon], {
        icon: L.divIcon({ className: 'map-dot-wrap', html: el, iconSize: [o.size, o.size], iconAnchor: [o.size / 2, o.size / 2] }),
        interactive: !!o.onClick,
      }).addTo(map);
    },
    remove(map, layer) { map.removeLayer(layer); },
    fit(map, pts, pad) {
      if (pts.length === 1) map.setView(pts[0], 16);
      else map.fitBounds(L.latLngBounds(pts), { padding: [pad, pad], maxZoom: 17 });
    },
    onClick(map, fn) { map.on('click', fn); },
    relayout(map) { map.invalidateSize(); },
    destroy(map) { map.remove(); },
  };

  // ====== 카카오 지도 SDK ======
  // https://apis.map.kakao.com/web/ — 등록된 사이트 도메인에서만 동작한다.
  const kakaoKit = {
    name: 'kakao',
    credit: '지도 © Kakao',
    create(el, { interactive }) {
      const k = kakao.maps;
      const map = new k.Map(el, {
        center: new k.LatLng(37.5665, 126.978), level: 5,
        draggable: interactive, scrollwheel: interactive, disableDoubleClickZoom: !interactive,
      });
      if (interactive) map.addControl(new k.ZoomControl(), k.ControlPosition.RIGHT);
      else map.setZoomable(false);
      return map;
    },
    line(map, pts, o) {
      const k = kakao.maps;
      return new k.Polyline({
        map,
        path: pts.map(([a, b]) => new k.LatLng(a, b)),
        strokeWeight: o.weight, strokeColor: o.color, strokeOpacity: o.opacity,
        strokeStyle: o.dashed ? 'shortdash' : 'solid',
      });
    },
    dot(map, [lat, lon], o) {
      const k = kakao.maps;
      return new k.CustomOverlay({
        map, position: new k.LatLng(lat, lon), content: dotEl(o),
        xAnchor: 0.5, yAnchor: 0.5, zIndex: 3, clickable: !!o.onClick,
      });
    },
    remove(map, layer) { layer.setMap(null); },
    fit(map, pts, pad) {
      const k = kakao.maps;
      if (pts.length === 1) { map.setCenter(new k.LatLng(pts[0][0], pts[0][1])); map.setLevel(3); return; }
      const b = new k.LatLngBounds();
      pts.forEach(([a, c]) => b.extend(new k.LatLng(a, c)));
      map.setBounds(b, pad, pad, pad, pad);
    },
    onClick(map, fn) { kakao.maps.event.addListener(map, 'click', fn); },
    relayout(map) { map.relayout(); },
    destroy(map, el) { if (el) el.innerHTML = ''; }, // SDK에 제거 API가 없어 컨테이너를 비운다
  };

  const kakaoKey = () => (window.TOUR_ENV && window.TOUR_ENV.KAKAO_JS_KEY) || '';

  // useKakao면 카카오 SDK를 불러오고 준비되면 kakaoKit, 아니거나 실패하면 leafletKit (8초 제한)
  function load(useKakao) {
    const key = kakaoKey();
    if (!useKakao || !key) return Promise.resolve(leafletKit);
    if (window.kakao && kakao.maps && kakao.maps.Map) return Promise.resolve(kakaoKit);
    return new Promise((resolve) => {
      let settled = false;
      const done = (kit) => { if (!settled) { settled = true; clearTimeout(timer); resolve(kit); } };
      const timer = setTimeout(() => { console.warn('Kakao Maps SDK timeout → Leaflet'); done(leafletKit); }, 8000);
      const s = document.createElement('script');
      s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`;
      s.onload = () => {
        if (window.kakao && kakao.maps && kakao.maps.load) kakao.maps.load(() => done(kakaoKit));
        else done(leafletKit);
      };
      s.onerror = () => { console.warn('Kakao Maps SDK failed → Leaflet'); done(leafletKit); };
      document.head.appendChild(s);
    });
  }

  window.MapKit = { load, kakaoKey, leafletKit, kakaoKit };
})();
