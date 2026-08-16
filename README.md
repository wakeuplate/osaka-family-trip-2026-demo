# 大阪旅遊手冊 Demo

> 去識別化、手機優先的大阪與奈良五日旅遊手冊。

這是一個為多人家庭旅行設計的手機優先旅遊手冊。它把原本分散在訊息、訂單、地圖與筆記裡的行程資訊，整理成一個旅途中可以快速查找的入口，讓同行家人不需要反覆翻找不同資料，也能理解接下來要去哪裡、怎麼移動與需要注意什麼。

這個網站原先是私人旅遊工具，實際部署在 Netlify／PWA 環境中使用；公開版本則保留原本的產品目的、資訊架構與 UI，將真實資料替換成模擬資料後，以 GitHub Pages 作為作品集 Demo。另附一個手機直向的行前互動影片，將旅程用大字、圖片與簡短字幕重新說給長輩和小朋友看。

**正式 Demo：** [開啟 GitHub Pages](https://wakeuplate.github.io/osaka-family-trip-2026-demo/)<br>
**GitHub Repository：** [wakeuplate/osaka-family-trip-2026-demo](https://github.com/wakeuplate/osaka-family-trip-2026-demo)<br>
**English version：** [README_EN.md](README_EN.md)

## 預覽

<p align="center">
  <img src="docs/screenshots/home.jpg" alt="首頁" width="30%">
  <img src="docs/screenshots/itinerary.jpg" alt="每日行程" width="30%">
  <img src="docs/screenshots/attraction.jpg" alt="景點詳細資訊" width="30%">
</p>
<p align="center">
  <img src="docs/screenshots/info.jpg" alt="實用資訊" width="30%">
  <img src="docs/screenshots/video-opening.jpg" alt="行前互動影片開場" width="30%">
  <img src="docs/screenshots/video-finale.jpg" alt="行前互動影片結尾" width="30%">
</p>

## 作品集摘要

| 面向 | 說明 |
| --- | --- |
| 專案類型 | Mobile-first travel planning web app |
| 使用者問題 | 多人旅行資訊分散，且不同年齡層需要不同的閱讀方式 |
| 產品目標 | 把行程、景點、住宿與旅途中工具集中成容易查找的手機手冊 |
| 主要使用者 | 負責規劃的家人、同行長輩與小朋友 |
| 範圍 | Osaka／Nara 五日行程展示 |
| 我的工作範圍 | 需求整理、資訊架構、手機 UI、互動實作、內容編排與公開化 |
| 技術 | HTML、CSS、Vanilla JavaScript、localStorage |
| 部署 | GitHub Pages 純靜態網站 |
| 資料邊界 | 去識別化資料、`***` 與合成 Demo 資料 |

## 為什麼做這個網站

家庭旅行通常同時有三種需求：規劃者需要快速確認行程與訂單資訊，長輩需要清楚、大字、少干擾的閱讀介面，小朋友則更容易透過圖片與簡短說明理解旅程。若資訊只分散在群組訊息、截圖、地圖與紙本資料中，同行者就必須一直詢問或切換來源。

因此，這個網站的核心不是單純展示景點，而是把「出發前規劃」與「旅途中查找」整合成一個家庭共用的旅遊手冊。它先以真實使用情境建立內容與互動，再整理成可以公開說明設計決策的作品集版本。

## 網站可以做什麼

- **快速掌握每日行程**：以 Day 1–Day 5 的卡片整理每日路線，展開後可查看景點細節，並從景點入口開啟地圖搜尋。
- **集中查看實用資訊**：把航班、住宿、房間分配、包車與緊急資訊放在同一個頁面，透過收合區塊降低平常瀏覽時的資訊負擔。
- **支援旅途中即時查找**：提供固定 Demo 匯率計算、可編輯的本機欄位，以及可直接出示給店家或服務人員看的常用日文卡片。
- **照顧不同年齡層的理解方式**：行前互動影片以圖片、大字、短字幕與點按換幕，讓長輩和小朋友可以先理解整趟旅程。
- **保留可維護的資料邊界**：畫面與資料分離，未來可以沿用同一套 UI 和格式製作新的旅程，不必把真實訂單直接寫死在畫面裡。

## 我的角色與貢獻

- 從家庭多人旅行的實際使用情境定義問題，將「資訊分散、同行者理解程度不同」轉換成網站的產品目標。
- 規劃資訊架構，將內容分成首頁公告、每日行程、實用資訊、匯率計算與常用日文等主要入口。
- 將實際旅遊流程整理成適合手機單手操作的卡片式 UI，設計底部導覽、收合區塊、景點地圖入口與複製互動。
- 以原始 Netlify 版作為 UI 基準，拆分 HTML、CSS、互動程式與 Demo data，讓資料可以替換而不必重寫畫面。
- 編排景點、住宿、交通與注意事項內容，控制資訊層級與文字長度，讓使用者在旅途中能快速掃讀。
- 為長輩與小朋友製作行前互動影片，以圖像導覽補足一般行程表不容易傳達的內容。
- 將私人旅遊工具重新整理成可公開展示的作品集 Demo，建立私人版本與公開版本之間的資料邊界。
- 將旅客、航班、訂單、房間、包車與導遊資訊轉換為 `***` 或合成資料。
- 保留公開景點與飯店資訊，並加入「規劃版／非實際行程」說明。
- 完成圖片 metadata、隱私字串、API key、外部連結與前端錯誤檢查。
- 建立可直接部署到 GitHub Pages 的純靜態網站。

## 產品決策

### Mobile-first by intent

這個網站原本就是旅行中使用的手機手冊，因此主要介面維持窄版、卡片式與底部導覽。電腦瀏覽器上會以置中的手機體驗呈現，不另外製作側邊欄或多欄 Dashboard，避免偏離真實使用情境，也避免維護兩套 UI。

### Public／private separation

私人使用版本保留在 Netlify／PWA 環境；本 repo 是獨立的公開 Demo，使用 GitHub Pages 展示。公開版不連結私人網站、私人影片或私人資料來源；行前影片也改為 repo 內的去識別化版本。

### Privacy by replacement

敏感區塊仍保留原本的資訊架構，讓作品可以展示收合、複製與本機編輯等互動，但內容改為 `***`、`Demo` 或合成旅客資料。這樣可以展示產品設計能力，又不需要把實際訂單與聯絡資料放入公開 repo。

## 使用者可以怎麼使用

- 首頁公開版資料聲明與示範公告卡。
- Day 1–Day 5 行程卡片與景點詳細介紹。
- 景點與飯店圖片、公開地圖搜尋連結及官方票券連結。
- 航班、住宿、房間分配、包車與緊急資訊收合區塊。
- 固定 Demo 匯率計算機，不使用即時匯率或任何旅費結算資料。
- 常用日文卡片與瀏覽器語音朗讀。
- 可編輯的 Demo 欄位只儲存在目前瀏覽器的 `localStorage`。
- 行前互動影片支援自動播放、點按換幕與按住快轉，讓長輩和小朋友可以先用圖像理解旅程。
- 無後端、無分析工具、無 API key、無私人媒體連結。

## 網站架構

網站採用「靜態頁面外殼、資料與畫面分離、互動集中管理」的結構。這讓它適合直接部署到 GitHub Pages，也方便未來複製同一套規格製作新的旅遊手冊。

| 層級 | 負責內容 | 主要檔案 |
| --- | --- | --- |
| 頁面外殼 | 定義五個主要畫面、底部導覽與載入順序 | `index.html` |
| 視覺系統 | 顏色、字體、卡片、手機版版面與狀態樣式 | `styles.css` |
| 互動與畫面渲染 | 產生行程、實用資訊、匯率、日文頁面，處理切換、收合、複製與本機編輯 | `app.js` |
| Demo 資料 | 行程、景點、住宿、交通與示範資訊，和畫面邏輯分開 | `demo-data.js` |
| 圖片與裝飾資源 | 景點、飯店、圖示與視覺素材 | `assets/`、`照片資源/` |
| 行前互動影片 | 獨立的手機直向互動頁，支援自動播放、點按換幕與按住快轉 | `行前影片/index.html`、`行前影片/assets/` |
| 公開部署 | 不依賴後端的靜態網站託管 | GitHub Pages |

主要畫面之間的關係如下：

```text
首頁
├── 每日行程 → Day 1–Day 5 → 景點詳情 → 公開地圖搜尋
├── 實用資訊 → 航班／住宿／包車／緊急資訊
├── 匯率計算 → 固定 Demo 匯率與本機編輯
└── 常用日文 → 文字卡片與瀏覽器語音朗讀

首頁 → 行前互動影片 → 圖像化旅程導覽 → 返回公開旅遊手冊
```

公開版的資料流不會連到 API 或後端：`demo-data.js` 提供展示資料，`app.js` 將資料渲染成畫面，使用者的可編輯內容只保存在目前瀏覽器的 `localStorage`。

## 隱私與安全邊界

- 不包含真實姓名、電話、Email、訂位編號、房號、付款紀錄、費用結算或私人聯絡方式。
- 不包含私人 Netlify URL、私人影片 URL、後端 endpoint、API key、analytics 或 tracking script。
- 行前影片中的航班、日期與旅伴資訊均為 Demo；「兔寶」是公開版化名，不是真實姓名。
- Google Maps 的 `api=1` 是公開網址參數，不是 API key。
- 外部連結僅限公開地圖、官方旅遊／醫療資訊、官方景點票券與字型資源。
- 所有 Demo 圖片已掃描並移除 EXIF／comment metadata。
- 可編輯欄位只寫入目前瀏覽器的 `localStorage`，不會送到伺服器。

## 本機預覽

因為網站使用分離的 JavaScript 檔案，本機預覽時請透過任一個靜態伺服器開啟，不要直接雙擊 `index.html`。正式版本請使用上方的 [GitHub Pages Demo](https://wakeuplate.github.io/osaka-family-trip-2026-demo/)。

## 已知限制

- 這是規劃版與作品集展示，不代表實際行程。
- 航班、旅客名單、訂單、房間與聯絡資訊都是 Demo 資料。
- 匯率是固定示範值，不是即時金融資料。
- 景點、飯店、票券、營業時間與緊急資訊可能變動，實際使用時應以官方最新資訊為準。
- 圖片與第三方素材不包含在 source code 的 MIT 授權中，請先閱讀 [CREDITS.md](CREDITS.md)。

## 技術與結構

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
README_EN.md        English documentation
LICENSE             MIT license for source code only
```

## 授權

Source code is released under the MIT License. Images and third-party assets are excluded from that code license. See [CREDITS.md](CREDITS.md) before reusing any visual asset.
