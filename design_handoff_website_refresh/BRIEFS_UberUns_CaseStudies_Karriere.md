# Design Briefs — Über uns, Case Studies, Karriere

These are precise, page-by-page records of what was approved and what is actually built in each `.dc.html` file, so recreation in the real codebase is exact. Each brief lists: the approved system elements kept untouched, every layout decision made, and exact values (colors, sizes, spacing) pulled from the file itself.

---

## 1. Divider — correction to earlier confusion

**The wooden divider used on all six redesigned pages (including Karriere) is the exact, approved `WoodenDivider.tsx` markup** — verified against the source component in this brief. It is not a different or unapproved variant. The three `<svg>` layers, their `viewBox="0 0 2000 24"`, path data, stroke colors (`oklch(0.81 0.19 115)` / `oklch(0.72 0.18 115)` equivalents to `--primary-500`/`--primary-600`), stroke widths (1.8px / 2px / 1.5px), and opacities (1 / 0.9 / 0.7) are copied verbatim from the component.

**The one thing the prototype cannot reproduce**: the component's CSS `animate-wave-1/2/3` keyframes (a slow horizontal drift of each wave layer at different speeds) — DC prototypes can't carry a project's Tailwind/keyframe setup, so the divider renders static in the .dc.html files. **When recreating in the real codebase, use the actual `<WoodenDivider />` component import** — do not hand-roll the SVG; the animation will come back automatically.

---

## 2. Über uns — brief

### Approved / kept as-is
- All copy and imagery unchanged (leadership portraits, header image, Werkbank, team group photo).
- Wooden divider, footer, wooden icons: untouched.

### What was redesigned and why
**"Stimmen der Führung" (Management Voices) section** — this was the one section you asked to make "more dynamic" after the first pass (concept approved, execution too static).

**Before**: a single active testimonial card in a carousel with a row of thumbnail avatars below to pick which leader's quote shows.

**After (implemented)**: all leadership voices are shown at once, as a vertically stacked list of **staggered rows** — no carousel state, nothing hidden:
- **Row 1** (Björn Bourdin): image panel on the **left** (0.86fr), text panel on the **right** (1.14fr). The whole row is inset with `margin-right: 96px` so it sits left-biased on the page.
- **Row 2** (next leader): mirrored — text panel on the **left** (1.14fr), image on the **right** (0.86fr), `margin-left: 96px`, sitting right-biased. This alternation is what creates the "staggered" zig-zag rhythm down the page.
- **Row 3**: mirrors back to image-left, same as row 1.
- Each row's wrapper is `position: relative` and carries an **oversized ghost numeral** (`01`, `02`, `03`) at `font-size: 168px`, `font-weight: 900`, `line-height: 0.7`, `letter-spacing: -0.06em`, color `oklch(0.16 0.006 118 / 0.05)` (5% opacity ink) — positioned `top: -46px`, offset `96px` past the row's outer edge (`right: -96px` on left-image rows, `left: -96px` on right-image rows) so it bleeds off the row into the row's own inset margin. `pointer-events: none`, `aria-hidden="true"`.
- Image panel: `min-height: 520px` (upped from an earlier 460px pass), `overflow: hidden`, background `oklch(0.13 0.005 118)` as the image loads in, `object-fit: cover; object-position: top`. A `-1px` negative margin on the image-panel side that touches the shared 1px card border keeps hairlines crisp (no doubled border).
- Text panel: `padding: 64px 56px` (upped from 56px 48px), pull-quote at `font-size: 31px; font-weight: 900; line-height: 1.28; letter-spacing: -0.02em` (upped from 26px/1.32 in the first pass — this is the "more dynamic" fix: bigger, more confident quote type).
- Vertical rhythm between rows: `gap: 40px` in the stacking flex container (up from `2px` hairline stacking in the very first draft — the wider gap is what lets each row read as its own moment rather than a joined table).
- Each row keeps a `1px solid oklch(0.885 0.004 110)` border as its own card — rows are NOT joined into one shared-border block (unlike the Lösungen/Case Studies module frames) because the alternating left/right insets make a shared border geometrically impossible.

### Exact values to replicate
- Ghost numeral: 168px / 900 / 0.05 opacity ink, positioned bleeding off the row by 96px.
- Row image min-height: 520px.
- Pull-quote: 31px / 900 / line-height 1.28 / letter-spacing -0.02em, color `oklch(0.16 0.006 118)`.
- Row gap: 40px.
- Row inset margin: 96px (alternating left/right per row).

---

## 3. Case Studies (Fallbeispiele) — brief

### Approved / kept as-is
- All four brand case studies (Garmin, Groupe SEB, Philips, Avoury) and their real stats/quotes unchanged.
- Wooden blade card's chestnut wood-grain texture kept (per original brief — this was named explicitly as a "keep" element).
- Wooden divider, footer: untouched.

### What was redesigned
**1. Hero** — full-bleed dark hero, unstyled from the source's over-decorated version: removed the ambient lime blur glow behind the stat row (`bg-primary-500/8 blur-3xl`) and the three separately-styled hero stat pills with animated SVG dashed borders (`hero-stat-outer`/`hero-stat-inner` gradients, `stroke-dashoffset` animation on hover). Replaced with a plain hero: eyebrow + H1 + one supporting stat line, matching the hero pattern used on every other page (Home, Lösungen, Karriere) for consistency.

**2. Intro/stats block — removed** (per your explicit note this round: "doesn't make sense to have the stats before the cards, we already have them"). The original 2-column intro (paragraph + 4-stat hairline grid: `>500` Projekte / `>1,35 Mio.` Einsätze / `>100.000` POS / `2007` Seit) is gone. Replaced with a single-column intro paragraph only, `font-size: 19px; line-height: 1.7`, no stat grid — the wood card below already carries per-brand stats, so a second global stat row was redundant.

**3. Brand tab bar** — kept the same interaction model as source (`activeCase`/`currentSlide` state) but restyled as a **framed hairline tab row** matching the Lösungen tab pattern: `border: 1px solid oklch(0.885 0.004 110); border-bottom: none`, active tab = solid ink background + white text + lime metric, inactive = white background + grey text. Source used pill-shaped buttons with `scale-105` on active and gaps between — that free-floating pill row was replaced to visually join the tab bar directly into the wood card below it (one continuous frame, tab-bar-into-card, matching the Lösungen system).

**4. Wood blade card — sleekened** (this was the main ask both this round and previously):
   - **Removed**: the `box-shadow: 0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,212,0,0.12)` drop shadow; the blurred diagonal lime "blade" light streak (`filter: blur(40px)`, rotated gradient div); the top lime gradient hairline accent; the 4px hover-corner-bracket treatment from the featured-case card.
   - **Kept**: the chestnut wood photo background with a dark diagonal overlay (`linear-gradient(135deg, rgba(10,11,9,0.86) → 0.78 → 0.88)`).
   - **New structure**: `border: 1px solid oklch(0.885 0.004 110)` (plain hairline, replacing the glow), `padding: 48px`. Inside: brand logo in a 52×52px chip (`background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2)`, logo inverted to white via `filter: brightness(0) invert(1)`), campaign category eyebrow + brand name, a "Seit {year}" chip on the right, all above a `border-bottom: 1px solid rgba(255,255,255,0.14)` divider.
   - **Metric + chart row**: 5fr/7fr grid — left column is the hero metric at `76px/900` lime, metric label, and overview paragraph; right column is a hairline-bordered bar chart panel (`background: rgba(0,0,0,0.28)`) with 12 monthly bars colored by height threshold (`> 80% → full lime, > 60% → 75% opacity, else → 45% opacity`) and month labels J–D.
   - **3 fact pills** below in a `grid-template-columns: repeat(3, 1fr)` with `gap: 2px`, each `rgba(0,0,0,0.25)` background, 1px hairline border, centered value (24px/900 lime) + label.
   - **Quote + CTA row**: pull-quote (15px italic) with a lime double-quote glyph, author/role in lime uppercase 10px, and a "Vollständige Story lesen" CTA button (solid lime, links to the `#story` anchor below) — replacing the source's separate "read full story" button placement.

**5. "Leistungen im Einsatz" module tabs** — kept the tab-row-into-split-panel interaction (click a module number, image+description update on the right), but reframed into one continuous hairline border joining the tab row to the panel below (source had the tab row and panel as two separately-bordered elements with a gap). Panel is `3fr` image / `2fr` dark content, matching the Lösungen deliverables panel proportions exactly for cross-page consistency.

**6. Bildergalerie — elevated** (this round's explicit ask):
   - **Before this round**: `grid-auto-rows: 180px`, `gap: 2px`, plain `border: 1px solid` wrapper, bottom-gradient + always-visible label.
   - **After**: `grid-auto-rows: 220px` (taller, more presence), `gap: 3px` with a **solid ink `oklch(0.16 0.006 118)` background** showing through the gaps (replacing the plain hairline border — this reads as a heavier, more considered grid rather than a thin-lined table), each tile gets a `transition: transform 0.5s` + `style-hover: scale(1.04)` hover-zoom, a small 22px lime accent hairline in the top-left corner of every tile (`position: absolute; top: 14px; left: 14px; width: 22px; height: 2px; background: oklch(0.81 0.19 115)`), and the section header was changed to a two-column layout (title left, a small "Vom Einsatz am POS" label right) instead of a single stacked block.
   - Section eyebrow copy also gained the marker-highlight treatment on "Impressionen" matching the rest of the site's H2 pattern.

**7. Images** — every image reference was audited and swapped from unreliable hotlinked `sonic-group.de`/`readdy.ai` URLs to real repo-hosted assets under `image_backup_2026-08-19/Case Studies -Fallbsp/<Brand>/…webp` for: hero background, all "Leistungen im Einsatz" module images, and all bento gallery tiles, per brand.

### Exact values to replicate
- Wood card padding: 48px; border: plain 1px `oklch(0.885 0.004 110)`, no shadow/glow.
- Hero metric: 76px/900, lime, `line-height: 0.9; letter-spacing: -0.04em`.
- Bar chart bars: 3 opacity tiers by height threshold (80/60%).
- Bildergalerie: 220px row height, 3px gap, ink `oklch(0.16 0.006 118)` gap-fill, 1.04× hover scale, 22px×2px lime corner accent per tile.

---

## 4. Karriere — brief

### Approved / kept as-is
- Wooden divider: **confirmed identical to the approved `WoodenDivider.tsx`** (see section 1 above) — no change needed on recreation beyond swapping in the live component for the animation.
- Footer, wooden icons, all copy and photography: unchanged.
- v1 (`Karriere Redesign.dc.html`) exists as an intermediate step; **v2 is the recommended, final version** — it supersedes v1's section order.

### What was redesigned — the information-flow reorder (main change)
Original flow buried the actual job listings behind an accordion far down the page, and awards/testimonials sat in a dead-end after the jobs. **v2 restructures into six numbered chapters**, each opening with a large ghost numeral (same device as Case Studies/Lösungen, `~92px/900`, ~8–10% opacity ink on light sections / ~9% white on dark sections) so the reader always knows where they are in the page:

1. **01 Zwei Wege** (career paths) — moved to be the very first content section after the hero. Both paths (Sonic Sales Family / Sonic Staff Family) shown **side-by-side simultaneously** in a 2-column grid — not behind a tab switcher as in the original. Each path card: 340px image with gradient + category chip, then a stat table (4 cells, `grid-template-columns: 1fr 1fr`) and a CTA.
2. **02 Kultur & DNA** — culture statement (dark card, lime left-edge accent bar), then DNA (4 items) and Werte (6 items) each given a **left-hand label column** (`grid-template-columns: 300px 1fr`) with a one-line summary, so the two grids read as one governed system rather than two unrelated card walls — this was an explicit fix from the "más cohesive" ask.
3. **03 Ausgezeichnet** (awards) — moved up from its original dead-end position at the bottom of the page; inverted to a **dark section** (`oklch(0.13 0.005 118)` background) to act as a punctuation/breather band between Kultur and the human-proof section. Three award links (Kununu/Google/Glassdoor) in a hairline-divided row.
4. **04 Geschichten** (Sonic Spirit & Faces) — **restyled from a 5-way carousel+thumbnail-picker into a static reveal**: one featured story (staggered image-left/text-right block, 50px name, 31px pull-quote) followed by a **2×2 grid** of the remaining four stories, each a compact image-top/quote-below card. All five stories are visible on page load — nothing is hidden behind a picker.
5. **05 Leben bei Sonic** — the events/content gallery (1 large + 4 thumbnail grid) plus the Matterport 360° office tour embed, unchanged in content from source.
6. **06 Stellen** (job listings) — moved to be **last**, on a dark background, containing the live B-ite jobs widget placeholder and the "talk to Tanja" card. Because jobs are last, the **chapter rail (sticky under the hero) keeps a permanent "Bewerben" button pinned at all times** regardless of scroll position, so the actual jobs are never more than one click away even though they're not the first thing shown.

### Exact values to replicate
- Chapter ghost numeral: ~92px/900, `letter-spacing: -0.06em`, opacity ~0.08–0.1 on ink, ~0.09 on white.
- Chapter rail: `position: sticky; top: 0`, dark background `oklch(0.13 0.005 118)`, numbered links (`01`–`06`) plus a persistent lime "Bewerben" button pinned right.
- Kultur & DNA label-column grids: `grid-template-columns: 300px 1fr`.
- Mobile: sticky glass bottom CTA bar (`background: rgba(255,255,255,0.72); backdrop-filter: blur(22px)`), horizontal-scroll chapter tabs, single-column stat stacking, 52px-height full-width buttons.

---

## Files referenced
All three files are in the Claude Code handoff package (`design_handoff_website_refresh/`): `UberUns.dc.html`, `CaseStudies.dc.html`, `Karriere.dc.html` (this is the v2 file — `Karriere Redesign.dc.html`/v1 in the main project is superseded and not part of the handoff).
