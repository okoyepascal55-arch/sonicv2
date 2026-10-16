/* ─────────────────────────────────────────────
   KARRIERE — dashboard text sections for the ticker, the two career paths
   (title, stats and the Gehalt/Benefits/Wachsen/Bewerbung tabs), awards
   and team-event lines. Generated from src/pages/careers/content.ts.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';
import { KARRIERE_TICKER, KARRIERE_PATHS, KARRIERE_AWARDS, KARRIERE_EVENT_STATS } from '@/pages/careers/content';

type EntryType = TextEntry['type'];
const e = (id: string, label: string, type: EntryType, value: string, multiline = false): TextEntry => ({
  id, label, description: '', type, value, ...(multiline ? { multiline: true } : {}),
});

const tickerSection: TextSection = {
  key: 'careers_ticker', label: 'Karriere — Kennzahlen-Ticker',
  pageGroupId: 'careers', pagePath: '/karriere',
  description: 'Laufband unter dem Hero (Campus- und POS-Team).',
  entries: KARRIERE_TICKER.flatMap((t, i) => [
    e(`tick-${i + 1}-value`, `Kennzahl ${i + 1} — Wert`, 'stat', t.value),
    e(`tick-${i + 1}-label`, `Kennzahl ${i + 1} — Label`, 'stat-label', t.label),
  ]),
};

const pathEntries = (id: 'sales' | 'staff', name: string): TextEntry[] => {
  const p = KARRIERE_PATHS[id];
  const out: TextEntry[] = [e(`${id}-title`, `${name} — Titel`, 'heading', p.title)];
  p.stats.forEach((s, i) => {
    out.push(e(`${id}-stat-${i + 1}-value`, `${name} — Kennzahl ${i + 1} Wert`, 'stat', s.value));
    out.push(e(`${id}-stat-${i + 1}-label`, `${name} — Kennzahl ${i + 1} Label`, 'stat-label', s.label));
  });
  p.tabs.forEach((tab) => {
    const pre = `${id}-${tab.id}`;
    out.push(e(`${pre}-label`, `${name} — Tab „${tab.label}“ Name`, 'tag', tab.label));
    if (tab.id === 'gehalt') {
      out.push(e(`${pre}-heading`, `${name} — Gehalt Überschrift`, 'subheading', tab.heading));
      tab.rows.forEach((r, i) => {
        out.push(e(`${pre}-${i + 1}-title`, `${name} — Gehalt ${i + 1} Titel`, 'label', r.title));
        out.push(e(`${pre}-${i + 1}-text`, `${name} — Gehalt ${i + 1} Text`, 'paragraph', r.text));
      });
      out.push(e(`${pre}-note`, `${name} — Gehalt Hinweis`, 'caption', tab.note));
    } else if (tab.id === 'benefits') {
      tab.items.forEach((it, i) => out.push(e(`${pre}-${i + 1}`, `${name} — Benefit ${i + 1}`, 'tag', it)));
    } else if (tab.id === 'wachsen') {
      tab.rows.forEach((r, i) => {
        out.push(e(`${pre}-${i + 1}-title`, `${name} — Wachsen ${i + 1} Titel`, 'label', r.title));
        out.push(e(`${pre}-${i + 1}-text`, `${name} — Wachsen ${i + 1} Text`, 'paragraph', r.text));
      });
    } else {
      tab.steps.forEach((st, i) => out.push(e(`${pre}-${i + 1}`, `${name} — Bewerbung Schritt ${i + 1}`, 'list-item', st)));
    }
  });
  return out;
};

const pathsSection: TextSection = {
  key: 'careers_paths_details', label: 'Karriere — Campus Team & POS Team (Karten, Kennzahlen, Tabs)',
  pageGroupId: 'careers', pagePath: '/karriere',
  description: 'Titel, Kennzahlen und die Tabs Gehalt / Benefits / Wachsen / Bewerbung der beiden Karten. Überschrift und Kartentext stehen unter „KarrierepfadeSection“.',
  entries: [...pathEntries('sales', 'Campus'), ...pathEntries('staff', 'POS')],
};

const awardsSection: TextSection = {
  key: 'careers_awards', label: 'Karriere — Auszeichnungen',
  pageGroupId: 'careers', pagePath: '/karriere',
  description: 'kununu- und Google-Bewertungen.',
  entries: [
    e('kununu-sub', 'kununu — Unterzeile', 'caption', KARRIERE_AWARDS.kununuSub),
    e('kununu-rating', 'kununu — Bewertung', 'stat', KARRIERE_AWARDS.kununuRating),
    e('google-sub', 'Google — Unterzeile', 'caption', KARRIERE_AWARDS.googleSub),
    e('google-rating', 'Google — Bewertung', 'stat', KARRIERE_AWARDS.googleRating),
  ],
};

const eventsSection: TextSection = {
  key: 'careers_events_lines', label: 'Karriere — Team Events (Zeilen unter den Titeln)',
  pageGroupId: 'careers', pagePath: '/karriere',
  description: 'Kurze Zeile unter jedem Event-Titel.',
  entries: [
    e('content', 'Content Creation — Zeile', 'caption', KARRIERE_EVENT_STATS.content),
    e('team', 'Team Events — Zeile', 'caption', KARRIERE_EVENT_STATS.team),
    e('promoter', 'Promoter Events — Zeile', 'caption', KARRIERE_EVENT_STATS.promoter),
    e('roadshow', 'Roadshows & Messen — Zeile', 'caption', KARRIERE_EVENT_STATS.roadshow),
  ],
};

export const KARRIERE_TEXT_SECTIONS: TextSection[] = [tickerSection, pathsSection, awardsSection, eventsSection];
