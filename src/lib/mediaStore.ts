import { useState, useEffect } from 'react';
import manifestData from '@/mocks/imagesManifest.json';
import { supabase } from '@/lib/supabase';

export interface MediaItem {
  url: string;
  caption: string;
  wide?: boolean;
}

export type MediaSections = {
  [key: string]: MediaItem[];
};

/* ─────────────────────────────────────────────
   STORAGE PROXY — permanent image URLs
   Uploaded images get stored as __storage__:path
   and resolved at render time through the
   media-proxy edge function which generates
   fresh signed URLs on every request.
───────────────────────────────────────────── */
export const STORAGE_PREFIX = '__storage__:';

export function resolveImageUrl(rawUrl: string): string {
  if (!rawUrl) return rawUrl;

  // New format: __storage__:path
  if (rawUrl.startsWith(STORAGE_PREFIX)) {
    const path = rawUrl.slice(STORAGE_PREFIX.length);
    const supabaseUrl = (import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
    if (!supabaseUrl) return rawUrl; // env not configured — return raw token as fallback
    return `${supabaseUrl}/functions/v1/media-proxy?path=${encodeURIComponent(path)}`;
  }

  // Legacy signed URLs — extract path and migrate to proxy
  const signMatch = rawUrl.match(/\/storage\/v1\/object\/sign\/media\/(.+?)(?:\?|$)/);
  if (signMatch) {
    const path = decodeURIComponent(signMatch[1]);
    const supabaseUrl = (import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
    if (!supabaseUrl) return rawUrl; // env not configured — return raw URL as fallback
    return `${supabaseUrl}/functions/v1/media-proxy?path=${encodeURIComponent(path)}`;
  }

  // External URLs (AI-generated, remote, etc.) — return as-is
  return rawUrl;
}


/* ─────────────────────────────────────────────
   PAGE GROUPING — organizes sections by page
───────────────────────────────────────────── */
export interface PageGroup {
  id: string;
  label: string;
  icon: string;
  sections: string[];
}

export const PAGE_GROUPS: PageGroup[] = [
  // ═══ MAIN NAVIGATION MAPPED GROUPS ═══
  {
    id: 'home',
    label: 'Home',
    icon: 'ri-home-line',
    sections: [
      // ── Hero section (HeroRevamp component) ──
      'home_hero_stats',
      'home_hero_cta_icons',
      'home_hero_wood_textures',
      // ── TrustStrip ──
      'home_truststrip_logos',
      // ── VideoShowcase ──
      'home_video',
      'home_video_strip_wood_icons',
      // ── ChallengeSection ──
      'home_challenge_wood_icons',
      // ── ServicesGrid — Menschen folders + wood icons ──
      '/images/home/1. Menschen für Events & Messen',
      '/images/home/2. Menschen für Content',
      '/images/home/3. Menschen für Schulungen',
      'home_pos',
      '/images/home/4. Menschen für unsere Studios',
      'home_services_wood_icons',
      // ── ConsultationButton ──
      'home_consultation_wood_icon',
      // ── ModernDNA / Sonic DNA ──
      'home_moderndna_wood_icons',
      // ── LiveMetrics ──
      'home_livemetrics_wood_bg',
    ],
  },
  {
    id: 'losungen',
    label: 'Lösungen',
    icon: 'ri-lightbulb-line',
    sections: [
      // ── All actively used by losungen/page.tsx ──
      '/images/losungen',
      'losungen_hero_backgrounds',
      'losungen_deliverable_images',
      'losungen_step_images',
      'losungen_testimonial_images',
      'losungen_wood_textures',
      // ── All 4 local sub-folders from manifest — every one added ──
      '/images/Lösungen/1. Header',
      '/images/Lösungen/2. Markteintritt/2. Verkäuferschulungen',
      '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung',
      '/images/Lösungen/2. Markteintritt/8. So läuft dein Markteintritt mit Sonic/3. Team-Aufbau & Schulung',
    ],
  },
  {
    id: 'leistungen',
    label: 'Leistungen',
    icon: 'ri-stack-line',
    sections: [
      // AM POS VERKAUFEN
      'leistungen_pos_images',
      'leistungen_video_images',
      'leistungen_events_images',
      // TEAM AUFBAUEN
      'leistungen_staff_images',
      'leistungen_talentpool_images',
      'leistungen_warehouse_images',
      // DATEN & INSIGHTS
      'leistungen_forecasting_images',
      // MARKE AUFBAUEN
      // leistungen_kreation_images removed (not used in any component)
      'leistungen_hero_images',
      'leistungen_servicegrid_bg',
      'leistungen_events_process_images',
      'leistungen_events_showcase_images',
      'leistungen_forecasting_process_images',
      'leistungen_kreation_carousel_images',
      'leistungen_kreation_showcase_images',
      'leistungen_kreation_showcase_secondary_konzeption',
      'leistungen_kreation_showcase_secondary_content',
      'leistungen_kreation_showcase_secondary_cgi',
      'leistungen_kreation_showcase_secondary_innovation',
      'leistungen_kreation_showcase_secondary_ci',
      'leistungen_kreation_showcase_secondary_layout',
      'leistungen_kreation_showcase_secondary_pos',
      'leistungen_kreation_before_after',
      'leistungen_pos_assets_images',
      'leistungen_pos_process_images',
      'leistungen_staff_socks_images',
      'leistungen_talentpool_profiles_images',
      'leistungen_warehouse_items_images',
      'leistungen_stats_wood_icons',
      'leistungen_schallmauer_wood_icons',
      'leistungen_events_solution_wood_icons',
      'leistungen_forecasting_solution_wood_icons',
      'leistungen_pos_solution_wood_icons',
      'leistungen_staff_solution_wood_icons',
      'leistungen_staff_specialization_wood_icons',
      'leistungen_video_solution_wood_icons',
      'leistungen_video_advantages_wood_icons',
      'leistungen_kreation_solution_wood_icons',
      'leistungen_kreation_discipline_wood_icons',
      'leistungen_kreation_photo_grid',
      // ── KreationFaces — team leads Robert H and Inga L ──
      'kreation_faces_robert',
      'kreation_faces_inga',
      'leistungen_warehouse_fullservice_photo',
      'leistungen_video_format_photos',
    ],
  },
  {
    id: 'about',
    label: 'Über uns',
    icon: 'ri-building-line',
    sections: [
      // ── About page (/about) ──
      '/images/Über uns/Über uns/1. Header',
      '/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus',
      '/images/Über uns/Über uns/3. Das Sonic Team',
      '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Björn',
      '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Jo',
      '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Lucas',
      '/images/Über uns/Leadership Perspectives',
      'about_sonicreels_hero_accent',
      'about_origin_story_wood_bg',
      // ── Sonic Reels page (/sonic-reels) ──
      '/images/Über uns/Sonic Reels/2007-2015',
      'reels_2015_2019',
      '/images/Über uns/Sonic Reels/2019-2022',
      '/images/Über uns/Sonic Reels/2022-2023',
      'reels_2024',
      'reels_2025',
      'reels_2026',
    ],
  },
  {
    id: 'case_studies',
    label: 'Fallbeispiele',
    icon: 'ri-file-chart-line',
    sections: [
      '/images/Case Studies -Fallbsp/Avoury',
      '/images/Case Studies -Fallbsp/Garmin',
      '/images/Case Studies -Fallbsp/Philips',
      '/images/Case Studies -Fallbsp/SEB',
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: 'ri-article-line',
    sections: ['blog_images'],
  },
  {
    id: 'careers',
    label: 'Karriere',
    icon: 'ri-briefcase-line',
    sections: [
      '/images/Karriere',
      'careers_hero_images',
      'careers_team_images',
      'careers_path_images',
      'careers_events_images',
      'careers_sonicfamily_images',
      'careers_stellenangebote_image',
      'careers_culture_wood_icons',
      'careers_hero_wood_icons',
      'careers_events_videos',
      // ── DNA section wood icons ──
      'careers_dna_wood_icons',
      // ── Pictorial Showcase (under Team Events) ──
      'careers_pictorial_showcase',
    ],
  },
  {
    id: 'kontakt',
    label: 'Kontakt',
    icon: 'ri-mail-send-line',
    sections: ['kontakt_hero'],
  },
  {
    id: 'team',
    label: 'Team',
    icon: 'ri-team-line',
    sections: [
      'team_hero_images',
      'team_corevalues_images',
      'team_meet_team_wood_icons',
      'team_training_image',
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    icon: 'ri-building-2-line',
    sections: [
      // ── Used by live industries page components ──
      'industries_hero_bg',
      'industries_grid_images',
      'industries_expertise_wood_icons',
      // industries_grid_wood_icons removed (not used in any component)
    ],
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: 'ri-briefcase-4-line',
    sections: [
      'jobs_hero',
    ],
  },
  {
    id: 'ratgeber',
    label: 'Ratgeber',
    icon: 'ri-book-open-line',
    sections: [
      'ratgeber_hero',
    ],
  },
  {
    id: 'srt',
    label: 'SRT',
    icon: 'ri-pie-chart-2-line',
    sections: [
      // ── Used by live srt page components ──
      'srt_hero_icons',
      'srt_feature_icons',
      'srt_functionality_images',
      'srt_section_images',
      'srt_problem_wood_icons',
      'srt_proof_wood_icons',
      'srt_pricing_images',
    ],
  },
  // common group has no active mediaStore usage — components use hardcoded assets
  // Keeping empty group so sidebar navigation still shows it
  {
    id: 'common',
    label: 'Common Components',
    icon: 'ri-puzzle-line',
    sections: [
      'common_clientproof_logos',
      'common_logos',
    ],
  },
];

/* ─────────────────────────────────────────────
   VIRTUAL MEDIA — AI-generated & remote images
───────────────────────────────────────────── */
export const VIRTUAL_MEDIA: MediaSections = {

  /* ──────────────────────────────────────────────────────
   HOME — Only sections actually used by live page components
  ────────────────────────────────────────────────────── */
  /* ── HOME: Hero Stats Wood Icons (HeroRevamp) ── */
  home_hero_stats: [
    { url: 'https://readdy.ai/api/search-image?query=finely%20hand%20carved%20walnut%20wood%20victory%20laurel%20wreath%20encircling%20an%20upward%20arrow%20sculptural%20relief%20carving%20deep%20shadow%20casting%20warm%20dark%20amber%20brown%20wood%20grain%20visible%20rich%20three%20dimensional%20craftsmanship%20museum%20quality%20artisan%20object%20centered%20on%20pure%20white%20matte%20background%20studio%20product%20photography%20sharp%20focus%20dramatic%20side%20lighting&width=120&height=120&seq=wood-icon-stat-laurel-v3&orientation=squarish', caption: 'Produkte verkauft — Laurel Wreath Icon' },
    { url: 'https://readdy.ai/api/search-image?query=precision%20hand%20carved%20solid%20walnut%20wood%20balance%20scale%20with%20two%20equal%20pans%20sculptural%20three%20dimensional%20relief%20deep%20wood%20grain%20texture%20warm%20amber%20honey%20brown%20tone%20high%20contrast%20dramatic%20lighting%20centered%20museum%20quality%20artisan%20piece%20pure%20white%20studio%20background%20sharp%20product%20photography%20minimal&width=120&height=120&seq=wood-icon-stat-scale-v3&orientation=squarish', caption: 'Umsatz generiert — Balance Scale Icon' },
    { url: 'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20precision%20compass%20rose%20eight%20point%20navigation%20star%20deeply%20incised%20relief%20carving%20rich%20dark%20amber%20brown%20grain%20highly%20detailed%20three%20dimensional%20military%20instrument%20quality%20centered%20on%20clean%20white%20studio%20background%20dramatic%20directional%20lighting%20sharp%20focus%20artisan%20craft&width=120&height=120&seq=wood-icon-stat-compass-v3&orientation=squarish', caption: 'Einsätze — Compass Rose Icon' },
    { url: 'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20broadcast%20antenna%20tower%20with%20three%20concentric%20signal%20arcs%20radiating%20outward%20sculptural%20relief%20deep%20precision%20carving%20warm%20honey%20amber%20brown%20wood%20grain%20three%20dimensional%20high%20contrast%20centered%20on%20white%20studio%20background%20dramatic%20side%20lighting%20museum%20quality%20artisan%20object%20minimal&width=120&height=120&seq=wood-icon-stat-antenna-v3&orientation=squarish', caption: 'Live Video Calls — Antenna Icon' },
  ],

  /* ── HOME: Hero CTA Wood Icons ── */
  home_hero_cta_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chart%20icon%20rising%20bar%20graph%20symbol%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20brown%20color%20simple%20minimalist%20business%20growth%20icon%20handcrafted%20artisan%20quality%20on%20white%20background%20top%20view%20product%20photography&width=120&height=120&seq=wood-carved-chart-icon-walnut&orientation=squarish', caption: 'Agentur CTA — Chart Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20people%20icon%20team%20group%20symbol%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20brown%20color%20simple%20minimalist%20human%20figures%20icon%20handcrafted%20artisan%20quality%20on%20white%20background%20top%20view%20product%20photography&width=120&height=120&seq=wood-carved-team-icon-walnut&orientation=squarish', caption: 'Job CTA — Team Icon' },
  ],

  /* ── HOME: Hero Wood Textures ── */
  home_hero_wood_textures: [
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface%20archaeological%20relic%20quality%20museum%20artifact%20aged%20timber%20with%20peeling%20finish&width=400&height=80&seq=wood-texture-btn-left-1&orientation=landscape', caption: 'Left CTA Button — Wood Texture' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface%20archaeological%20relic%20quality%20museum%20artifact%20aged%20timber%20with%20peeling%20finish&width=400&height=80&seq=wood-texture-btn-right-1&orientation=landscape', caption: 'Right CTA Button — Wood Texture' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface%20archaeological%20relic%20quality%20museum%20artifact%20aged%20timber%20with%20peeling%20finish&width=60&height=600&seq=wood-texture-divider-vertical-1&orientation=portrait', caption: 'Vertical Divider — Wood Texture' },
  ],

  /* ── HOME: Showcase Service Images ── */
  home_showcase_service_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20brand%20ambassadors%20team%20in%20modern%20retail%20environment%20coordinating%20sales%20promotion%20activities%20bright%20contemporary%20store%20setting%20with%20product%20displays%20clean%20minimalist%20design%20warm%20lighting&width=1200&height=800&seq=staff-service-001&orientation=landscape', caption: 'Staff Service — Brand Ambassador Team', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=modern%20point%20of%20sale%20retail%20display%20with%20interactive%20digital%20screens%20product%20showcases%20in%20contemporary%20store%20environment%20professional%20merchandising%20setup%20bright%20lighting%20clean%20design&width=1200&height=800&seq=pos-service-001&orientation=landscape', caption: 'Point of Sale — Retail Display', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=modern%20analytics%20dashboard%20on%20large%20screen%20showing%20retail%20performance%20metrics%20data%20visualization%20charts%20graphs%20in%20contemporary%20office%20environment%20professional%20business%20intelligence%20setup%20clean%20design&width=1200&height=800&seq=srt-service-001&orientation=landscape', caption: 'SRT — Analytics Dashboard', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20live%20video%20streaming%20studio%20setup%20with%20presenter%20demonstrating%20products%20on%20camera%20modern%20broadcast%20equipment%20contemporary%20studio%20environment%20bright%20lighting%20clean%20design&width=1200&height=800&seq=lvp-service-001&orientation=landscape', caption: 'Live Video — Studio Setup', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=impressive%20trade%20show%20exhibition%20booth%20with%20modern%20design%20interactive%20displays%20brand%20presentation%20area%20professional%20event%20setup%20contemporary%20exhibition%20hall%20bright%20lighting%20clean%20aesthetic&width=1200&height=800&seq=event-service-001&orientation=landscape', caption: 'Messe & Event — Trade Show Booth', wide: true },
  ],

  /* ── HOME: Showcase Wood Icons ── */
  home_showcase_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-team-walnut&orientation=squarish', caption: 'Staff Service — Team Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20store%20shop%20retail%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-store-walnut&orientation=squarish', caption: 'POS — Store Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20analytics%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-analytics-walnut&orientation=squarish', caption: 'SRT — Analytics Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20video%20camera%20play%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-video-walnut&orientation=squarish', caption: 'LVP — Video Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20calendar%20event%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-event-walnut&orientation=squarish', caption: 'Events — Calendar Wood Icon' },
  ],

  /* ── HOME: POS Remote ── */
  home_pos: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'POS Display' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg', caption: 'Flächenberatung' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Sony PlayStation POS' },
  ],

  /* ── LÖSUNGEN: Hero Backgrounds ── */
  losungen_hero_backgrounds: [
    { url: 'https://readdy.ai/api/search-image?query=dramatic%20wide%20angle%20shot%20of%20modern%20retail%20environment%20sleek%20product%20display%20stands%20brand%20activation%20professionals%20confident%20poses%20cinematic%20moody%20lighting%20deep%20contrast%20dark%20shadows%20warm%20amber%20highlights%20premium%20commercial%20photography%20editorial%20style%20highly%20stylized%20dramatic%20atmosphere%20retail%20marketing%20agency&width=1920&height=1080&seq=losungen-hero-editorial-v3&orientation=landscape', caption: 'Lösungen — Main Hero Background', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=dynamic%20brand%20launch%20event%20at%20modern%20retail%20store%20multiple%20brand%20ambassadors%20engaging%20customers%20with%20new%20product%20displays%20vibrant%20energy%20professional%20activation%20team%20in%20action%20contemporary%20retail%20environment%20dramatic%20lighting%20cinematic%20atmosphere&width=1920&height=800&seq=hero-mkt-expanded-v2&orientation=landscape', caption: 'Markteintritt — Expanded Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=confident%20field%20force%20sales%20team%20at%20retail%20point%20of%20sale%20professional%20promoters%20at%20product%20display%20stands%20busy%20electronics%20store%20customers%20engaging%20with%20products%20high%20energy%20retail%20activation%20dramatic%20overhead%20lighting%20modern%20store%20environment&width=1920&height=800&seq=hero-abs-expanded-v2&orientation=landscape', caption: 'Absatz steigern — Expanded Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=seamless%20omnichannel%20retail%20experience%20customer%20on%20smartphone%20video%20call%20with%20product%20advisor%20while%20standing%20in%20store%20QR%20code%20on%20packaging%20digital%20and%20physical%20retail%20convergence%20modern%20technology%20lifestyle%20dramatic%20cinematic%20lighting&width=1920&height=800&seq=hero-omni-expanded-v2&orientation=landscape', caption: 'Omnichannel — Expanded Hero', wide: true },
  ],

  /* ── LÖSUNGEN: Deliverable Images ── */
  /* Order follows dBase mapping: indices 0-6 Markteintritt (7), 7-14 Absatz (8), 15-22 Omnichannel (8) = 23 total */
  losungen_deliverable_images: [
    /* ── Markteintritt (indices 0–6) ── */
    { url: 'https://readdy.ai/api/search-image?query=professional%20brand%20ambassador%20in%20matching%20uniform%20confidently%20engaging%20customer%20at%20modern%20retail%20store%20explaining%20product%20features%20warm%20friendly%20interaction%20premium%20electronics%20store%20bright%20clean%20lighting%20editorial%20commercial%20photography&width=800&height=500&seq=deliv-mkt-1&orientation=landscape', caption: 'Markteintritt — Brand Ambassadors am POS' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20sales%20training%20workshop%20group%20of%20retail%20staff%20learning%20product%20knowledge%20in%20modern%20conference%20room%20presenter%20at%20whiteboard%20engaged%20audience%20corporate%20training&width=800&height=500&seq=deliv-mkt-2&orientation=landscape', caption: 'Markteintritt — Verkäuferschulungen' },
    { url: 'https://readdy.ai/api/search-image?query=exciting%20product%20launch%20event%20in%20retail%20store%20with%20branded%20displays%20crowd%20of%20shoppers%20promotional%20staff%20demonstrating%20new%20product%20vibrant%20atmosphere%20professional%20event%20setup&width=800&height=500&seq=deliv-mkt-3&orientation=landscape', caption: 'Markteintritt — Launch-Events' },
    { url: 'https://readdy.ai/api/search-image?query=live%20video%20shopping%20advisor%20on%20tablet%20screen%20professional%20brand%20consultant%20demonstrating%20product%20remotely%20modern%20digital%20retail%20experience%20customer%20watching%20product%20demo%20on%20device%20clean%20bright%20studio%20background%20high%20quality%20video%20call&width=800&height=500&seq=deliv-mkt-4&orientation=landscape', caption: 'Markteintritt — Videocontent & Live-Beratung' },
    { url: 'https://readdy.ai/api/search-image?query=premium%20retail%20point%20of%20sale%20display%20design%20shop%20in%20shop%20setup%20elegant%20branded%20display%20stand%20with%20products%20modern%20retail%20interior%20professional%20merchandising%20clean%20design&width=800&height=500&seq=deliv-mkt-5&orientation=landscape', caption: 'Markteintritt — POS-Design' },
    { url: 'https://readdy.ai/api/search-image?query=data%20driven%20business%20planning%20session%20team%20around%20large%20screen%20showing%20market%20analytics%20heatmaps%20store%20performance%20metrics%20strategic%20retail%20planning%20professional%20office%20modern%20data%20visualization%20bright%20workspace&width=800&height=500&seq=deliv-mkt-6&orientation=landscape', caption: 'Markteintritt — Datenbasierte Planung' },
    { url: 'https://readdy.ai/api/search-image?query=real%20time%20reporting%20dashboard%20on%20tablet%20and%20laptop%20showing%20live%20sales%20metrics%20KPI%20charts%20performance%20data%20modern%20business%20analytics%20interface%20clean%20design&width=800&height=500&seq=deliv-mkt-7&orientation=landscape', caption: 'Markteintritt — Live-Reporting' },

    /* ── Absatz steigern (indices 7–14) ── */
    { url: 'https://readdy.ai/api/search-image?query=confident%20brand%20promoter%20team%20in%20modern%20retail%20store%20actively%20selling%20products%20to%20customers%20energetic%20sales%20floor%20atmosphere%20professional%20retail%20activation%20multiple%20promoters%20at%20different%20displays%20engaging%20shoppers%20bright%20store%20lighting%20editorial%20commercial%20photography&width=800&height=500&seq=deliv-abs-1&orientation=landscape', caption: 'Absatz — Menschen auf der Fläche' },
    { url: 'https://readdy.ai/api/search-image?query=strategic%20data%20planning%20session%20marketing%20team%20analyzing%20retail%20performance%20data%20on%20large%20dashboard%20screen%20with%20maps%20charts%20and%20ROI%20metrics%20modern%20office%20data%20driven%20decision%20making%20professional%20business%20environment%20bright%20workspace&width=800&height=500&seq=deliv-abs-2&orientation=landscape', caption: 'Absatz — Daten in der Planung' },
    { url: 'https://readdy.ai/api/search-image?query=live%20GPS%20tracking%20dashboard%20showing%20field%20force%20locations%20on%20city%20map%20real%20time%20sales%20performance%20metrics%20modern%20business%20intelligence%20interface%20tablet%20and%20desktop%20view&width=800&height=500&seq=deliv-abs-3&orientation=landscape', caption: 'Absatz — GPS Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=sales%20forecasting%20model%20on%20screen%20showing%20predicted%20revenue%20curves%20trend%20analysis%20charts%20professional%20business%20forecasting%20software%20modern%20office%20data%20science%20team&width=800&height=500&seq=deliv-abs-4&orientation=landscape', caption: 'Absatz — Forecasting' },
    { url: 'https://readdy.ai/api/search-image?query=field%20force%20deployment%20planning%20map%20with%20store%20locations%20staffing%20schedule%20calendar%20view%20professional%20operations%20planning%20software%20retail%20coverage%20optimization%20modern%20interface&width=800&height=500&seq=deliv-abs-5&orientation=landscape', caption: 'Absatz — Einsatzplanung' },
    { url: 'https://readdy.ai/api/search-image?query=daily%20performance%20tracking%20report%20on%20tablet%20showing%20sales%20contacts%20achieved%20targets%20green%20metrics%20live%20data%20retail%20field%20force%20performance%20dashboard%20clean%20modern%20design&width=800&height=500&seq=deliv-abs-6&orientation=landscape', caption: 'Absatz — Performance-Tracking' },
    { url: 'https://readdy.ai/api/search-image?query=retail%20shelf%20merchandising%20professional%20arranging%20products%20on%20store%20shelf%20secondary%20placement%20display%20optimization%20trade%20partner%20training%20modern%20supermarket%20electronics%20store&width=800&height=500&seq=deliv-abs-7&orientation=landscape', caption: 'Absatz — Sell-in-Support' },
    { url: 'https://readdy.ai/api/search-image?query=continuous%20improvement%20review%20meeting%20team%20analyzing%20performance%20data%20whiteboard%20with%20optimization%20strategies%20professional%20business%20review%20modern%20office%20setting&width=900&height=500&seq=deliv-abs-8&orientation=landscape', caption: 'Absatz — Kontinuierliche Optimierung' },

    /* ── Omnichannel (indices 15–22) ── */
    { url: 'https://readdy.ai/api/search-image?query=ecommerce%20website%20product%20page%20with%20live%20video%20chat%20widget%20button%20prominently%20displayed%20online%20shopping%20experience%20digital%20retail%20consultation%20modern%20clean%20web%20design%20customer%20about%20to%20click%20video%20advisor%20call%20to%20action&width=800&height=500&seq=deliv-omni-1&orientation=landscape', caption: 'Omnichannel — Im Online-Shop' },
    { url: 'https://readdy.ai/api/search-image?query=customer%20scanning%20QR%20code%20on%20product%20packaging%20with%20smartphone%20connecting%20to%20live%20video%20advisor%20product%20expert%20consultation%20at%20point%20of%20purchase%20modern%20retail%20packaging%20design&width=800&height=500&seq=deliv-omni-2&orientation=landscape', caption: 'Omnichannel — QR-Code Beratung' },
    { url: 'https://readdy.ai/api/search-image?query=interactive%20tablet%20display%20at%20retail%20shelf%20customer%20using%20touchscreen%20to%20connect%20with%20live%20video%20product%20expert%20modern%20retail%20technology%20digital%20advisory%20kiosk%20in%20store&width=800&height=500&seq=deliv-omni-3&orientation=landscape', caption: 'Omnichannel — POS-Display' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20video%20advisor%20in%20modern%20branded%20studio%20setup%20with%20clean%20background%20wearing%20headset%20smiling%20warmly%20at%20camera%20ready%20for%20live%20consultation%20retail%20expert%20premium%20video%20call%20environment%20professional%20lighting&width=800&height=500&seq=deliv-omni-4&orientation=landscape', caption: 'Omnichannel — Geschulte Video-Berater' },
    { url: 'https://readdy.ai/api/search-image?query=versatile%20customer%20service%20team%20handling%20multiple%20video%20calls%20pre-sales%20after-sales%20support%20troubleshooting%20modern%20call%20center%20with%20video%20capabilities%20professional%20branded%20environment&width=800&height=500&seq=deliv-omni-5&orientation=landscape', caption: 'Omnichannel — Multitalente' },
    { url: 'https://readdy.ai/api/search-image?query=seamless%20technical%20integration%20diagram%20showing%20QR%20code%20shop%20widget%20POS%20display%20connections%20to%20existing%20infrastructure%20clean%20technology%20architecture%20visualization%20modern%20digital%20ecosystem&width=800&height=500&seq=deliv-omni-6&orientation=landscape', caption: 'Omnichannel — Technische Integration' },
    { url: 'https://readdy.ai/api/search-image?query=real%20time%20video%20call%20analytics%20dashboard%20showing%20call%20duration%20conversion%20rate%20customer%20satisfaction%20scores%20modern%20reporting%20interface%20on%20large%20screen%20professional%20business%20intelligence%20clean%20dark%20UI%20multiple%20KPIs%20visible&width=800&height=500&seq=deliv-omni-7&orientation=landscape', caption: 'Omnichannel — Reporting' },
    { url: 'https://readdy.ai/api/search-image?query=scalable%20video%20advisory%20team%20growing%20from%20small%20to%20large%20operation%20multiple%20advisors%20in%20modern%20studio%20environment%20flexible%20staffing%20seasonal%20scaling%20professional%20setup&width=800&height=500&seq=deliv-omni-8&orientation=landscape', caption: 'Omnichannel — Skalierbarkeit' },
  ],

  /* ── LÖSUNGEN: Process Step Images ── */
  losungen_step_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20business%20briefing%20meeting%20team%20around%20table%20with%20brand%20strategy%20documents%20product%20samples%20whiteboard%20notes%20collaborative%20workshop%20modern%20office%20bright%20natural%20light&width=900&height=500&seq=step-mkt-1&orientation=landscape', caption: 'Markteintritt — Step 1: Briefing' },
    { url: 'https://readdy.ai/api/search-image?query=strategic%20location%20planning%20map%20on%20large%20screen%20with%20data%20overlays%20retail%20store%20locations%20marked%20team%20analyzing%20deployment%20strategy%20modern%20office%20setting%20professional%20planning%20session&width=900&height=500&seq=step-mkt-2&orientation=landscape', caption: 'Markteintritt — Step 2: Standortplanung' },
    { url: 'https://readdy.ai/api/search-image?query=brand%20ambassador%20team%20training%20session%20group%20of%20young%20professionals%20learning%20product%20knowledge%20enthusiastic%20trainer%20modern%20training%20room%20corporate%20environment%20engaged%20participants&width=900&height=500&seq=step-mkt-3&orientation=landscape', caption: 'Markteintritt — Step 3: Team-Aufbau' },
    { url: 'https://readdy.ai/api/search-image?query=product%20launch%20activation%20at%20retail%20store%20multiple%20brand%20ambassadors%20at%20branded%20display%20stands%20customers%20engaging%20with%20products%20busy%20retail%20environment%20professional%20execution&width=900&height=500&seq=step-mkt-4&orientation=landscape', caption: 'Markteintritt — Step 4: Launch' },
    { url: 'https://readdy.ai/api/search-image?query=performance%20review%20meeting%20team%20analyzing%20live%20dashboard%20data%20on%20large%20screen%20discussing%20optimization%20strategies%20modern%20office%20professional%20business%20review%20session%20charts%20metrics&width=900&height=500&seq=step-mkt-5&orientation=landscape', caption: 'Markteintritt — Step 5: Tracking' },
    { url: 'https://readdy.ai/api/search-image?query=retail%20situation%20analysis%20workshop%20team%20reviewing%20current%20market%20position%20data%20charts%20on%20screen%20defining%20measurable%20sales%20goals%20professional%20strategy%20session%20modern%20office&width=900&height=500&seq=step-abs-1&orientation=landscape', caption: 'Absatz — Step 1: Analyse' },
    { url: 'https://readdy.ai/api/search-image?query=sales%20forecast%20planning%20session%20with%20data%20model%20on%20screen%20showing%20location%20potential%20ROI%20projections%20staffing%20requirements%20professional%20planning%20meeting%20modern%20office%20environment&width=900&height=500&seq=step-abs-2&orientation=landscape', caption: 'Absatz — Step 2: Forecasting' },
    { url: 'https://readdy.ai/api/search-image?query=field%20force%20team%20assembly%20and%20product%20training%20session%20group%20of%20motivated%20sales%20promoters%20learning%20brand%20knowledge%20professional%20trainer%20modern%20training%20facility%20corporate%20environment&width=900&height=500&seq=step-abs-3&orientation=landscape', caption: 'Absatz — Step 3: Team' },
    { url: 'https://readdy.ai/api/search-image?query=field%20force%20rollout%20multiple%20brand%20promoters%20at%20different%20retail%20locations%20coordinated%20activation%20sell-out%20campaign%20busy%20retail%20stores%20professional%20execution%20nationwide%20coverage&width=900&height=500&seq=step-abs-4&orientation=landscape', caption: 'Absatz — Step 4: Rollout' },
    { url: 'https://readdy.ai/api/search-image?query=live%20performance%20tracking%20and%20scaling%20review%20meeting%20team%20analyzing%20real%20time%20dashboard%20data%20identifying%20optimization%20opportunities%20professional%20business%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-abs-5&orientation=landscape', caption: 'Absatz — Step 5: Skalierung' },
    { url: 'https://readdy.ai/api/search-image?query=pilot%20concept%20workshop%20team%20defining%20video%20advisory%20scope%20product%20selection%20target%20audience%20volume%20planning%20modern%20meeting%20room%20collaborative%20strategy%20session%20professional%20environment&width=900&height=500&seq=step-omni-1&orientation=landscape', caption: 'Omnichannel — Step 1: Pilotkonzept' },
    { url: 'https://readdy.ai/api/search-image?query=technical%20integration%20setup%20QR%20code%20generation%20shop%20widget%20installation%20POS%20display%20configuration%20fast%20seamless%20technology%20deployment%20professional%20IT%20setup%20modern%20digital%20infrastructure&width=900&height=500&seq=step-omni-2&orientation=landscape', caption: 'Omnichannel — Step 2: Integration' },
    { url: 'https://readdy.ai/api/search-image?query=live%20video%20advisory%20channel%20launch%20first%20customer%20calls%20going%20live%20team%20monitoring%20performance%20data%20pilot%20phase%20launch%20day%20excitement%20professional%20video%20studio%20environment&width=900&height=500&seq=step-omni-3&orientation=landscape', caption: 'Omnichannel — Step 3: Go-Live' },
    { url: 'https://readdy.ai/api/search-image?query=video%20advisory%20performance%20optimization%20team%20analyzing%20call%20metrics%20scaling%20successful%20channels%20improving%20underperforming%20ones%20live%20dashboard%20review%20modern%20office%20data%20driven%20decisions&width=900&height=500&seq=step-omni-4&orientation=landscape', caption: 'Omnichannel — Step 4: Optimierung' },
  ],

  /* ── LÖSUNGEN: Testimonial Images ── */
  losungen_testimonial_images: [
    { url: 'https://readdy.ai/api/search-image?query=Garmin%20GPS%20smartwatch%20fitness%20tracker%20retail%20display%20in%20modern%20electronics%20store%20professional%20brand%20ambassador%20demonstrating%20device%20features%20to%20customer%20premium%20retail%20environment%20bright%20lighting&width=1200&height=700&seq=testimonial-garmin-v2&orientation=landscape', caption: 'Testimonial — Garmin', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Samsung%20premium%20smartphone%20display%20in%20modern%20electronics%20retail%20store%20professional%20brand%20ambassador%20demonstrating%20latest%20mobile%20device%20to%20customer%20sleek%20display%20tables%20bright%20lighting%20contemporary%20retail%20environment&width=1200&height=700&seq=testimonial-samsung-v2&orientation=landscape', caption: 'Testimonial — Samsung', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=premium%20tea%20brand%20live%20video%20consultation%20customer%20connecting%20with%20tea%20expert%20advisor%20elegant%20product%20display%20sophisticated%20lifestyle%20brand%20experience%20modern%20digital%20advisory%20setup&width=1200&height=700&seq=testimonial-avoury-v2&orientation=landscape', caption: 'Testimonial — Avoury', wide: true },
  ],

  /* ── LÖSUNGEN: Wood Textures ── */
  losungen_wood_textures: [
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface&width=1920&height=600&seq=wood-card-losungen-clean-v8&orientation=landscape', caption: 'Wood Card — Main Background', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface&width=1920&height=400&seq=expanded-hero-wood-bg&orientation=landscape', caption: 'Expanded Panel — Wood Overlay', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface&width=900&height=600&seq=survey-wood-bg&orientation=landscape', caption: 'Survey Card — Wood Texture' },
  ],

  /* ── SRT: Hero Wood Icons ── */
  srt_hero_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20version%20number%20update%20iteration%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography&width=80&height=80&seq=wood-srt-hero-v1&orientation=squarish', caption: 'SRT Hero — Versionen Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20checklist%20task%20completed%20checkmark%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography&width=80&height=80&seq=wood-srt-hero-v2&orientation=squarish', caption: 'SRT Hero — Tasks Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20money%20euro%20currency%20salary%20payment%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography&width=80&height=80&seq=wood-srt-hero-v3&orientation=squarish', caption: 'SRT Hero — Gehälter Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20calendar%20time%20clock%20duration%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography&width=80&height=80&seq=wood-srt-hero-v4&orientation=squarish', caption: 'SRT Hero — In Betrieb Icon' },
  ],

  /* ── SRT: Feature Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  srt_feature_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20dashboard%20monitor%20screen%20display%20analytics%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-dashboard-v1&orientation=squarish', caption: 'Echtzeit-Dashboard — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20performance%20analytics%20graph%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-chart-v1&orientation=squarish', caption: 'Performance-Tracking — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20management%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-team-v1&orientation=squarish', caption: 'Team-Management — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20document%20file%20report%20paper%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-report-v1&orientation=squarish', caption: 'Reportings — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20mobile%20phone%20app%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-mobile-v1&orientation=squarish', caption: 'Mobile App — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20shield%20security%20protection%20lock%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-shield-v1&orientation=squarish', caption: 'Datensicherheit — Wood Icon' },
  ],

  /* ── SRT: Section Images ── */
  srt_section_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20enterprise%20software%20dashboard%20showing%20real%20time%20retail%20analytics%20on%20large%20monitor%20screen%20clean%20dark%20UI%20design%20with%20charts%20metrics%20and%20KPIs%20professional%20business%20intelligence%20platform%20product%20photography&width=1200&height=800&seq=srt-dashboard-screen&orientation=landscape', caption: 'SRT — Dashboard Screenshot', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=mobile%20app%20interface%20showing%20retail%20performance%20metrics%20on%20smartphone%20screen%20clean%20modern%20UI%20design%20with%20trackable%20KPIs%20field%20force%20management%20app%20product%20photography%20dark%20mode%20professional&width=600&height=800&seq=srt-mobile-screen&orientation=portrait', caption: 'SRT — Mobile App Screenshot' },
  ],

  /* ── SRT: FunctionalityOverview Module Dashboard Screenshots ── */
  srt_functionality_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20software%20dashboard%20task%20scheduling%20calendar%20view%20drag%20drop%20dark%20UI%20lime%20green%20accent%20retail%20field%20force%20management%20professional%20enterprise%20SaaS%20interface%20data%20visualization%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-01-plan&orientation=landscape', caption: 'Planung — Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=HR%20talent%20management%20dashboard%20employee%20profiles%20grid%20staff%20pool%20dark%20UI%20lime%20green%20accent%20enterprise%20software%20interface%20professional%20SaaS%20platform%20retail%20promoter%20database%20clean%20minimal&width=900&height=520&seq=srt-func-02-talent&orientation=landscape', caption: 'Talentpool — Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=GPS%20location%20tracking%20map%20interface%20dark%20UI%20multiple%20pins%20retail%20store%20locations%20field%20force%20check-in%20software%20dashboard%20lime%20green%20accent%20enterprise%20SaaS%20professional%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-03-gps&orientation=landscape', caption: 'GPS Check-In — Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=data%20integration%20platform%20API%20connections%20ERP%20WMS%20enterprise%20software%20dark%20UI%20lime%20green%20accent%20connected%20systems%20diagram%20SaaS%20dashboard%20professional%20clean%20minimal%20dark%20background%20data%20flow&width=900&height=520&seq=srt-func-04-ext&orientation=landscape', caption: 'Externe Daten — Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=AI%20document%20processing%20intelligence%20software%20interface%20dark%20UI%20invoice%20receipt%20classification%20automation%20lime%20green%20accent%20machine%20learning%20enterprise%20SaaS%20professional%20clean%20minimal%20dashboard&width=900&height=520&seq=srt-func-05-doc&orientation=landscape', caption: 'Document Intelligence — Dashboard' },
    { url: 'https://readdy.ai/api/search-image?query=route%20optimization%20software%20map%20interface%20dark%20UI%20field%20sales%20representative%20route%20planning%20multiple%20stops%20efficiency%20lime%20green%20accent%20enterprise%20SaaS%20dashboard%20professional%20clean%20minimal&width=900&height=520&seq=srt-func-06-route&orientation=landscape', caption: 'Routenplanung — Dashboard' },
  ],

  /* ── LVP: Hero Images ── */
  lvp_hero_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20live%20video%20shopping%20broadcast%20studio%20with%20modern%20equipment%20multiple%20cameras%20lighting%20rigs%20green%20screen%20backdrop%20presenter%20desk%20contemporary%20production%20environment%20clean%20professional%20setup&width=1920&height=800&seq=lvp-hero-bg&orientation=landscape', caption: 'LVP — Hero Background', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=close%20up%20of%20professional%20video%20presenter%20demonstrating%20product%20on%20camera%20in%20live%20streaming%20studio%20bright%20studio%20lighting%20engaging%20host%20premium%20production%20quality%20modern%20broadcast%20setup&width=800&height=600&seq=lvp-presenter&orientation=landscape', caption: 'LVP — Presenter Shot' },
  ],

  /* ── LVP: Studio Images ── */
  lvp_studio_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20video%20production%20studio%20interior%20with%20professional%20lighting%20equipment%20multiple%20camera%20setups%20green%20screen%20area%20broadcast%20quality%20monitors%20control%20room%20visible%20contemporary%20creative%20workspace%20clean%20industrial%20design&width=1200&height=800&seq=lvp-studio-1&orientation=landscape', caption: 'LVP — Studio Overview', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20video%20editing%20suite%20with%20multiple%20monitors%20showing%20editing%20timeline%20color%20grading%20and%20live%20feed%20modern%20post%20production%20workspace%20creative%20environment%20clean%20design&width=800&height=600&seq=lvp-studio-2&orientation=landscape', caption: 'LVP — Editing Suite' },
    { url: 'https://readdy.ai/api/search-image?query=product%20photography%20lightbox%20setup%20with%20professional%20lighting%20equipment%20reflecting%20surfaces%20for%20product%20showcases%20modern%20creative%20studio%20clean%20white%20environment&width=800&height=600&seq=lvp-studio-3&orientation=landscape', caption: 'LVP — Product Photography' },
  ],

  /* ── LVP: Creative Showcase ── */
  lvp_creative_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20product%20demonstration%20video%20thumbnail%20with%20presenter%20holding%20consumer%20electronics%20device%20clean%20overlay%20text%20design%20area%20bright%20studio%20lighting%20modern%20commercial%20production%20aesthetic&width=800&height=450&seq=lvp-creative-1&orientation=landscape', caption: 'LVP — Demo Video Thumbnail' },
    { url: 'https://readdy.ai/api/search-image?query=split%20screen%20live%20shopping%20broadcast%20with%20host%20on%20one%20side%20and%20product%20closeup%20on%20other%20side%20interactive%20chat%20overlay%20visible%20professional%20production%20quality%20modern%20ecommerce%20livestream&width=800&height=450&seq=lvp-creative-2&orientation=landscape', caption: 'LVP — Live Shopping Split' },
    { url: 'https://readdy.ai/api/search-image?query=behind%20the%20scenes%20of%20live%20video%20production%20multiple%20crew%20members%20operating%20cameras%20and%20lighting%20equipment%20professional%20studio%20environment%20teamwork%20creative%20collaboration%20modern%20broadcast%20facility&width=800&height=450&seq=lvp-creative-3&orientation=landscape', caption: 'LVP — Behind the Scenes' },
  ],

  /* ── CAREERS: Hero Images ── */
  careers_hero_images: [
    { url: 'https://readdy.ai/api/search-image?query=large%20diverse%20team%20of%20young%20professionals%20smiling%20together%20in%20modern%20bright%20office%20environment%20casual%20business%20attire%20collaborative%20workspace%20natural%20light%20company%20culture%20photography%20warm%20welcoming%20atmosphere&width=1920&height=800&seq=careers-hero-bg&orientation=landscape', caption: 'Karriere — Hero Team Photo', wide: true },
  ],

  /* ── CAREERS: Team Images ── */
  careers_team_images: [
    { url: 'https://readdy.ai/api/search-image?query=group%20of%20diverse%20colleagues%20collaborating%20in%20modern%20open%20plan%20office%20casual%20professional%20environment%20creative%20workspace%20with%20sticky%20notes%20natural%20light%20friendly%20atmosphere%20authentic%20corporate%20culture%20photography&width=800&height=600&seq=careers-team-1&orientation=landscape', caption: 'Karriere — Office Collaboration' },
    { url: 'https://readdy.ai/api/search-image?query=team%20building%20event%20outdoor%20activity%20group%20of%20colleagues%20enjoying%20casual%20gathering%20in%20park%20setting%20sunshine%20company%20culture%20photography%20authentic%20joyful%20moments%20professional%20team%20bonding&width=800&height=600&seq=careers-team-2&orientation=landscape', caption: 'Karriere — Team Event' },
    { url: 'https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20standing%20desks%20plants%20natural%20light%20collaborative%20areas%20contemporary%20interior%20design%20company%20headquarters%20creative%20professional%20environment&width=800&height=600&seq=careers-team-3&orientation=landscape', caption: 'Karriere — Modern Office' },
  ],

  /* ── CAREERS: Career Path Polaroid Images ── */
  careers_path_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'Sales Family — Polaroid', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Staff Family — Polaroid', wide: true },
  ],

  /* ── CAREERS: Team Events Video URLs (editable in dashboard) ── */
  careers_events_videos: [
    { url: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1', caption: 'Content Creation — YouTube Embed URL (full URL with ?autoplay=1&mute=1&rel=0...)' },
    { url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1', caption: 'Team Events — YouTube Embed URL (full URL with ?autoplay=1&mute=1&rel=0...)' },
    { url: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1', caption: 'Promoter Events — YouTube Embed URL (full URL with ?autoplay=1&mute=1&rel=0...)' },
    { url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1', caption: 'Roadshows & Messen — YouTube Embed URL (full URL with ?autoplay=1&mute=1&rel=0...)' },
  ],

  /* ── CAREERS: Team Events Images ── */
  careers_events_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'Content Creation — Polaroid', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Team Events — Polaroid', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: 'Promoter Events — Polaroid', wide: true },
    { url: '/images/Karriere/IMG_0002.webp', caption: 'Roadshows & Messen — Polaroid', wide: true },
  ],

  /* ── CAREERS: DreamTeam Events Images ── */
  careers_dreamteam_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'Jährlicher Team-Summit', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Quartals-Celebrations', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: 'Training & Workshops', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: 'Team-Ausflüge', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: 'Weihnachtsfeiern', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Behind the Scenes', wide: true },
  ],

  /* ── CAREERS: Geschichten (Stories) Images ── */
  careers_geschichten_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Hassibullah — Gemacht. Gewachsen.' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: 'Andrew — 22 Länder' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Peter — Comeback des Jahres' },
  ],

  /* ── CAREERS: Mitarbeiterstimmen — Sales ── */
  careers_mitarbeiterstimmen_sales_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/6.jpg', caption: 'Lukas M. — Account Manager' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Sofia K. — HR Business Partner' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2022/04/SRT_OPENER.jpg', caption: 'David R. — Regional Lead DACH' },
  ],

  /* ── CAREERS: Mitarbeiterstimmen — Staff ── */
  careers_mitarbeiterstimmen_staff_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Aylin T. — Brand Promoterin' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: 'Marius S. — Event- & Messe-Promoter' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Jana W. — Field Sales Specialist' },
  ],

  /* ── CAREERS: SonicFaces Portrait Images ── */
  careers_sonicfaces_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Tanja K. — Recruiting Lead' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: 'Andrew M. — Event Manager' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Hassibullah A. — Sales Professional' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Peter S. — Regional Lead' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: 'Janina L. — HR Director' },
  ],

  /* ── CAREERS: SonicFamily AI Portrait Images ── */
  /* ── CAREERS: DNA Section Wood Icons (4 items matching DNA_DATA order) ── */
  careers_dna_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20human%20figure%20people%20team%20group%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20human%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-human-dna-01&orientation=squarish', caption: 'Der Mensch — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightning%20bolt%20energy%20power%20drive%20motivation%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20energy%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-energy-dna-02&orientation=squarish', caption: 'Der Antrieb — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20analytics%20data%20graph%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20data%20analytics%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-data-dna-03&orientation=squarish', caption: 'Die Daten — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20wrench%20tool%20gear%20settings%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20tool%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-tool-dna-04&orientation=squarish', caption: 'Das Werkzeug — Wood Icon' },
  ],

  careers_sonicfamily_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20man%20IT%20administrator%20confident%20portrait%20modern%20office%20editorial%20photography%20dark%20background%20natural%20light%20sharp%20commercial%20quality&width=600&height=800&seq=sf-sascha-01&orientation=portrait', caption: 'Sascha M. — Senior IT Admin' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20man%20finance%20controller%20confident%20editorial%20portrait%20office%20modern%20dark%20background%20sharp%20detail%20authoritative%20professional&width=600&height=800&seq=sf-marcel-02&orientation=portrait', caption: 'Marcel W. — Finance Controller' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20man%20event%20logistics%20manager%20confident%20editorial%20portrait%20modern%20office%20dark%20background%20natural%20light%20sharp%20detail&width=600&height=800&seq=sf-andrew-03&orientation=portrait', caption: 'Andrew W. — Event and Logistics Manager' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20woman%20senior%20project%20manager%20confident%20editorial%20portrait%20modern%20office%20dark%20background%20natural%20light%20professional%20polished&width=600&height=800&seq=sf-michelle-04&orientation=portrait', caption: 'Michelle G. — Senior Project Manager' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20manager%20warm%20authentic%20smile%20editorial%20portrait%20modern%20office%20dark%20background%20natural%20light%20professional%20approachable&width=600&height=800&seq=sf-janina-05&orientation=portrait', caption: 'Janina B. — HR Manager' },
  ],

  /* ── KREATION: Team Faces ── */
  kreation_faces_robert: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20man%20creative%20director%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20artistic%20modern%20agency&width=600&height=800&seq=kf-robert-01&orientation=portrait', caption: 'Robert H. — Creative Director' },
  ],
  kreation_faces_inga: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20woman%20content%20head%20creative%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20modern%20agency&width=600&height=800&seq=kf-inga-02&orientation=portrait', caption: 'Inga L. — Head of Content' },
  ],

  /* ── CAREERS: RecruiterCTA Image ── */
  careers_recruitercta_image: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Tanja — Recruiting Team', wide: true },
  ],

  /* ── CAREERS: Stellenangebote Tanja Portrait ── */
  careers_stellenangebote_image: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20recruiter%20warm%20authentic%20smile%20modern%20office%20creative%20agency%20bright%20natural%20environment%20editorial%20portrait%20photography%20natural%20light%20clean%20background%20sharp%20detail%20professional%20yet%20approachable&width=96&height=96&seq=tanja-headshot-stellen&orientation=squarish', caption: 'Tanja — HR Team Portrait' },
  ],

  /* ── CAREERS: Sonic Sales Hero ── */
  careers_sonic_sales_hero: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'Sonic Sales — Hero Background', wide: true },
  ],

  /* ── CAREERS: Sonic Staff Hero ── */
  careers_sonic_staff_hero: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Sonic Staff — Hero Background', wide: true },
  ],

  /* ── CAREERS: HowWeHire — Wood Icons ── */
  careers_howwehire_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20document%20file%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-file-chestnut&orientation=squarish', caption: 'Bewerbungscheck — File Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20video%20chat%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-video-chestnut&orientation=squarish', caption: 'Erstgespräch — Video Call Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20pencil%20edit%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-pencil-chestnut&orientation=squarish', caption: 'Skills-Check — Pencil Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20team%20group%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-team-chestnut&orientation=squarish', caption: 'Team-Interview — Team Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20star%20person%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-leader-chestnut&orientation=squarish', caption: 'Leadership-Gespräch — Star Person Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20handshake%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-handshake-chestnut&orientation=squarish', caption: 'Angebot & Verhandlung — Handshake Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20rocket%20launch%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-rocket-chestnut&orientation=squarish', caption: 'Willkommen — Rocket Icon' },
  ],

  /* ── CAREERS: Pictorial Showcase ── */
  careers_pictorial_showcase: [
    { url: 'https://readdy.ai/api/search-image?query=team%20office%20collaboration%20creative%20agency%20candid%20moment&width=300&height=400&seq=cs-01&orientation=portrait', caption: 'Team Moment 1' },
    { url: 'https://readdy.ai/api/search-image?query=team%20event%20celebration%20creative%20agency%20authentic&width=300&height=400&seq=cs-02&orientation=portrait', caption: 'Team Moment 2' },
    { url: 'https://readdy.ai/api/search-image?query=coworkers%20creative%20agency%20workplace%20authentic&width=300&height=400&seq=cs-03&orientation=portrait', caption: 'Team Moment 3' },
    { url: 'https://readdy.ai/api/search-image?query=team%20meeting%20creative%20agency%20collaboration&width=300&height=400&seq=cs-04&orientation=portrait', caption: 'Team Moment 4' },
    { url: 'https://readdy.ai/api/search-image?query=office%20break%20team%20creative%20agency%20casual&width=300&height=400&seq=cs-05&orientation=portrait', caption: 'Team Moment 5' },
    { url: 'https://readdy.ai/api/search-image?query=team%20outdoor%20company%20event%20creative%20agency&width=300&height=400&seq=cs-06&orientation=portrait', caption: 'Team Moment 6' },
  ],

  /* ── CAREERS: KarriereCulture — Wood Icons ── */
  careers_culture_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20community%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20team%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-team-culture-01&orientation=squarish', caption: 'Gemeinschaftlich — Team Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20heart%20love%20care%20human%20warmth%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20heart%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-heart-culture-02&orientation=squarish', caption: 'Menschlich — Heart Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20arrows%20refresh%20cycle%20flexibility%20adaptability%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20arrows%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-flex-culture-03&orientation=squarish', caption: 'Flexibel — Arrows Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20target%20focus%20simplicity%20clarity%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20target%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-focus-culture-04&orientation=squarish', caption: 'Einfachheit — Target Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20shield%20protection%20responsibility%20accountability%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20shield%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-shield-culture-05&orientation=squarish', caption: 'Verantwortung — Shield Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20building%20office%20workplace%20environment%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20building%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=80&height=80&seq=wood-building-culture-06&orientation=squarish', caption: 'Arbeitsumfeld — Building Icon' },
  ],

  /* ── CAREERS: KarriereHero — Trust Stat Wood Icons ── */
  careers_hero_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20star%20award%20rating%20quality%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20star%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=64&height=64&seq=wood-star-karriere-hero-01&orientation=squarish', caption: 'Kununu Score — Star Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20clock%20time%20tenure%20loyalty%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20clock%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=64&height=64&seq=wood-clock-karriere-hero-02&orientation=squarish', caption: 'Betriebszugehörigkeit — Clock Icon' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20network%20talent%20pool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20people%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background&width=64&height=64&seq=wood-team-karriere-hero-03&orientation=squarish', caption: 'Talente — Team Icon' },
  ],

  /* ── CAREERS: PerksAndBenefits — Section Wood Icons ── */
  careers_perks_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20star%20person%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-sales-chestnut&orientation=squarish', caption: 'Sales Staff — Star Person Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20briefcase%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-briefcase-chestnut&orientation=squarish', caption: 'Interne Staff — Briefcase Icon' },
  ],

  /* ── LEISTUNGEN: Events Images ── */
  leistungen_events_images: [
    { url: 'https://readdy.ai/api/search-image?query=large%20trade%20show%20exhibition%20hall%20with%20impressive%20branded%20booth%20multiple%20visitors%20engaging%20with%20staff%20professional%20event%20setup%20bright%20lighting%20crowd%20of%20attendees%20modern%20Messe%20environment&width=1200&height=800&seq=leist-events-1&orientation=landscape', caption: 'Events — Trade Show Booth', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=corporate%20event%20setup%20with%20branded%20stage%20presentation%20screen%20audience%20seating%20professional%20event%20production%20modern%20conference%20venue%20atmospheric%20lighting&width=800&height=600&seq=leist-events-2&orientation=landscape', caption: 'Events — Corporate Stage' },
  ],

  /* ── LEISTUNGEN: Kreation Images ── */
  leistungen_kreation_images: [
    { url: 'https://readdy.ai/api/search-image?query=creative%20studio%20with%20designers%20working%20on%20brand%20content%20multiple%20screens%20showing%20graphic%20design%20video%20editing%20and%20photography%20professional%20creative%20agency%20workspace%20modern%20equipment%20natural%20light&width=1200&height=800&seq=leist-kreation-1&orientation=landscape', caption: 'Kreation — Creative Studio', wide: true },
  ],

  /* ── LEISTUNGEN: POS Images ── */
  leistungen_pos_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20retail%20point%20of%20sale%20display%20with%20branded%20product%20showcase%20interactive%20elements%20clean%20merchandising%20professional%20retail%20environment%20bright%20store%20lighting%20contemporary%20design&width=1200&height=800&seq=leist-pos-1&orientation=landscape', caption: 'POS — Retail Display', wide: true },
  ],

  /* ── LEISTUNGEN: Staff Images ── */
  leistungen_staff_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20brand%20ambassador%20team%20in%20matching%20uniforms%20standing%20confidently%20in%20retail%20environment%20diverse%20group%20of%20service%20staff%20ready%20for%20customer%20engagement%20corporate%20photography%20clean%20professional%20look&width=1200&height=800&seq=leist-staff-1&orientation=landscape', caption: 'Staff — Brand Ambassador Team', wide: true },
  ],

  /* ── LEISTUNGEN: Video Images ── */
  leistungen_video_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20video%20production%20setup%20with%20camera%20crew%20lighting%20equipment%20and%20director%20on%20set%20modern%20commercial%20filming%20environment%20creative%20production%20team%20in%20action%20cinematic%20atmosphere&width=1200&height=800&seq=leist-video-1&orientation=landscape', caption: 'Video — Production Set', wide: true },
  ],

  /* ── SONIC REELS: Virtual ── */
  reels_2015_2019: [
    { url: 'https://readdy.ai/api/search-image?query=cinematic%20wide%20Samsung%20Galaxy%20smartphone%20launch%20event%20retail%20activation%202016%20brand%20specialists%20demonstrating%20phone%20features%20to%20groups%20of%20customers%20premium%20display%20environment%20modern%20electronics%20store%20high%20contrast%20photography%20vibrant%20brand%20colors%20commercial&width=1200&height=800&seq=sonic-gallery-2015-1&orientation=landscape', caption: 'Samsung Galaxy S7 launch activation, 2016', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=brand%20training%20academy%20large%20conference%20room%2030%20uniformed%20brand%20ambassadors%20seated%20attentive%20presentation%20on%20screen%20Sonic%20group%20branded%20materials%20professional%20corporate%20photography%20daytime%20natural%20light%20Germany%202017&width=600&height=800&seq=sonic-gallery-2015-2&orientation=portrait', caption: 'Sonic Training Academy launch, 2017' },
    { url: 'https://readdy.ai/api/search-image?query=Philips%20product%20launch%20retail%20event%20multiple%20promotion%20specialists%20demonstrating%20small%20domestic%20appliances%20in%20modern%20department%20store%20Austria%20Vienna%20display%20stands%20clean%20editorial%20photography%202017%20warm%20retail%20lighting%20professional&width=600&height=800&seq=sonic-gallery-2015-3&orientation=portrait', caption: 'Philips DACH rollout — Vienna, 2017' },
    { url: 'https://readdy.ai/api/search-image?query=aerial%20drone%20view%20of%20large%20consumer%20electronics%20trade%20fair%20IFA%20Berlin%202018%20massive%20exhibition%20hall%20Sonic%20branded%20booths%20visible%20brand%20ambassador%20teams%20in%20action%20birds%20eye%20perspective%20editorial%20commercial%20photography%20wide%20dramatic&width=1200&height=700&seq=sonic-gallery-2015-4&orientation=landscape', caption: 'IFA Berlin — largest activation to date, 2018', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Dyson%20luxury%20product%20demonstration%20zone%20premium%20retail%20Swiss%20department%20store%20Geneva%20brand%20specialist%20woman%20showing%20Dyson%20hairdryer%20to%20affluent%20customer%20clean%20minimalist%20display%202018%20elegant%20lifestyle%20photography&width=600&height=600&seq=sonic-gallery-2015-5&orientation=squarish', caption: 'Dyson luxury retail — Zurich, 2018' },
    { url: 'https://readdy.ai/api/search-image?query=milestone%20celebration%20dinner%20Sonic%20leadership%20team%20at%20restaurant%20Cologne%202019%20professional%20candid%20photography%20warm%20festive%20atmosphere%20team%20around%20table%20smiling%20glasses%20raised%20achievement%20corporate%20event%20photography&width=600&height=600&seq=sonic-gallery-2015-6&orientation=squarish', caption: '500 ambassadors milestone dinner, 2019' },
  ],
  reels_2024: [
    { url: 'https://readdy.ai/api/search-image?query=SRT%20Sonic%20Retail%20Technology%20platform%20launch%20event%202024%20sleek%20modern%20conference%20room%20Cologne%20group%20of%20clients%20and%20Sonic%20team%20around%20large%20table%20with%20glowing%20screens%20presenting%20live%20retail%20analytics%20system%20premium%20corporate%20editorial%20photography%20warm%20dramatic&width=1200&height=800&seq=sonic-gallery-2024-1&orientation=landscape', caption: 'SRT platform commercial launch event, 2024', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Garmin%20brand%20activation%20specialist%20demonstrating%20premium%20smartwatch%20in%20MediaMarkt%202024%20modern%20clean%20retail%20stand%20high-resolution%20product%20display%20digital%20menu%20boards%20professional%20commercial%20photography%20confident%20skilled%20ambassador%20close%20up&width=600&height=800&seq=sonic-gallery-2024-2&orientation=portrait', caption: 'Garmin 122-location network launch, 2024' },
    { url: 'https://readdy.ai/api/search-image?query=Philips%20market%20research%20presentation%20Sonic%20leadership%20team%20applauding%20number%20one%20market%20position%20Germany%20chart%20showing%20market%20share%20growth%20dark%20premium%20boardroom%20editorial%20photography%20achievement%20celebration%202024%20dramatic&width=600&height=800&seq=sonic-gallery-2024-3&orientation=portrait', caption: 'Philips secures #1 in Germany, 2024' },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20brand%20ambassador%20team%20working%20IFA%20Berlin%202024%20latest%20technology%20pavilion%20massive%20Samsung%20and%20Bosch%20zones%20data%20tracking%20devices%20in%20hand%20real-time%20analytics%20cinematic%20wide%20angle%20photography%20electric%20atmosphere%20professional%20showroom&width=1200&height=700&seq=sonic-gallery-2024-4&orientation=landscape', caption: 'IFA Berlin — SRT-tracked activation, 2024', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20company%20milestone%20photograph%20senior%20management%20Cologne%20rooftop%20golden%20hour%20professional%20achievement%20celebration%20celebratory%20moment%202024%20premium%20lifestyle%20corporate%20photography%20warm%20tones%20confident%20relaxed%20leadership%20team&width=600&height=600&seq=sonic-gallery-2024-5&orientation=squarish', caption: '€2B+ lifetime sales milestone, 2024' },
    { url: 'https://readdy.ai/api/search-image?query=close%20up%20of%20Sonic%20SRT%20mobile%20app%20showing%20real-time%20conversion%20rate%20per%20store%20location%20heatmap%20of%20Germany%20with%20glowing%20dots%20representing%20active%20promoters%20clean%20UI%20design%20dark%20mode%20professional%20tech%20product%20photography%202024&width=600&height=600&seq=sonic-gallery-2024-6&orientation=squarish', caption: 'SRT live performance map — DACH coverage' },
  ],
  reels_2025: [
    { url: 'https://readdy.ai/api/search-image?query=massive%20Sonic%20brand%20promoters%20team%20photo%20outdoors%202025%20Germany%20hundreds%20of%20uniformed%20ambassadors%20in%20lime%20green%20and%20black%20colours%20arranged%20in%20formation%20corporate%20wide%20shot%20editorial%20photography%20proud%20unified%20team%20achievement&width=1200&height=800&seq=sonic-gallery-2025-1&orientation=landscape', caption: 'Sonic team — 2,000+ active ambassadors, 2025', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Samsung%20latest%20flagship%20smartphone%20premium%20launch%202025%20MediaMarkt%20Germany%20Sonic%20specialist%20conducting%20elegant%20demonstration%20with%20latest%20Galaxy%20device%20premium%20retail%20experience%20clean%20modern%20display%20editorial%20commercial%20photography%20high%20production%20value&width=600&height=800&seq=sonic-gallery-2025-2&orientation=portrait', caption: 'Samsung Galaxy flagship launch, 2025' },
    { url: 'https://readdy.ai/api/search-image?query=Philips%20personal%20care%20premium%20product%20launch%20in%20Galeria%20Kaufhof%202025%20elegant%20professional%20brand%20specialist%20demonstrating%20luxury%20grooming%20products%20to%20interested%20customers%20premium%20retail%20atmosphere%20clean%20minimalist%20display%20editorial%20photography&width=600&height=800&seq=sonic-gallery-2025-3&orientation=portrait', caption: 'Philips luxury activation — Galeria, 2025' },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20promotional%20agency%20awards%20ceremony%20gala%202025%20Cologne%20prestigious%20event%20hall%20champagne%20glasses%20stage%20multiple%20industry%20awards%20displayed%20lighting%20dramatic%20editorial%20photography%20achievement%20celebration%20luxury%20ambience&width=1200&height=700&seq=sonic-gallery-2025-4&orientation=landscape', caption: 'Sonic wins POPAI Best Agency — Germany, 2025', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20new%20modern%20headquarters%20interior%202025%20Cologne%20open%20plan%20workspace%20large%20windows%20city%20view%20brand%20ambassadors%20and%20management%20in%20bright%20collaborative%20space%20premium%20interior%20design%20editorial%20corporate%20photography%20warm%20contemporary&width=600&height=600&seq=sonic-gallery-2025-5&orientation=squarish', caption: 'New HQ — Cologne, 2025' },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20team%20celebration%20rooftop%20party%20night%20sky%20Cologne%20skyline%20bottles%20of%20champagne%20popping%20confetti%20large%20group%20candid%20photojournalistic%20style%20vibrant%20celebration%20energy%202025%20authentic%20joy&width=600&height=600&seq=sonic-gallery-2025-6&orientation=squarish', caption: 'Year-end celebration, December 2025' },
  ],
  reels_2026: [
    { url: 'https://readdy.ai/api/search-image?query=bold%20visionary%20architectural%20concept%20photograph%20of%20futuristic%20retail%20experience%20zone%20with%20advanced%20holographic%20product%20display%20digital%20signage%20ambient%20lighting%20premium%20brand%20activation%20space%20ultramodern%20design%20aesthetic%20editorial%20photography%20aspirational%202026%20forward-looking%20technology%20and%20human%20connection&width=1920&height=1080&seq=sonic-reels-hero-2026&orientation=landscape', caption: 'Next chapter: Paris expansion concept, 2026', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=young%20Sonic%20brand%20ambassador%20woman%20using%20advanced%20augmented%20reality%20product%20demonstration%20glasses%20in%20modern%20retail%20environment%20future%20technology%20premium%20aspirational%20editorial%20photography%202026%20confident%20forward-looking%20warm%20lifestyle%20commercial&width=800&height=600&seq=sonic-reels-accent-2026&orientation=landscape', caption: 'AR-enhanced product demonstration concept' },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20promotional%20company%20strategic%20planning%20session%202026%20senior%20team%20around%20large%20table%20with%20European%20expansion%20map%20holographic%20projection%20concept%20visual%20ambitious%20professional%20boardroom%20atmosphere%20premium%20editorial%20photography%20warm%20light&width=600&height=800&seq=sonic-gallery-2026-3&orientation=portrait', caption: 'European expansion strategy — 2026' },
    { url: 'https://readdy.ai/api/search-image?query=futuristic%20concept%20of%20brand%20ambassador%20using%20mixed%20reality%20headset%20to%20demonstrate%20product%20features%20to%20customer%20in%20sleek%20retail%20store%20digital%20product%20exploded%20view%20visible%20in%20AR%20space%20aspirational%20editorial%20commercial%20photography%202026&width=1200&height=700&seq=sonic-gallery-2026-4&orientation=landscape', caption: 'AR-enhanced product demonstration concept', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=Sonic%20international%20team%20photo%20diverse%20promotional%20specialists%20from%20Germany%20France%20Spain%20Netherlands%20smiling%20together%20modern%20glass%20office%20building%20entrance%20editorial%20corporate%20photography%202026%20diverse%20professional%20team%20European%20expansion&width=600&height=600&seq=sonic-gallery-2026-5&orientation=squarish', caption: 'First international ambassador cohort' },
    { url: 'https://readdy.ai/api/search-image?query=close-up%20of%20Sonic%20company%20mission%20statement%20printed%20elegantly%20on%20dark%20wall%20of%20modern%20Cologne%20headquarters%20with%20subtle%20lime%20yellow%20accent%20light%20warm%20bokeh%20background%20premium%20interior%20brand%20photography%202026&width=600&height=600&seq=sonic-gallery-2026-6&orientation=squarish', caption: 'The mission continues.' },
  ],

  /* ── HOME: TrustStrip Brand Logos ── */
  home_truststrip_logos: [
    { url: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', caption: 'Philips' },
    { url: 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Rowenta' },
    { url: 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Krups' },
    { url: 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773621883167', caption: 'Nexaro' },
    { url: 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Vorwerk' },
    { url: 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Canon' },
    { url: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Garmin' },
    { url: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: "L'Oréal" },
    { url: 'https://cdn.brandfetch.io/idMbGUGol-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667607407794', caption: 'Samsung' },
    { url: 'https://cdn.brandfetch.io/bosch.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Bosch' },
    { url: 'https://cdn.brandfetch.io/dyson.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Dyson' },
    { url: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Groupe SEB' },
  ],

  /* ── HOME: BrandIntro Images ── */
  home_brandintro_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2024-qlkw343jjajbp7yuruxndjxesrz4qldhpslvbjoqpy.jpg', caption: 'Brand Intro — 2024' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2023-qlkw335pcgi1dm07xcj0t25y7e3riw9rdnydu9q4x0.jpg', caption: 'Brand Intro — 2023' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/2022-qlkw335pcgi1dm07xcj0t25y7e3riw9rdnydu9q4x0.jpg', caption: 'Brand Intro — 2022' },
  ],

  /* ── HOME: DualCTA Backgrounds ── */
  home_dualcta_backgrounds: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20business%20strategy%20meeting%20executive%20team%20modern%20office%20dark%20interior%20sleek%20contemporary%20workspace%20premium%20corporate%20environment%20dramatic%20directional%20lighting%20deep%20shadows%20rich%20textures%20polished%20surfaces%20ambitious%20businesspeople&width=900&height=700&seq=dualcta-biz-bg-v3&orientation=landscape', caption: 'Dual CTA — Business Background' },
    { url: 'https://readdy.ai/api/search-image?query=ambitious%20young%20professionals%20field%20sales%20promotion%20team%20vibrant%20energy%20modern%20retail%20environment%20confident%20diverse%20group%20dynamic%20brand%20ambassadors%20stylish%20contemporary%20setting%20dramatic%20warm%20directional%20lighting%20beautiful%20people%20community%20motivated%20career%20growth&width=900&height=700&seq=dualcta-talent-bg-v3&orientation=landscape', caption: 'Dual CTA — Talent Background' },
  ],

  /* ── HOME: SonicDNA Background ── */
  home_sonicdna_background: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20open%20plan%20corporate%20office%20interior%20with%20large%20windows%20natural%20light%20bright%20workspace%20desks%20meeting%20areas%20clean%20minimal%20professional%20environment%20wide%20angle%20architectural%20photography&width=1440&height=600&seq=dna-office-bg-v3&orientation=landscape', caption: 'SonicDNA — Office Background', wide: true },
  ],

  /* ── HOME: OfficeVisit Image ── */
  home_officevisit_image: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20creative%20office%20space%20with%20team%20members%20collaborating%20in%20bright%20open%20workspace%20with%20coffee%20area%20and%20welcoming%20atmosphere%20professional%20business%20environment&width=800&height=1000&seq=office-visit-main&orientation=portrait', caption: 'Office Visit — Main Image' },
  ],

  /* ── TEAM: Hero Images ── */
  team_hero_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20team%20collaboration%20in%20modern%20office%20workspace%20diverse%20group%20of%20sales%20consultants%20working%20together%20bright%20natural%20lighting%20contemporary%20interior%20design%20teamwork%20atmosphere%20business%20environment%20productive%20meeting%20space&width=1920&height=1080&seq=team-hero-dark-bg&orientation=landscape', caption: 'Team — Hero Background', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20friendly%20sales%20consultant%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-1&orientation=squarish', caption: 'Team — Member Photo 1' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20brand%20ambassador%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-2&orientation=squarish', caption: 'Team — Member Photo 2' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20enthusiastic%20retail%20specialist%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-3&orientation=squarish', caption: 'Team — Member Photo 3' },
  ],

  /* ── TEAM: Core Values Images ── */
  team_corevalues_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/2.jpg', caption: 'Core Values — Mensch' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/3.jpg', caption: 'Core Values — Motivation' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/4.jpg', caption: 'Core Values — Daten' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/5.jpg', caption: 'Core Values — Werkzeug' },
  ],

  /* ── ABOUT: SonicReelsEmbed Hero & Accent Images ── */
  about_sonicreels_hero_accent: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: '2007–2015 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: '2007–2015 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg', caption: '2015–2019 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: '2015–2019 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/6-1-1024x570.jpg', caption: '2019–2022 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/5-1-1024x576.jpg', caption: '2019–2022 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: '2022–2023 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', caption: '2022–2023 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2022/04/SRT_OPENER.jpg', caption: '2024 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: '2024 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: '2025 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: '2025 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: '2026 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', caption: '2026 — Accent' },
  ],

  /* ── COMMON: ClientProof Logos ── */
  common_clientproof_logos: [
    { url: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Garmin' },
    { url: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Groupe SEB' },
    { url: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', caption: 'Philips' },
    { url: 'https://cdn.brandfetch.io/idaYSyWs1H/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078167864', caption: 'Samsung' },
    { url: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: "L'Oréal" },
    { url: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'WMF' },
  ],

  /* ── COMMON: Logos (Navigation + Footer) ── */
  common_logos: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png', caption: 'Sonic Group — Main Logo' },
  ],

  /* ── INDUSTRIES: Hero ── */
  industries_hero_bg: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20consumer%20electronics%20retail%20store%20interior%20premium%20product%20displays%20smartphones%20smartwatches%20home%20appliances%20professional%20brand%20activation%20team%20engaging%20customers%20dramatic%20overhead%20lighting%20cinematic%20dark%20moody%20atmosphere%20wide%20angle&width=1920&height=1080&seq=industries-hero-v2&orientation=landscape', caption: 'Industries — Hero Background', wide: true },
  ],

  /* ── INDUSTRIES: Grid Images ── */
  industries_grid_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20consumer%20electronics%20display%20with%20smartphones%20smartwatches%20and%20audio%20devices%20in%20premium%20retail%20setting%20clean%20professional%20lighting&width=800&height=600&seq=industry-electronics&orientation=landscape', caption: 'Consumer Electronics' },
    { url: 'https://readdy.ai/api/search-image?query=premium%20kitchen%20appliances%20and%20home%20electronics%20displayed%20in%20modern%20showroom%20with%20clean%20white%20background%20professional%20product%20photography&width=800&height=600&seq=industry-appliances&orientation=landscape', caption: 'Home Appliances' },
    { url: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20and%20cosmetics%20products%20elegantly%20displayed%20in%20premium%20retail%20environment%20with%20soft%20lighting%20and%20clean%20aesthetic&width=800&height=600&seq=industry-beauty&orientation=landscape', caption: 'Beauty & Cosmetics' },
    { url: 'https://readdy.ai/api/search-image?query=wellness%20and%20lifestyle%20products%20including%20fitness%20equipment%20and%20premium%20lifestyle%20brands%20in%20modern%20retail%20space%20bright%20clean%20environment&width=800&height=600&seq=industry-lifestyle&orientation=landscape', caption: 'Lifestyle & Wellness' },
    { url: 'https://readdy.ai/api/search-image?query=automotive%20navigation%20systems%20and%20car%20accessories%20displayed%20in%20modern%20retail%20setting%20with%20professional%20lighting%20and%20clean%20background&width=800&height=600&seq=industry-automotive&orientation=landscape', caption: 'Automotive' },
    { url: 'https://readdy.ai/api/search-image?query=entertainment%20and%20streaming%20service%20promotional%20display%20in%20modern%20retail%20environment%20with%20screens%20and%20media%20equipment%20clean%20professional%20setup&width=800&height=600&seq=industry-entertainment&orientation=landscape', caption: 'Entertainment & Media' },
  ],

  /* ── SERVICES: Content Studio ── */
  services_content_studio_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20video%20production%20studio%20with%20modern%20camera%20equipment%20lighting%20rigs%20creative%20workspace%20dark%20moody%20cinematic%20atmosphere%20high%20end%20photography%20studio%20with%20product%20display%20setup%20dramatic%20studio%20lighting%20premium%20production%20environment%20wide%20angle&width=1920&height=1080&seq=contentstudio-hero-v3&orientation=landscape', caption: 'Content Studio — Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20content%20studio%20consultation%20meeting%20with%20creative%20team%20discussing%20brand%20strategy%20in%20modern%20bright%20office%20space%20with%20production%20equipment%20visible%20in%20background&width=800&height=800&seq=consultation001&orientation=squarish', caption: 'Content Studio — Consultation' },
  ],

  /* ── SERVICES: Events ── */
  services_events_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20trade%20show%20exhibition%20booth%20setup%20modern%20corporate%20event%20space%20with%20dramatic%20lighting%20branded%20displays%20promotional%20staff%20engaging%20visitors%20dark%20sophisticated%20atmosphere%20business%20conference%20venue%20elegant%20staging%20wide%20angle%20cinematic&width=1920&height=1080&seq=events-hero-v3&orientation=landscape', caption: 'Events — Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20event%20planning%20consultation%20meeting%20with%20creative%20team%20discussing%20brand%20activation%20strategy%20in%20modern%20bright%20office%20space&width=800&height=800&seq=eventconsult001&orientation=squarish', caption: 'Events — Consultation' },
  ],

  /* ── SERVICES: Market Entry ── */
  services_market_entry_images: [
    { url: 'https://readdy.ai/api/search-image?query=dynamic%20brand%20launch%20event%20at%20modern%20retail%20store%20multiple%20brand%20ambassadors%20engaging%20customers%20with%20new%20product%20displays%20vibrant%20energy%20professional%20activation%20team%20in%20action%20contemporary%20retail%20environment%20dramatic%20lighting%20cinematic%20atmosphere&width=1920&height=800&seq=hero-mkt-expanded-v2&orientation=landscape', caption: 'Market Entry — Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20market%20entry%20consultation%20meeting%20with%20business%20team%20discussing%20international%20expansion%20strategy%20in%20modern%20bright%20office%20space&width=800&height=800&seq=marketconsult001&orientation=squarish', caption: 'Market Entry — Consultation' },
  ],

  /* ── SERVICES: Retail POS ── */
  services_retail_pos_images: [
    { url: 'https://readdy.ai/api/search-image?query=confident%20field%20force%20sales%20team%20at%20retail%20point%20of%20sale%20professional%20promoters%20at%20product%20display%20stands%20busy%20electronics%20store%20customers%20engaging%20with%20products%20high%20energy%20retail%20activation%20dramatic%20overhead%20lighting%20modern%20store%20environment%20wide%20angle%20cinematic&width=1920&height=1080&seq=retailpos-hero-v3&orientation=landscape', caption: 'Retail POS — Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20retail%20pos%20consultation%20meeting%20with%20team%20discussing%20display%20strategy%20and%20merchandising%20in%20modern%20bright%20office%20space&width=800&height=800&seq=posconsult001&orientation=squarish', caption: 'Retail POS — Consultation' },
  ],

  /* ── SERVICES: Staffing ── */
  services_staffing_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20brand%20ambassador%20team%20at%20retail%20store%20energetic%20motivated%20sales%20promoters%20group%20photo%20modern%20retail%20environment%20corporate%20team%20portrait%20diverse%20workforce%20engaged%20smiling%20confident%20professional%20staffing%20agency%20wide%20angle%20cinematic%20lighting&width=1920&height=1080&seq=staffing-hero-v3&orientation=landscape', caption: 'Staffing — Hero', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=professional%20staffing%20consultation%20meeting%20with%20team%20discussing%20brand%20ambassador%20recruitment%20strategy%20in%20modern%20bright%20office%20space&width=800&height=800&seq=staffconsult001&orientation=squarish', caption: 'Staffing — Consultation' },
  ],

  /* ── BLOG ── */
  blog_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Blog — Featured Image' },
  ],

  /* ── RATGEBER ── */
  ratgeber_hero: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20knowledge%20hub%20content%20library%20concept%20with%20organized%20floating%20article%20cards%20abstract%20representation%20of%20marketing%20expertise%20and%20strategic%20knowledge%20warm%20ambient%20lighting%20with%20subtle%20lime%20green%20accent%20highlights%20clean%20minimalist%20architectural%20space%20professional%20editorial%20atmosphere%20knowledge%20management%20visualization&width=1920&height=1080&seq=ratgeber-hub-hero-v1&orientation=landscape', caption: 'Ratgeber — Hero Background', wide: true },
  ],

  /* ── JOBS ── */
  jobs_hero: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20corporate%20office%20interior%20with%20open%20floor%20plan%20collaborative%20workspace%20German%20company%20bright%20natural%20light%20employees%20working%20together%20contemporary%20professional%20environment%20career%20opportunity%20growth&width=1920&height=800&seq=jobs-hero-bg-sonic-v1&orientation=landscape', caption: 'Jobs — Hero Background', wide: true },
  ],

  /* ── KONTAKT ── */
  kontakt_hero: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20professional%20business%20contact%20concept%20with%20abstract%20geometric%20network%20nodes%20connected%20by%20glowing%20lime%20green%20lines%20on%20dark%20sophisticated%20background%20representing%20communication%20connection%20and%20reach%20corporate%20minimal%20aesthetic%20with%20subtle%20grid%20pattern%20warm%20amber%20accent%20highlights%20premium%20dark%20atmosphere%20editorial%20photography&width=1920&height=1080&seq=kontakt-hero-bg-v1&orientation=landscape', caption: 'Kontakt — Hero Background', wide: true },
  ],

  /* ── LEISTUNGEN: Talentpool ── */
  leistungen_talentpool_images: [
    { url: 'https://readdy.ai/api/search-image?query=diverse%20crowd%20of%20talented%20young%20professionals%20smiling%20confident%20group%20photo%20modern%20corporate%20environment%20bright%20office%20natural%20light%20motivated%20individuals%20career%20ready%20brand%20ambassadors%20promotional%20staff%20pool%20recruitment%20concept%20professional%20photography&width=1200&height=800&seq=leist-talentpool-1&orientation=landscape', caption: 'Talentpool — Group Hero', wide: true },
  ],

  /* ── LEISTUNGEN: Warehouse & Logistik ── */
  leistungen_warehouse_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20clean%20warehouse%20logistics%20facility%20with%20organized%20shelving%20units%20promotional%20materials%20and%20retail%20display%20equipment%20neatly%20stored%20professional%20inventory%20management%20bright%20lighting%20industrial%20efficiency%20clean%20organized%20workspace%20wide%20angle&width=1200&height=800&seq=leist-warehouse-1&orientation=landscape', caption: 'Warehouse & Logistik — Facility', wide: true },
  ],

  /* ── LEISTUNGEN: Warehouse — Full Service Photo ── */
  leistungen_warehouse_fullservice_photo: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20clean%20warehouse%20interior%20with%20organized%20shelving%20racks%20filled%20with%20branded%20promotional%20materials%20POS%20displays%20and%20event%20equipment%20professional%20logistics%20facility%20bright%20industrial%20lighting%20wide%20angle%20view%20showcasing%20full%20service%20storage%20capabilities&width=800&height=600&seq=warehouse-fullservice-01&orientation=landscape', caption: 'Warehouse Full Service — Overview' },
  ],

  /* ── LEISTUNGEN: Forecasting ── */
  leistungen_forecasting_images: [
    { url: 'https://readdy.ai/api/search-image?query=modern%20business%20intelligence%20dashboard%20showing%20sales%20forecasting%20predictive%20analytics%20data%20visualization%20on%20large%20screen%20professional%20data%20science%20team%20analyzing%20market%20trends%20modern%20office%20clean%20design%20charts%20and%20graphs%20future%20projections&width=1200&height=800&seq=leist-forecasting-1&orientation=landscape', caption: 'Forecasting — Dashboard', wide: true },
  ],

  /* ── LEISTUNGEN: Overview — ServiceGrid BG Images ── */
  leistungen_servicegrid_bg: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: 'Daten & Software — SRT Dashboard', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Personal & Staffing — Team', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg', caption: 'POS & Live Video — LVP Studio', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg', caption: 'Events & Logistik — Warehouse', wide: true },
  ],

  /* ── LEISTUNGEN: Events & Messen — Process Images ── */
  leistungen_events_process_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20business%20meeting%20briefing%20session%20two%20people%20discussing%20event%20planning%20documents%20on%20modern%20wooden%20desk%20warm%20lighting%20corporate%20office%20clean%20minimalist%20aesthetic%20editorial%20photography&width=320&height=240&seq=events-ablauf-01-v2&orientation=landscape', caption: 'Schritt 01 — Event-/Messe-Briefing' },
    { url: 'https://readdy.ai/api/search-image?query=creative%20concept%20development%20moodboard%20design%20sketches%20event%20planning%20colorful%20sticky%20notes%20inspiration%20board%20modern%20studio%20workspace%20warm%20ambient%20lighting%20artistic%20editorial%20photography&width=320&height=240&seq=events-ablauf-02-v2&orientation=landscape', caption: 'Schritt 02 — Konzeptentwicklung' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20team%20staff%20selection%20interview%20hiring%20diverse%20group%20of%20people%20in%20modern%20office%20setting%20training%20session%20warm%20lighting%20corporate%20environment%20clean%20minimalist%20photography&width=320&height=240&seq=events-ablauf-03-v2&orientation=landscape', caption: 'Schritt 03 — Personal-Auswahl' },
    { url: 'https://readdy.ai/api/search-image?query=event%20production%20preparation%20booth%20construction%20setup%20warehouse%20logistics%20workers%20assembling%20modular%20displays%20tools%20equipment%20modern%20industrial%20space%20warm%20lighting%20editorial%20documentary%20photography&width=320&height=240&seq=events-ablauf-04-v2&orientation=landscape', caption: 'Schritt 04 — Produktion & Vorbereitung' },
    { url: 'https://readdy.ai/api/search-image?query=successful%20trade%20show%20event%20exhibition%20booth%20crowd%20engagement%20brand%20activation%20live%20presentation%20professional%20staff%20interacting%20with%20visitors%20modern%20exhibition%20hall%20warm%20ambient%20lighting%20editorial%20style%20photography&width=320&height=240&seq=events-ablauf-05-v2&orientation=landscape', caption: 'Schritt 05 — Veranstaltung' },
    { url: 'https://readdy.ai/api/search-image?query=data%20analytics%20reporting%20dashboard%20on%20laptop%20screen%20charts%20graphs%20KPIs%20modern%20office%20workspace%20warm%20desk%20lighting%20professional%20business%20intelligence%20clean%20minimalist%20photography&width=320&height=240&seq=events-ablauf-06-v2&orientation=landscape', caption: 'Schritt 06 — Reporting' },
  ],

  /* ── LEISTUNGEN: Events & Messen — Showcase Tabs ── */
  leistungen_events_showcase_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Events — Brand Activation' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Events — Event-Dokumentation' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: 'Events — Roadshow & Festival' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Events — Händler-Event' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: 'Messen — Messebau Premium' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', caption: 'Messen — Interaktive Demos' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LUCID01.jpg', caption: 'Messen — Produktpräsentation' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'Messen — Messe-Stand Konzept' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg', caption: 'Fahrzeuge — Logistik & Aufbau' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Fahrzeuge — Eventcontainer' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: 'Fahrzeuge — Sonic Campus Aerial' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/5.jpg', caption: 'Fahrzeuge — Promotionfahrzeug' },
  ],

  /* ── LEISTUNGEN: Forecasting — How It Works ── */
  leistungen_forecasting_process_images: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20data%20analyst%20reviewing%20sales%20data%20spreadsheets%20charts%20on%20large%20monitor%20screen%20modern%20office%20warm%20desk%20lighting%20business%20intelligence%20analytics%20clean%20minimalist%20workspace%20editorial%20photography&width=600&height=400&seq=forecast-how-01-v1&orientation=landscape', caption: 'Schritt 01 — Datenbasis aufbauen', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=AI%20machine%20learning%20model%20calibration%20algorithm%20tuning%20data%20science%20dashboard%20with%20prediction%20graphs%20modern%20dark%20interface%20beautiful%20visualization%20warm%20ambient%20light%20professional%20tech%20workspace&width=600&height=400&seq=forecast-how-02-v1&orientation=landscape', caption: 'Schritt 02 — Modell kalibrieren', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=detailed%20sales%20forecast%20report%20dashboard%20with%20charts%20confidence%20intervals%20scenario%20analysis%20beautiful%20modern%20data%20visualization%20on%20screen%20professional%20business%20presentation%20warm%20lighting%20clean%20minimalist%20design&width=600&height=400&seq=forecast-how-03-v1&orientation=landscape', caption: 'Schritt 03 — Prognose ausgeben', wide: true },
    { url: 'https://readdy.ai/api/search-image?query=real%20time%20live%20data%20comparison%20dashboard%20tracking%20actual%20versus%20predicted%20results%20side%20by%20side%20charts%20glowing%20green%20positive%20indicators%20modern%20business%20intelligence%20interface%20warm%20ambient%20lighting&width=600&height=400&seq=forecast-how-04-v1&orientation=landscape', caption: 'Schritt 04 — Live abgleichen', wide: true },
  ],

  /* ── LEISTUNGEN: Kreation & Content — Carousel Tiles — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_carousel_images: [],

  /* ── LEISTUNGEN: Kreation & Content — Showcase Grid — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_showcase_images: [],

  /* ── LEISTUNGEN: Kreation Showcase — Secondary Auto-Rotate Images — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_showcase_secondary_konzeption: [],
  leistungen_kreation_showcase_secondary_content: [],
  leistungen_kreation_showcase_secondary_cgi: [],
  leistungen_kreation_showcase_secondary_innovation: [],
  leistungen_kreation_showcase_secondary_ci: [],
  leistungen_kreation_showcase_secondary_layout: [],
  leistungen_kreation_showcase_secondary_pos: [],

  /* ── LEISTUNGEN: Kreation Showcase — Before/After Slider — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_before_after: [],

  /* ── LEISTUNGEN: POS Full Service — Asset Categories ── */
  leistungen_pos_assets_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'Gedrucktes & Gebautes 1' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', caption: 'Gedrucktes & Gebautes 2' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg', caption: 'Gedrucktes & Gebautes 3' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2a.jpg', caption: 'Gedrucktes & Gebautes 4' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg', caption: 'E-Commerce Marketing 1' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/TPV.jpg', caption: 'E-Commerce Marketing 2' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2b.jpg', caption: 'E-Commerce Marketing 3' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2f.jpg', caption: 'E-Commerce Marketing 4' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: 'Möbelsysteme & Shop-in-Shop 1' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/10-1.jpg', caption: 'Möbelsysteme & Shop-in-Shop 2' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: 'Möbelsysteme & Shop-in-Shop 3' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: 'Möbelsysteme & Shop-in-Shop 4' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg', caption: 'Retail-Video 1' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/5-1-1024x576.jpg', caption: 'Retail-Video 2' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/2-1-1024x706.jpg', caption: 'Retail-Video 3' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/shower.jpg', caption: 'Retail-Video 4' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/03/OPPOX5Pro_unboxing.jpg', caption: 'Give-aways 1' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/2e.jpg', caption: 'Give-aways 2' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/1_NEU.jpg', caption: 'Give-aways 3' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/4.jpg', caption: 'Give-aways 4' },
  ],

  /* ── LEISTUNGEN: POS Full Service — Process Steps ── */
  leistungen_pos_process_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/3.jpg', caption: 'Schritt 01 — Bedarfsanalyse' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/2.jpg', caption: 'Schritt 02 — Konzeptentwicklung' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'Schritt 03 — Produktion' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Schritt 04 — Personal-Recruiting' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Schritt 05 — Rollout' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: 'Schritt 06 — Monitoring & Reporting' },
  ],

  /* ── LEISTUNGEN: Staff as a Service — S.O.C.K.S. ── */
  leistungen_staff_socks_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: 'S — Selection' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'O — Orientation' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/6.jpg', caption: 'C — Condition' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'K — Knowledge' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/6-1-1024x570.jpg', caption: 'S — Sellout' },
  ],

  /* ── LEISTUNGEN: Talentpool — Profile Images ── */
  leistungen_talentpool_profiles_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'Brand Ambassador — POS & Verkauf' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: 'Video-Berater — Live-Video & E-Commerce' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Verkaufstrainer — Training & Coaching' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Event-Crew — Events & Roadshows' },
  ],

  /* ── LEISTUNGEN: Video — Format Images ── */
  leistungen_video_format_photos: [
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/9aba7e4f-1f00-4f96-b6fc-90fc615b11b3_1-Kopie.jpg', caption: 'Live-Video-Beratung — 1:1 Calls' },
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/a1484e91-882b-498d-b849-e6655b3952c0_2-Kopie.jpg', caption: 'Sales Broadcast' },
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/ec769083-996f-4f19-a1aa-f82558ce1c27_3-Kopie.jpg', caption: 'Live-Streaming' },
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/21a65c0f-e370-4202-875f-8b9858903d15_4-Kopie.jpg', caption: 'Social Commerce' },
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/6d9e8360-acc8-4646-9d6a-ae6ab41d65e1_5-Kopie.jpg', caption: 'Group Buying' },
    { url: 'https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/25ab2718-26bf-4db4-b304-22c7d310a3e6_6-Kopie.jpg', caption: 'After Sales Support' },
  ],

  /* ── LEISTUNGEN: Warehouse & Logistik — Items ── */
  leistungen_warehouse_items_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg', caption: 'POS-Materialien & Displays' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Messestände & Module' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg', caption: 'Werbemittel & Give-aways' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: 'Möbel & Shop-in-Shop' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg', caption: 'Pressemuster & Leihgeräte' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', caption: 'Fulfillment & Versand' },
  ],

  /* ── Leistungen — Wood Icons ── */
  leistungen_stats_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=finely%20hand%20carved%20walnut%20wood%20victory%20laurel%20wreath%20encircling%20an%20upward%20arrow%20sculptural%20relief%20carving%20deep%20shadow%20casting%20warm%20dark%20amber%20brown%20wood%20grain%20visible%20rich%20three%20dimensional%20craftsmanship%20museum%20quality%20artisan%20object%20centered%20on%20pure%20white%20matte%20background%20studio%20product%20photography%20sharp%20focus%20dramatic%20side%20lighting&width=120&height=120&seq=wood-leist-stat-laurel-v2&orientation=squarish', caption: 'Produkte verkauft — Laurel' },
    { url: 'https://readdy.ai/api/search-image?query=precision%20hand%20carved%20solid%20walnut%20wood%20balance%20scale%20with%20two%20equal%20pans%20sculptural%20three%20dimensional%20relief%20deep%20wood%20grain%20texture%20warm%20amber%20honey%20brown%20tone%20high%20contrast%20dramatic%20lighting%20centered%20museum%20quality%20artisan%20piece%20pure%20white%20studio%20background%20sharp%20product%20photography%20minimal&width=120&height=120&seq=wood-leist-stat-scale-v2&orientation=squarish', caption: 'Umsatz generiert — Scale' },
    { url: 'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20group%20of%20three%20standing%20human%20figures%20team%20icon%20sculptural%20relief%20carving%20rich%20dark%20amber%20brown%20grain%20highly%20detailed%20three%20dimensional%20artisan%20quality%20centered%20on%20clean%20white%20studio%20background%20dramatic%20directional%20lighting%20sharp%20focus&width=120&height=120&seq=wood-leist-stat-team-v2&orientation=squarish', caption: 'Talente im Pool — Team' },
    { url: 'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20precision%20compass%20rose%20eight%20point%20navigation%20star%20deeply%20incised%20relief%20carving%20rich%20dark%20amber%20brown%20grain%20highly%20detailed%20three%20dimensional%20military%20instrument%20quality%20centered%20on%20clean%20white%20studio%20background%20dramatic%20directional%20lighting%20sharp%20focus%20artisan%20craft&width=120&height=120&seq=wood-leist-stat-compass-v2&orientation=squarish', caption: 'Einsätze durchgeführt — Compass' },
  ],

  leistungen_schallmauer_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20rocket%20launch%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-rocket-leist-1&orientation=squarish', caption: 'Markteintritt — Rocket' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20growth%20arrow%20upward%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-chart-leist-2&orientation=squarish', caption: 'Absatz steigern — Chart' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20globe%20world%20internet%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-globe-leist-3&orientation=squarish', caption: 'Omnichannel — Globe' },
  ],

  /* ── Events — Solution Wood Icons ── */
  leistungen_events_solution_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20concept%20creative%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bulb-events-sol-1&orientation=squarish', caption: 'Events — Konzept' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20hammer%20construction%20build%20tool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-hammer-events-sol-2&orientation=squarish', caption: 'Events — Bau & Equipment' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-events-sol-3&orientation=squarish', caption: 'Events — Geschultes Personal' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20fork%20knife%20dining%20restaurant%20catering%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-fork-events-sol-4&orientation=squarish', caption: 'Events — Catering & Experiences' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20truck%20delivery%20logistics%20transport%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-truck-events-sol-5&orientation=squarish', caption: 'Events — Logistik & Controlling' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20announcement%20communication%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-events-sol-6&orientation=squarish', caption: 'Events — (Digitale) Kommunikation' },
  ],

  /* ── Forecasting — Solution Wood Icons ── */
  leistungen_forecasting_solution_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20robot%20AI%20brain%20intelligence%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-robot-01&orientation=squarish', caption: 'Forecasting — KI-Analyse' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20marker%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-pin-02&orientation=squarish', caption: 'Forecasting — Standort-Potenzialanalyse' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20calendar%20check%20date%20schedule%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-cal-03&orientation=squarish', caption: 'Forecasting — Saisonalität' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20grouped%20scenarios%20analysis%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-chart-04&orientation=squarish', caption: 'Forecasting — Szenarien & Sensitivitäten' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20speedometer%20gauge%20live%20tracking%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-dash-05&orientation=squarish', caption: 'Forecasting — Live-Tracking' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chain%20link%20integration%20connection%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-link-06&orientation=squarish', caption: 'Forecasting — Integration' },
  ],

  /* ── POS — Solution Wood Icons ── */
  leistungen_pos_solution_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20display%20stand%20retail%20shelf%20layout%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-display-pos-sol-1&orientation=squarish', caption: 'POS — POS-Materialien' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-pos-sol-2&orientation=squarish', caption: 'POS — Geschultes Personal' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20location%20pin%20area%20management%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-map-pos-sol-3&orientation=squarish', caption: 'POS — Flächenmanagement' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20analytics%20chart%20performance%20tracking%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-dash-pos-sol-4&orientation=squarish', caption: 'POS — Performance-Tracking' },
  ],

  /* ── Staff — Solution Wood Icons ── */
  leistungen_staff_solution_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20magnifying%20glass%20search%20talent%20recruiting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-search-staff-sol-1&orientation=squarish', caption: 'Staff — Recruiting' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20graduation%20cap%20education%20training%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-grad-staff-sol-2&orientation=squarish', caption: 'Staff — Onboarding & Schulungen' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20calculator%20finance%20payroll%20accounting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-calc-staff-sol-3&orientation=squarish', caption: 'Staff — Payroll' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20eye%20transparency%20visibility%20insight%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-eye-staff-sol-4&orientation=squarish', caption: 'Staff — Kosten-Nutzen-Transparenz' },
  ],

  /* ── Staff — Specialization Wood Icons ── */
  leistungen_staff_specialization_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20retail%20shop%20building%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-store-staff-spec-1&orientation=squarish', caption: 'Staff Spec — Sales Activation' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20briefcase%20business%20sales%20field%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-brief-staff-spec-2&orientation=squarish', caption: 'Staff Spec — Sales Außendienst' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20brand%20activation%20announcement%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-staff-spec-3&orientation=squarish', caption: 'Staff Spec — Brand Activation' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20grid%20layout%20shelf%20merchandising%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-grid-staff-spec-4&orientation=squarish', caption: 'Staff Spec — Merchandising' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20building%20shop%20in%20shop%20outlet%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-build-staff-spec-5&orientation=squarish', caption: 'Staff Spec — Shop-in-Shop Staff' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20presentation%20board%20training%20knowledge%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-pres-staff-spec-6&orientation=squarish', caption: 'Staff Spec — Training' },
  ],

  /* ── Video — Solution Wood Icons ── */
  leistungen_video_solution_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20shopping%20cart%20ecommerce%20online%20store%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-cart-video-sol-1&orientation=squarish', caption: 'Video — E-Commerce' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20television%20screen%20display%20retail%20video%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-tv-video-sol-2&orientation=squarish', caption: 'Video — Retail Display' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20QR%20code%20scan%20backup%20retail%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-qr-video-sol-3&orientation=squarish', caption: 'Video — QR-Code Backup' },
  ],

  /* ── Video — Advantages Wood Icons ── */
  leistungen_video_advantages_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20purchase%20point%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-pin-video-adv-1&orientation=squarish', caption: 'Video Adv — Am Einkaufsort' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20signal%20tower%20broadcast%20reach%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-signal-video-adv-2&orientation=squarish', caption: 'Video Adv — Mehr Reichweite' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20analytics%20measurement%20results%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chart-video-adv-3&orientation=squarish', caption: 'Video Adv — Messbare Ergebnisse' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20magnifying%20glass%20search%20market%20research%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-search-video-adv-4&orientation=squarish', caption: 'Video Adv — Marktforschung' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chat%20bubble%20interaction%20dialogue%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chat-video-adv-5&orientation=squarish', caption: 'Video Adv — Interaktivität' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20loop%20recycle%20reuse%20content%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-loop-video-adv-6&orientation=squarish', caption: 'Video Adv — Wiederverwendbar' },
  ],

  /* ── Kreation — Solution Wood Icons ── */
  leistungen_kreation_solution_wood_icons: [],

  /* ── Kreation — Discipline Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_discipline_wood_icons: [],

  /* ── LEISTUNGEN: Overview Hero ── */
  leistungen_hero_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', caption: 'Leistungen — Hero Background', wide: true },
  ],

  /* ── HOME: Services Grid — Wood Icons ── */
  home_services_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=crowd%20silhouettes%20cheering%20at%20live%20event%20stage%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20icon%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-events-stage-crowd-v8&orientation=squarish', caption: 'Events & Messen' },
    { url: 'https://readdy.ai/api/search-image?query=professional%20film%20clapperboard%20director%20slate%20with%20live%20dot%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20icon%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-clapperboard-live-v8&orientation=squarish', caption: 'Content' },
    { url: 'https://readdy.ai/api/search-image?query=open%20book%20with%20rising%20arrow%20growth%20lines%20training%20knowledge%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-book-arrow-training-v8&orientation=squarish', caption: 'Schulungen' },
    { url: 'https://readdy.ai/api/search-image?query=retail%20display%20shelf%20with%20spotlit%20product%20podium%20and%20brand%20flag%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-pos-display-shelf-v8&orientation=squarish', caption: 'Point of Sale' },
    { url: 'https://readdy.ai/api/search-image?query=broadcast%20studio%20camera%20on%20tripod%20with%20recording%20light%20and%20monitor%20screen%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-studio-camera-monitor-v8&orientation=squarish', caption: 'Unsere Studios' },
  ],

  /* ── HOME: SonicDNA — Wood Icons ── */
  home_sonicdna_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bridge%20connection%20link%20phygital%20digital%20physical%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20bridge%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bridge-dna-card-01&orientation=squarish', caption: 'Phygital Pioneers' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20creative%20execution%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20lightbulb%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bulb-dna-card-02&orientation=squarish', caption: 'Creative Execution' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20rising%20bar%20chart%20data%20analytics%20results%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20chart%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chart-dna-card-03&orientation=squarish', caption: 'Data-Driven Results' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20globe%20world%20map%20market%20expertise%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20globe%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-globe-dna-card-04&orientation=squarish', caption: 'Market Expertise' },
  ],

  /* ── HOME: DarumSonic — Wood Icons ── */
  home_darumsonic_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20data%20analytics%20brain%20neural%20network%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-brain-darum-v2&orientation=squarish', caption: 'Datenbasierte Vorhersagen' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20talent%20pool%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-talent-darum-v2&orientation=squarish', caption: '2.000 Talente im Pool' },
  ],

  /* ── HOME: ClientSuccess — Wood Icons ── */
  home_clientsuccess_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20growth%20arrow%20up%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-growth-ancient-extreme-1&orientation=squarish', caption: 'Garmin' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20trophy%20achievement%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-trophy-ancient-extreme-1&orientation=squarish', caption: 'Philips' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20efficiency%20gear%20cog%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-efficiency-ancient-extreme-1&orientation=squarish', caption: 'Groupe SEB' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20smartphone%20mobile%20device%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-mobile-ancient-extreme-1&orientation=squarish', caption: 'Samsung' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20power%20tool%20drill%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-tool-ancient-extreme-1&orientation=squarish', caption: 'Bosch' },
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20heavily%20decayed%20weathered%20wooden%20fan%20air%20flow%20icon%20carved%20from%20century%20old%20reclaimed%20barn%20wood%20with%20severe%20deep%20cracks%20massive%20splits%20wormholes%20rot%20marks%20heavy%20oxidation%20extreme%20patina%20thick%20layers%20of%20aged%20finish%20peeling%20flaking%20surface%20deep%20grooves%20worn%20smooth%20by%20decades%20of%20use%20archaeological%20artifact%20museum%20relic%20quality%20on%20white%20background&width=100&height=100&seq=wood-fan-ancient-extreme-1&orientation=squarish', caption: 'Dyson' },
  ],

  /* ── HOME: ClientSuccess — Wood Background ── */
  home_clientsuccess_wood_bg: [
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface%20archaeological%20relic%20quality%20museum%20artifact%20aged%20timber%20with%20peeling%20finish&width=1920&height=100&seq=wood-texture-metrics-brown-1&orientation=landscape', caption: 'Dashboard Wood Background', wide: true },
  ],

  /* ── HOME: LiveMetrics — Wood Background ── */
  home_livemetrics_wood_bg: [
    { url: 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20with%20clearly%20visible%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20deep%20grain%20lines%20carved%20oak%20walnut%20surface%20close%20up%20macro%20photography%20warm%20brown%20color%20natural%20material%20visible%20grain%20depth%20dark%20rich%20finish%20consistent%20with%20briefcase%20star%20wooden%20icons&width=1920&height=100&seq=wood-ticker-chestnut-dualcta-match-v1&orientation=landscape', caption: 'LiveMetrics — Wood Background', wide: true },
  ],

  /* ── HOME: PhilosophySection — Wood Dividers ── */
  home_philosophy_wood_dividers: [
    { url: 'https://readdy.ai/api/search-image?query=seamless%20wooden%20plank%20texture%20light%20oak%20wood%20grain%20natural%20material%20horizontal%20pattern%20simple%20clean%20design&width=1920&height=12&seq=wood-sep-phil-top&orientation=landscape', caption: 'Top Divider' },
    { url: 'https://readdy.ai/api/search-image?query=seamless%20wooden%20plank%20texture%20light%20oak%20wood%20grain%20natural%20material%20horizontal%20pattern%20simple%20clean%20design&width=1920&height=12&seq=wood-sep-phil-bottom&orientation=landscape', caption: 'Bottom Divider' },
    { url: 'https://readdy.ai/api/search-image?query=vertical%20wooden%20plank%20divider%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20clean%20design&width=32&height=128&seq=wood-divider-0&orientation=portrait', caption: 'Card Divider 1' },
    { url: 'https://readdy.ai/api/search-image?query=vertical%20wooden%20plank%20divider%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20clean%20design&width=32&height=128&seq=wood-divider-1&orientation=portrait', caption: 'Card Divider 2' },
  ],

  /* ── HOME: DualAudienceCTA — Wood Icons ── */
  home_dual_audience_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20briefcase%20business%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-brief-cta2&orientation=squarish', caption: 'For Brands' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-team-cta2&orientation=squarish', caption: 'For Talent' },
  ],

  /* ── HOME: DualCTA — Wood Icons ── */
  home_dual_cta_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20briefcase%20business%20executive%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20minimalist%20handcrafted%20artisan%20on%20clean%20white%20background%20top%20view%20studio%20lighting&width=128&height=128&seq=wood-brief-cta-v3&orientation=squarish', caption: 'Business CTA' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20star%20achievement%20award%20excellence%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20minimalist%20handcrafted%20artisan%20on%20clean%20white%20background%20top%20view%20studio%20lighting&width=128&height=128&seq=wood-star-cta-v3&orientation=squarish', caption: 'Talent CTA' },
  ],

  /* ── HOME: AudienceSelector — Wood Icons ── */
  home_audience_selector_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20rocket%20launch%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-rocket-aud&orientation=squarish', caption: 'Entering DACH' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20growth%20chart%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-chart-aud&orientation=squarish', caption: 'Optimizing' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20shopping%20bag%20retail%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-shop-aud&orientation=squarish', caption: 'Scaling Retail' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20handshake%20partnership%20icon%20carved%20from%20light%20oak%20wood%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-hand-aud&orientation=squarish', caption: 'Join Our Team' },
  ],

  /* ── HOME: ChallengeSection — Wood Icons ── */
  home_challenge_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20rocket%20launch%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20rocket%20ship%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-rocket-challenge-1&orientation=squarish', caption: 'Markteintritt' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20growth%20arrow%20upward%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20rising%20graph%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-chart-challenge-2&orientation=squarish', caption: 'Absatz steigern' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20shop%20building%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20retail%20storefront%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-store-challenge-3&orientation=squarish', caption: 'Omnichannel' },
  ],

  /* ── HOME: ModernDNA — Wood Icons ── */
  home_moderndna_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20human%20figure%20people%20team%20group%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20human%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-human-dna-01&orientation=squarish', caption: 'Der Mensch' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightning%20bolt%20energy%20power%20drive%20motivation%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20energy%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-energy-dna-02&orientation=squarish', caption: 'Der Antrieb' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20analytics%20data%20graph%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20data%20analytics%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-data-dna-03&orientation=squarish', caption: 'Die Daten' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20wrench%20tool%20gear%20settings%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20tool%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-tool-dna-04&orientation=squarish', caption: 'Das Werkzeug' },
  ],

  /* ── HOME: VideoShowcase — Bottom Strip Wood Icons ── */
  home_video_strip_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20promoters%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20people%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-team-video-strip-01&orientation=squarish', caption: '20.000+ Promoter' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20shop%20building%20retail%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20store%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-store-video-strip-02&orientation=squarish', caption: 'DACH-weit' },
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20euro%20coin%20currency%20money%20sales%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20euro%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-euro-video-strip-03&orientation=squarish', caption: '€2,19 Mrd. Umsatz' },
  ],

  /* ── HOME: DanSection — Wood Background ── */
  home_dan_section_wood_bg: [
    { url: 'https://readdy.ai/api/search-image?query=extremely%20ancient%20century%20old%20reclaimed%20barn%20wood%20plank%20texture%20rich%20dark%20brown%20walnut%20color%20with%20severe%20weathering%20massive%20deep%20cracks%20heavy%20splits%20wormholes%20rot%20marks%20thick%20oxidation%20layers%20extreme%20patina%20warm%20brown%20tones%20with%20dark%20decay%20marks%20heavily%20distressed%20vintage%20surface%20archaeological%20relic%20quality%20museum%20artifact%20aged%20timber%20with%20peeling%20finish&width=56&height=56&seq=wood-icon-consultation&orientation=squarish', caption: 'Consultation Wood Icon' },
  ],

  /* ── HOME: ConsultationButton — Wood Icon ── */
  home_consultation_wood_icon: [
    { url: 'https://readdy.ai/api/search-image?query=carved%20wooden%20compass%20direction%20finder%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20navigation%20tool%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-compass-survey-cta-v1&orientation=squarish', caption: 'Survey CTA' },
  ],

  /* ── HOME: Attitude — Background Image ── */
  home_attitude_bg: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/11.jpg', caption: 'Attitude — Welcome Background', wide: true },
  ],

  /* ── INDUSTRIES: Expertise — Wood Icons ── */
  industries_expertise_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20compass%20navigation%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-compass-walnut&orientation=squarish', caption: 'Marktkenntnis' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20graduation%20cap%20education%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-grad-walnut&orientation=squarish', caption: 'Produkttraining' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20handshake%20partnership%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-handshake-walnut&orientation=squarish', caption: 'Handelspartnerschaften' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20analytics%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-chart-walnut&orientation=squarish', caption: 'Datenbasierte Insights' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20rocket%20launch%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-rocket-walnut&orientation=squarish', caption: 'Skalierbare Lösungen' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20globe%20world%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-globe-walnut&orientation=squarish', caption: 'Phygitale Integration' },
  ],

  /* ── INDUSTRIES: Grid — Wood Icons ── */
  industries_grid_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20electronics%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-electronics-chestnut&orientation=squarish', caption: 'Consumer Electronics' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20home%20appliance%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-appliance-chestnut&orientation=squarish', caption: 'Home Appliances' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20beauty%20cosmetics%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-beauty-chestnut&orientation=squarish', caption: 'Beauty & Personal Care' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20heart%20wellness%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-wellness-chestnut&orientation=squarish', caption: 'Lifestyle & Wellness' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20car%20automobile%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-car-chestnut&orientation=squarish', caption: 'Automotive & Mobility' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20television%20tv%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-tv-chestnut&orientation=squarish', caption: 'Entertainment & Media' },
  ],

  /* ── ABOUT: ValuesVisual — Wood Icons ── */
  about_values_visual_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20briefcase%20business%20portfolio%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-about-brief-v1&orientation=squarish', caption: 'Projekte' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20person%20human%20user%20profile%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-about-user-v1&orientation=squarish', caption: 'Einsätze' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20store%20shop%20retail%20building%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-about-store-v1&orientation=squarish', caption: 'POS-Umsetzungen' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20calendar%20date%20time%20schedule%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-about-cal-v1&orientation=squarish', caption: 'Jahre Erfahrung' },
  ],

  /* ── ABOUT: OriginStory — Wood Ticker BG ── */
  about_origin_story_wood_bg: [
    { url: 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20with%20clearly%20visible%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20deep%20grain%20lines%20carved%20oak%20walnut%20surface%20close%20up%20macro%20photography%20warm%20brown%20color%20natural%20material%20visible%20grain%20depth%20dark%20rich%20finish%20consistent%20with%20briefcase%20star%20wooden%20icons&width=1920&height=100&seq=about-origin-wood-ticker-v1&orientation=landscape', caption: 'Origin Story — Wood Ticker BG' },
  ],

  /* ── SRT: TheProblem — Wood Icons ── */
  srt_problem_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20broken%20chain%20disconnected%20link%20problem%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-prob-01&orientation=squarish', caption: 'Datensilos — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20hourglass%20time%20waiting%20delay%20problem%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-prob-02&orientation=squarish', caption: 'Zeitverlust — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20eye%20visibility%20blind%20no%20overview%20problem%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-prob-03&orientation=squarish', caption: 'Kein Überblick — Wood Icon' },
  ],

  /* ── SRT: Proof — Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  srt_proof_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20rising%20arrow%20growth%20performance%20success%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-proof-01&orientation=squarish', caption: 'Umsatzsteigerung — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20clock%20time%20speed%20efficiency%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-proof-02&orientation=squarish', caption: 'Zeitersparnis — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20star%20rating%20quality%20excellence%20award%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-proof-03&orientation=squarish', caption: 'Qualität — Wood Icon' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20shield%20checkmark%20verified%20trust%20security%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-proof-04&orientation=squarish', caption: 'Vertrauen — Wood Icon' },
  ],

  /* ── SRT: Pricing — Card Images ── */
  srt_pricing_images: [
    { url: 'https://readdy.ai/api/search-image?query=minimalist%20professional%20workspace%20desk%20setup%20with%20modern%20laptop%20dashboard%20analytics%20screen%20clean%20aesthetic%20warm%20wood%20table%20accessories%20organized%20creative%20studio%20environment%20natural%20daylight%20soft%20shadows%20simple%20elegant%20composition%20product%20photography&width=800&height=400&seq=srt-price-starter&orientation=landscape', caption: 'Starter Tier' },
    { url: 'https://readdy.ai/api/search-image?query=advanced%20enterprise%20software%20dashboard%20multiple%20screens%20data%20visualization%20charts%20graphs%20professional%20dark%20interface%20command%20center%20analytics%20workspace%20modern%20technology%20setup%20sleek%20clean%20design%20warm%20ambient%20lighting%20cinematic%20depth%20of%20field%20premium%20SaaS%20product%20photography&width=800&height=400&seq=srt-price-pro&orientation=landscape', caption: 'Professional Tier' },
    { url: 'https://readdy.ai/api/search-image?query=corporate%20enterprise%20headquarters%20modern%20glass%20office%20building%20exterior%20architectural%20photography%20dramatic%20sky%20reflections%20professional%20business%20environment%20premium%20corporate%20imagery%20clean%20lines%20sophisticated%20urban%20setting%20warm%20golden%20hour%20lighting&width=800&height=400&seq=srt-price-enterprise&orientation=landscape', caption: 'Enterprise Tier' },
  ],

  /* ── TEAM: MeetTheTeam — Wood Icons ── */
  team_meet_team_wood_icons: [
    { url: 'https://readdy.ai/api/search-image?query=wooden%20heart%20pulse%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-heart-chestnut&orientation=squarish', caption: 'Human-First Culture' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20star%20person%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-star-chestnut&orientation=squarish', caption: 'Growth Opportunities' },
    { url: 'https://readdy.ai/api/search-image?query=wooden%20team%20group%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-group-chestnut&orientation=squarish', caption: 'Diverse Family' },
  ],

  /* ── TEAM: TrainingDevelopment — Image ── */
  team_training_image: [
    { url: 'https://readdy.ai/api/search-image?query=professional%20training%20session%20with%20instructor%20teaching%20group%20of%20engaged%20employees%20in%20modern%20bright%20classroom%20setting%20collaborative%20learning%20environment%20minimal%20design%20clean&width=800&height=1000&seq=team-training-v2&orientation=portrait', caption: 'Training Session' },
  ],

  /* ── HOME: Video Embed & Cover ── */
  home_video: [
    { url: 'https://readdy.ai/api/search-image?query=cinematic%20retail%20activation%20event%20scene%20with%20brand%20promoters%20engaging%20customers%20at%20modern%20trade%20show%20booth%20warm%20ambient%20lighting%20dynamic%20crowd%20interaction%20professional%20product%20demonstration%20sleek%20contemporary%20exhibition%20design%20with%20digital%20screens%20and%20branded%20displays%20high%20end%20commercial%20photography%20shallow%20depth%20of%20field%20editorial%20quality&width=1600&height=900&seq=video-cover-sonic-2026&orientation=landscape', caption: 'Video Cover Image', wide: true },
    { url: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&loop=1&playlist=2H1rFHQsG4g&rel=0&modestbranding=1', caption: 'YouTube Embed URL (full URL with params)' },
  ],
};

/* ─────────────────────────────────────────────
   BUILD DEFAULT_MEDIA (frozen, never mutated)
───────────────────────────────────────────── */
export const DEFAULT_MEDIA: MediaSections = {};

// 1. Populate from JSON manifest
const typedManifest = manifestData as Record<string, { key: string; label: string; images: MediaItem[] }>;
Object.keys(typedManifest).forEach((dirPath) => {
  DEFAULT_MEDIA[dirPath] = Object.freeze([...typedManifest[dirPath].images]) as unknown as MediaItem[];
});

// 2. Add virtual folders
Object.keys(VIRTUAL_MEDIA).forEach((virtualKey) => {
  DEFAULT_MEDIA[virtualKey] = Object.freeze([...VIRTUAL_MEDIA[virtualKey]]) as unknown as MediaItem[];
});

/* ─────────────────────────────────────────────
   HUMAN LABELS
───────────────────────────────────────────── */
const HUMAN_LABELS: Record<string, string> = {
  '/images/home/1. Menschen für Events & Messen': 'Events & Messen',
  '/images/home/2. Menschen für Content': 'Content',
  '/images/home/3. Menschen für Schulungen': 'Schulungen',
  '/images/home/4. Menschen für unsere Studios': 'Unsere Studios',
  'home_pos': 'Point of Sale (Remote)',
  'home_hero_stats': 'Hero — Stats Icons',
  'home_hero_cta_icons': 'Hero — CTA Icons',
  'home_hero_wood_textures': 'Hero — Wood Textures',
  'home_showcase_service_images': 'Showcase — Service Images',
  'home_showcase_wood_icons': 'Showcase — Wood Icons',
  '/images/Über uns/Über uns/1. Header': 'Header Foto',
  '/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus': 'Fokus (Werkbank)',
  '/images/Über uns/Über uns/3. Das Sonic Team': 'Das Sonic Team',
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Björn': 'Stimme — Björn',
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Jo': 'Stimme — Jo',
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Lucas': 'Stimme — Lucas',
  '/images/Über uns/Leadership Perspectives': 'Leadership Voices',
  '/images/Über uns/Sonic Reels/2007-2015': '2007–2015',
  'reels_2015_2019': '2015–2019 (Remote)',
  '/images/Über uns/Sonic Reels/2019-2022': '2019–2022',
  '/images/Über uns/Sonic Reels/2022-2023': '2022–2023',
  'reels_2024': '2024 (Remote)',
  'reels_2025': '2025 (Remote)',
  'reels_2026': '2026 (Remote)',
  '/images/losungen': 'Icons',
  '/images/Lösungen/1. Header': '1. Header',
  '/images/Lösungen/2. Markteintritt/2. Verkäuferschulungen': '2. Verkäuferschulungen',
  '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung': '4. Live-Beratung',
  '/images/Lösungen/2. Markteintritt/8. So läuft dein Markteintritt mit Sonic/3. Team-Aufbau & Schulung': '8. Team-Aufbau',
  'losungen_hero_backgrounds': 'Hero Backgrounds',
  'losungen_deliverable_images': 'Deliverable Images',
  'losungen_step_images': 'Process Step Images',
  'losungen_testimonial_images': 'Testimonial Images',
  'losungen_wood_textures': 'Wood Textures',
  '/images/Case Studies -Fallbsp/Avoury': 'Avoury',
  '/images/Case Studies -Fallbsp/Garmin': 'Garmin',
  '/images/Case Studies -Fallbsp/Philips': 'Philips',
  '/images/Case Studies -Fallbsp/SEB': 'SEB',
  'srt_hero_icons': 'SRT — Hero Stat Icons',
  'srt_feature_icons': 'SRT — Feature Wood Icons',
  'srt_functionality_images': 'SRT — Funktionsumfang Module Screenshots',
  'srt_section_images': 'SRT — Section Images',
  'lvp_hero_images': 'Live Video — Hero Images',
  'lvp_studio_images': 'Live Video — Studio Images',
  'lvp_creative_images': 'Live Video — Creative Showcase',
  '/images/Karriere': 'Galerie & Hero',
  'careers_hero_images': 'Hero Team Photo',
  'careers_team_images': 'Team Images',
  'careers_path_images': 'Karrierepfade — Polaroids',
  'careers_events_videos': 'Team Events — Video URLs',
  'careers_events_images': 'Team Events — Polaroids',
  'careers_dreamteam_images': 'DreamTeam — Event Polaroids',
  'careers_geschichten_images': 'Geschichten — Story Portraits',
  'careers_mitarbeiterstimmen_sales_images': 'Mitarbeiterstimmen — Sales',
  'careers_mitarbeiterstimmen_staff_images': 'Mitarbeiterstimmen — Staff',
  'careers_sonicfaces_images': 'SonicFaces — Portraits',
  'careers_sonicfamily_images': 'SonicFamily — AI Portraits',
  'kreation_faces_robert': 'Kreation Team — Robert H.',
  'kreation_faces_inga': 'Kreation Team — Inga L.',
  'careers_recruitercta_image': 'RecruiterCTA — Tanja Foto',
  'careers_stellenangebote_image': 'Stellenangebote — Tanja Portrait',
  'careers_sonic_sales_hero': 'Sonic Sales — Hero',
  'careers_sonic_staff_hero': 'Sonic Staff — Hero',
  'careers_howwehire_wood_icons': 'HowWeHire — Wood Icons',
  'careers_culture_wood_icons': 'KarriereCulture — Wood Icons',
  'careers_hero_wood_icons': 'KarriereHero — Trust Stat Icons',
  'careers_pictorial_showcase': 'Careers — Pictorial Showcase (under Team Events)',
  'careers_perks_wood_icons': 'Perks — Section Wood Icons',
  'leistungen_pos_images': 'POS Full Service',
  'leistungen_video_images': 'Live Video Promotion',
  'leistungen_events_images': 'Events & Messen',
  'leistungen_staff_images': 'Staff as a Service',
  'leistungen_talentpool_images': 'Talentepool',
  'leistungen_warehouse_images': 'Warehouse & Logistik',
  'leistungen_forecasting_images': 'Forecasting',
  'leistungen_kreation_images': 'Kreation & Content',
  'leistungen_hero_images': 'Leistungen — Hero',
  'leistungen_servicegrid_bg': 'Overview — ServiceGrid BGs',
  'leistungen_events_process_images': 'Events — Prozess-Schritte',
  'leistungen_events_showcase_images': 'Events — Showcase Galerie',
  'leistungen_forecasting_process_images': 'Forecasting — Prozess-Schritte',
  'leistungen_kreation_carousel_images': 'Kreation — Carousel Tiles',
  'leistungen_kreation_showcase_images': 'Kreation — Showcase Grid',
  'leistungen_kreation_showcase_secondary_konzeption': 'Kreation — Alt-Rotation Konzeption',
  'leistungen_kreation_showcase_secondary_content': 'Kreation — Alt-Rotation Content',
  'leistungen_kreation_showcase_secondary_cgi': 'Kreation — Alt-Rotation CGI',
  'leistungen_kreation_before_after': 'Kreation — Before/After Slider',
  'leistungen_pos_assets_images': 'POS — Asset-Kategorien',
  'leistungen_pos_process_images': 'POS — Prozess-Schritte',
  'leistungen_staff_socks_images': 'Staff — S.O.C.K.S. Bilder',
  'leistungen_talentpool_profiles_images': 'Talentpool — Profilbilder',
  'leistungen_warehouse_items_images': 'Warehouse — Lager-Items',
  'leistungen_stats_wood_icons': 'Overview — Stats Wood Icons',
  'leistungen_schallmauer_wood_icons': 'Overview — Schallmauer Wood Icons',
  'leistungen_events_solution_wood_icons': 'Events — Solution Wood Icons',
  'leistungen_forecasting_solution_wood_icons': 'Forecasting — Solution Wood Icons',
  'leistungen_pos_solution_wood_icons': 'POS — Solution Wood Icons',
  'leistungen_staff_solution_wood_icons': 'Staff — Solution Wood Icons',
  'leistungen_staff_specialization_wood_icons': 'Staff — Specialization Wood Icons',
  'leistungen_video_solution_wood_icons': 'Video — Solution Wood Icons',
  'leistungen_video_advantages_wood_icons': 'Video — Advantages Wood Icons',
  'leistungen_kreation_solution_wood_icons': 'Kreation — Solution Wood Icons',
  'leistungen_kreation_discipline_wood_icons': 'Kreation — Discipline Wood Icons',
  'leistungen_kreation_photo_grid': 'Kreation — Rotating Photo Grid',
  'leistungen_warehouse_fullservice_photo': 'Warehouse — Full Service Photo',
  'leistungen_video_format_photos': 'Video — Format Photos',
  'home_video': 'Hero Video — Embed & Cover',
  'home_services_wood_icons': 'Services Grid — Wood Icons',
  'home_sonicdna_wood_icons': 'SonicDNA — Card Wood Icons',
  'home_darumsonic_wood_icons': 'DarumSonic — Wood Icons',
  'home_clientsuccess_wood_icons': 'ClientSuccess — Brand Wood Icons',
  'home_clientsuccess_wood_bg': 'ClientSuccess — Wood Background',
  'home_philosophy_wood_dividers': 'Philosophy — Wood Dividers',
  'home_dual_audience_wood_icons': 'DualAudienceCTA — Wood Icons',
  'home_dual_cta_wood_icons': 'DualCTA — Wood Icons',
  'home_audience_selector_wood_icons': 'AudienceSelector — Wood Icons',
  'home_challenge_wood_icons': 'ChallengeSection — Wood Icons',
  'home_moderndna_wood_icons': 'ModernDNA — Wood Icons',
  'home_video_strip_wood_icons': 'VideoShowcase — Strip Wood Icons',
  'home_dan_section_wood_bg': 'DanSection — Wood Background',
  'home_consultation_wood_icon': 'ConsultationButton — Wood Icon',
  'home_attitude_bg': 'Attitude — Welcome BG Image',
  'industries_expertise_wood_icons': 'Expertise — Wood Icons',
  'industries_grid_wood_icons': 'Grid — Wood Icons',
  'about_values_visual_wood_icons': 'ValuesVisual — Impact Wood Icons',
  'about_origin_story_wood_bg': 'OriginStory — Wood Ticker BG',
  'srt_problem_wood_icons': 'TheProblem — Wood Icons',
  'srt_proof_wood_icons': 'Proof — Stats Wood Icons',
  'srt_pricing_images': 'Pricing — Tier Images',
  'team_meet_team_wood_icons': 'MeetTheTeam — Highlight Wood Icons',
  'team_training_image': 'Training — Image',
  'home_truststrip_logos': 'TrustStrip — Brand Logos',
  'home_brandintro_images': 'BrandIntro — Images',
  'home_dualcta_backgrounds': 'DualCTA — Backgrounds',
  'home_sonicdna_background': 'SonicDNA — Office Background',
  'home_officevisit_image': 'OfficeVisit — Image',
  'team_hero_images': 'Hero — Background & Photos',
  'team_corevalues_images': 'Core Values — Images',
  'about_sonicreels_hero_accent': 'SonicReels — Hero & Accent Images',
  'common_clientproof_logos': 'ClientProof — Brand Logos',
  'common_logos': 'Site Logos (Nav & Footer)',
  'industries_hero_bg': 'Hero — Background',
  'industries_grid_images': 'Industry Grid — Images',
  'services_content_studio_images': 'Content Studio',
  'services_events_images': 'Events',
  'services_market_entry_images': 'Market Entry',
  'services_retail_pos_images': 'Retail & POS',
  'services_staffing_images': 'Staffing',
  'blog_images': 'Blog — Hero & Featured',
  'ratgeber_hero': 'Ratgeber — Hero Background',
  'jobs_hero': 'Jobs — Hero Background',
  'kontakt_hero': 'Hero — Background',
};

/* ─────────────────────────────────────────────
   DESIGN-RECOMMENDED COUNTS
   Based on actual page layouts — how many image
   slots each section's design was built for.
   Sections not listed here use the curator's
   count from DEFAULT_MEDIA as fallback.
───────────────────────────────────────────── */
const DESIGN_RECOMMENDED: Record<string, number> = {
  /* ── HOME: Fixed Design Slots ── */
  'home_hero_stats': 4,               // 4 stat icon positions in Hero
  'home_hero_cta_icons': 2,           // 2 CTA button icons
  'home_hero_wood_textures': 3,       // Left btn + Right btn + Vertical divider
  'home_showcase_service_images': 5,  // Staff, POS, SRT, LVP, Events — 5 service tabs
  'home_showcase_wood_icons': 5,      // Matching wood icons for 5 services
  'home_truststrip_logos': 12,        // 2 rows × 6 brand logos
  'home_brandintro_images': 3,        // 2022, 2023, 2024 year images
  'home_dualcta_backgrounds': 2,      // Business + Talent dual CTA bg
  'home_sonicdna_background': 1,      // 1 office background image
  'home_officevisit_image': 1,        // 1 main image
  'home_pos': 3,                      // 3 POS remote images

  /* ── HOME: "Menschen für…" folder sections (same structure → same cap) ── */
  '/images/home/1. Menschen für Events & Messen': 5,
  '/images/home/2. Menschen für Content': 5,
  '/images/home/3. Menschen für Schulungen': 5,
  '/images/home/4. Menschen für unsere Studios': 5,

  /* ── LÖSUNGEN: Icons ── */
  '/images/losungen': 3,
  /* ── LÖSUNGEN: Local sub-folders from manifest ── */
  '/images/Lösungen/1. Header': 4,
  '/images/Lösungen/2. Markteintritt/2. Verkäuferschulungen': 2,
  '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung': 2,
  '/images/Lösungen/2. Markteintritt/8. So läuft dein Markteintritt mit Sonic/3. Team-Aufbau & Schulung': 1,
  'losungen_hero_backgrounds': 4,     // 1 main hero + 3 expanded panel heroes
  'losungen_deliverable_images': 23,  // 7 Markteintritt + 8 Absatz + 8 Omnichannel = 23 total
  'losungen_step_images': 14,         // 5 Markteintritt + 5 Absatz + 4 Omnichannel steps
  'losungen_testimonial_images': 3,   // Garmin, Samsung, Avoury testimonials
  'losungen_wood_textures': 3,        // Main card + Expanded overlay + Survey card

  // Case study brand folders are flexible galleries — curator's count from DEFAULT_MEDIA is the guide

  /* ── ABOUT: Fixed Design Slots ── */
  '/images/Über uns/Über uns/1. Header': 1,                          // 1 group photo
  '/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus': 1, // 1 Werkbank image
  '/images/Über uns/Über uns/3. Das Sonic Team': 1,                   // 1 team photo
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Björn': 2,  // Color + B&W
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Jo': 2,     // Color + B&W
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Lucas': 2,  // Color + B&W
  '/images/Über uns/Leadership Perspectives': 3,                     // 3 executives shown
  '/images/Über uns/Sonic Reels/2007-2015': 5,   // Same structure as other reels eras
  '/images/Über uns/Sonic Reels/2019-2022': 5,
  '/images/Über uns/Sonic Reels/2022-2023': 5,
  'about_sonicreels_hero_accent': 14,  // 2 per era × 7 eras

  /* ── SRT: Fixed Design Slots ── */
  'srt_hero_icons': 4,       // 4 stat icon positions
  'srt_feature_icons': 6,    // 6 feature wood icons
  'srt_section_images': 2,   // Dashboard + Mobile app screenshots

  /* ── LVP: Fixed Design Slots ── */
  'lvp_hero_images': 2,       // Hero bg + Presenter shot
  'lvp_studio_images': 3,     // Studio overview + Editing + Photography
  'lvp_creative_images': 3,   // 3 creative showcase thumbnails

  /* ── CAREERS: Fixed Design Slots ── */
  '/images/Karriere': 5,        // Gallery & hero images
  'careers_hero_images': 1,   // 1 hero team photo
  'careers_team_images': 3,   // Office + Team event + Modern office
  'careers_path_images': 2,   // Sales Family + Staff Family polaroids
  'careers_events_videos': 3, // 3 video embed URLs (Content Creation, Team Events, Promoter Events)
  'careers_events_images': 3, // Content Creation + Team Events + Promoter Events
  'careers_dreamteam_images': 6,
  'careers_geschichten_images': 3,
  'careers_mitarbeiterstimmen_sales_images': 3,
  'careers_mitarbeiterstimmen_staff_images': 3,
  'careers_sonicfaces_images': 5,
  'careers_sonicfamily_images': 5,
  'careers_recruitercta_image': 1,
  'careers_stellenangebote_image': 1,
  'careers_sonic_sales_hero': 1,
  'careers_sonic_staff_hero': 1,
  'careers_howwehire_wood_icons': 7,
  'careers_culture_wood_icons': 6,
  'careers_hero_wood_icons': 3,
  'careers_perks_wood_icons': 2,

  /* ── LEISTUNGEN: All sub-service hero images — same structure → same cap (5) ── */
  'leistungen_pos_images': 5,
  'leistungen_video_images': 5,
  'leistungen_events_images': 5,
  'leistungen_staff_images': 5,
  'leistungen_talentpool_images': 5,
  'leistungen_warehouse_images': 5,
  'leistungen_forecasting_images': 5,
  'leistungen_kreation_images': 5,
  'leistungen_hero_images': 1,
  'leistungen_servicegrid_bg': 4,
  'leistungen_events_process_images': 6,
  'leistungen_events_showcase_images': 12,
  'leistungen_forecasting_process_images': 4,
  'leistungen_kreation_carousel_images': 9,
  'leistungen_kreation_showcase_images': 15,
  'leistungen_kreation_showcase_secondary_konzeption': 5,
  'leistungen_kreation_showcase_secondary_content': 5,
  'leistungen_kreation_showcase_secondary_cgi': 5,
  'leistungen_kreation_before_after': 2,
  'leistungen_pos_assets_images': 20,
  'leistungen_pos_process_images': 6,
  'leistungen_staff_socks_images': 5,
  'leistungen_talentpool_profiles_images': 4,
  'leistungen_warehouse_items_images': 6,
  'leistungen_stats_wood_icons': 4,
  'leistungen_schallmauer_wood_icons': 3,
  'leistungen_events_solution_wood_icons': 6,
  'leistungen_forecasting_solution_wood_icons': 6,
  'leistungen_pos_solution_wood_icons': 4,
  'leistungen_staff_solution_wood_icons': 4,
  'leistungen_staff_specialization_wood_icons': 6,
  'leistungen_video_solution_wood_icons': 3,
  'leistungen_video_advantages_wood_icons': 6,
  'leistungen_kreation_solution_wood_icons': 4,
  'leistungen_kreation_discipline_wood_icons': 3,
  'leistungen_kreation_photo_grid': 5,
  'leistungen_warehouse_fullservice_photo': 1,
  'leistungen_video_format_photos': 6,

  /* ── TEAM: Fixed Design Slots ── */
  'team_hero_images': 4,        // 1 bg + 3 headshot photos
  'team_corevalues_images': 4,  // Mensch, Motivation, Daten, Werkzeug

  /* ── INDUSTRIES: Fixed Design Slots ── */
  'industries_hero_bg': 1,       // 1 hero background
  'industries_grid_images': 6,   // 6 industry grid cards

  /* ── SERVICES: All sub-service pages — same structure → same cap (5) ── */
  'services_content_studio_images': 5,
  'services_events_images': 5,
  'services_market_entry_images': 5,
  'services_retail_pos_images': 5,
  'services_staffing_images': 5,

  /* ── SINGLE-IMAGE SECTIONS ── */
  'blog_images': 1,
  'ratgeber_hero': 1,
  'jobs_hero': 1,
  'kontakt_hero': 1,
  'common_logos': 1,

  /* ── COMMON: Fixed Design Slots ── */
  'common_clientproof_logos': 6,  // 6 brand logos for ClientProof
  'home_video': 2,               // Cover image + YouTube URL
  'home_services_wood_icons': 5,
  'home_sonicdna_wood_icons': 4,
  'home_darumsonic_wood_icons': 2,
  'home_clientsuccess_wood_icons': 6,
  'home_clientsuccess_wood_bg': 1,
  'home_philosophy_wood_dividers': 4,
  'home_dual_audience_wood_icons': 2,
  'home_dual_cta_wood_icons': 2,
  'home_audience_selector_wood_icons': 4,
  'home_challenge_wood_icons': 3,
  'home_moderndna_wood_icons': 4,
  'home_video_strip_wood_icons': 3,
  'home_dan_section_wood_bg': 1,
  'home_consultation_wood_icon': 1,
  'home_attitude_bg': 1,
  'industries_expertise_wood_icons': 6,
  'industries_grid_wood_icons': 6,
  'about_values_visual_wood_icons': 4,
  'about_origin_story_wood_bg': 1,
  'srt_functionality_images': 6,  // 6 module screenshots
  'srt_problem_wood_icons': 3,
  'srt_proof_wood_icons': 4,
  'srt_pricing_images': 3,
  'team_meet_team_wood_icons': 3,
  'team_training_image': 1,
};

/* ─────────────────────────────────────────────
   DESIGN SPECS — ideal image dimensions per section
   Based on actual component rendering analysis.
   Unlisted sections inherit a sensible default.
───────────────────────────────────────────── */
const DESIGN_SPECS: Record<string, DesignSpec> = {

  /* ═══ WOOD ICONS — perfect 1:1 squares ═══ */
  'home_hero_stats':            { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square carved-wood icons — tight crop, sharp shadows, warm brown' },
  'home_hero_cta_icons':        { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square carved-wood icons for hero CTA buttons' },
  'home_hero_wood_textures':    { aspectRatio: '4:1 btns / 1:10 div', dimensions: '400×80 btns / 60×600 div', orientation: 'ultrawide', tip: 'Ultrawide distressed wood strips — seamless repeating grain' },
  'home_showcase_wood_icons':   { aspectRatio: '1:1', dimensions: '100×100', orientation: 'icon', tip: 'Small square wood icons for service switcher cards' },
  'home_services_wood_icons':   { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square carved-wood service category icons' },
  'home_sonicdna_wood_icons':   { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square wood icons for SonicDNA value cards' },
  'home_darumsonic_wood_icons': { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square wood icons for DarumSonic section' },
  'home_clientsuccess_wood_icons': { aspectRatio: '1:1', dimensions: '100×100', orientation: 'icon', tip: 'Extremely weathered ancient wood icons — cracked, decayed look' },
  'home_clientsuccess_wood_bg': { aspectRatio: '19.2:1', dimensions: '1920×100', orientation: 'ultrawide', tip: 'Ultrawide ancient barnwood strip — used as texture overlay' },
  'home_philosophy_wood_dividers': { aspectRatio: '~160:1 or 1:4', dimensions: '1920×12 / 32×128', orientation: 'ultrawide', tip: 'Ultrawide horizontal dividers + narrow vertical dividers' },
  'home_dual_audience_wood_icons': { aspectRatio: '1:1', dimensions: '100×100', orientation: 'icon', tip: 'Square light-oak wood icons for audience CTA' },
  'home_dual_cta_wood_icons':   { aspectRatio: '1:1', dimensions: '128×128', orientation: 'icon', tip: 'Large square dark walnut wood icons for DualCTA' },
  'home_audience_selector_wood_icons': { aspectRatio: '1:1', dimensions: '100×100', orientation: 'icon', tip: 'Square light-oak wood icons for audience selector' },
  'home_challenge_wood_icons':  { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square walnut wood icons for challenge cards' },
  'home_moderndna_wood_icons':  { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square dark walnut wood icons for ModernDNA values' },
  'home_video_strip_wood_icons':{ aspectRatio: '1:1', dimensions: '72×72', orientation: 'icon', tip: 'Tiny square wood icons for video showcase stat strip' },
  'home_dan_section_wood_bg':   { aspectRatio: '1:1', dimensions: '56×56', orientation: 'icon', tip: 'Tiny square wood icon for Dan contact button' },
  'home_consultation_wood_icon':{ aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square dark walnut wood icon for consultation CTA' },

  /* ═══ HOME: Hero & Showcase — wide landscape ═══ */
  'home_showcase_service_images': { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Wide landscape — brand activation, retail scenes, people in action' },
  'home_sonicdna_background':  { aspectRatio: '2.4:1', dimensions: '1440×600', orientation: 'landscape', tip: 'Ultrawide office interior — bright, modern, natural light' },
  'home_video':                 { aspectRatio: '16:9', dimensions: '1600×900', orientation: 'landscape', tip: 'Standard 16:9 video cover — cinematic retail scene' },
  'home_attitude_bg':           { aspectRatio: '~2:1', dimensions: '~1600×800', orientation: 'landscape', tip: 'Wide welcome background — warm, inviting atmosphere' },
  'home_dualcta_backgrounds':   { aspectRatio: '~9:7', dimensions: '900×700', orientation: 'landscape', tip: 'Slightly wide — business meeting & team scenes' },
  'home_officevisit_image':     { aspectRatio: '4:5', dimensions: '800×1000', orientation: 'portrait', tip: 'Tall portrait — office interior, people working' },
  'home_brandintro_images':     { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'Brand intro year photos — landscape shots' },
  'home_truststrip_logos':      { aspectRatio: 'SVG flexible', dimensions: '~200×48', orientation: 'logo', tip: 'Brand logos — SVG preferred, dark theme, ~200px wide' },
  'home_pos':                   { aspectRatio: '~2:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'Wide POS remote images — retail displays' },

  /* ═══ HOME: Menschen folders (5 images each) ═══ */
  '/images/home/1. Menschen für Events & Messen': { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Events — people at trade shows, crowd, booths' },
  '/images/home/2. Menschen für Content':          { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Content — studio, unboxing, filming' },
  '/images/home/3. Menschen für Schulungen':       { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Schulungen — training rooms, people learning' },
  '/images/home/4. Menschen für unsere Studios':   { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Studios — production, cameras, studio setups' },

  /* ═══ LÖSUNGEN ═══ */
  '/images/losungen':           { aspectRatio: '1:1', dimensions: '~600×600', orientation: 'square', tip: 'Solution icons — ambassador, dashboard, video symbols' },
  '/images/Lösungen/1. Header': { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Header photos — hero banner shots, retail/product photography' },
  '/images/Lösungen/2. Markteintritt/2. Verkäuferschulungen': { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Verkäuferschulungen — training workshops, retail staff' },
  '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung': { aspectRatio: '3:2', dimensions: '~800×500', orientation: 'landscape', tip: 'Video content — live streaming, advisors' },
  '/images/Lösungen/2. Markteintritt/8. So läuft dein Markteintritt mit Sonic/3. Team-Aufbau & Schulung': { aspectRatio: '3:2', dimensions: '~800×500', orientation: 'landscape', tip: 'Team-Aufbau & Schulung — training, team building' },
  'losungen_hero_backgrounds':  { aspectRatio: '16:9 or 2.4:1', dimensions: '1920×1080 / 1920×800', orientation: 'landscape', tip: 'Hero banners — dark cinematic retail scenes' },
  'losungen_deliverable_images':{ aspectRatio: '8:5', dimensions: '800×500', orientation: 'landscape', tip: 'Deliverable images — professionals at work, clean scenes' },
  'losungen_step_images':       { aspectRatio: '9:5', dimensions: '900×500', orientation: 'landscape', tip: 'Process step images — slightly wider than deliverables' },
  'losungen_testimonial_images':{ aspectRatio: '12:7', dimensions: '1200×700', orientation: 'landscape', tip: 'Testimonial hero images — brand retail environment' },
  'losungen_wood_textures':     { aspectRatio: '~3.2:1', dimensions: '1920×600 / 1920×400', orientation: 'ultrawide', tip: 'Ancient barnwood strips — dark overlay textures' },

  /* ═══ ABOUT ═══ */
  '/images/Über uns/Über uns/1. Header':                      { aspectRatio: '16:9', dimensions: '~1920×1080', orientation: 'landscape', tip: 'Group photo — Sonic team, outdoor/office' },
  '/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus': { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'Werkbank — workshop, craftsmanship' },
  '/images/Über uns/Über uns/3. Das Sonic Team':              { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Team photo — group shot, casual/professional' },
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Björn': { aspectRatio: '1:1', dimensions: '~600×600', orientation: 'square', tip: 'Björn portraits — color + B&W, headshots' },
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Jo':   { aspectRatio: '1:1', dimensions: '~600×600', orientation: 'square', tip: 'Jo portraits — color + B&W, headshots' },
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Lucas': { aspectRatio: '1:1', dimensions: '~600×600', orientation: 'square', tip: 'Lucas portraits — color + B&W, headshots' },
  '/images/Über uns/Leadership Perspectives': { aspectRatio: '2:3', dimensions: '~600×900', orientation: 'portrait', tip: 'Leadership portraits — executive headshots' },
  '/images/Über uns/Sonic Reels/2007-2015': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'landscape', tip: 'Mixed gallery — events, team, milestones (varied ratios ok)' },
  '/images/Über uns/Sonic Reels/2019-2022': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'landscape', tip: 'Mixed gallery — events, team, milestones' },
  '/images/Über uns/Sonic Reels/2022-2023': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'landscape', tip: 'Mixed gallery — events, team, milestones' },
  'reels_2015_2019': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'flexible', tip: 'Mixed gallery — varied ratios for visual interest' },
  'reels_2024': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'flexible', tip: 'Mixed gallery — varied ratios for visual interest' },
  'reels_2025': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'flexible', tip: 'Mixed gallery — varied ratios for visual interest' },
  'reels_2026': { aspectRatio: '3:2 or 2:3 or 1:1', dimensions: '~1200×800 / 600×800 / 600×600', orientation: 'flexible', tip: 'Mixed gallery — varied ratios for visual interest' },
  'about_sonicreels_hero_accent': { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Era hero & accent images — events, milestones' },
  'about_values_visual_wood_icons': { aspectRatio: '1:1', dimensions: '80×80', orientation: 'icon', tip: 'Small walnut wood icons for impact stats' },
  'about_origin_story_wood_bg': { aspectRatio: '19.2:1', dimensions: '1920×100', orientation: 'ultrawide', tip: 'Ultrawide warm chestnut wood strip — ticker background' },

  /* ═══ CASE STUDIES ═══ */
  '/images/Case Studies -Fallbsp/Avoury': { aspectRatio: '3:2 or 2:3', dimensions: '~800×600 / 600×800', orientation: 'flexible', tip: 'Gallery — product displays, booths, promotional shots' },
  '/images/Case Studies -Fallbsp/Garmin': { aspectRatio: '3:2 or 2:3', dimensions: '~800×600 / 600×800', orientation: 'flexible', tip: 'Gallery — retail displays, staff, stores' },
  '/images/Case Studies -Fallbsp/Philips': { aspectRatio: '3:2 or 2:3', dimensions: '~800×600 / 600×800', orientation: 'flexible', tip: 'Gallery — retail, promotions, team' },
  '/images/Case Studies -Fallbsp/SEB':  { aspectRatio: '3:2 or 2:3', dimensions: '~800×600 / 600×800', orientation: 'flexible', tip: 'Gallery — kitchen appliances, retail, team' },

  /* ═══ CAREERS ═══ */
  '/images/Karriere':              { aspectRatio: '3:2', dimensions: '~1200×800', orientation: 'landscape', tip: 'Hero & gallery — team, office, events' },
  'careers_hero_images':           { aspectRatio: '2.4:1', dimensions: '1920×800', orientation: 'landscape', tip: 'Hero team photo — wide, bright, diverse group' },
  'careers_team_images':           { aspectRatio: '4:3', dimensions: '800×600', orientation: 'landscape', tip: 'Team lifestyle shots — office, events, collaboration' },
  'careers_path_images':           { aspectRatio: '~2:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'Career path polaroids — wide format sales/staff' },
  'careers_events_images':         { aspectRatio: '~2:1', dimensions: '~1024×510', orientation: 'landscape', tip: 'Team events polaroids — social, celebration' },
  'careers_dreamteam_images':      { aspectRatio: '~2:1', dimensions: '~1024×510', orientation: 'landscape', tip: 'DreamTeam polaroids — events, celebration' },
  'careers_geschichten_images':    { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'Story portraits — wide format, personal stories' },
  'careers_mitarbeiterstimmen_sales_images': { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'Sales testimonials — wide portrait-style' },
  'careers_mitarbeiterstimmen_staff_images': { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'Staff testimonials — wide portrait-style' },
  'careers_sonicfaces_images':     { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'SonicFaces — wide portrait-style staff photos' },
  'careers_sonicfamily_images':    { aspectRatio: '3:4', dimensions: '600×800', orientation: 'portrait', tip: 'AI portraits — professional headshots, dark backgrounds' },
  'careers_recruitercta_image':    { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'RecruiterCTA — Tanja wide photo' },
  'careers_stellenangebote_image': { aspectRatio: '1:1', dimensions: '96×96', orientation: 'icon', tip: 'Tanja headshot — small square portrait' },
  'careers_sonic_sales_hero':      { aspectRatio: '~2:1', dimensions: '~1200×600', orientation: 'landscape', tip: 'Sonic Sales hero — wide' },
  'careers_sonic_staff_hero':      { aspectRatio: '~2:1', dimensions: '~1200×600', orientation: 'landscape', tip: 'Sonic Staff hero — wide' },
  'careers_howwehire_wood_icons':  { aspectRatio: '1:1', dimensions: '48×48', orientation: 'icon', tip: 'Tiny chestnut wood icons for hiring process steps' },
  'careers_culture_wood_icons':    { aspectRatio: '1:1', dimensions: '80×80', orientation: 'icon', tip: 'Small walnut wood icons for culture values' },
  'careers_hero_wood_icons':       { aspectRatio: '1:1', dimensions: '64×64', orientation: 'icon', tip: 'Small walnut wood icons for trust stats' },
  'careers_perks_wood_icons':      { aspectRatio: '1:1', dimensions: '48×48', orientation: 'icon', tip: 'Tiny chestnut wood icons for perk sections' },

  /* ═══ TEAM ═══ */
  'team_hero_images':          { aspectRatio: '16:9', dimensions: '1920×1080 (bg) / 96×96 (headshots)', orientation: 'landscape', tip: 'Hero bg + small square headshot photos' },
  'team_corevalues_images':    { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'Core values — Mensch, Motivation, Daten, Werkzeug' },
  'team_meet_team_wood_icons': { aspectRatio: '1:1', dimensions: '48×48', orientation: 'icon', tip: 'Tiny chestnut wood icons for team highlights' },
  'team_training_image':       { aspectRatio: '4:5', dimensions: '800×1000', orientation: 'portrait', tip: 'Tall portrait — training session' },

  /* ═══ INDUSTRIES ═══ */
  'industries_hero_bg':            { aspectRatio: '16:9', dimensions: '1920×1080', orientation: 'landscape', tip: 'Hero — dark retail scene, electronics store' },
  'industries_grid_images':        { aspectRatio: '4:3', dimensions: '800×600', orientation: 'landscape', tip: 'Industry grid cards — clean product displays' },
  'industries_expertise_wood_icons':{ aspectRatio: '1:1', dimensions: '100×100', orientation: 'icon', tip: 'Square walnut wood icons for expertise cards' },
  'industries_grid_wood_icons':    { aspectRatio: '1:1', dimensions: '64×64', orientation: 'icon', tip: 'Small chestnut wood icons for industry grid' },

  /* ═══ SRT ═══ */
  'srt_hero_icons':            { aspectRatio: '1:1', dimensions: '80×80', orientation: 'icon', tip: 'Small walnut wood icons for hero stats' },
  'srt_feature_icons':         { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square walnut wood icons for feature cards' },
  'srt_section_images':        { aspectRatio: '3:2 or 2:3', dimensions: '1200×800 (dashboard) / 600×800 (mobile)', orientation: 'landscape', tip: 'Dashboard screenshot + mobile app — mixed ratios' },
  'srt_problem_wood_icons':    { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood icons for problem cards' },
  'srt_proof_wood_icons':      { aspectRatio: '1:1', dimensions: '80×80', orientation: 'icon', tip: 'Small walnut wood icons for proof stats' },
  'srt_pricing_images':        { aspectRatio: '2:1', dimensions: '800×400', orientation: 'landscape', tip: 'Wide pricing tier images — workspace/enterprise shots' },

  /* ═══ LEISTUNGEN: Core Service Images ═══ */
  'leistungen_pos_images':        { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'POS retail displays — bright stores, products' },
  'leistungen_video_images':      { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Video production — studio, crew, equipment' },
  'leistungen_events_images':     { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Events — trade shows, booths, crowds' },
  'leistungen_staff_images':      { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Staff — brand ambassadors, team photos' },
  'leistungen_talentpool_images': { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Talentpool — diverse group, confident, professional' },
  'leistungen_warehouse_images':  { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Warehouse — clean, organized, logistics' },
  'leistungen_forecasting_images':{ aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Forecasting — dashboards, data, analytics' },
  'leistungen_kreation_images':   { aspectRatio: '3:2', dimensions: '1200×800', orientation: 'landscape', tip: 'Kreation — creative studio, designers, content' },
  'leistungen_hero_images':       { aspectRatio: '~2:1', dimensions: '~1600×800', orientation: 'landscape', tip: 'Leistungen overview hero — wide format' },
  'leistungen_servicegrid_bg':    { aspectRatio: '~2.3:1', dimensions: '~1024×444', orientation: 'landscape', tip: 'ServiceGrid backgrounds — wide format cards' },

  /* ═══ LEISTUNGEN: Process & Showcase ═══ */
  'leistungen_events_process_images':       { aspectRatio: '4:3', dimensions: '320×240', orientation: 'landscape', tip: 'Small process step thumbs — tight crop, clean scenes' },
  'leistungen_events_showcase_images':      { aspectRatio: '~2:1 or 3:2', dimensions: '~1024×510 / ~800×600', orientation: 'landscape', tip: 'Mixed — showcase gallery, varied landscape' },
  'leistungen_forecasting_process_images':  { aspectRatio: '3:2', dimensions: '600×400', orientation: 'landscape', tip: 'Process steps — data, dashboards, analysis' },
  'leistungen_kreation_carousel_images':    { aspectRatio: '7:10', dimensions: '420×600', orientation: 'portrait', tip: 'Tall portrait tiles — product photography, design' },
  'leistungen_kreation_showcase_images':    { aspectRatio: 'Mixed (4:3 to 3.4:1)', dimensions: '1200×350 to 800×600', orientation: 'landscape', tip: 'Showcase grid — ultrawide headers + regular tiles' },
  'leistungen_kreation_showcase_secondary_konzeption': { aspectRatio: 'Mixed (4:3 to 3.4:1)', dimensions: '1200×350 to 800×600', orientation: 'landscape', tip: 'Alt rotation — same structure as primary showcase' },
  'leistungen_kreation_showcase_secondary_content':   { aspectRatio: 'Mixed (4:3 to 3.4:1)', dimensions: '1200×350 to 800×600', orientation: 'landscape', tip: 'Alt rotation — same structure as primary showcase' },
  'leistungen_kreation_showcase_secondary_cgi':       { aspectRatio: 'Mixed (4:3 to 3.4:1)', dimensions: '1200×350 to 800×600', orientation: 'landscape', tip: 'Alt rotation — same structure as primary showcase' },
  'leistungen_kreation_before_after':{ aspectRatio: '1.76:1', dimensions: '1200×680', orientation: 'landscape', tip: 'Before/After slider — matching real photo & CGI render' },
  'leistungen_pos_assets_images':    { aspectRatio: '~2:1', dimensions: '~1024×510', orientation: 'landscape', tip: 'POS asset categories — wide format product/display shots' },
  'leistungen_pos_process_images':   { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'POS process steps — workshop, production, rollout' },
  'leistungen_staff_socks_images':   { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'S.O.C.K.S. images — selection, orientation, training' },
  'leistungen_talentpool_profiles_images': { aspectRatio: '~2.3:1', dimensions: '~1024×448', orientation: 'landscape', tip: 'Talent profile images — wide format' },
  'leistungen_warehouse_items_images':{ aspectRatio: '~2:1', dimensions: '~1024×510', orientation: 'landscape', tip: 'Warehouse items — POS material, display, fulfillment' },
  'leistungen_video_format_photos':  { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'Video format photos — live-video, broadcast, streaming' },

  /* ═══ LEISTUNGEN: All Wood Icons (1:1 squares, varying sizes) ═══ */
  'leistungen_stats_wood_icons':                  { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square walnut wood stat icons — laurel, scale, compass' },
  'leistungen_schallmauer_wood_icons':            { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square walnut wood way icons — rocket, chart, globe' },
  'leistungen_events_solution_wood_icons':        { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — events' },
  'leistungen_forecasting_solution_wood_icons':   { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — forecasting' },
  'leistungen_pos_solution_wood_icons':           { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — POS' },
  'leistungen_staff_solution_wood_icons':         { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — staff' },
  'leistungen_staff_specialization_wood_icons':   { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood specialization icons — staff' },
  'leistungen_video_solution_wood_icons':         { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — video' },
  'leistungen_video_advantages_wood_icons':       { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood advantage icons — video' },
  'leistungen_kreation_solution_wood_icons':      { aspectRatio: '1:1', dimensions: '112×112', orientation: 'icon', tip: 'Square walnut wood solution icons — kreation' },
  'leistungen_kreation_discipline_wood_icons':    { aspectRatio: '1:1', dimensions: '120×120', orientation: 'icon', tip: 'Square walnut wood discipline icons — kreation, produktion, CGI' },
  'leistungen_kreation_photo_grid':               { aspectRatio: '1:1', dimensions: '~600×600', orientation: 'square', tip: 'Square rotating photo grid — creative work' },
  'leistungen_warehouse_fullservice_photo':       { aspectRatio: '3:2', dimensions: '~800×600', orientation: 'landscape', tip: 'Warehouse full service — single landscape photo' },

  /* ═══ BLOG, RATGEBER, JOBS, KONTAKT ═══ */
  'blog_images':           { aspectRatio: '~2:1', dimensions: '~1024×510', orientation: 'landscape', tip: 'Blog featured image — wide format' },
  'ratgeber_hero':         { aspectRatio: '16:9', dimensions: '1920×1080', orientation: 'landscape', tip: 'Ratgeber hero — abstract knowledge hub concept' },
  'jobs_hero':             { aspectRatio: '2.4:1', dimensions: '1920×800', orientation: 'landscape', tip: 'Jobs hero — modern office, collaborative workspace' },
  'kontakt_hero':          { aspectRatio: '16:9', dimensions: '1920×1080', orientation: 'landscape', tip: 'Kontakt hero — abstract geometric concept, dark' },

  /* ═══ COMMON ═══ */
  'common_clientproof_logos': { aspectRatio: 'SVG flexible', dimensions: '~200×48', orientation: 'logo', tip: 'Brand logos — SVG preferred, dark theme' },
  'common_logos':             { aspectRatio: 'SVG flexible', dimensions: '~200×48', orientation: 'logo', tip: 'Sonic Group logo — main brand logo' },

  /* ═══ OTHER (from virtual) ═══ */
  'services_content_studio_images': { aspectRatio: '16:9 (hero) / 1:1 (consult)', dimensions: '1920×1080 / 800×800', orientation: 'landscape', tip: 'Content studio — hero wide + square consultation' },
  'services_events_images':         { aspectRatio: '16:9 (hero) / 1:1 (consult)', dimensions: '1920×1080 / 800×800', orientation: 'landscape', tip: 'Events — hero wide + square consultation' },
  'services_market_entry_images':   { aspectRatio: '2.4:1 (hero) / 1:1 (consult)', dimensions: '1920×800 / 800×800', orientation: 'landscape', tip: 'Market entry — hero wide + square consultation' },
  'services_retail_pos_images':     { aspectRatio: '16:9 (hero) / 1:1 (consult)', dimensions: '1920×1080 / 800×800', orientation: 'landscape', tip: 'Retail POS — hero wide + square consultation' },
  'services_staffing_images':       { aspectRatio: '16:9 (hero) / 1:1 (consult)', dimensions: '1920×1080 / 800×800', orientation: 'landscape', tip: 'Staffing — hero wide + square consultation' },

  /* ═══ LVP — desktop only (no dashboard integration yet for these, but specs for reference) ═══ */
  'lvp_hero_images':     { aspectRatio: '2.4:1 / 4:3', dimensions: '1920×800 / 800×600', orientation: 'landscape', tip: 'LVP hero bg + presenter shot' },
  'lvp_studio_images':   { aspectRatio: '3:2', dimensions: '1200×800 / 800×600', orientation: 'landscape', tip: 'LVP studio — overview, editing, photography' },
  'lvp_creative_images': { aspectRatio: '16:9', dimensions: '800×450', orientation: 'landscape', tip: 'LVP creative thumbnails — 16:9 video format' },
};
/* ─────────────────────────────────────────────
   SUPABASE SYNC — cross-browser persistence
   Stores only overrides (diff from DEFAULT_MEDIA)
   in the media_store table. On page load, any
   browser pulls the latest overrides and merges
   them with DEFAULT_MEDIA, so image changes made
   in one browser appear everywhere.
───────────────────────────────────────────── */
const SUPABASE_STORE_ID = 1;
const LAST_SYNC_TS_KEY = 'sonic_media_last_sync_ts';
let _supabaseSyncInFlight = false;
let _supabaseSyncNeeded = false;

function getSupabaseOverridesCache(): MediaSections | null {
  try {
    const raw = localStorage.getItem('sonic_media_supabase_cache');
    if (!raw) return null;
    return JSON.parse(raw) as MediaSections;
  } catch {
    return null;
  }
}

function setSupabaseOverridesCache(overrides: MediaSections): void {
  try {
    localStorage.setItem('sonic_media_supabase_cache', JSON.stringify(overrides));
  } catch { /* quota exceeded — ignore */ }
}

async function pullOverridesFromSupabase(): Promise<MediaSections | null> {
  try {
    const { data, error } = await supabase
      .from('media_store')
      .select('data, updated_at')
      .eq('id', SUPABASE_STORE_ID)
      .maybeSingle();

    if (error || !data?.data) return null;

    const overrides = data.data as MediaSections;
    if (overrides && typeof overrides === 'object' && Object.keys(overrides).length > 0) {
      // Content-based staleness check: if localStorage already contains all items
      // that are in the remote overrides, then local is at least as fresh.
      const localRaw = (() => {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch { return null; }
      })();

      if (localRaw) {
        let localHasAllRemote = true;
        for (const key of Object.keys(overrides)) {
          const remoteItems = overrides[key] || [];
          const localItems = localRaw[key] || [];
          const localUrls = new Set(localItems.map((item: MediaItem) => item.url));
          for (const item of remoteItems) {
            if (!localUrls.has(item.url)) {
              localHasAllRemote = false;
              break;
            }
          }
          if (!localHasAllRemote) break;
        }
        if (localHasAllRemote) {
          // Local has everything remote has — update the cache but skip the merge
          setSupabaseOverridesCache(overrides);
          return null;
        }
      }

      setSupabaseOverridesCache(overrides);
      localStorage.setItem(LAST_SYNC_TS_KEY, String(Date.now()));
      return overrides;
    }
    return null;
  } catch {
    return null;
  }
}

async function pushOverridesToSupabase(overrides: MediaSections): Promise<void> {
  if (_supabaseSyncInFlight) {
    _supabaseSyncNeeded = true;
    return;
  }
  _supabaseSyncInFlight = true;
  try {
    // Loop: after each sync completes, check if more changes were queued up
    let currentOverrides = overrides;
    do {
      _supabaseSyncNeeded = false;
      await supabase
        .from('media_store')
        .upsert({ id: SUPABASE_STORE_ID, data: currentOverrides, updated_at: new Date().toISOString() });
      setSupabaseOverridesCache(currentOverrides);
      localStorage.setItem(LAST_SYNC_TS_KEY, String(Date.now()));

      // If more changes came in while we were syncing, compute fresh overrides and sync again
      if (_supabaseSyncNeeded) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const store = JSON.parse(raw) as MediaSections;
            currentOverrides = computeOverrides(store);
          } catch { /* ignore parse errors */ }
        }
      }
    } while (_supabaseSyncNeeded);
  } catch { /* network down — localStorage still works */ }
  finally {
    _supabaseSyncInFlight = false;
  }
}

function computeOverrides(store: MediaSections): MediaSections {
  const overrides: MediaSections = {};
  for (const key of Object.keys(store)) {
    const current = store[key];
    const defaultVal = DEFAULT_MEDIA[key];

    if (!current || current.length === 0) {
      if (defaultVal && defaultVal.length > 0) {
        overrides[key] = [];
      }
      continue;
    }

    if (!defaultVal || defaultVal.length === 0) {
      overrides[key] = current;
      continue;
    }

    if (JSON.stringify(current) !== JSON.stringify(defaultVal)) {
      overrides[key] = current;
    }
  }
  return overrides;
}

async function syncOverridesToSupabase(store: MediaSections): Promise<void> {
  const overrides = computeOverrides(store);
  await pushOverridesToSupabase(overrides);
}

const STORAGE_KEY = 'sonic_media_store';

let _cachedStore: MediaSections | null = null;

function invalidateCache() {
  _cachedStore = null;
}

function getStoreSnapshot(): MediaSections {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const merged = { ...DEFAULT_MEDIA };

    // Layer 1: Supabase overrides (cross-browser base data)
    const supabaseOverrides = getSupabaseOverridesCache();
    if (supabaseOverrides) {
      for (const key of Object.keys(supabaseOverrides)) {
        merged[key] = supabaseOverrides[key];
      }
    }

    // Layer 2: localStorage (local edits ALWAYS win — prevents stale
    // Supabase overrides from undoing fresh local changes)
    if (raw) {
      const parsed = JSON.parse(raw) as MediaSections;
      for (const key of Object.keys(parsed)) {
        merged[key] = parsed[key];
      }
    }

    return merged;
  } catch {
    return { ...DEFAULT_MEDIA };
  }
}

function loadFromStorage(): MediaSections {
  if (_cachedStore) return _cachedStore;
  _cachedStore = getStoreSnapshot();
  return _cachedStore;
}

function saveToStorage(store: MediaSections): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    invalidateCache();

    // Immediately sync the local Supabase override cache so getStoreSnapshot()
    // doesn't re-apply stale overrides on top of fresh edits (fixes the
    // "must delete twice" bug caused by async Supabase sync lag).
    const overrides = computeOverrides(store);
    setSupabaseOverridesCache(overrides);

    // Record the timestamp of this local edit so pullOverridesFromSupabase
    // knows localStorage is fresh and won't overwrite it with stale Supabase data.
    const now = Date.now();
    localStorage.setItem(LAST_SYNC_TS_KEY, String(now));

    window.dispatchEvent(new Event('media-store-update'));

    // Fire-and-forget sync to Supabase so other browsers see changes
    syncOverridesToSupabase(store);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown storage error';
    throw new Error(`Failed to save media store: ${msg}`);
  }
}

/* ─────────────────────────────────────────────
   CATEGORIES — with lightweight memoization
───────────────────────────────────────────────────────── */
let _cachedCategoriesList: CategoryInfo[] | null = null;
let _cachedCategoriesByGroup: Record<string, CategoryInfo[]> | null = null;

export function invalidateCategoryCache() {
  _cachedCategoriesList = null;
  _cachedCategoriesByGroup = null;
}

/* ─────────────────────────────────────────────
   PUBLIC API
───────────────────────────────────────────── */
export interface CategoryInfo {
  key: string;
  label: string;
  pageGroupId: string;
  imageCount: number;
  recommendedCount: number;
  designSpec: DesignSpec | null;
}

export interface DesignSpec {
  aspectRatio: string;
  dimensions: string;
  orientation: 'landscape' | 'portrait' | 'square' | 'ultrawide' | 'flexible' | 'icon' | 'logo';
  tip: string;
}

export function getPageGroupForSection(sectionKey: string): string {
  for (const group of PAGE_GROUPS) {
    if (group.sections.includes(sectionKey)) return group.id;
  }
  return 'other';
}

export function getCategoriesList(): CategoryInfo[] {
  if (_cachedCategoriesList) return _cachedCategoriesList;

  const store = loadFromStorage();
  const allKeys = Object.keys(store);
  _cachedCategoriesList = allKeys.map((key) => {
    const label = HUMAN_LABELS[key] || typedManifest[key]?.label || key;
    const pageGroupId = getPageGroupForSection(key);
    const items = store[key];
    const defaultItems = DEFAULT_MEDIA[key];
    const recommendedCount = DESIGN_RECOMMENDED[key] ?? (defaultItems ? defaultItems.length : 0);
    const designSpec = DESIGN_SPECS[key] || null;
    return { key, label, pageGroupId, imageCount: items ? items.length : 0, recommendedCount, designSpec };
  }).sort((a, b) => a.label.localeCompare(b.label));

  return _cachedCategoriesList;
}

export function getCategoriesByPageGroup(): Record<string, CategoryInfo[]> {
  if (_cachedCategoriesByGroup) return _cachedCategoriesByGroup;

  const all = getCategoriesList();
  const result: Record<string, CategoryInfo[]> = {};
  for (const cat of all) {
    if (!result[cat.pageGroupId]) result[cat.pageGroupId] = [];
    result[cat.pageGroupId].push(cat);
  }
  // Ensure PAGE_GROUPS order
  const ordered: Record<string, CategoryInfo[]> = {};
  for (const group of PAGE_GROUPS) {
    if (result[group.id]) ordered[group.id] = result[group.id];
  }
  for (const key of Object.keys(result)) {
    if (!ordered[key]) ordered[key] = result[key];
  }
  _cachedCategoriesByGroup = ordered;

  // Clean up stale list cache to keep them in sync
  return ordered;
}

export function getSectionImages(sectionKey: string): MediaItem[] {
  const store = loadFromStorage();
  return store[sectionKey] || [];
}

export function addSectionImage(sectionKey: string, url: string, caption = '', wide = false): boolean {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) {
    store[sectionKey] = [];
  }

  if (store[sectionKey].some((item) => item.url === url)) {
    return false;
  }

  store[sectionKey] = [...store[sectionKey], { url, caption, wide }];
  saveToStorage(store);
  return true;
}

export function deleteSectionImage(sectionKey: string, url: string): void {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) return;

  store[sectionKey] = store[sectionKey].filter((item) => item.url !== url);
  saveToStorage(store);
}

export function addSectionImagesBulk(sectionKey: string, items: MediaItem[]): number {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) {
    store[sectionKey] = [];
  }

  const existingUrls = new Set(store[sectionKey].map((item) => item.url));
  const newItems = items.filter((item) => !existingUrls.has(item.url));

  if (newItems.length === 0) return 0;

  store[sectionKey] = [...store[sectionKey], ...newItems];
  saveToStorage(store);
  return newItems.length;
}

export function deleteSectionImagesBulk(sectionKey: string, urls: string[]): number {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) return 0;

  const urlSet = new Set(urls);
  const beforeCount = store[sectionKey].length;
  store[sectionKey] = store[sectionKey].filter((item) => !urlSet.has(item.url));
  saveToStorage(store);
  return beforeCount - store[sectionKey].length;
}

export function resetMediaStore(): void {
  invalidateCategoryCache();
  saveToStorage({ ...DEFAULT_MEDIA });
}

export function resetSection(sectionKey: string): void {
  invalidateCategoryCache();
  const store = loadFromStorage();
  store[sectionKey] = [...(DEFAULT_MEDIA[sectionKey] || [])];
  saveToStorage(store);
}

export function updateSectionImage(sectionKey: string, oldUrl: string, updates: { url?: string; caption?: string; wide?: boolean }): void {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) return;

  store[sectionKey] = store[sectionKey].map((item) => {
    if (item.url === oldUrl) {
      return {
        ...item,
        ...(updates.url !== undefined && { url: updates.url }),
        ...(updates.caption !== undefined && { caption: updates.caption }),
        ...(updates.wide !== undefined && { wide: updates.wide }),
      };
    }
    return item;
  });
  saveToStorage(store);
}

export function reorderSectionImages(sectionKey: string, fromIndex: number, toIndex: number): void {
  invalidateCategoryCache();
  const store = loadFromStorage();
  if (!store[sectionKey]) return;

  const items = [...store[sectionKey]];
  if (fromIndex < 0 || fromIndex >= items.length || toIndex < 0 || toIndex >= items.length) return;

  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  store[sectionKey] = items;
  saveToStorage(store);
}

export function getTotalImageCount(): number {
  const store = loadFromStorage();
  let total = 0;
  for (const key of Object.keys(store)) {
    const items = store[key];
    if (items) total += items.length;
  }
  return total;
}

/* ─────────────────────────────────────────────
   REACT HOOK
───────────────────────────────────────────── */
export function useMediaStore(sectionKey: string) {
  const [images, setImages] = useState<MediaItem[]>(() =>
    getSectionImages(sectionKey).map((item) => ({ ...item, url: resolveImageUrl(item.url) }))
  );

  // Re-initialize whenever sectionKey changes
  useEffect(() => {
    const raw = getSectionImages(sectionKey);
    setImages(raw.map((item) => ({ ...item, url: resolveImageUrl(item.url) })));
  }, [sectionKey]);

  useEffect(() => {
    const handleUpdate = () => {
      invalidateCache();
      const raw = getSectionImages(sectionKey);
      setImages(raw.map((item) => ({ ...item, url: resolveImageUrl(item.url) })));
    };

    window.addEventListener('media-store-update', handleUpdate);
    return () => {
      window.removeEventListener('media-store-update', handleUpdate);
    };
  }, [sectionKey]);

  return {
    images,
    addImage: (url: string, caption?: string, wide?: boolean) =>
      addSectionImage(sectionKey, url, caption, wide),
    deleteImage: (url: string) =>
      deleteSectionImage(sectionKey, url),
    reset: () => resetSection(sectionKey),
  };
}

/* ─────────────────────────────────────────────
   CROSS-BROWSER SYNC INITIALIZATION
   On every page load, pull the latest overrides
   from Supabase so image changes appear everywhere.
───────────────────────────────────────────── */
if (typeof window !== 'undefined') {
  pullOverridesFromSupabase().then((remoteOverrides) => {
    if (!remoteOverrides || Object.keys(remoteOverrides).length === 0) return;

    // Union merge: start with DEFAULT_MEDIA, then apply Supabase overrides,
    // then overlay localStorage. localStorage ALWAYS wins — it is the freshest
    // source for this browser session and must never be overwritten.
    const localRaw = (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    })();

    const merged = { ...DEFAULT_MEDIA };

    // Layer 1 — apply Supabase overrides (data from other browsers)
    for (const key of Object.keys(remoteOverrides)) {
      merged[key] = remoteOverrides[key];
    }

    // Layer 2 — overlay local data. For any key where local exists, do a
    // URL-based union so images added locally are never lost even if remote
    // has different items for that key.
    if (localRaw) {
      for (const key of Object.keys(localRaw)) {
        const localItems: MediaItem[] = localRaw[key] || [];
        const remoteItems: MediaItem[] = remoteOverrides[key] || [];

        if (remoteItems.length === 0) {
          // No remote data for this key — local wins entirely
          merged[key] = localItems;
        } else {
          // Merge: start with local, append any remote items not already in local
          const localUrls = new Set(localItems.map((i) => i.url));
          const remoteOnly = remoteItems.filter((i) => !localUrls.has(i.url));
          merged[key] = [...localItems, ...remoteOnly];
        }
      }
    }

    // Persist merged result only if it differs from current localStorage
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY);
      const mergedStr = JSON.stringify(merged);
      if (currentRaw !== mergedStr) {
        localStorage.setItem(STORAGE_KEY, mergedStr);
        invalidateCache();
        window.dispatchEvent(new Event('media-store-update'));
      }
    } catch { /* quota */ }
  });
}