/* =================== HELPERS =================== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const nf = n => Math.round(n).toLocaleString("en-US");
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove("show"),1600); }
async function copyText(str){ try{ await navigator.clipboard.writeText(str); }catch(e){ const ta=document.createElement("textarea"); ta.value=str; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); } toast("已複製 ✓"); }

/* =================== 行程 =================== */
function infoRow(info){ return (info||[]).map(([em,v])=>`<span class="tag soft">${em} ${esc(v)}</span>`).join(""); }
function placeCard(p, dayN){
  const grad = `linear-gradient(145deg,var(--day${Math.max(1,dayN-1)}),var(--day${Math.min(5,dayN+1)}))`;
  const dark = dayN>=3;
  let html = `<div class="place"><a class="mapbtn" href="${MAPS(p.q)}" target="_blank" rel="noopener">📍</a>`;
  if(p.photo){
    html += `<div class="banner" style="background:${grad}"><img src="${esc(p.photo)}" alt="${esc(p.name)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"><div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 35%,rgba(0,0,0,.52))"></div><span class="bname" style="z-index:1">${esc(p.name)}</span></div>`;
  } else {
    html += `<div class="banner" style="background:${grad}"><span class="bem">${p.emoji}</span><span class="bname"${dark?'':' style="color:var(--ink);text-shadow:none"'}>${esc(p.name)}</span></div>`;
  }
  html += `<div class="place-body"><div class="place-name">${esc(p.name)}</div>`;
  html += `<div class="place-intro">${esc(p.intro)}</div>`;
  if(p.info) html += `<div class="inforow">${infoRow(p.info)}</div>`;
  (p.notes||[]).forEach(n=> html += `<div class="note-line"><span>⚠️</span><span>${esc(n.replace(/^⚠️\s*/,""))}</span></div>`);
  if(p.links){ html += `<div class="linklist">` + p.links.map(([t,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">🔗 ${esc(t)}</a>`).join("") + `</div>`; }
  if(p.highlights){
    html += `<div class="expander" data-act="toggle-exp"><div class="ehead"><span>🏬 ${esc(p.highlights.title)}</span><span class="arrow">▼</span></div><div class="ebody">`;
    html += p.highlights.items.map(h=>`<div class="hl${h.star?' star':''}"><span>•</span><span>${esc(h.t)}</span></div>`).join("");
    html += `</div></div>`;
  }
  html += `</div></div>`;
  return html;
}
function renderTrip(){
  let h = `<div class="hero"><div class="hgrad"></div><div class="htext">`;
  h += `<div class="hk">OSAKA TRAVEL PLANNER</div><h1>大阪旅遊手冊 Demo</h1>`;
  h += `<div class="hs">去識別化的親子旅行規劃展示 🎉</div>`;
  h += `<div class="hmeta"><span class="m">📅 Day 1–Day 5</span><span class="m">👨‍👩‍👧‍👦 親子旅遊</span><span class="m">🌙 5天4夜</span></div>`;
  h += `</div></div>`;
  h += `<h2 class="sec">每日行程</h2><div class="sub" style="font-size:13px;color:var(--ink-3);margin:-6px 4px 10px;line-height:1.4">這是規劃版／展示版，非實際行程。點卡片展開；景點右上角 📍 開啟地圖</div>`;
  // Day 快速跳轉列
  h += `<div class="dayjump" id="dayjump">` + DAYS.map(d=>`<button data-act="jump-day" data-day="${d.n}">Day ${d.n}</button>`).join("") + `</div>`;
  DAYS.forEach(d=>{
    const lt = d.n<=2 ? " lt" : "";
    h += `<div class="card daywrap" id="day-anchor-${d.n}"><div class="daycard" data-act="toggle-day" data-day="${d.n}">`;
    h += `<div class="day-left${lt}" style="background:var(--day${d.n})"><span class="dlabel">DAY</span><span class="dno">${String(d.n).padStart(2,"0")}</span><span class="ddate">${d.date}（${d.wd}）</span></div>`;
    h += `<div class="day-body"><div class="dtheme">${d.emoji} ${esc(d.theme)}</div><div class="dhotel">🏨 ${esc(d.hotel)}</div>`;
    h += `<div class="day-acts">` + d.acts.map(a=>`<div class="act"><span>${esc(a.t)}</span></div>`).join("") + `</div>`;
    h += `<div class="expand-hint"><span class="ev-open">展開詳細行程 ›</span><span class="ev-close">行程收合</span></div>`;
    h += `</div></div>`;
    // detail
    h += `<div class="daydetail" id="dd-${d.n}">`;
    h += `<div class="dd-inner">`;
    if(d.warn){const wm=d.warn.match(/^\p{Emoji}/u);h += `<div class="warnbar"><span class="ic">${wm?wm[0]:"⚠️"}</span><span>${esc(wm?d.warn.replace(wm[0],"").trim():d.warn)}</span></div>`;}
    h += `<div class="places-cap">📌 景點介紹</div>`;
    h += d.places.map(p=>placeCard(p,d.n)).join("");
    h += `<div class="expand-hint" data-act="toggle-day" data-day="${d.n}" style="padding:12px 4px 4px;"><span class="ev-close">行程收合</span></div>`;
    h += `</div></div>`;
    h += `</div>`;
  });
  $("#screen-trip").innerHTML = h;
}

/* =================== 資訊 =================== */
function renderInfo(){
  let h = `<div class="shead"><div class="kicker">INFO</div><h1>實用資訊</h1></div>`;
  h += `<div class="note-line"><span>🧪</span><span>公開 Demo 的訂單、旅客、房間與聯絡欄位皆為模擬資料或 ***，請勿視為實際資訊。</span></div>`;

  // 區塊快速跳轉
  h += `<div class="infojump" id="infojump">`;
  h += [["flight","✈️ 航班"],["hotel","🏨 飯店"],["charter","🚐 包車"],["emergency","❗ 緊急"]].map(([t,l])=>`<button data-act="jump-info" data-target="${t}">${l}</button>`).join("");
  h += `</div>`;

  // 航班
  h += `<h2 class="sec" id="info-flight" style="display:flex;align-items:center;justify-content:space-between;">✈️ 航班<a href="https://www.google.com/maps/search/?api=1&query=關西国際空港" target="_blank" rel="noopener" style="font-size:13px;font-weight:700;color:var(--accent);text-decoration:none;white-space:nowrap;">📍 關西機場 (KIX)</a></h2>`;
  FLIGHTS.forEach(f=>{
    h += `<div class="card"><div class="card-pad">`;
    h += `<div class="flight-grp">${f.emoji} ${esc(f.grp)}<span class="al">｜${esc(f.airline)}</span></div>`;
    [["去程",f.go],["回程",f.back]].forEach(([lbl,leg])=>{
      // parse "AAA XX hh:mm → BBB YY hh:mm" → dep/arr time + port
      const m = leg.route.match(/^(.+?)\s+(\d{1,2}:\d{2})\s*(?:→|->)\s*(.+?)\s+(\d{1,2}:\d{2})\s*$/);
      const depPort = m ? m[1] : leg.route;
      const depTime = m ? m[2] : "";
      const arrPort = m ? m[3] : "";
      const arrTime = m ? m[4] : "";
      const toMin = s => { const [hh,mm]=s.split(":").map(Number); return hh*60+mm; };
      // KIX=UTC+9, TPE/SZX=UTC+8; arriving KIX means clocks 1h ahead → shorter flight (-60), departing KIX → longer flight (+60)
      const isKixArr = arrPort.includes("KIX");
      const isKixDep = depPort.includes("KIX");
      const tzOffset = isKixArr ? -60 : isKixDep ? 60 : 0;
      const durMin = m ? (() => { let d=toMin(arrTime)-toMin(depTime)+tzOffset; if(d<0) d+=1440; return d; })() : 0;
      const durStr = durMin ? `${Math.floor(durMin/60)} 時 ${durMin%60} 分` : "";
      h += `<div class="leg">`;
      h += `<div class="leg-head"><span class="leg-label">${lbl} ${esc(leg.date)}</span><span class="fdur">🕐 ${durStr}</span></div>`;
      h += `<div class="fno-line"><span class="fno">${esc(leg.no)}</span>　${esc(f.airline)}</div>`;
      h += `<div class="froute-row">`;
      h += `<div style="text-align:left"><div class="froute-time">${esc(depTime)}</div><div class="froute-port">${esc(depPort)}</div></div>`;
      h += `<div class="froute-arrow">›</div>`;
      h += `<div style="text-align:right"><div class="froute-time">${esc(arrTime)}</div><div class="froute-port">${esc(arrPort)}</div></div>`;
      h += `</div></div>`;
    });
    if(f.bag) h += `<div class="leg-bag">🧳 ${esc(f.bag)}</div>`;
    h += `<div class="collapse"><div class="chead" data-act="toggle-collapse"><span>👥 旅客名單（${f.pax.length} 人）</span><span class="arrow">▼</span></div><div class="cbody"><div class="namechips">${f.pax.map(p=>`<span class="namechip">${esc(p)}</span>`).join("")}</div></div></div>`;
    h += `</div></div>`;
  });
  h += `<div class="plainphone" style="margin:-4px 4px 4px">抵達順序、集合時間與接送安排皆為 Demo，實際資訊請以官方公告為準。</div>`;

  // 飯店
  h += `<h2 class="sec" id="info-hotel">🏨 飯店</h2>`;
  HOTELS.forEach(ht=>{
    const grad = ht.id==="park" ? "linear-gradient(145deg,var(--day2),var(--day4))" : "linear-gradient(145deg,var(--day3),var(--day5))";
    let bannerInner;
    if(ht.photo){
      bannerInner = `<img src="${esc(ht.photo)}" alt="${esc(ht.name)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"><div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 35%,rgba(0,0,0,.52))"></div><a class="mapbtn" href="${MAPS(ht.q)}" target="_blank" rel="noopener" style="z-index:1">📍</a><span class="bname" style="z-index:1">${esc(ht.name)}</span>`;
    } else {
      bannerInner = `<a class="mapbtn" href="${MAPS(ht.q)}" target="_blank" rel="noopener">📍</a><span class="bem">${ht.emoji}</span><span class="bname">${esc(ht.name)}</span>`;
    }
    h += `<div class="card"><div class="banner" style="background:${grad}">${bannerInner}</div><div class="card-pad">`;
    h += `<div class="hotel-stay">${esc(ht.stay)}</div>`;
    h += `<div class="drow"><span class="k">入退房</span><span class="v">${esc(ht.inOut)}</span></div>`;
    h += `<div class="drow"><span class="k">早餐</span><span class="v">${esc(ht.bf)}</span></div>`;
    h += `<div class="drow"><span class="k">預訂號</span><span class="v" style="font-family:var(--font-round);letter-spacing:.02em">${esc(ht.booking)}</span></div>`;
    // rooms (預設收合)
    h += `<div class="collapse"><div class="chead" data-act="toggle-collapse"><span>🛏️ 房間分配（check-in 後點擊填房號）</span><span class="arrow">▼</span></div><div class="cbody">`;
    ROOMS[ht.id].forEach((r,ri)=>{
      h += `<div class="room"><div class="rtype"><span class="rt-name">${esc(r.type)}</span><span class="rnums">`;
      for(let s=0;s<r.slots;s++) h += `<input class="rno" data-hotel="${ht.id}" data-room="${ri}" placeholder="#房號" maxlength="8">`;
      h += `</span></div><div class="rguests">${esc(r.guests)}</div></div>`;
    });
    h += `<button class="btn primary full sm" data-act="copy-room" data-hotel="${ht.id}" style="margin-top:4px">📋 複製房間通知</button>`;
    h += `</div></div>`;
    // extras (OMO7)
    if(ht.extras){
      h += `<div class="sub-h">🛁 設施 & 體驗</div>`;
      h += `<div class="drow"><span class="k">大浴場</span><span class="v">${esc(ht.extras.bath.replace(/^大浴場「湯屋」：/,""))}</span></div>`;
      h += `<div class="note-line" style="background:var(--soft);color:var(--primary-d)"><span>🏮</span><span>${esc(ht.extras.night)}</span></div>`;
      h += `<div class="collapse" style="margin-top:8px"><div class="chead" data-act="toggle-collapse"><span>🎌 OMO7 體驗活動（6 項）</span><span class="arrow">▼</span></div><div class="cbody">`;
      h += ht.extras.activities.map(a=>{
        const parts = a.t.split("｜");
        const title=parts[0]||"", desc=parts[1]||"", cost=parts[2]||"", resv=parts[3]||"";
        const costTag = cost ? `<span class="tag ${cost.indexOf("免費")>=0?"ok":"sand"}">💴 ${esc(cost)}</span>` : "";
        const resvTag = resv ? `<span class="tag ${resv.indexOf("不需")>=0?"soft":"warn"}">${resv.indexOf("不需")>=0?"✓ ":"📝 "}${esc(resv)}</span>` : "";
        return `<div class="omo-act"><span class="oa-em">${a.em}</span><div class="oa-main"><div class="oa-title">${esc(title)}</div>${desc?`<div class="oa-desc">${esc(desc)}</div>`:""}<div class="oa-tags">${costTag}${resvTag}</div></div></div>`;
      }).join("");
      h += `</div></div>`;
    }
    h += `</div></div>`;
  });

  // 包車
  h += `<h2 class="sec" id="info-charter">🚐 包車 ＆ 導遊</h2><div class="card"><div class="card-pad">`;
  h += `<div class="drow edit"><span class="k">包車公司</span><input class="ce" data-ck="company" data-default="${esc(CHARTER.company)}" placeholder="點此填寫"></div>`;
  h += `<div class="drow edit"><span class="k">公司電話</span><input class="ce" data-ck="companyTel" data-default="${esc(CHARTER.companyTel)}" placeholder="電話 / Fax"></div>`;
  h += `<div class="drow edit"><span class="k">司機姓名</span><input class="ce" data-ck="driverName" placeholder="點此填寫"></div>`;
  h += `<div class="drow edit"><span class="k">司機聯絡</span><input class="ce" data-ck="driverTel" placeholder="電話 / LINE"></div>`;
  h += `<div class="drow edit"><span class="k">導遊姓名</span><input class="ce" data-ck="guideName" data-default="${esc(CHARTER.guideName)}" placeholder="點此填寫"></div>`;
  h += `<div class="drow edit"><span class="k">導遊聯絡</span><input class="ce" data-ck="guideTel" data-default="${esc(CHARTER.guideTel)}" placeholder="電話 / LINE"></div>`;
  h += `<div class="sub-h">📝 附註 <span class="sub-note">可自由編輯，自動儲存</span></div>`;
  h += `<textarea id="charterNote" class="note-area sm" placeholder="例如：航班動態、接送時間、車牌號碼…"></textarea>`;
  h += `<button class="btn secondary full sm" data-act="copy-charter" style="margin-top:8px">📋 快速複製包車資訊</button>`;
  h += `</div></div>`;

  // 緊急
  h += `<h2 class="sec sec-sos" id="info-emergency">❗ 緊急電話</h2><div class="card"><div class="card-pad">`;
  h += EMERGENCY.map(e=>`<div class="erow"><div><div class="et">${esc(e.t)}</div><div class="en">${esc(e.n)}</div></div></div>`).join("");
  h += `</div></div>`;

  // 醫療
  h += `<h2 class="sec sec-sos" id="info-medical">❗ 醫療</h2><div class="card"><div class="card-pad">`;
  h += MEDICAL.map(e=>`<div class="erow"><div><div class="et">${esc(e.t)}</div><div class="en">${esc(e.n)}</div></div></div>`).join("");
  h += `<a class="btn secondary full sm" href="https://www.jnto.go.jp/emergency/chc/mi_guide.html" target="_blank" rel="noopener" style="margin-top:12px">🔍 搜尋附近醫療機構（JNTO）</a>`;
  h += `</div></div>`;

  $("#screen-info").innerHTML = h;
  const cn = $("#charterNote");
  if(cn){ cn.value = localStorage.getItem("osaka_charterNote")||""; cn.addEventListener("input",()=>localStorage.setItem("osaka_charterNote",cn.value)); }
  document.querySelectorAll('.ce[data-ck]').forEach(inp=>{
    const k = "osaka_charter_"+inp.dataset.ck;
    inp.value = localStorage.getItem(k)||(inp.dataset.default||"");
    inp.addEventListener("input",()=>localStorage.setItem(k, inp.value));
  });
}
function copyCharter(){
  const g = k => { const el=document.querySelector('.ce[data-ck="'+k+'"]'); return (el?el.value:"").trim(); };
  const company=g("company"), dn=g("driverName"), dt=g("driverTel"), gn=g("guideName"), gt=g("guideTel");
  const note=($("#charterNote")?$("#charterNote").value:"").trim();
  let out = "🚐 包車 ＆ 導遊\n";
  out += `包車公司：${company||"（待填）"}\n`;
  out += `司機：${dn||"（待填）"}｜聯絡：${dt||"（待填）"}\n`;
  out += `導遊：${gn||"（待填）"}｜聯絡：${gt||"（待填）"}`;
  if(note) out += `\n\n📝 附註：\n${note}`;
  copyText(out);
}
function copyRoom(hotelId){
  const ht = HOTELS.find(x=>x.id===hotelId);
  let out = `🏨 ${ht.name} 房間分配\n`;
  ROOMS[hotelId].forEach((r,ri)=>{
    const inputs = document.querySelectorAll(`input.rno[data-hotel="${hotelId}"][data-room="${ri}"]`);
    const nums = Array.from(inputs).map(inp=>{ const v=inp.value.trim(); return "#" + (v? v.replace(/^#/,"") : "待填"); }).join("/");
    out += `\n${r.type} ${nums}：\n${r.guests}\n`;
  });
  copyText(out.trim());
}

/* =================== 匯率 =================== */
const RATE_DEFAULT = {twd:0.2, cny:0.042};
let rate = {...RATE_DEFAULT};
let ratePrefix = "";
function renderRate(){
  let h = `<div class="shead"><div class="kicker">CURRENCY</div><h1>匯率計算機</h1></div>`;
  h += `<div class="curgrid">`;
  h += `<div class="curinput active" data-act="pick-cur" data-cur="jpy"><span class="flag">🇯🇵</span><span class="cur-meta"><span class="code">JPY</span><br><span class="name">日幣</span></span><input id="cur-jpy" readonly placeholder="用下方按鍵輸入" style="color:var(--ink-3);"></div>`;
  h += `<div class="curinput" data-act="pick-cur" data-cur="twd"><span class="flag">🇹🇼</span><span class="cur-meta"><span class="code">TWD</span><br><span class="name">台幣</span></span><input id="cur-twd" readonly placeholder="0"></div>`;
  h += `<div class="curinput" data-act="pick-cur" data-cur="cny"><span class="flag">🇨🇳</span><span class="cur-meta"><span class="code">CNY</span><br><span class="name">人民幣</span></span><input id="cur-cny" readonly placeholder="0"></div>`;
  h += `</div>`;
  const key = (k,cls) => `<button data-act="rate-key" data-k="${k}"${cls?` class="${cls}"`:""}>${k}</button>`;
  h += `<div class="keypad">`
    + key("C","fn") + key("⌫","fn") + key("÷","op") + key("×","op")
    + key("7") + key("8") + key("9") + key("－","op")
    + key("4") + key("5") + key("6") + key("＋","op")
    + key("1") + key("2") + key("3") + key("＝","eq")
    + key("0") + key("00") + key("000")
    + `</div>`;
  h += `<div class="preview" id="ratePreview">輸入金額後，這裡會顯示可複製的訊息～</div>`;
  h += `<div class="prefixtags" id="prefixTags">` + [["💊","藥妝"],["🍜","餐廳"],["🎁","伴手禮"],["🛍️","購物"]].map(([em,t])=>`<button class="ptag" data-act="prefix" data-val="${t}">${em} ${t}</button>`).join("") + `</div>`;
  h += `<div class="field"><label>用途前綴（可不填，會加在複製訊息開頭）</label><input class="txt" id="prefixInput" placeholder="上方快選，或自由填入"></div>`;
  h += `<button class="btn primary full" data-act="copy-rate">📋 複製訊息</button>`;
  h += `<div class="ratebox"><div class="raterow"><span id="rateLabel"></span><a data-act="edit-rate">修改</a></div><div class="rateedit" id="rateEdit">1 日幣 = <input id="r-twd" inputmode="decimal"> 台幣 = <input id="r-cny" inputmode="decimal"> 人民幣 <button class="btn secondary sm" data-act="save-rate">套用</button></div></div>`;
  $("#screen-rate").innerHTML = h;
  initRate();
}
function fmtRateLabel(){ $("#rateLabel") && ($("#rateLabel").innerHTML = `<b>預設匯率（非最新）</b>：1 日幣 = ${rate.twd} 台幣 = ${rate.cny} 人民幣`); }
function buildRateMsg(jpy){
  const twd = jpy*rate.twd, cny = jpy*rate.cny;
  const pre = ratePrefix ? ratePrefix + "\n" : "";
  return `${pre}日幣${nf(jpy)}元\n換算台幣${nf(twd)}元，人民幣${nf(cny)}元\n（1日幣 = ${rate.twd}台幣 = ${rate.cny}人民幣）`;
}
let rateJpy = 0, rateFresh = true;   // rateFresh：目前欄位還是預設/換算值，第一次按鍵先清空
let rateActive = "jpy";              // 鍵盤目前輸入的幣別，點幣別卡切換
function setActiveCur(c){
  rateActive = c; rateFresh = true;
  document.querySelectorAll(".curinput").forEach(d=>d.classList.toggle("active", d.dataset.cur===c));
}
function evalExpr(s){
  s = (s||"").replace(/,/g,"").replace(/×/g,"*").replace(/÷/g,"/").replace(/＋/g,"+").replace(/－/g,"-").trim();
  s = s.replace(/[+\-*/(.\s]+$/,"");                     // 忽略結尾未完成的運算符
  if(!s || !/^[0-9+\-*/().\s]+$/.test(s)) return 0;
  try{ const v = Function('"use strict";return('+s+')')(); return (isFinite(v) && v>0) ? v : 0; }
  catch(e){ return 0; }
}
function syncRate(src){
  const J=$("#cur-jpy"), T=$("#cur-twd"), C=$("#cur-cny");
  const amt = evalExpr(({jpy:J,twd:T,cny:C})[src].value);
  const jpy = src==="jpy" ? amt : (src==="twd" ? amt/rate.twd : amt/rate.cny);
  rateJpy = jpy;
  if(src!=="jpy") J.value = jpy? nf(jpy):"";
  if(src!=="twd") T.value = jpy? nf(jpy*rate.twd):"";
  if(src!=="cny") C.value = jpy? nf(jpy*rate.cny):"";
  $("#ratePreview").textContent = jpy>0 ? buildRateMsg(jpy) : "輸入金額後，這裡會顯示可複製的訊息～";
}
function initRate(){
  $("#prefixInput").addEventListener("input",e=>{ ratePrefix=e.target.value.trim(); document.querySelectorAll("#prefixTags .ptag").forEach(b=>b.classList.toggle("active", b.dataset.val===ratePrefix)); if(rateJpy>0) $("#ratePreview").textContent=buildRateMsg(rateJpy); });
  fmtRateLabel();
  // 預設顯示 10000 JPY 換算結果（淺色＝還沒開始輸入）
  const J=$("#cur-jpy");
  J.value="10000"; J.style.color="var(--ink-3)";
  syncRate("jpy");
  ["twd","cny"].forEach(k=>{ const el=$("#cur-"+k); if(el) el.style.color="var(--ink-3)"; });
}

/* =================== 日文 =================== */
function rubyJp(p){
  // rb(str, segments) — segments: [[text, rt], ...] rt=null means plain text
  function rb(segs){ return segs.map(([t,rt])=>rt!=null?`<ruby>${esc(t)}<rt>${esc(rt)}</rt></ruby>`:esc(t)).join(""); }
  switch(p.jp){
    case "大丈夫です":   return rb([["大丈夫","だいじょうぶ"],["です",null]]);
    case "大丈夫です。":  return rb([["大丈夫","だいじょうぶ"],["です。",null]]);
    case "写真を撮っていただけますか？": return rb([["写真","しゃしん"],["を",null],["撮","と"],["っていただけますか？",null]]);
    case "試着してもいいですか？": return rb([["試着","しちゃく"],["してもいいですか？",null]]);
    case "カードで払えますか？": return rb([["カードで",null],["払","はら"],["えますか？",null]]);
    case "レジ袋はご利用ですか？": return rb([["レジ",null],["袋","ぶくろ"],["はご",null],["利用","りよう"],["ですか？",null]]);
    case "お願いします。": return rb([["お",null],["願","ねが"],["いします。",null]]);
    case "何名様ですか？": return rb([["何名様","なんめいさま"],["ですか？",null]]);
    case "___名です。": return rb([["___",null],["名","めい"],["です。",null]]);
    case "お会計をお願いします。": return rb([["お",null],["会計","かいけい"],["をお",null],["願","ねが"],["いします。",null]]);
    case "こちらは豚肉が食べられません。": return rb([["こちらは",null],["豚肉","ぶたにく"],["が",null],["食","た"],["べられません。",null]]);
    case "迷子になりました。": return rb([["迷子","まいご"],["になりました。",null]]);
    case "この番号に連絡してください。": return rb([["この",null],["番号","ばんごう"],["に",null],["連絡","れんらく"],["してください。",null]]);
    case "助けてください！": return rb([["助","たす"],["けてください！",null]]);
    case "救急車を呼んでください。": return rb([["救急車","きゅうきゅうしゃ"],["を",null],["呼","よ"],["んでください。",null]]);
    case "警察を呼んでください。": return rb([["警察","けいさつ"],["を",null],["呼","よ"],["んでください。",null]]);
    case "気分が悪いです。": return rb([["気分","きぶん"],["が",null],["悪","わる"],["いです。",null]]);
    default: return esc(p.jp);
  }
}
function renderJp(){
  let h = `<div class="shead"><div class="kicker">JAPANESE</div><h1>常用日文</h1><div class="sub">不會說？直接指給對方看，或按喇叭鈕朗讀</div></div>`;
  PHRASES.forEach((cat,ci)=>{
    h += `<div class="catgrp${ci===0?' open':''}"><div class="cathead" data-act="toggle-cat"><span class="ct"><span class="em">${cat.em}</span>${esc(cat.cat)}</span><span class="arrow">▼</span></div><div class="catbody">`;
    h += cat.items.map((p,ii)=>`<div class="pcard"><div class="zh">${esc(p.zh)}</div><div class="jpline"><span class="jp">${rubyJp(p)}</span><button class="speak" data-act="speak" data-c="${ci}" data-i="${ii}" aria-label="朗讀"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg></button></div><div class="romaji">${esc(p.ro)}</div></div>`).join("");
    h += `</div></div>`;
  });
  $("#screen-jp").innerHTML = h;
}
function speak(ci,ii){
  const p = PHRASES[ci].items[ii];
  if(!("speechSynthesis" in window)){ toast("此裝置不支援朗讀"); return; }
  const text = p.jp.replace(/【.*?】/g,"").replace(/___/g,"").trim();
  const u = new SpeechSynthesisUtterance(text);
  u.lang="ja-JP"; u.rate=0.9;
  const v = speechSynthesis.getVoices().find(x=>x.lang && x.lang.toLowerCase().startsWith("ja"));
  if(v) u.voice=v;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

/* =================== 即時公告（首頁） =================== */
/* 旅途中要發布新消息：在 ANNOUNCEMENTS 最前面加一則，改 ANN_UPDATED，重新部署即可 */
const ANN_UPDATED = "Demo";
const ANNOUNCEMENTS = [
  {pin:true, time:"Demo", title:"公開版資料說明", body:`・本頁保留原始公告卡的互動呈現方式，內容已改為模擬資料
・旅客名單、訂位號碼、導遊／包車聯絡方式與私人財務資料均已移除
・實際行程、票券、營業時間與天氣請以官方最新資訊為準`},
  {pin:true, time:"Demo", title:"規劃版使用提醒", body:`・Day 1–Day 5 僅作為作品集展示，不代表實際旅程
・景點卡可展開，右上角地圖為公開 Google Maps 搜尋連結
・房號與聯絡欄位可操作，但只會儲存在目前瀏覽器的 Demo localStorage`},
];
function renderHome(){
  let h = `<div class="homehero"><img class="hfan" src="assets/fan.png" alt="">`
    + `<div class="hkick">OSAKA TRAVEL PLANNER</div><h1>大阪旅遊手冊 Demo</h1>`
    + `<div class="hdate">規劃版展示・Day 1–Day 5・大阪＋奈良</div>`
    + `<div class="hcount"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 15.5 13.5 11V4.8a1.5 1.5 0 0 0-3 0V11l-8 4.5v2.1l8-2.4v4.3l-2.2 1.7V22.7L12 21.8l3.7.9v-1.5L13.5 19.5v-4.3l8 2.4v-2.1Z"/></svg>去識別化公開 Demo</div></div>`;
  h += `<div class="note-line" style="margin-bottom:12px"><span>🧪</span><span>這是去識別化的公開作品集 Demo，沿用私人版 Netlify／PWA 的手冊 UI；公開版預計以 GitHub Pages 展示。實際日期、航班、旅客名單、訂單編號、聯絡方式、兒童姓名與私人財務資料均已移除；行程與公告皆為規劃／模擬內容，非實際行程。</span></div>`;
  h += `<button class="videocard" type="button" data-act="demo-video">`
    + `<span class="vplay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>`
    + `<span class="vtext"><b>互動 Demo 導覽</b><i>公開版不含私人影片</i></span>`
    + `<span class="varrow">›</span></button>`;
  h += `<div class="secrow"><span class="sectitle"><span class="livedot"></span>即時公告</span><span class="annmeta" style="margin:0;">更新：${esc(ANN_UPDATED)}</span></div>`;
  const pinned = ANNOUNCEMENTS.filter(a=>a.pin), rest = ANNOUNCEMENTS.filter(a=>!a.pin);
  [...pinned, ...rest].forEach(a=>{
    h += `<div class="anncard${a.pin?' pin':''}">`
      + `<button class="acopy" data-act="copy-ann" data-i="${ANNOUNCEMENTS.indexOf(a)}" aria-label="複製公告"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg></button>`
      + `<div class="atime">${a.pin?'📌 ':''}${esc(a.time)}</div><div class="atitle">${esc(a.title)}</div><div class="abody">${esc(a.body)}</div></div>`;
  });
  const qsvg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  h += `<div class="quickgrid">`
    + `<button data-act="go-tab" data-tab="trip">${qsvg('<path d="M9 4 3 6.2v13.8l6-2.2 6 2.2 6-2.2V4l-6 2.2L9 4Z"/><path d="M9 4v13.8M15 6.2V20"/>')}每日行程</button>`
    + `<button data-act="go-tab" data-tab="info">${qsvg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6h.01"/>')}實用資訊</button>`
    + `<button data-act="go-tab" data-tab="rate">${qsvg('<path d="M7 5l5 6 5-6"/><path d="M12 11v8"/><path d="M8.5 13.5h7M8.5 16.5h7"/>')}匯率計算</button>`
    + `<button data-act="go-tab" data-tab="jp">${qsvg('<path d="M20 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3v4l5-4h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"/>')}常用日文</button>`
    + `</div>`;
  $("#screen-home").innerHTML = h;
}

/* =================== NAV + DELEGATION =================== */
function switchTab(tab){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $("#screen-"+tab).classList.add("active");
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
  document.querySelector("#app").scrollTop = 0; window.scrollTo(0,0);
}
$("#nav").addEventListener("click",e=>{ const b=e.target.closest("button"); if(b) switchTab(b.dataset.tab); });
function jumpTo(sel){ const el=document.querySelector(sel); if(!el) return; const y = el.getBoundingClientRect().top + window.scrollY - 62; window.scrollTo({top:Math.max(0,y), behavior:"smooth"}); }

document.body.addEventListener("click",e=>{
  const el = e.target.closest("[data-act]");
  if(!el) return;
  const act = el.dataset.act;
  if(act==="toggle-day"){ const dd=$("#dd-"+el.dataset.day); if(dd){ const wasOpen=dd.classList.contains("open"); dd.classList.toggle("open"); if(wasOpen) document.getElementById("day-anchor-"+el.dataset.day)?.scrollIntoView({behavior:"smooth",block:"start"}); } }
  else if(act==="toggle-exp"){ el.classList.toggle("open"); }
  else if(act==="toggle-collapse"){ el.parentElement.classList.toggle("open"); }
  else if(act==="toggle-cat"){ el.parentElement.classList.toggle("open"); }
  else if(act==="copy-room"){ copyRoom(el.dataset.hotel); }
  else if(act==="jump-day"){ jumpTo("#day-anchor-"+el.dataset.day); }
  else if(act==="jump-info"){ jumpTo("#info-"+el.dataset.target); }
  else if(act==="copy-charter"){ copyCharter(); }
  else if(act==="speak"){ speak(+el.dataset.c,+el.dataset.i); }
  else if(act==="prefix"){ const v=el.dataset.val; ratePrefix = (ratePrefix===v)?"":v; $("#prefixInput").value=ratePrefix; document.querySelectorAll("#prefixTags .ptag").forEach(b=>b.classList.toggle("active", b.dataset.val===ratePrefix)); if(rateJpy>0) $("#ratePreview").textContent=buildRateMsg(rateJpy); }
  else if(act==="pick-cur"){ setActiveCur(el.dataset.cur); }
  else if(act==="rate-key"){
    const F=$("#cur-"+rateActive); const k=el.dataset.k;
    let v = F.value;
    if(rateFresh && k!=="＝"){ if(k!=="C"&&k!=="⌫"&&!"＋－×÷".includes(k)) v=""; else v=v.replace(/,/g,""); rateFresh=false; }
    if(k==="C"){ v=""; }
    else if(k==="⌫"){ v=v.slice(0,-1); }
    else if(k==="＝"){ const r=evalExpr(v); v = r ? nf(r) : ""; rateFresh=false; }
    else if("＋－×÷".includes(k)){ if(v) v = v.replace(/[＋－×÷]$/,"") + k; }
    else { v += k; }
    F.value=v; F.style.color = "var(--ink)";
    syncRate(rateActive);
  }
  else if(act==="copy-ann"){ const a=ANNOUNCEMENTS[+el.dataset.i]; if(a) copyText(`📢 ${a.title}（${a.time}）\n${a.body}`); }
  else if(act==="demo-video"){ toast("公開版未包含私人影片，這裡保留原始互動卡片的展示位置"); }
  else if(act==="go-tab"){ switchTab(el.dataset.tab); }
  else if(act==="copy-rate"){ if(rateJpy>0) copyText(buildRateMsg(rateJpy)); else toast("請先輸入金額"); }
  else if(act==="edit-rate"){ const re=$("#rateEdit"); re.classList.toggle("open"); $("#r-twd").value=rate.twd; $("#r-cny").value=rate.cny; }
  else if(act==="save-rate"){ const t=parseFloat($("#r-twd").value)||rate.twd, c=parseFloat($("#r-cny").value)||rate.cny; rate.twd=t; rate.cny=c; fmtRateLabel(); $("#rateEdit").classList.remove("open"); if(rateJpy>0){ syncRate("jpy"); } toast("匯率已更新"); }
});

/* preload ja voices */
if("speechSynthesis" in window){ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged=()=>speechSynthesis.getVoices(); }

/* =================== INIT =================== */
renderHome(); renderTrip(); renderInfo(); renderRate(); renderJp();
