# 大阪旅遊手冊 Demo

一個手機優先的五日旅遊規劃介面，將每日行程、景點、住宿、公開資訊、匯率工具與常用日文集中在單一靜態網站中。

## Portfolio demo

This is a de-identified portfolio demo of a travel-planning interface. It showcases mobile-first information architecture, collapsible operational cards, local-only demo inputs, and a static deployment-friendly structure.

本 repo 只包含公開 Demo 網站與必要素材，不包含私人旅遊文件、訂單、財務資料、成員名單或私人聯絡方式。網站內的旅客、訂單、包車與導遊欄位均為 `***` 或模擬資料。

私人使用版本部署於 Netlify 並保留個人化功能；本公開 Demo 預計部署於 GitHub Pages。兩者的資料範圍與用途不同，公開版不會連結到私人版本或私人影片頁面。

## Features

- Day 1–Day 5 itinerary navigation
- Destination cards with public map links
- Collapsible flight, hotel, room and contact demo panels
- Local-only editable demo fields using browser `localStorage`
- Fixed demo currency converter without live rates or financial records
- Japanese phrase cards with browser speech synthesis
- Responsive mobile-first layout with no backend or analytics

## Structure

```text
index.html          page shell
styles.css          visual system and responsive layout
app.js              rendering and interaction logic
demo-data.js        replaceable trip demo data
assets/             icons and travel image assets
CREDITS.md          known asset credits and usage notes
LICENSE             MIT license for source code only
```

## Local preview

Because the site uses separate JavaScript files, preview it through a local static server instead of opening `index.html` directly. For example, use any static server and open the generated local address in a browser.

## Privacy and data boundary

- No real names, phone numbers, emails, booking references, passwords, room numbers, payment records or expense settlements are included.
- No API keys, backend endpoints, analytics, cookies or network data submission are used by the Demo.
- The Google Maps links are public navigation URLs. The `api=1` query parameter is not an API key.
- Editable fields stay in the current browser only and can be cleared with the reset button.

## License

The source code is released under the MIT License. Images and third-party assets are not included in that code license. See [CREDITS.md](CREDITS.md) before reusing any asset.
