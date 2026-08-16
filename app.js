(function () {
  "use strict";

  const data = window.DEMO_DATA;
  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");
  let activeTab = "home";
  let activeDay = 1;
  let toastTimer;

  const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const mapsUrl = (query) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  const money = (value) => Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const storageKey = (name) => "osaka_demo_" + name;

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  function renderHome() {
    const announcementHtml = data.announcements.map((item, index) => `<article class="announcement${index ? "" : " card"}"><div class="announcement-top"><span class="tag${index ? "" : " coral"}">${escapeHtml(item.label)}</span><span class="muted">DEMO ${String(index + 1).padStart(2, "0")}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("");
    return `<section class="screen"><section class="hero"><div class="eyebrow">OSAKA TRAVEL PLANNER</div><h1>${escapeHtml(data.meta.title)}</h1><p>${escapeHtml(data.meta.subtitle)}，將行程、景點、住宿與旅途中工具集中在一個手機友善的介面裡。</p><div class="hero-stamp">PLANNED DEMO · DAY 1–5</div><button class="video-demo" data-action="video-demo" type="button"><span class="play">▶</span><span><strong>行前影片 Demo</strong><small>公開版不連結私人影片頁面</small></span><span aria-hidden="true">›</span></button></section><div class="notice"><strong>公開版資料聲明</strong><p>${escapeHtml(data.meta.notice)} 旅客、訂單、包車與聯絡資料均為遮罩或模擬內容。</p></div><div class="section-head"><div><div class="section-kicker">DEMO UPDATES</div><h2>示範公告</h2></div><p>展示公告元件</p></div><div>${announcementHtml}</div><div class="section-head"><div><div class="section-kicker">WHAT IT SHOWS</div><h2>一趟旅程的介面骨架</h2></div></div><div class="feature-grid"><article class="feature-card"><div class="feature-icon">◫</div><h3>五日行程</h3><p>用 Day 1–5 拆解移動、景點與備案。</p></article><article class="feature-card"><div class="feature-icon">⌁</div><h3>資訊收合</h3><p>把旅途中需要的資料放在可展開卡片裡。</p></article><article class="feature-card"><div class="feature-icon">↔</div><h3>小工具</h3><p>固定 Demo 匯率與常用日文，無後端資料傳輸。</p></article><article class="feature-card"><div class="feature-icon">◎</div><h3>手機優先</h3><p>單手操作、觸控目標與底部導覽優先。</p></article></div><div class="quick-nav"><button type="button" data-tab="trip">查看每日行程 <span>→</span></button><button type="button" data-tab="info">查看實用資訊 <span>→</span></button><button type="button" data-tab="rate">開啟匯率工具 <span>→</span></button><button type="button" data-tab="jp">開啟日文工具 <span>→</span></button></div></section>`;
  }

  function renderTrip() {
    const day = data.days.find((item) => item.id === activeDay) || data.days[0];
    const tabs = data.days.map((item) => `<button class="day-tab${item.id === activeDay ? " active" : ""}" data-day="${item.id}" type="button">${escapeHtml(item.label)}</button>`).join("");
    const timeline = day.timeline.map(([time, text]) => `<div class="timeline-row"><span class="timeline-time">${escapeHtml(time)}</span><span>${escapeHtml(text)}</span></div>`).join("");
    const places = day.places.map(([name, description, image, query]) => `<article class="place-card"><img src="assets/photos/${escapeHtml(image)}" alt="${escapeHtml(name)}" loading="lazy"><div class="place-body"><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description)}</p><a class="text-link" href="${mapsUrl(query)}" target="_blank" rel="noopener">開啟地圖 ↗</a></div></article>`).join("");
    return `<section class="screen"><div class="section-head"><div><div class="section-kicker">ITINERARY</div><h2>每日行程</h2></div><p>規劃版 Demo</p></div><div class="notice"><strong>行程資料提示</strong><p>以下內容以旅遊規劃介面示範為主，沒有實際日期、班次或訂單資訊。</p></div><div class="day-tabs" role="tablist" aria-label="選擇天數">${tabs}</div><div class="day-hero"><div class="eyebrow">${escapeHtml(day.label)}</div><h2>${escapeHtml(day.theme)}</h2><p>住宿節點：${escapeHtml(day.hotel)}</p></div><div class="timeline">${timeline}</div><div class="section-head"><div><div class="section-kicker">PLACES</div><h2>景點卡片</h2></div><p>${day.places.length} 個展示項目</p></div><div class="place-grid">${places}</div></section>`;
  }

  function renderCollapse(title, body) {
    return `<div class="demo-collapse"><button class="collapse-trigger" type="button" data-collapse><span>${title}</span><span class="chevron">⌄</span></button><div class="collapse-content">${body}</div></div>`;
  }

  function renderInfo() {
    const flights = data.flights.map((flight) => `<article class="flight-card"><div class="flight-top"><div><h3>${escapeHtml(flight.group)}</h3><div class="muted">${escapeHtml(flight.route)}</div></div><span class="tag">Demo</span></div><p class="muted">${escapeHtml(flight.detail)}</p>${renderCollapse("旅客名單（模擬資料）", `<div class="chips">${flight.passengers.map((person) => `<span class="chip">${escapeHtml(person)}</span>`).join("")}</div>`)}</article>`).join("");
    const hotels = data.hotels.map((hotel) => {
      const rooms = hotel.rooms.map((room, index) => `<div class="room-demo"><p class="muted">${escapeHtml(room)}</p><div class="edit-row"><label for="room-${index}-${hotel.name}">${escapeHtml(room.split("：")[0])}</label><input id="room-${index}-${hotel.name}" data-storage="room-${hotel.name}-${index}" placeholder="#房號（Demo）"></div></div>`).join("");
      return `<article class="hotel-card"><img class="hotel-image" src="assets/photos/${escapeHtml(hotel.image)}" alt="${escapeHtml(hotel.name)}" loading="lazy"><div class="hotel-content"><div class="hotel-top"><div><h3>${escapeHtml(hotel.name)}</h3><div class="muted">${escapeHtml(hotel.stay)}</div></div><a class="text-link" href="${mapsUrl(hotel.map)}" target="_blank" rel="noopener">地圖 ↗</a></div><ul class="detail-list"><li><span>入退房</span><strong>${escapeHtml(hotel.checkin)}</strong></li><li><span>早餐</span><strong>${escapeHtml(hotel.breakfast)}</strong></li><li><span>預訂資訊</span><strong>${escapeHtml(hotel.booking)}</strong></li></ul>${renderCollapse("房間分配（模擬資料）", rooms + `<p class="privacy-note">輸入內容只儲存在這個瀏覽器，不會送到伺服器。</p>`)}</div></article>`;
    }).join("");
    const emergency = data.emergency.map(([title, number, note]) => `<div class="safety-row"><strong>${escapeHtml(title)}</strong>${number === "JNTO" ? `<a class="text-link" href="https://www.jnto.go.jp/emergency/chc/mi_guide.html" target="_blank" rel="noopener">JNTO ↗</a>` : `<span>${escapeHtml(number)}</span>`}<small class="muted">${escapeHtml(note)}</small></div>`).join("");
    const charter = data.charter;
    return `<section class="screen"><div class="section-head"><div><div class="section-kicker">PUBLIC INFO</div><h2>實用資訊</h2></div><p>公開 Demo 範圍</p></div><div class="notice"><strong>資料使用說明</strong><p>旅客、房號、預訂與包車欄位都是 <code>***</code> 或 Demo 模擬資料；私人版本不會放入這個 repo。</p></div><div class="info-section"><h2>交通</h2><div class="card">${flights}</div></div><div class="info-section"><h2>住宿</h2><div class="card">${hotels}</div></div><div class="info-section"><h2>包車與導遊</h2><div class="card"><div class="card-pad"><div class="edit-row"><label>包車公司</label><input value="${escapeHtml(charter.company)}" readonly></div><div class="edit-row"><label>公司電話</label><input value="${escapeHtml(charter.companyPhone)}" readonly></div><div class="edit-row"><label>司機姓名</label><input value="${escapeHtml(charter.driver)}" readonly></div><div class="edit-row"><label>導遊姓名</label><input value="${escapeHtml(charter.guide)}" readonly></div><div class="edit-row"><label>導遊聯絡</label><input value="${escapeHtml(charter.contact)}" readonly></div><label class="muted" for="demo-note">Demo 備註</label><textarea id="demo-note" class="note-area" data-storage="demo-note" placeholder="可輸入測試備註，內容只會儲存在本機瀏覽器"></textarea><p class="privacy-note">公開版沒有私人聯絡資料；這裡只是展示可編輯欄位的互動。</p><div class="button-row"><button class="button ghost small" type="button" data-action="reset-demo">清除本機 Demo 資料</button></div></div></div></div><div class="info-section"><h2>緊急資訊</h2><div class="safety-grid">${emergency}</div><p class="privacy-note">緊急資訊可能變動，使用前請以官方最新資料為準。</p></div></section>`;
  }

  function renderRate() {
    return `<section class="screen"><div class="tool-card"><div class="section-kicker">CURRENCY TOOL</div><h2>匯率計算器</h2><p>輸入任一示範金額，自動換算三種貨幣。</p><div class="rate-grid"><div class="rate-field"><label for="rate-jpy">JPY 日圓</label><input class="rate-input" id="rate-jpy" inputmode="decimal" placeholder="10000"></div><div class="rate-field"><label for="rate-twd">TWD 台幣</label><input class="rate-input" id="rate-twd" inputmode="decimal" placeholder=""></div><div class="rate-field"><label for="rate-cny">CNY 人民幣</label><input class="rate-input" id="rate-cny" inputmode="decimal" placeholder=""></div></div><div class="rate-result" id="rate-result">輸入金額後，這裡會顯示示範換算結果。</div><div class="button-row"><button class="button ghost small" type="button" data-action="rate-reset">清除金額</button></div><p class="rate-note">示範匯率：1 JPY ≈ ${data.rates.twd} TWD、${data.rates.cny} CNY。非即時匯率，也不包含任何真實旅費或結算資料。</p></div></section>`;
  }

  function renderJp() {
    const phrases = data.phrases.map(([zh, jp, ro], index) => `<article class="phrase-card"><div><div class="phrase-zh">${escapeHtml(zh)}</div><div class="phrase-jp">${escapeHtml(jp)}</div></div><button class="speak-button" type="button" data-speak="${index}" aria-label="朗讀${escapeHtml(zh)}">◖</button><div class="phrase-ro">${escapeHtml(ro)}</div></article>`).join("");
    return `<section class="screen"><div class="tool-card"><div class="section-kicker">JAPANESE TOOL</div><h2>常用日文</h2><p>直接把手機畫面指給對方看，或使用朗讀按鈕。</p><div class="phrase-list">${phrases}</div></div></section>`;
  }

  function render() {
    const views = { home: renderHome, trip: renderTrip, info: renderInfo, rate: renderRate, jp: renderJp };
    app.innerHTML = views[activeTab]();
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.tab === activeTab));
    if (activeTab === "info") hydrateStoredFields();
    if (activeTab === "rate") bindRateInputs();
    app.focus({ preventScroll: true });
  }

  function hydrateStoredFields() {
    document.querySelectorAll("[data-storage]").forEach((field) => {
      const key = storageKey(field.dataset.storage);
      field.value = localStorage.getItem(key) || "";
      field.addEventListener("input", () => localStorage.setItem(key, field.value));
    });
  }

  function bindRateInputs() {
    const jpy = document.getElementById("rate-jpy");
    const twd = document.getElementById("rate-twd");
    const cny = document.getElementById("rate-cny");
    const result = document.getElementById("rate-result");
    const sync = (source) => {
      const sourceValue = Number(source.value || 0);
      const jpyValue = source === jpy ? sourceValue : source === twd ? sourceValue / data.rates.twd : sourceValue / data.rates.cny;
      if (!jpyValue) { result.textContent = "輸入金額後，這裡會顯示示範換算結果。"; return; }
      if (source !== jpy) jpy.value = Math.round(jpyValue);
      if (source !== twd) twd.value = Math.round(jpyValue * data.rates.twd);
      if (source !== cny) cny.value = Math.round(jpyValue * data.rates.cny);
      result.textContent = `日圓 ${money(jpyValue)} 元\n約等於台幣 ${money(jpyValue * data.rates.twd)} 元、人民幣 ${money(jpyValue * data.rates.cny)} 元`;
    };
    [jpy, twd, cny].forEach((field) => field.addEventListener("input", () => sync(field)));
  }

  function resetDemoStorage() {
    Object.keys(localStorage).filter((key) => key.startsWith("osaka_demo_")).forEach((key) => localStorage.removeItem(key));
    showToast("本機 Demo 資料已清除");
    render();
  }

  document.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-tab]");
    if (tabButton) { activeTab = tabButton.dataset.tab; render(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const dayButton = event.target.closest("[data-day]");
    if (dayButton) { activeDay = Number(dayButton.dataset.day); render(); return; }
    const collapse = event.target.closest("[data-collapse]");
    if (collapse) { collapse.parentElement.classList.toggle("open"); return; }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "video-demo") { showToast("公開版不包含私人影片；這張卡片只展示互動設計。"); return; }
    if (action === "reset-demo") { resetDemoStorage(); return; }
    if (action === "rate-reset") { ["rate-jpy", "rate-twd", "rate-cny"].forEach((id) => { const field = document.getElementById(id); if (field) field.value = ""; }); const result = document.getElementById("rate-result"); if (result) result.textContent = "輸入金額後，這裡會顯示示範換算結果。"; return; }
    const speak = event.target.closest("[data-speak]");
    if (speak) { const phrase = data.phrases[Number(speak.dataset.speak)]; if ("speechSynthesis" in window && phrase) { const utterance = new SpeechSynthesisUtterance(phrase[1]); utterance.lang = "ja-JP"; utterance.rate = .9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); } else { showToast("此裝置不支援朗讀"); } }
  });

  render();
})();
