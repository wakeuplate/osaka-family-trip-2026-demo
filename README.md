# 大阪旅遊手冊 Demo / Osaka Travel Handbook Demo

> 去識別化、手機優先的大阪與奈良五日旅遊手冊。<br>
> A de-identified, mobile-first travel handbook for a five-day Osaka and Nara trip.

這是一個從私人旅遊手冊整理出的公開作品集 Demo。它保留原 Netlify 版本的手冊 UI 與互動方式，但將實際旅遊中的個人資料、訂單資料、聯絡方式與私人財務資訊全部移除，改以模擬資料呈現。另附一個手機直向的行前互動影片，將旅程用大字、圖片與簡短字幕重新說給長輩和小朋友看。

This is a public portfolio demo derived from a private travel handbook. It preserves the original Netlify version's UI and interaction model while removing personal, booking, contact, and private financial information. The project also includes a mobile-first interactive pre-trip guide designed to explain the journey to older family members and children through large text, images, and short captions.

**正式 Demo／Live Demo：** [開啟 GitHub Pages](https://wakeuplate.github.io/osaka-family-trip-2026-demo/)<br>
**GitHub Repository：** [wakeuplate/osaka-family-trip-2026-demo](https://github.com/wakeuplate/osaka-family-trip-2026-demo)

## 預覽 / Preview

<p align="center">
  <img src="docs/screenshots/home.jpg" alt="Home screen" width="30%">
  <img src="docs/screenshots/itinerary.jpg" alt="Itinerary screen" width="30%">
  <img src="docs/screenshots/attraction.jpg" alt="Attraction detail screen" width="30%">
</p>
<p align="center">
  <img src="docs/screenshots/info.jpg" alt="Information screen" width="30%">
  <img src="docs/screenshots/video-opening.jpg" alt="Interactive pre-trip guide opening" width="30%">
  <img src="docs/screenshots/video-finale.jpg" alt="Interactive pre-trip guide finale" width="30%">
</p>

## 繁體中文版

### 作品集摘要

| 面向 | 說明 |
| --- | --- |
| 專案類型 | Mobile-first travel planning web app |
| 產品情境 | 旅途中快速查看行程、景點、住宿與實用工具 |
| 範圍 | Osaka／Nara 五日行程展示 |
| 技術 | HTML、CSS、Vanilla JavaScript、localStorage |
| 部署 | GitHub Pages 純靜態網站 |
| 資料邊界 | 去識別化資料、`***` 與合成 Demo 資料 |

### 專案動機

旅行中的資訊通常分散在訊息、訂單、地圖與筆記裡。這個專案將它們整理成一個適合手機單手操作的數位手冊，讓使用者可以快速找到當日行程、景點介紹、住宿資訊、緊急資訊、匯率工具與常用日文。

這次公開化的重點不是重做一個全新的視覺，而是以實際使用過的 Netlify 版本為基礎，保留原本的資訊架構與視覺語言，再建立清楚的公開資料邊界。

### 我的角色與貢獻

- 將私人旅遊工具重新整理成可公開展示的作品集 Demo。
- 以原始 Netlify 版作為 UI 基準，拆分 HTML、CSS、互動程式與 Demo data。
- 將旅客、航班、訂單、房間、包車與導遊資訊轉換為 `***` 或合成資料。
- 保留公開景點與飯店資訊，並加入「規劃版／非實際行程」說明。
- 以長輩與小朋友為使用者，透過大字、景點圖片、簡短字幕與點按切幕降低閱讀和操作負擔。
- 完成圖片 metadata、隱私字串、API key、外部連結與前端錯誤檢查。
- 建立可直接部署到 GitHub Pages 的純靜態網站。

### 產品決策

#### Mobile-first by intent

這個網站原本就是旅行中使用的手機手冊，因此主要介面維持窄版、卡片式與底部導覽。電腦瀏覽器上會以置中的手機體驗呈現，不另外製作側邊欄或多欄 Dashboard，避免偏離真實使用情境，也避免維護兩套 UI。

#### Public／private separation

私人使用版本保留在 Netlify／PWA 環境；本 repo 是獨立的公開 Demo，使用 GitHub Pages 展示。公開版不連結私人網站、私人影片或私人資料來源；行前影片也改為 repo 內的去識別化版本。

#### Privacy by replacement

敏感區塊仍保留原本的資訊架構，讓作品可以展示收合、複製與本機編輯等互動，但內容改為 `***`、`Demo` 或合成旅客資料。這樣可以展示產品設計能力，又不需要把實際訂單與聯絡資料放入公開 repo。

### 功能

- 首頁公開版資料聲明與示範公告卡。
- Day 1–Day 5 行程卡片與景點詳細介紹。
- 景點與飯店圖片、公開地圖搜尋連結及官方票券連結。
- 航班、住宿、房間分配、包車與緊急資訊收合區塊。
- 固定 Demo 匯率計算機，不使用即時匯率或任何旅費結算資料。
- 常用日文卡片與瀏覽器語音朗讀。
- 可編輯的 Demo 欄位只儲存在目前瀏覽器的 `localStorage`。
- 行前互動影片支援自動播放、點按換幕與按住快轉，讓長輩和小朋友可以先用圖像理解旅程。
- 無後端、無分析工具、無 API key、無私人媒體連結。

### 隱私與安全邊界

- 不包含真實姓名、電話、Email、訂位編號、房號、付款紀錄、費用結算或私人聯絡方式。
- 不包含私人 Netlify URL、私人影片 URL、後端 endpoint、API key、analytics 或 tracking script。
- 行前影片中的航班、日期與旅伴資訊均為 Demo；「兔寶」是公開版化名，不是真實姓名。
- Google Maps 的 `api=1` 是公開網址參數，不是 API key。
- 外部連結僅限公開地圖、官方旅遊／醫療資訊、官方景點票券與字型資源。
- 所有 Demo 圖片已掃描並移除 EXIF／comment metadata。
- 可編輯欄位只寫入目前瀏覽器的 `localStorage`，不會送到伺服器。

### 本機預覽

因為網站使用分離的 JavaScript 檔案，本機預覽時請透過任一個靜態伺服器開啟，不要直接雙擊 `index.html`。正式版本請使用上方的 [GitHub Pages Demo](https://wakeuplate.github.io/osaka-family-trip-2026-demo/)。

### 已知限制

- 這是規劃版與作品集展示，不代表實際行程。
- 航班、旅客名單、訂單、房間與聯絡資訊都是 Demo 資料。
- 匯率是固定示範值，不是即時金融資料。
- 景點、飯店、票券、營業時間與緊急資訊可能變動，實際使用時應以官方最新資訊為準。
- 圖片與第三方素材不包含在 source code 的 MIT 授權中，請先閱讀 [CREDITS.md](CREDITS.md)。

## English Version

### Portfolio snapshot

| Area | Description |
| --- | --- |
| Project type | Mobile-first travel planning web app |
| Product context | Quick access to itineraries, attractions, hotels, and travel utilities |
| Scope | Five-day Osaka and Nara itinerary demo |
| Stack | HTML, CSS, Vanilla JavaScript, and localStorage |
| Deployment | Static site deployed on GitHub Pages |
| Data boundary | De-identified data, `***`, and synthetic demo values |

### Why this project

Travel information is often scattered across messages, bookings, maps, and notes. This project turns that fragmented information into a mobile handbook for quickly checking daily plans, attractions, hotels, emergency information, currency calculations, and useful Japanese phrases.

The public version is intentionally not a visual redesign. It starts from a travel handbook that was actually used on Netlify, preserves its information architecture and visual language, and establishes a clear boundary between private operational data and public portfolio content.

### Role and contribution

- Reframed a private travel utility as a public portfolio demo.
- Used the original Netlify UI as the visual baseline and separated the HTML shell, CSS system, interaction logic, and demo data.
- Replaced passenger, flight, booking, room, charter, and guide information with `***` or synthetic values.
- Preserved public attraction and hotel information while adding clear planning-demo notices.
- Designed the pre-trip guide around older family members and children through large text, image-led storytelling, short captions, and tap-based scene changes.
- Audited image metadata, privacy strings, API keys, external links, and frontend errors before publication.
- Prepared the project as a static GitHub Pages site with no backend dependency.

### Product decisions

#### Mobile-first by intent

The original product was a phone handbook used during travel, so the public demo keeps its narrow card layout and bottom navigation. Desktop browsers show the centered phone experience rather than a separate sidebar or dashboard UI, keeping the implementation aligned with the actual use case.

#### Public／private separation

The private operational version remains in a Netlify／PWA environment, while this repository is an independent public demo hosted on GitHub Pages. The public version does not link to the private site, private media, or private data sources. The pre-trip guide is also included as a de-identified copy inside the repository.

#### Privacy by replacement

Sensitive sections keep their original information architecture so the demo can show collapsible panels, copy interactions, and local editing. Actual values are replaced with `***`, `Demo`, or synthetic travel data instead of exposing real bookings or contacts.

### Features

- Public data-boundary notice and demo announcement cards on the home screen.
- Day 1–Day 5 itinerary cards with attraction details.
- Attraction and hotel images, public map search links, and official ticket links.
- Collapsible flight, hotel, room assignment, charter, and emergency-information sections.
- Fixed demo currency calculator with no live exchange-rate or expense-settlement data.
- Japanese phrase cards with browser speech synthesis.
- Editable demo fields stored only in the current browser's `localStorage`.
- Interactive pre-trip guide with autoplay, tap-to-advance, and press-and-hold fast-forward interactions.
- No backend, analytics, API keys, or private media URLs.

### Privacy and security boundary

- No real names, phone numbers, email addresses, booking references, room numbers, payment records, expense settlements, or private contacts.
- No private Netlify URL, private video URL, backend endpoint, API key, analytics, or tracking script.
- Flight, date, and traveler information in the pre-trip guide are demo values; “兔寶” is a public alias, not a real name.
- The Google Maps `api=1` value is a public URL parameter, not an API key.
- External links are limited to public maps, official travel／medical information, official attraction tickets, and font resources.
- Demo images were scanned and stripped of EXIF and comment metadata.
- Editable fields use browser-local `localStorage` only and are not sent to a server.

### Local preview

Because the site uses separate JavaScript files, run it through any static server for local preview instead of opening `index.html` directly. The deployed version is available at the [GitHub Pages Demo](https://wakeuplate.github.io/osaka-family-trip-2026-demo/).

### Known boundaries

- This is a planning and portfolio demo, not a record of an actual itinerary.
- Flights, passengers, bookings, rooms, and contact information are demo data.
- Exchange rates are fixed demonstration values, not live financial data.
- Attraction, hotel, ticket, opening-hour, and emergency information may change; real use should follow the latest official sources.
- Images and third-party assets are excluded from the MIT license for the source code. See [CREDITS.md](CREDITS.md) before reuse.

## 技術與結構 / Tech and structure

```text
index.html          page shell and five screens
styles.css          original handbook visual system and responsive layout
app.js              rendering, navigation and interaction logic
demo-data.js        replaceable de-identified trip data
assets/             icons and decorative artwork
照片資源/            destination and hotel display assets
docs/screenshots/   portfolio preview images
行前影片/            de-identified interactive pre-trip guide
CREDITS.md          asset credits and redistribution notes
LICENSE             MIT license for source code only
```

## 授權 / License

Source code is released under the MIT License. Images and third-party assets are excluded from that code license. See [CREDITS.md](CREDITS.md) before reusing any visual asset.
