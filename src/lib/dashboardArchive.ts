/* ─────────────────────────────────────────────
   DASHBOARD ARCHIVE (18.11.2026)

   Text areas and image slots that are left over from earlier versions of the
   site and are not used by any live page. They are only HIDDEN from the
   dashboard — nothing is deleted: saved texts/images stay in the database and
   the definitions stay in code. To bring one back, remove its key here.

   Verified against the code: none of these keys is read by a page or component.
───────────────────────────────────────────── */

export const ARCHIVED_TEXT_SECTIONS: ReadonlySet<string> = new Set([
  // Home — old sections no longer on the homepage
  'home_brandintro',
  'home_showcase',
  'home_services_grid',
  'home_sonicdna',
  'home_clientsuccess',
  'home_philosophy',
  'home_dualcta',
  // Über uns — replaced by „about_values_texts“
  'about_values',
  // Leistungen — old main hero
  'leistungen_main_hero',
  // Fallbeispiele — old hero / intro
  'casestudies_hero',
  'casestudies_intro',
  // Karriere — old hero texts that were never connected (replaced by „karriere_hero_texts“)
  'careers_hero',
  // Karriere — faces not shown in „Geschichten“
  'karriere_face_marcel',
  'karriere_face_katharina',
  // SRT — only used by components that are no longer rendered
  'srt_employee_app',
  'srt_video_showcase',
]);

export const ARCHIVED_MEDIA_SLOTS: ReadonlySet<string> = new Set([
  // Home
  'home_video_strip_wood_icons', 'home_services_wood_icons', 'home_consultation_wood_icon',
  'home_showcase_service_images', 'home_showcase_wood_icons', 'home_brandintro_images',
  'home_dualcta_backgrounds', 'home_sonicdna_background', 'home_sonicdna_wood_icons',
  'home_darumsonic_wood_icons', 'home_clientsuccess_wood_icons', 'home_clientsuccess_wood_bg',
  'home_philosophy_wood_dividers', 'home_dual_audience_wood_icons', 'home_dual_cta_wood_icons',
  'home_audience_selector_wood_icons', 'home_dan_section_wood_bg', 'home_attitude_bg',
  'home_officevisit_image',
  // Lösungen — old folder slots (the page uses the losungen_* slots)
  '/images/Lösungen/1. Header',
  '/images/Lösungen/2. Markteintritt/2. Verkäuferschulungen',
  '/images/Lösungen/2. Markteintritt/4. Videocontent & Live-Beratung',
  '/images/Lösungen/2. Markteintritt/8. So läuft dein Markteintritt mit Sonic/3. Team-Aufbau & Schulung',
  // Über uns
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Björn',
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Jo',
  '/images/Über uns/Über uns/4. Die Stimmen hinter Sonic/Lucas',
  'about_sonicreels_hero_accent', 'about_values_visual_wood_icons',
  // Karriere
  'careers_culture_wood_icons', 'careers_dna_wood_icons', 'careers_hero_wood_icons',
  'careers_team_images', 'careers_dreamteam_images', 'careers_geschichten_images',
  'careers_howwehire_wood_icons', 'careers_mitarbeiterstimmen_sales_images',
  'careers_mitarbeiterstimmen_staff_images', 'careers_perks_wood_icons',
  'careers_recruitercta_image', 'careers_sonic_sales_hero', 'careers_sonic_staff_hero',
  'careers_sonicfaces_images',
  // Leistungen
  'leistungen_kreation_images', 'leistungen_kreation_photo_grid',
  'leistungen_kreation_showcase_secondary_cgi', 'leistungen_kreation_showcase_secondary_content',
  'leistungen_stats_wood_icons',
  'lvp_creative_images', 'lvp_hero_images', 'lvp_studio_images',
  'services_content_studio_images', 'services_events_images', 'services_market_entry_images',
  'services_retail_pos_images', 'services_staffing_images',
  // Fallbeispiele / Kontakt / SRT / Common / Settings
  'case_philips_gallery_1', 'case_philips_gallery_2',
  'kontakt_hero',
  'srt_hero_icons', 'srt_proof_wood_icons',
  'srt_video_media_1', 'srt_video_media_2', 'srt_video_media_3', 'home_moderndna_wood_icons',
  'common_logos',
  'site_og_image',
]);

export const isArchivedTextSection = (key: string) => ARCHIVED_TEXT_SECTIONS.has(key);
export const isArchivedMediaSlot = (key: string) => ARCHIVED_MEDIA_SLOTS.has(key);
