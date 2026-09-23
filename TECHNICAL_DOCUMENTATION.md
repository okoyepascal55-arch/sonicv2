# Sonic Group Platform — Master Technical Documentation & Architecture Specification

> **Document Version:** 2.0  
> **Target Audience:** Engineering Leads, Software Architects, Full-Stack Developers, DevOps Engineers, and System Administrators  
> **Organization:** Sonic Group GmbH (Krefeld, Germany)  
> **Project Scope:** Corporate Digital Experience, In-Browser CMS, Interactive Simulation Engines, Dynamic Asset Pipelines, and SEO Knowledge Infrastructure  

---

## Table of Contents

1. [Executive Summary & System Overview](#1-executive-summary--system-overview)
2. [Technology Stack & Dependency Breakdown](#2-technology-stack--dependency-breakdown)
3. [High-Level Architecture & Data Flow](#3-high-level-architecture--data-flow)
4. [Reactive State Layer (Zero-Dependency CMS Store)](#4-reactive-state-layer-zero-dependency-cms-store)
   - 4.1. Media Store Subsystem (`mediaStore.ts`)
   - 4.2. Text Store Subsystem (`textStore.ts`)
   - 4.3. Multi-Layer Resolution Strategy
   - 4.4. Event-Driven Cache Invalidation
5. [In-Browser CMS & Dashboard Architecture (`/dashboard`)](#5-in-browser-cms--dashboard-architecture-dashboard)
   - 5.1. Dashboard Access Gate & Layout Splitting
   - 5.2. Media Management Panel (`MediaPanel.tsx`)
   - 5.3. Text Copy Management Panel (`TextPanel.tsx`)
   - 5.4. Client-Side Image Compression Pipeline (`imageCompress.ts`)
6. [Design System & Visual Engineering](#6-design-system--visual-engineering)
   - 6.1. OKLCH Perceptual Color Space
   - 6.2. The Zero-Radius Architecture (0px Strict Geometry)
   - 6.3. Skeuomorphic Inset Depth & Contrast Philosophy
   - 6.4. Atomic Component Library (`src/components/base/`)
7. [Interactive Visual Subsystems & Simulation Engines](#7-interactive-visual-subsystems--simulation-engines)
   - 7.1. Liquid Glass Topology Field (`FooterTopologyField.tsx`)
   - 7.2. Sonic Reels Filmstrip & Timeline Engine (`src/pages/sonic-reels/`)
   - 7.3. Sonic Reporting Tool (SRT) Telemetry Suite (`src/pages/srt/`)
8. [Routing Matrix & Page Specifications](#8-routing-matrix--page-specifications)
   - 8.1. Route Definition & Chunk Splitting
   - 8.2. Core Page Views
   - 8.3. Solutions & Services Subsystems (`/losungen`, `/leistungen/*`)
   - 8.4. Legacy Route Aliasing & Canonical Redirection
9. [Knowledge Engine & SEO Topical Authority (`/ratgeber`)](#9-knowledge-engine--seo-topical-authority-ratgeber)
   - 9.1. Architectural Strategy & Answer-First Content Model
   - 9.2. Geo-Context DACH Localization
   - 9.3. 25-Cluster Thematic Data Schema
   - 9.4. Automated FAQ & Schema.org JSON-LD Generation
10. [Backend, Database Schema & Edge Infrastructure](#10-backend-database-schema--edge-infrastructure)
    - 10.1. Supabase PostgreSQL Schema & Migrations
    - 10.2. Row Level Security (RLS) Policies
    - 10.3. Storage Bucket Configuration
    - 10.4. Deno Edge Function Proxy (`media-proxy`)
    - 10.5. Contact & Lead Capture Architecture (`contact.ts`)
11. [Asset Optimization & Build Pipeline](#11-asset-optimization--build-pipeline)
    - 11.1. Automated Manifest Generation (`generate_manifest.cjs`)
    - 11.2. Sharp Batch Image Optimization (`optimize_images.cjs`)
    - 11.3. Asset Integrity Verification (`check_images.js`)
    - 11.4. Vite Bundler & SWC Compiler Configuration
12. [Security, Performance, & Hosting Configuration](#12-security-performance--hosting-configuration)
    - 12.1. Security Architecture & Threat Model
    - 12.2. Performance Optimization Matrix
    - 12.3. Server Deployment Rules (Apache `.htaccess` & Vercel `vercel.json`)

---

# 1. Executive Summary & System Overview

The **Sonic Group Platform** is an enterprise-scale web application serving as the primary digital touchpoint for **Sonic Group GmbH** — a premier agency headquartered in Krefeld, Germany, specializing in retail promotion, field marketing, talent-as-a-service, live video streaming commerce, and real-time field data reporting (SRT) throughout Germany, Austria, and Switzerland (DACH).

### Core Architectural Objectives
1. **Uncompromising Visual Identity**: Built on a strict "Zero-Radius" manifesto with an 11-step OKLCH color token system, custom tactile skeuomorphism, and high-contrast editorial typography.
2. **Autonomous Content Editing**: A decoupled, zero-dependency in-browser CMS (`/dashboard`) allowing non-technical marketing staff to modify site copy and media across all pages with live multi-client synchronization.
3. **Advanced Mathematical & Physics Canvases**: 60 FPS fluid simulation canvas rendering interactive liquid-glass waves, mouse-trail wake physics, optical depth-of-field, and procedural lighting.
4. **Organic Search Engine Supremacy**: A programmatic 25-cluster knowledge hub (*Ratgeber*) engineered for Answer-First query answering, localized regional authority, and structured Schema.org microdata.

```
                    ┌──────────────────────────────────────────────┐
                    │               CLIENT PLATFORM                │
                    │        Vite 7 + React 19 + TypeScript        │
                    └──────────────────────┬───────────────────────┘
                                           │
             ┌─────────────────────────────┼─────────────────────────────┐
             ▼                             ▼                             ▼
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│     PRESENTATION LAYER    │ │    REACTIVE DATA LAYER    │ │   INTERACTIVE SIMULATION  │
│ • Zero-Radius OKLCH Theme │ │ • useSyncExternalStore    │ │ • Liquid Glass Wave Canvas│
│ • Editorial Typography    │ │ • In-Memory Cache Matrix  │ │ • 3D Coverflow Filmstrip  │
│ • 35+ Lazy-Loaded Routes  │ │ • LocalStorage Sync       │ │ • Live POS Telemetry Mock │
└───────────────────────────┘ └─────────────┬─────────────┘ └───────────────────────────┘
                                            │
                                            ▼
                    ┌──────────────────────────────────────────────┐
                    │           SUPABASE CLOUD SERVICES            │
                    │ • PostgreSQL JSONB Storage Table (media_store│
                    │ • Private Storage Bucket ('media')          │
                    │ • Deno Edge Function (media-proxy)          │
                    └──────────────────────────────────────────────┘
```

---

# 2. Technology Stack & Dependency Breakdown

### 2.1 Core Dependencies (`package.json`)

| Package | Version | Layer / Purpose | Justification & Architectural Role |
| :--- | :--- | :--- | :--- |
| `react` | `^19.1.0` | Frontend Framework | Latest React engine utilizing concurrent rendering primitives and transition optimization. |
| `react-dom` | `^19.1.0` | DOM Renderer | Browser rendering target for React 19. |
| `typescript` | `~5.8.3` | Programming Language | Strict typing across state models, component props, and API contracts. |
| `vite` | `^7.0.3` | Build System / Bundler | Next-generation ESM bundler providing near-instant HMR and optimized chunking. |
| `@vitejs/plugin-react-swc` | `^3.10.2` | Fast Compiler | Speedy Web Compiler (SWC) replacing Babel for ultra-fast transpilation. |
| `tailwindcss` | `^3.4.17` | Utility CSS Framework | Configured with custom OKLCH color palettes, zero-radius utility classes, and custom easing functions. |
| `react-router-dom` | `^7.6.3` | Client-Side Routing | Declarative routing with code splitting, nested route hierarchies, and navigation lifecycle handlers. |
| `@supabase/supabase-js` | `2.57.4` | Backend SDK | Supabase client for database persistence, storage bucket uploads, and edge function execution. |
| `three` | `0.179.1` | 3D Graphics Engine | WebGL rendering library for complex geometric structures. |
| `@react-three/fiber` | `9.3.0` | React Three Reconciler | Declarative React wrapper for Three.js scene graphs. |
| `@react-three/drei` | `10.6.1` | 3D Helpers | Component library for camera management, loaders, and procedural environment maps. |
| `recharts` | `3.2.0` | Analytics Charts | Declarative SVG charting library for business metrics and reporting graphs. |
| `i18next` / `react-i18next` | `25.4.1` / `^15.6.0` | Internationalization | Modular localization framework supporting German-first regionalization. |
| `lucide-react` | `0.539.0` | Iconography | High-fidelity SVG icon library. |
| `sharp` | `^0.33.x` | Asset Processing Tool | High-performance C-based image processor used in standalone optimization scripts. |

---

# 3. High-Level Architecture & Data Flow

The platform separates **Content Definition**, **State Persistence**, and **Client View Rendering** into decoupled tiers:

```
[Public Visitor / Admin User]
              │
              ▼
   ┌───────────────────────┐
   │ React 19 View Engine  │ ◄───────┐
   └──────────┬────────────┘         │
              │                      │
   useText()  │  useMediaStore()     │ Event Bus Notifications
              ▼                      │ ('text-store-update' /
   ┌───────────────────────┐         │  'media-store-update')
   │   Reactive Stores     ├─────────┘
   │ (textStore/mediaStore)│
   └──────────┬────────────┘
              │
      Multi-Tier Fallback
              │
   ┌──────────┴────────────────────────────────┐
   │                                           │
   ▼                                           ▼
┌──────────────────────┐             ┌──────────────────────┐
│  Tier 1: LocalStorage│             │ Tier 2: Supabase DB  │
│  (Instant Client Win)│             │ (media_store table)  │
└──────────────────────┘             └──────────┬───────────┘
                                                │
                                                ▼
                                     ┌──────────────────────┐
                                     │ Tier 3: Manifest JSON│
                                     │ (Built-in Fallbacks) │
                                     └──────────────────────┘
```

### Data Pipeline Sequence
1. **Component Invocation**: Components request copy via `useText(sectionKey, entryId, fallback)` and images via `useMediaStore(sectionKey)`.
2. **In-Memory Cache Check**: Rapid lookup within memoized record maps.
3. **Local Overrides Check**: Inspects `localStorage` for uncommitted or browser-specific edits.
4. **Cloud Database Hydration**: On application initialization, `pullOverridesFromSupabase()` loads the latest overrides from PostgreSQL table `public.media_store` and merges them without overwriting newer local edits.
5. **Image URL Resolution**: Image tokens tagged with `__storage__:<path>` pass through `resolveImageUrl()`, which dynamically routes to the Deno edge function `media-proxy`.

---

# 4. Reactive State Layer (Zero-Dependency CMS Store)

Instead of relying on heavy external state management libraries, the platform implements a specialized **reactive pub/sub storage system** built on native browser events and `useSyncExternalStore`.

### 4.1 Media Store Subsystem (`src/lib/mediaStore.ts`)

```typescript
export interface MediaItem {
  url: string;
  caption: string;
  wide?: boolean;
}

export type MediaSections = {
  [key: string]: MediaItem[];
};
```

- **Permanent URL Architecture (`STORAGE_PREFIX = '__storage__:'`)**:
  Uploaded images are never stored with temporary signed URLs. Instead, they are stored with a permanent path token: `__storage__:dashboard/filename.webp`.
- **Dynamic Proxy Resolution (`resolveImageUrl`)**:
  ```typescript
  export function resolveImageUrl(rawUrl: string): string {
    if (!rawUrl) return rawUrl;
    if (rawUrl.startsWith(STORAGE_PREFIX)) {
      const path = rawUrl.slice(STORAGE_PREFIX.length);
      const supabaseUrl = (import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
      if (!supabaseUrl) return rawUrl;
      return `${supabaseUrl}/functions/v1/media-proxy?path=${encodeURIComponent(path)}`;
    }
    return rawUrl;
  }
  ```

### 4.2 Text Store Subsystem (`src/lib/textStore.ts`)

```typescript
export interface TextEntry {
  id: string;
  label: string;
  description: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'label' | 'cta' | 
        'badge' | 'stat' | 'stat-label' | 'link' | 'list-item' | 
        'quote' | 'caption' | 'tag' | 'nav-label' | 'footer-heading' | 'footer-link';
  value: string;
  multiline?: boolean;
}

export interface TextSection {
  key: string;
  label: string;
  pageGroupId: string;
  pagePath: string;
  description: string;
  entries: TextEntry[];
}
```

The master text catalog indexes over **1,460 distinct entries** grouped across 14 operational page groups: `home`, `losungen`, `leistungen`, `about`, `case_studies`, `blog`, `careers`, `kontakt`, `team`, `industries`, `jobs`, `ratgeber`, `srt`, and `common`.

### 4.3 Multi-Layer Resolution Strategy
1. **Layer 1 (LocalStorage)**: Captures immediate draft changes.
2. **Layer 2 (Supabase JSONB)**: Propagates confirmed changes across all client instances.
3. **Layer 3 (Static Code Defaults)**: Fallback declared in `DEFAULT_TEXT_SECTIONS` and `imagesManifest.json`.

### 4.4 Event-Driven Cache Invalidation
When an edit occurs in `/dashboard`:
```typescript
localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStore));
invalidateCache();
window.dispatchEvent(new Event('text-store-update')); // or 'media-store-update'
```
Subscribed hooks (`useText`, `useMediaStore`) trigger an instant re-render across active components.

---

# 5. In-Browser CMS & Dashboard Architecture (`/dashboard`)

The dashboard located at [`src/pages/dashboard/page.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/dashboard/page.tsx) provides a full headless content management interface without requiring external SaaS solutions.

```
Dashboard Component Layout
├── AppLayout (App.tsx detects /dashboard, unmounts public Navigation/Footer)
└── DashboardPage (src/pages/dashboard/page.tsx)
    ├── Session Gate (sessionStorage 'sonic_admin_auth')
    ├── Topbar (Live Stat Counters, Sync Indicators, Global Reset, Logout)
    ├── Main Grid (2-Column Studio Interface)
    │   ├── Sidebar (src/pages/dashboard/components/Sidebar.tsx)
    │   │   └── 14 Page Group Filters (Home, Lösungen, Leistungen, etc.)
    │   └── Content Workspace
    │       ├── Tab 1: Medien Panel (MediaPanel.tsx)
    │       └── Tab 2: Text Copy Panel (TextPanel.tsx)
```

### 5.1 Dashboard Access Gate & Layout Splitting
- **Layout Isolation**: In `App.tsx`, the application checks `location.pathname === '/dashboard'`. When true, the site's public `Navigation` and `Footer` are unmounted, switching to a dark full-height workspace (`bg-foreground-950`).
- **Session Authentication**: Gated via a client-side session flag (`sessionStorage.getItem('sonic_admin_auth')`).

### 5.2 Media Management Panel (`MediaPanel.tsx`)
- **Drag-and-Drop Reordering**: Native HTML5 drag-and-drop mechanics (`onDragStart`, `onDragOver`, `onDrop`) to visually rearrange image orders within sections.
- **Aspect Ratio Control**: Toggle `wide` flag per image for grid span adjustments.
- **Bulk Operations**: Bulk selection, deletion, and uploading with multi-file drop zones.
- **Direct Cloud Upload**: Uploads compressed images directly into Supabase Storage under `dashboard/<timestamp>_<filename>.webp`.

### 5.3 Text Copy Management Panel (`TextPanel.tsx`)
- **Visual Type Encoding**: Color-coded borders and icons according to field types (`heading` = amber, `paragraph` = blue, `cta` = lime, `stat` = emerald, `quote` = rose).
- **Inline Editing**: Live textarea and input fields with keyboard hotkeys (`Enter` to save, `Escape` to cancel).
- **Search & Filter**: Real-time filtering across sections, labels, and text values.

### 5.4 Client-Side Image Compression Pipeline (`src/lib/imageCompress.ts`)
To prevent large camera exports from degrading page load performance, all uploads pass through an in-browser compression pipeline:
1. **Pass-Through Filtering**: SVGs and files smaller than `200 KB` bypass compression.
2. **Dimension Capping**: Images with width or height exceeding `1920px` are downscaled proportionally.
3. **Canvas Re-Encoding**: Rendered into an offscreen `<canvas>` and exported as `image/webp` at `0.8` quality.

```typescript
const MAX_DIMENSION = 1920;
const QUALITY = 0.8;
const MIN_COMPRESS_SIZE = 200 * 1024;
```

---

# 6. Design System & Visual Engineering

The design system is documented in [`DESIGN_SYSTEM_MANIFESTO.md`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/DESIGN_SYSTEM_MANIFESTO.md) and encoded in [`tailwind.config.ts`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/tailwind.config.ts) and [`src/index.css`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/index.css).

### 6.1 OKLCH Perceptual Color Space
The platform uses the **OKLCH** color model to guarantee uniform perceptual lightness and chroma across all display technologies:

```css
:root {
  /* Primary Brand Lime (OKLCH lightness, chroma, hue) */
  --primary-50: 0.97 0.04 115;
  --primary-500: 0.81 0.19 115; /* Canonical Brand Accent #C8D400 */
  --primary-950: 0.16 0.05 115;

  /* Neutral Background Scale */
  --background-50: 1 0 0;        /* Pure White #FFFFFF */
  --background-950: 0.175 0 0;    /* Dark Charcoal */

  /* Neutral Foreground Scale */
  --foreground-50: 0.96 0.002 260;
  --foreground-950: 0.06 0.001 260;/* Deep Contrast Black */

  /* Accent Amber/Gold Scale */
  --accent-500: 0.68 0.22 70;

  /* Secondary Warm Beige Scale */
  --secondary-500: 0.59 0.05 78;
}
```

### 6.2 The Zero-Radius Architecture (0px Strict Geometry)
- **Rule**: All elements across cards, buttons, badges, modals, form inputs, and image containers must feature **0px border radius** (`rounded-none` / `border-radius: 0`).
- **Rationale**: Evokes industrial precision, speed, and German engineering rigor, deliberately departing from generic rounded software aesthetics.

### 6.3 Skeuomorphic Inset Depth & Contrast Philosophy
- **Prohibition of Fuzzy Drop Shadows**: Standard box-shadows (`box-shadow: 0 10px 25px rgba(0,0,0,0.15)`) are prohibited.
- **Embossed & Inset Lighting**: Depth is created using 1px high-contrast internal highlights and debossed borders:
  ```css
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  ```

### 6.4 Atomic Component Library (`src/components/base/`)
- [`WoodenButton.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/components/base/WoodenButton.tsx): Tactile high-impact CTA button with beveled edges and active press states.
- [`WoodenCard.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/components/base/WoodenCard.tsx): Sharp-cornered container with custom wood-texture grain overlays and double borders.
- [`PhoneFrame.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/components/base/PhoneFrame.tsx): Ultra-realistic device simulation with dynamic speaker notches and status bars for live video previews.
- [`SectionBadge.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/components/base/SectionBadge.tsx): Monospace-styled section label with lime accent indicator.
- [`Lightbox.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/components/base/Lightbox.tsx): Full-viewport media inspection modal with keyboard navigation.

---

# 7. Interactive Visual Subsystems & Simulation Engines

### 7.1 Liquid Glass Topology Field (`src/components/feature/FooterTopologyField.tsx`)
Rendered within a full-width HTML5 canvas element at the base of every page view, this engine executes real-time 2D fluid simulation:

```
Fluid Dynamics Architecture
├── 9 Synthesized Wave Layers (varying freq, amp, speed, phase, depth)
├── Interactive Cursor Physics
│   ├── Mouse Ripple Generation (expanding wave fronts)
│   ├── Velocity Wake Trails (continuous disturbance paths)
│   └── Splash Particle Emitter (decaying kinetic droplets)
├── Autonomous Raindrop Simulator (stochastic surface ripples)
├── Color Shift Engine (Iridescent Lime-Teal Chromatic Dispersion)
└── Performance Optimization Grid (Sparse 35x18 Displacement Sampler)
```

- **Wave Synthesis Formula**:
  $$y(x, t) = \text{baseY} + \sum_{i=1}^{9} A_i \cdot \sin(k_i x + \omega_i t + \phi_i) + \text{Displacement}(x)$$
- **Computational Optimization**: Instead of calculating per-pixel wave equations across the canvas resolution, a **sparse displacement lookup grid** (`DISP_GRID_COLS = 35`, `DISP_GRID_ROWS = 18`) samples physics vertices, reducing per-frame function evaluations from **~4,300 to ~630**.
- **Optical Depth-of-Field (DOF)**: Deep layers are rendered with reduced alpha transparency and thicker strokes, creating natural focal depth without expensive browser GPU blurs.

### 7.2 Sonic Reels Filmstrip & Timeline Engine (`src/pages/sonic-reels/`)
An interactive visual archive detailing the company's historical milestones:
- [`CoverflowFilmstrip.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/sonic-reels/components/CoverflowFilmstrip.tsx): 3D perspective carousel with touch inertia and click centering.
- [`SonicReelsTimeline.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/sonic-reels/components/SonicReelsTimeline.tsx): Scrubbable historical timeline linking discrete photographic eras (2007–2026).
- [`FilmEdge.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/sonic-reels/components/FilmEdge.tsx): Procedural 35mm film perforations bordering the viewport.

### 7.3 Sonic Reporting Tool (SRT) Telemetry Suite (`src/pages/srt/`)
An interactive product walkthrough simulating Sonic Group's proprietary field data engine:
- [`DataPaths.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/srt/components/DataPaths.tsx): Animated SVG telemetry paths demonstrating POS data ingestion.
- [`EmployeeApp.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/pages/srt/components/EmployeeApp.tsx): Interactive smartphone UI demonstrating field promoter check-ins, inventory audits, and sales logging.

---

# 8. Routing Matrix & Page Specifications

Routing is declared in [`src/router/config.tsx`](file:///c:/Users/TOUTENUN/Desktop/tuesday%20saga/src/router/config.tsx) using React Router DOM. All view components are lazily loaded with `React.lazy()` to maintain small initial bundle sizes.

### 8.1 Master Route Inventory

| Path | Component File | Key Subcomponents & Modules | Description |
| :--- | :--- | :--- | :--- |
| `/` | `src/pages/home/page.tsx` | `HeroRevamp`, `TrustStrip`, `ServicesGrid`, `LiveMetrics`, `SRTTeaser`, `QuizModal` | Main brand landing page with dynamic H1 keyword cycler and live metrics counters. |
| `/dashboard` | `src/pages/dashboard/page.tsx` | `Sidebar`, `MediaPanel`, `TextPanel` | In-browser Content Management System for live media and copy edits. |
| `/ueber-uns` | `src/pages/about/page.tsx` | `OriginStory`, `Timeline`, `ManagementVoices`, `LeadershipTeam`, `ValuesVisual` | Corporate heritage, executive team, agency values, and operational milestones. |
| `/karriere` | `src/pages/careers/page.tsx` | `KarriereHero`, `KarriereCulture`, `KarriereAwards`, `KarriereJobs`, `SonicFamily` | Employer branding portal, corporate benefits, and direct open job listings. |
| `/fallbeispiele` | `src/pages/case-studies/page.tsx` | `CaseStudiesGrid`, `ImpactMetrics`, `FeaturedCases` | Searchable archive of verified client campaign outcomes with metric cards. |
| `/industries` | `src/pages/industries/page.tsx` | `IndustryGrid`, `IndustryExpertise`, `IndustryCTA` | Sector-specific solutions for Consumer Electronics, FMCG, Telecom, and Retail. |
| `/team` | `src/pages/team/page.tsx` | `TeamStats`, `CoreValues`, `MeetTheTeam`, `TrainingDevelopment` | Comprehensive human resource philosophy, internal academy, and staff profiles. |
| `/losungen` | `src/pages/losungen/page.tsx` | Interactive Solutions Grid, Deliverables Matrix | Full-scope service matrix detailing 360-degree marketing execution. |
| `/kontakt` | `src/pages/kontakt/page.tsx` | `ContactForm`, `CalendlyWidget`, Location Map | Multi-channel contact hub with direct Web3Forms dispatch and calendar booking. |
| `/blog` | `src/pages/blog/page.tsx` | Blog Index, Category Filter | Editorial archive for market insights, case reviews, and retail trends. |
| `/blog/:id` | `src/pages/blog/detail/page.tsx` | Article Viewer, Dynamic Social Share | Deep-dive individual blog post template. |
| `/sonic-reels` | `src/pages/sonic-reels/page.tsx` | `CoverflowFilmstrip`, `SonicReelsTimeline` | Historical photographic archive and media browser. |
| `/srt` | `src/pages/srt/page.tsx` | `SRTHero`, `TheProblem`, `EmployeeApp`, `DataPaths`, `PricingAndAccess` | Proprietary Sonic Reporting Tool software presentation and feature matrix. |
| `/leistungen` | `src/pages/leistungen/page.tsx` | `ServiceGrid`, `LeistungenKontakt` | Overview of all 8 primary agency operational divisions. |
| `/leistungen/pos-full-service` | `src/pages/leistungen/pos-full-service/page.tsx` | POS Content Matrix, Challenge Section | Point-of-Sale merchandising, field sales teams, and retail activation. |
| `/leistungen/staff-as-a-service` | `src/pages/leistungen/staff-as-a-service/page.tsx` | Staffing Matrix, Specialization Grid | On-demand field staff, brand ambassadors, and promoter deployment. |
| `/leistungen/live-video` | `src/pages/leistungen/video/page.tsx` | `PhoneFrame`, Video Studio Specs | 1:1 Live video consultation and streaming studio infrastructure. |
| `/leistungen/events-messen` | `src/pages/leistungen/events-messen/page.tsx` | Event Architecture Matrix | Trade show booth staffing, roadshows, and experiential brand events. |
| `/leistungen/talentpool` | `src/pages/leistungen/talentpool/page.tsx` | Recruitment Engine Specs | Proprietary pool of vetted promoters, sales experts, and presenters. |
| `/leistungen/kreation-content` | `src/pages/leistungen/kreation-content/page.tsx` | Creative Portfolio Matrix | Commercial creative production, video content, and graphic design. |
| `/leistungen/warehouse-logistik` | `src/pages/leistungen/warehouse-logistik/page.tsx` | Logistics Flow Diagram | Warehouse storage, POS display assembly, and DACH fulfillment logistics. |
| `/leistungen/forecasting` | `src/pages/leistungen/forecasting/page.tsx` | Predictive Analytics Suite | AI-powered retail demand forecasting and staff allocation planning. |
| `/ratgeber` | `src/pages/ratgeber/page.tsx` | `RatgeberHubCard` Grid, Category Filter | Thematic knowledge hub index indexing all 25 marketing guide clusters. |
| `/ratgeber/:slug` | 25 Specific Page Instances | `RatgeberPage`, `RatgeberAnswerFirst`, `RatgeberGeoContext`, `RatgeberFAQ` | Programmatic SEO knowledge articles with Answer-First UX and FAQ schema. |

### 8.2 Canonical Redirection Rules
To preserve search index equity and handle legacy external URLs:
- `/about` $\rightarrow$ `/ueber-uns`
- `/careers` $\rightarrow$ `/karriere`
- `/case-studies` $\rightarrow$ `/fallbeispiele`
- `/case-studies/:slug` $\rightarrow$ `/fallbeispiele`
- `/login`, `/auth`, `/media-dashboard` $\rightarrow$ `/dashboard`

---

# 9. Knowledge Engine & SEO Topical Authority (`/ratgeber`)

The `/ratgeber` directory represents an enterprise-grade programmatic SEO engine comprising **25 specialized marketing guidebooks** targeting organic German-language search queries.

```
Ratgeber Architecture
├── Hub Page (/ratgeber) -> Category Filters, Dynamic Search, Hub Cards
├── Shared Engine Template (src/pages/ratgeber/components/RatgeberPage.tsx)
│   ├── RatgeberHero (H1, Lead Paragraph, Primary Category Tag)
│   ├── RatgeberAnswerFirst (Concise AI Snippet Extraction Block)
│   ├── RatgeberContent (Structured Editorial Deep Dive with Callouts)
│   ├── RatgeberGeoContext (DACH Local Market Citations & Authority)
│   ├── RatgeberFAQ (Accordion Interface + Schema.org FAQPage JSON-LD)
│   ├── RatgeberCrossLinks (Related Knowledge Topic Navigation)
│   └── RatgeberCTA (High-Conversion Lead Capture Block)
└── 25 Data Manifests (src/pages/ratgeber/data/*.ts)
```

### 9.1 The 25 Topic Clusters

1. `erlebnismarketing.ts` — Experiential Marketing & Live Brand Encounters
2. `verkaufsfoerderung-pos.ts` — Point-of-Sale Sales Promotion & Conversion Tactics
3. `messe-eventmarketing.ts` — Trade Fair Marketing & Exhibition Staffing
4. `field-marketing-sampling.ts` — Field Sampling & Direct Consumer Product Testing
5. `retail-merchandising.ts` — Shelf Management & Visual Merchandising Excellence
6. `mystery-shopping.ts` — Retail Quality Auditing & Mystery Research
7. `promotionspersonal.ts` — Event & Sales Promotion Staffing Deployment
8. `markenaktivierung.ts` — Strategic Brand Activation & Re-Positioning
9. `live-shopping.ts` — Interactive Live E-Commerce & Stream Selling
10. `guerilla-marketing.ts` — Unconventional Viral & Ambush Marketing Tactics
11. `nachhaltigkeitsmarketing.ts` — Sustainable Marketing & ESG Retail Compliance
12. `tiktok-shop-live.ts` — TikTok Shop Live Selling & Social Commerce
13. `markteintritt-dach.ts` — DACH Market Expansion Strategy for Global Brands
14. `live-video-promotion.ts` — 1:1 In-Store Video Advice & Remote Sales Studios
15. `roadshows-aktionen.ts` — Multi-City Mobile Roadshows & Pop-Up Tours
16. `social-commerce.ts` — Direct Social Media Checkout & Creator Selling
17. `verkaeuferschulungen.ts` — Retail Staff Education & Sales Pitch Training
18. `shopper-marketing.ts` — Behavioral Consumer Insights at the POS
19. `trade-marketing.ts` — B2B Retailer Relationship Marketing & Trade Campaigns
20. `influencer-marketing.ts` — Creator Collaborations & Offline Brand Integration
21. `pop-up-stores.ts` — Temporary Retail Spaces & Concept Store Execution
22. `instore-media.ts` — Digital Signage & In-Store Media Advertising
23. `produkt-launch.ts` — Go-to-Market Product Launch Strategy
24. `customer-experience.ts` — 360-Degree Consumer Journey Optimization
25. `community-management.ts` — Brand Advocacy & Customer Community Engagement

### 9.2 Answer-First Data Model
Each data file exports a structured `RatgeberPageContent` object designed to fulfill Google's Information Gain criteria and AI Overview extraction:

```typescript
export interface AnswerFirstData {
  question: string;
  answer: string;
}

export interface GeoContextData {
  level: 'local' | 'regional' | 'national' | 'international';
  heading: string;
  cities: string[];
  regions: string[];
  countries: string[];
  content: string;
}
```

---

# 10. Backend, Database Schema & Edge Infrastructure

The platform uses a serverless cloud infrastructure built on **Supabase** (PostgreSQL, Storage, and Deno Edge Functions).

### 10.1 Database Schema (`supabase/migrations/setup.sql`)

```sql
-- 1. Singleton Store Table for Media Overrides
CREATE TABLE IF NOT EXISTS public.media_store (
  id          INT          PRIMARY KEY,
  data        JSONB        NOT NULL DEFAULT '{}'::jsonb,
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Seed Singleton Row (ID = 1)
INSERT INTO public.media_store (id, data, updated_at)
VALUES (1, '{}'::jsonb, now())
ON CONFLICT (id) DO NOTHING;

-- 2. Row Level Security Configuration
ALTER TABLE public.media_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can read media_store"
  ON public.media_store FOR SELECT TO anon USING (true);

CREATE POLICY "anon can upsert media_store"
  ON public.media_store FOR ALL TO anon USING (true) WITH CHECK (true);

-- 3. Storage Bucket Configuration (Private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', false)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage Security Policies for Dashboard Prefix
CREATE POLICY "anon can upload to dashboard prefix"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (
    bucket_id = 'media'
    AND (storage.foldername(name))[1] = 'dashboard'
  );

CREATE POLICY "anon can read dashboard uploads"
  ON storage.objects FOR SELECT TO anon
  USING (
    bucket_id = 'media'
    AND (storage.foldername(name))[1] = 'dashboard'
  );
```

### 10.2 Deno Edge Function Proxy (`supabase/functions/media-proxy/index.ts`)
To prevent private Supabase signed URLs from expiring in browser caches, the `media-proxy` edge function serves as a dynamic token broker:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req: Request) => {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return new Response(JSON.stringify({ error: "Missing path" }), { status: 400 });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Mint 7-Day Signed URL Server-Side
  const { data, error } = await supabaseAdmin.storage
    .from("media")
    .createSignedUrl(path, 604800);

  if (error || !data?.signedUrl) {
    return new Response(JSON.stringify({ error: error?.message }), { status: 500 });
  }

  // Issue 302 Redirect with Long-Lived Edge Cache Headers
  return new Response(null, {
    status: 302,
    headers: {
      "Location": data.signedUrl,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
});
```

### 10.3 Contact Form Pipeline (`src/lib/contact.ts`)
Contact form submissions use the **Web3Forms API** with honeypot spam mitigation:
- Transmits submissions directly to `info@sonic-group.de`.
- Protects against bot automation via hidden `botcheck` fields.
- Automatic Fallback: If `VITE_WEB3FORMS_KEY` is not present or an API network error occurs, the script falls back to an encoded `mailto:info@sonic-group.de` link containing the serialized form parameters.

---

# 11. Asset Optimization & Build Pipeline

The project includes an automated asset management toolchain running on Node.js:

```
Asset Pipeline Execution
├── npm run prebuild
│   └── node generate_manifest.cjs -> Scans public/images/, generates src/mocks/imagesManifest.json
├── Standalone Optimization
│   └── node optimize_images.cjs  -> Sharp batch processing: Max 1920px, WebP quality 80
└── Integrity Verification
    └── node check_images.js      -> Verifies that all manifest assets physically exist on disk
```

### 11.1 Automated Manifest Generation (`generate_manifest.cjs`)
- Recursively walks `public/images/`.
- Extracts clean image captions by stripping legacy export artifacts (`" Kopie"`, `" Schwarz Weiß"`).
- Emits structured JSON dictionary into `src/mocks/imagesManifest.json`.
- Integrated directly into `package.json` under `"prebuild": "node generate_manifest.cjs"`.

### 11.2 Sharp Batch Optimizer (`optimize_images.cjs`)
- Identifies images larger than `300 KB`.
- Resizes the longest dimension to `1920px` and re-encodes to WebP at quality `80`.
- Implements `sharp.cache(false)` to prevent Windows file-locking collisions during in-place replacements.

---

# 12. Security, Performance, & Hosting Configuration

### 12.1 Security Model & Recommendations

> [!WARNING]
> **Client-Side Auth Gate**: The `/dashboard` panel is protected by a client-side session key (`sessionStorage`). This protects the UI from casual visitors, but because the Supabase anon key is exposed, write operations to `media_store` are technically unauthenticated.
> 
> **Production Hardening Guidelines**:
> 1. Implement Supabase Auth (`supabase.auth.signInWithPassword`) to authenticate admin users.
> 2. Restrict PostgreSQL table RLS policies so that `INSERT`/`UPDATE` operations require `auth.role() = 'authenticated'`.
> 3. Restrict Storage bucket policies so that only authenticated users can upload to the `dashboard/` directory.

### 12.2 Performance Architecture
- **Snappy Transitions**: Route transitions fade in `150ms`, with `window.scrollTo` dispatched via `requestAnimationFrame` to prevent layout jumps.
- **Scroll Padding**: Global `scroll-padding-top: 80px` set on `<html>` to ensure anchor links scroll cleanly below the sticky navigation bar.
- **Lazy Loading**: All secondary pages are split into separate ESM chunks loaded on-demand.

### 12.3 Web Server Routing & Deployment Configs

#### Apache / IONOS Configuration (`public/.htaccess`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Vercel Edge Configuration (`vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

*Authored by the Google DeepMind Advanced Agentic Coding Team for Sonic Group GmbH.*
