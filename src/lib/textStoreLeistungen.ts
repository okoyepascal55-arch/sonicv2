/* ─────────────────────────────────────────────
   LEISTUNGEN — dashboard sections for texts that used to be hard-coded
   in the Leistungen components (content review 30.09.2026).
   Each page keeps its texts in src/pages/leistungen/texts/<page>.ts;
   components read them via useLeistungenText(sectionKey).
───────────────────────────────────────────── */
import type { TextSection } from './textStore';
import { TEXT_SECTIONS as OVERVIEW } from '@/pages/leistungen/texts/overview';
import { TEXT_SECTIONS as POS } from '@/pages/leistungen/texts/pos';
import { TEXT_SECTIONS as EVENTS } from '@/pages/leistungen/texts/events';
import { TEXT_SECTIONS as STAFF } from '@/pages/leistungen/texts/staff';
import { TEXT_SECTIONS as TALENTPOOL } from '@/pages/leistungen/texts/talentpool';
import { TEXT_SECTIONS as VIDEO } from '@/pages/leistungen/texts/video';
import { TEXT_SECTIONS as KREATION } from '@/pages/leistungen/texts/kreation';
import { TEXT_SECTIONS as FORECASTING } from '@/pages/leistungen/texts/forecasting';
import { TEXT_SECTIONS as WAREHOUSE } from '@/pages/leistungen/texts/warehouse';

export const LEISTUNGEN_TEXT_SECTIONS: TextSection[] = [
  ...OVERVIEW, ...POS, ...EVENTS, ...STAFF, ...TALENTPOOL, ...VIDEO, ...KREATION, ...FORECASTING, ...WAREHOUSE,
];

export const LEISTUNGEN_DEFAULTS: Record<string, Record<string, string>> = Object.fromEntries(
  LEISTUNGEN_TEXT_SECTIONS.map((s) => [s.key, Object.fromEntries(s.entries.map((en) => [en.id, en.value]))]),
);
