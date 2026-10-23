// v3-flex.js — 유연한 동선 (편집 시트 드래그 + Pass + 슬롯 번호 + 구간 안내 + 미니맵)
(function () {
  'use strict';
  const { NaviCore } = window;
  const t = NaviCore.t;
  const data = window.TOUR_DATA;
  const stops = data.stops;
  const stopMap = Object.fromEntries(stops.map((s) => [s.id, s]));
  // 지도 방식: 'capture'(기본 — 구간은 캡처 이미지, 전체 지도는 Leaflet) | 'kakao-sdk'(카카오 지도 SDK로 직접)
  const LIVE_KAKAO = data.meta.mapMode === 'kakao-sdk';

  // 저장 키는 투어별로 분리한다 (정거장 id가 투어 간에 s01… 로 겹침)
  const KEY = (data.meta && (data.meta.tourKey || data.meta.cityKey)) || 'default';
  const STORAGE_ORDER = `tourOrder_v3_${KEY}`;
  const STORAGE_PASSED = `tourPassed_v3_${KEY}`;
  const STORAGE_VISITED = `tourVisited_v1_${KEY}`;

  // 구간 안내는 (출발, 도착) 쌍으로 찾는다. 순서를 바꾸거나 Pass해서 생긴
  // 데이터에 없는 쌍은 직선거리만 보여준다.
  const walkMap = Object.fromEntries((data.walks || []).map((w) => [`${w.from}>${w.to}`, w]));
  const findWalk = (a, b) => walkMap[`${a.id}>${b.id}`] || null;

  const defaultPassed = () => stops.filter((s) => s.defaultPassed).map((s) => s.id);
  // Pass 저장값에 그때의 기본 제외 목록을 같이 적어 둔다. 데이터에서 기본값이 바뀌면
  // 예전 저장값은 버리고 새 기본값을 쓴다 (다듬는 중 바꾼 기본 동선이 폰에서도 바로 보이도록).
  const DEFAULTS_SIG = defaultPassed().sort().join(',');

  let order = loadOrder();
  let passed = new Set(loadPassed());
  let visited = new Set(readJson(STORAGE_VISITED, []));

  function readJson(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || 'null');
      return v === null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function loadOrder() {
    const saved = readJson(STORAGE_ORDER, null);
    const ids = new Set(stops.map((s) => s.id));
    if (Array.isArray(saved) && saved.length === stops.length && saved.every((id) => ids.has(id))) {
      return saved;
    }
    return stops.map((s) => s.id);
  }
  function loadPassed() {
    const saved = readJson(STORAGE_PASSED, null);
    if (saved && saved.defaults === DEFAULTS_SIG && Array.isArray(saved.passed)) return saved.passed;
    return defaultPassed();
  }
  const save = {
    order: () => localStorage.setItem(STORAGE_ORDER, JSON.stringify(order)),
    passed: () => localStorage.setItem(STORAGE_PASSED, JSON.stringify({ defaults: DEFAULTS_SIG, passed: [...passed] })),
    visited: () => localStorage.setItem(STORAGE_VISITED, JSON.stringify([...visited])),
  };

  const activeStops = () => order.map((id) => stopMap[id]).filter((s) => !passed.has(s.id));
  // 표시 이름: name(다른 언어 판) > nameKr. 둘째 줄: sub > nameEn > namePl
  const cleanName = (s) => (s.name || s.nameKr).replace(/\s*—\s*종착\s*$/, '');
  const subName = (s) => s.sub || s.nameEn || s.namePl || '';

  function distanceM(a, b) {
    const R = 6371000, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const fmtDist = (m) => (m >= 1000 ? `${(m / 1000).toFixed(1)}km` : `${Math.round(m / 10) * 10}m`);

  // ====== 슬롯 번호 계산 ======
  // 활성 정거장(Pass 안 된)에 1~N 슬롯 번호 부여. Pass된 건 null.
  function buildSlotMap() {
    const map = new Map();
    let slot = 1;
    for (const id of order) {
      if (passed.has(id)) { map.set(id, null); continue; }
      map.set(id, String(slot).padStart(2, '0'));
      slot++;
    }
    return map;
  }
  function slotLabel(stop, slotMap) {
    const v = slotMap.get(stop.id);
    return v === null ? '—' : v;
  }

  // ====== 본문 카드 ======
  function renderStopCard(stop, prevActive, slotMap) {
    const article = document.createElement('article');
    article.className = 'stop v3-stop';
    article.dataset.stopId = stop.id;
    article.id = stop.id;
    if (passed.has(stop.id)) article.classList.add('passed');
    if (visited.has(stop.id)) article.classList.add('visited');
    if (stop.terminus) article.classList.add('terminus');

    const walkIn = prevActive ? findWalk(prevActive, stop) : null;
    const transit = !!(walkIn && walkIn.transit);
    // 청계천처럼 정거장 안에서 이동하는 곳은 leaveAt(떠나는 지점)에서 길찾기를 시작한다
    // 구간 캡처가 있는 도보 구간은 캡처와 같은 경로(경유지 포함)로 연다
    const origin = prevActive && (prevActive.leaveAt || prevActive);
    const dirUrl = walkIn && walkIn.map && !transit
      ? walkIn.map.href
      : NaviCore.directionsUrl(origin, stop, transit ? 'transit' : 'walk');
    const dirLabel = NaviCore.provider === 'kakao'
      ? (transit ? t('dirKakaoTransit') : t('dirKakao'))
      : t('dirGoogle');
    const isPassed = passed.has(stop.id);

    const infoHtml = stop.info && stop.info.length
      ? `<dl class="stop-info">${stop.info.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`
      : '';
    const tipsHtml = stop.tips && stop.tips.length
      ? `<ul class="stop-tips">${stop.tips.map((t) => `<li>${t}</li>`).join('')}</ul>`
      : '';
    const enHtml = stop.en && t('enToggle')
      ? `<details class="stop-en"><summary>${t('enToggle')}</summary><p>${stop.en}</p></details>`
      : '';

    article.innerHTML = `
      <div class="stop-toolbar">
        <button class="btn-pass" data-stop-id="${stop.id}" aria-label="${t('passAria')}">
          ${isPassed ? t('unpass') : t('pass')}
        </button>
      </div>
      <figure class="stop-photo">
        <span class="stop-num">${slotLabel(stop, slotMap)}${stop.terminus ? ` · ${t('terminus')}` : ''}</span>
        ${stop.tag ? `<span class="stop-tag">${stop.tag}</span>` : ''}
        <img src="${stop.image}" alt="${cleanName(stop)}" loading="lazy">
        ${stop.imageCredit ? `<figcaption>${stop.imageCredit}</figcaption>` : ''}
      </figure>
      <div class="stop-body">
        <div class="stop-time">${stop.time || ''}${stop.stay ? ` · ${t('stay')} ${stop.stay}` : ''}</div>
        <h2>${cleanName(stop)}</h2>
        <div class="stop-pl">${subName(stop)}</div>
        ${infoHtml}
        ${stop.paragraphs.map((p) => `<p>${p}</p>`).join('')}
        ${tipsHtml}
        ${enHtml}
        <div class="stop-actions">
          <a class="btn-directions" href="${dirUrl}" target="_blank" rel="noopener">${dirLabel}</a>
          <a class="btn-place" href="${NaviCore.placeUrl(stop)}" target="_blank" rel="noopener" title="${t('placeTitle')}">📍</a>
          <button class="btn-visit ${visited.has(stop.id) ? 'checked' : ''}" data-stop-id="${stop.id}">
            ${visited.has(stop.id) ? t('visited') : t('visit')}
          </button>
        </div>
      </div>
    `;
    return article;
  }

  // ====== 구간 안내 ======
  function renderWalk(fromStop, toStop, slotMap) {
    const walk = findWalk(fromStop, toStop);
    const div = document.createElement('div');
    div.className = 'walk v3-walk' + (walk && walk.transit ? ' tram' : '');
    div.dataset.walkBetween = `${fromStop.id}-${toStop.id}`;

    const mode = walk ? walk.mode : `${t('straight')} ${fmtDist(distanceM(fromStop, toStop))}`;
    const text = walk
      ? walk.text
      : t('noWalk');
    // 구간 지도. 구글 임베드는 해외에선 도보 경로를 그려 주지만 한국에서는 핀 하나만 나오고,
    // 카카오·네이버 지도 페이지는 iframe 임베드가 안 된다. 그래서 카카오 투어는
    //   - mapMode 'capture'(기본): walks[].map 캡처 이미지, 캡처가 없으면 Leaflet 지도에 경로선
    //   - mapMode 'kakao-sdk': 카카오 지도 SDK 위에 실제 도보 경로선(routes-data.js)을 직접 그린다 (setupSegMaps)
    const transit = !!(walk && walk.transit);
    const capture = walk && walk.map && walk.map.image && !LIVE_KAKAO ? walk.map : null;
    const href = walk && walk.map && !transit
      ? walk.map.href
      : NaviCore.directionsUrl(fromStop.leaveAt || fromStop, toStop, transit ? 'transit' : 'walk');
    const embed = NaviCore.provider === 'google'
      ? `<div class="walk-map"><iframe src="https://maps.google.com/maps?saddr=${fromStop.lat},${fromStop.lon}&daddr=${toStop.lat},${toStop.lon}&dirflg=${transit ? 'r' : 'w'}&t=m&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`
      : capture
      ? `<a class="walk-map walk-capture" href="${capture.href}" target="_blank" rel="noopener">
          <img src="${capture.image}" alt="${cleanName(fromStop)} → ${cleanName(toStop)} ${t('mapAlt')}" loading="lazy">
          <span class="walk-mini-hint">🚶 ${t('tapHint')}</span>
        </a>
        <div class="walk-map-caption">${[walk.mapNote, capture.caption].filter(Boolean).join('<br>')}</div>`
      : `<div class="walk-map walk-mini">
          <div class="walk-mini-map" data-from="${fromStop.id}" data-to="${toStop.id}"
               data-from-slot="${slotLabel(fromStop, slotMap)}" data-to-slot="${slotLabel(toStop, slotMap)}"
               data-href="${href}"></div>
          <span class="walk-mini-hint">${transit ? '🚌' : '🚶'} ${t('tapHint')}</span>
        </div>
        <div class="walk-map-caption seg-credit"></div>`;

    div.innerHTML = `
      <div class="walk-content">
        <div class="walk-head">
          <span class="walk-label">${slotLabel(fromStop, slotMap)} → ${slotLabel(toStop, slotMap)}</span>
          <span class="walk-mode">${mode}</span>
        </div>
        <div class="walk-text">${text}</div>
        ${embed}
      </div>
    `;
    return div;
  }

  // ====== 편집 시트 한 줄 ======
  function renderSheetRow(stop, slotMap) {
    const row = document.createElement('div');
    row.className = 'sheet-row';
    row.dataset.stopId = stop.id;
    if (passed.has(stop.id)) row.classList.add('passed');
    if (visited.has(stop.id)) row.classList.add('visited');
    row.innerHTML = `
      <span class="sheet-handle" aria-label="${t('dragAria')}">⠿</span>
      <span class="sheet-num">${slotLabel(stop, slotMap)}</span>
      <span class="sheet-name">${cleanName(stop)}${stop.tag ? ` <em class="sheet-tag">${stop.tag}</em>` : ''}</span>
      <button class="sheet-visit" data-stop-id="${stop.id}" aria-label="${t('visitAria')}" title="${t('visitTitle')}">
        ${visited.has(stop.id) ? '✓' : '☐'}
      </button>
      <button class="sheet-pass" data-stop-id="${stop.id}" aria-label="${t('passAria')}" title="${passed.has(stop.id) ? t('unpassTitle') : t('passTitle')}">
        ${passed.has(stop.id) ? '↶' : '✕'}
      </button>
    `;
    return row;
  }

  // ====== 메인 렌더 ======
  function render() {
    const slotMap = buildSlotMap();
    const allOrdered = order.map((id) => stopMap[id]);

    const container = document.getElementById('stops-container');
    clearSegMaps();
    container.innerHTML = '';
    let prevActive = null;
    allOrdered.forEach((stop, idx) => {
      container.appendChild(renderStopCard(stop, prevActive, slotMap));
      if (!passed.has(stop.id)) {
        const nextActive = allOrdered.slice(idx + 1).find((s) => !passed.has(s.id));
        if (nextActive) container.appendChild(renderWalk(stop, nextActive, slotMap));
        prevActive = stop;
      }
    });
    if (kit) setupSegMaps();

    const sheetList = document.getElementById('sheet-list');
    if (sheetList) {
      sheetList.innerHTML = '';
      allOrdered.forEach((stop) => sheetList.appendChild(renderSheetRow(stop, slotMap)));
    }

    updateProgress();
    updateMap(slotMap);
    if (updateNav) updateNav();
  }

  function updateProgress() {
    const active = activeStops();
    const done = active.filter((s) => visited.has(s.id));
    const pct = active.length ? Math.round((done.length / active.length) * 100) : 0;
    const fillEl = document.querySelector('.progress-bar .fill');
    const countEl = document.querySelector('.progress-bar .count');
    if (fillEl) fillEl.style.width = pct + '%';
    if (countEl) countEl.textContent = `${done.length} / ${active.length}`;
  }

  // ====== 지도 (map-kit.js: 카카오 SDK 또는 Leaflet) ======
  let kit = null;          // MapKit.load()가 정해 준다
  let map = null, layers = [];
  const ROUTES = window.TOUR_ROUTES || {};
  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  // 두 정거장 사이에 그릴 선들: routes-data.js의 실제 경로(OSM 도보 길찾기)가 있으면 그것,
  // 없으면 legs/via 경유지를 직선으로 잇는다. bus 구간은 점선.
  function segLines(a, b) {
    const key = `${a.id}>${b.id}`;
    if (ROUTES[key]) return ROUTES[key];
    const walk = findWalk(a, b);
    if (walk && walk.legs) return walk.legs.map((l) => ({ pts: l.pts, bus: l.bus }));
    return [{ pts: [[a.lat, a.lon], ...((walk && walk.via) || []), [b.lat, b.lon]], bus: !!(walk && walk.transit) }];
  }
  const routeCredit = () =>
    `${t(kit.name === 'kakao' ? 'creditKakao' : 'creditOsm')}${Object.keys(ROUTES).length ? ` · ${t('routeCredit')}` : ''}`;

  function scrollToStop(id) {
    if (document.body.classList.contains('sheet-open')) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function initMap() {
    const el = document.getElementById('overview-map');
    if (!el) return;
    map = kit.create(el, { interactive: true });
    const credit = document.getElementById('map-credit');
    if (credit) credit.textContent = routeCredit();
    updateMap(buildSlotMap());
  }

  function updateMap(slotMap) {
    if (!map) return;
    layers.forEach((l) => kit.remove(map, l));
    layers = [];
    const active = activeStops();
    if (active.length === 0) return;

    const accent = cssVar('--accent', '#b8420a');
    const visitedColor = cssVar('--visited', '#4a7c4e');
    const all = [];

    for (let i = 0; i < active.length - 1; i++) {
      segLines(active[i], active[i + 1]).forEach((l) => {
        layers.push(kit.line(map, l.pts, { color: accent, weight: 4, opacity: 0.8, dashed: !!l.bus }));
        all.push(...l.pts);
      });
    }

    // 활성 정거장만 마커. 방문함이면 초록 ✓, 미방문이면 강조색 + 슬롯번호. 누르면 그 카드로.
    active.forEach((s) => {
      const isVisited = visited.has(s.id);
      layers.push(kit.dot(map, [s.lat, s.lon], {
        label: isVisited ? '✓' : (slotMap.get(s.id) || '?'),
        color: isVisited ? visitedColor : accent, size: 28,
        title: `${cleanName(s)} — ${subName(s)}`,
        onClick: () => scrollToStop(s.id),
      }));
      all.push([s.lat, s.lon]);
    });

    kit.fit(map, all, 22);
  }

  // ====== 구간 지도 ======
  // 페이지 스크롤을 막지 않도록 조작은 끄고, 탭하면 지도 앱 길찾기를 연다.
  // 화면 근처에 왔을 때만 만든다 (지도 여러 개를 한꺼번에 띄우지 않도록).
  let segMaps = [];
  let segObserver = null;

  function clearSegMaps() {
    if (segObserver) segObserver.disconnect();
    segMaps.forEach(({ m, el }) => kit.destroy(m, el));
    segMaps = [];
  }

  function setupSegMaps() {
    const els = document.querySelectorAll('.walk-mini-map');
    if (!els.length) return;
    segObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        segObserver.unobserve(e.target);
        initSegMap(e.target);
      });
    }, { rootMargin: '400px 0px' });
    els.forEach((el) => segObserver.observe(el));
  }

  function initSegMap(el) {
    const a = stopMap[el.dataset.from], b = stopMap[el.dataset.to];
    const accent = cssVar('--accent', '#b8420a');
    const m = kit.create(el, { interactive: false });
    const lines = segLines(a, b);
    const all = [];
    lines.forEach((l) => {
      kit.line(m, l.pts, { color: accent, weight: 5, opacity: 0.85, dashed: !!l.bus });
      all.push(...l.pts);
    });
    kit.dot(m, [a.lat, a.lon], { label: el.dataset.fromSlot, color: accent, size: 24 });
    kit.dot(m, [b.lat, b.lon], { label: el.dataset.toSlot, color: accent, size: 24 });
    kit.fit(m, all, 28);
    kit.onClick(m, () => window.open(el.dataset.href, '_blank', 'noopener'));
    const credit = el.parentElement.nextElementSibling;
    if (credit && credit.classList.contains('seg-credit')) {
      credit.textContent = `${routeCredit()}${lines.some((l) => l.bus) ? ` · ${t('busDashed')}` : ''}`;
    }
    segMaps.push({ m, el });
  }

  // ====== 편집 시트 (Bottom Sheet + 미니맵 fixed) ======
  function toggleSheet(forceState) {
    const sheet = document.getElementById('edit-sheet');
    const btn = document.getElementById('btn-edit-sheet');
    const backdrop = document.getElementById('sheet-backdrop');
    const mapEl = document.getElementById('overview-map');
    if (!sheet) return;
    const open = forceState !== undefined ? forceState : !sheet.classList.contains('open');
    sheet.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    if (mapEl) mapEl.classList.toggle('floating', open);
    document.body.classList.toggle('sheet-open', open);
    if (btn) btn.textContent = open ? t('editing') : t('edit');
    // 지도는 컨테이너 크기가 바뀌면 다시 계산해야 한다 (Leaflet invalidateSize / 카카오 relayout)
    if (map) setTimeout(() => { kit.relayout(map); updateMap(buildSlotMap()); }, 320);
  }

  function setupSheetSortable() {
    const list = document.getElementById('sheet-list');
    if (!list || !window.Sortable) return;
    new Sortable(list, {
      handle: '.sheet-handle',
      draggable: '.sheet-row',
      animation: 180,
      delay: 120,
      delayOnTouchOnly: true,
      forceFallback: true,
      fallbackTolerance: 4,
      onEnd: () => {
        order = Array.from(list.querySelectorAll('.sheet-row')).map((el) => el.dataset.stopId);
        save.order();
        render();
      },
    });
  }

  // ====== 이벤트 ======
  function setupClickHandlers() {
    document.addEventListener('click', (e) => {
      const passBtn = e.target.closest('.btn-pass, .sheet-pass');
      if (passBtn) {
        const id = passBtn.dataset.stopId;
        if (passed.has(id)) passed.delete(id);
        else passed.add(id);
        save.passed();
        render();
        return;
      }
      const visitBtn = e.target.closest('.btn-visit, .sheet-visit');
      if (visitBtn) {
        const id = visitBtn.dataset.stopId;
        if (visited.has(id)) visited.delete(id);
        else visited.add(id);
        save.visited();
        const isNow = visited.has(id);
        const card = document.getElementById(id);
        if (card) card.classList.toggle('visited', isNow);
        const cardBtn = card?.querySelector('.btn-visit');
        if (cardBtn) {
          cardBtn.classList.toggle('checked', isNow);
          cardBtn.textContent = isNow ? t('visited') : t('visit');
        }
        document.querySelectorAll(`.sheet-row[data-stop-id="${id}"]`).forEach((row) => {
          row.classList.toggle('visited', isNow);
          const sv = row.querySelector('.sheet-visit');
          if (sv) sv.textContent = isNow ? '✓' : '☐';
        });
        updateMap(buildSlotMap());
        updateProgress();
        return;
      }
      if (e.target.closest('#btn-edit-sheet')) { toggleSheet(); return; }
      if (e.target.closest('#btn-close-sheet, #sheet-backdrop')) { toggleSheet(false); return; }
    });
  }

  function setupScrollToTop() {
    const btn = document.getElementById('btn-scroll-top');
    if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function setupReset() {
    const btn = document.getElementById('btn-reset-order');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!confirm(t('resetConfirm'))) return;
      localStorage.removeItem(STORAGE_ORDER);
      localStorage.removeItem(STORAGE_PASSED);
      order = stops.map((s) => s.id);
      passed = new Set(defaultPassed());
      render();
    });
  }

  // ====== 하단 네비 (Pass된 정거장은 건너뜀) ======
  let currentIdx = 0;
  let updateNav = null;
  function setupBottomNav() {
    const nav = document.querySelector('.bottom-nav');
    if (!nav) return;
    const prevBtn = nav.querySelector('.prev');
    const nextBtn = nav.querySelector('.next');
    const centerCurrent = nav.querySelector('.center .current');
    const centerTotal = nav.querySelector('.center .total');

    const allOrdered = () => order.map((id) => stopMap[id]);
    const findActive = (from, step) => {
      const list = allOrdered();
      for (let i = from + step; i >= 0 && i < list.length; i += step) {
        if (!passed.has(list[i].id)) return i;
      }
      return -1;
    };
    const go = (idx) => {
      if (idx < 0) return;
      currentIdx = idx;
      document.getElementById(order[idx])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateNav();
    };

    updateNav = function () {
      const slotMap = buildSlotMap();
      const list = allOrdered();
      if (centerTotal) centerTotal.textContent = activeStops().length;
      if (list.length === 0) return;
      const stop = list[currentIdx] || list[0];
      const p = findActive(currentIdx, -1), n = findActive(currentIdx, 1);
      const fmt = (s) => `${slotLabel(s, slotMap)} ${cleanName(s)}`;
      centerCurrent.textContent = slotLabel(stop, slotMap);
      prevBtn.disabled = p < 0;
      nextBtn.disabled = n < 0;
      prevBtn.querySelector('.target').textContent = p >= 0 ? fmt(list[p]) : '—';
      nextBtn.querySelector('.target').textContent = n >= 0 ? fmt(list[n]) : '—';
    };

    prevBtn.addEventListener('click', () => go(findActive(currentIdx, -1)));
    nextBtn.addEventListener('click', () => go(findActive(currentIdx, 1)));

    // 스크롤로 currentIdx 추적 (viewport 중심에 가까운 카드)
    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (document.body.classList.contains('sheet-open')) return;
        const cards = Array.from(document.querySelectorAll('#stops-container .v3-stop'));
        const viewCenter = window.scrollY + window.innerHeight / 2;
        let bestIdx = 0, bestDist = Infinity;
        cards.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + window.scrollY + rect.height / 2 - viewCenter);
          if (dist < bestDist) { bestDist = dist; bestIdx = i; }
        });
        if (bestIdx !== currentIdx) {
          currentIdx = bestIdx;
          updateNav();
        }
      });
    }, { passive: true });
    updateNav();
  }

  window.V3Flex = {
    init() {
      render();
      setupSheetSortable();
      setupClickHandlers();
      setupScrollToTop();
      setupReset();
      setupBottomNav();
      // 지도는 카카오 SDK를 불러오는 동안 기다렸다가 그린다 (카드는 먼저 보이도록)
      window.MapKit.load(LIVE_KAKAO).then((k) => {
        kit = k;
        initMap();
        setupSegMaps();
      });
    },
  };
})();
