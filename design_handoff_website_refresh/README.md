# Handoff: Sonic Group Website — Design Consistency Refresh

## Overview
A unified design pass across the Sonic Group marketing site to fix inconsistent headings, badges, buttons, cards and spacing across pages, and to modernize the visual system while staying on-brand. Sixteen pages are included: Home, Lösungen, Über uns, Karriere, Kontakt, Case Studies (Fallbeispiele), the Leistungen hub, its 7 sub-service pages (Events & Messen, Forecasting, POS Full Service, Staff as a Service, Talentepool, Video, Warehouse & Logistik), and SRT + Kreation & Content (elevated/distinct treatment — see `BRIEF_Leistungen_SRT_Kreation.md`).

## About the Design Files
The files in this bundle are **design references built in HTML** — high-fidelity prototypes of the intended look, layout and interaction, not production code to paste in. The task is to **recreate these designs inside the existing sonicv2 codebase** (React + Tailwind + Vite, per `github.md`), using its existing components, hooks (`useText`, `useMediaStore`, `useSEO`), and patterns — not to ship the HTML files directly.

## Fidelity
**High-fidelity.** Colors, type sizes, spacing, and copy are final. Recreate pixel-perfectly using the codebase's existing Tailwind config and component library (`WoodenDivider`, `WoodenButton`, `WoodenCard`, `Lightbox`, etc.) rather than introducing new primitives.

## The unified system (apply everywhere)
- **Eyebrow / label pattern**: a 28px lime hairline + 11px/900/0.24em uppercase label, replacing the three competing badge components (`SectionBadge`, `LimeBadge`, floating hero chips).
- **Headline accent**: a lime "marker highlight" (`background: oklch(0.81 0.19 115 / 0.9)` block behind dark text, `box-decoration-break: clone`) on the emphasized phrase of H2s on light sections; plain lime-colored type for accents on dark sections. Never applied to form field markers (e.g. required-field asterisks).
- **Buttons**: solid ink (`oklch(0.16 0.006 118)`) primary on light backgrounds, solid lime primary on dark backgrounds, hairline ghost secondary. 0px border-radius everywhere (non-negotiable per the manifesto).
- **Cards/grids**: 1px hairline borders (`oklch(0.885 0.004 110)` on light, `rgba(255,255,255,0.12–0.16)` on dark) joining into one continuous frame per module (tabs + media + caption bar in one border), not individually shadowed floating cards.
- **Wood elements kept, tightened**: the chestnut wood-grain texture (Lösungen "Sonic Lösung" card, Case Studies brand blade card) is kept per client request, but the drop-shadow/glow/blur "blade" effects were removed — now a plain 135° dark overlay + 1px frame, sitting flush inside the same border system as its neighboring tab/grid.
- **Numbered chapters**: large ghost numerals (oversized, ~8% opacity) mark sections/steps (Lösungen challenges, Case Studies modules, Karriere chapter rail) instead of plain bullet numbers.
- **Typography**: Montserrat only (300–900), kept as the existing site's single typeface — no new font introduced.
- **Kept exactly as-is (do not touch when recreating)**: wooden divider SVG squiggle between sections, the live-metrics wood-ticker strip, wooden carved icons, the footer, and all copy/media (images, testimonial quotes, stats) — these were explicitly called out by the client as already-correct brand elements.

## Screens / Files

### Home.dc.html
Hero (two-panel: "Agentur" / "Job" doors, unchanged typewriter interactivity — do not touch), 6×2 trust-logo hairline grid, wood live-metrics ticker (kept as-is), video showcase, 3-card Challenge grid with wooden icons, tabbed Leistungen module (framed, image + dark caption + 5-thumbnail strip), SRT diagram + hairline module list, references carousel (auto-drift, pause-on-hover, arrow/dot controls — reimplemented to match original `ClientProof.tsx` behavior), Über-die-Sonic-Group / Karriere two-door CTA, footer.

### Losungen.dc.html
Hero, 3-tab solution switcher (Markteintritt / Absatz steigern / Omnichannel) driving: sleek wood "Sonic Lösung" card (metric, hairline bar chart, 3 fact pills, pull-quote), challenge grid, deliverables list+detail panel (7–8 items per solution), alternating full-width image/text process steps (uncrammed — this replaced an earlier over-dense card layout), testimonial, FAQ accordion (8 questions), final CTA. The redundant stat-grid above the tabs was removed (duplicated the wood card's own stats).

### CaseStudies.dc.html
Hero, 4-brand tab switcher (Garmin / Groupe SEB / Philips / Avoury) driving: sleek wood blade card (brand logo, metric, hairline chart, 3 pills, quote, "Vollständige Story" CTA), "Leistungen im Einsatz" module tabs (5–6 per brand) with framed image+dark panel, elevated Bildergalerie bento grid (3px gaps, hover-zoom, lime corner accents), related-stories switcher, closing CTA. All hotlinked sonic-group.de/readdy.ai images were replaced with real repo-hosted assets under `image_backup_2026-08-19/Case Studies -Fallbsp/<Brand>/`.

### UberUns.dc.html
Origin story, values, leadership team, "Stimmen der Führung" (Management Voices) — restyled as five staggered rows (alternating image side, oversized ghost numeral, 31px pull-quote) instead of a carousel + thumbnail selector.

### Karriere.dc.html
Reordered into six numbered chapters for better information flow: 01 Zwei Wege (career paths — moved first, both paths shown side-by-side rather than tabbed) → 02 Kultur & DNA → 03 Ausgezeichnet (awards, inverted to dark as a punctuation band) → 04 Geschichten (Sonic Spirit & Faces, restyled as a quiet 5-row roster: fixed portrait, name/role/tenure, calm pull-quote, metric column — replaced an earlier hero-card-plus-competing-grid layout) → 05 Leben bei Sonic → 06 Stellen (jobs, last — with "Bewerben" pinned in the sticky chapter rail throughout). Mobile: sticky glass bottom CTA bar, horizontal-scroll chapter rail, single-column stat stacking.

### Kontakt.dc.html
Before/after pair: faithful 1:1 recreation of the current page, then the elevated version (single CTA reusing existing "Anrufen" label — no invented copy).

### Leistungen.dc.html + 7 sub-service pages + SRT.dc.html + KreationContent.dc.html
Full page-by-page detail, exact values and interaction spec in `BRIEF_Leistungen_SRT_Kreation.md` — read that file first for this group. Short summary: the hub (`Leistungen.dc.html`) and 7 sub-service pages (`EventsMessen`, `Forecasting`, `POSFullService`, `StaffAsAService`, `Talentpool`, `Video`, `WarehouseLogistik`) share the plain unified system; `SRT.dc.html` and `KreationContent.dc.html` stay on the same tokens/type-scale but carry a deliberately distinct, more elevated layout signature (confirmed decision, not a separate design language) — SRT gets a diagonal-wash dark hero, ghost-numeral markers and a lime wavy divider; Kreation & Content gets the site's only light hero, a 3D polaroid carousel, hover-invert cards and a lightbox bento showcase.

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

## Interactions & Behavior
- Solution/brand/module tabs: click swaps all dependent content (stats, description, image, list) — implemented as component state (`activeIdx`/`tab` pattern), not route changes.
- References carousel (Home): continuous auto-scroll drift (~0.4px/frame via `requestAnimationFrame`), pauses on mouse-enter, resumes on mouse-leave, prev/next buttons scroll by 60% of container width, dot navigation jumps to start/midpoint.
- FAQ accordion (Lösungen): single-open accordion, `+`/`–` icon swap.
- Deliverables/module list: click sets active index, right panel crossfades to new image+copy.
- Bildergalerie bento (Case Studies): hover scales image 1.04×, no accompanying UI chrome change needed beyond CSS transition.
- Karriere chapter rail: sticky under hero, anchor-links to page chapters; the "Bewerben" CTA stays pinned in the rail at all scroll positions.

## Assets
- Sonic logo (lime wordmark): `https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-...png` — existing brand asset, use as-is.
- Wood grain texture: existing project asset (chestnut plank photo used for the wood ticker and wood cards site-wide) — reuse the same file already in the codebase, do not substitute a new texture.
- Brand logos (Garmin, Philips, Groupe SEB, Nespresso, L'Oréal, WMF, Samsung, Bosch, Dyson, Canon, Vorwerk, Rowenta, Krups, Nexaro): via brandfetch.io CDN in the prototypes — the codebase should use its own licensed/local copies if available.
- Case studies photography: real project assets under `image_backup_2026-08-19/Case Studies -Fallbsp/<Brand>/` and `public/images/Case Studies -Fallbsp/<Brand>/` in the repo — use those, not the readdy.ai placeholder URLs that appear only as prototype filler.
- Karriere/Home/Über uns photography: existing project assets under `public/images/`, `image_backup_2026-08-19/Karriere/`, and `public/images/Über uns/`.

## Files in this bundle
- `Home.dc.html`
- `Losungen.dc.html`
- `CaseStudies.dc.html`
- `UberUns.dc.html`
- `Karriere.dc.html`
- `Kontakt.dc.html`
- `Leistungen.dc.html` (hub)
- `EventsMessen.dc.html`, `Forecasting.dc.html`, `POSFullService.dc.html`, `StaffAsAService.dc.html`, `Talentpool.dc.html`, `Video.dc.html`, `WarehouseLogistik.dc.html` (7 sub-service pages)
- `SRT.dc.html`, `KreationContent.dc.html` (elevated/distinct treatment)
- `BRIEFS_UberUns_CaseStudies_Karriere.md` — page-by-page exact values for Über uns, Case Studies, Karriere
- `BRIEF_Leistungen_SRT_Kreation.md` — page-by-page exact values for the hub, 7 sub-service pages, SRT and Kreation & Content
- `github.md` — source repo (`okoyepascal55-arch/sonicv2`), branch, and a screen-map tying each design file back to the exact source components it was built from (e.g. `src/pages/losungen/page.tsx`, `src/pages/case-studies/page.tsx`) — read this first to locate the real source files to edit.

Each `.dc.html` file opens directly in a browser — open it to see the design live, or read its source for exact markup/styling.
