# Work Done on This Project (Claude Code)

This document records everything built/changed on the Sonic Group site in this
workspace, so the same work can be re-applied to a fresh upload of the project.
It's organized by system, not by file diff — each section says **what it is**,
**where it lives**, and **what to do with it** when porting to a new codebase copy.

---

## 1. Content Management Dashboard (`/dashboard`)

A password-gated admin panel for editing site images and text without a code
deploy — lets non-developers update the live site's copy and media directly.

- **Route:** `/dashboard` (added in [src/router/config.tsx](src/router/config.tsx)).
  `/login`, `/auth`, and `/media-dashboard` all redirect to `/dashboard`.
- **Entry page:** [src/pages/dashboard/page.tsx](src/pages/dashboard/page.tsx)
  — client-side login gate (`sessionStorage`, not real auth — see Known
  Limitations below), then a sidebar + tab layout switching between a **Medien**
  (media) tab and a **Text** tab.
- **Layout integration:** [src/App.tsx](src/App.tsx) detects `pathname === '/dashboard'`
  and hides the normal site `Navigation`/`Footer`, using a dark full-height
  layout instead.
- **Sidebar:** [src/pages/dashboard/components/Sidebar.tsx](src/pages/dashboard/components/Sidebar.tsx)
  — lists page groups (Home, Lösungen, Leistungen, Ratgeber, etc.) to filter
  which section's content is being edited.
- **Media tab:** [src/pages/dashboard/components/MediaPanel.tsx](src/pages/dashboard/components/MediaPanel.tsx)
  (~1,700 lines) — upload/replace/delete/reorder images per page section,
  bulk operations, captions, "wide" flag for layout.
- **Text tab:** [src/pages/dashboard/components/TextPanel.tsx](src/pages/dashboard/components/TextPanel.tsx)
  — edit every headline/paragraph/CTA/stat on the site inline, grouped by page
  and section.

**Login credentials (hardcoded, client-side only):** `admin`/`admin` or
`sonic`/`sonic2026`. This is **not secure** — it only gates the UI, not any
data access (Supabase calls use a public anon key). Acceptable for a low-stakes
internal content tool, but flag this to the user if the new version has any
sensitivity concerns.

---

## 2. Media Store — Supabase-backed image sync

**File:** [src/lib/mediaStore.ts](src/lib/mediaStore.ts) (~2,400 lines) — the
core data layer behind the media dashboard and every image displayed on the
site.

How it works:
- All site images are organized into **named sections** (e.g. `home_hero_stats`,
  `losungen_hero_backgrounds`) grouped under **page groups** (`PAGE_GROUPS`
  constant — home, losungen, leistungen, etc.). Components read their images
  via `useMediaStore(sectionKey)`.
- **Three-layer resolution** for each section's images, freshest wins:
  1. `localStorage` (this browser's local edits — always wins, so a save is
     never overwritten by a stale server pull)
  2. Supabase (`sonic_media_overrides` table or similar — pushed/pulled via
     `pushOverridesToSupabase` / `pullOverridesFromSupabase`)
  3. Built-in defaults from [src/mocks/imagesManifest.json](src/mocks/imagesManifest.json)
     (auto-generated — see §3)
- **Uploaded files** are stored in a Supabase Storage bucket named `media` and
  referenced in data as `__storage__:<path>` (the `STORAGE_PREFIX` constant).
  `resolveImageUrl()` turns that into a URL that hits the `media-proxy` edge
  function (§below), which mints a fresh signed URL server-side — this avoids
  ever baking a short-lived signed URL into client state. Legacy raw Supabase
  signed URLs are auto-migrated to this proxy format on read.
- A cache-busting `?t=` timestamp is appended for images uploaded earlier in
  the current browser session, so the browser doesn't serve a stale cached
  response right after upload.
- `useMediaStore()` is a React hook (`useSyncExternalStore`-based) that
  components call to reactively read a section's current images.

**Supabase edge function:** [supabase/functions/media-proxy/index.ts](supabase/functions/media-proxy/index.ts)
— Deno edge function. Takes `?path=`, uses the **service role key** (server
-side only) to mint a 7-day signed URL against the `media` storage bucket, and
302-redirects to it with `Cache-Control: public, max-age=3600, s-maxage=86400`.
This is what makes uploaded images have stable, permanently-linkable URLs
instead of expiring signed URLs.

**Client setup:** [src/lib/supabase.ts](src/lib/supabase.ts) — thin wrapper
around `createClient`, reading `VITE_PUBLIC_SUPABASE_URL` and
`VITE_PUBLIC_SUPABASE_ANON_KEY` from env.

**Client-side upload compression:** [src/lib/imageCompress.ts](src/lib/imageCompress.ts)
— resizes/re-encodes images in-browser before upload (caps longest edge at
1920px, quality 0.8) so the dashboard never pushes multi-MB camera-original
files to storage.

### Porting checklist for this subsystem
- Needs a Supabase project with: a `media` storage bucket, whatever table
  mediaStore.ts uses for overrides (`sonic_media_overrides` — confirm exact
  name/schema by reading the push/pull functions), and the `media-proxy` edge
  function deployed with `SUPABASE_SERVICE_ROLE_KEY` set.
- Needs `VITE_PUBLIC_SUPABASE_URL` / `VITE_PUBLIC_SUPABASE_ANON_KEY` env vars
  in the new project.
- `PAGE_GROUPS` and default section keys are tightly coupled to this
  project's actual page structure — if the new version's pages differ, this
  list needs to be re-derived, not copied blindly.

---

## 3. Text Store — inline-editable site copy

**File:** [src/lib/textStore.ts](src/lib/textStore.ts) (~1,500 lines) — same
pattern as the media store, but for text content.

- `DEFAULT_TEXT_SECTIONS`: every editable heading/paragraph/CTA/stat on the
  site, hand-extracted from the actual page components into structured
  `TextEntry` objects (`id`, `label`, `type`, `value`), grouped into
  `TextSection`s under `TEXT_PAGE_GROUPS` (home, losungen, leistungen, about,
  case_studies, blog, careers, kontakt, team, industries, jobs, ratgeber, srt,
  common).
- Persistence: `localStorage` (`STORAGE_KEY`), with edits dispatched as a
  `text-store-update` window event.
- **Read hook:** [src/hooks/useText.ts](src/hooks/useText.ts) — `useText(sectionKey, entryId, fallback)`,
  `useTextSection(sectionKey)`, `useTextMany(pairs)`. Built on
  `useSyncExternalStore` with an in-memory cache invalidated by the
  `text-store-update` event, so every component using these hooks re-renders
  live when an edit is saved in the dashboard.

**To port:** every page component across the site was rewritten to pull its
copy through `useText(...)` instead of hardcoded JSX strings. This is the
single biggest source of line-diff noise in the commit history — when
re-applying to a new version, the mechanical part (copy `textStore.ts` +
`useText.ts`) is easy; wiring every component to call `useText()` with the
right section/entry IDs instead of literal strings is the actual work and
needs to be redone per component if the new version's components differ.

---

## 4. Image Pipeline & Asset Tooling

Three standalone Node scripts, run outside the Vite build:

- **[generate_manifest.cjs](generate_manifest.cjs)** (also duplicated as
  `.js`) — walks `public/images` recursively, and writes
  `src/mocks/imagesManifest.json`: one entry per folder containing images,
  with a human-readable label and a list of `{url, caption, wide}` per image
  (caption derived from filename, stripping `" Kopie"` / `" Schwarz Weiß"`
  suffixes left over from the source asset export). Wired into
  `package.json` as a `prebuild` script, so it always runs before `vite build`
  and stays in sync with whatever is actually in `public/images`.
- **[optimize_images.cjs](optimize_images.cjs)** — one-time/on-demand pass
  over `public/images` using `sharp`: any file over 300KB gets resized to a
  1920px longest edge and re-encoded at quality 80 (mirrors what
  `imageCompress.ts` does for fresh dashboard uploads, but applied
  retroactively to the pre-existing asset library, much of which was raw,
  unoptimized camera exports). Safe to re-run — already-small files are
  skipped. Has a Windows-specific fix (`sharp.cache(false)`) for a file-handle
  leak that otherwise blocks overwriting the source file mid-batch.
- **[check_images.js](check_images.js)** / **[check_images.ps1](check_images.ps1)**
  — verification scripts (Node and PowerShell versions) that check images
  referenced in code/manifest actually exist on disk (or similar consistency
  check — confirm exact behavior by reading the script if reusing).

**To port:** these three scripts are self-contained and can be copied
directly into a new project version as long as it keeps a `public/images` +
`src/mocks/imagesManifest.json` structure. Re-add the `prebuild` line to
`package.json`.

---

## 5. New Content Section: Ratgeber (knowledge hub)

A full 25-article marketing knowledge-base section was added, entirely new:

- **Hub page:** [src/pages/ratgeber/page.tsx](src/pages/ratgeber/page.tsx) at
  route `/ratgeber`.
- **Shared components** (`src/pages/ratgeber/components/`): `RatgeberPage`
  (article page shell), `RatgeberHero`, `RatgeberContent`, `RatgeberFAQ`,
  `RatgeberAnswerFirst`, `RatgeberGeoContext`, `RatgeberCTA`,
  `RatgeberCrossLinks`, `RatgeberInternalLinks` — one reusable template driving
  all 25 articles from data, not 25 hand-built pages.
- **Data files** (`src/pages/ratgeber/data/*.ts`): one file per article
  (`erlebnismarketing.ts`, `messe-eventmarketing.ts`, `mystery-shopping.ts`,
  `guerilla-marketing.ts`, `live-shopping.ts`, `trade-marketing.ts`, etc. — 25
  total) plus `types.ts` (shared shape) and `hub-cards.ts` (index/teaser data
  for the hub page grid).
- **Routes:** one route per article registered in
  [src/router/config.tsx](src/router/config.tsx) (`/ratgeber/<slug>`), each a
  thin `page.tsx` that imports `RatgeberPage` + its data file.

This whole section is SEO/content-marketing infrastructure (answer-first
content blocks, FAQ schema, geo context, cross-links) aimed at organic search
for DACH marketing-agency search terms.

**To port:** this is additive and self-contained — copy the entire
`src/pages/ratgeber/` directory and the corresponding route block from
`router/config.tsx` wholesale into the new version.

---

## 6. Routing & URL structure changes

[src/router/config.tsx](src/router/config.tsx):

- **Legacy English routes converted to German with redirects**, so old links
  keep working:
  - `/about` → redirects to `/ueber-uns`
  - `/careers` → redirects to `/karriere`
  - `/case-studies` → redirects to `/fallbeispiele`
  - `/case-studies/:slug` → redirects to `/fallbeispiele/:slug`
- **New:** `/dashboard`, `/login` → `/dashboard`, `/auth` → `/dashboard`,
  `/media-dashboard` → `/dashboard`.
- **Removed page routes** (and their page/component files deleted):
  - `/services/content-studio`, `/services/events`, `/services/market-entry`,
    `/services/retail-pos`, `/services/staffing` — an entire parallel
    "services" section, superseded by the `leistungen/` section.
  - `/lvp` and all its components (`LVPHero`, `PromoCalculator`,
    `StudioCapabilities`, etc.) — the standalone LVP (Live Video Promotion)
    landing page was removed (LVP content now lives inside `leistungen/video`).
  - `case-studies/samsung` and `case-studies/groupe-seb` — hand-built,
    one-off case study pages superseded by the generic
    `case-studies/detail/page.tsx` driven by data.
  - `careers/sonic-sales` and `careers/sonic-staff` sub-pages.

**To port:** if the new version still has the old `/services/*` or `/lvp`
pages, decide with the user whether to remove them (matching this decision)
or keep them — don't delete blindly, confirm the new version's content intent
first since this is a content decision, not just a technical port.

---

## 7. Page-level rebuilds

Several pages had their component composition substantially reworked (old
components deleted, new ones added — not just edited):

- **Home** (`src/pages/home/`): dropped ~15 alternate/experimental section
  components (`Hero`, `HeroAmbient`, `Showcase`, `DualCTA`, `DualAudienceCTA`,
  `SonicPulseCanvas`, `SonicKineticTopography`, `ProblemQuiz`, `PhygitalReality`,
  `PhilosophySection`, `OfficeVisit`, `DanSection`, `DarumSonic`, `SonicDNA`,
  `ClientSuccess`, `ConsultationCTA`, `AudienceSelector`, `Attitude`,
  `VirtualTour`, `BrandIntro`) in favor of the current lineup led by
  `HeroRevamp` and the new `ScrollCardSection`
  ([src/components/feature/ScrollCardSection.tsx](src/components/feature/ScrollCardSection.tsx)).
  This reads as design consolidation — many were likely A/B variants that lost.
- **Careers** (`src/pages/careers/`): replaced `SonicFaces`, `OfficeTour`,
  `OpenPositions`, `PerksAndBenefits`/`PerksSection`, `RecruiterCTA`,
  `HowWeHire`, `MitarbeiterStimmen`, `DreamTeamEvents`, `GeschichtenSection`,
  `SalesPromo101`, `StellenangeboteSection` with a smaller, more focused set
  including two new components: `KarriereAwards`, `KarriereJobs`.
- **Sonic Reels** (`src/pages/sonic-reels/`): replaced the single
  `PhotoAlbum.tsx` (1,400+ lines) and `EraNav.tsx` with a decomposed set:
  `CoverflowFilmstrip`, `PhotoLightbox`, `PhotoSelector`, `SonicReelsTimeline`,
  `FilmEdge` — same feature (browsable photo history by era), rebuilt as
  smaller focused components.
- **SRT** (`src/pages/srt/`): merged `GetAccess`, `HowItWorks`, `Pricing`
  into one `PricingAndAccess.tsx` component.
- Two shared components were removed as unused: `IndustryLeaders`,
  `SectionNavigator`, `ServiceDualCTA` (in `src/components/feature/`).
- Two shared components were added: `LimeBadge`, `LimeWaveDivider` (in
  `src/components/base/`).

**To port:** these are content/design decisions specific to this exact
codebase's history of experiments — don't replay them mechanically against a
different version unless the new version has the same starting set of
components. Use this list to recognize "was this deleted deliberately" if a
component is missing when diffing against the new upload.

---

## 8. Design system overhaul (OKLCH color tokens)

- **[tailwind.config.ts](tailwind.config.ts):** replaced the old flat
  hardcoded hex palette (`sonic-dark`, `sonic-gray`, `sonic-lime`, etc.) with
  a full 11-step (50–950) OKLCH-based scale for five semantic color families:
  `background`, `accent`, `primary` (brand lime), `secondary`, `foreground`.
  Each Tailwind color reads from a CSS custom property via
  `oklch(var(--x-500) / <alpha-value>)`, so opacity modifiers (`bg-primary-500/20`)
  work correctly. Also added `text-3xs` / `text-2xs` font sizes.
- **[src/index.css](src/index.css):** defines all the `--background-*`,
  `--accent-*`, `--primary-*`, `--secondary-*`, `--foreground-*` OKLCH values
  under `:root`, plus `--font-heading`/`--font-body`/`--font-label` variables.
  Added Playfair Display as a second Google Font (alongside Montserrat).
  `scroll-padding-top: 80px` added so anchor-link navigation doesn't hide
  under the fixed header.
- Every component using the old `sonic-lime`/`sonic-dark`/etc. class names
  was migrated to the new `primary-*`/`foreground-*`/`background-*` scale
  (visible in `App.tsx`'s `bg-sonic-lime` → `bg-primary-500` change, and
  repeated across nearly every page file in the diff).

**To port:** copy the `tailwind.config.ts` color block and `index.css`
`:root` variables directly — they're a self-contained token system. Applying
the resulting class renames across the new version's components is
mechanical find/replace per old→new class name pair, but only where the new
version still uses the old `sonic-*` naming.

---

## 9. SEO, meta tags, and hosting config

- **[index.html](index.html):** real favicon (was a placeholder Vite SVG),
  `viewport-fit=cover` for notched devices, precise `geo.position` (Krefeld
  coordinates), `preconnect`/`dns-prefetch` hints for `cdn.brandfetch.io`,
  `sonic-group.de`, and `readdy.ai`/`public.readdy.ai`, OG/Twitter image tags
  pointing at a generated share-card image, removed a placeholder Font
  Awesome kit `<script>` tag that had a fake kit ID (`your-kit-id`) left over
  from a template.
- **[public/.htaccess](public/.htaccess):** added — Apache rewrite rules so
  every non-file, non-directory request falls through to `index.html` (SPA
  client-side routing support on Apache/IONOS-style hosting, where this
  wasn't previously configured).
- **[public/sitemap.xml](public/sitemap.xml):** regenerated to include all
  current routes (325+ lines changed) — needs regenerating again for the new
  version's actual route list, not copied verbatim.
- **public/feed.json:** removed (unused).
- **`.github/workflows/deploy-to-ionos.yaml`:** added in an earlier commit,
  then removed in a later one in this same workspace — net effect is **no**
  CI/CD workflow currently in the repo. Worth confirming with the user
  whether they still want IONOS Deploy Now wired up, since it was explicitly
  reverted rather than left in place.

---

## 10. App shell & misc

- **[src/App.tsx](src/App.tsx):** split into `AppLayout` (aware of
  `/dashboard` to conditionally hide `Navigation`/`Footer` and swap
  background) + outer `App` (just the `BrowserRouter`). Page-transition
  timing tightened (300ms → 150ms fade, 20ms → 10ms scroll-reset delay) for a
  snappier feel.
- **[package.json](package.json):** removed a redundant direct `@swc/core`
  dependency (already pulled in transitively via `@vitejs/plugin-react-swc`);
  added `"prebuild": "node generate_manifest.cjs"`.
- **i18n:** added [src/i18n/local/de/common.ts](src/i18n/local/de/common.ts)
  and touched [src/i18n/index.ts](src/i18n/index.ts) — confirm current i18n
  setup by reading these before assuming scope, this was a smaller change
  than the rest.

---

## Known limitations / things to flag when porting

1. **Dashboard auth is not real security** — hardcoded credentials, client
   -side only, gates the UI but not the underlying Supabase writes (anon key
   is public). Fine for an internal low-stakes tool; call this out explicitly
   if the new version's owner assumes it's secure.
2. **mediaStore.ts / textStore.ts are tightly coupled to this exact page
   structure** (section keys, page groups). They are *not* a drop-in generic
   CMS — porting them means re-deriving the section/entry list from the new
   version's actual components, not copy-pasting the defaults.
3. **Supabase project dependency** — the media sync and edge function require
   a live Supabase project with matching bucket/table/function names and env
   vars. None of that infra is in this repo; it lives in the Supabase project
   the site is bound to.

---

## Suggested porting workflow for a new project upload

1. Diff the new upload against this repo's `11867b2` (initial commit) to see
   how much the *base template* itself has drifted, separately from the
   customizations listed above.
2. Copy wholesale (additive, low risk): `src/lib/mediaStore.ts`,
   `src/lib/textStore.ts`, `src/lib/supabase.ts`, `src/lib/imageCompress.ts`,
   `src/hooks/useText.ts`, `src/pages/dashboard/`, `src/pages/ratgeber/`,
   `supabase/functions/media-proxy/`, the three image-pipeline scripts,
   `public/.htaccess`.
3. Re-apply by pattern, not copy (structural, needs adaptation): the
   `tailwind.config.ts` / `index.css` token system, the German-URL routing
   redirects, the `App.tsx` dashboard-aware layout split.
4. Re-derive per new component tree (real work, not mechanical): wiring page
   components to `useText()`/`useMediaStore()` instead of hardcoded content,
   and deciding which of the deleted legacy pages/components should also be
   removed from the new version.
5. Regenerate rather than copy: `imagesManifest.json` (run
   `generate_manifest.cjs` against the new version's `public/images`) and
   `sitemap.xml`.
