import { useState, useEffect } from 'react';
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
      'leistungen_video_youtube',
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
      'about_client_logos',
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
      'srt_video_media_1',
      'srt_video_media_2',
      'srt_video_media_3',
      'srt_product_desktop',
      'srt_product_mobile',
      'srt_hero_images',
      'srt_hero_icons',
      'srt_feature_icons',
      'srt_functionality_images',
      'srt_section_images',
      'srt_problem_wood_icons',
      'srt_proof_wood_icons',
      'srt_joerg_photo',
      'srt_pricing_images',
    ],
  },
  // ═══ SITE SETTINGS ═══
  {
    id: 'site_settings',
    label: 'Site-Einstellungen',
    icon: 'ri-settings-3-line',
    sections: [
      'site_favicon',
      'site_og_image',
      'site_logo',
    ],
  },
  // common group has no active mediaStore usage — components use hardcoded assets
  // Keeping empty group so sidebar navigation still shows it
  {
    id: 'case_studies',
    label: 'Fallbeispiele',
    icon: 'ri-trophy-line',
    sections: [
      'case_studies_hero_images',
      'case_studies_brand_logos',
      // Garmin Impressionen
      'case_garmin_gallery_1',
      'case_garmin_gallery_2',
      'case_garmin_gallery_3',
      'case_garmin_gallery_4',
      // Groupe SEB Impressionen
      'case_seb_gallery_1',
      'case_seb_gallery_2',
      'case_seb_gallery_3',
      'case_seb_gallery_4',
      // TV & Sound Impressionen
      'case_tvsound_gallery_1',
      'case_tvsound_gallery_2',
      'case_tvsound_gallery_3',
      'case_tvsound_gallery_4',
      // Avoury Impressionen
      'case_avoury_gallery_1',
      'case_avoury_gallery_2',
      'case_avoury_gallery_3',
      'case_avoury_gallery_4',
      // Module images — controllable from dashboard
      'case_garmin_module_1','case_garmin_module_2','case_garmin_module_3',
      'case_garmin_module_4','case_garmin_module_5',
      'case_seb_module_1','case_seb_module_2','case_seb_module_3',
      'case_seb_module_4','case_seb_module_5','case_seb_module_6',
      'case_avoury_module_1','case_avoury_module_2','case_avoury_module_3',
      'case_avoury_module_4','case_avoury_module_5',
      'case_tvsound_module_1','case_tvsound_module_2','case_tvsound_module_3',
    ],
  },
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
    { url: '', caption: 'Produkte verkauft — Laurel Wreath Icon' },
    { url: '', caption: 'Umsatz generiert — Balance Scale Icon' },
    { url: '', caption: 'Einsätze — Compass Rose Icon' },
    { url: '', caption: 'Live Video Calls — Antenna Icon' },
  ],

  /* ── HOME: Hero CTA Wood Icons ── */
  home_hero_cta_icons: [
    { url: '', caption: 'Agentur CTA — Chart Icon' },
    { url: '', caption: 'Job CTA — Team Icon' },
  ],

  /* ── HOME: Hero Wood Textures ── */
  home_hero_wood_textures: [
    { url: '', caption: 'Left CTA Button — Wood Texture' },
    { url: '', caption: 'Right CTA Button — Wood Texture' },
    { url: '', caption: 'Vertical Divider — Wood Texture' },
  ],

  /* ── HOME: Showcase Service Images ── */
  home_showcase_service_images: [
    { url: '', caption: 'Staff Service — Brand Ambassador Team', wide: true },
    { url: '', caption: 'Point of Sale — Retail Display', wide: true },
    { url: '', caption: 'SRT — Analytics Dashboard', wide: true },
    { url: '', caption: 'Live Video — Studio Setup', wide: true },
    { url: '', caption: 'Messe & Event — Trade Show Booth', wide: true },
  ],

  /* ── HOME: Showcase Wood Icons ── */
  home_showcase_wood_icons: [
    { url: '', caption: 'Staff Service — Team Wood Icon' },
    { url: '', caption: 'POS — Store Wood Icon' },
    { url: '', caption: 'SRT — Analytics Wood Icon' },
    { url: '', caption: 'LVP — Video Wood Icon' },
    { url: '', caption: 'Events — Calendar Wood Icon' },
  ],

  /* ── HOME: POS Remote ── */
  home_pos: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', caption: 'POS Display' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg', caption: 'Flächenberatung' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Sony PlayStation POS' },
  ],

  /* ── LÖSUNGEN: Hero Backgrounds ── */
  losungen_hero_backgrounds: [
    { url: '', caption: 'Lösungen — Main Hero Background', wide: true },
    { url: '', caption: 'Markteintritt — Expanded Hero', wide: true },
    { url: '', caption: 'Absatz steigern — Expanded Hero', wide: true },
    { url: '', caption: 'Omnichannel — Expanded Hero', wide: true },
  ],

  /* ── LÖSUNGEN: Deliverable Images ── */
  /* Order follows dBase mapping: indices 0-6 Markteintritt (7), 7-14 Absatz (8), 15-22 Omnichannel (8) = 23 total */
  losungen_deliverable_images: [
    /* ── Markteintritt (indices 0–6) ── */
    { url: '', caption: 'Markteintritt — Brand Ambassadors am POS' },
    { url: '', caption: 'Markteintritt — Verkäuferschulungen' },
    { url: '', caption: 'Markteintritt — Launch-Events' },
    { url: '', caption: 'Markteintritt — Videocontent & Live-Beratung' },
    { url: '', caption: 'Markteintritt — POS-Design' },
    { url: '', caption: 'Markteintritt — Datenbasierte Planung' },
    { url: '', caption: 'Markteintritt — Live-Reporting' },

    /* ── Absatz steigern (indices 7–14) ── */
    { url: '', caption: 'Absatz — Menschen auf der Fläche' },
    { url: '', caption: 'Absatz — Daten in der Planung' },
    { url: '', caption: 'Absatz — GPS Dashboard' },
    { url: '', caption: 'Absatz — Forecasting' },
    { url: '', caption: 'Absatz — Einsatzplanung' },
    { url: '', caption: 'Absatz — Performance-Tracking' },
    { url: '', caption: 'Absatz — Sell-in-Support' },
    { url: '', caption: 'Absatz — Kontinuierliche Optimierung' },

    /* ── Omnichannel (indices 15–22) ── */
    { url: '', caption: 'Omnichannel — Im Online-Shop' },
    { url: '', caption: 'Omnichannel — QR-Code Beratung' },
    { url: '', caption: 'Omnichannel — POS-Display' },
    { url: '', caption: 'Omnichannel — Geschulte Video-Berater' },
    { url: '', caption: 'Omnichannel — Multitalente' },
    { url: '', caption: 'Omnichannel — Technische Integration' },
    { url: '', caption: 'Omnichannel — Reporting' },
    { url: '', caption: 'Omnichannel — Skalierbarkeit' },
  ],

  /* ── LÖSUNGEN: Process Step Images ── */
  losungen_step_images: [
    { url: '', caption: 'Markteintritt — Step 1: Briefing' },
    { url: '', caption: 'Markteintritt — Step 2: Standortplanung' },
    { url: '', caption: 'Markteintritt — Step 3: Team-Aufbau' },
    { url: '', caption: 'Markteintritt — Step 4: Launch' },
    { url: '', caption: 'Markteintritt — Step 5: Tracking' },
    { url: '', caption: 'Absatz — Step 1: Analyse' },
    { url: '', caption: 'Absatz — Step 2: Forecasting' },
    { url: '', caption: 'Absatz — Step 3: Team' },
    { url: '', caption: 'Absatz — Step 4: Rollout' },
    { url: '', caption: 'Absatz — Step 5: Skalierung' },
    { url: '', caption: 'Omnichannel — Step 1: Pilotkonzept' },
    { url: '', caption: 'Omnichannel — Step 2: Integration' },
    { url: '', caption: 'Omnichannel — Step 3: Go-Live' },
    { url: '', caption: 'Omnichannel — Step 4: Optimierung' },
  ],

  /* ── LÖSUNGEN: Testimonial Images ── */
  losungen_testimonial_images: [
    { url: '', caption: 'Testimonial — Garmin', wide: true },
    { url: '', caption: 'Testimonial — Samsung', wide: true },
    { url: '', caption: 'Testimonial — Avoury', wide: true },
  ],

  /* ── LÖSUNGEN: Wood Textures ── */
  losungen_wood_textures: [
    { url: '', caption: 'Wood Card — Main Background', wide: true },
    { url: '', caption: 'Expanded Panel — Wood Overlay', wide: true },
    { url: '', caption: 'Survey Card — Wood Texture' },
  ],

  /* ── SRT: Hero Wood Icons ── */

  /* ── CASE STUDIES: Impressionen Grouped Galleries ── */
  /* Each key = one named category with multiple images uploadable */

  /* Garmin */
  case_garmin_gallery_1: [],
  case_garmin_gallery_2: [],
  case_garmin_gallery_3: [],
  case_garmin_gallery_4: [],

  /* Groupe SEB */
  case_seb_gallery_1: [],
  case_seb_gallery_2: [],

  /* TV & Sound */
  case_tvsound_gallery_1: [],
  case_tvsound_gallery_2: [],

  /* Groupe SEB — 2 additional */
  case_seb_gallery_3: [],
  case_seb_gallery_4: [],

  /* TV & Sound — 2 additional */
  case_tvsound_gallery_3: [],
  case_tvsound_gallery_4: [],
  case_garmin_module_1: [],
  case_garmin_module_2: [],
  case_garmin_module_3: [],
  case_garmin_module_4: [],
  case_garmin_module_5: [],
  case_seb_module_1: [],
  case_seb_module_2: [],
  case_seb_module_3: [],
  case_seb_module_4: [],
  case_seb_module_5: [],
  case_seb_module_6: [],
  case_avoury_module_1: [],
  case_avoury_module_2: [],
  case_avoury_module_3: [],
  case_avoury_module_4: [],
  case_avoury_module_5: [],
  case_tvsound_module_1: [],
  case_tvsound_module_2: [],
  case_tvsound_module_3: [],

  /* Avoury — 2 additional */
  case_avoury_gallery_1: [],
  case_avoury_gallery_2: [],
  case_avoury_gallery_3: [],
  case_avoury_gallery_4: [],
  case_tvsound_gallery_1: [],
  case_tvsound_gallery_2: [],
  case_tvsound_gallery_3: [],
  case_tvsound_gallery_4: [],
  case_garmin_module_1: [],
  case_garmin_module_2: [],
  case_garmin_module_3: [],
  case_garmin_module_4: [],
  case_garmin_module_5: [],
  case_seb_module_1: [],
  case_seb_module_2: [],
  case_seb_module_3: [],
  case_seb_module_4: [],
  case_seb_module_5: [],
  case_seb_module_6: [],
  case_avoury_module_1: [],
  case_avoury_module_2: [],
  case_avoury_module_3: [],
  case_avoury_module_4: [],
  case_avoury_module_5: [],
  case_tvsound_module_1: [],
  case_tvsound_module_2: [],
  case_tvsound_module_3: [],

  /* ── SRT: Product Showcase (Desktop + Mobile renders) ── */
  /* ── SRT: Video Showcase media (YouTube URL / video file / image — any type) ── */
  srt_video_media_1: [
    { url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', caption: 'Live Reporting — YouTube URL, Video-Datei oder Bild', wide: true },
  ],
  srt_video_media_2: [
    { url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', caption: 'Einsatzplanung — YouTube URL, Video-Datei oder Bild', wide: true },
  ],
  srt_video_media_3: [
    { url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', caption: 'Analytics — YouTube URL, Video-Datei oder Bild', wide: true },
  ],

  /* ── SRT: Case Studies dashboard control ── */
  case_studies_hero_images: [],
  case_studies_brand_logos: [],

  srt_product_desktop: [
    { url: '', caption: 'SRT Desktop — Dashboard Showcase', wide: true },
  ],
  srt_product_mobile: [
    { url: '', caption: 'SRT Mobile — App Showcase', wide: false },
  ],

  srt_hero_images: [
    { url: '', caption: 'SRT Hero — Hintergrundfoto', wide: true },
  ],

  srt_hero_icons: [
    { url: '', caption: 'SRT Hero — Versionen Icon' },
    { url: '', caption: 'SRT Hero — Tasks Icon' },
    { url: '', caption: 'SRT Hero — Gehälter Icon' },
    { url: '', caption: 'SRT Hero — In Betrieb Icon' },
  ],

  /* ── SRT: Feature Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  srt_feature_icons: [
    { url: '', caption: 'Echtzeit-Dashboard — Wood Icon' },
    { url: '', caption: 'Performance-Tracking — Wood Icon' },
    { url: '', caption: 'Team-Management — Wood Icon' },
    { url: '', caption: 'Reportings — Wood Icon' },
    { url: '', caption: 'Mobile App — Wood Icon' },
    { url: '', caption: 'Datensicherheit — Wood Icon' },
  ],

  /* ── SRT: Section Images ── */
  srt_section_images: [
    { url: '', caption: 'SRT — Dashboard Screenshot', wide: true },
    { url: '', caption: 'SRT — Mobile App Screenshot' },
  ],

  /* ── SRT: FunctionalityOverview Module Dashboard Screenshots ── */
  srt_functionality_images: [
    { url: '', caption: 'Planung — Dashboard' },
    { url: '', caption: 'Talentpool — Dashboard' },
    { url: '', caption: 'GPS Check-In — Dashboard' },
    { url: '', caption: 'Externe Daten — Dashboard' },
    { url: '', caption: 'Document Intelligence — Dashboard' },
    { url: '', caption: 'Routenplanung — Dashboard' },
  ],

  /* ── LVP: Hero Images ── */
  lvp_hero_images: [
    { url: '', caption: 'LVP — Hero Background', wide: true },
    { url: '', caption: 'LVP — Presenter Shot' },
  ],

  /* ── LVP: Studio Images ── */
  lvp_studio_images: [
    { url: '', caption: 'LVP — Studio Overview', wide: true },
    { url: '', caption: 'LVP — Editing Suite' },
    { url: '', caption: 'LVP — Product Photography' },
  ],

  /* ── LVP: Creative Showcase ── */
  lvp_creative_images: [
    { url: '', caption: 'LVP — Demo Video Thumbnail' },
    { url: '', caption: 'LVP — Live Shopping Split' },
    { url: '', caption: 'LVP — Behind the Scenes' },
  ],

  /* ── CAREERS: Hero Images ── */
  careers_hero_images: [
    { url: '', caption: 'Karriere — Hero Team Photo', wide: true },
  ],

  /* ── CAREERS: Team Images ── */
  careers_team_images: [
    { url: '', caption: 'Karriere — Office Collaboration' },
    { url: '', caption: 'Karriere — Team Event' },
    { url: '', caption: 'Karriere — Modern Office' },
  ],

  /* ── CAREERS: Career Path Polaroid Images ── */
  careers_path_images: [
    { url: '', caption: 'Sales Family — Polaroid', wide: true },
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
    { url: '', caption: 'Content Creation — Polaroid', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', caption: 'Team Events — Polaroid', wide: true },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', caption: 'Promoter Events — Polaroid', wide: true },
  ],

  /* ── CAREERS: DreamTeam Events Images ── */
  careers_dreamteam_images: [
    { url: '', caption: 'Jährlicher Team-Summit', wide: true },
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

  /* ── GLOBAL: Site Branding & Settings ── */
  site_favicon: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png', caption: 'Favicon — 32x32 PNG empfohlen', wide: false },
  ],
  site_og_image: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png', caption: 'OG:Image — 1200x630 PNG empfohlen', wide: true },
  ],
  site_logo: [
    { url: '', caption: 'Logo Light — SVG/PNG', wide: false },
  ],

  /* ── CAREERS: SonicFamily AI Portrait Images ── */
  /* ── CAREERS: DNA Section Wood Icons (4 items matching DNA_DATA order) ── */
  careers_dna_wood_icons: [
    { url: '', caption: 'Der Mensch — Wood Icon' },
    { url: '', caption: 'Der Antrieb — Wood Icon' },
    { url: '', caption: 'Die Daten — Wood Icon' },
    { url: '', caption: 'Das Werkzeug — Wood Icon' },
  ],

  careers_sonicfamily_images: [
    { url: '', caption: 'Sascha M. — Senior IT Admin' },
    { url: '', caption: 'Marcel W. — Finance Controller' },
    { url: '', caption: 'Andrew W. — Event and Logistics Manager' },
    { url: '', caption: 'Michelle G. — Senior Project Manager' },
    { url: '', caption: 'Janina B. — HR Manager' },
    { url: '', caption: 'Inga L. — Jr Art Direktor' },
  ],

  /* ── KREATION: Team Faces ── */
  kreation_faces_robert: [
    { url: '', caption: 'Robert H. — Creative Director' },
  ],
  kreation_faces_inga: [
    { url: '', caption: 'Inga L. — Head of Content' },
  ],

  /* ── CAREERS: RecruiterCTA Image ── */
  careers_recruitercta_image: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', caption: 'Tanja — Recruiting Team', wide: true },
  ],

  /* ── CAREERS: Stellenangebote Tanja Portrait ── */
  careers_stellenangebote_image: [
    { url: '', caption: 'Tanja — HR Team Portrait' },
  ],

  /* ── CAREERS: Sonic Sales Hero ── */
  careers_sonic_sales_hero: [
    { url: '', caption: 'Sonic Sales — Hero Background', wide: true },
  ],

  /* ── CAREERS: Sonic Staff Hero ── */
  careers_sonic_staff_hero: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', caption: 'Sonic Staff — Hero Background', wide: true },
  ],

  /* ── CAREERS: HowWeHire — Wood Icons ── */
  careers_howwehire_wood_icons: [
    { url: '', caption: 'Bewerbungscheck — File Icon' },
    { url: '', caption: 'Erstgespräch — Video Call Icon' },
    { url: '', caption: 'Skills-Check — Pencil Icon' },
    { url: '', caption: 'Team-Interview — Team Icon' },
    { url: '', caption: 'Leadership-Gespräch — Star Person Icon' },
    { url: '', caption: 'Angebot & Verhandlung — Handshake Icon' },
    { url: '', caption: 'Willkommen — Rocket Icon' },
  ],

  /* ── CAREERS: Pictorial Showcase ── */
  careers_pictorial_showcase: [
    { url: '', caption: 'Team Moment 1' },
    { url: '', caption: 'Team Moment 2' },
    { url: '', caption: 'Team Moment 3' },
    { url: '', caption: 'Team Moment 4' },
    { url: '', caption: 'Team Moment 5' },
    { url: '', caption: 'Team Moment 6' },
  ],

  /* ── CAREERS: KarriereCulture — Wood Icons ── */
  careers_culture_wood_icons: [
    { url: '', caption: 'Gemeinschaftlich — Team Icon' },
    { url: '', caption: 'Menschlich — Heart Icon' },
    { url: '', caption: 'Flexibel — Arrows Icon' },
    { url: '', caption: 'Einfachheit — Target Icon' },
    { url: '', caption: 'Verantwortung — Shield Icon' },
    { url: '', caption: 'Arbeitsumfeld — Building Icon' },
  ],

  /* ── CAREERS: KarriereHero — Trust Stat Wood Icons ── */
  careers_hero_wood_icons: [
    { url: '', caption: 'Kununu Score — Star Icon' },
    { url: '', caption: 'Betriebszugehörigkeit — Clock Icon' },
    { url: '', caption: 'Talente — Team Icon' },
  ],

  /* ── CAREERS: PerksAndBenefits — Section Wood Icons ── */
  careers_perks_wood_icons: [
    { url: '', caption: 'Sales Staff — Star Person Icon' },
    { url: '', caption: 'Interne Staff — Briefcase Icon' },
  ],

  /* ── LEISTUNGEN: Events Images ── */
  leistungen_events_images: [
    { url: '', caption: 'Events — Trade Show Booth', wide: true },
    { url: '', caption: 'Events — Corporate Stage' },
  ],

  /* ── LEISTUNGEN: Kreation Images ── */
  leistungen_kreation_images: [
    { url: '', caption: 'Kreation — Creative Studio', wide: true },
  ],

  /* ── LEISTUNGEN: POS Images ── */
  leistungen_pos_images: [
    { url: '', caption: 'POS — Retail Display', wide: true },
  ],

  /* ── LEISTUNGEN: Staff Images ── */
  leistungen_staff_images: [
    { url: '', caption: 'Staff — Brand Ambassador Team', wide: true },
  ],

  /* ── LEISTUNGEN: Video Images ── */
  leistungen_video_images: [
    { url: '', caption: 'Video — Production Set', wide: true },
  ],

  /* ── SONIC REELS: Virtual ── */
  reels_2015_2019: [
    { url: '', caption: 'Samsung Galaxy S7 launch activation, 2016', wide: true },
    { url: '', caption: 'Sonic Training Academy launch, 2017' },
    { url: '', caption: 'TV & Sound — POS Aktivierung' },
    { url: '', caption: 'IFA Berlin — largest activation to date, 2018', wide: true },
    { url: '', caption: 'Dyson luxury retail — Zurich, 2018' },
    { url: '', caption: '500 ambassadors milestone dinner, 2019' },
  ],
  reels_2024: [
    { url: '', caption: 'SRT platform commercial launch event, 2024', wide: true },
    { url: '', caption: 'Garmin 122-location network launch, 2024' },
    { url: '', caption: 'TV & Sound — Messe & Roadshow' },
    { url: '', caption: 'IFA Berlin — SRT-tracked activation, 2024', wide: true },
    { url: '', caption: '€2B+ lifetime sales milestone, 2024' },
    { url: '', caption: 'SRT live performance map — DACH coverage' },
  ],
  reels_2025: [
    { url: '', caption: 'Sonic team — 2,000+ active ambassadors, 2025', wide: true },
    { url: '', caption: 'Samsung Galaxy flagship launch, 2025' },
    { url: '', caption: 'TV & Sound — Training & Team' },
    { url: '', caption: 'Sonic wins POPAI Best Agency — Germany, 2025', wide: true },
    { url: '', caption: 'New HQ — Cologne, 2025' },
    { url: '', caption: 'Year-end celebration, December 2025' },
  ],
  reels_2026: [
    { url: '', caption: 'Next chapter: Paris expansion concept, 2026', wide: true },
    { url: '', caption: 'AR-enhanced product demonstration concept' },
    { url: '', caption: 'European expansion strategy — 2026' },
    { url: '', caption: 'AR-enhanced product demonstration concept', wide: true },
    { url: '', caption: 'First international ambassador cohort' },
    { url: '', caption: 'The mission continues.' },
  ],

  /* ── HOME: TrustStrip Brand Logos ── */
  home_truststrip_logos: [
    { url: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', caption: 'TV & Sound' },
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
    { url: '', caption: 'Dual CTA — Business Background' },
    { url: '', caption: 'Dual CTA — Talent Background' },
  ],

  /* ── HOME: SonicDNA Background ── */
  home_sonicdna_background: [
    { url: '', caption: 'SonicDNA — Office Background', wide: true },
  ],

  /* ── HOME: OfficeVisit Image ── */
  home_officevisit_image: [
    { url: '', caption: 'Office Visit — Main Image' },
  ],

  /* ── TEAM: Hero Images ── */
  team_hero_images: [
    { url: '', caption: 'Team — Hero Background', wide: true },
    { url: '', caption: 'Team — Member Photo 1' },
    { url: '', caption: 'Team — Member Photo 2' },
    { url: '', caption: 'Team — Member Photo 3' },
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
    { url: '', caption: '2025 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', caption: '2025 — Accent' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', caption: '2026 — Hero' },
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', caption: '2026 — Accent' },
  ],

  /* ── COMMON: ClientProof Logos ── */
  common_clientproof_logos: [
    { url: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Garmin' },
    { url: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', caption: 'Groupe SEB' },
    { url: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', caption: 'TV & Sound' },
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
    { url: '', caption: 'Industries — Hero Background', wide: true },
  ],

  /* ── INDUSTRIES: Grid Images ── */
  industries_grid_images: [
    { url: '', caption: 'Consumer Electronics' },
    { url: '', caption: 'Home Appliances' },
    { url: '', caption: 'Beauty & Cosmetics' },
    { url: '', caption: 'Lifestyle & Wellness' },
    { url: '', caption: 'Automotive' },
    { url: '', caption: 'Entertainment & Media' },
  ],

  /* ── SERVICES: Content Studio ── */
  services_content_studio_images: [
    { url: '', caption: 'Content Studio — Hero', wide: true },
    { url: '', caption: 'Content Studio — Consultation' },
  ],

  /* ── SERVICES: Events ── */
  services_events_images: [
    { url: '', caption: 'Events — Hero', wide: true },
    { url: '', caption: 'Events — Consultation' },
  ],

  /* ── SERVICES: Market Entry ── */
  services_market_entry_images: [
    { url: '', caption: 'Market Entry — Hero', wide: true },
    { url: '', caption: 'Market Entry — Consultation' },
  ],

  /* ── SERVICES: Retail POS ── */
  services_retail_pos_images: [
    { url: '', caption: 'Retail POS — Hero', wide: true },
    { url: '', caption: 'Retail POS — Consultation' },
  ],

  /* ── SERVICES: Staffing ── */
  services_staffing_images: [
    { url: '', caption: 'Staffing — Hero', wide: true },
    { url: '', caption: 'Staffing — Consultation' },
  ],

  /* ── BLOG ── */
  blog_images: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', caption: 'Blog — Featured Image' },
  ],

  /* ── RATGEBER ── */
  ratgeber_hero: [
    { url: '', caption: 'Ratgeber — Hero Background', wide: true },
  ],

  /* ── JOBS ── */
  jobs_hero: [
    { url: '', caption: 'Jobs — Hero Background', wide: true },
  ],

  /* ── KONTAKT ── */
  kontakt_hero: [
    { url: '', caption: 'Kontakt — Hero Background', wide: true },
  ],

  /* ── LEISTUNGEN: Talentpool ── */
  leistungen_talentpool_images: [
    { url: '', caption: 'Talentpool — Group Hero', wide: true },
  ],

  /* ── LEISTUNGEN: Warehouse & Logistik ── */
  leistungen_warehouse_images: [
    { url: '', caption: 'Warehouse & Logistik — Facility', wide: true },
  ],

  /* ── LEISTUNGEN: Warehouse — Full Service Photo ── */
  leistungen_warehouse_fullservice_photo: [
    { url: '', caption: 'Warehouse Full Service — Overview' },
  ],

  /* ── LEISTUNGEN: Forecasting ── */
  leistungen_forecasting_images: [
    { url: '', caption: 'Forecasting — Dashboard', wide: true },
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
    { url: '', caption: 'Schritt 01 — Event-/Messe-Briefing' },
    { url: '', caption: 'Schritt 02 — Konzeptentwicklung' },
    { url: '', caption: 'Schritt 03 — Personal-Auswahl' },
    { url: '', caption: 'Schritt 04 — Produktion & Vorbereitung' },
    { url: '', caption: 'Schritt 05 — Veranstaltung' },
    { url: '', caption: 'Schritt 06 — Reporting' },
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
    { url: '', caption: 'Schritt 01 — Datenbasis aufbauen', wide: true },
    { url: '', caption: 'Schritt 02 — Modell kalibrieren', wide: true },
    { url: '', caption: 'Schritt 03 — Prognose ausgeben', wide: true },
    { url: '', caption: 'Schritt 04 — Live abgleichen', wide: true },
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
    { url: '', caption: 'Live-Video-Beratung — 1:1 Calls' },
    { url: '', caption: 'Sales Broadcast' },
    { url: '', caption: 'Live-Streaming' },
    { url: '', caption: 'Social Commerce' },
    { url: '', caption: 'Group Buying' },
    { url: '', caption: 'After Sales Support' },
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
    { url: '', caption: 'Produkte verkauft — Laurel' },
    { url: '', caption: 'Umsatz generiert — Scale' },
    { url: '', caption: 'Talente im Pool — Team' },
    { url: '', caption: 'Einsätze durchgeführt — Compass' },
  ],

  leistungen_schallmauer_wood_icons: [
    { url: '', caption: 'Markteintritt — Rocket' },
    { url: '', caption: 'Absatz steigern — Chart' },
    { url: '', caption: 'Omnichannel — Globe' },
  ],

  /* ── Events — Solution Wood Icons ── */
  leistungen_events_solution_wood_icons: [
    { url: '', caption: 'Events — Konzept' },
    { url: '', caption: 'Events — Bau & Equipment' },
    { url: '', caption: 'Events — Geschultes Personal' },
    { url: '', caption: 'Events — Catering & Experiences' },
    { url: '', caption: 'Events — Logistik & Controlling' },
    { url: '', caption: 'Events — (Digitale) Kommunikation' },
  ],

  /* ── Forecasting — Solution Wood Icons ── */
  leistungen_forecasting_solution_wood_icons: [
    { url: '', caption: 'Forecasting — KI-Analyse' },
    { url: '', caption: 'Forecasting — Standort-Potenzialanalyse' },
    { url: '', caption: 'Forecasting — Saisonalität' },
    { url: '', caption: 'Forecasting — Szenarien & Sensitivitäten' },
    { url: '', caption: 'Forecasting — Live-Tracking' },
    { url: '', caption: 'Forecasting — Integration' },
  ],

  /* ── POS — Solution Wood Icons ── */
  leistungen_pos_solution_wood_icons: [
    { url: '', caption: 'POS — POS-Materialien' },
    { url: '', caption: 'POS — Geschultes Personal' },
    { url: '', caption: 'POS — Flächenmanagement' },
    { url: '', caption: 'POS — Performance-Tracking' },
  ],

  /* ── Staff — Solution Wood Icons ── */
  leistungen_staff_solution_wood_icons: [
    { url: '', caption: 'Staff — Recruiting' },
    { url: '', caption: 'Staff — Onboarding & Schulungen' },
    { url: '', caption: 'Staff — Payroll' },
    { url: '', caption: 'Staff — Kosten-Nutzen-Transparenz' },
  ],

  /* ── Staff — Specialization Wood Icons ── */
  leistungen_staff_specialization_wood_icons: [
    { url: '', caption: 'Staff Spec — Sales Activation' },
    { url: '', caption: 'Staff Spec — Sales Außendienst' },
    { url: '', caption: 'Staff Spec — Brand Activation' },
    { url: '', caption: 'Staff Spec — Merchandising' },
    { url: '', caption: 'Staff Spec — Shop-in-Shop Staff' },
    { url: '', caption: 'Staff Spec — Training' },
  ],

  /* ── Video — Solution Wood Icons ── */
  leistungen_video_solution_wood_icons: [
    { url: '', caption: 'Video — E-Commerce' },
    { url: '', caption: 'Video — Retail Display' },
    { url: '', caption: 'Video — QR-Code Backup' },
  ],

  /* ── Video — Advantages Wood Icons ── */
  leistungen_video_advantages_wood_icons: [
    { url: '', caption: 'Video Adv — Am Einkaufsort' },
    { url: '', caption: 'Video Adv — Mehr Reichweite' },
    { url: '', caption: 'Video Adv — Messbare Ergebnisse' },
    { url: '', caption: 'Video Adv — Marktforschung' },
    { url: '', caption: 'Video Adv — Interaktivität' },
    { url: '', caption: 'Video Adv — Wiederverwendbar' },
  ],

  /* ── Kreation — Solution Wood Icons ── */
  leistungen_kreation_solution_wood_icons: [],

  /* ── Kreation — Discipline Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  leistungen_kreation_discipline_wood_icons: [],

  /* ── LEISTUNGEN: Overview Hero ── */
  leistungen_hero_images: [
    { url: '', caption: 'Leistungen — Hero Background', wide: true },
  ],

  /* ── HOME: Services Grid — Wood Icons ── */
  home_services_wood_icons: [
    { url: '', caption: 'Events & Messen' },
    { url: '', caption: 'Content' },
    { url: '', caption: 'Schulungen' },
    { url: '', caption: 'Point of Sale' },
    { url: '', caption: 'Unsere Studios' },
  ],

  /* ── HOME: SonicDNA — Wood Icons ── */
  home_sonicdna_wood_icons: [
    { url: '', caption: 'Phygital Pioneers' },
    { url: '', caption: 'Creative Execution' },
    { url: '', caption: 'Data-Driven Results' },
    { url: '', caption: 'Market Expertise' },
  ],

  /* ── HOME: DarumSonic — Wood Icons ── */
  home_darumsonic_wood_icons: [
    { url: '', caption: 'Datenbasierte Vorhersagen' },
    { url: '', caption: '2.000 Talente im Pool' },
  ],

  /* ── HOME: ClientSuccess — Wood Icons ── */
  home_clientsuccess_wood_icons: [
    { url: '', caption: 'Garmin' },
    { url: '', caption: 'TV & Sound' },
    { url: '', caption: 'Groupe SEB' },
    { url: '', caption: 'Samsung' },
    { url: '', caption: 'Bosch' },
    { url: '', caption: 'Dyson' },
  ],

  /* ── HOME: ClientSuccess — Wood Background ── */
  home_clientsuccess_wood_bg: [
    { url: '', caption: 'Dashboard Wood Background', wide: true },
  ],

  /* ── HOME: LiveMetrics — Wood Background ── */
  home_livemetrics_wood_bg: [
    { url: '', caption: 'LiveMetrics — Wood Background', wide: true },
  ],

  /* ── HOME: PhilosophySection — Wood Dividers ── */
  home_philosophy_wood_dividers: [
    { url: '', caption: 'Top Divider' },
    { url: '', caption: 'Bottom Divider' },
    { url: '', caption: 'Card Divider 1' },
    { url: '', caption: 'Card Divider 2' },
  ],

  /* ── HOME: DualAudienceCTA — Wood Icons ── */
  home_dual_audience_wood_icons: [
    { url: '', caption: 'For Brands' },
    { url: '', caption: 'For Talent' },
  ],

  /* ── HOME: DualCTA — Wood Icons ── */
  home_dual_cta_wood_icons: [
    { url: '', caption: 'Business CTA' },
    { url: '', caption: 'Talent CTA' },
  ],

  /* ── HOME: AudienceSelector — Wood Icons ── */
  home_audience_selector_wood_icons: [
    { url: '', caption: 'Entering DACH' },
    { url: '', caption: 'Optimizing' },
    { url: '', caption: 'Scaling Retail' },
    { url: '', caption: 'Join Our Team' },
  ],

  /* ── HOME: ChallengeSection — Wood Icons ── */
  home_challenge_wood_icons: [
    { url: '', caption: 'Markteintritt' },
    { url: '', caption: 'Absatz steigern' },
    { url: '', caption: 'Omnichannel' },
  ],

  /* ── HOME: ModernDNA — Wood Icons ── */
  home_moderndna_wood_icons: [
    { url: '', caption: 'Der Mensch' },
    { url: '', caption: 'Der Antrieb' },
    { url: '', caption: 'Die Daten' },
    { url: '', caption: 'Das Werkzeug' },
  ],

  /* ── HOME: VideoShowcase — Bottom Strip Wood Icons ── */
  home_video_strip_wood_icons: [
    { url: '', caption: '2.000+ Promoter' },
    { url: '', caption: 'DACH-weit' },
    { url: '', caption: '€2,19 Mrd. Umsatz' },
  ],

  /* ── HOME: DanSection — Wood Background ── */
  home_dan_section_wood_bg: [
    { url: '', caption: 'Consultation Wood Icon' },
  ],

  /* ── HOME: ConsultationButton — Wood Icon ── */
  home_consultation_wood_icon: [
    { url: '', caption: 'Survey CTA' },
  ],

  /* ── HOME: Attitude — Background Image ── */
  home_attitude_bg: [
    { url: 'https://www.sonic-group.de/wp-content/uploads/2023/01/11.jpg', caption: 'Attitude — Welcome Background', wide: true },
  ],

  /* ── INDUSTRIES: Expertise — Wood Icons ── */
  industries_expertise_wood_icons: [
    { url: '', caption: 'Marktkenntnis' },
    { url: '', caption: 'Produkttraining' },
    { url: '', caption: 'Handelspartnerschaften' },
    { url: '', caption: 'Datenbasierte Insights' },
    { url: '', caption: 'Skalierbare Lösungen' },
    { url: '', caption: 'Phygitale Integration' },
  ],

  /* ── INDUSTRIES: Grid — Wood Icons ── */
  industries_grid_wood_icons: [
    { url: '', caption: 'Consumer Electronics' },
    { url: '', caption: 'Home Appliances' },
    { url: '', caption: 'Beauty & Personal Care' },
    { url: '', caption: 'Lifestyle & Wellness' },
    { url: '', caption: 'Automotive & Mobility' },
    { url: '', caption: 'Entertainment & Media' },
  ],

  /* ── ABOUT: ValuesVisual — Wood Icons ── */
  about_values_visual_wood_icons: [
    { url: '', caption: 'Projekte' },
    { url: '', caption: 'Einsätze' },
    { url: '', caption: 'POS-Umsetzungen' },
    { url: '', caption: 'Jahre Erfahrung' },
  ],

  /* ── ABOUT: OriginStory — Wood Ticker BG ── */
  about_origin_story_wood_bg: [
    { url: '', caption: 'Origin Story — Wood Ticker BG' },
  ],

  /* ── SRT: TheProblem — Wood Icons ── */
  srt_problem_wood_icons: [
    { url: '', caption: 'Datensilos — Wood Icon' },
    { url: '', caption: 'Zeitverlust — Wood Icon' },
    { url: '', caption: 'Kein Überblick — Wood Icon' },
  ],

  /* ── SRT: Proof — Wood Icons — none set via dashboard yet; component falls back to its own gradient placeholders ── */
  srt_proof_wood_icons: [
    { url: '', caption: 'Umsatzsteigerung — Wood Icon' },
    { url: '', caption: 'Zeitersparnis — Wood Icon' },
    { url: '', caption: 'Qualität — Wood Icon' },
    { url: '', caption: 'Vertrauen — Wood Icon' },
  ],

  /* ── SRT: Pricing — Card Images ── */
  srt_pricing_images: [
    { url: '', caption: 'Starter Tier' },
    { url: '', caption: 'Professional Tier' },
    { url: '', caption: 'Enterprise Tier' },
  ],

  /* ── TEAM: MeetTheTeam — Wood Icons ── */
  team_meet_team_wood_icons: [
    { url: '', caption: 'Human-First Culture' },
    { url: '', caption: 'Growth Opportunities' },
    { url: '', caption: 'Diverse Family' },
  ],

  /* ── TEAM: TrainingDevelopment — Image ── */
  team_training_image: [
    { url: '', caption: 'Training Session' },
  ],

  /* ── HOME: Video Embed & Cover ── */
  home_video: [
    { url: '', caption: 'Video Cover Image', wide: true },
    { url: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&loop=1&playlist=2H1rFHQsG4g&rel=0&modestbranding=1', caption: 'YouTube Embed URL (full URL with params)' },
  ],
};

/* ─────────────────────────────────────────────
   BUILD DEFAULT_MEDIA (frozen, never mutated)
───────────────────────────────────────────── */
export const DEFAULT_MEDIA: MediaSections = {};

// Populate from virtual folders (manifest removed — all images managed via Supabase dashboard)
// 1. Add virtual folders
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
  '/images/Case Studies -Fallbsp/Philips': 'TV & Sound (Archiv)',  // renamed from Philips
  '/images/Case Studies -Fallbsp/SEB': 'SEB',
  'srt_hero_icons': 'SRT — Hero Stat Icons',

  'srt_hero_images': 'SRT Hero — Hintergrundfoto',
  'srt_product_desktop': 'SRT Showcase — Desktop (Bild, Video oder YouTube)',
  'srt_product_mobile': 'SRT Showcase — Mobile (Bild, Video oder YouTube)',
  'srt_section_images': 'SRT Features — Dashboard-Vorschau (F1-Card)',
  'srt_feature_icons': 'SRT Features — Holz-Icons (6 Module)',
  'srt_functionality_images': 'SRT Funktionsumfang — Modul-Screenshots',
  'srt_problem_wood_icons': 'SRT Problem — Holz-Icons',
  'srt_joerg_photo': 'SRT — Entwickler Jörg: Profilfoto',
  'srt_proof_wood_icons': 'SRT Statistiken — Holz-Icons',
  'srt_pricing_images': 'SRT Preise — Tier-Hintergrundbilder',
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
  'leistungen_video_youtube': 'Live Video — YouTube Showcase URL (im Feld \"Beschriftung\" eintragen)',
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
  'case_tvsound_gallery_1': 'TV & Sound | POS & Retail',
  'case_tvsound_gallery_2': 'TV & Sound | Messen & Roadshows',
  'case_tvsound_gallery_3': 'TV & Sound | Training & Team',
  'case_tvsound_gallery_4': 'TV & Sound | Digital & Kampagnen',
  'case_garmin_module_1': 'Fallbeispiele — Garmin | Modul 1: Promotions',
  'case_garmin_module_2': 'Fallbeispiele — Garmin | Modul 2: Aktionen',
  'case_garmin_module_3': 'Fallbeispiele — Garmin | Modul 3: POS-Möbel',
  'case_garmin_module_4': 'Fallbeispiele — Garmin | Modul 4: Training',
  'case_garmin_module_5': 'Fallbeispiele — Garmin | Modul 5: Lager & Logistik',
  'case_seb_module_1': 'Fallbeispiele — Groupe SEB | Modul 1: Live-Video',
  'case_seb_module_2': 'Fallbeispiele — Groupe SEB | Modul 2: Aktionen',
  'case_seb_module_3': 'Fallbeispiele — Groupe SEB | Modul 3: Roadshow',
  'case_seb_module_4': 'Fallbeispiele — Groupe SEB | Modul 4: Verkauf & POS',
  'case_seb_module_5': 'Fallbeispiele — Groupe SEB | Modul 5: Sales-Training',
  'case_seb_module_6': 'Fallbeispiele — Groupe SEB | Modul 6: Reporting',
  'case_avoury_module_1': 'Fallbeispiele — Avoury | Modul 1: Recruiting',
  'case_avoury_module_2': 'Fallbeispiele — Avoury | Modul 2: Schulungen',
  'case_avoury_module_3': 'Fallbeispiele — Avoury | Modul 3: Sales Promotions',
  'case_avoury_module_4': 'Fallbeispiele — Avoury | Modul 4: Reporting',
  'case_avoury_module_5': 'Fallbeispiele — Avoury | Modul 5: Optimierungen',
  'case_tvsound_module_1': 'Fallbeispiele — TV & Sound | Modul 1: Gründungskunde 2009–2019',
  'case_tvsound_module_2': 'Fallbeispiele — TV & Sound | Modul 2: Hersteller 2020–2024',
  'case_tvsound_module_3': 'Fallbeispiele — TV & Sound | Modul 3: Laufendes Mandat',
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
  'careers_events_videos': 4, // Content Creation, Team Events, Promoter Events, Roadshows & Messen
  'careers_events_images': 4, // Content Creation, Team Events, Promoter Events, Roadshows & Messen
  'careers_dreamteam_images': 6,
  'careers_geschichten_images': 3,
  'careers_mitarbeiterstimmen_sales_images': 3,
  'careers_mitarbeiterstimmen_staff_images': 3,
  'careers_sonicfaces_images': 5,
  'careers_sonicfamily_images': 6,
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
  'leistungen_video_youtube': 'Live Video — YouTube Showcase URL (im Feld \"Beschriftung\" eintragen)',
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
  'srt_joerg_photo': 'SRT — Entwickler Jörg: Profilfoto',
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
  'srt_joerg_photo': 'SRT — Entwickler Jörg: Profilfoto',
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
  'leistungen_video_youtube': 'Live Video — YouTube Showcase URL (im Feld \"Beschriftung\" eintragen)',
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
        // Staleness check: if every key in the remote override is either:
        //   a) absent from localStorage (never touched by this browser), OR
        //   b) present in localStorage with the same or newer items
        // … then local is at least as fresh and we skip the merge.
        // We also skip if local has [] for a key (explicit deletion beats remote).
        let localIsAtLeastAsFresh = true;
        for (const key of Object.keys(overrides)) {
          const remoteItems = overrides[key] || [];
          if (!(key in localRaw)) {
            // This browser never touched this section — remote may have newer data.
            localIsAtLeastAsFresh = false;
            break;
          }
          const localItems: MediaItem[] = localRaw[key] || [];
          if (localItems.length === 0) {
            // Local explicitly emptied this section (deletion) — local wins, no merge.
            continue;
          }
          const localUrls = new Set(localItems.map((item: MediaItem) => item.url));
          for (const item of remoteItems) {
            if (!localUrls.has(item.url)) {
              // Remote has an item local doesn't — but this could be stale (replaced/deleted).
              // We handle it in the merge: local wins per-key, so skip staleness check here.
              localIsAtLeastAsFresh = false;
              break;
            }
          }
          if (!localIsAtLeastAsFresh) break;
        }
        if (localIsAtLeastAsFresh) {
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
      // Only write [] to Supabase when user explicitly cleared it OR section has DEFAULT_MEDIA.
      // Never write [] because a browser never synced this section — that wipes Supabase uploads.
      if ((defaultVal && defaultVal.length > 0) || _explicitlyDeletedKeys.has(key)) {
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

// Strip readdy.ai placeholder URLs from any data — never render or cache them.
function stripReaddy(sections: MediaSections): MediaSections {
  const out: MediaSections = {};
  for (const key of Object.keys(sections)) {
    out[key] = (sections[key] || []).map((item) =>
      item.url && item.url.includes('readdy.ai') ? { ...item, url: '' } : item
    );
  }
  return out;
}

// Strip readdy.ai placeholder URLs from cached data (Supabase cache / localStorage).
// If stripping leaves a section with ONLY empty URLs, omit that key entirely so
// DEFAULT_MEDIA (which may have a real fallback) can still provide the value.
// Sections with at least one real non-readdy URL are kept as-is.
function stripReddy(sections: MediaSections): MediaSections {
  const out: MediaSections = {};
  for (const key of Object.keys(sections)) {
    const cleaned = (sections[key] || []).map((item) =>
      item.url && item.url.includes('readdy.ai') ? { ...item, url: '' } : item
    );
    // Keep the section only if at least one item has a real URL
    if (cleaned.some((item) => item.url !== '')) {
      out[key] = cleaned;
    }
    // Otherwise: omit this key → DEFAULT_MEDIA / Supabase provides the fallback
  }
  return out;
}

function getStoreSnapshot(): MediaSections {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const merged = { ...DEFAULT_MEDIA };

    // Layer 1: Supabase overrides (cross-browser base data)
    const supabaseOverrides = getSupabaseOverridesCache();
    if (supabaseOverrides) {
      const cleanedOverrides = stripReaddy(supabaseOverrides);
      for (const key of Object.keys(cleanedOverrides)) {
        merged[key] = cleanedOverrides[key];
      }
    }

    // Layer 2: localStorage (local edits ALWAYS win — prevents stale
    // Supabase overrides from undoing fresh local changes)
    if (raw) {
      const parsed = stripReaddy(JSON.parse(raw) as MediaSections);
      for (const key of Object.keys(parsed)) {
        merged[key] = parsed[key];
      }
    }

    // Pad: only fill slots for sections the user has NEVER touched (not in
    // localStorage). If a section IS in localStorage, the user owns it —
    // never re-append defaults, as that would restore deleted images.
    const localSections = raw ? Object.keys(JSON.parse(raw) as MediaSections) : [];
    const localSectionsSet = new Set(localSections);
    for (const key of Object.keys(DEFAULT_MEDIA)) {
      if (localSectionsSet.has(key)) continue; // user owns this section — never pad it
      const defaultItems = DEFAULT_MEDIA[key];
      const mergedItems = merged[key];
      if (defaultItems && mergedItems && mergedItems.length < defaultItems.length) {
        merged[key] = [
          ...mergedItems,
          ...defaultItems.slice(mergedItems.length),
        ];
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

// Tracks section keys the user explicitly cleared this session.
// Only these write [] to Supabase — prevents passive-empty browsers from wiping uploads.
const _explicitlyDeletedKeys = new Set<string>();
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
    const label = HUMAN_LABELS[key] || key;
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
  if (store[sectionKey].length === 0) _explicitlyDeletedKeys.add(sectionKey);
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
  if (store[sectionKey].length === 0) _explicitlyDeletedKeys.add(sectionKey);
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
  const resetVal = [...(DEFAULT_MEDIA[sectionKey] || [])];
  store[sectionKey] = resetVal;
  if (resetVal.length === 0) _explicitlyDeletedKeys.add(sectionKey);
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
  about_client_logos: [],
  case_studies: [],
  leistungen_kreation_photo_grid: [],
  ratgeber: [],
  home_srt_wood_icons: [],
  '/images/Über uns/Leadership Perspectives': [],
  '/images/Über uns/Über uns/1. Header': [],
  '/images/Über uns/Sonic Reels/2007-2015': [],
  '/images/Karriere': [],
  '/images/home/1. Menschen für Events & Messen': [],
  '/images/home/2. Menschen für Content': [],
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

    // Layer 2 — local state ALWAYS wins for any section this browser has touched.
    // An empty local array = explicit deletion: do NOT restore from Supabase.
    // A populated local array = current user state: do NOT add stale remote items.
    // Supabase only fills in sections that are completely absent from localStorage
    // (i.e. sections this browser has never interacted with).
    if (localRaw) {
      for (const key of Object.keys(localRaw)) {
        merged[key] = localRaw[key] || [];
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
