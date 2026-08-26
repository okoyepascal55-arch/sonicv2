# Leistungen — Complete Design Handoff (Combined)

Single-file combination of everything built for the Leistungen family: the hub, its 7 sub-service pages, and the two elevated pages (SRT, Kreation & Content). Built for the sonicv2 codebase (React + Tailwind + Vite). These are HTML design references, not production code — recreate using the codebase's existing components (WoodenDivider, WoodenButton, WoodenCard, Lightbox, etc.).

Source repo: okoyepascal55-arch/sonicv2, branch main, path src.

---

## The unified system (apply everywhere)
- **Eyebrow / label pattern**: a 28px lime hairline + 11px/900/0.24em uppercase label, replacing the three competing badge components (`SectionBadge`, `LimeBadge`, floating hero chips).
- **Headline accent**: a lime "marker highlight" (`background: oklch(0.81 0.19 115 / 0.9)` block behind dark text, `box-decoration-break: clone`) on the emphasized phrase of H2s on light sections; plain lime-colored type for accents on dark sections. Never applied to form field markers (e.g. required-field asterisks).
- **Buttons**: solid ink (`oklch(0.16 0.006 118)`) primary on light backgrounds, solid lime primary on dark backgrounds, hairline ghost secondary. 0px border-radius everywhere (non-negotiable per the manifesto).
- **Cards/grids**: 1px hairline borders (`oklch(0.885 0.004 110)` on light, `rgba(255,255,255,0.12–0.16)` on dark) joining into one continuous frame per module (tabs + media + caption bar in one border), not individually shadowed floating cards.
- **Wood elements kept, tightened**: the chestnut wood-grain texture (Lösungen "Sonic Lösung" card, Case Studies brand blade card) is kept per client request, but the drop-shadow/glow/blur "blade" effects were removed — now a plain 135° dark overlay + 1px frame, sitting flush inside the same border system as its neighboring tab/grid.
- **Numbered chapters**: large ghost numerals (oversized, ~8% opacity) mark sections/steps (Lösungen challenges, Case Studies modules, Karriere chapter rail) instead of plain bullet numbers.
- **Typography**: Montserrat only (300–900), kept as the existing site's single typeface — no new font introduced.
- **Kept exactly as-is (do not touch when recreating)**: wooden divider SVG squiggle between sections, the live-metrics wood-ticker strip, wooden carved icons, the footer, and all copy/media (images, testimonial quotes, stats) — these were explicitly called out by the client as already-correct brand elements.

---

## Design Tokens
- **Ink (primary text/dark bg)**: `oklch(0.16 0.006 118)` — near-black, warm undertone
- **Lime (brand accent)**: `oklch(0.81 0.19 115)` — primary CTA/accent; `oklch(0.72 0.18 115)` used as a slightly deeper accent for headline color-only emphasis
- **Dark section background**: `oklch(0.13 0.005 118)`
- **Light section background (off-white)**: `oklch(0.975 0.002 110)`
- **Body grey**: `oklch(0.48 0.006 260)` (light bg), `rgba(255,255,255,0.5–0.6)` (dark bg)
- **Hairline border (light)**: `oklch(0.885–0.9 0.004 110)`; (dark): `rgba(255,255,255,0.12–0.16)`
- **Border radius**: `0` everywhere, no exceptions
- **Type**: Montserrat 300–900; H1 ~76–92px/900, H2 ~44–56px/900, eyebrow 11px/900/0.24em uppercase, body 15–19px
- **Spacing**: section padding 88–112px vertical, 40px horizontal; card/grid gaps 2px (hairline) or 0 (shared border)

---

# Design Brief — Leistungen Hub, 7 Sub-Service Pages, SRT, Kreation & Content

Precise, page-by-page record of what's built in each `.dc.html` so recreation in the real codebase (`sonicv2`, per `github.md`) is exact. All ten pages share the same unified system documented in the main `README.md` (type scale, eyebrow, buttons, hairlines, wood elements) — this brief adds the page-specific structure, interactions and exact values, plus the deliberate exception for SRT and Kreation & Content.

---

## 0. System recap + the SRT/Kreation decision

All ten files use the identical tokens as the rest of the site:
- Ink `oklch(0.16 0.006 118)`, Lime `oklch(0.81 0.19 115)` (deeper accent `oklch(0.72 0.18 115)`), dark section bg `oklch(0.13 0.005 118)`, light-off-white `oklch(0.975 0.002 110)`, hairline light `oklch(0.885 0.004 110)`, hairline dark `rgba(255,255,255,0.08–0.16)`.
- Type scale: H1 76–92px/900 (92px used on the hub, SRT and Kreation heroes; 76px on the 7 plainer sub-service pages — hub/flagship pages get the full-size hero, task-specific sub-pages a slightly smaller one), H2 36–48px/900, eyebrow 11px/900/0.24em uppercase, body 12.5–15px.
- Eyebrow device (28px lime hairline + label), lime marker-highlight on H2 emphasis words, 0px border-radius, wood icons/carved images kept untouched throughout.

**Decision confirmed with client**: SRT and Kreation & Content stay on this exact same system (type scale, eyebrow, buttons, hairlines, lime accents) but each carries one distinct layout signature, so they read as the two flagship/premium pages of the Leistungen family rather than looking identical to the 7 plainer sub-service pages:
- **SRT** — dark-hero diagonal wash + giant 3px top gradient line, oversized ghost-numeral section markers (`01`–`06`), a wavy hairline divider between every section (reused from the site's wood-divider silhouette, just monochrome/lime instead of wood), and a light background for content sections (vs. the sub-service pages' repeating dark/light/dark rhythm).
- **Kreation & Content** — light hero (not dark, the one page on the site that opens light) with a radial lime glow, a 3D rotating polaroid carousel, count-up hero stats, hover-invert solution cards (light→ink on hover), and a full lightbox-enabled bento showcase with a CGI-vs-reality before/after slider.

Both pages keep the exact same interaction *pattern language* as the sub-service pages (tab switchers, accordions, module lists) — the distinction is purely visual staging, not a different design system.

---

## 1. Leistungen (hub) — `Leistungen.dc.html`

The parent page for the whole Leistungen family. Structure: hero with a cycling word typewriter (`ROI` → `RETAIL` → `POS` → …, 2.2s interval, fade+shift transition), 4-stat hairline strip, a **4-category service switcher** (Daten & Software / Personal & Staffing / POS & Live Video / Events & Logistik — click swaps a single framed image+dark-caption module with headline, sub, 3 tag pills and dual CTAs), a 3-card "Retail-Schallmauer" pathway section (Markteintritt / Absatz steigern / Omnichannel, hover lifts card 4px + lime border), a wavy-border testimonial pair (Garmin, Philips), and a lime-highlight final CTA.

**Exact values**: hero H1 88px/900 desktop (38px mobile), stat numbers 26px/900, service switcher frame is one continuous border (tab row + 21:9 image + dark caption, no gaps), Schallmauer cards `padding: 32px`, ghost numeral 56px/900 at 6% opacity.

---

## 2. Events & Messen — `EventsMessen.dc.html`

Hero (76px H1) with a 3-stat inline row (`>500` Großevents / `>30.000` Kontakte / `100%` Full Service). Challenge grid (3 cols, dark). Solution: **6-column wood-icon strip** (Kreation, Bau & Equipment, Team, Erlebnis, Logistik, Comms — all original wood-carved icons kept). Process: **6-step circular icon nav** (Briefing → Konzept → Personal → Produktion → Event → Reporting) driving a 5fr/7fr image+copy panel with a step badge. Showcase: **3-tab format switcher** (Events / Messen / Fahrzeuge & Module) driving an 8fr/4fr main-image+info-panel layout with a 4-thumbnail strip overlaid bottom-right of the main image.

**Exact values**: step nav circles 48px, active = solid lime fill + ink icon; inactive = 2px `rgba(255,255,255,0.2)` border; thumbnail strip buttons 52×38px, inactive opacity 0.55.

---

## 3. Forecasting — `Forecasting.dc.html`

Simplest of the seven — no client-side interactive widget, all content is static/pictorial (matches source page's actual simplicity — do not add interactivity that wasn't asked for). Centered hero (76px H1, `Plausible Prognosen.`). 3-card challenge grid. 6-col wood-icon solution strip. **4-step "So funktioniert es" pictorial grid** (Datenbasis aufbauen → Modell kalibrieren → Prognose ausgeben → Live abgleichen), each a bordered card with a 150px header photo + numbered badge. 4-stat dark band (`>1,35 Mio.` Einsätze, `>8 Jahre` Daten, `100%` Transparenz, `±15%` Prognosegenauigkeit).

---

## 4. POS Full Service — `POSFullService.dc.html`

Hero (76px H1, 3-stat row: `>100.000` POS bestückt / `>650.000` Manntage / `>5 Mio.` verkauft). Challenge grid. 4-col wood-icon solution strip. **Assets module** — the most complex piece: a **4-tab switcher** (Gedrucktes & Gebautes / E-Commerce Marketing / Möbel & Shop-in-Shop / Give-aways) on a dark background, each tab driving (a) a 4-image thumbnail strip, (b) a 7fr/5fr main-image + dark checklist panel with a `sc-for`-rendered bullet list of 3–4 items per category, all inside one continuous hairline frame.

**Exact values**: tab row `border-bottom: none` joining directly into the thumbnail strip below (one frame); checklist bullets = 14px lime circle + `ri-check-line` at 9px.

---

## 5. Staff as a Service — `StaffAsAService.dc.html`

Hero (76px H1, `Rundum-Service beim Personal.`, 3-stat row). Challenge grid. 4-col wood-icon solution strip. **Process timeline** — 6-step circular nav (Analyse → Recruiting → Schulung → Einsatz → Performance → Abrechnung) driving a distinctive **giant ghost-numeral centerpiece panel** (180px/900 at 4% opacity behind a 72px icon circle) + copy panel, different visual treatment from Events/Messen's image-panel step display (deliberate variety between the two step-timeline pages). 6-col specialization pictorial grid (Sales Activation, Sales Außendienst, Brand Activation, Merchandising, Shop-in-Shop Staff, Training). **S.O.C.K.S.-Prinzip** — 5-letter circular nav (S-O-C-K-S = Selection/Orientation/Condition/Knowledge/Sellout) driving a 6fr/6fr image+giant-letter-ghost copy panel.

**Exact values**: step centerpiece ghost numeral 180px/900/4% opacity; S.O.C.K.S. ghost letter 100px/900/4% opacity, `margin-bottom: -24px` to crowd the label beneath it.

---

## 6. Talentepool — `Talentpool.dc.html`

Centered hero (76px H1, `>2.000 Talente. Festangestellt.`). Challenge grid. **Talent profiles pictorial grid** — 4 columns, 3:4 portrait-aspect image cards (Brand Ambassador / Video-Berater / Verkaufstrainer / Event-Crew), each with a bottom gradient + lime role tag + caption below. 6-col wood-icon solution strip (Handverlesen, Intensivtraining, Live-Zielerreichung, Deutschlandweit, Spezialisiert, Performance-getrackt). 4-stat light band.

No client-side tab/accordion state on this page — purely pictorial, matching the "talent showcase" brief (multi-image over interactive widget).

---

## 7. (Live) Video — `Video.dc.html`

The most feature-dense sub-page — three original interactive widgets restored/restyled:
1. **LVP Ökosystem phone mockup** — a 340px-wide dark panel with an iPhone-style bezel (8px border, 28px radius) showing a live-call UI (red LIVE badge, caller name/quote overlay, mic/play/hangup circular buttons), paired with a **4-touchpoint switcher** (Website / QR-Codes / POS Material / Verpackung) that updates an icon+label+description panel to its right, plus a 3-stat glasseine-Gbit/uptime/connect-speed row.
2. **6-format tab switcher** (Live-Beratung / Sales Broadcast / Live-Streaming / Social Commerce / Group Buying / After Sales) driving a 7fr/5fr main image (with a bottom thumbnail filmstrip of all 6) + icon/headline/desc/CTA panel.
3. **Interactive cost calculator** — 4 range sliders (Tage pro Woche 1–7, Stunden pro Tag 1–12, Teamgröße 1–10, Kampagnendauer 7–365 Tage) computing live `maxCalls` and `totalCost` (`~4,50 €`/call heuristic) shown in a 3-col result strip. Plus a static phygital comparison table (Video vs. Field Force, 3 criteria, checkmark/cross icons).

**Exact values**: phone mockup 240px wide, 400px screen height, border-radius 28px; calculator card `padding: 40px`, sliders use `accent-color: oklch(0.81 0.19 115)`; comparison table row height ~44px with alternating hairline dividers.

---

## 8. Warehouse & Logistik — `WarehouseLogistik.dc.html`

Centered hero with a breadcrumb chip (`Leistungen › Warehouse & Logistik`) above the eyebrow — the only sub-page with this breadcrumb treatment, kept from the original because this page sits deepest in the nav hierarchy. 3-stat row (`~500 qm`, `250` Paletten, `>22` Länder). Challenge grid. 4-col wood-icon solution strip (Einlagerung, Lager, Versand, E-Commerce). **"Was wir lagern" item switcher** — 6 flat-button tabs (POS / Messen / Merchandise / Möbel / Technik / Logistik) driving an 8fr/4fr main image+caption panel with a **static list-select panel** on the right (`sc-for` over all 6 category titles, non-interactive list, just a reference index — this is deliberately simpler than the tab-driven thumbnail strips on Events/POS/Video, matching the source's plainer list style). Two-column dark "Full Service" band (copy + 3-stat strip + photo).

---

## 9. SRT — Sonic Reporting Tool — `SRT.dc.html` (elevated/distinct)

Full 11-section flagship build:
1. **Hero** — dark, diagonal lime-wash clip-path overlay top-right, 3px top gradient line, H1 92px (`SONIC REPORTING TOOL.`, tri-color per word), quick-jump chip row (All-in-Software / Funktionsumfang / Team-App / Branchen / Kundenstimmen) anchoring to sections below.
2. **Das Problem** — 3-row **expandable accordion** (not a static grid, unlike the sub-pages), each row a `grid: 80px 1fr auto` (ghost numeral / icon+eyebrow+headline+expand-content / chevron), expand reveals a 3fr/2fr paragraph + dark alert callout + tag pills.
3. **Features** — asymmetric bento (2×2 hero card at `grid-column: span 3, grid-row: span 2` + 5 smaller cards), hero card has a 2px lime border vs. plain 2px grey for the rest.
4. **Video Showcase** — 6-button feature-tab row driving a YouTube-embed dark frame + icon/title/tag/desc caption strip.
5. **Functionality Overview** — 5fr/7fr module list (6 items, left-border-4px active state) + image/detail panel, dark background.
6. **Employee App** — elevated treatment: grid-line background texture, 4-step tap list driving descriptions, paired with a large (288px) phone mockup with a floating "iOS & Android" lime badge and a live task-list UI inside the screen.
7. **Zusammenarbeit** — 6-step accordion (KPI-Definition → Datenintegration → Dashboard-Setup → Team-Management → Abrechnung → Reportings), each expand reveals a dark inset panel with `border-left: 4px solid lime`.
8. **Data Paths** — static node diagram (Externe Daten → SRT → Kunde, plus a 2-col Sonic Agentur/Mitarbeiter row) + 4-stat technical strip (`<50ms` Latenz, `AES-256`, `23+` API-Integrationen, `99,97%` Uptime).
9. **Industries** — 6-card grid of use-case verticals (FMCG & Retail, Beauty & Cosmetics, Event & Promotional Staffing, Field Sales & Territory, Technischer Support CE, Gesundheit & Pflege), each a bulleted 3-item list.
10. **Proof** — 4-stat hairline band matching the site-wide numbers (`>3,7 Mio.` etc.).
11. **Pricing & Access** — 3-tier pricing grid (Starter / Professional [highlighted, top accent bar] / Enterprise) + a 2-col dark-CTA/lead-form split panel (Name/E-Mail/Unternehmen inputs + submit).

**Signature elements exclusive to this page**: the wavy 3-layer SVG divider between every section (monochrome lime, reused geometry from the wood divider but without the wood texture — this is intentional, distinguishing SRT's "system/software" feel from the organic wood dividers used on content pages), oversized ghost-numeral markers, and the diagonal hero wash.

---

## 10. Kreation & Content — `KreationContent.dc.html` (elevated/distinct)

The one page on the site with a **light hero** (all others open dark) — signals "creative studio" rather than "operations tool":
1. **Hero** — white bg, radial lime glow top-center, H1 92px with a lime marker-highlight on "die verkauft.", 3 **count-up stats** (Kampagnen/Assets produziert/Inhouse-Studios — animate 0→target over 1.6s on mount, eased quartic), then a **3D rotating polaroid carousel**: 9 portrait-oriented "photo" tiles arranged in a circular perspective ring (`perspective: 1800px`, radius 480px), auto-rotating via `setInterval` (100ms tick, +4° per tick), each tile computed `translateX/translateZ/rotateY/scale` from its angle, opacity 0 when >150° from center, brightness dims with distance.
2. **Wood icons strip** — 3 icons (Kreation, Produktion, CGI & 3D) kept from source.
3. **Challenge grid** — standard 3-col dark.
4. **Solution — hover-invert cards**: 4-col grid, each card `background: #fff` → `style-hover: background: oklch(0.16 0.006 118)` (full color invert on hover, not just a border-color change like the other sub-pages' solution grids — this is the page's second signature interaction).
5. **Showcase** — editorial header + **3-tab switcher** (Konzeption & Kreation / Content Creation / CGI & 3D-Design) driving: a 12-col **bento grid** (1 large 6×2 hero cell + 1 6×1 + 2×3×1 cells + 1 full-width strip), each cell opens a **fullscreen lightbox** on click (`position: fixed`, blurred dark backdrop, image + title/sub caption), a 5-cell **filmstrip index** below the bento for quick access to all items, and — **CGI tab only** — a before/after **draggable-style compare slider** (clip-path reveal, lime divider handle with a `↔` glyph) contrasting a CGI render against the built result.
6. **Client proof** — logo strip (Garmin, Philips, Nexaro, Lucid), 55% opacity grayscale.
7. **Final CTA** — 48px H1 with lime marker highlight.

**Exact values**: carousel tile size 220×320px, radius 480px, rotation speed 4°/100ms; bento grid `grid-template-columns: repeat(12,1fr)`, row height 300px; hover-invert transition `0.3s ease` on background+border-color; lightbox backdrop `rgba(11,11,12,0.97)` + `blur(24px)`.

---

## Interaction summary (for recreation)

| Pattern | Pages using it | Implementation note |
|---|---|---|
| Tab switcher → single content module swap | Hub, Events, POS, Video (formats), Warehouse, Kreation (showcase) | `activeIdx` state, holes recomputed per index — not routed |
| Circular step nav → detail panel | Events (image-panel style), Staff (ghost-numeral style) | Two different visual treatments by design, same state pattern |
| Accordion (single or multi-open) | SRT (Problem: single-open via `openProblem`, Zusammenarbeit: single-open via `openZs`) | Chevron rotate 180°, dark inset reveal |
| Range-slider calculator | Video | Live-computed derived values, no debounce needed at this scale |
| 3D CSS carousel | Kreation | `setInterval` position, no external library |
| Lightbox | Kreation | `position: fixed` overlay, `stopPropagation` on image click to prevent backdrop-close |
| Static pictorial (no client state) | Forecasting, Talentepool | Deliberate — matches source content density, don't add interactivity not asked for |

## Assets
Wood-carved icons: reuse existing project wood-icon assets (Kreation, Produktion, CGI/3D, and all solution-grid icons across sub-pages) — same source as Lösungen/Case Studies wood elements, do not regenerate.
Video embeds (SRT): placeholder YouTube IDs — swap for real Sonic product-demo clips in recreation.
Phone mockup screenshots (Video, SRT): placeholder imagery — swap for real product/app screenshots if available in the codebase.


---

## Screen map (Leistungen family only)

| Screen | Repo files |
| --- | --- |
| Case Studies Redesign.dc.html | src/pages/case-studies/page.tsx (CaseStudy data, LeistungenImEinsatz, bento gallery) |
| Leistungen.dc.html | src/pages/leistungen/page.tsx + components/LeistungenHero, LeistungenStats, ServiceGrid, SchallmauerWays, IndustrySelector, LeistungenTestimonials |
| EventsMessen.dc.html | src/pages/leistungen/events-messen/page.tsx + components/EventsHero, EventsContent, EventsShowcase |
| Forecasting.dc.html | src/pages/leistungen/forecasting/page.tsx + components/ForecastingHero, ForecastingContent |
| POSFullService.dc.html | src/pages/leistungen/pos-full-service/page.tsx + components/POSHero, POSContent |
| StaffAsAService.dc.html | src/pages/leistungen/staff-as-a-service/page.tsx + components/StaffHero, StaffContent |
| Talentpool.dc.html | src/pages/leistungen/talentpool/page.tsx + components/TalentpoolHero, TalentpoolContent |
| Video.dc.html | src/pages/leistungen/video/page.tsx + components/VideoHero, VideoContent, VideoReferenzen, VideoStudioPhone |
| WarehouseLogistik.dc.html | src/pages/leistungen/warehouse-logistik/page.tsx |
| KreationContent.dc.html | src/pages/leistungen/kreation-content/page.tsx + components/Carousel3D, KreationShowcase, RotatingPhotoGrid |
| SRT.dc.html | src/pages/srt/page.tsx + components/SRTHero, TheProblem, Features, VideoShowcase, FunctionalityOverview, EmployeeApp, Zusammenarbeit, DataPaths, Industries, Proof, PricingAndAccess |
