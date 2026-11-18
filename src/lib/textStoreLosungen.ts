/* ─────────────────────────────────────────────
   LÖSUNGEN — dashboard text sections
   Generated from src/pages/losungen/content.ts so the page and the dashboard
   share one source. Dashboard → Text → Lösungen shows:
     • Seite (Hero, Intro, Sonic Schwerpunkte, "Was immer gilt")
     • Markteintritt / Absatz steigern / Omnichannel (alle Texte je Tab)
     • FAQ
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';
import { SOLUTIONS, KEYS, LOSUNGEN_PAGE_TEXT, LOSUNGEN_FAQ } from '@/pages/losungen/content';

type EntryType = TextEntry['type'];
const e = (id: string, label: string, type: EntryType, value: string, multiline = false): TextEntry => ({
  id, label, description: '', type, value, ...(multiline ? { multiline: true } : {}),
});

const PAGE_LABELS: Record<keyof typeof LOSUNGEN_PAGE_TEXT, [string, EntryType, boolean?]> = {
  heroBadge: ['Hero — Badge', 'badge'],
  heroH1Line1: ['Hero — H1 Zeile 1', 'heading'],
  heroH1Line2: ['Hero — H1 Zeile 2', 'heading'],
  heroH1Line3: ['Hero — H1 Zeile 3 (lime)', 'heading'],
  heroSub: ['Hero — Unterzeile', 'paragraph'],
  heroIntro: ['Hero — Intro', 'paragraph', true],
  introBadge: ['Intro — Badge', 'badge'],
  introText: ['Intro — Text (Brücke Lösungen ↔ Leistungen)', 'paragraph', true],
  cardChip: ['Karte — Chip oben rechts', 'label'],
  modulesHeading: ['Sonic Schwerpunkte — Überschrift', 'label'],
  modulesPill: ['Sonic Schwerpunkte — Pill', 'tag'],
  alwaysBadge: ['Was immer gilt — Badge', 'badge'],
  alwaysHeading: ['Was immer gilt — Überschrift', 'heading'],
  alwaysSub: ['Was immer gilt — Unterzeile', 'paragraph'],
  always1Title: ['Was immer gilt — Punkt 1 Titel', 'subheading'],
  always1Desc: ['Was immer gilt — Punkt 1 Text', 'paragraph', true],
  always2Title: ['Was immer gilt — Punkt 2 Titel', 'subheading'],
  always2Desc: ['Was immer gilt — Punkt 2 Text', 'paragraph', true],
  always3Title: ['Was immer gilt — Punkt 3 Titel', 'subheading'],
  always3Desc: ['Was immer gilt — Punkt 3 Text', 'paragraph', true],
};

const pageSection: TextSection = {
  key: 'losungen_page',
  label: 'Lösungen — Seite (Hero, Intro, Module, Was immer gilt)',
  pageGroupId: 'losungen', pagePath: '/losungen',
  description: 'Texte der Lösungen-Seite außerhalb der drei Tabs.',
  entries: (Object.keys(PAGE_LABELS) as (keyof typeof LOSUNGEN_PAGE_TEXT)[]).map((k) => {
    const [label, type, ml] = PAGE_LABELS[k];
    return e(`lp-${k}`, label, type, LOSUNGEN_PAGE_TEXT[k], !!ml);
  }),
};

const solutionSection = (key: typeof KEYS[number]): TextSection => {
  const s = SOLUTIONS[key];
  const entries: TextEntry[] = [
    e('label', 'Tab-Name', 'label', s.label),
    e('title', 'Titel', 'heading', s.title),
    e('subtitle', 'Unterzeile', 'subheading', s.subtitle),
    e('description', 'Beschreibung', 'paragraph', s.description, true),
  ];
  s.challenges.forEach((c, i) => {
    entries.push(e(`challenge-${i + 1}-title`, `Herausforderung ${i + 1} — Titel`, 'subheading', c.title));
    entries.push(e(`challenge-${i + 1}-desc`, `Herausforderung ${i + 1} — Text`, 'paragraph', c.desc, true));
  });
  s.deliverables.forEach((d, i) => {
    entries.push(e(`deliv-${i + 1}-title`, `Leistung ${i + 1} — Titel`, 'subheading', d.title));
    entries.push(e(`deliv-${i + 1}-desc`, `Leistung ${i + 1} — Text`, 'paragraph', d.desc, true));
  });
  s.steps.forEach((st, i) => {
    entries.push(e(`step-${i + 1}-title`, `Schritt ${i + 1} — Titel`, 'subheading', st.title));
    entries.push(e(`step-${i + 1}-desc`, `Schritt ${i + 1} — Text`, 'paragraph', st.desc, true));
  });
  s.stats.forEach((st, i) => {
    entries.push(e(`stat-${i + 1}-value`, `Kennzahl ${i + 1} — Wert`, 'stat', st.value));
    entries.push(e(`stat-${i + 1}-label`, `Kennzahl ${i + 1} — Label`, 'stat-label', st.label));
  });
  s.proof.forEach((p, i) => entries.push(e(`proof-${i + 1}`, `Beleg ${i + 1}`, 'paragraph', p, true)));
  // „Sonic Schwerpunkte“ (18.11.2026): name + bar length per row. New ids (schwerpunkt-*) so older
  // module-* edits from the KERN/BAUSTEIN/OPTIONAL version don't land on the wrong rows.
  s.modules.forEach((m, i) => {
    entries.push(e(`schwerpunkt-${i + 1}`, `Schwerpunkt ${i + 1} — Name`, 'label', m.name));
    entries.push(e(`schwerpunkt-${i + 1}-bar`, `Schwerpunkt ${i + 1} — Balken in % (100 = voll · 67 = ⅔ · 50 = ½ · 33 = ⅓)`, 'label', String(m.bar)));
  });
  entries.push(e('ctaHeadline', 'Abschluss — Frage', 'subheading', s.ctaHeadline));
  entries.push(e('finalCta', 'Abschluss — Zeile', 'paragraph', s.finalCta));
  // Button text: Dashboard → CTAs — Button-Texte („Termin vereinbaren“)
  return {
    key: `losungen_${key}`,
    label: `Lösungen — Tab „${s.label}“`,
    pageGroupId: 'losungen', pagePath: '/losungen',
    description: `Alle Texte im Tab „${s.label}“ (Karte, Details, Schritte, Kennzahlen, Sonic Schwerpunkte).`,
    entries,
  };
};

const faqSection: TextSection = {
  key: 'losungen_faq',
  label: 'Lösungen — FAQ',
  pageGroupId: 'losungen', pagePath: '/losungen',
  description: 'Häufig gestellte Fragen am Ende der Lösungen-Seite.',
  entries: LOSUNGEN_FAQ.flatMap((f, i) => [
    e(`faq-${i + 1}-q`, `Frage ${i + 1}`, 'subheading', f.question),
    e(`faq-${i + 1}-a`, `Antwort ${i + 1}`, 'paragraph', f.answer, true),
  ]),
};

export const LOSUNGEN_TEXT_SECTIONS: TextSection[] = [pageSection, ...KEYS.map(solutionSection), faqSection];
