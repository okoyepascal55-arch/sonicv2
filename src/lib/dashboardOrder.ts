/* ─────────────────────────────────────────────
   DASHBOARD ORDER & NAMES (18.11.2026)

   Text areas are listed in the order they appear on the live page, numbered,
   with plain German names. Display only: keys, entries and saved texts are
   untouched. Areas not listed here keep their own name and come after the
   listed ones.
───────────────────────────────────────────── */

type Ordered = readonly (readonly [key: string, label: string])[];

export const TEXT_SECTION_ORDER: Record<string, Ordered> = {
  home: [
    ['home_hero', 'Hero — Überschrift, Agentur- & Job-Karte'],
    ['home_truststrip', 'Kundenlogos — Zeile „Über 15 Kunden vertrauen uns“'],
    ['home_metrics', 'Kennzahlen-Laufband (Holz)'],
    ['home_video_texts', 'Video — „Erlebe Sonic in 2 Minuten“'],
    ['home_challenge', 'Deine Challenge — „Drei Wege. Ein Partner.“'],
    ['home_services_texts', 'Leistungen — „Manpower trifft ROI“ (5 Tabs)'],
    ['home_srt_teaser', 'SRT-Teaser — Datenfluss & Kurzumfrage-Button'],
    ['home_quiz_texts', 'Kurzumfrage — Fragen & Texte'],
    ['home_quiz_result_cta', 'Kurzumfrage — Empfehlungen'],
    ['home_contact_block', 'Sonic Group & Karriere — zwei Boxen'],
    ['home_drive_cards', 'Sonic Group-Box — Werte 01 & 02'],
    ['home_closing_cta', 'Abschluss — Termin vereinbaren'],
  ],
  losungen: [
    ['losungen_page', 'Seite — Hero, Intro, Sonic Schwerpunkte, „Was immer gilt“'],
    ['losungen_markteintritt', 'Tab „Markteintritt“'],
    ['losungen_absatz', 'Tab „Absatz steigern“'],
    ['losungen_omnichannel', 'Tab „Omnichannel“'],
    ['losungen_faq', 'Häufig gestellte Fragen'],
  ],
  about: [
    ['about_hero', 'Hero'],
    ['about_page_nav', 'Seitenmenü & Stimmen-Buttons'],
    ['about_origin_story', 'Über uns — „Wir machen Marken erfolgreich“'],
    ['about_ticker', 'Kennzahlen-Laufband'],
    ['about_values_texts', 'Referenzen „Wer mit Sonic erfolgreich ist“ & Team-Kennzahlen'],
    ['about_clients', 'Referenzen — Kundenliste'],
    ['about_leadership', 'Das Team — „Fachliche und menschliche Vielfalt“'],
    ['about_management_voices', 'Die Stimmen hinter Sonic — Kopf'],
    ['about_timeline', 'Zeitleiste (nur Sonic Reels — Seite ausgeschaltet)'],
    ['sonicreels_page', 'Sonic Reels (Seite ausgeschaltet)'],
  ],
  careers: [
    ['karriere_hero_texts', 'Hero — „Menschen mit Energie gesucht“'],
    ['karriere_nav_texts', 'Seitenmenü (schwarze Leiste) & Bewerben-Buttons'],
    ['careers_ticker', 'Kennzahlen-Laufband'],
    ['careers_paths', 'Zwei Wege — Kopf & Karten'],
    ['careers_paths_details', 'Zwei Wege — Campus & POS Team (Details)'],
    ['careers_culture', 'Kultur & DNA — Kopf & Werte'],
    ['karriere_dna', 'Kultur & DNA — vier DNA-Kacheln'],
    ['careers_awards', 'Kultur & DNA — Auszeichnungen (Kununu, Google)'],
    ['careers_family', 'Geschichten — Kopf'],
    ['careers_events', 'Leben bei Sonic — Kopf'],
    ['karriere_events_tabs', 'Leben bei Sonic — Kicker & Titel der vier Event-Tabs'],
    ['careers_events_lines', 'Leben bei Sonic — Zeilen unter den Events'],
    ['careers_jobs', 'Stellen — Kopf, Stellen-Box & Tanja-Karte'],
    ['careers_path_page', 'Job-Detailseite (Campus / POS)'],
  ],
  kontakt: [
    ['kontakt_page', 'Seite — Kopf & Kontaktdaten'],
    ['kontakt_form_texts', 'Formular „Schreib uns“'],
  ],
  srt: [
    ['srt_nav', 'Seitennavigation'],
    ['srt_hero', 'Hero'],
    ['srt_problem', 'Das Problem — drei Punkte'],
    ['srt_short_labels', 'Kurzlabels (Problem & Zahlen)'],
    ['srt_features', 'All-in-One — Kopf'],
    ['srt_features_cards', 'All-in-One — Kacheln'],
    ['srt_cta_texts', 'Demo-Boxen & Formular-Texte'],
    ['srt_showcase_texts', 'Produkt — Desktop & Mobil'],
    ['srt_functionality', 'Funktionsumfang — Kopf'],
    ['srt_modules', 'Funktionsumfang — 6 Module'],
    ['srt_zusammenarbeit', 'So funktioniert die SRT — 6 Schritte'],
    ['srt_datapaths', 'Datenfluss — Kopf'],
    ['common_srt_data_nodes', 'Datenfluss — vier Knoten (auch auf Home)'],
    ['srt_proof', 'SRT in Zahlen — Kopf'],
    ['srt_proof_stats', 'SRT in Zahlen — Kennzahlen'],
    ['srt_industries', 'Branchen & Use Cases — Kopf'],
    ['srt_industries_items', 'Branchen & Use Cases — Karten'],
    ['srt_pricing', 'Zugang zur SRT'],
  ],
  case_studies: [
    ['case_studies_labels', 'Seite — Hero, Intro & feste Beschriftungen'],
    ['case_studies_showcase', 'Bilder-Showcase'],
    ['casestudies_card_texts', 'Karten & Module — Einzeltexte'],
    ['case_garmin', 'Garmin — Kennzahlen'],
    ['case_garmin_text', 'Garmin — Texte'],
    ['case_garmin_details', 'Garmin — Story: Eckdaten, Module & Verlauf'],
    ['case_seb', 'Groupe SEB — Kennzahlen'],
    ['case_seb_text', 'Groupe SEB — Texte'],
    ['case_seb_details', 'Groupe SEB — Story: Eckdaten, Module & Verlauf'],
    ['case_avoury', 'Avoury — Kennzahlen'],
    ['case_avoury_text', 'Avoury — Texte'],
    ['case_avoury_details', 'Avoury — Story: Eckdaten, Module & Verlauf'],
    ['case_tvsound', 'TV & Sound — Kennzahlen'],
    ['case_tvsound_text', 'TV & Sound — Texte'],
    ['case_tvsound_details', 'TV & Sound — Story: Eckdaten, Module & drei Mandate'],
    ['case_tvsound_compare', 'TV & Sound — „Drei Mandate im Vergleich“'],
    ['casestudies_inline_cta', 'Story-Button & CTA in der Story'],
    ['casestudies_cta', 'Abschluss-CTA'],
  ],
  common: [
    ['common_navigation', 'Navigation (Menü oben)'],
    ['common_cta', 'Button-Texte (alle Seiten)'],
    ['common_client_testimonials', 'Kundenstimmen — „Was unsere Partner über uns sagen“'],
    ['common_footer', 'Footer'],
    ['common_ui_labels', 'Kleine Bedienelemente (Menü, Nach oben, Foto folgt …)'],
  ],
  blog: [
    ['blog_hero', 'Blog — Kopf'],
  ],
};

/** Order + numbered plain names for one page group (display only). */
export function orderTextSections<T extends { key: string; label: string }>(groupId: string, sections: T[]): T[] {
  const order = TEXT_SECTION_ORDER[groupId];
  if (!order) return sections;
  const idx = new Map(order.map(([k], i) => [k, i]));
  const width = String(order.length).length < 2 ? 2 : String(order.length).length;
  return [...sections]
    .sort((a, b) => (idx.get(a.key) ?? 999) - (idx.get(b.key) ?? 999))
    .map((s) => {
      const i = idx.get(s.key);
      if (i === undefined) return s;
      return { ...s, label: `${String(i + 1).padStart(width, '0')} · ${order[i][1]}` };
    });
}
