/* ─────────────────────────────────────────────
   DASHBOARD — WHERE EACH IMAGE OF A MULTI-IMAGE SLOT APPEARS (19.11.2026)

   Display only. Shows a short note on every image card („Bild 2 → …“) so slots
   that hold several images are self-explanatory. Nothing about the slot, its
   images, captions or order is changed. Index = position in the slot (1st image = 0).
───────────────────────────────────────────── */
import { SOLUTIONS } from '@/pages/losungen/content';

type Notes = readonly string[] | ((index: number) => string | null);

const nth = (what: string) => (i: number) => `${i + 1}. ${what}`;

/* Lösungen: one shared list for all three tabs (Markteintritt from 1, Absatz, Omnichannel after) */
const SOLUTION_TAB = { markteintritt: 'Markteintritt', absatz: 'Absatz steigern', omnichannel: 'Omnichannel' } as const;
const DELIVERABLE_BASE = { markteintritt: 0, absatz: 7, omnichannel: 15 } as const;
const STEP_BASE = { markteintritt: 0, absatz: 5, omnichannel: 10 } as const;
function solutionListNote(kind: 'deliverables' | 'steps', base: Record<keyof typeof SOLUTION_TAB, number>) {
  return (i: number): string | null => {
    for (const key of Object.keys(SOLUTION_TAB) as (keyof typeof SOLUTION_TAB)[]) {
      const list = SOLUTIONS[key][kind] as readonly { title: string }[];
      const local = i - base[key];
      if (local >= 0 && local < list.length) {
        return `Tab „${SOLUTION_TAB[key]}“ — ${kind === 'steps' ? `Schritt ${local + 1}` : `Leistung ${local + 1}`}: ${list[local].title}`;
      }
    }
    return null;
  };
}

const EVENT_SHOWCASE_TABS = ['Events', 'Messen', 'Fahrzeuge & Module'];

export const SLOT_POSITIONS: Record<string, Notes> = {
  /* ── Home ── */
  home_hero_stats: ['Hero — Kennzahl 1 (Holz-Icon)', 'Hero — Kennzahl 2 (Holz-Icon)', 'Hero — Kennzahl 3 (Holz-Icon)', 'Hero — Kennzahl 4 (Holz-Icon)'],
  home_hero_cta_icons: ['Hero — Icon im Button der schwarzen Agentur-Karte', 'Hero — Icon im Button der weißen Job-Karte'],
  home_hero_wood_textures: ['Hero — Holz im Button der Agentur-Karte („Lösungen entdecken“)', 'Hero — Holz im Button der Job-Karte („Komm zu Sonic“)', 'Hero — Holz-Trennleiste zwischen den beiden Karten'],
  home_video: ['Video-Block — Vorschaubild (vor dem Abspielen)', 'Video-Block — das Video selbst (YouTube-Link)'],
  home_challenge_wood_icons: ['Deine Challenge — Karte 1 „Markteintritt“', 'Deine Challenge — Karte 2 „Absatz steigern“', 'Deine Challenge — Karte 3 „Omnichannel“'],
  home_truststrip_logos: nth('Logo in der Kundenlogo-Leiste (von links, Zeile für Zeile)'),
  home_livemetrics_wood_bg: ['Holz des Kennzahlen-Laufbands (Home, Leistungen, Karriere, SRT) — wird gekachelt, nicht gestreckt'],

  /* ── Lösungen ── */
  losungen_hero_backgrounds: ['Seiten-Hero ganz oben (Bilder 2–4 werden derzeit nicht angezeigt)'],
  '/images/losungen': ['Leistungs-Icon „Promoter / Ambassador“', 'Leistungs-Icon „Dashboard“', 'Leistungs-Icon „Video“'],
  losungen_wood_textures: ['Holz der Lösungs-Karte (auch Fallbeispiele-Karte) — gekachelt', 'Holz im Kopf der aufgeklappten Lösung — gekachelt'],
  losungen_deliverable_images: solutionListNote('deliverables', DELIVERABLE_BASE),
  losungen_step_images: solutionListNote('steps', STEP_BASE),

  /* ── Karriere ── */
  careers_events_images: ['Leben bei Sonic — Tab 1 „Content Creation“ (Vorschaubild)', 'Leben bei Sonic — Tab 2 „Team Events“ (Vorschaubild)', 'Leben bei Sonic — Tab 3 „Promoter Events“ (Vorschaubild)', 'Leben bei Sonic — Tab 4 „Roadshows & Messen“ (Vorschaubild)'],
  careers_events_videos: ['Leben bei Sonic — Video Tab 1 „Content Creation“', 'Leben bei Sonic — Video Tab 2 „Team Events“', 'Leben bei Sonic — Video Tab 3 „Promoter Events“', 'Leben bei Sonic — Video Tab 4 „Roadshows & Messen“'],
  careers_sonicfamily_images: (i) => `Geschichten — Porträt ${i + 1}. Tipp: Bildunterschrift mit dem Vornamen beginnen (z. B. „Sascha …“), dann passt das Foto immer zur richtigen Person`,
  careers_pictorial_showcase: nth('Foto im Bilder-Laufband unter „Leben bei Sonic“'),

  /* ── Leistungen ── */
  leistungen_events_showcase_images: (i) => (i < 12 ? `Formate — Tab „${EVENT_SHOWCASE_TABS[Math.floor(i / 4)]}“, Bild ${(i % 4) + 1} (Titel = Bildunterschrift)` : null),
  leistungen_kreation_before_after: ['Vorher/Nachher — links: Realität (Foto)', 'Vorher/Nachher — rechts: CGI / Rendering'],
  leistungen_schallmauer_wood_icons: ['Drei Wege — „Markteintritt“', 'Drei Wege — „Absatz steigern“', 'Drei Wege — „Omnichannel“'],
  leistungen_pos_solution_wood_icons: nth('Karte in „Die Lösung“ (von links)'),
  leistungen_staff_solution_wood_icons: nth('Karte in „Die Lösung“ (von links)'),
  leistungen_events_solution_wood_icons: nth('Karte in „Die Lösung“ (von links)'),
  leistungen_video_solution_wood_icons: nth('Karte in „Die Lösung“ / Kanäle (von links)'),
  leistungen_kreation_solution_wood_icons: nth('Karte in „Die Lösung“ (von links)'),
  leistungen_forecasting_solution_wood_icons: nth('Karte in „Die Lösung“ (von links)'),
  leistungen_kreation_discipline_wood_icons: nth('Disziplin-Icon (Reihenfolge wie auf der Seite)'),
  leistungen_staff_specialization_wood_icons: nth('Karte „Einsatzbereiche“ (von links)'),
  leistungen_video_advantages_wood_icons: nth('Karte „Vorteile“ (von links)'),
  leistungen_pos_process_images: nth('Prozess-Schritt'),
  leistungen_events_process_images: nth('Prozess-Schritt'),
  leistungen_forecasting_process_images: nth('Prozess-Schritt'),
  leistungen_staff_socks_images: nth('Schritt im „Socks“-Ablauf'),
  leistungen_talentpool_profiles_images: nth('Profil-Karte im Talentpool'),
  leistungen_video_format_photos: nth('Video-Format (Tab von links)'),
  leistungen_warehouse_items_images: nth('Lager-Kategorie (Karte von links)'),
  leistungen_kreation_showcase_images: nth('Bild im Kreation-Showcase'),
  leistungen_pos_assets_images: nth('Bild in „Alle Assets“'),
  leistungen_servicegrid_bg: nth('Leistungs-Kachel auf der Leistungen-Übersicht'),

  /* ── SRT ── */
  srt_problem_wood_icons: ['Das Problem — Karte 1 „Getrennte Datensilos“', 'Das Problem — Karte 2 „Keine Dashboards“', 'Das Problem — Karte 3 „Verspätete Erkenntnisse“'],
  srt_functionality_images: ['Funktionsumfang — 01 Einsatzplanung', 'Funktionsumfang — 02 Talentpool', 'Funktionsumfang — 03 GPS Check-in', 'Funktionsumfang — 04 Datenintegration', 'Funktionsumfang — 05 Dokumenten-KI', 'Funktionsumfang — 06 Routenplanung'],
  srt_pricing_images: ['Zugang — Karte „Live-Dashboard“', 'Zugang — Karte „Reportings“', 'Zugang — Karte „Projektteam“'],
  srt_section_images: nth('Vorschaubild im Block „All-in-One“'),
  srt_feature_icons: ['All-in-One — 01 Echtzeit-Dashboard', 'All-in-One — 02 Performance-Tracking', 'All-in-One — 03 Team-Management', 'All-in-One — 04 Reportings', 'All-in-One — 05 Mobile App', 'All-in-One — 06 Datensicherheit'],

  /* ── Film / Fallbeispiele ── */
  film_page_video: ['Film-Seite — Vorschaubild', 'Film-Seite — das Video selbst (leer = wie Home)'],
  case_studies_pictorial_showcase: nth('Foto im Bilder-Laufband der Fallbeispiele'),
};

/** Note for one image of a slot, or null when the slot needs none. */
export function slotPositionNote(slotKey: string, index: number): string | null {
  const notes = SLOT_POSITIONS[slotKey];
  if (!notes) return null;
  if (typeof notes === 'function') return notes(index);
  return notes[index] ?? 'wird auf der Seite derzeit nicht angezeigt (zusätzliches Bild)';
}
