// English edition — loaded by eng.html after stops-data.js.
// navi-core.js lays these fields over window.TOUR_DATA (same ids), so coordinates,
// order, routes and photos stay in stops-data.js. Only text lives here.
//   name: display name (English) · sub: second line (Korean name, handy to show locals)
window.TOUR_I18N = {
  // Tapgol Park is not part of the English / Vietnamese editions at all
  removeStops: ['s04'],
  meta: {
    lang: 'en',
    tourKey: 'seoul-1024-intl', // shared with vn.html — same stops, so progress carries over
    placeProvider: 'google', // 📍 opens Google Maps (English place names)
    title: 'Seoul Downtown Walking Tour',
    subtitle: 'Anguk → Insadong → Cheonggyecheon → Myeongdong → N Seoul Tower · half a day',
    totalTime: '5–6 h',
    stopsCount: '8 (+1)',
    cards: [
      {
        summary: '🧭 The plan — route & timetable (tap to expand)',
        html: `
          <p><strong>The route runs almost straight from north to south</strong> — Anguk → Insadong → Cheonggyecheon → Myeongdong — and then up Namsan by bus. A few choices make it smoother:</p>
          <ol>
            <li><strong>Cheonggyecheon one way.</strong> Go down to the water at Samilgyo Bridge and walk upstream (west) about 450 m to Gwanggyo and Gwangtonggyo, then climb up to Namdaemun-ro, which leads straight to Myeongdong — no walking back. This stretch has the King Jeongjo procession mural and Gwangtonggyo Bridge.</li>
            <li><strong>Enter Myeongdong from the west (Namdaemun-ro).</strong> The main street, Myeongdong-gil, runs from Namdaemun-ro east to the cathedral, so walking it end to end gives <em>Myeongdong Street → Myeongdong Cathedral</em> in order.</li>
            <li><strong>15 minutes at Jogyesa Temple before Ssamziegil.</strong> It's 7 minutes from Anguk Station and the chrysanthemum festival is on.</li>
          </ol>
          <h4>Timetable (worked back from sunset at 17:44)</h4>
          <table>
            <thead><tr><th>Time</th><th>Stop</th></tr></thead>
            <tbody>
              <tr><td class="price">13:20</td><td>Start at Anguk Station Exit 6</td></tr>
              <tr><td class="price">13:30</td><td>Jogyesa Temple, chrysanthemum festival (~15 min)</td></tr>
              <tr><td class="price">13:50</td><td>Ssamziegil · Insadong-gil (~50 min)</td></tr>
              <tr><td class="price">14:55</td><td>Cheonggyecheon: Samilgyo → Gwangtonggyo (~20 min)</td></tr>
              <tr><td class="price">15:30</td><td>Myeongdong Street (~45 min) — weekend food stalls open through the afternoon</td></tr>
              <tr><td class="price">16:20</td><td>Myeongdong Cathedral (~20 min) — before the 18:00 Saturday Mass</td></tr>
              <tr><td class="price">16:40</td><td>Leave the cathedral → 17-min walk to the Yejang bus stop; 17:00 Namsan bus 01A / 01B</td></tr>
              <tr><td class="price">17:20</td><td>N Seoul Tower — sunset 17:44 · twilight ends 18:10 · then the night view</td></tr>
              <tr><td class="price">19:00</td><td>Bus 01B down → Chungmuro Station (or Myeongdong Station)<br>Dinner in Jangchung-dong? Walk down → Dongguk Univ. Station around 19:50</td></tr>
            </tbody>
          </table>
          <h4>Saturday, Oct 24 — what's on</h4>
          <ul>
            <li><strong>Jogyesa Chrysanthemum Festival</strong> (opened Oct 13) — our second stop.</li>
            <li><strong>Seoul Market Fair</strong> around Cheonggye Plaza (Oct 24–25, 10:00–21:00) — 300 m past Gwanggyo.</li>
            <li><strong>Namsan Night Festival</strong> (Oct 23–24, 16:00–23:00) — autumn-leaf walks at Yejang Park and on the Namsan trail, "camp-nic" at Baekbeom Square. More to see, but the Yejang stop and the buses may be crowded.</li>
            <li><strong>Myeongdong Cathedral Saturday Mass</strong> at 18:00 and 19:00 — visit before then.</li>
          </ul>`,
      },
      {
        summary: '🚌 Getting around — Namsan bus, map apps, transit card (tap to expand)',
        html: `
          <h4>Namsan loop buses 01A · 01B</h4>
          <table>
            <tbody>
              <tr><td><strong>Board at</strong></td><td>Namsan Yejang Bus Terminal (under Yejang Park · 5 min walk from Myeongdong Stn, 17 min from Myeongdong Cathedral) — it's the first stop, so you'll likely get a seat</td></tr>
              <tr><td><strong>Fare</strong></td><td class="price">1,400–1,500 won by card</td></tr>
              <tr><td><strong>Frequency</strong></td><td>01A every 4–12 min (weekends) · 01B every 10–18 min</td></tr>
              <tr><td><strong>Hours</strong></td><td>06:30 – 23:00 (last 01B at 23:20)</td></tr>
            </tbody>
          </table>
          <div class="warning">⚠️ <strong>No cash on board.</strong> The stop in front of Myeongdong Cathedral is near the end of the 01A line and does not go up to the tower — walk to Yejang and board there.</div>
          <h4>Coming down</h4>
          <ul>
            <li>Both lines go down the west side (Namsan Library). <strong>01B</strong> goes via the Namsan Cable Car to Yejang — best for Myeongdong and Chungmuro.</li>
            <li>01A takes a long loop via Sungnyemun, Gwanghwamun and Anguk.</li>
            <li>No bus goes from the tower to Dongguk Univ. Station — <strong>walk down</strong> (about 3 km, 50 min).</li>
          </ul>
          <h4>Cable car · gondola</h4>
          <ul>
            <li>Namsan Cable Car: 10:00–23:00, tickets until 30 min before closing, about 3 min one way. Lower station in Hoehyeon-dong, near Myeongdong Station.</li>
            <li>The Namsan gondola is <strong>not open</strong> (construction halted).</li>
          </ul>
          <h4>Map apps</h4>
          <ul>
            <li>Google Maps <strong>can't give walking directions in Korea</strong> (only some public transit). The Directions buttons on this page open Kakao Map; the 📍 buttons open the place in Google Maps.</li>
            <li>For your own phone, <strong>Naver Map</strong> has an English mode and walking directions.</li>
            <li>Transit card: buy a <strong>T-money</strong> card at a convenience store and top it up with cash.</li>
          </ul>
          <p style="font-size: 11px; color: var(--ink-mute); margin-top: 10px;">Sources: nseoultower.co.kr · Seoul Metropolitan Government · Korea Astronomy and Space Science Institute · Jogyesa notices · checked 2026-10-23. The bus fare is listed as 1,400 or 1,500 won depending on the source.</p>`,
      },
    ],
  },

  stops: {
    s01: {
      name: 'Anguk Station', sub: '안국역 · Line 3',
      time: 'Start · 13:20',
      info: [
        ['Exit', '<strong>Exit 6</strong> → Jogyesa 440 m, 7 min · straight to Ssamziegil 260 m, 4 min'],
        ['Line', 'Subway Line 3 (orange)'],
      ],
      paragraphs: [
        'The starting point for sightseeing in central Seoul: Bukchon Hanok Village and Changdeokgung Palace lie to the north, Insadong to the south. Today we leave by Exit 6 and head down into Insadong.',
        'In 2019, for the 100th anniversary of the March 1st Independence Movement and the Korean Provisional Government, the station was redesigned as an <strong>independence-movement theme station</strong>. The blue <em>100 Steps</em> in the passage toward Exits 3–5 are engraved with letters from the 1919 Declaration of Independence; there are also the <em>100-Year Pillars</em> on B2 and the <em>100-Year Sky Gate</em> at Exit 4 (toward Unhyeongung), modeled on the gate of the Provisional Government building.',
        "Today's walk links two moments of modern Korean history — the March 1st Movement (1919), remembered here at Anguk, and the June 1987 pro-democracy protests at Myeongdong Cathedral near the end. In between: crafts, shopping and street food.",
      ],
      tips: [
        "Check your T-money card balance before we start — the Namsan buses don't take cash.",
      ],
    },
    s02: {
      name: 'Jogyesa Temple', sub: '조계사',
      time: '13:30', stay: 'about 15 min', tag: 'Chrysanthemum festival',
      info: [
        ['Oct 24', 'The <strong>16th Chrysanthemum Festival</strong> is on (opened Oct 13)'],
        ['Entry', 'Free'],
      ],
      paragraphs: [
        'The head temple of the Jogye Order, the largest school of Korean Buddhism. A traditional temple hall sitting among office towers is a striking sight. The current main hall (Daeungjeon) was built in 1938 by moving a large wooden hall here from Jeongeup in the southwest.',
        "Right now the courtyard is covered in chrysanthemums for the festival that opened on October 13. It's 7 minutes from Anguk Station and 5 minutes from Ssamziegil, so it barely changes the route — and 15 minutes here makes for very different photos.",
      ],
      tips: [
        'The central front door of the main hall is for monks — use the side doors, and avoid taking photos during services.',
      ],
    },
    s03: {
      name: 'Ssamziegil · Insadong-gil', sub: '쌈지길 · 인사동길',
      time: '13:50', stay: 'about 50 min',
      info: [
        ['Hours', "10:30–20:30 (closed on Lunar New Year's Day and Chuseok)"],
        ['Address', '44 Insadong-gil · free entry'],
      ],
      paragraphs: [
        'A crafts mall opened in December 2004. <em>Ssamzie</em> means a small pouch once used for carrying money or tobacco. A gentle ramp about 500 m long spirals up around an open courtyard, so you reach the rooftop while browsing shops without climbing any stairs — like an Insadong alley stacked up vertically (architect Choi Moon-gyu).',
        'Inside are small workshops selling hanji paper, ceramics, jewelry and stamps. A good souvenir: a <strong>name stamp carved in Hangul</strong>, or Hangul calligraphy goods.',
        'After Ssamziegil we walk the southern half of Insadong-gil: galleries, brush and paper shops, antique stores and traditional tea houses. Insadong is a cultural district that encourages Hangul signs, so even familiar chains put up their names in Korean letters — fun to spot.',
      ],
      tips: [
        "Look for shops making <strong>kkultarae</strong> (dragon's beard candy) — honey pulled into thousands of fine threads. Fun to watch, good to eat.",
        'For a break, try jujube tea (daechu-cha) or ssanghwa tea at a traditional tea house in the alleys.',
      ],
    },
    s05: {
      name: 'Cheonggyecheon Stream — Samilgyo to Gwanggyo', sub: '청계천 — 삼일교에서 광교까지',
      time: '14:55', stay: 'about 20 min',
      info: [
        ['Section', '<strong>Samilgyo → Gwanggyo</strong> about 450 m (+150 m to Gwangtonggyo), one way — no walking back'],
        ['Restored', 'Reopened Oct 1, 2005 · 5.84 km restored'],
      ],
      paragraphs: [
        'This stream once ran through the middle of Joseon-era Seoul. After the Korean War it was lined with shacks and sewage; it was paved over from 1958, and in 1971 an elevated highway was built on top of it. In 2003 the highway was torn down and the stream reopened, taking its current form on October 1, 2005.',
        "Take the stairs beside Samilgyo Bridge down to the water and walk <strong>upstream (west, toward Gwanggyo)</strong>. The long tile mural along the embankment up to Janggyo is <strong>King Jeongjo's Royal Procession</strong> — his 1795 procession to Hwaseong Fortress in Suwon for his mother Lady Hyegyeong's 60th birthday, reproduced on 186 m of ceramic tiles.",
        'The stone bridge 150 m past Gwanggyo is <strong>Gwangtonggyo</strong>, the largest bridge of old Seoul (moved slightly upstream when it was restored). Look for patterned stones set upside down in its base: King Taejong is said to have taken the carved screen stones from the tomb of his hated stepmother, Queen Sindeok, and built them into the bridge — so that commoners would walk over them.',
      ],
      tips: [
        "We walk it one way instead of going and coming back: climb up at Gwanggyo / Gwangtonggyo and Namdaemun-ro leads straight south to Myeongdong.",
        'With time to spare, walk 300 m past Gwangtonggyo to <strong>Cheonggye Plaza</strong> and the 20 m spiral sculpture "Spring". On Oct 24–25 the <strong>Seoul Market Fair</strong> runs around the plaza (10:00–21:00).',
      ],
    },
    s06: {
      name: 'Myeongdong Street', sub: '명동거리',
      time: '15:30', stay: 'about 45 min',
      info: [
        ['Enter', 'From the <strong>west end of Myeongdong-gil</strong> on Namdaemun-ro (about 270 m south of the Euljiro 1-ga intersection)'],
        ['Food stalls', 'On weekends some open from about 2 pm; most from 4–5 pm'],
      ],
      paragraphs: [
        'The name comes from Myeongnyebang, a district of Joseon-era Seoul. Under Japanese rule it was a busy area next to the Japanese commercial center; in the 1950s–70s it was full of cafés and bars where writers and artists gathered. The Myeongdong Theater building (built in 1936 as a cinema, later the National Theater) is a remnant of that time.',
        "Today it's a street of cosmetics, fashion and street food. The main street, Myeongdong-gil, starts at Namdaemun-ro and runs about 450 m east to Myeongdong Cathedral — so entering from the west end and walking straight through leads naturally to the cathedral. Food stalls cluster on Myeongdong-gil and the side alleys (Myeongdong 8-gil and others).",
      ],
      tips: [
        'For a proper meal: kalguksu (hand-cut noodle soup) at <strong>Myeongdong Kyoja</strong> (since 1966). The line moves fast.',
        'Street food is priced for tourists — egg bread (gyeranppang) and tornado potatoes are good value; lobster and king crab are expensive.',
        "Need cash? Myeongdong's private money exchangers are known for good rates.",
      ],
    },
    s07: {
      name: 'Myeongdong Cathedral', sub: '명동성당',
      time: '16:20', stay: 'about 20 min',
      info: [
        ['Saturday Mass', '07:00 · 10:00 · <strong>18:00 · 19:00</strong> — hard to look around inside after 17:50'],
        ['Underground', '1898 Plaza (gallery, gift shop, café)'],
      ],
      paragraphs: [
        "Consecrated on May 29, 1898, it is Korea's first true Gothic-style church. It was designed by the French missionary Father Eugène Coste and completed by Father Poisnel after Coste died in 1896; at the time it was called Jonghyeon Church. It is the cathedral of the Archdiocese of Seoul and a designated historic site.",
        'In the 1970s–80s it was a sanctuary for the pro-democracy movement. At a memorial Mass here on May 18, 1987, it was revealed that the death of university student Park Jong-cheol under police torture had been covered up; from June 10 to 15, hundreds of students and citizens held a sit-in at the cathedral, which became a focal point of the June Democratic Struggle.',
        "From the March 1st Movement at Anguk (1919) to Myeongdong Cathedral (1987) — today's walk connects two key moments of modern Korean history.",
      ],
      tips: [
        "Visit before the 18:00 Saturday Mass. During Mass, don't walk in or take photos.",
      ],
    },
    s08: {
      name: 'N Seoul Tower', sub: 'N서울타워 · 남산',
      time: '17:20', stay: '1.5 h+',
      info: [
        ['Sunset', '<strong>17:44</strong> (civil twilight ends 18:10)'],
        ['Observatory', 'Weekends 10:00–23:00 (last entry 30 min before) · adults 29,000 won'],
        ['Bus', '01A / 01B · board at Yejang · card only'],
      ],
      paragraphs: [
        'A TV and radio broadcasting tower begun in 1969, opened to the public in 1980 and renamed N Seoul Tower after a 2005 renovation. The tower is 236.7 m tall and stands on top of Namsan, 479.7 m above sea level.',
        'On the plaza below are the restored <strong>Mongmyeoksan beacon mound</strong>, where Joseon soldiers lit signal fires, and railings packed with <strong>love locks</strong>. Even without going up to the observatory, the railings give you a wide view over northern Seoul.',
        'Sunset today is at 17:44. Arrive about 30 minutes before and watch the sky fade into the city lights — the finale of the walk.',
      ],
      tips: [
        'Oct 23–24: <strong>Namsan Night Festival</strong> (16:00–23:00) — autumn-leaf walks at Yejang Park and on the Namsan trail, "camp-nic" at Baekbeom Square. More to see, but the Yejang stop and the buses may be crowded; the cable car is an alternative.',
        'The observatory is pricey (29,000 won). The plaza railings already give a great night view.',
        'The "Namsan Seoul Tower" bus stop is about 260 m east of the tower — a 5-minute uphill walk.',
        'It gets chilly on the mountain on late-October evenings. Bring a jacket.',
      ],
    },
    s09: {
      name: 'Chungmuro Station', sub: '충무로역 · Lines 3 & 4',
      time: 'End · 19:00~',
      info: [
        ['Lines', 'Subway Lines 3 (orange) · 4 (sky blue)'],
        ['Getting down', 'Bus 01B → get off at Yejang → walk east along Toegye-ro about 600 m, 9 min'],
      ],
      paragraphs: [
        'Both buses down from the tower (01A, 01B) go around the west side past Namsan Library. Take <strong>01B</strong>: it passes the Namsan Cable Car and stops at <strong>Yejang (near Myeongdong Station)</strong>. If your 01B is on its first loop, it continues straight to Chungmuro Station Exit 2.',
        "Lines 3 and 4 meet here, so it's easy to transfer in any direction. If you only need Line 4, you can finish at <strong>Myeongdong Station</strong>, a 5-minute walk west of Yejang. Namsangol Hanok Village (photo) is right next to Chungmuro Station but is probably closed at night.",
        '<strong>Chungmuro or Dongguk Univ.?</strong> No bus goes from the tower to Dongguk Univ. Station, so that ending means walking down (about 50 min). If you\'re just heading home, Chungmuro (or Myeongdong) is simplest; for dinner at the Jangchung-dong jokbal street, walk down to Dongguk Univ. (the optional stop below).',
      ],
      tips: [
        'When boarding 01B, ask the driver "충무로역 가요? (Chungmuro-yeok gayo?)" to check whether it goes on to Chungmuro.',
      ],
    },
    s10: {
      name: 'Dongguk Univ. Station', sub: '동대입구역 · Line 3',
      time: 'End · around 19:50 (optional)', tag: 'Optional · walk down',
      info: [
        ['Line', 'Subway Line 3 (orange)'],
        ['Getting down', '<strong>About 50 min on foot</strong> · 3.0 km, mostly downhill (49 min on Kakao Map)'],
      ],
      paragraphs: [
        "The buses down from the tower all go around the west side, so the best way to Dongguk Univ. Station is to <strong>walk down</strong>. By bus you'd ride down to Yejang and then take an uphill bus back — a detour.",
        'The way is simple: take the path south from the tower and follow the road around the southern side of Namsan (the Southern Loop) east to the <strong>National Theater of Korea</strong>, then walk north down Jangchungdan-ro to the station. About 3.0 km, 49 min on Kakao Map — almost all downhill after the first stretch.',
        "The reason to pick this ending is dinner: the station is right by <strong>Jangchung-dong Jokbal Street</strong> (braised pork trotters), and <strong>Taegeukdang</strong>, a bakery open since 1946, is close by. After the night view and a 50-minute walk down, you'll be hungry.",
      ],
      tips: [
        "It's a mountain road at night — wear comfortable shoes and keep enough phone battery.",
        'If your legs are tired: take 01B down to Yejang, then an uphill 01A / 01B two stops (Chungmuro Stn → Dongguk Univ. Stn). You pay the fare again.',
      ],
    },
  },

  walks: {
    's01>s03': {
      mode: 'Walk 4 min · 260 m',
      text: 'From Exit 6, follow the Insadong alley south to Ssamziegil.',
    },
    's01>s02': {
      mode: 'Walk 7 min · 440 m',
      text: 'From Exit 6, go west past the Anguk-dong intersection and south along Ujeongguk-ro. Follow the signs for Jogyesa.',
    },
    's02>s03': {
      mode: 'Walk 5 min · 350 m',
      text: "Leave by the temple's main gate, cross Ujeongguk-ro and walk east through the Insadong alleys. Ssamziegil is right where you reach Insadong-gil.",
    },
    's03>s05': {
      mode: 'Walk 14 min · 880 m',
      text: 'Follow Insadong-gil to its south end (Samil-daero), then walk south along Samil-daero. Cross Jong-ro and continue 200 m to Samilgyo Bridge; take the stairs beside the bridge down to the stream.',
    },
    's05>s06': {
      mode: '1.7 km total · about 30 min (incl. the stream)',
      text: 'Walk upstream (west) along the waterside path past Janggyo and Gwanggyo to Gwangtonggyo (procession mural, Gwangtonggyo Bridge). Climb the stairs and head south along <strong>Namdaemun-ro</strong>. Cross the Euljiro 1-ga intersection (Lotte Department Store); after about 270 m the entrance to Myeongdong-gil is on your left (east).',
    },
    's06>s07': {
      mode: 'Walk 6 min · 350 m',
      text: 'Follow Myeongdong-gil east to the end. Just before the big road (Samil-daero), Myeongdong Cathedral stands on the hill.',
    },
    's07>s08': {
      mode: 'Walk 17 min (960 m) + bus about 20 min',
      text: 'The south side of the cathedral grounds is closed off, so exit north onto Myeongdong-gil, walk south along Samil-daero and cross Toegye-ro. The <strong>Namsan Yejang Bus Terminal (under Yejang Park)</strong> is where the Namsan loop buses start — take whichever comes first, <strong>01A or 01B</strong>, and get off at "Namsan Seoul Tower". Don\'t board at the stop in front of the cathedral (that bus doesn\'t go to the tower).',
      mapNote: 'The map shows the walk from the cathedral to the Yejang bus stop; from there, bus 01A / 01B.',
    },
    's08>s09': {
      mode: 'Bus 01B + walk 9 min',
      text: 'Take <strong>01B</strong> from the "Namsan Seoul Tower" stop (260 m east of the tower); 01A loops the long way via Sungnyemun and Gwanghwamun. 01B passes Namsan Library and the Namsan Cable Car — get off at Yejang and walk about 600 m east along Toegye-ro to Chungmuro Station.',
      mapNote: 'The map shows the walk from Yejang (after getting off the bus) to Chungmuro Station.',
    },
    's08>s10': {
      mode: 'Walk 49 min · 3.0 km (mostly downhill)',
      text: 'From the tower take the path south and follow the southern loop road east. When you see the <strong>National Theater</strong>, walk north down Jangchungdan-ro to Dongguk Univ. Station Exit 6. The jokbal street is right outside the station.',
      mapNote: 'Tower → National Theater → Dongguk Univ. Station, on foot.',
    },
  },
};
