/* ─────────────────────────────────────────────
   Dashboard helpers for the Leistungen group (11/2026) — DISPLAY ONLY.
   Groups the Leistungen sections/slots by page and sorts them in the order
   they appear on the page. Keys, labels, values and images are untouched.
───────────────────────────────────────────── */

export interface DashPage { id: string; label: string; icon: string }

export const LEISTUNGEN_DASH_PAGES: DashPage[] = [
  { id: 'all', label: 'Alle', icon: 'ri-stack-line' },
  { id: '/leistungen', label: 'Übersicht', icon: 'ri-grid-line' },
  { id: '/leistungen/pos-full-service', label: 'POS Full Service', icon: 'ri-store-line' },
  { id: '/leistungen/live-video', label: 'Live Video', icon: 'ri-live-line' },
  { id: '/leistungen/events-messen', label: 'Events & Messen', icon: 'ri-calendar-event-line' },
  { id: '/leistungen/staff-as-a-service', label: 'Staff as a Service', icon: 'ri-user-add-line' },
  { id: '/leistungen/talentpool', label: 'Talentpool', icon: 'ri-team-line' },
  { id: '/leistungen/warehouse-logistik', label: 'Warehouse & Logistik', icon: 'ri-archive-line' },
  { id: '/leistungen/forecasting', label: 'Forecasting', icon: 'ri-line-chart-line' },
  { id: '/leistungen/kreation-content', label: 'Kreation & Content', icon: 'ri-palette-line' },
  { id: 'shared', label: 'Alle Unterseiten', icon: 'ri-links-line' },
];

/* Text sections shown on every subpage (stored under one page's path). */
const SHARED_TEXT = new Set(['leistungen_challenge_common']);

/* Kept in the dashboard, but nothing on the website reads them. */
export const UNUSED_TEXT_SECTIONS = new Set(['leistungen_main_hero']);
export const UNUSED_MEDIA_SLOTS = new Set([
  'leistungen_kreation_showcase_secondary_content',
  'leistungen_kreation_showcase_secondary_cgi',
  'leistungen_stats_wood_icons',
  'leistungen_kreation_photo_grid',
]);

export function textSectionPage(key: string, pagePath?: string): string {
  return SHARED_TEXT.has(key) ? 'shared' : (pagePath || '/leistungen');
}

/* Position of a text section within its page — the order the blocks appear on the page. */
const PAGE_ORDER: string[] = [
  // Übersicht
  'leistungen_overview_hero', 'leistungen_main_hero', 'leistungen_overview_page_nav', 'leistungen_overview_stats', 'leistungen_overview_services', 'leistungen_overview_ways', 'leistungen_overview_cta',
  // POS Full Service
  'leistungen_pos', 'leistungen_pos_hero_stats', 'leistungen_pos_page_nav', 'leistungen_pos_content', 'leistungen_pos_challenges', 'leistungen_pos_solutions', 'leistungen_pos_assets', 'leistungen_pos_process', 'leistungen_pos_cta',
  // Live Video
  'leistungen_video', 'leistungen_video_hero_buttons', 'leistungen_video_page_nav', 'leistungen_video_content', 'leistungen_video_challenges', 'leistungen_video_channels', 'leistungen_video_formats', 'leistungen_video_showcase', 'leistungen_video_labels', 'leistungen_video_advantages', 'leistungen_video_phygital', 'leistungen_video_calculator', 'leistungen_video_tiktok', 'leistungen_video_cta',
  // Events & Messen
  'leistungen_events', 'leistungen_events_hero_buttons', 'leistungen_events_page_nav', 'leistungen_events_content', 'leistungen_events_challenges', 'leistungen_events_solutions', 'leistungen_events_process', 'leistungen_events_formats', 'leistungen_events_cta',
  // Staff as a Service
  'leistungen_staff', 'leistungen_staff_hero_stats', 'leistungen_staff_page_nav', 'leistungen_staff_content', 'leistungen_staff_challenges', 'leistungen_staff_solution', 'leistungen_staff_process', 'leistungen_staff_specs', 'leistungen_staff_socks', 'leistungen_staff_socks_steps', 'leistungen_staff_cta',
  // Talentpool
  'leistungen_talentpool', 'leistungen_talentpool_page_nav', 'leistungen_talentpool_content', 'leistungen_talentpool_challenges', 'leistungen_talentpool_solution', 'leistungen_talentpool_solution_tags', 'leistungen_talentpool_stats', 'leistungen_talentpool_profiles', 'leistungen_talentpool_profile_tags', 'leistungen_talentpool_cta',
  // Warehouse & Logistik
  'leistungen_warehouse', 'leistungen_warehouse_stats', 'leistungen_warehouse_page_nav', 'leistungen_warehouse_content', 'leistungen_warehouse_challenges', 'leistungen_warehouse_solutions', 'leistungen_warehouse_items', 'leistungen_warehouse_fullservice', 'leistungen_warehouse_cta',
  // Forecasting
  'leistungen_forecasting', 'leistungen_forecasting_hero_buttons', 'leistungen_forecasting_page_nav', 'leistungen_forecasting_content', 'leistungen_forecasting_challenges', 'leistungen_forecasting_cards', 'leistungen_forecasting_steps', 'leistungen_forecasting_cta',
  // Kreation & Content
  'leistungen_kreation', 'leistungen_kreation_hero_stats', 'leistungen_kreation_carousel', 'leistungen_kreation_page_nav', 'leistungen_kreation_content', 'leistungen_kreation_challenges', 'leistungen_kreation_solutions', 'leistungen_kreation_showcase',
  'leistungen_kreation_showcase_konzeption', 'leistungen_kreation_showcase_innovation', 'leistungen_kreation_showcase_ci', 'leistungen_kreation_showcase_layout', 'leistungen_kreation_showcase_pos', 'leistungen_kreation_cta',
];
function textRank(key: string): number {
  const i = PAGE_ORDER.indexOf(key);
  if (i >= 0) return i;
  return /_cta$/.test(key) ? 9000 : 5000; // a section added later: before the contact box
}

const pageIndex = (id: string) => {
  const i = LEISTUNGEN_DASH_PAGES.findIndex((p) => p.id === id);
  return i < 0 ? LEISTUNGEN_DASH_PAGES.length : i;
};

/* Sort (stable) by page, then by position on the page; keep the original order otherwise. */
export function sortLeistungenSections<T extends { key: string; pagePath?: string }>(sections: T[]): T[] {
  return sections
    .map((s, i) => ({ s, i }))
    .sort((a, b) =>
      pageIndex(textSectionPage(a.s.key, a.s.pagePath)) - pageIndex(textSectionPage(b.s.key, b.s.pagePath)) ||
      textRank(a.s.key) - textRank(b.s.key) ||
      a.i - b.i)
    .map((x) => x.s);
}

/* „Content" sections hold the headings of several page areas — say which, in plain German. */
const AREA_WORDS: Array<[RegExp, string]> = [
  [/^Challenge/, 'Herausforderung'], [/^Solution/, 'Lösung'], [/^Assets/, 'POS-Materialien & Branding'],
  [/^Process/, 'Ablauf'], [/^Specializations/, 'Einsatzbereiche'], [/^SOCKS/, 'S.O.C.K.S.'],
  [/^Advantages/, 'Vorteile'], [/^Phygital/, 'Phygital'], [/^Formats/, 'Formate'], [/^Profiles/, 'Talentprofile'],
  [/^How/, 'So funktioniert’s'], [/^Content/, 'Hauptbereich'],
];
export function contentAreasHint(key: string, entryLabels: string[]): string | null {
  if (!/_content$/.test(key)) return null;
  const areas: string[] = [];
  for (const label of entryLabels) {
    const hit = AREA_WORDS.find(([re]) => re.test(label));
    if (hit && !areas.includes(hit[1])) areas.push(hit[1]);
  }
  return areas.length ? `Überschriften der Bereiche: ${areas.join(' · ')}` : null;
}

/* Media slot → page (by key). */
const MEDIA_PAGE_RULES: Array<[RegExp, string]> = [
  [/^leistungen_(hero_images|servicegrid_bg|stats_wood_icons|schallmauer_wood_icons)$/, '/leistungen'],
  [/^leistungen_pos_/, '/leistungen/pos-full-service'],
  [/^leistungen_video_/, '/leistungen/live-video'],
  [/^leistungen_events_/, '/leistungen/events-messen'],
  [/^leistungen_staff_/, '/leistungen/staff-as-a-service'],
  [/^leistungen_talentpool_/, '/leistungen/talentpool'],
  [/^leistungen_warehouse_/, '/leistungen/warehouse-logistik'],
  [/^leistungen_forecasting_/, '/leistungen/forecasting'],
  [/^(leistungen_kreation_|kreation_)/, '/leistungen/kreation-content'],
];
export function mediaSlotPage(key: string): string {
  return MEDIA_PAGE_RULES.find(([re]) => re.test(key))?.[1] ?? '/leistungen';
}
function mediaRank(key: string): number {
  if (/_images$/.test(key) && /^leistungen_(pos|video|events|staff|talentpool|warehouse|forecasting|hero)_images$/.test(key)) return 0;
  if (/carousel/.test(key)) return 0;
  if (/wood_icons|_bg$/.test(key)) return 4;
  return 2;
}
export function sortLeistungenSlots(keys: string[]): string[] {
  return keys
    .map((k, i) => ({ k, i }))
    .sort((a, b) => pageIndex(mediaSlotPage(a.k)) - pageIndex(mediaSlotPage(b.k)) || mediaRank(a.k) - mediaRank(b.k) || a.i - b.i)
    .map((x) => x.k);
}
