# Osaka Travel Handbook Demo

> A de-identified, mobile-first travel handbook for a five-day Osaka and Nara trip.

This is a mobile-first travel handbook designed for a multi-generational family trip. It turns itinerary information scattered across messages, bookings, maps, and notes into one place that family members can quickly check before and during the trip, without repeatedly searching through different sources.

The original site was a private travel utility used through a Netlify／PWA environment. This public version preserves its product purpose, information architecture, and UI, replaces real data with synthetic demo content, and is deployed on GitHub Pages as a portfolio project. It also includes a portrait-oriented interactive pre-trip guide that explains the journey to older family members and children through large text, images, and short captions.

**Live Demo:** [Open the GitHub Pages site](https://wakeuplate.github.io/osaka-family-trip-2026-demo/)<br>
**GitHub Repository:** [wakeuplate/osaka-family-trip-2026-demo](https://github.com/wakeuplate/osaka-family-trip-2026-demo)<br>
**繁體中文版:** [README.md](README.md)<br>
**Design system:** [DESIGN.md](DESIGN.md)

## Preview

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

## Portfolio snapshot

| Area | Description |
| --- | --- |
| Project type | Mobile-first travel planning web app |
| User problem | Travel information is fragmented, and different age groups need different ways to read it |
| Product goal | Bring itineraries, attractions, hotels, and travel utilities into one searchable mobile handbook |
| Primary users | The family member planning the trip, older relatives, and children |
| Scope | Five-day Osaka and Nara itinerary demo |
| My scope | Product framing, information architecture, mobile UI, interaction, content structure, and public release |
| Stack | HTML, CSS, Vanilla JavaScript, and localStorage |
| Deployment | Static site deployed on GitHub Pages |
| Data boundary | De-identified data, `***`, and synthetic demo values |

## Why build this website

Family travel usually has several audiences at once. The planner needs to confirm routes and booking details quickly, older relatives benefit from large text and fewer distractions, and children often understand a trip more easily through images and short explanations. When the information is split across group messages, screenshots, maps, and paper notes, everyone has to keep asking questions or switching between sources.

This website brings pre-trip planning and in-trip lookup into one shared family handbook. It began with a real use case rather than a mock interface, then became a portfolio-ready version that makes the product decisions and implementation visible.

## What the website does

- **Makes the daily itinerary easy to scan:** Day 1–Day 5 are organized as expandable cards with attraction details and map-search entry points.
- **Centralizes practical information:** Flights, hotels, room assignments, charter transport, and emergency information live in one place, with collapsible sections to reduce everyday clutter.
- **Supports quick lookup during travel:** A fixed demo currency calculator, editable local fields, and Japanese phrase cards can be used without a backend.
- **Explains the trip to different age groups:** The pre-trip guide uses images, large type, short captions, and tap-based scene changes so older relatives and children can understand the journey ahead of time.
- **Keeps the content maintainable:** The UI and trip data are separated, so a future trip can reuse the same format without hard-coding real booking information into the interface.

## Role and contribution

- Defined the product problem from a real multi-generational travel scenario: fragmented information and different levels of user familiarity.
- Planned the information architecture across the home notice, daily itinerary, practical information, currency calculator, and Japanese phrase sections.
- Translated the travel workflow into a phone-friendly card UI with bottom navigation, collapsible sections, map entry points, and copy interactions.
- Used the original Netlify UI as the visual baseline and separated the HTML shell, CSS system, interaction logic, and demo data.
- Organized attraction, hotel, transport, and caution content so it can be scanned quickly during travel.
- Designed the interactive pre-trip guide for older relatives and children as an image-led complement to the itinerary table.
- Reframed the private travel utility as a public portfolio demo with a clear boundary between private and public data.
- Replaced passenger, flight, booking, room, charter, and guide information with `***` or synthetic values.
- Preserved public attraction and hotel information while adding clear planning-demo notices.
- Audited image metadata, privacy strings, API keys, external links, and frontend errors before publication.
- Prepared the project as a static GitHub Pages site with no backend dependency.

## Product decisions

The complete visual and UI／UX rules live in [DESIGN.md](DESIGN.md); this README keeps the portfolio-level product context and decisions.

### Mobile-first by intent

The original product was a phone handbook used during travel, so the public demo keeps its narrow card layout and bottom navigation. Desktop browsers show the centered phone experience rather than a separate sidebar or dashboard UI, keeping the implementation aligned with the actual use case.

### Public／private separation

The private operational version remains in a Netlify／PWA environment, while this repository is an independent public demo hosted on GitHub Pages. The public version does not link to the private site, private media, or private data sources. The pre-trip guide is also included as a de-identified copy inside the repository.

### Privacy by replacement

Sensitive sections keep their original information architecture so the demo can show collapsible panels, copy interactions, and local editing. Actual values are replaced with `***`, `Demo`, or synthetic travel data instead of exposing real bookings or contacts.

## How users use it

- Public data-boundary notice and demo announcement cards on the home screen.
- Day 1–Day 5 itinerary cards with attraction details.
- Attraction and hotel images, public map search links, and official ticket links.
- Collapsible flight, hotel, room assignment, charter, and emergency-information sections.
- Fixed demo currency calculator with no live exchange-rate or expense-settlement data.
- Japanese phrase cards with browser speech synthesis.
- Editable demo fields stored only in the current browser's `localStorage`.
- Interactive pre-trip guide with autoplay, tap-to-advance, and press-and-hold fast-forward interactions.
- No backend, analytics, API keys, or private media URLs.

## Site architecture

The site uses a static page shell, separated trip data, and centralized interaction logic. This keeps it easy to deploy on GitHub Pages and makes the format reusable for future trips.

| Layer | Responsibility | Main files |
| --- | --- | --- |
| Page shell | Defines the five main screens, bottom navigation, and load order | `index.html` |
| Visual system | Colors, typography, cards, mobile layout, and UI states | `styles.css` |
| Rendering and interaction | Renders itinerary, practical information, currency, and Japanese screens; handles tabs, collapsible sections, copy actions, and local edits | `app.js` |
| Demo data | Holds itinerary, attractions, hotels, transport, and sample information separately from the UI | `demo-data.js` |
| Images and decoration | Destination, hotel, icon, and visual assets | `assets/`, `照片資源/` |
| Pre-trip guide | An independent portrait-oriented interactive page with autoplay, tap-to-advance, and press-and-hold fast-forward | `行前影片/index.html`, `行前影片/assets/` |
| Public deployment | Static hosting without a backend dependency | GitHub Pages |

The main screen relationships are:

```text
Home
├── Itinerary → Day 1–Day 5 → Attraction details → Public map search
├── Practical information → Flights／hotel／charter／emergency
├── Currency calculator → Fixed demo rate and local editing
└── Japanese phrases → Phrase cards and browser speech synthesis

Home → Interactive pre-trip guide → Image-led trip overview → Public handbook
```

The public version has no API or backend data flow: `demo-data.js` provides the display data, `app.js` renders it into the screens, and editable values stay in the current browser's `localStorage`.

## Privacy and security boundary

- No real names, phone numbers, email addresses, booking references, room numbers, payment records, expense settlements, or private contacts.
- No private Netlify URL, private video URL, backend endpoint, API key, analytics, or tracking script.
- Flight, date, and traveler information in the pre-trip guide are demo values; “兔寶” is a public alias, not a real name.
- The Google Maps `api=1` value is a public URL parameter, not an API key.
- External links are limited to public maps, official travel／medical information, official attraction tickets, and font resources.
- Demo images were scanned and stripped of EXIF and comment metadata.
- Editable fields use browser-local `localStorage` only and are not sent to a server.

## Local preview

Because the site uses separate JavaScript files, run it through any static server for local preview instead of opening `index.html` directly. The deployed version is available at the [GitHub Pages Demo](https://wakeuplate.github.io/osaka-family-trip-2026-demo/).

## Known boundaries

- This is a planning and portfolio demo, not a record of an actual itinerary.
- Flights, passengers, bookings, rooms, and contact information are demo data.
- Exchange rates are fixed demonstration values, not live financial data.
- Attraction, hotel, ticket, opening-hour, and emergency information may change; real use should follow the latest official sources.
- Images and third-party assets are excluded from the MIT license for the source code. See [CREDITS.md](CREDITS.md) before reuse.

## File map

```text
index.html          page shell and five screens
styles.css          original handbook visual system and responsive layout
app.js              rendering, navigation and interaction logic
demo-data.js        replaceable de-identified trip data
assets/             icons and decorative artwork
照片資源/            destination and hotel display assets
docs/screenshots/   portfolio preview images
行前影片/            de-identified interactive pre-trip guide
DESIGN.md           overall UI／UX design system and maintenance rules
CREDITS.md          asset credits and redistribution notes
README.md           Traditional Chinese documentation
LICENSE             MIT license for source code only
```

## License

Source code is released under the MIT License. Images and third-party assets are excluded from that code license. See [CREDITS.md](CREDITS.md) before reusing any visual asset.
