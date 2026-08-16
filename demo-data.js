window.DEMO_DATA = {
  meta: {
    title: "大阪旅遊手冊 Demo",
    subtitle: "手機優先的五日旅遊規劃介面",
    notice: "本頁為規劃版與作品集 Demo，不代表實際行程、訂單或即時資訊。出發前請以官方資料為準。"
  },
  announcements: [
    { label: "示範公告", title: "集合提醒（Demo）", body: "請於集合前確認交通、票券與天氣。這則內容只用來展示公告元件，不是實際通知。" },
    { label: "旅遊提示", title: "行程可以留白", body: "把移動時間、休息點與備案放進規劃裡，旅遊手冊才會真的適合在手機上使用。" }
  ],
  days: [
    {
      id: 1, label: "Day 1", theme: "抵達大阪・城市入口", hotel: "The Park Front Hotel @ USJ",
      timeline: [["上午", "抵達關西機場（Demo）"], ["下午", "前往飯店與 Universal CityWalk"], ["晚上", "USJ 夜間行程作為備案（Demo）"]],
      places: [
        ["Universal CityWalk 大阪", "飯店步行即達的娛樂商業街，適合作為抵達日的低負擔散步路線。", "day1-citywalk.jpg", "Universal CityWalk Osaka"],
        ["日本環球影城", "把熱門主題園區當作彈性備案，依票券、體力與當日人流調整。", "day1-usj.jpeg", "Universal Studios Japan"]
      ]
    },
    {
      id: 2, label: "Day 2", theme: "城市散步・在地風景", hotel: "The Park Front Hotel @ USJ",
      timeline: [["上午", "泡麵文化與手作體驗"], ["下午", "勝尾寺與大阪街區"], ["晚上", "新世界散步與晚餐"]],
      places: [
        ["Cup Noodles Museum Osaka Ikeda", "適合把體驗活動放在上午，讓行程有一個明確的主題起點。", "day2-cup-noodles.jpg", "Cup Noodles Museum Osaka Ikeda"],
        ["勝尾寺", "以達摩文化與山景為主題的景點，保留交通緩衝會更舒服。", "day2-katsuoji.png", "Katsuoji Temple Osaka"],
        ["通天閣與新世界", "把街區當成傍晚的開放式行程，方便依當天狀況調整停留時間。", "day2-shinsekai.png", "Tsutenkaku Tower Shinsekai Osaka"]
      ]
    },
    {
      id: 3, label: "Day 3", theme: "奈良日・古都與公園", hotel: "OMO7 大阪 by 星野集團",
      timeline: [["上午", "奈良公園與東大寺"], ["下午", "冰室神社、咖啡與街區散步"], ["晚上", "回到大阪，安排飯店活動"]],
      places: [
        ["奈良公園", "以公園、神社與步行節奏串起奈良日，景點之間保留休息空間。", "day3-nara-park.jpg", "Nara Park"],
        ["東大寺", "適合作為奈良日的核心景點，將參觀時間和移動時間分開呈現。", "day3-todaiji.jpg", "Todai-ji Temple Nara"],
        ["阿倍野 HARUKAS", "回大阪後的城市景觀選項，適合放在傍晚或作為天候備案。", "day3-harukas.jpg", "Abeno Harukas"]
      ]
    },
    {
      id: 4, label: "Day 4", theme: "海港與城市生活", hotel: "OMO7 大阪 by 星野集團",
      timeline: [["上午", "海遊館與天保山"], ["下午", "難波八阪神社與心齋橋"], ["晚上", "大阪街區美食與自由活動"]],
      places: [
        ["海遊館", "室內景點可以作為雨天備案，也適合把停留時間設計得更有彈性。", "day4-kaiyukan.jpg", "Osaka Aquarium Kaiyukan"],
        ["難波八阪神社", "城市裡的短停留景點，適合和難波、心齋橋路線串接。", "day4-yasaka.jpg", "Namba Yasaka Shrine"],
        ["大阪心齋橋", "把購物與餐飲做成可自由調整的區段，不需要排滿每一分鐘。", "day4-shinsaibashi.png", "Shinsaibashi Osaka"]
      ]
    },
    {
      id: 5, label: "Day 5", theme: "最後採買・機場方向", hotel: "旅程結束",
      timeline: [["上午", "Rinku Premium Outlets 採買"], ["中午", "前往關西機場"], ["下午", "返程交通（Demo）"]],
      places: [["Rinku Premium Outlets", "靠近關西機場的最後採買選項，適合安排成返程日前的收尾行程。", "day5-rinku.jpg", "Rinku Premium Outlets"]]
    }
  ],
  flights: [
    { group: "台北組（Demo）", route: "台北 → 大阪", detail: "去程／回程班機資訊以示範資料呈現", passengers: ["旅客 A（Demo）", "旅客 B（Demo）", "旅客 C（Demo）"] },
    { group: "深圳組（Demo）", route: "深圳 → 大阪", detail: "去程／回程班機資訊以示範資料呈現", passengers: ["旅客 D（Demo）", "旅客 E（Demo）"] }
  ],
  hotels: [
    {
      name: "The Park Front Hotel @ USJ", stay: "Day 1–Day 3 · 2 晚（Demo）", image: "park-front-night.jpg", map: "The Park Front Hotel at Universal Studios Japan",
      checkin: "入住 17:00／退房 12:00（Demo）", breakfast: "早餐時段依官方資訊為準", booking: "***（Demo）", rooms: ["房間 A：旅客 A、旅客 B（Demo）", "房間 B：旅客 C、旅客 D（Demo）"]
    },
    {
      name: "OMO7 大阪 by 星野集團", stay: "Day 3–Day 5 · 2 晚（Demo）", image: "omo7-exterior.png", map: "OMO7 Osaka by Hoshino Resorts",
      checkin: "入住 15:00／退房 11:00（Demo）", breakfast: "早餐時段依官方資訊為準", booking: "***（Demo）", rooms: ["房間 C：旅客 E、旅客 F（Demo）", "房間 D：旅客 G（Demo）"]
    }
  ],
  charter: { company: "示範包車公司（Demo）", companyPhone: "***（Demo）", driver: "示範司機（Demo）", guide: "示範導遊（Demo）", contact: "***（Demo）" },
  emergency: [["警察", "110", "日本全國通用"], ["火災／救護", "119", "日本全國通用"], ["官方旅遊與醫療資訊", "JNTO", "請以官方最新資料為準"]],
  phrases: [
    ["不好意思／借過", "すみません", "Sumimasen"], ["謝謝", "ありがとうございます", "Arigatō gozaimasu"],
    ["請問廁所在哪裡？", "トイレはどこですか？", "Toire wa doko desu ka?"], ["可以刷卡嗎？", "カードで払えますか？", "Kādo de haraemasu ka?"],
    ["請幫我拍照，可以嗎？", "写真を撮っていただけますか？", "Shashin o totte itadakemasu ka?"], ["請幫助我！", "助けてください！", "Tasukete kudasai!"]
  ],
  rates: { twd: 0.2, cny: 0.042 }
};
