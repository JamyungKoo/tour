// Bản tiếng Việt — vn.html nạp file này sau stops-data.js.
// navi-core.js ghi đè các trường này lên window.TOUR_DATA (theo id); tọa độ, thứ tự, tuyến đường và ảnh vẫn ở stops-data.js.
// Tên địa danh giữ bằng tiếng Anh để khớp với nhãn trên bản đồ (images/routes-en/).
//   name: tên hiển thị (tiếng Anh) · sub: dòng thứ hai (tên tiếng Hàn — tiện đưa cho người địa phương xem)
window.TOUR_I18N = {
  // Tapgol Park không có trong bản tiếng Anh / tiếng Việt
  removeStops: ['s04'],
  meta: {
    lang: 'vi',
    tourKey: 'seoul-1024-intl', // dùng chung với eng.html — cùng các điểm dừng nên tiến độ được giữ
    placeProvider: 'google', // 📍 mở Google Maps (tên địa danh tiếng Anh)
    title: 'Tour đi bộ trung tâm Seoul',
    subtitle: 'Anguk → Insadong → Cheonggyecheon → Myeongdong → N Seoul Tower · nửa ngày',
    totalTime: '5–6 giờ',
    stopsCount: '8 (+1)',
    cards: [
      {
        summary: '🧭 Kế hoạch — lộ trình & lịch trình (chạm để mở)',
        html: `
          <p><strong>Lộ trình gần như là một đường thẳng từ bắc xuống nam</strong> — Anguk → Insadong → Cheonggyecheon → Myeongdong — rồi lên Namsan bằng xe buýt. Vài lựa chọn giúp đi nhẹ nhàng hơn:</p>
          <ol>
            <li><strong>Đi Cheonggyecheon một chiều.</strong> Xuống bờ suối ở Samilgyo Bridge, đi ngược dòng (về phía tây) khoảng 450 m tới Gwanggyo và Gwangtonggyo, rồi lên Namdaemun-ro — con đường dẫn thẳng tới Myeongdong, không phải quay lại. Đoạn này có bức tranh gốm về đoàn rước của vua Jeongjo và cây cầu đá Gwangtonggyo.</li>
            <li><strong>Vào Myeongdong từ phía tây (Namdaemun-ro).</strong> Con phố chính Myeongdong-gil chạy từ Namdaemun-ro sang phía đông tới nhà thờ, nên đi hết từ đầu đến cuối là đúng thứ tự <em>Myeongdong Street → Myeongdong Cathedral</em>.</li>
            <li><strong>Ghé Jogyesa Temple 15 phút trước Ssamziegil.</strong> Chỉ cách Anguk Station 7 phút đi bộ, và lễ hội hoa cúc đang diễn ra.</li>
          </ol>
          <h4>Lịch trình (tính ngược từ giờ hoàng hôn 17:44)</h4>
          <table>
            <thead><tr><th>Giờ</th><th>Điểm dừng</th></tr></thead>
            <tbody>
              <tr><td class="price">13:20</td><td>Xuất phát tại Anguk Station, Exit 6</td></tr>
              <tr><td class="price">13:30</td><td>Jogyesa Temple, lễ hội hoa cúc (~15 phút)</td></tr>
              <tr><td class="price">13:50</td><td>Ssamziegil · Insadong-gil (~50 phút)</td></tr>
              <tr><td class="price">14:55</td><td>Cheonggyecheon: Samilgyo → Gwangtonggyo (~20 phút)</td></tr>
              <tr><td class="price">15:30</td><td>Myeongdong Street (~45 phút) — cuối tuần các quầy đồ ăn đường phố mở dần từ buổi chiều</td></tr>
              <tr><td class="price">16:20</td><td>Myeongdong Cathedral (~20 phút) — trước thánh lễ 18:00 thứ Bảy</td></tr>
              <tr><td class="price">16:40</td><td>Rời nhà thờ → đi bộ 17 phút tới bến xe Yejang; 17:00 lên xe buýt Namsan 01A / 01B</td></tr>
              <tr><td class="price">17:20</td><td>N Seoul Tower — hoàng hôn 17:44 · trời tối hẳn 18:10 · sau đó ngắm cảnh đêm</td></tr>
              <tr><td class="price">19:00</td><td>Xe buýt 01B xuống núi → Chungmuro Station (hoặc Myeongdong Station)<br>Ăn tối ở Jangchung-dong? Đi bộ xuống → Dongguk Univ. Station khoảng 19:50</td></tr>
            </tbody>
          </table>
          <h4>Thứ Bảy 24/10 — có gì đặc biệt</h4>
          <ul>
            <li><strong>Lễ hội hoa cúc ở Jogyesa Temple</strong> (khai mạc 13/10) — điểm dừng thứ hai của chúng ta.</li>
            <li><strong>Seoul Market Fair</strong> quanh Cheonggye Plaza (24–25/10, 10:00–21:00) — đi thêm 300 m qua Gwanggyo.</li>
            <li><strong>Namsan Night Festival</strong> (23–24/10, 16:00–23:00) — dạo ngắm lá mùa thu ở Yejang Park và đường mòn Namsan, "camp-nic" ở Baekbeom Square. Nhiều thứ để xem, nhưng bến Yejang và xe buýt có thể đông.</li>
            <li><strong>Thánh lễ thứ Bảy ở Myeongdong Cathedral</strong> lúc 18:00 và 19:00 — nên ghé trước giờ đó.</li>
          </ul>`,
      },
      {
        summary: '🚌 Di chuyển — xe buýt Namsan, ứng dụng bản đồ, thẻ giao thông (chạm để mở)',
        html: `
          <h4>Xe buýt vòng Namsan 01A · 01B</h4>
          <table>
            <tbody>
              <tr><td><strong>Lên xe tại</strong></td><td>Namsan Yejang Bus Terminal (dưới Yejang Park · 5 phút đi bộ từ Myeongdong Station, 17 phút từ Myeongdong Cathedral) — là bến đầu nên thường có chỗ ngồi</td></tr>
              <tr><td><strong>Giá vé</strong></td><td class="price">1.400–1.500 won (trả bằng thẻ)</td></tr>
              <tr><td><strong>Tần suất</strong></td><td>01A 4–12 phút/chuyến (cuối tuần) · 01B 10–18 phút/chuyến</td></tr>
              <tr><td><strong>Giờ chạy</strong></td><td>06:30 – 23:00 (chuyến 01B cuối lúc 23:20)</td></tr>
            </tbody>
          </table>
          <div class="warning">⚠️ <strong>Không nhận tiền mặt.</strong> Bến trước Myeongdong Cathedral nằm gần cuối tuyến 01A và không lên tháp — hãy đi bộ tới Yejang và lên xe ở đó.</div>
          <h4>Khi xuống núi</h4>
          <ul>
            <li>Cả hai tuyến đều xuống theo phía tây (Namsan Library). <strong>01B</strong> đi qua Namsan Cable Car tới Yejang — tiện nhất để về Myeongdong và Chungmuro.</li>
            <li>01A đi vòng xa qua Sungnyemun, Gwanghwamun và Anguk.</li>
            <li>Không có xe buýt từ tháp đi thẳng tới Dongguk Univ. Station — <strong>hãy đi bộ xuống</strong> (khoảng 3 km, 50 phút).</li>
          </ul>
          <h4>Cáp treo · gondola</h4>
          <ul>
            <li>Namsan Cable Car: 10:00–23:00, bán vé tới 30 phút trước giờ đóng, khoảng 3 phút mỗi chiều. Ga dưới ở Hoehyeon-dong, gần Myeongdong Station.</li>
            <li>Gondola Namsan <strong>chưa mở</strong> (công trình đang tạm dừng).</li>
          </ul>
          <h4>Ứng dụng bản đồ</h4>
          <ul>
            <li>Google Maps <strong>không chỉ đường đi bộ ở Hàn Quốc</strong> (chỉ có một phần phương tiện công cộng). Nút Chỉ đường trên trang này mở Kakao Map; nút 📍 mở địa điểm trên Google Maps.</li>
            <li>Trên điện thoại của bạn, <strong>Naver Map</strong> có chế độ tiếng Anh và chỉ đường đi bộ.</li>
            <li>Thẻ giao thông: mua thẻ <strong>T-money</strong> ở cửa hàng tiện lợi và nạp bằng tiền mặt.</li>
          </ul>
          <p style="font-size: 11px; color: var(--ink-mute); margin-top: 10px;">Nguồn: nseoultower.co.kr · Seoul Metropolitan Government · Korea Astronomy and Space Science Institute · thông báo của Jogyesa Temple · kiểm tra ngày 23/10/2026. Giá vé xe buýt ghi 1.400 hoặc 1.500 won tùy nguồn.</p>`,
      },
    ],
  },

  stops: {
    s01: {
      name: 'Anguk Station', sub: '안국역 · Line 3',
      time: 'Xuất phát · 13:20',
      info: [
        ['Lối ra', '<strong>Exit 6</strong> → Jogyesa Temple 440 m, 7 phút · đi thẳng tới Ssamziegil 260 m, 4 phút'],
        ['Tuyến', 'Tàu điện ngầm Line 3 (màu cam)'],
      ],
      paragraphs: [
        'Điểm xuất phát để tham quan trung tâm Seoul: phía bắc là Bukchon Hanok Village và Changdeokgung Palace, phía nam là Insadong. Hôm nay chúng ta ra Exit 6 rồi đi xuống Insadong.',
        'Năm 2019, nhân kỷ niệm 100 năm Phong trào Độc lập 1/3 và Chính phủ Lâm thời Hàn Quốc, nhà ga được thiết kế lại thành <strong>ga chủ đề phong trào độc lập</strong>. <em>100 bậc thang</em> màu xanh ở lối đi về phía Exit 3–5 khắc chữ từ bản Tuyên ngôn Độc lập 1919; ngoài ra còn có <em>Cột 100 năm</em> ở tầng B2 và <em>Cổng trời 100 năm</em> ở Exit 4 (phía Unhyeongung), mô phỏng cổng tòa nhà Chính phủ Lâm thời.',
        'Hành trình hôm nay nối hai dấu mốc của lịch sử cận hiện đại Hàn Quốc — Phong trào 1/3 (1919) được tưởng nhớ ở Anguk, và cuộc đấu tranh dân chủ tháng 6/1987 ở Myeongdong Cathedral gần cuối tuyến. Ở giữa là đồ thủ công, mua sắm và đồ ăn đường phố.',
      ],
      tips: [
        'Kiểm tra số dư thẻ T-money trước khi đi — xe buýt Namsan không nhận tiền mặt.',
      ],
    },
    s02: {
      name: 'Jogyesa Temple', sub: '조계사',
      time: '13:30', stay: 'khoảng 15 phút', tag: 'Lễ hội hoa cúc',
      info: [
        ['24/10', 'Đang diễn ra <strong>Lễ hội hoa cúc lần thứ 16</strong> (khai mạc 13/10)'],
        ['Vé vào', 'Miễn phí'],
      ],
      paragraphs: [
        'Ngôi chùa chính của tông Jogye, dòng Phật giáo lớn nhất Hàn Quốc. Một chánh điện truyền thống nằm giữa những tòa nhà văn phòng là khung cảnh rất ấn tượng. Chánh điện hiện nay (Daeungjeon) được dựng năm 1938 bằng cách di dời một tòa nhà gỗ lớn từ Jeongeup ở phía tây nam về đây.',
        'Lúc này sân chùa phủ đầy hoa cúc nhờ lễ hội khai mạc ngày 13/10. Chùa cách Anguk Station 7 phút và cách Ssamziegil 5 phút, nên hầu như không làm lệch lộ trình — chỉ 15 phút ở đây là đã có những bức ảnh rất khác.',
      ],
      tips: [
        'Cửa chính giữa mặt trước chánh điện dành cho các nhà sư — hãy đi cửa bên, và tránh chụp ảnh khi đang có buổi lễ.',
      ],
    },
    s03: {
      name: 'Ssamziegil · Insadong-gil', sub: '쌈지길 · 인사동길',
      time: '13:50', stay: 'khoảng 50 phút',
      info: [
        ['Giờ mở cửa', '10:30–20:30 (nghỉ ngày mùng 1 Tết Nguyên đán và Chuseok)'],
        ['Địa chỉ', '44 Insadong-gil · vào cửa miễn phí'],
      ],
      paragraphs: [
        'Khu mua sắm đồ thủ công mở cửa tháng 12/2004. <em>Ssamzie</em> là chiếc túi nhỏ ngày xưa dùng để đựng tiền hay thuốc lá. Một lối dốc thoai thoải dài khoảng 500 m xoắn quanh khoảng sân giữa, nên bạn vừa xem cửa hàng vừa lên tới sân thượng mà không phải leo bậc nào — như thể một con hẻm Insadong được dựng đứng lên (kiến trúc sư Choi Moon-gyu).',
        'Bên trong là các xưởng nhỏ bán giấy hanji, đồ gốm, trang sức và con dấu. Quà lưu niệm gợi ý: <strong>con dấu khắc tên bằng chữ Hangul</strong>, hoặc đồ thư pháp Hangul.',
        'Sau Ssamziegil, chúng ta đi tiếp nửa phía nam của Insadong-gil: phòng tranh, cửa hàng bút lông và giấy, đồ cổ và quán trà truyền thống. Insadong là khu văn hóa khuyến khích bảng hiệu bằng chữ Hangul, nên cả những thương hiệu quen thuộc cũng viết tên bằng chữ Hàn — thử tìm xem.',
      ],
      tips: [
        'Tìm các cửa hàng làm <strong>kkultarae</strong> (kẹo râu rồng) — mật ong được kéo thành hàng nghìn sợi mảnh. Xem vui mà ăn cũng ngon.',
        'Muốn nghỉ chân, hãy thử trà táo đỏ (daechu-cha) hoặc trà ssanghwa ở một quán trà truyền thống trong hẻm.',
      ],
    },
    s05: {
      name: 'Cheonggyecheon Stream — Samilgyo to Gwanggyo', sub: '청계천 — 삼일교에서 광교까지',
      time: '14:55', stay: 'khoảng 20 phút',
      info: [
        ['Đoạn đi', '<strong>Samilgyo → Gwanggyo</strong> khoảng 450 m (+150 m tới Gwangtonggyo), một chiều — không quay lại'],
        ['Phục hồi', 'Mở lại ngày 1/10/2005 · phục hồi 5,84 km'],
      ],
      paragraphs: [
        'Con suối này từng chảy giữa lòng Seoul thời Joseon. Sau Chiến tranh Triều Tiên, hai bên bờ đầy nhà ổ chuột và nước thải; suối bị lấp làm đường từ năm 1958, và năm 1971 một đường cao tốc trên cao được xây ngay phía trên. Năm 2003 đường cao tốc bị dỡ bỏ, dòng suối được khơi lại và có diện mạo như hiện nay từ ngày 1/10/2005.',
        'Đi cầu thang cạnh Samilgyo Bridge xuống bờ suối rồi đi <strong>ngược dòng (về phía tây, hướng Gwanggyo)</strong>. Bức tranh gốm dài dọc bờ kè tới Janggyo là <strong>Đoàn rước của vua Jeongjo</strong> — chuyến đi năm 1795 tới Hwaseong Fortress ở Suwon nhân dịp mừng thọ 60 tuổi của mẹ ông, Hyegyeong, được tái hiện trên 186 m gạch gốm.',
        'Cây cầu đá cách Gwanggyo 150 m là <strong>Gwangtonggyo</strong>, cây cầu lớn nhất của Seoul xưa (được dời lên thượng nguồn một chút khi phục hồi). Hãy tìm những phiến đá chạm hoa văn bị đặt lộn ngược ở chân cầu: tương truyền vua Taejong đã lấy đá bình phong từ lăng mộ của người mẹ kế mà ông căm ghét, Hoàng hậu Sindeok, để xây cầu — cho dân chúng giẫm lên.',
      ],
      tips: [
        'Chúng ta đi một chiều thay vì đi rồi quay lại: lên ở Gwanggyo / Gwangtonggyo là có Namdaemun-ro dẫn thẳng về phía nam tới Myeongdong.',
        'Nếu còn thời gian, đi thêm 300 m qua Gwangtonggyo tới <strong>Cheonggye Plaza</strong> và tác phẩm xoắn ốc cao 20 m "Spring". Ngày 24–25/10 có <strong>Seoul Market Fair</strong> quanh quảng trường (10:00–21:00).',
      ],
    },
    s06: {
      name: 'Myeongdong Street', sub: '명동거리',
      time: '15:30', stay: 'khoảng 45 phút',
      info: [
        ['Lối vào', 'Từ <strong>đầu phía tây của Myeongdong-gil</strong> trên Namdaemun-ro (khoảng 270 m về phía nam ngã tư Euljiro 1-ga)'],
        ['Quầy đồ ăn', 'Cuối tuần một số quầy mở từ khoảng 14:00; phần lớn từ 16–17:00'],
      ],
      paragraphs: [
        'Tên gọi bắt nguồn từ Myeongnyebang, một khu của Seoul thời Joseon. Thời Nhật chiếm đóng, đây là khu sầm uất cạnh trung tâm thương mại của người Nhật; những năm 1950–70, nơi đây đầy quán cà phê và quán rượu, chỗ tụ họp của nhà văn và nghệ sĩ. Tòa nhà Myeongdong Theater (xây năm 1936 làm rạp chiếu phim, sau là Nhà hát Quốc gia) là dấu tích của thời kỳ đó.',
        'Ngày nay đây là phố mỹ phẩm, thời trang và đồ ăn đường phố. Con phố chính Myeongdong-gil bắt đầu từ Namdaemun-ro và chạy khoảng 450 m về phía đông tới Myeongdong Cathedral — nên vào từ đầu phía tây và đi thẳng là tự nhiên tới nhà thờ. Các quầy đồ ăn tập trung trên Myeongdong-gil và các hẻm bên (Myeongdong 8-gil và các hẻm khác).',
      ],
      tips: [
        'Muốn ăn một bữa đàng hoàng: mì kalguksu (mì cắt tay nấu nước dùng) ở <strong>Myeongdong Kyoja</strong> (từ năm 1966). Hàng dài nhưng đi nhanh.',
        'Đồ ăn đường phố có giá cho du khách — bánh trứng (gyeranppang) và khoai tây lốc xoáy là hợp lý; tôm hùm và cua hoàng đế thì đắt.',
        'Cần đổi tiền? Các quầy đổi tiền tư nhân ở Myeongdong nổi tiếng có tỷ giá tốt.',
      ],
    },
    s07: {
      name: 'Myeongdong Cathedral', sub: '명동성당',
      time: '16:20', stay: 'khoảng 20 phút',
      info: [
        ['Thánh lễ thứ Bảy', '07:00 · 10:00 · <strong>18:00 · 19:00</strong> — sau 17:50 khó tham quan bên trong'],
        ['Tầng hầm', '1898 Plaza (phòng trưng bày, quà lưu niệm, quán cà phê)'],
      ],
      paragraphs: [
        'Được thánh hiến ngày 29/5/1898, đây là nhà thờ kiểu Gothic đích thực đầu tiên của Hàn Quốc. Nhà thờ do linh mục thừa sai người Pháp Eugène Coste thiết kế và được linh mục Poisnel hoàn thành sau khi Coste qua đời năm 1896; khi đó nó có tên là nhà thờ Jonghyeon. Đây là nhà thờ chính tòa của Tổng giáo phận Seoul và là di tích lịch sử được công nhận.',
        'Những năm 1970–80, nhà thờ là nơi trú ẩn của phong trào dân chủ. Tại thánh lễ tưởng niệm ở đây ngày 18/5/1987, sự thật bị che giấu về cái chết của sinh viên Park Jong-cheol do bị cảnh sát tra tấn đã được công bố; từ ngày 10 đến 15/6, hàng trăm sinh viên và người dân ngồi biểu tình tại nhà thờ, biến nơi đây thành tâm điểm của Phong trào Dân chủ Tháng Sáu.',
        'Từ Phong trào 1/3 ở Anguk (1919) đến Myeongdong Cathedral (1987) — hành trình hôm nay nối hai dấu mốc quan trọng của lịch sử cận hiện đại Hàn Quốc.',
      ],
      tips: [
        'Ghé trước thánh lễ 18:00 thứ Bảy. Trong giờ lễ, đừng đi vào hay chụp ảnh.',
      ],
    },
    s08: {
      name: 'N Seoul Tower', sub: 'N서울타워 · 남산',
      time: '17:20', stay: 'từ 1,5 giờ',
      info: [
        ['Hoàng hôn', '<strong>17:44</strong> (trời tối hẳn lúc 18:10)'],
        ['Đài quan sát', 'Cuối tuần 10:00–23:00 (vào lần cuối trước 30 phút) · người lớn 29.000 won'],
        ['Xe buýt', '01A / 01B · lên ở Yejang · chỉ trả bằng thẻ'],
      ],
      paragraphs: [
        'Tháp phát sóng truyền hình và phát thanh khởi công năm 1969, mở cửa cho công chúng năm 1980 và đổi tên thành N Seoul Tower sau đợt cải tạo năm 2005. Tháp cao 236,7 m, đứng trên đỉnh Namsan, ở độ cao 479,7 m so với mực nước biển.',
        'Trên quảng trường phía dưới có <strong>đài phong hỏa Mongmyeoksan</strong> được phục dựng — nơi lính thời Joseon đốt lửa báo hiệu — và những lan can treo kín <strong>ổ khóa tình yêu</strong>. Dù không lên đài quan sát, từ lan can bạn vẫn nhìn bao quát phía bắc Seoul.',
        'Hôm nay mặt trời lặn lúc 17:44. Hãy đến trước khoảng 30 phút để ngắm bầu trời chuyển dần sang ánh đèn thành phố — đoạn kết của hành trình.',
      ],
      tips: [
        '23–24/10: <strong>Namsan Night Festival</strong> (16:00–23:00) — dạo ngắm lá mùa thu ở Yejang Park và đường mòn Namsan, "camp-nic" ở Baekbeom Square. Nhiều thứ để xem, nhưng bến Yejang và xe buýt có thể đông; cáp treo là một lựa chọn khác.',
        'Đài quan sát khá đắt (29.000 won). Từ lan can quảng trường đã có thể ngắm cảnh đêm rất đẹp.',
        'Bến xe buýt "Namsan Seoul Tower" cách tháp khoảng 260 m về phía đông — 5 phút đi bộ lên dốc.',
        'Tối cuối tháng 10 trên núi khá lạnh. Nhớ mang áo khoác.',
      ],
    },
    s09: {
      name: 'Chungmuro Station', sub: '충무로역 · Lines 3 & 4',
      time: 'Kết thúc · 19:00~',
      info: [
        ['Tuyến', 'Tàu điện ngầm Line 3 (cam) · Line 4 (xanh da trời)'],
        ['Xuống núi', 'Xe buýt 01B → xuống ở Yejang → đi bộ về phía đông theo Toegye-ro khoảng 600 m, 9 phút'],
      ],
      paragraphs: [
        'Cả hai tuyến xe buýt xuống từ tháp (01A, 01B) đều đi vòng phía tây qua Namsan Library. Hãy đi <strong>01B</strong>: xe qua Namsan Cable Car và dừng ở <strong>Yejang (gần Myeongdong Station)</strong>. Nếu chuyến 01B của bạn đang ở vòng đầu, xe sẽ đi tiếp thẳng tới Chungmuro Station Exit 2.',
        'Line 3 và Line 4 gặp nhau ở đây, nên đổi tàu đi hướng nào cũng tiện. Nếu chỉ cần Line 4, bạn có thể kết thúc ở <strong>Myeongdong Station</strong>, cách Yejang 5 phút đi bộ về phía tây. Namsangol Hanok Village (ảnh) nằm ngay cạnh Chungmuro Station nhưng buổi tối có lẽ đã đóng cửa.',
        '<strong>Chungmuro hay Dongguk Univ.?</strong> Không có xe buýt từ tháp tới Dongguk Univ. Station, nên kết thúc ở đó nghĩa là đi bộ xuống (khoảng 50 phút). Nếu chỉ về nhà, Chungmuro (hoặc Myeongdong) là đơn giản nhất; nếu muốn ăn tối ở Jangchung-dong Jokbal Street, hãy đi bộ xuống Dongguk Univ. (điểm tùy chọn bên dưới).',
      ],
      tips: [
        'Khi lên xe 01B, hãy hỏi tài xế "충무로역 가요? (Chungmuro-yeok gayo?)" để biết xe có đi tiếp tới Chungmuro không.',
      ],
    },
    s10: {
      name: 'Dongguk Univ. Station', sub: '동대입구역 · Line 3',
      time: 'Kết thúc · khoảng 19:50 (tùy chọn)', tag: 'Tùy chọn · đi bộ xuống',
      info: [
        ['Tuyến', 'Tàu điện ngầm Line 3 (cam)'],
        ['Xuống núi', '<strong>Đi bộ khoảng 50 phút</strong> · 3,0 km, phần lớn là xuống dốc (49 phút theo Kakao Map)'],
      ],
      paragraphs: [
        'Các tuyến xe buýt xuống từ tháp đều đi vòng phía tây, nên cách tốt nhất để tới Dongguk Univ. Station là <strong>đi bộ xuống</strong>. Đi xe buýt thì phải xuống tới Yejang rồi đón xe đi ngược lên — rất vòng.',
        'Đường đi đơn giản: theo lối đi về phía nam từ tháp, men theo con đường vòng quanh sườn nam của Namsan (Southern Loop) về phía đông tới <strong>National Theater of Korea</strong>, rồi đi về phía bắc xuống Jangchungdan-ro tới nhà ga. Khoảng 3,0 km, 49 phút theo Kakao Map — sau đoạn đầu thì gần như toàn bộ là xuống dốc.',
        'Lý do chọn cách kết thúc này là bữa tối: nhà ga nằm ngay cạnh <strong>Jangchung-dong Jokbal Street</strong> (chân giò heo om), và <strong>Taegeukdang</strong>, tiệm bánh mở từ năm 1946, ở gần đó. Sau khi ngắm cảnh đêm và đi bộ xuống 50 phút, chắc chắn bạn sẽ đói.',
      ],
      tips: [
        'Đường núi vào buổi tối — hãy mang giày thoải mái và giữ đủ pin điện thoại.',
        'Nếu mỏi chân: đi 01B xuống Yejang, rồi đón 01A / 01B đi lên hai bến (Chungmuro Stn → Dongguk Univ. Stn). Sẽ phải trả tiền vé thêm một lần.',
      ],
    },
  },

  walks: {
    's01>s03': {
      mode: 'Đi bộ 4 phút · 260 m',
      text: 'Từ Exit 6, đi theo con hẻm Insadong về phía nam tới Ssamziegil.',
    },
    's01>s02': {
      mode: 'Đi bộ 7 phút · 440 m',
      text: 'Từ Exit 6, đi về phía tây qua ngã tư Anguk-dong rồi đi về phía nam theo Ujeongguk-ro. Đi theo biển chỉ dẫn tới Jogyesa Temple.',
    },
    's02>s03': {
      mode: 'Đi bộ 5 phút · 350 m',
      text: 'Ra cổng chính của chùa, băng qua Ujeongguk-ro và đi về phía đông qua các hẻm Insadong. Ssamziegil nằm ngay chỗ bạn gặp Insadong-gil.',
    },
    's03>s05': {
      mode: 'Đi bộ 14 phút · 880 m',
      text: 'Đi theo Insadong-gil tới đầu phía nam (Samil-daero), rồi đi về phía nam theo Samil-daero. Băng qua Jong-ro và đi tiếp 200 m tới Samilgyo Bridge; đi cầu thang cạnh cầu xuống bờ suối.',
    },
    's05>s06': {
      mode: 'Tổng 1,7 km · khoảng 30 phút (kể cả đoạn suối)',
      text: 'Đi ngược dòng (về phía tây) theo lối đi ven suối qua Janggyo và Gwanggyo tới Gwangtonggyo (tranh gốm đoàn rước, cầu Gwangtonggyo). Lên cầu thang rồi đi về phía nam theo <strong>Namdaemun-ro</strong>. Băng qua ngã tư Euljiro 1-ga (Lotte Department Store); sau khoảng 270 m, lối vào Myeongdong-gil ở bên tay trái (phía đông).',
    },
    's06>s07': {
      mode: 'Đi bộ 6 phút · 350 m',
      text: 'Đi theo Myeongdong-gil về phía đông tới cuối đường. Ngay trước con đường lớn (Samil-daero), Myeongdong Cathedral nằm trên ngọn đồi.',
    },
    's07>s08': {
      mode: 'Đi bộ 17 phút (960 m) + xe buýt khoảng 20 phút',
      text: 'Phía nam khuôn viên nhà thờ bị chắn, nên hãy ra phía bắc lên Myeongdong-gil, đi về phía nam theo Samil-daero và băng qua Toegye-ro. <strong>Namsan Yejang Bus Terminal (dưới Yejang Park)</strong> là bến đầu của các tuyến xe buýt vòng Namsan — lên chuyến nào tới trước, <strong>01A hoặc 01B</strong>, và xuống ở bến "Namsan Seoul Tower". Đừng lên xe ở bến trước nhà thờ (tuyến đó không lên tháp).',
      mapNote: 'Bản đồ là đoạn đi bộ từ nhà thờ tới bến xe Yejang; từ đó đi xe buýt 01A / 01B.',
    },
    's08>s09': {
      mode: 'Xe buýt 01B + đi bộ 9 phút',
      text: 'Đi <strong>01B</strong> từ bến "Namsan Seoul Tower" (cách tháp 260 m về phía đông); 01A đi vòng xa qua Sungnyemun và Gwanghwamun. 01B đi qua Namsan Library và Namsan Cable Car — xuống ở Yejang rồi đi bộ khoảng 600 m về phía đông theo Toegye-ro tới Chungmuro Station.',
      mapNote: 'Bản đồ là đoạn đi bộ từ Yejang (sau khi xuống xe) tới Chungmuro Station.',
    },
    's08>s10': {
      mode: 'Đi bộ 49 phút · 3,0 km (phần lớn xuống dốc)',
      text: 'Từ tháp đi theo lối về phía nam rồi men theo đường vòng phía nam về phía đông. Khi thấy <strong>National Theater</strong>, đi về phía bắc xuống Jangchungdan-ro tới Dongguk Univ. Station Exit 6. Jangchung-dong Jokbal Street ở ngay bên ngoài nhà ga.',
      mapNote: 'N Seoul Tower → National Theater → Dongguk Univ. Station, đi bộ.',
    },
  },
};
