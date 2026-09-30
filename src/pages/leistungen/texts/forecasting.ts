import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

const P = '/leistungen/forecasting';

export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_forecasting_hero_buttons', 'Forecasting — Hero-Buttons', P, 'Die beiden Buttons im Hero.', [
    e('primary', 'Hero — Button 1 (Beratung)', 'cta', 'Beratungsgespräch buchen'),
    e('secondary', 'Hero — Button 2 (SRT)', 'cta', 'SRT erkunden'),
  ]),

  section('leistungen_forecasting_challenges', 'Forecasting — Problem-Punkte', P, 'Badge und die 3 Punkte im Abschnitt „Das Problem“.', [
    e('badge', 'Problem — Badge', 'badge', 'Das Problem'),
    e('c1_title', 'Punkt 1 — Titel', 'heading', 'ROI unsicher — Budget ins Unbekannte'),
    e('c1_desc', 'Punkt 1 — Text', 'paragraph', 'Budget fließt in Einsätze, ohne zu wissen, was dabei rauskommt. Quartalsberichte kommen zu spät. Wer ohne Prognose startet, kennt seinen ROI erst rückwirkend.'),
    e('c1_trigger', 'Punkt 1 — Hover-Frage', 'label', 'Kommt dir bekannt vor?'),
    e('c2_title', 'Punkt 2 — Titel', 'heading', 'Datensilos machen Prognosen unmöglich'),
    e('c2_desc', 'Punkt 2 — Text', 'paragraph', 'Sell-out-Daten liegen in verschiedenen Systemen, Excel-Sheets und bei Handelspartnern. Eine übergreifende Prognose ist manuell kaum möglich — und fehleranfällig.'),
    e('c2_trigger', 'Punkt 2 — Hover-Frage', 'label', 'Auch bei euch so?'),
    e('c3_title', 'Punkt 3 — Titel', 'heading', 'Manuelle Planung auf Bauchgefühl'),
    e('c3_desc', 'Punkt 3 — Text', 'paragraph', 'Einsatzplanung auf Basis von Bauchgefühl und Erfahrung. Saisonalität, Standort-Performance und Wettbewerbsdynamik werden nicht systematisch berücksichtigt.'),
    e('c3_trigger', 'Punkt 3 — Hover-Frage', 'label', 'Klingt vertraut?'),
  ]),

  section('leistungen_forecasting_cards', 'Forecasting — Lösungs-Karten', P, 'Eyebrow, Scroll-Hinweis und die 6 Karten im Abschnitt „Die Sonic-Lösung“.', [
    e('eyebrow', 'Lösung — Eyebrow', 'badge', 'Die Sonic-Lösung'),
    e('scroll_label', 'Lösung — Scroll-Hinweis', 'label', '6 Features — scrollen'),
    e('s1_accent', 'Karte 1 — Kategorie', 'tag', 'Datenanalyse'),
    e('s1_title', 'Karte 1 — Titel', 'heading', 'Herleitung statt Schätzung'),
    e('s1_desc', 'Karte 1 — Text', 'paragraph', 'Wir leiten deine Prognose aus historischen Einsatz- und Abverkaufsdaten im SRT her. Vom Bauchgefühl über Analyse und Herleitung zur Sicherheit.'),
    e('s2_accent', 'Karte 2 — Kategorie', 'tag', 'Standort'),
    e('s2_title', 'Karte 2 — Titel', 'heading', 'Standort-Potenzialanalyse'),
    e('s2_desc', 'Karte 2 — Text', 'paragraph', 'Welche Outlets versprechen den größten Hebel? Wir priorisieren Standorte nach erwartetem ROI — auf Basis der Performance aus über 1.000 betreuten Stores.'),
    e('s3_accent', 'Karte 3 — Kategorie', 'tag', 'Saisonalität'),
    e('s3_title', 'Karte 3 — Titel', 'heading', 'Saisonalität berücksichtigt'),
    e('s3_desc', 'Karte 3 — Text', 'paragraph', 'Weihnachtsgeschäft, Back-to-School, Black Friday: Wir berücksichtigen saisonale Muster aus über 1,3 Mio. dokumentierten Einsätzen.'),
    e('s4_accent', 'Karte 4 — Kategorie', 'tag', 'Szenarien'),
    e('s4_title', 'Karte 4 — Titel', 'heading', 'Szenarien im Vergleich'),
    e('s4_desc', 'Karte 4 — Text', 'paragraph', 'Best Case, Base Case, Worst Case. Du siehst, wie sich verschiedene Einsatz-Szenarien auf dein Ergebnis auswirken — und kannst fundiert entscheiden.'),
    e('s5_accent', 'Karte 5 — Kategorie', 'tag', 'Live-Tracking'),
    e('s5_title', 'Karte 5 — Titel', 'heading', 'Live-Abgleich mit Ist-Daten'),
    e('s5_desc', 'Karte 5 — Text', 'paragraph', 'Nach dem Go-live gleichen wir die Prognose laufend mit echten Einsatzdaten ab. Abweichungen werden früh sichtbar — und wir steuern gemeinsam nach.'),
    e('s6_accent', 'Karte 6 — Kategorie', 'tag', 'Reporting'),
    e('s6_title', 'Karte 6 — Titel', 'heading', 'Reporting in deinem Format'),
    e('s6_desc', 'Karte 6 — Text', 'paragraph', 'Prognose und Ist-Daten live einsehen – egal ob PowerPoint, Excel oder maßgeschneiderte SQL-Reportings. Individuelle Reports definieren wir gemeinsam mit dir, so viele du brauchst.'),
  ]),

  section('leistungen_forecasting_steps', 'Forecasting — Schritte', P, 'Eyebrow, Schritt-Label und die 4 Schritte im Abschnitt „So funktioniert es“.', [
    e('eyebrow', 'Schritte — Eyebrow', 'badge', 'So funktioniert es'),
    e('step_label', 'Schritte — Label vor der Nummer', 'label', 'Schritt'),
    e('st1_title', 'Schritt 1 — Titel', 'heading', 'Datenbasis aufbauen'),
    e('st1_desc', 'Schritt 1 — Text', 'paragraph', 'Wir analysieren deine historischen Sell-out-Daten, Standortinformationen und vergangenen Einsätze. Je breiter die Datenbasis, desto präziser die Prognose.'),
    e('st2_title', 'Schritt 2 — Titel', 'heading', 'Prognose kalibrieren'),
    e('st2_desc', 'Schritt 2 — Text', 'paragraph', 'Wir stimmen die Prognose auf dein Produkt, deine Kategorie und dein Retail-Setup ab. Vergleichswerte aus über 1,3 Mio. Einsätzen und SRT-Daten seit 2008 fließen ein.'),
    e('st3_title', 'Schritt 3 — Titel', 'heading', 'Prognose ausgeben'),
    e('st3_desc', 'Schritt 3 — Text', 'paragraph', 'Du erhältst eine transparente Prognose: erwarteter Sell-out pro Standort, pro Zeitraum und pro Szenario — Best, Base und Worst Case. Jede Zahl mit nachvollziehbarer Herleitung.'),
    e('st4_title', 'Schritt 4 — Titel', 'heading', 'Live abgleichen'),
    e('st4_desc', 'Schritt 4 — Text', 'paragraph', 'Nach Projektstart gleichen wir die Prognose laufend mit echten Einsatzdaten im SRT ab. Optimierungspotenziale werden früh sichtbar.'),
  ]),

  section('leistungen_forecasting_cta', 'Forecasting — Kontakt-Box', P, 'Die Kontakt-Box am Seitenende.', [
    e('headline', 'Kontakt — Headline', 'heading', 'Starte mit einer'),
    e('headline_accent', 'Kontakt — Headline (Akzent)', 'heading', 'Forecasting-Session.'),
    e('subline', 'Kontakt — Text', 'paragraph', 'Wir schauen uns deine Datenbasis an und zeigen dir in 30 Minuten, was eine Prognose für dein Projekt realistisch leisten kann.'),
    e('check_items', 'Kontakt — Punkte (mit | trennen)', 'list-item', 'Kostenfreies 30-Minuten-Strategiegespräch | Analyse deiner bestehenden Datenbasis | Einblick in unsere Forecasting-Methodik | Erste Einschätzung, was deine Daten hergeben'),
    e('cta_label', 'Kontakt — Button', 'cta', 'Beratungsgespräch buchen'),
  ]),
];
