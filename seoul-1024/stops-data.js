// 서울 도심 투어 — 2026-10-24 (토) · 외국인 친구와 반나절
// 안국역 → 인사동 → 청계천 → 명동 → N서울타워 → 충무로
// 사실 확인: 2026-10-23 (N서울타워·서울시·한국천문연구원·조계사 공지 등)

// 좌표 (OSM Nominatim/Overpass, 2026-10-23)
const P = {
  anguk:      [37.5758642, 126.9842002], // 6번 출구
  insaNorth:  [37.5754855, 126.9830871], // 인사동길 북쪽 입구
  jogyesa:    [37.5739062, 126.9818306], // 대웅전
  ssamzie:    [37.5742559, 126.9848198],
  insaSouth:  [37.5711724, 126.9875969], // 인사동길 남쪽 끝 (삼일대로)
  tapgol:     [37.5704971, 126.9885856], // 삼일문
  jongno2:    [37.5701691, 126.9876396], // 종로2가 횡단
  samilgyo:   [37.5681416, 126.9876520],
  janggyo:    [37.5683785, 126.9856799],
  gwanggyo:   [37.5688846, 126.9827724],
  gwangtong:  [37.5690064, 126.9810367], // 복원된 광통교 (원위치보다 상류)
  euljiro:    [37.5660851, 126.9825868], // 을지로입구 사거리
  mdWest:     [37.5636618, 126.9821533], // 명동길 서쪽 끝 (남대문로)
  myeongdong: [37.5639784, 126.9842159], // 명동예술극장
  cathedral:  [37.5632896, 126.9873198],
  mdStation:  [37.5608977, 126.9863762],
  yejang:     [37.5592655, 126.9892022], // 남산예장버스환승주차장
  theater:    [37.5528577, 126.9999139], // 국립극장
  theaterRd:  [37.5523970, 127.0010500], // 국립극장 앞 길 (경유지용 — 건물 좌표는 입구로 들어갔다 나오는 경로가 생김)
  library:    [37.5523436, 126.9818461], // 남산도서관 정류장 (01B 하산 경유)
  cablecar:   [37.5566855, 126.9841189], // 남산케이블카 승강장 (01B 하산 경유)
  tower:      [37.5512692, 126.9882959],
  towerStop:  [37.5510131, 126.9911644], // 남산서울타워 정류장
  chungmuro:  [37.5612019, 126.9941091],
  dongdae:    [37.5588658, 127.0050189], // 6번 출구
};

// 사진: Wikimedia Commons에서 1280px로 내려받아 images/에 둠 (2026-10-23). 출처 링크는 원본 파일 페이지.
const commons = (local, file, author, license) => ({
  image: `images/${local}`,
  imageCredit: `<a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}" target="_blank" rel="noopener">📷 ${author} · ${license}</a>`,
});
const EN = ['en', 'vi'].includes(window.TOUR_VARIANT); // 영어 지도·영어 표기를 쓰는 판 (eng.html, vn.html)
const IMG = {
  anguk:      commons('01-anguk-station.jpg', 'Anguk Station 20230402 009.jpg', 'Mobius6', 'CC BY-SA 4.0'),
  jogyesa:    commons('02-jogyesa.jpg', 'Jogyesa Temple with Two Dragons.jpg', 'Ethan Doyle White', 'CC BY-SA 4.0'),
  ssamzie:    commons('03-ssamziegil.jpg', '쌈지길.jpg', 'Tmannya', 'CC BY-SA 3.0'),
  tapgol:     commons('04-tapgol-gate.jpg', 'Original Main Gate of Tapgol Park.jpg', '오모군', 'CC BY 3.0'),
  cheonggye:  commons('05-cheonggyecheon.jpg', 'Cheonggyecheon tree-lined stream and footbridge at sunrise in Seoul.jpg', 'Basile Morin', 'CC BY-SA 4.0'),
  myeongdong: commons('06-myeongdong.jpg', 'Myeongdong2.JPG', 'Kirakirameister', 'CC BY-SA 3.0'),
  cathedral:  commons('07-myeongdong-cathedral.jpg', 'Myeongdongchurch2025.jpg', 'Kimhs5400', 'CC BY 4.0'),
  tower:      commons('08-n-seoul-tower.jpg', 'Namsan Mountain and Seoul Tower (49175182952).jpg', 'Matt Kieffer', 'CC BY-SA 2.0'),
  chungmuro:  commons('09-namsangol-hanok.jpg', 'Namsangol Hanok Village, Seoul (5) (41087866412).jpg', 'Richard Mortel', 'CC BY 2.0'),
  dongdae:    commons('10-jangchung-jokbal.jpg', 'Jangchung-dong Jokbal Alley.jpg', EN ? 'Korea Tourism Organization (Lee Bumsu)' : '한국관광공사 이범수', EN ? 'KOGL Type 1' : 'KOGL 제1유형'),
};

// 구간 지도 이미지는 페이지마다 다르다 (같은 데이터를 두 페이지가 같이 쓴다)
//   index.html → 한국어: 카카오맵 도보 길찾기 캡처 (images/routes/)
//   eng.html   → 영어: 위성사진 + 경로 + 영어 라벨 (images/routes-en/, tools/render_route_maps.py)
// 탭하면 같은 경로를 카카오맵 길찾기로 연다 (경유지 최대 5개)
const route = (seg, ...pts) => ({
  image: `images/${EN ? 'routes-en' : 'routes'}/${seg}.jpg`,
  href: 'https://map.kakao.com/link/by/walk/' + pts.map(([n, [lat, lon]]) => `${encodeURIComponent(n)},${lat},${lon}`).join('/'),
  caption: EN
    ? 'Imagery © Esri, Maxar, Earthstar Geographics · Route © OpenStreetMap contributors'
    : '지도 © Kakao — 카카오맵 도보 길찾기(큰길우선) 캡처',
});

window.TOUR_DATA = {
  meta: {
    tourKey: 'seoul-1024',
    mapProvider: 'kakao',
    title: '서울 도심 가이드 투어',
    subtitle: '안국역 → 인사동 → 청계천 → 명동 → N서울타워 · 반나절',
    totalKm: '~4 km',
    totalTime: '5–6h',
    stopsCount: '8 (+2)',
    cards: [
      {
        summary: '🧭 코스 메모 — 동선 의견 · 추천 시간표 (탭하여 펼치기)',
        html: `
          <p><strong>결론: 쭉 내려오는 게 맞다.</strong> 안국 → 인사동 → 청계천 → 명동은 남북으로 거의 일직선이라(삼일대로가 안국역에서 명동성당 옆까지 곧게 이어진다) 크게 돌 이유가 없다. 다만 세 가지를 바꾸면 훨씬 낫다.</p>
          <ol>
            <li><strong>청계천은 왕복하지 말고 한 방향으로.</strong> 삼일교에서 물가로 내려가 상류(서쪽)로 광교까지 450m만 걷고, 광교에서 올라와 남대문로로 내려가면 바로 명동 입구다. 같은 20분이 '갔다 돌아오는 시간'이 아니라 동선 자체가 된다. 이 구간에 정조 능행반차도 타일 벽화와 광통교가 몰려 있다.</li>
            <li><strong>명동은 서쪽(남대문로)에서 들어가기.</strong> 삼일대로로 곧장 내려오면 명동성당이 먼저 나와 순서가 뒤집힌다. 명동의 큰길인 명동길은 남대문로에서 시작해 동쪽 끝이 성당이다. 광교 → 남대문로로 내려가 명동길 서쪽 입구로 들어가서 동쪽으로 훑으면, 계획한 <em>명동거리 → 명동성당</em> 순서가 그대로 맞는다.</li>
            <li><strong>쌈지길 전에 조계사 15분.</strong> 안국역에서 7분 거리이고, 마침 국화화엄축제 중이라 경내가 국화로 덮여 있다. 빌딩 숲 속 절 풍경은 외국인 친구에게 인사동만큼 인상적이다. (탑골공원은 기본 동선에서 뺐다 — 인사동길 남쪽 끝 바로 건너편이라 시간이 남으면 ↶ 복귀로 10분.)</li>
          </ol>
          <h4>추천 시간표 (일몰 17:44에서 거꾸로)</h4>
          <table>
            <thead><tr><th>시각</th><th>정거장</th></tr></thead>
            <tbody>
              <tr><td class="price">13:20</td><td>안국역 6번 출구 출발</td></tr>
              <tr><td class="price">13:30</td><td>조계사 국화축제 (~15분)</td></tr>
              <tr><td class="price">13:50</td><td>쌈지길 · 인사동길 (~50분)</td></tr>
              <tr><td class="price">14:55</td><td>청계천 삼일교 → 광통교 (~20분)</td></tr>
              <tr><td class="price">15:30</td><td>명동거리 (~45분) — 주말 노점은 오후부터 하나둘 열린다</td></tr>
              <tr><td class="price">16:20</td><td>명동성당 (~20분) — 토요일 18:00 미사 전</td></tr>
              <tr><td class="price">16:40</td><td>성당 출발 → 예장 정류장까지 도보 17분, 17:00 남산 버스 01A·01B 승차</td></tr>
              <tr><td class="price">17:20</td><td>N서울타워 — 일몰 17:44 · 박명 끝 18:10 · 이후 야경</td></tr>
              <tr><td class="price">19:00</td><td>01B로 하산 → 충무로역 (또는 명동역)<br>장충동에서 저녁이면 걸어서 하산 → 19:50경 동대입구역</td></tr>
            </tbody>
          </table>
          <h4>10/24(토) 그날만의 변수</h4>
          <ul>
            <li><strong>조계사 국화화엄축제</strong> 진행 중 (10/13 개막) — 오늘 동선의 두 번째 정거장.</li>
            <li><strong>서울마켓페어</strong> 청계광장 일대 (10/24–25, 10:00–21:00) — 광교에서 300m 더 가면 닿는다.</li>
            <li><strong>남산 나이트 페스티벌</strong> (10/23–24, 16:00–23:00) — 예장공원·남산둘레길 단풍 산책, 백범광장 캠프닉. 볼거리는 늘지만 예장 정류장과 남산 버스가 붐빌 수 있다.</li>
            <li><strong>명동성당 토요일 미사</strong> 18:00 · 19:00 — 그 전에 들르기.</li>
          </ul>`,
      },
      {
        summary: '🚌 남산 버스 · 지도 앱 안내 (탭하여 펼치기)',
        html: `
          <h4>남산 순환버스 01A · 01B</h4>
          <table>
            <tbody>
              <tr><td><strong>타는 곳</strong></td><td>남산예장버스환승주차장 (예장공원 지하 · 명동역에서 도보 5분, 명동성당에서 도보 17분) — 기점이라 앉아 갈 확률이 높다</td></tr>
              <tr><td><strong>요금</strong></td><td class="price">카드 1,400–1,500원</td></tr>
              <tr><td><strong>배차</strong></td><td>01A 4–12분(주말) · 01B 10–18분</td></tr>
              <tr><td><strong>운행</strong></td><td>06:30 – 23:00 (01B 막차 23:20)</td></tr>
            </tbody>
          </table>
          <div class="warning">⚠️ <strong>현금을 받지 않는다.</strong> 그리고 명동성당 앞 정류장(명동성당.남대문세무서)은 01A 노선의 끝부분이라 타워로 가지 않는다. 반드시 예장까지 걸어가서 탈 것.</div>
          <h4>내려올 때</h4>
          <ul>
            <li>두 노선 모두 타워에서 서쪽(남산도서관)으로 내려간다. <strong>01B</strong>가 남산케이블카 → 예장으로 가서 명동·충무로 쪽에 맞다.</li>
            <li>01A는 숭례문·광화문·안국역을 거쳐 크게 돌아가는 노선.</li>
            <li>타워에서 동대입구역으로 바로 가는 버스는 없다. 동대입구로 갈 땐 <strong>걸어서 내려간다</strong>(약 3km, 50분).</li>
          </ul>
          <h4>케이블카 · 곤돌라</h4>
          <ul>
            <li>남산 케이블카: 10:00–23:00, 매표는 마감 30분 전까지, 편도 약 3분. 명동역 쪽 회현동 승강장.</li>
            <li>남산 곤돌라는 공사가 멈춘 상태로 <strong>미개통</strong>.</li>
          </ul>
          <h4>지도 앱</h4>
          <ul>
            <li>한국에선 구글 지도로 <strong>도보 길찾기가 안 된다</strong>(대중교통만 일부). 이 페이지의 길찾기 버튼은 카카오맵으로 열린다.</li>
            <li>친구 폰에는 영어를 지원하는 <strong>네이버 지도</strong>(Naver Map)가 낫다.</li>
            <li>친구 교통카드: 편의점에서 <strong>티머니</strong> 카드를 사서 현금으로 충전.</li>
          </ul>
          <p style="font-size: 11px; color: var(--ink-mute); margin-top: 10px;">출처: nseoultower.co.kr · 서울시 · 한국천문연구원 · 조계사 공지 · 2026-10-23 확인. 버스 요금은 출처마다 1,400/1,500원으로 엇갈림.</p>`,
      },
    ],
  },

  stops: [
    {
      id: 's01', num: '01', order: 1,
      time: '출발 · 13:20', stay: null,
      nameKr: '안국역', nameEn: 'Anguk Station · Line 3',
      lat: P.anguk[0], lon: P.anguk[1],
      ...IMG.anguk,
      info: [
        ['출구', '<strong>6번 출구</strong> → 조계사 440m, 7분 · 쌈지길로 바로 가면 260m, 4분'],
        ['노선', '3호선'],
      ],
      paragraphs: [
        '북쪽으로는 북촌 한옥마을과 창덕궁, 남쪽으로는 인사동이 이어지는 도심 관광의 출발점. 오늘은 6번 출구로 나와 인사동 쪽으로 내려간다.',
        '2019년, 3·1운동과 대한민국임시정부 수립 100주년에 맞춰 <strong>독립운동 테마역</strong>으로 단장했다. 3~5번 출구 쪽 통로의 파란 <em>100계단</em>에는 기미독립선언서의 글자가 새겨져 있고, 지하 2층엔 <em>100년 기둥</em>, 운현궁 쪽 4번 출구엔 임시정부 청사 대문 문양을 딴 <em>100년 하늘문</em>이 있다.',
        '오늘 길에는 한국 근현대사의 두 장면이 걸려 있다 — 여기 안국역의 3·1운동(1919)과 마지막에 들를 명동성당의 6월 민주항쟁(1987). 쇼핑·먹거리 코스이면서 그 사이를 잇는 길이다.',
      ],
      tips: [
        '출발 전에 친구 교통카드(티머니) 잔액 확인 — 남산 버스는 현금을 안 받는다.',
      ],
      en: 'Anguk Station (Line 3) sits between Bukchon Hanok Village to the north and Insadong to the south. In 2019, for the 100th anniversary of the March 1st Independence Movement, it was redesigned as an "independence movement" theme station — the blue "100 Steps" near Exits 3–5 are engraved with letters from the 1919 Declaration of Independence. We leave by Exit 6 toward Insadong.',
    },
    {
      id: 's02', num: '02', order: 2,
      time: '13:30', stay: '약 15분',
      tag: '국화축제 중',
      nameKr: '조계사', nameEn: 'Jogyesa Temple',
      lat: P.jogyesa[0], lon: P.jogyesa[1],
      ...IMG.jogyesa,
      info: [
        ['10/24', '<strong>제16회 국화화엄축제</strong> 진행 중 (10/13 개막)'],
        ['입장', '무료'],
      ],
      paragraphs: [
        '한국 불교 최대 종단인 대한불교조계종의 총본산. 빌딩 숲 한가운데 대웅전이 앉아 있는 풍경이 외국인에게는 꽤 낯설고 인상적이다. 지금의 대웅전은 1938년, 정읍 보천교의 십일전 건물을 옮겨 와 지었다.',
        '10월 13일 개막한 <strong>국화화엄축제</strong>로 지금 경내가 국화로 덮여 있다. 안국역에서 7분, 쌈지길까지 5분이라 동선에서 크게 벗어나지 않는다. 15분만 써도 사진이 확 달라진다.',
      ],
      tips: [
        '대웅전 정면 가운데 문은 스님이 드나드는 문 — 옆문을 쓰고, 예불·법회 중에는 사진을 삼가자.',
      ],
      en: 'Jogyesa is the head temple of the Jogye Order, the largest school of Korean Buddhism — a traditional temple hall right among office towers. Its main hall dates from 1938. Right now (from Oct 13) the courtyard is filled with chrysanthemums for the annual autumn chrysanthemum festival.',
    },
    {
      id: 's03', num: '03', order: 3,
      time: '13:50', stay: '약 50분',
      nameKr: '쌈지길 · 인사동길', nameEn: 'Ssamziegil · Insadong-gil',
      lat: P.ssamzie[0], lon: P.ssamzie[1],
      ...IMG.ssamzie,
      info: [
        ['운영', '10:30–20:30 (설·추석 당일 휴무)'],
        ['주소', '인사동길 44 · 입장 무료'],
      ],
      paragraphs: [
        '2004년 12월 문을 연 공예 상가. <em>쌈지</em>는 담배나 돈을 넣어 다니던 작은 주머니를 말한다. 가운데 마당을 둘러싸고 약 500m의 경사로가 나선형으로 꼭대기까지 이어져서, 계단 없이 가게 구경하며 걷다 보면 어느새 옥상에 닿는다. 인사동 골목을 통째로 세워 쌓은 셈이다(설계 최문규).',
        '안에는 한지·도자기·장신구·도장 공방이 모여 있다. 외국인 친구 기념품으로는 <strong>한글 이름 도장</strong>이나 한글 캘리그래피 소품이 무난하다.',
        '쌈지길을 나오면 인사동길 남쪽 절반을 마저 걷는다. 화랑·필방·골동품 가게와 전통찻집이 이어진다. 인사동은 한글 간판을 권장하는 문화지구라 낯익은 프랜차이즈도 한글 간판을 달고 있다 — 친구에게 보여줄 만한 작은 재미.',
      ],
      tips: [
        '꿀을 실처럼 뽑아 만드는 <strong>꿀타래</strong>를 길에서 시연하는 가게가 있다. 외국인 친구 반응이 좋은 간식.',
        '앉아서 쉬고 싶으면 인사동 골목 안 전통찻집에서 대추차·쌍화차 한 잔.',
      ],
      en: 'Ssamziegil (opened 2004) is a crafts mall built around an open courtyard: a gentle spiral ramp about 500 m long winds up four levels past small workshops, so you "walk up" an Insadong alley without climbing stairs. Good souvenirs: a name stamp carved in Hangul, or Hangul calligraphy goods. Insadong-gil itself is lined with galleries, brush and paper shops, antique stores and traditional tea houses.',
    },
    {
      id: 's04', num: '04', order: 4,
      time: '대안', stay: '약 10분',
      tag: '대안 · 10분', defaultPassed: true,
      nameKr: '탑골공원', nameEn: 'Tapgol Park',
      lat: P.tapgol[0], lon: P.tapgol[1],
      ...IMG.tapgol,
      info: [
        ['개방', '09:00–18:00 (11~2월 17시) · 무료'],
      ],
      paragraphs: [
        '1919년 3월 1일, 이 공원의 팔각정에서 독립선언서가 낭독되며 3·1운동 만세 시위가 시작됐다. 안국역 테마역에서 본 그 이야기의 실제 현장이다.',
        '유리 보호각 안의 석탑은 <strong>국보 원각사지 십층석탑</strong>(1467년, 세조 때). 원래 이 자리에 있던 절 원각사의 탑으로, 대리석이라 조선 석탑 가운데서도 유난히 희고 조각이 섬세하다. 보호각은 2028년에 철거할 계획이다.',
        '기본 동선에서는 뺐다. 인사동길 남쪽 끝(삼일대로) 바로 건너편이라, 시간이 남으면 ↶ 복귀로 넣고 10분만 들러도 된다.',
      ],
      tips: [
        '공원 전체가 금주구역이고 어르신들이 많이 쉬는 곳이다. 조용히 둘러보자.',
      ],
      en: 'On March 1, 1919, the Declaration of Independence was read aloud at the octagonal pavilion here, launching the nationwide March 1st Movement against Japanese colonial rule. The marble ten-story pagoda in the glass shelter (1467) is a National Treasure, left from the Buddhist temple Wongaksa that once stood on this site.',
    },
    {
      id: 's05', num: '05', order: 5,
      time: '14:55', stay: '약 20분',
      nameKr: '청계천 — 삼일교에서 광교까지', nameEn: 'Cheonggyecheon Stream',
      mapName: '청계천 삼일교',
      lat: P.samilgyo[0], lon: P.samilgyo[1],
      leaveAt: { nameKr: '청계천 광통교', lat: P.gwangtong[0], lon: P.gwangtong[1] },
      ...IMG.cheonggye,
      info: [
        ['구간', '<strong>삼일교 → 광교</strong> 약 450m (+광통교까지 150m), 한 방향 · 되돌아오지 않음'],
        ['복원', '2005년 10월 1일 개통 · 복원 구간 5.84km'],
      ],
      paragraphs: [
        '조선 시대 한양 도성 한가운데를 흐르던 개천. 한국전쟁 뒤 판자촌과 오수로 몸살을 앓다가 1958년부터 덮여 도로가 됐고, 1971년엔 그 위로 청계고가도로까지 올라갔다. 2003년 고가를 뜯어내고 물길을 다시 열어 2005년 10월 1일 지금의 모습이 됐다.',
        '삼일교 옆 계단으로 물가에 내려가 <strong>상류(서쪽, 광교 방향)</strong>로 걷는다. 장통교까지 둑 벽면을 따라 길게 이어지는 타일 벽화가 <strong>정조대왕 능행반차도</strong> — 1795년 정조가 어머니 혜경궁 홍씨의 회갑을 맞아 수원 화성으로 행차한 행렬을 186m 길이 도자기 타일 위에 옮겨 놓았다.',
        '광교에서 150m 더 올라간 곳의 돌다리가 <strong>광통교</strong>, 조선 시대 도성에서 가장 큰 다리였다(복원하면서 원래 자리보다 상류로 옮겼다). 다리 받침에 거꾸로 박힌 무늬 돌이 보이는데, 태종 이방원이 미워하던 계모 신덕왕후의 무덤(정릉)을 옮기면서 그 병풍석을 가져다 다리를 놓았다는 이야기가 전한다 — 백성들이 밟고 지나가라고.',
      ],
      tips: [
        '원래 계획은 "조금 갔다 돌아오기"였지만 한 방향으로 바꿨다. 광교에서 올라가면 바로 남대문로이고, 그대로 남쪽으로 내려가면 명동이다.',
        '시간이 남으면 광통교를 지나 <strong>청계광장</strong>(높이 20m 소용돌이 조형물 「스프링」)까지 300m 더. 10/24–25엔 청계광장 일대에서 <strong>서울마켓페어</strong>(10:00–21:00)가 열린다.',
      ],
      en: 'Cheonggyecheon ran through the heart of Joseon-era Seoul. It was paved over from 1958 and buried under an elevated highway in 1971; the highway was torn down and the stream restored in 2005. Walking upstream from Samilgyo you pass a 186 m tile mural of King Jeongjo\'s royal procession of 1795, then Gwangtonggyo, the largest bridge of old Seoul — its foundation reuses carved stones taken from the tomb of a queen whom King Taejong despised, supposedly so that commoners would walk over them.',
    },
    {
      id: 's06', num: '06', order: 6,
      time: '15:30', stay: '약 45분',
      nameKr: '명동거리', nameEn: 'Myeongdong Shopping Street',
      mapName: '명동길',
      lat: P.myeongdong[0], lon: P.myeongdong[1],
      ...IMG.myeongdong,
      info: [
        ['진입', '남대문로 쪽 <strong>명동길 서쪽 입구</strong> (을지로입구 사거리에서 남쪽으로 약 270m)'],
        ['노점', '주말은 오후 2시께부터 하나둘, 본격적으로는 4~5시 이후'],
      ],
      paragraphs: [
        '이름은 조선 시대 한성의 <em>명례방</em>에서 왔다. 일제강점기엔 일본인 상업 중심지 바로 옆 번화가였고, 1950~70년대엔 문인·예술가들이 모이던 다방과 술집의 거리였다. 명동예술극장 건물(1936년 영화관으로 지어져 한때 국립극장으로 쓰였다)이 그 시절의 흔적이다.',
        '지금은 화장품·패션 매장과 길거리 음식의 거리. 큰길인 명동길은 남대문로에서 시작해 동쪽으로 약 450m 뻗어 명동성당에서 끝난다 — 그래서 서쪽 입구로 들어와 쭉 걸으면 <em>명동거리 → 명동성당</em> 순서가 자연스럽다. 노점은 명동길과 그 사이 골목(명동8길 등)에 몰린다.',
      ],
      tips: [
        '든든하게 먹으려면 <strong>명동교자</strong>(1966년 개업) 칼국수. 줄이 길어도 회전이 빠르다.',
        '노점 음식은 관광지 가격이다. 계란빵·회오리감자 정도가 무난하고, 랍스터·대게류는 비싸다.',
        '친구가 환전이 필요하면 명동 사설 환전소들이 환율 좋기로 유명하다.',
      ],
      en: 'Myeongdong was a hub of cafés and bars for writers and artists in the 1950s–70s; today it is Seoul\'s busiest street for cosmetics, fashion and street food. Food stalls start opening in the afternoon and peak in the evening. For a proper meal, Myeongdong Kyoja (since 1966) is famous for its kalguksu, hand-cut noodle soup. The main street leads east to Myeongdong Cathedral.',
    },
    {
      id: 's07', num: '07', order: 7,
      time: '16:20', stay: '약 20분',
      nameKr: '명동성당', nameEn: 'Myeongdong Cathedral',
      lat: P.cathedral[0], lon: P.cathedral[1],
      ...IMG.cathedral,
      info: [
        ['토요일 미사', '07:00 · 10:00 · <strong>18:00 · 19:00</strong> — 17:50 이후엔 내부 관람이 어렵다'],
        ['지하', '1898광장 (갤러리·기념품·카페)'],
      ],
      paragraphs: [
        '1898년 5월 29일 축성된 한국 최초의 본격 고딕 양식 성당. 프랑스 선교사 코스트 신부가 설계했고, 그가 1896년 세상을 떠난 뒤 푸아넬 신부가 완공했다. 당시 이름은 종현성당. 천주교 서울대교구의 주교좌 성당이자 사적이다.',
        '1970~80년대엔 민주화 운동의 피난처였다. 1987년 5월 18일 이곳 추도미사에서 박종철 고문치사 사건이 조작됐다는 사실이 폭로됐고, 6월 10일부터 15일까지 학생·시민 수백 명이 성당에서 농성하며 6월 민주항쟁의 구심점이 됐다.',
        '안국역의 3·1운동(1919)에서 명동성당(1987)까지 — 오늘 걸어온 길이 한국 근현대사의 두 장면을 잇는다는 걸 친구에게 짚어 주면 좋다.',
      ],
      tips: [
        '토요일 18:00 미사 전에 들르자. 미사 중엔 출입·촬영을 삼간다.',
      ],
      en: 'Consecrated in 1898, Myeongdong Cathedral is Korea\'s first Gothic-style church, designed by the French missionary Father Eugène Coste. It is the seat of the Archdiocese of Seoul. In 1987 it became a sanctuary for the pro-democracy movement: a cover-up of a student\'s death under police torture was exposed at a Mass here, and hundreds of protesters held a six-day sit-in during the June Democratic Struggle. Saturday Masses at 18:00 and 19:00 — visit before then.',
    },
    {
      id: 's08', num: '08', order: 8,
      time: '17:20', stay: '1시간 30분~',
      nameKr: 'N서울타워', nameEn: 'N Seoul Tower · Namsan',
      mapName: 'N서울타워',
      lat: P.tower[0], lon: P.tower[1],
      ...IMG.tower,
      info: [
        ['일몰', '<strong>17:44</strong> (시민박명 끝 18:10)'],
        ['전망대', '주말 10:00–23:00 (입장 마감 30분 전) · 대인 29,000원'],
        ['버스', '01A·01B · 예장에서 승차 · 카드만'],
      ],
      paragraphs: [
        '1969년 착공한 TV·라디오 송신탑. 1980년 일반에 공개됐고, 2005년 리모델링하며 N서울타워라는 이름을 얻었다. 탑 높이 236.7m, 남산 꼭대기에 서 있어 해발로는 479.7m.',
        '타워 아래 광장엔 조선 시대 봉화를 올리던 <strong>목멱산 봉수대</strong>(복원)와 <strong>사랑의 자물쇠</strong>가 빼곡히 걸린 난간이 있다. 전망대에 오르지 않아도 광장 난간에서 서울 북쪽이 한눈에 들어온다.',
        '오늘 일몰은 17:44. 해 지기 30분쯤 전에 도착해서 노을이 야경으로 넘어가는 걸 보는 게 이 코스의 마무리다.',
      ],
      tips: [
        '10/23–24 <strong>남산 나이트 페스티벌</strong>(16:00–23:00) — 예장공원·남산둘레길 단풍 산책, 백범광장 캠프닉. 볼거리는 늘지만 예장 정류장과 버스가 붐빌 수 있다. 줄이 길면 케이블카도 대안.',
        '전망대 요금이 꽤 비싸다(29,000원). 광장 난간만으로도 야경은 충분히 보인다.',
        '버스 정류장(남산서울타워)은 타워에서 동쪽으로 약 260m 떨어져 있다. 내리면 타워까지 5분쯤 오르막.',
        '산 위는 10월 말 저녁에 꽤 춥다. 겉옷 한 겹 챙기기.',
      ],
      en: 'N Seoul Tower (236.7 m) stands on top of Namsan, 479.7 m above sea level. Built as a broadcasting tower from 1969 and opened to the public in 1980, it was renamed N Seoul Tower after a 2005 renovation. Around its base: a restored Joseon-era beacon mound and railings covered in "love locks". Sunset today is at 17:44 — the view turns from sunset to city lights in about half an hour. Observatory: 29,000 won.',
    },
    {
      id: 's09', num: '09', order: 9,
      time: '종료 · 19:00~', stay: null,
      terminus: true,
      nameKr: '충무로역', nameEn: 'Chungmuro Station · Lines 3 & 4',
      lat: P.chungmuro[0], lon: P.chungmuro[1],
      ...IMG.chungmuro,
      info: [
        ['노선', '3호선 · 4호선'],
        ['하산', '01B → 예장 하차 → 퇴계로 따라 동쪽 약 600m, 9분'],
      ],
      paragraphs: [
        '타워에서 내려가는 버스(01A·01B)는 모두 서쪽 남산도서관 쪽으로 돌아 내려간다. <strong>01B</strong>를 타면 남산케이블카를 거쳐 <strong>예장(명동역 근처)</strong>에 선다. 첫 바퀴를 도는 01B라면 그대로 충무로역 2번 출구까지 간다.',
        '3·4호선이 만나서 어느 방향이든 갈아타기 편하다. 4호선만 탈 거라면 예장에서 서쪽으로 5분 거리인 <strong>명동역</strong>에서 끝내도 된다. 역 바로 옆이 남산골 한옥마을(사진)인데, 밤에는 문을 닫았을 가능성이 크다.',
        '<strong>충무로 vs 동대입구 의견:</strong> 타워에서 동대입구로 가는 버스가 없어서 동대입구는 걸어서 내려가야 한다(약 50분). 그냥 집에 가는 길이면 충무로(또는 명동역)가 간단하고, 저녁을 장충동 족발 골목에서 먹을 거라면 산책 겸 걸어서 동대입구(아래 대안 정거장)로.',
      ],
      tips: [
        '01B에 탈 때 기사님께 "충무로역 가요?" 한 번 물어보면 첫 바퀴인지 바로 알 수 있다.',
      ],
      en: 'End of the tour. Take bus 01B down from the tower; it stops at Yejang, a 5-minute walk from Myeongdong Station (Line 4). Chungmuro Station (Lines 3 & 4) is about 600 m east along Toegye-ro, and some 01B runs continue straight to Chungmuro Exit 2.',
    },
    {
      id: 's10', num: '10', order: 10,
      time: '종료 · 19:50경 (대안)', stay: null,
      terminus: true, tag: '대안 · 걸어서 하산', defaultPassed: true,
      nameKr: '동대입구역', nameEn: 'Dongguk Univ. Station · Line 3',
      lat: P.dongdae[0], lon: P.dongdae[1],
      ...IMG.dongdae,
      info: [
        ['노선', '3호선'],
        ['하산', '<strong>걸어서 약 50분</strong> · 3.0km, 대부분 내리막 (카카오맵 기준 49분)'],
      ],
      paragraphs: [
        '타워에서 내려가는 버스는 모두 서쪽(남산도서관)으로 돌아서, 동대입구로 가려면 <strong>걸어서 내려가는 게</strong> 가장 낫다. 버스를 타면 예장까지 내려갔다가 다시 오르는 방향 버스로 갈아타야 해서 오히려 돌아간다.',
        '길은 단순하다. 타워에서 남쪽 산책로로 내려가 남산의 남쪽 허리를 도는 길(남측순환로)을 따라 동쪽으로 걷다 보면 <strong>국립극장</strong>이 나오고, 거기서 장충단로를 따라 북쪽으로 내려가면 동대입구역이다. 카카오맵 기준 3.0km, 49분 — 처음 조금 빼고는 거의 내리막이다.',
        '이 길을 고를 이유는 저녁이다. 역 앞이 <strong>장충동 족발 골목</strong>이고, 1946년 문을 연 빵집 <strong>태극당</strong>도 가깝다. 야경 보고 50분 걸어 내려오면 배가 딱 고플 때다.',
      ],
      tips: [
        '밤 산길이라 편한 신발로. 출발 전에 휴대폰 배터리를 넉넉히 남겨 두자.',
        '다리가 지쳤으면 01B로 예장까지 내려가서 오르는 방향 01A·01B를 타고 두 정거장(충무로역 → 동대입구역.장충동). 요금은 한 번 더 낸다.',
      ],
      en: 'Alternative ending if you want dinner in Jangchung-dong, famous for jokbal (braised pork trotters), or bread at Taegeukdang, a bakery open since 1946. No bus goes straight down to Dongguk Univ. Station, so we walk: about 3 km and 50 minutes, mostly downhill — along the southern loop road of Namsan to the National Theater, then down to the station.',
    },
  ],

  // 구간 안내: (출발, 도착) 쌍. 시간·거리는 카카오맵 기준.
  // via: 경로를 이 지점들로 지나가게 하는 경유지. legs: 도보/버스(bus: true)로 나눈 구간.
  //   → tools/build_routes.py가 OSM 도보 길찾기로 routes-data.js(실제 경로선)를 만든다.
  // map: 구간 지도 이미지 (위 route() — 한국어 카카오 캡처 / 영어 라벨 위성 지도).
  walks: [
    {
      from: 's01', to: 's03', mode: '도보 4분 · 260m',
      text: '6번 출구로 나와 인사동 골목을 따라 남쪽으로 내려가면 쌈지길.',
      map: route('s01-s03', ['안국역 6번출구', P.anguk], ['쌈지길', P.ssamzie]),
    },
    {
      from: 's01', to: 's02', mode: '도보 7분 · 440m',
      text: '6번 출구에서 서쪽으로 안국동 사거리를 지나 우정국로를 따라 남쪽으로. 「조계사」 표지판을 따라가면 된다.',
      map: route('s01-s02', ['안국역 6번출구', P.anguk], ['조계사', P.jogyesa]),
    },
    {
      from: 's02', to: 's03', mode: '도보 5분 · 350m',
      text: '조계사 정문에서 나와 우정국로를 건너 인사동 쪽 골목으로 동쪽으로 걷는다. 인사동길에 닿으면 쌈지길이 바로 근처.',
      map: route('s02-s03', ['조계사', P.jogyesa], ['쌈지길', P.ssamzie]),
    },
    {
      from: 's03', to: 's04', mode: '도보 10분 · 670m',
      text: '쌈지길에서 인사동길을 따라 남쪽 끝까지 — 화랑·필방·찻집이 이어지는 구간. 길이 끝나는 큰길이 삼일대로다. 건너편이 탑골공원이고, 정문(삼일문)은 남쪽 종로 쪽에 있다.',
      via: [P.insaSouth],
      map: route('s03-s04', ['쌈지길', P.ssamzie], ['인사동길 남쪽 끝', P.insaSouth], ['탑골공원 삼일문', P.tapgol]),
    },
    {
      from: 's03', to: 's05', mode: '도보 14분 · 880m',
      text: '인사동길을 따라 남쪽 끝(삼일대로)까지 내려간 뒤, 삼일대로를 따라 남쪽으로. 종로를 건너 200m 더 가면 삼일교. 다리 옆 계단으로 청계천 물가에 내려간다.',
      via: [P.insaSouth, P.jongno2],
      map: route('s03-s05', ['쌈지길', P.ssamzie], ['인사동길 남쪽 끝', P.insaSouth], ['청계천 삼일교', P.samilgyo]),
    },
    {
      from: 's04', to: 's05', mode: '도보 8분 · 430m',
      text: '삼일문으로 나와 종로2가 사거리에서 종로를 건너고, 삼일대로를 따라 남쪽으로 200m. 삼일교 옆 계단으로 물가에 내려간다.',
      via: [P.jongno2],
      map: route('s04-s05', ['탑골공원 삼일문', P.tapgol], ['청계천 삼일교', P.samilgyo]),
    },
    {
      from: 's05', to: 's06', mode: '총 1.7km · 약 30분 (청계천 포함)',
      text: '물가 산책로로 상류(서쪽)를 향해 장통교 → 광교 → 광통교까지 걷는다(반차도 벽화, 광통교). 계단으로 올라와 <strong>남대문로</strong>를 따라 남쪽으로. 을지로입구 사거리(롯데백화점 본점)를 건너 270m쯤 더 가면 왼쪽(동쪽)으로 명동길 입구.',
      // 물가 산책로를 타도록 하천 중심선 위 점들을 경유지로
      // (다리 좌표는 위쪽 차도에 붙어 되돌아가는 경로가 생겨서 빼고, 물 위 점만 쓴다)
      via: [[37.5681104, 126.9866673], [37.5684594, 126.9852214], [37.5688110, 126.9834423], [37.5689500, 126.9819000], P.gwangtong, P.mdWest],
      map: route('s05-s06', ['청계천 삼일교', P.samilgyo], ['광통교', P.gwangtong], ['명동길 입구', P.mdWest], ['명동예술극장', P.myeongdong]),
      mapNote: EN ? '' : '카카오맵은 물가 산책로 대신 위쪽 청계천로로 안내한다. 실제로는 물가로 걷고 광통교에서 올라오면 된다.',
    },
    {
      from: 's06', to: 's07', mode: '도보 6분 · 350m',
      text: '명동길을 따라 동쪽으로 끝까지. 큰길(삼일대로) 직전, 언덕 위가 명동성당이다.',
      map: route('s06-s07', ['명동예술극장', P.myeongdong], ['명동성당', P.cathedral]),
    },
    {
      from: 's07', to: 's08', transit: true, mode: '도보 17분 (960m) + 버스 약 20분',
      text: '성당 남쪽은 막혀 있어서 북쪽 명동길로 나온 뒤 삼일대로를 따라 남쪽으로 내려가 퇴계로를 건넌다. <strong>남산예장버스환승주차장(예장공원 지하)</strong>이 남산 순환버스 기점 — <strong>01A·01B</strong> 중 먼저 오는 것을 타고 「남산서울타워」에서 내린다. 성당 앞 정류장에서는 타지 말 것(타워로 안 간다).',
      legs: [
        { pts: [P.cathedral, P.yejang] },
        { pts: [P.yejang, P.chungmuro, P.dongdae, P.theaterRd, P.towerStop], bus: true }, // 01A·01B 오르는 길
        { pts: [P.towerStop, P.tower] },
      ],
      map: route('s07-s08', ['명동성당', P.cathedral], ['남산예장버스환승주차장', P.yejang]),
      mapNote: '지도는 성당 → 예장 정류장 도보 구간. 버스 구간은 01A·01B.',
    },
    {
      from: 's08', to: 's09', transit: true, mode: '버스 01B + 도보 9분',
      text: '「남산서울타워」 정류장(타워 동쪽 260m)에서 <strong>01B</strong>를 탄다. 01A는 숭례문·광화문 쪽으로 크게 돈다. 남산도서관 → 남산케이블카를 거쳐 예장에서 내린 뒤, 퇴계로를 따라 동쪽으로 약 600m 걸으면 충무로역.',
      legs: [
        { pts: [P.tower, P.towerStop] },
        { pts: [P.towerStop, P.library, P.cablecar, P.yejang], bus: true }, // 01B 내려가는 길
        { pts: [P.yejang, P.chungmuro] },
      ],
      map: route('s08-s09', ['남산예장버스환승주차장', P.yejang], ['충무로역', P.chungmuro]),
      mapNote: '지도는 예장 하차 후 → 충무로역 도보 구간.',
    },
    {
      from: 's08', to: 's10', mode: '도보 49분 · 3.0km (대부분 내리막)',
      text: '타워에서 남쪽 산책로로 내려가 남측순환로를 따라 동쪽으로. <strong>국립극장</strong>이 보이면 장충단로를 따라 북쪽으로 내려가 동대입구역 6번 출구. 장충동 족발 골목이 역 바로 앞이다.',
      via: [P.theaterRd],
      map: route('s08-s10', ['N서울타워', P.tower], ['국립극장', P.theater], ['동대입구역 6번출구', P.dongdae]),
      mapNote: '타워 → 국립극장 → 동대입구역, 걸어서 내려가는 길.',
    },
  ],
};
