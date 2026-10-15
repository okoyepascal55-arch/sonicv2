/* ─────────────────────────────────────────────
   FALLBEISPIEL TV & SOUND — Vergleich der drei Marken (15.10.2026)
   Dashboard → Text → Fallbeispiele → „Fallbeispiel TV & Sound — Vergleich der 3 Marken“.
   Figures are the ones already published in the case study (Agenturpräsentation 2026).
   Cell format: „Wert · Zusatz“ — the part after „ · “ shows smaller under the value.
   „–“ = no figure for this mandate.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';

const e = (id: string, label: string, type: TextEntry['type'], value: string, description = ''): TextEntry => ({ id, label, description, type, value });

export const TV_COMPARE = {
  eyebrow: 'Drei Mandate im Vergleich',
  heading: 'Drei Marken. Drei Ausgangslagen. Ein Partner.',
  mandates: [
    { client: 'Globaler Konzern', period: '2009–2019', status: 'Abgeschlossen', tagline: 'Gründungskunde — 10 Jahre, ein Markt, ein Partner.', start: 2009, end: 2019 },
    { client: 'Europäischer Hersteller', period: '2020–2024', status: 'Abgeschlossen', tagline: 'Deutschland war nicht Plan A — bis wir kamen.', start: 2020, end: 2024 },
    { client: 'Internationaler Herausforderer', period: 'seit 2025', status: 'Läuft', tagline: 'Von null auf Vollbetrieb in sechs Wochen.', start: 2025, end: 2026 },
  ],
  rows: [
    { label: 'Ausgangslage', values: ['Markteinführung im deutschen Handel', 'Deutschland war nicht der Fokusmarkt', 'Start von null'] },
    { label: 'Kumulierter Umsatz', values: ['1,72 Mrd. € · 2009–2019', '239,8 Mio. € · 2020–2024', '–'] },
    { label: 'Umsatzwachstum', values: ['–', '+61 % · 2021 → 2024', '+75 % · im ersten Jahr'] },
    { label: 'Absatzwachstum', values: ['–', '+40 % · 2020 → 2024', '+66 % · im ersten Jahr'] },
    { label: 'Highlight', values: ['45.380 · Einsatztage im Spitzenjahr 2018', 'Nr. 1 · erfolgreichster europäischer Markt des Kunden', '6 Wochen · von Briefing bis Vollbetrieb'] },
    { label: 'Leistungen', values: ['Promotion | POS-Möbel | Trainings | Roadshows | Lager', 'Field Force | 3D-Raumplaner | Digital | Kampagnen | Training', 'Launch | POS | Messen | Digital'] },
  ],
  note: 'Alle Markennamen auf Kundenwunsch anonymisiert. Werte aus dem Projekt-Reporting von Sonic. Mandat 3 läuft — die Kennzahlen beziehen sich auf das erste Projektjahr.',
};

export const TV_COMPARE_SECTION: TextSection = {
  key: 'case_tvsound_compare',
  label: 'Fallbeispiel TV & Sound — Vergleich der 3 Marken',
  pageGroupId: 'case_studies',
  pagePath: '/fallbeispiele',
  description: 'Vergleichstabelle in der aufgeklappten Fallstudie TV & Sound. Zellen: „Wert · Zusatz“ (der Teil nach „ · “ steht klein darunter), „–“ = keine Angabe. Leistungen mit | trennen.',
  entries: [
    e('tvc-eyebrow', 'Eyebrow', 'badge', TV_COMPARE.eyebrow),
    e('tvc-heading', 'Überschrift', 'heading', TV_COMPARE.heading),
    ...TV_COMPARE.mandates.flatMap((m, i) => [
      e(`tvc-m${i + 1}-client`, `Marke ${i + 1} — Bezeichnung`, 'subheading', m.client, 'Anonymisierte Bezeichnung der Marke'),
      e(`tvc-m${i + 1}-period`, `Marke ${i + 1} — Zeitraum`, 'label', m.period),
      e(`tvc-m${i + 1}-status`, `Marke ${i + 1} — Status`, 'badge', m.status),
      e(`tvc-m${i + 1}-tagline`, `Marke ${i + 1} — Kurzsatz`, 'paragraph', m.tagline),
    ]),
    ...TV_COMPARE.rows.flatMap((r, ri) => [
      e(`tvc-r${ri + 1}-label`, `Zeile ${ri + 1} — Bezeichnung`, 'label', r.label),
      ...r.values.map((v, mi) => e(`tvc-r${ri + 1}-m${mi + 1}`, `Zeile ${ri + 1} („${r.label}“) — Marke ${mi + 1}`, ri === TV_COMPARE.rows.length - 1 ? 'tag' : 'stat', v)),
    ]),
    e('tvc-note', 'Hinweis unter der Tabelle', 'caption', TV_COMPARE.note),
  ],
};
