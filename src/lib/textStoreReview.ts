/* ─────────────────────────────────────────────
   Home & Über uns — dashboard sections for texts that used to be
   hard-coded in components (content review 30.09.2026).
   Components read them via useReviewText(sectionKey).
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';

type EntryType = TextEntry['type'];
const e = (id: string, label: string, type: EntryType, value: string): TextEntry => ({
  id, label, description: '', type, value, ...(value.length > 80 ? { multiline: true } : {}),
});

export const REVIEW_TEXT_SECTIONS: TextSection[] = [
  {
    key: 'home_metrics', label: 'LiveMetrics — Kennzahlen-Ticker', pageGroupId: 'home', pagePath: '/', description: 'Laufband unter dem Hero.',
    entries: [
      e('m1-value', 'Kennzahl 1 — Wert', 'stat', '>2 Mrd. €'),
      e('m1-label', 'Kennzahl 1 — Label', 'stat-label', 'Umsatz für unsere Kunden'),
      e('m2-value', 'Kennzahl 2 — Wert', 'stat', '>1,3 Mio.'),
      e('m2-label', 'Kennzahl 2 — Label', 'stat-label', 'erledigte Einsätze'),
      e('m3-value', 'Kennzahl 3 — Wert', 'stat', '>1.000'),
      e('m3-label', 'Kennzahl 3 — Label', 'stat-label', 'betreute Stores'),
      e('m4-value', 'Kennzahl 4 — Wert', 'stat', '200+'),
      e('m4-label', 'Kennzahl 4 — Label', 'stat-label', 'Promoter:innen im Einsatz'),
      e('m5-value', 'Kennzahl 5 — Wert', 'stat', '>1.700'),
      e('m5-label', 'Kennzahl 5 — Label', 'stat-label', 'Menschen im Talentpool'),
      e('m6-value', 'Kennzahl 6 — Wert', 'stat', '>47.000'),
      e('m6-label', 'Kennzahl 6 — Label', 'stat-label', 'Live-Beratungen'),
    ],
  },
  {
    key: 'home_video_texts', label: 'VideoShowcase — Texte', pageGroupId: 'home', pagePath: '/', description: 'Unterzeile und Leiste unter dem Video.',
    entries: [
      e('sub', 'Unterzeile', 'paragraph', 'Erlebe, wie Sonic Marken am POS, im Studio und auf Events verkauft — mit Menschen, die Marken erlebbar machen.'),
      e('strip-1', 'Leiste 1', 'caption', 'Seit 2007'),
      e('strip-2', 'Leiste 2', 'caption', 'DACH-weit'),
      e('strip-3', 'Leiste 3', 'caption', 'Über 2 Mrd. € Umsatz'),
    ],
  },
  {
    key: 'home_services_texts', label: 'ServicesGrid — Leistungen (Tabs)', pageGroupId: 'home', pagePath: '/', description: 'Einleitung und die fünf Leistungs-Tabs.',
    entries: [
      e('intro', 'Einleitung unter „Manpower trifft ROI“', 'paragraph', 'Promotion, POS, Events, Studios, Content und Schulungen – ein Partner, ein Team, eine Datenbasis.'),
      e('tab1-short', 'Tab 1 — Kurzname', 'label', 'Promotion & POS'),
      e('tab1-title', 'Tab 1 — Titel', 'heading', 'Menschen für Promotion & POS'),
      e('tab1-lead', 'Tab 1 — Leadzeile', 'label', 'Geschultes Personal mit Augenmerk auf Marken- und / oder Produkt-Inszenierung.'),
      e('tab1-desc', 'Tab 1 — Text', 'paragraph', 'End-to-End-Partner für den Point of Sale: Design, Displays, Möbel, Collateral, Give-aways, Logistik und Montage. Wir gestalten und bestücken deine Fläche — datenbasiert geplant, live reportet und messbar erfolgreich.'),
      e('tab1-tagline', 'Tab 1 — Belegzeile', 'caption', 'Über 1.000 Stores. Über 1,3 Mio. Einsätze. Über 2 Mrd. € Umsatz.'),
      e('tab2-short', 'Tab 2 — Kurzname', 'label', 'Events'),
      e('tab2-title', 'Tab 2 — Titel', 'heading', 'Menschen für Events & Messen'),
      e('tab2-lead', 'Tab 2 — Leadzeile', 'label', 'Dediziert geschultes Personal für bestimmte Funktionen – Moderation, Musik, Catering, Logistik und Aufbau.'),
      e('tab2-desc', 'Tab 2 — Text', 'paragraph', 'Wir präsentieren deine Marke da, wo deine Zielgruppe ist: Events, Messen, Roadshows und hybride Formate. Von Konzept über Personal bis Logistik — alles aus einer Hand.'),
      e('tab2-tagline', 'Tab 2 — Belegzeile', 'caption', 'Über 200 Events. Über 30.000 Kontakte. Vor Ort, auf Tour, mit Wirkung.'),
      e('tab3-short', 'Tab 3 — Kurzname', 'label', 'Content'),
      e('tab3-title', 'Tab 3 — Titel', 'heading', 'Menschen für Content'),
      e('tab3-lead', 'Tab 3 — Leadzeile', 'label', 'Ausdrucksstarkes Personal mit Fokus auf Content Produktion.'),
      e('tab3-desc', 'Tab 3 — Text', 'paragraph', 'Unboxing- und How-to-Videos, Foto- und Videoshootings, Livestreams, Produktvideos und Social Media — mit ausdrucksstarkem Personal vor und hinter der Kamera.'),
      e('tab3-tagline', 'Tab 3 — Belegzeile', 'caption', 'Von Social Content bis Livestreams und Produktvideos — Content mit Retail-DNA.'),
      e('tab4-short', 'Tab 4 — Kurzname', 'label', 'Schulungen'),
      e('tab4-title', 'Tab 4 — Titel', 'heading', 'Menschen für Schulungen'),
      e('tab4-lead', 'Tab 4 — Leadzeile', 'label', 'Für Marken-, Produkt- und Verkaufs-Training.'),
      e('tab4-desc', 'Tab 4 — Text', 'paragraph', 'Menschen, die Marken erklären. Trainings, die Wissen direkt in Performance verwandeln — offline, hybrid oder online. Mit Personal und Technik aus einem System.'),
      e('tab4-tagline', 'Tab 4 — Belegzeile', 'caption', 'Strategisch geplant. Praxisnah umgesetzt.'),
      e('tab5-short', 'Tab 5 — Kurzname', 'label', 'Studios'),
      e('tab5-title', 'Tab 5 — Titel', 'heading', 'Menschen für unsere Studios'),
      e('tab5-lead', 'Tab 5 — Leadzeile', 'label', 'All In One: Regisseur, Moderator, Verkäufer.'),
      e('tab5-desc', 'Tab 5 — Text', 'paragraph', 'Erlebbar werden: Produktberatung, Sales und Service-Support direkt aus unseren Studio-Setups. Für Livestreams, Video-Commerce, digitale Beratung und Content-Produktion.'),
      e('tab5-tagline', 'Tab 5 — Belegzeile', 'caption', 'Über 47.000 Live-Beratungen. Ø 5,5 Minuten Gesprächsdauer. Über 4.200 Stunden Beratungszeit.'),
    ],
  },
  {
    key: 'home_srt_teaser', label: 'SRTTeaser — Unterzeile', pageGroupId: 'home', pagePath: '/', description: 'Text unter „SRT: Sonic Reporting Tool“.',
    entries: [
      e('sub', 'Unterzeile', 'paragraph', 'Seit 2008 unser eigenes Tool: individualisierbar, mehrsprachig, adaptiv. Über 21 Versionen, über 1,4 Mio. Einsätze gesteuert – du siehst deine Projektdaten live.'),
    ],
  },
  {
    key: 'home_drive_cards', label: 'Was uns antreibt — Karten 01/02', pageGroupId: 'home', pagePath: '/', description: 'Zwei Zeilen in der dunklen Box „Was uns antreibt“.',
    entries: [
      e('c1-eyebrow', 'Karte 01 — Kicker', 'label', 'Daten Liefern Fakten'),
      e('c1-title', 'Karte 01 — Titel', 'subheading', 'Messbar statt Bauchgefühl'),
      e('c1-text', 'Karte 01 — Text', 'paragraph', '— Daten liefern die Fakten: Bauchgefühl, Analyse, Herleitung, Sicherheit – jede Maßnahme wird im SRT messbar.'),
      e('c1-tags', 'Karte 01 — Pills (mit Komma trennen)', 'tag', 'Analyse, Herleitung, SRT'),
      e('c2-eyebrow', 'Karte 02 — Kicker', 'label', 'Mensch. Der Unterschied.'),
      e('c2-title', 'Karte 02 — Titel', 'subheading', '1.700+ im Talentpool'),
      e('c2-text', 'Karte 02 — Text', 'paragraph', '— Über 1.700 aktive Menschen im Sonic-Talentpool – daraus stellen wir für jedes Projekt das passende Team zusammen.'),
      e('c2-tags', 'Karte 02 — Pills (mit Komma trennen)', 'tag', 'Talentpool, Live-Einblick, Motivation'),
    ],
  },
  {
    key: 'about_ticker', label: 'Über uns — Kennzahlen-Ticker', pageGroupId: 'about', pagePath: '/ueber-uns', description: 'Laufband unter „Marken im Herzen“.',
    entries: [
      e('t1-value', 'Kennzahl 1 — Wert', 'stat', '>15'),
      e('t1-label', 'Kennzahl 1 — Label', 'stat-label', 'Kunden'),
      e('t2-value', 'Kennzahl 2 — Wert', 'stat', '>1,3 Mio.'),
      e('t2-label', 'Kennzahl 2 — Label', 'stat-label', 'Einsätze'),
      e('t3-value', 'Kennzahl 3 — Wert', 'stat', '>1.000'),
      e('t3-label', 'Kennzahl 3 — Label', 'stat-label', 'Stores'),
      e('t4-value', 'Kennzahl 4 — Wert', 'stat', '2007'),
      e('t4-label', 'Kennzahl 4 — Label', 'stat-label', 'Gegründet'),
      e('t5-value', 'Kennzahl 5 — Wert', 'stat', '200+'),
      e('t5-label', 'Kennzahl 5 — Label', 'stat-label', 'Promoter:innen im Einsatz'),
      e('t6-value', 'Kennzahl 6 — Wert', 'stat', '>1.700'),
      e('t6-label', 'Kennzahl 6 — Label', 'stat-label', 'Menschen im Talentpool'),
      e('t7-value', 'Kennzahl 7 — Wert', 'stat', 'DACH'),
      e('t7-label', 'Kennzahl 7 — Label', 'stat-label', 'Marktabdeckung'),
      e('t8-value', 'Kennzahl 8 — Wert', 'stat', '>2 Mrd. €'),
      e('t8-label', 'Kennzahl 8 — Label', 'stat-label', 'Umsatz für unsere Kunden'),
      e('float-value', 'Karte am Bild — Wert', 'stat', '2007'),
      e('float-label', 'Karte am Bild — Label', 'stat-label', 'Seitdem Markenerfolg im DACH-Raum'),
    ],
  },
  {
    key: 'about_values_texts', label: 'Über uns — Referenzen & Team-Kennzahlen', pageGroupId: 'about', pagePath: '/ueber-uns', description: 'Zeile über den Referenz-Logos und die drei Team-Kennzahlen.',
    entries: [
      e('refs-line', 'Referenzen — Zeile', 'paragraph', 'Über 15 Kunden – im Studio, auf der Fläche, im Fachhandel, in Sport & Freizeit und im B2B.'),
      e('team1-value', 'Team-Kennzahl 1 — Wert', 'stat', '5,4'),
      e('team1-unit', 'Team-Kennzahl 1 — Einheit', 'label', 'Jahre'),
      e('team1-label', 'Team-Kennzahl 1 — Label', 'stat-label', 'Ø Betriebszugehörigkeit Sonic-Team'),
      e('team2-value', 'Team-Kennzahl 2 — Wert', 'stat', 'Dual'),
      e('team2-unit', 'Team-Kennzahl 2 — Einheit', 'label', 'Studium'),
      e('team2-label', 'Team-Kennzahl 2 — Label', 'stat-label', 'Ausbildungspartner'),
      e('team3-value', 'Team-Kennzahl 3 — Wert', 'stat', 'B2B + D2C'),
      e('team3-unit', 'Team-Kennzahl 3 — Einheit', 'label', ''),
      e('team3-label', 'Team-Kennzahl 3 — Label', 'stat-label', 'Kunden- & Agenturseite'),
    ],
  },
];

export const REVIEW_DEFAULTS: Record<string, Record<string, string>> = Object.fromEntries(
  REVIEW_TEXT_SECTIONS.map((s) => [s.key, Object.fromEntries(s.entries.map((en) => [en.id, en.value]))]),
);
