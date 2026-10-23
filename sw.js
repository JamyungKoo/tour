// Tour 통합 Service Worker (모든 투어 공용)
// scope: 이 파일이 있는 폴더 (/tour/)
// 투어를 계속 다듬는 중이라 네트워크 우선: 온라인이면 항상 최신, 오프라인이면 마지막 캐시.
const CACHE_VERSION = 'tour-v9';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './env.js',
  './navi/navi.css',
  './navi/navi-core.js',
  './navi/map-kit.js',
  './navi/v3-flex.js',
  './navi/icons/icon-192.png',
  './navi/icons/icon-512.png',
  './seoul-1024/',
  './seoul-1024/eng.html',
  './seoul-1024/vn.html',
  './seoul-1024/stops-data.js',
  './seoul-1024/stops-data.en.js',
  './seoul-1024/stops-data.vi.js',
  './seoul-1024/routes-data.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.all(CORE_ASSETS.map((url) => cache.add(url).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 지도 앱 링크·외부 지도는 캐시하지 않는다
  if (/(google|kakao|naver|daumcdn)\./.test(url.hostname)) return;

  // 지도 타일·위키미디어 사진: 캐시 우선 (자주 안 바뀜, 오프라인 대비)
  if (url.hostname.includes('tile.openstreetmap') || url.hostname.includes('wikimedia.org')) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION + '-media').then((c) => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // 같은 출처는 브라우저 HTTP 캐시도 건너뛰고 서버에 재검증 (수정이 바로 보이도록)
  const fresh = url.origin === self.location.origin
    ? new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })
    : req;
  event.respondWith(
    fetch(fresh).then((res) => {
      if (res.ok && (res.type === 'basic' || res.type === 'cors')) {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then((cached) => cached || caches.match('./')))
  );
});
