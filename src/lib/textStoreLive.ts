/* ─────────────────────────────────────────────
   Live-site texts that used to be hard-coded in components (dashboard audit
   18.11.2026). Every default below is the exact wording that was live, so the
   site looks identical until something is edited in the dashboard.
   Components read these via useReviewText(sectionKey) (registered through
   REVIEW_TEXT_SECTIONS) or useText(...) with the same defaults.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';
import { TV_COMPARE } from '@/pages/case-studies/tvCompareContent';
import { CASE_DETAIL_SECTIONS } from '@/pages/case-studies/caseContent';

type EntryType = TextEntry['type'];
const e = (id: string, label: string, type: EntryType, value: string): TextEntry => ({
  id, label, description: '', type, value, ...(value.length > 80 ? { multiline: true } : {}),
});

/** Quiz content (home „Welche Sonic-Lösung passt zu dir?“) — shared with QuizModal. */
export const QUIZ_DEFAULTS = {
  questions: [
    { q: 'Was ist deine größte Herausforderung im DACH-Markt?', options: ['Markteintritt', 'Retail-Präsenz ausbauen', 'Qualifiziertes Personal finden', 'Event- & Messeumsetzung'] },
    { q: 'In welcher Phase stehst du gerade?', options: ['Einstieg planen', 'Bereits aktiv', 'Performance optimieren', 'Operationen ausbauen'] },
    { q: 'Was ist gerade deine Priorität?', options: ['Schneller Markteintritt', 'Kosteneffizienz', 'Qualität & Compliance', 'Daten & Insights'] },
  ],
};

export const LIVE_TEXT_SECTIONS: TextSection[] = [
  /* ── Home ── */
  {
    key: 'home_contact_block', label: 'Sonic Group & Karriere — zwei Boxen unten', pageGroupId: 'home', pagePath: '/',
    description: 'Die schwarze „Sonic Group“-Box und die weiße „Karriere“-Box über dem Abschluss. Die Werte 01/02 stehen unter „Was uns antreibt — Karten 01/02“.',
    entries: [
      e('about-eyebrow', 'Sonic Group — Kicker', 'badge', 'Was uns antreibt'),
      e('about-title', 'Sonic Group — Überschrift', 'heading', 'Sonic Group'),
      e('about-body', 'Sonic Group — Text', 'paragraph', 'Als Sales- und Marketing-Agentur verbinden wir starke Teams mit unserer eigenen Software, Kreativität mit Performance, Daten mit Menschen und Marken mit Konsumenten. Für deinen messbaren Markenerfolg.'),
      e('about-tags', 'Sonic Group — Hashtags (mit Komma trennen)', 'label', '#Doing things, #Doing things better, #Doing new things'),
      e('about-btn', 'Sonic Group — Button', 'cta', 'Mehr über Sonic'),
      e('career-eyebrow', 'Karriere — Kicker', 'badge', 'Menschen mit Doer-Mentalität gesucht'),
      e('career-title', 'Karriere — Überschrift', 'heading', 'Karriere'),
      e('career-body', 'Karriere — Text', 'paragraph', 'Zeige was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig ist für uns deine Einstellung zum Job und was du erreichen willst – nicht nur das, was du schon erreicht hast.'),
      e('career-pill-1', 'Karriere — Punkt 1', 'label', 'Führende Marken aus aller Welt'),
      e('career-pill-2', 'Karriere — Punkt 2', 'label', 'Einstellung schlägt Lebenslauf'),
      e('career-pill-3', 'Karriere — Punkt 3', 'label', 'Ein Team, das wie Familie ist'),
      e('career-btn', 'Karriere — Button', 'cta', 'Mehr dazu'),
    ],
  },
  {
    key: 'home_quiz_texts', label: 'Kurzumfrage — Fragen & Texte', pageGroupId: 'home', pagePath: '/',
    description: 'Das Fenster „Welche Sonic-Lösung passt zu dir?“: Kopf, die drei Fragen mit Antworten, Kontakt-Schritt. Die Empfehlungen stehen unter „Kurzumfrage — Ergebnis-CTA“.',
    entries: [
      e('kicker', 'Kopf — Kicker', 'badge', 'Kurz-Check'),
      e('title', 'Kopf — Zeile', 'label', 'Finde deine passende Sonic-Lösung'),
      ...QUIZ_DEFAULTS.questions.flatMap((s, i) => [
        e(`q${i + 1}`, `Frage ${i + 1}`, 'heading', s.q),
        ...s.options.map((o, j) => e(`q${i + 1}-o${j + 1}`, `Frage ${i + 1} — Antwort ${j + 1}`, 'label', o)),
      ]),
      e('back', 'Button — Zurück', 'cta', 'Zurück'),
      e('contact-title', 'Kontakt-Schritt — Überschrift', 'heading', 'Fast geschafft!'),
      e('contact-sub', 'Kontakt-Schritt — Zeile', 'paragraph', 'Gib deine Kontaktdaten ein, um deine persönliche Empfehlung zu sehen.'),
      e('submit', 'Kontakt-Schritt — Button', 'cta', 'Meine Empfehlung ansehen'),
      e('privacy', 'Kontakt-Schritt — Zeile unter dem Button', 'caption', 'Kein Spam. Wir melden uns nur, wenn es für deine Herausforderung relevant ist.'),
      e('result-label', 'Ergebnis — „Unsere Empfehlung:“', 'label', 'Unsere Empfehlung:'),
      e('restart', 'Ergebnis — Button Neu starten', 'cta', 'Neu starten'),
    ],
  },

  /* ── Common ── */
  {
    key: 'common_ui_labels', label: 'Kleine Bedienelemente (alle Seiten)', pageGroupId: 'common', pagePath: '/',
    description: 'Feste Beschriftungen, die auf mehreren Seiten vorkommen: Menü-Knopf der Seitenleisten (Handy), „Nach oben“, Platzhalter ohne Foto.',
    entries: [
      e('menu', 'Seitenleiste (Handy) — Knopf „Menü“', 'label', 'Menü'),
      e('to-top', 'Knopf „Nach oben“ (unten rechts)', 'label', 'Nach oben'),
      e('photo-follows', 'Platzhalter, solange kein Foto da ist', 'label', 'Foto folgt'),
      e('voices-next', 'Stimmen-Karussell — Standard-Button „Nächste Stimme“', 'cta', 'Nächste Stimme'),
      e('live-badge', 'Kennzahlen-Laufband Leistungen — Wort „LIVE“ am Anfang', 'label', 'LIVE'),
    ],
  },
  /* ── Über uns ── */
  {
    key: 'about_page_nav', label: 'Seitenmenü & Stimmen-Buttons', pageGroupId: 'about', pagePath: '/ueber-uns',
    description: 'Die Sprungmarken-Leiste unter dem Hero (Über uns · Team · Management) und die Buttons bei „Die Stimmen hinter Sonic“.',
    entries: [
      e('nav-1', 'Seitenmenü 1', 'nav-label', 'Über uns'),
      e('nav-2', 'Seitenmenü 2', 'nav-label', 'Team'),
      e('nav-3', 'Seitenmenü 3', 'nav-label', 'Management'),
      e('voices-story-label', 'Stimmen — Kicker über dem Text', 'badge', 'Perspektive'),
      e('voices-next', 'Stimmen — Button nächste Person', 'cta', 'Nächste Perspektive'),
    ],
  },
  /* ── Karriere ── */
  {
    key: 'karriere_hero_texts', label: 'Hero — „Menschen mit Energie gesucht“', pageGroupId: 'careers', pagePath: '/karriere',
    description: 'Der Kopfbereich ganz oben auf der Karriere-Seite. Hintergrundbild: Bilder → Karriere → Hero.',
    entries: [
      e('badge', 'Kicker', 'badge', 'Karriere bei Sonic'),
      e('h1-start', 'Überschrift — Anfang', 'heading', 'Menschen mit'),
      e('h1-accent', 'Überschrift — Akzent (lime)', 'heading', 'Energie'),
      e('h1-end', 'Überschrift — Ende', 'heading', 'gesucht'),
      e('intro', 'Text', 'paragraph', 'Zeige, was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig ist uns deine Einstellung zum Job — nicht nur das, was du schon erreicht hast.'),
      e('sub', 'Zweite Zeile', 'paragraph', 'Aktuelle Stellen am Sonic-Campus in Krefeld und deutschlandweite Einsätze für unsere Kundenprojekte.'),
      e('btn-jobs', 'Button 1 — Stellen', 'cta', 'Alle Stellen ansehen'),
      e('btn-initiative', 'Button 2 — Initiativbewerbung', 'cta', 'Initiativbewerbung'),
    ],
  },
  {
    key: 'karriere_nav_texts', label: 'Seitenmenü (schwarze Leiste) & Bewerben-Buttons', pageGroupId: 'careers', pagePath: '/karriere',
    description: 'Die schwarze Leiste unter dem Hero (01–05) und die Bewerben-Buttons (Desktop rechts, Handy unten).',
    entries: [
      e('nav-1', 'Menü 01', 'label', 'Zwei Wege'),
      e('nav-2', 'Menü 02', 'label', 'Kultur & DNA'),
      e('nav-3', 'Menü 03', 'label', 'Geschichten'),
      e('nav-4', 'Menü 04', 'label', 'Leben bei Sonic'),
      e('nav-5', 'Menü 05', 'label', 'Stellen'),
      e('apply', 'Button rechts (Desktop)', 'cta', 'Bewerben'),
      e('apply-mobile', 'Button unten (Handy)', 'cta', 'Stellenangebote'),
    ],
  },
  {
    key: 'karriere_events_tabs', label: 'Leben bei Sonic — die vier Event-Tabs', pageGroupId: 'careers', pagePath: '/karriere',
    description: 'Kicker und Titel der vier Kacheln unter dem Event-Video (die Zeilen darunter: „Leben bei Sonic — Zeilen unter den Events“). Bilder: „Leben bei Sonic — Event-Bilder“, Videos: „… — Event-Videos“ (Bild/Video 1 = Tab 1 usw.).',
    entries: [
      e('tab-1-tag', 'Tab 1 — Kicker', 'badge', 'Kreation'), e('tab-1-title', 'Tab 1 — Titel', 'heading', 'Content Creation'),
      e('tab-2-tag', 'Tab 2 — Kicker', 'badge', 'Intern'), e('tab-2-title', 'Tab 2 — Titel', 'heading', 'Team Events'),
      e('tab-3-tag', 'Tab 3 — Kicker', 'badge', 'Extern'), e('tab-3-title', 'Tab 3 — Titel', 'heading', 'Promoter Events'),
      e('tab-4-tag', 'Tab 4 — Kicker', 'badge', 'Unterwegs'), e('tab-4-title', 'Tab 4 — Titel', 'heading', 'Roadshows & Messen'),
    ],
  },
  {
    key: 'careers_path_page', label: 'Job-Detailseite (Campus / POS)', pageGroupId: 'careers', pagePath: '/karriere/team',
    description: 'Feste Texte der Detailseiten „/karriere/team“. Die Inhalte der beiden Wege stehen unter „Karrierepfade“.',
    entries: [
      e('path-page-back', 'Link zurück', 'link', 'Alle Karrierepfade'),
      e('path-page-intro-label', 'Kicker über dem Text', 'badge', 'Dein Job'),
      e('path-page-cta', 'Abschluss — Anfang („Bereit für das …“)', 'heading', 'Bereit für das'),
      e('path-page-or', 'Abschluss — „Oder lieber …“', 'label', 'Oder lieber'),
    ],
  },

  /* ── Fallbeispiele ── */
  {
    key: 'case_studies_labels', label: 'Seite — Kopf, Intro & feste Beschriftungen', pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'Hero „Erfolgsgeschichten“, Intro-Text und die festen Beschriftungen in den aufgeklappten Fallstudien.',
    entries: [
      e('badge', 'Hero — Kicker', 'badge', 'Fallbeispiele'),
      e('h1', 'Hero — Überschrift (weiß)', 'heading', 'ERFOLGS'),
      e('h1-accent', 'Hero — Überschrift (lime)', 'heading', 'GESCHICHTEN'),
      e('intro', 'Intro-Text unter dem Hero', 'paragraph', 'Gemeinsam mit unseren Kunden erzielen wir messbare Erfolge. Unsere datengetriebene Arbeitsweise ermöglicht laufende Optimierungen — die Ergebnisse wachsen mit jeder weiteren Zusammenarbeit.'),
      e('case-accent', 'Fallstudie — Wort nach dem Markennamen (lime)', 'heading', 'Fallstudie'),
      e('services-kicker', 'Fallstudie — Kicker Leistungen', 'badge', 'Leistungen im Einsatz'),
      e('services-title', 'Fallstudie — Titel Leistungen (nach „Marke —“)', 'heading', 'Was wir eingesetzt haben'),
      e('more-heading', 'Fallstudie — „Weitere Erfolgsgeschichten“', 'heading', 'Weitere Erfolgsgeschichten'),
      e('back', 'Fallstudie — Button zurück', 'cta', 'Zurück zur Übersicht'),
      e('next', 'Fallstudie — Button nächste', 'cta', 'Nächste Story'),
      e('since-word', 'Story-Kopf — Wort „Seit“ vor dem Jahr', 'label', 'Seit'),
    ],
  },
  // Story details per case (Eckdaten, Module, Mandate) — 19.11.2026
  ...CASE_DETAIL_SECTIONS,
  {
    key: 'case_tvsound_compare', label: 'TV & Sound — „Drei Mandate im Vergleich“', pageGroupId: 'case_studies', pagePath: '/fallbeispiele',
    description: 'Vergleichstabelle der drei TV-Mandate in der Fallstudie TV & Sound. Markennamen bleiben anonymisiert.',
    entries: [
      e('tvc-eyebrow', 'Kicker', 'badge', TV_COMPARE.eyebrow),
      e('tvc-heading', 'Überschrift', 'heading', TV_COMPARE.heading),
      ...TV_COMPARE.mandates.flatMap((m, i) => [
        e(`tvc-m${i + 1}-client`, `Mandat ${i + 1} — Kunde`, 'label', m.client),
        e(`tvc-m${i + 1}-period`, `Mandat ${i + 1} — Zeitraum`, 'label', m.period),
        e(`tvc-m${i + 1}-status`, `Mandat ${i + 1} — Status`, 'label', m.status),
        e(`tvc-m${i + 1}-tagline`, `Mandat ${i + 1} — Zeile`, 'paragraph', m.tagline),
      ]),
      ...TV_COMPARE.rows.flatMap((r, ri) => [
        e(`tvc-r${ri + 1}-label`, `Zeile ${ri + 1} — Beschriftung`, 'label', r.label),
        ...r.values.map((v, mi) => e(`tvc-r${ri + 1}-m${mi + 1}`, `Zeile ${ri + 1} („${r.label}“) — Mandat ${mi + 1}`, 'label', v)),
      ]),
      e('tvc-note', 'Fußnote', 'caption', TV_COMPARE.note),
      e('tvc-brand-word', 'Wort „Marke“ vor 01/02/03 (Zeitleiste & Auswahl)', 'label', 'Marke'),
    ],
  },
];
