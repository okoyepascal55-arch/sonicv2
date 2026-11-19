import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

/* Texts shared by all Leistungen sub-pages (e.g. the „Deine Herausforderung“ block). */
export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_challenge_common', 'Leistungen — Herausforderung (alle Unterseiten)', '/leistungen/pos-full-service', 'Gemeinsame Texte des Blocks „Deine Herausforderung“ auf allen Leistungen-Unterseiten.', [
    e('hint', 'Hinweis über den Punkten (noch nichts aufgedeckt)', 'label', 'Tippe oder fahre über die Punkte – erkennst du dich wieder?'),
    // Fixed labels on all Leistungen sub-pages (connected 19.11.2026)
    e('badge', 'Kicker „Deine Herausforderung“', 'badge', 'Deine Herausforderung'),
    e('counter', 'Zähler — Wort nach „1/3“', 'label', 'erkannt'),
    e('counter-more', 'Zähler — Zusatz während des Aufdeckens', 'label', 'weiter scrollen?'),
    e('done', 'Zähler — alle aufgedeckt (Hinweis)', 'label', 'Dann reden wir.'),
    e('solved', 'Zähler — alle aufgedeckt (Leiste)', 'label', 'Wir haben die Lösung.'),
    e('step', 'Prozess — Wort „Schritt“', 'label', 'Schritt'),
    e('scroll', 'Karten-Leisten — Wort „scrollen“', 'label', 'scrollen'),
    e('word-leistungen', 'Karten-Leiste — „Leistungen“', 'label', 'Leistungen'),
    e('word-einsatzbereiche', 'Karten-Leiste — „Einsatzbereiche“ (Staff as a Service)', 'label', 'Einsatzbereiche'),
    e('word-kanaele', 'Karten-Leiste — „Kanäle“ (Live Video)', 'label', 'Kanäle'),
    e('word-vorteile', 'Karten-Leiste — „Vorteile“ (Live Video)', 'label', 'Vorteile'),
  ]),
];
