/* ─────────────────────────────────────────────
   FILM-SEITE (/film) — versteckte Landingpage nur für den Sonic-Film (11.11.2026).
   Nicht im Menü, Footer oder in der Sitemap; erreichbar nur per Link (z. B. aus PPTs).
   Englisch: src/lib/textEn/film.ts. Video & Cover: Medien → Film-Seite.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';

type EntryType = TextEntry['type'];
const e = (id: string, label: string, type: EntryType, value: string): TextEntry => ({
  id, label, description: '', type, value, ...(value.length > 80 ? { multiline: true } : {}),
});

export const FILM_TEXT_SECTIONS: TextSection[] = [
  {
    key: 'film_page_texts', label: 'Film-Seite — Texte', pageGroupId: 'film', pagePath: '/film',
    description: 'Versteckte Seite nur mit dem Sonic-Film (/film, Englisch: /film?lang=en). Nicht im Menü, nur per Link erreichbar.',
    entries: [
      e('eyebrow', 'Kleine Zeile über der Überschrift', 'label', 'Sonic Group'),
      e('headline', 'Überschrift', 'heading', 'Erlebe Sonic'),
      e('headline-accent', 'Überschrift — Lime-Hervorhebung', 'heading', 'in 2 Minuten.'),
      e('sub', 'Unterzeile', 'paragraph', 'So verkauft Sonic Marken am POS, im Studio und auf Events — mit Menschen, die Marken erlebbar machen.'),
      e('play', 'Hinweis auf dem Video', 'caption', 'Klicken zum Abspielen'),
      e('cta', 'Button zur Website', 'cta', 'Zur Website'),
      e('youtube', 'Link „Auf YouTube ansehen“', 'caption', 'Auf YouTube ansehen'),
    ],
  },
];

export const FILM_DEFAULTS: Record<string, Record<string, string>> = Object.fromEntries(
  FILM_TEXT_SECTIONS.map((s) => [s.key, Object.fromEntries(s.entries.map((en) => [en.id, en.value]))]),
);
