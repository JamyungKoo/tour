# Seoul

현장에서 폰 한 손으로 따라가는 셀프 가이드 도보 투어 모음. [poland-tour](https://jamyungkoo.github.io/poland-tour/)의 엔진을 가져와 투어 단위로 쪼갰다.

- 웹: <https://jamyungkoo.github.io/seoul/>
- 투어마다 하위 경로 하나: `/seoul/<도시>-<MMDD>/` (예: `/seoul/seoul-1024/`)

## 수록 투어

| 경로 | 투어 | 코스 |
|---|---|---|
| `seoul-1024/` (한국어) · `eng.html` (영어) · `vn.html` (베트남어) | 서울 도심 · 2026-10-24 | 안국역 → 조계사 → 쌈지길 → 청계천 → 명동 → 명동성당 → N서울타워 → 충무로 (대안: 탑골공원, 동대입구) |
| `seoul-1024-kakaojs/` | 같은 코스 · 카카오 지도 SDK 버전 (실험, **로컬 전용** — `.gitignore`로 저장소에서 제외) | `seoul-1024/`의 사본. 지도를 카카오 지도 SDK로 직접 그린다 |

## 구조

```
seoul/
├── index.html          투어 목록
├── env.js              자동 생성 (커밋 안 함) — window.TOUR_ENV
├── manifest.json       PWA 매니페스트 (공용)
├── sw.js               Service Worker (scope = /seoul/, 네트워크 우선)
├── navi/               공용 엔진
│   ├── navi.css
│   ├── navi-core.js    지도 링크(카카오/구글) · 헤더 · 안내 카드
│   ├── map-kit.js      지도 그리기 어댑터 (카카오 지도 SDK ↔ Leaflet)
│   ├── v3-flex.js      정거장·구간 렌더 · 동선 편집 · Pass · 지도 · 하단 네비
│   └── icons/
├── tools/
│   ├── build_routes.py 구간 실제 도보 경로 생성 (OSM) → <투어>/routes-data.js
│   ├── render_route_maps.py 구간 지도 이미지 (위성사진 + 경로 + 영어 라벨) → <투어>/images/routes-en/
│   └── build_env.py    .env(또는 환경변수) → env.js (브라우저용 설정, 카카오 키)
├── .env.example        .env 양식 — .env와 env.js는 커밋하지 않는다
├── .github/workflows/pages.yml  GitHub Pages 배포 (Secret으로 env.js 생성)
└── seoul-1024/
    ├── index.html      투어 페이지 — 구간 지도: 한국어 카카오맵 캡처 (강조색은 여기 <style>에서)
    ├── eng.html        영어 판 — 본문·버튼 전부 영어, 구간 지도는 위성사진 + 영어 라벨 (window.TOUR_VARIANT = 'en')
    ├── vn.html         베트남어 판 — 본문·버튼은 베트남어, 지명·구간 지도는 영어 (window.TOUR_VARIANT = 'vi')
    ├── stops-data.js   window.TOUR_DATA = { meta, stops[], walks[] } — 구조·좌표·한국어 글
    ├── stops-data.en.js window.TOUR_I18N — 영어 글만 (id별로 덮어씀)
    ├── stops-data.vi.js 〃 베트남어 글 (지명은 영어)
    ├── routes-data.js  window.TOUR_ROUTES — 자동 생성, 손으로 고치지 말 것
    ├── route-maps.json 구간 지도 이미지에 넣을 영어 라벨 (위치·방향)
    └── images/         정거장 사진 · routes/ 카카오맵 캡처 · routes-en/ 영어 구간 지도 (자동 생성)
```

외부 의존: 카카오 지도 SDK(키가 있을 때), Leaflet 1.9.4 (unpkg), Sortable.js 1.15.2 (jsDelivr). 페이지 빌드 도구 없음 — 경로 생성만 Python 스크립트.

## poland-tour 엔진과 달라진 점

- **지도 서비스 선택** — `meta.mapProvider: 'kakao' | 'google'`. 한국은 구글 지도가 도보 길찾기를 지원하지 않아서 카카오맵 URL(`map.kakao.com/link/by/walk/…`)을 쓴다. 카카오일 때는 구간별 구글 임베드도 생략
- **구간 안내 `walks[]`** — `{ from, to, mode, text, transit, via, legs, map, mapNote }`. (출발, 도착) 쌍으로 찾으므로 순서를 바꾸거나 Pass해도 맞는 안내가 나오고, 데이터에 없는 쌍은 직선거리만 표시
  - `via` — 경로가 꼭 지나가야 할 경유지 (예: 인사동길 남쪽 끝, 청계천 물 위 점)
  - `legs: [{ pts, bus }]` — 도보/버스로 나뉘는 구간. `bus: true`는 점선
- **실제 경로선** — 카카오·네이버의 도보 길찾기는 공개 API가 없다(카카오모빌리티 도보는 유료 제휴 전용). 그래서 `python tools/build_routes.py <투어>`가 `via`/`legs`를 경유지로 OSM 도보 길찾기(routing.openstreetmap.de)를 불러 `routes-data.js`를 만든다. **walks를 고치면 다시 돌릴 것.** 버스 구간도 도보 라우터로 그리므로 대략적인 길이다
- **구간 지도 이미지 (영어)** — 카카오 지도 API는 영어 지도가 없고, 네이버 지도는 자동 캡처가 안 돼서, 글자 없는 위성사진(Esri World Imagery) 위에 실제 도보 경로선과 주요 거점 영어 라벨만 직접 그린다. `python tools/render_route_maps.py <투어> [구간…]` — 라벨은 `<투어>/route-maps.json`(`[위도, 경도, 글자, 종류, 방향]`, 종류: start·end·place·street·note, `legs`로 그릴 구간 선택). 경로를 바꾸면 build_routes.py → render_route_maps.py 순으로
- **지도 방식 `meta.mapMode`** — `'capture'`(기본): 구간 지도는 이미지(`walks[].map`), 전체 지도는 Leaflet(OSM). `'kakao-sdk'`: 아래처럼 카카오 지도 SDK로 직접 그린다 (`seoul-1024-kakaojs/`). 카카오 지도 API는 영어 지도를 지원하지 않아서 영어 지도가 필요한 본 투어는 캡처 방식으로 간다
- **카카오 지도 SDK (`kakao-sdk`)** — `env.js`의 `KAKAO_JS_KEY`가 있으면 카카오 지도 SDK로, 없거나 못 불러오면(도메인 미등록 등, 8초 제한) Leaflet(OSM)으로 전체 지도와 구간 지도를 그린다. 카카오·네이버 지도 *페이지*는 iframe 임베드가 안 되고(네이버 `X-Frame-Options: DENY`, 카카오는 지도가 안 그려짐) 구글 임베드는 한국에서 경로가 안 나와서 이렇게 했다. 구간 지도는 조작을 끄고, 탭하면 같은 경로를 카카오맵 길찾기로 연다
  - 카카오 키: Kakao Developers 앱의 JavaScript 키 + 사이트 도메인 등록(`http://localhost:8778`, `https://jamyungkoo.github.io`) + [카카오맵] 사용 설정 ON
- **제안 정거장** — `tag`(배지 문구), `defaultPassed: true`(처음엔 빠진 상태, ↺ 초기화 시에도 이 상태로)
- **정거장 필드 추가** — `nameEn`, `info: [[라벨, 값]]`, `tips: []`, `en`(영어 요약 펼침), `imageCredit`, `mapName`(지도 앱에 넘길 이름), `leaveAt`(정거장 안에서 이동해 다른 곳에서 떠날 때 길찾기 출발점)
- **다른 언어 판** — `stops-data.en.js`의 `window.TOUR_I18N = { meta, stops: { s01: {...} }, walks: { 's01>s02': {...} } }`를 navi-core가 데이터 위에 덮어쓴다(바꿀 글만). 표시 이름은 `name`, 둘째 줄은 `sub`. `removeStops: [id]`로 그 판에서 정거장을 아예 뺄 수 있다(영어·베트남어 판은 탑골공원 없음). 버튼·메뉴 문구는 navi-core의 `STRINGS`(ko/en/vi), 언어는 `meta.lang`. 영어·베트남어 판은 정거장 구성이 같아서 저장 키 `seoul-1024-intl`을 같이 쓴다. 코스·좌표를 바꾸면 stops-data.js 하나만, 글을 바꾸면 양쪽 파일을 같이 고친다
- **안내 카드 여러 장** — `meta.cards: [{ summary, html, open }]` (폴란드의 `meta.ticket` 대신)
- **하단 네비** — Pass된 정거장은 건너뜀
- **Service Worker** — 네트워크 우선 + HTTP 캐시 재검증. 수정하면 새로고침 한 번에 반영되고, 오프라인이면 마지막 캐시. 지도 타일·위키미디어 사진만 캐시 우선

## 저장 상태 (localStorage)

`meta.tourKey` 기준으로 분리: `tourOrder_v3_<key>` · `tourPassed_v3_<key>` · `tourVisited_v1_<key>`.
정거장을 추가·삭제하면 저장된 순서는 개수가 안 맞아 자동으로 기본 순서로 돌아간다.

## 투어 추가

1. `<도시>-<MMDD>/stops-data.js` — `meta.tourKey`를 폴더 이름과 같게
2. `python tools/build_routes.py <도시>-<MMDD>` — 구간 경로 생성 (`routes-data.js`), 이어서 `route-maps.json` 쓰고 `python tools/render_route_maps.py <도시>-<MMDD>` — 구간 지도 이미지
3. `<도시>-<MMDD>/index.html` — `seoul-1024/index.html` 복사 후 제목·kicker·푸터 교체
4. `index.html` — 투어 카드 추가
5. `sw.js` — `CORE_ASSETS`에 새 파일 등록 + `CACHE_VERSION` bump

## 키 · 환경값 (.env)

정적 사이트라 페이지가 `.env`를 직접 읽지 못한다. `tools/build_env.py`가 `.env`(또는 환경변수)를 읽어 `env.js`(`window.TOUR_ENV`)를 만들고, 페이지는 그걸 읽는다. `.env`·`env.js`는 `.gitignore`.

- 브라우저로 내보내는 키는 `build_env.py`의 `PUBLIC_KEYS`에 적힌 것뿐이다. **env.js는 사이트에서 그대로 보이므로** 비밀 키는 넣지 말 것
- `KAKAO_JS_KEY`는 원래 브라우저용 공개 키다. 보안은 Kakao Developers의 사이트 도메인 등록으로 지킨다 (등록 안 된 도메인에서는 동작하지 않음)
- 키가 없거나 지도를 못 불러오면 Leaflet(OSM) 지도로 대신 그린다

## 로컬에서 보기

```bash
cp .env.example .env              # KAKAO_JS_KEY 채우기
python tools/build_env.py         # → env.js
cd .. && python -m http.server 8778
```

SW scope가 폴더 기준이라 이 저장소의 **상위 폴더**에서 서버를 띄운다 → <http://localhost:8778/seoul/seoul-1024/>

## 배포 (GitHub Pages)

`main`에 push하면 `.github/workflows/pages.yml`이 `env.js`를 만들고 사이트를 올린다. 처음 한 번만:

1. 저장소 **Settings → Pages → Source: GitHub Actions**
2. **Settings → Secrets and variables → Actions → New repository secret**: `KAKAO_JS_KEY`
3. Kakao Developers 앱에 사이트 도메인 `https://jamyungkoo.github.io` 등록 (로컬용 `http://localhost:8778`도)

→ <https://jamyungkoo.github.io/seoul/>

## 라이선스

- 코드: MIT
- 사진: Wikimedia Commons에서 1280px로 내려받아 `<투어>/images/`에 둠 (각 사진 우하단에 작가·라이선스, 원본 파일 페이지 링크)
- 경로선: © OpenStreetMap 기여자 (ODbL) — 지도 아래에 표기
- 구간 지도 위성사진: © Esri, Maxar, Earthstar Geographics — 이미지 안과 아래에 표기
- 지도: 카카오 지도 SDK (© Kakao) 또는 OpenStreetMap 타일
