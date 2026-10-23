// navi-core.js — 공통 기능: 지도 링크, 헤더, 안내 카드
// 정거장 렌더링·동선 편집·미니맵·하단 네비는 v3-flex.js가 맡는다.
(function () {
  'use strict';

  const data = window.TOUR_DATA;
  if (!data) throw new Error('stops-data.js must load before navi-core.js');

  // ====== 다른 언어 판: window.TOUR_I18N이 있으면 데이터 위에 덮어쓴다 ======
  // { meta: {...}, removeStops: [...], stops: { s01: {...} }, walks: { 's01>s02': {...} } } — 바꿀 필드만 적는다.
  // 좌표·순서·경로 같은 구조는 stops-data.js 한 곳에서만 관리하려고 이렇게 나눴다.
  // removeStops: 이 판에서는 아예 없는 정거장 (그 정거장이 낀 구간 안내도 같이 빠진다)
  const i18n = window.TOUR_I18N;
  if (i18n) {
    Object.assign(data.meta, i18n.meta || {});
    const removed = new Set(i18n.removeStops || []);
    if (removed.size) {
      data.stops = data.stops.filter((s) => !removed.has(s.id));
      data.walks = (data.walks || []).filter((w) => !removed.has(w.from) && !removed.has(w.to));
    }
    data.stops.forEach((s) => Object.assign(s, (i18n.stops || {})[s.id] || {}));
    (data.walks || []).forEach((w) => Object.assign(w, (i18n.walks || {})[`${w.from}>${w.to}`] || {}));
  }

  // ====== 화면 문구 (meta.lang: 'ko' | 'en' | 'vi') ======
  const LANG = data.meta.lang || 'ko';
  const STRINGS = {
    ko: {
      dirKakao: '🗺️ 카카오맵 길찾기', dirKakaoTransit: '🚌 카카오맵 대중교통', dirGoogle: '🗺️ 구글 지도 길찾기',
      visit: '☐ 방문', visited: '✓ 방문함', pass: '✕ Pass', unpass: '↶ 복귀',
      passAria: '동선에서 제외/포함', passTitle: '동선 제외', unpassTitle: '복귀',
      visitAria: '방문함 토글', visitTitle: '방문함', dragAria: '드래그', placeTitle: '장소만 보기',
      stay: '머무는 시간', terminus: '종착', straight: '직선',
      enToggle: '🌐 In English — 친구에게 보여주기',
      noWalk: '데이터에 없는 구간이에요 (순서 변경·Pass로 생긴 연결). 정거장 카드의 길찾기 버튼을 쓰세요.',
      tapHint: '탭하면 카카오맵 길찾기 ↗', mapAlt: '도보 경로 지도',
      creditOsm: '지도 © OpenStreetMap', creditKakao: '지도 © Kakao',
      routeCredit: '경로 © OpenStreetMap 기여자', busDashed: '점선은 버스 (대략적인 길)',
      edit: '▼ 동선 편집', editing: '▼ 편집 중',
      resetConfirm: '순서와 Pass 상태를 초기 상태로 되돌릴까요? (방문 체크는 유지)',
      cardSummary: '안내 (탭하여 펼치기)',
    },
    en: {
      dirKakao: '🗺️ Directions (Kakao Map)', dirKakaoTransit: '🚌 Transit (Kakao Map)', dirGoogle: '🗺️ Google Maps directions',
      visit: '☐ Visited?', visited: '✓ Visited', pass: '✕ Skip', unpass: '↶ Add back',
      passAria: 'Skip / add back', passTitle: 'Skip', unpassTitle: 'Add back',
      visitAria: 'Toggle visited', visitTitle: 'Visited', dragAria: 'Drag', placeTitle: 'Show on map',
      stay: 'Stay', terminus: 'End', straight: 'Straight line',
      enToggle: '',
      noWalk: 'No directions for this pair (created by reordering or skipping). Use the Directions button on the stop card.',
      tapHint: 'Tap for directions in Kakao Map ↗', mapAlt: 'walking route map',
      creditOsm: 'Map © OpenStreetMap', creditKakao: 'Map © Kakao',
      routeCredit: 'Route © OpenStreetMap contributors', busDashed: 'dashed = bus (approximate)',
      edit: '▼ Edit route', editing: '▼ Editing',
      resetConfirm: 'Reset the order and skipped stops? (Visited marks are kept)',
      cardSummary: 'Info (tap to expand)',
    },
    vi: {
      dirKakao: '🗺️ Chỉ đường (Kakao Map)', dirKakaoTransit: '🚌 Xe công cộng (Kakao Map)', dirGoogle: '🗺️ Chỉ đường Google Maps',
      visit: '☐ Đã đến?', visited: '✓ Đã đến', pass: '✕ Bỏ qua', unpass: '↶ Thêm lại',
      passAria: 'Bỏ qua / thêm lại', passTitle: 'Bỏ qua', unpassTitle: 'Thêm lại',
      visitAria: 'Đánh dấu đã đến', visitTitle: 'Đã đến', dragAria: 'Kéo', placeTitle: 'Xem trên bản đồ',
      stay: 'Ở lại', terminus: 'Điểm cuối', straight: 'Đường thẳng',
      enToggle: '',
      noWalk: 'Không có hướng dẫn cho đoạn này (do đổi thứ tự hoặc bỏ qua điểm dừng). Hãy dùng nút Chỉ đường trên thẻ điểm dừng.',
      tapHint: 'Chạm để chỉ đường trên Kakao Map ↗', mapAlt: 'bản đồ đường đi bộ',
      creditOsm: 'Bản đồ © OpenStreetMap', creditKakao: 'Bản đồ © Kakao',
      routeCredit: 'Tuyến đường © OpenStreetMap contributors', busDashed: 'nét đứt = xe buýt (tương đối)',
      edit: '▼ Sửa lộ trình', editing: '▼ Đang sửa',
      resetConfirm: 'Đặt lại thứ tự và các điểm đã bỏ qua? (Dấu "đã đến" vẫn được giữ)',
      cardSummary: 'Thông tin (chạm để mở)',
    },
  };
  const t = (key) => {
    const v = (STRINGS[LANG] || STRINGS.ko)[key];
    return v === undefined ? STRINGS.ko[key] : v;
  };

  // ====== 지도 링크 ======
  // 한국에서는 구글 지도가 도보 길찾기를 지원하지 않으므로 투어마다 지도 서비스를 고른다.
  // meta.mapProvider: 'kakao' | 'google' (기본 google)
  const PROVIDER = (data.meta && data.meta.mapProvider) || 'google';

  // from이 없으면 목적지까지 길찾기(출발지 = 현재 위치)
  // mode: 'walk' | 'transit'
  function directionsUrl(from, to, mode = 'walk') {
    if (PROVIDER === 'kakao') {
      const pt = (s) => `${encodeURIComponent(mapName(s))},${s.lat},${s.lon}`;
      if (!from) return `https://map.kakao.com/link/to/${pt(to)}`;
      const by = mode === 'transit' ? 'traffic' : 'walk';
      return `https://map.kakao.com/link/by/${by}/${pt(from)}/${pt(to)}`;
    }
    const params = new URLSearchParams({
      api: '1',
      destination: `${to.lat},${to.lon}`,
      travelmode: mode === 'transit' ? 'transit' : 'walking',
    });
    if (from) params.set('origin', `${from.lat},${from.lon}`);
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  // 장소 보기(📍)는 따로 고를 수 있다 — 영어 판은 meta.placeProvider: 'google' (지명이 영어로 나옴)
  function placeUrl(stop) {
    if (PROVIDER === 'kakao' && data.meta.placeProvider !== 'google') {
      return `https://map.kakao.com/link/map/${encodeURIComponent(mapName(stop))},${stop.lat},${stop.lon}`;
    }
    const q = encodeURIComponent(`${stop.namePl || stop.name || stop.nameKr} @${stop.lat},${stop.lon}`);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  }

  // 지도 앱에 넘길 이름 (쉼표·슬래시는 카카오 URL 구분자라 제거)
  function mapName(stop) {
    return (stop.mapName || stop.nameKr).replace(/[,/]/g, ' ');
  }

  // ====== 헤더 메타 채우기 ======
  function fillHeader() {
    const set = (sel, val) => {
      const el = document.querySelector(sel);
      if (el && val != null) el.textContent = val;
    };
    set('.tour-header h1', data.meta.title);
    set('.tour-header .subtitle', data.meta.subtitle);
    set('.tour-meta .total-km .val', data.meta.totalKm);
    set('.tour-meta .total-time .val', data.meta.totalTime);
    set('.tour-meta .stops-count .val', data.meta.stopsCount);
  }

  // ====== 안내 카드 (펼침) ======
  // 투어마다 다르므로 stops-data.js의 meta.cards = [{ summary, html, open }] 에서 읽는다.
  function injectCards(target) {
    if (!target) return;
    const cards = (data.meta && data.meta.cards) || [];
    cards.forEach((card) => {
      if (!card.html) return;
      const el = document.createElement('details');
      el.className = 'ticket-card';
      if (card.open) el.open = true;
      el.innerHTML = `
        <summary>${card.summary || t('cardSummary')}</summary>
        <div class="ticket-body">${card.html}</div>
      `;
      target.appendChild(el);
    });
  }

  window.NaviCore = {
    data,
    lang: LANG,
    t,
    provider: PROVIDER,
    directionsUrl,
    placeUrl,
    fillHeader,
    injectCards,
  };
})();
