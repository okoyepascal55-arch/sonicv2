import type { TextSection } from '@/lib/textStore';
import { e, section } from '@/lib/leistungenTextKit';

/* Texts shared by all Leistungen sub-pages (e.g. the „Deine Herausforderung“ block). */
export const TEXT_SECTIONS: TextSection[] = [
  section('leistungen_challenge_common', 'Leistungen — Herausforderung (alle Unterseiten)', '/leistungen/pos-full-service', 'Gemeinsame Texte des Blocks „Deine Herausforderung“ auf allen Leistungen-Unterseiten.', [
    e('hint', 'Hinweis über den Punkten (noch nichts aufgedeckt)', 'label', 'Tippe oder fahre über die Punkte – erkennst du dich wieder?'),
  ]),
];
