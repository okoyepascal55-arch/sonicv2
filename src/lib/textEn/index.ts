/* English texts for the dashboard text store, keyed like the German defaults:
   { sectionKey: { entryId: 'English text' } }.
   Anything missing here falls back to the German text, so the site never shows blanks.
   Edits made in the dashboard's English view override these values. */
import { EN as home } from './home';
import { EN as common } from './common';
import { EN as about } from './about';
import { EN as kontakt } from './kontakt';
import { EN as srt } from './srt';
import { EN as ratgeber } from './ratgeber';
import { EN as sonicReels } from './sonicReels';
import { EN as careers } from './careers';
import { EN as leistungen } from './leistungen';
import { EN as caseStudies } from './caseStudies';
import { EN as blog } from './blog';
import { EN as losungen } from './losungen';
import { EN as film } from './film';

export const EN_TEXT: Record<string, Record<string, string>> = {
  ...home, ...common, ...about, ...kontakt, ...srt, ...ratgeber, ...sonicReels, ...careers, ...leistungen, ...caseStudies, ...blog, ...losungen, ...film,
};
