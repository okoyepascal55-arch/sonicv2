/* ─────────────────────────────────────────────
   CTAs — site-wide button labels and the micro-line under booking buttons
   (CTA review 30.09.2026: two labels only — "Termin vereinbaren" opens the
   booking calendar, "Projekt anfragen" goes to the contact form).
───────────────────────────────────────────── */
import type { TextSection } from './textStore';
import { e } from './leistungenTextKit';

export const CTA_TEXT_SECTIONS: TextSection[] = [
  {
    key: 'common_cta', label: 'CTAs — Button-Texte (alle Seiten)', pageGroupId: 'common', pagePath: '(all pages)',
    description: 'Einheitliche Button-Texte. „Termin vereinbaren“ öffnet immer den Buchungskalender.',
    entries: [
      e('book', 'Button — Termin (öffnet Kalender)', 'cta', 'Termin vereinbaren'),
      e('request', 'Button — Anfrage (Kontaktformular)', 'cta', 'Projekt anfragen'),
      e('microline', 'Zeile unter Termin-Buttons', 'caption', '30 Minuten · kostenlos · unverbindlich'),
      e('badge', 'Schwebender Kalender-Button (unten rechts)', 'cta', 'Termin vereinbaren'),
    ],
  },
];

export const CTA_DEFAULTS: Record<string, string> = Object.fromEntries(
  CTA_TEXT_SECTIONS[0].entries.map((en) => [en.id, en.value]),
);

/** Labels that open the booking calendar (current + legacy labels still saved in the dashboard). */
export const BOOKING_LABELS = ['Termin vereinbaren', 'Beratungsgespräch buchen'];
