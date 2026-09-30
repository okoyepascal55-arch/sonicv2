import { useTextSection } from '@/hooks/useText';
import { KARRIERE_TICKER, KARRIERE_PATHS, KARRIERE_AWARDS, KARRIERE_EVENT_STATS, type PathTab } from './content';

const pick = (t: Record<string, string>, id: string, fallback: string) => (t[id]?.trim() ? t[id] : fallback);

export function useKarriereTicker() {
  const t = useTextSection('careers_ticker');
  return KARRIERE_TICKER.map((s, i) => ({ ...s, value: pick(t, `tick-${i + 1}-value`, s.value), label: pick(t, `tick-${i + 1}-label`, s.label) }));
}

export function useKarrierePath(id: 'sales' | 'staff') {
  const t = useTextSection('careers_paths_details');
  const p = KARRIERE_PATHS[id];
  const tabs: PathTab[] = p.tabs.map((tab) => {
    const pre = `${id}-${tab.id}`;
    const label = pick(t, `${pre}-label`, tab.label);
    if (tab.id === 'gehalt') return { ...tab, label, heading: pick(t, `${pre}-heading`, tab.heading), note: pick(t, `${pre}-note`, tab.note), rows: tab.rows.map((r, i) => ({ title: pick(t, `${pre}-${i + 1}-title`, r.title), text: pick(t, `${pre}-${i + 1}-text`, r.text) })) };
    if (tab.id === 'benefits') return { ...tab, label, items: tab.items.map((it, i) => pick(t, `${pre}-${i + 1}`, it)) };
    if (tab.id === 'wachsen') return { ...tab, label, rows: tab.rows.map((r, i) => ({ title: pick(t, `${pre}-${i + 1}-title`, r.title), text: pick(t, `${pre}-${i + 1}-text`, r.text) })) };
    return { ...tab, label, steps: tab.steps.map((st, i) => pick(t, `${pre}-${i + 1}`, st)) };
  });
  return {
    title: pick(t, `${id}-title`, p.title),
    stats: p.stats.map((s, i) => ({ value: pick(t, `${id}-stat-${i + 1}-value`, s.value), label: pick(t, `${id}-stat-${i + 1}-label`, s.label) })),
    tabs,
  };
}

export function useKarriereAwards() {
  const t = useTextSection('careers_awards');
  return {
    kununuSub: pick(t, 'kununu-sub', KARRIERE_AWARDS.kununuSub),
    kununuRating: pick(t, 'kununu-rating', KARRIERE_AWARDS.kununuRating),
    googleSub: pick(t, 'google-sub', KARRIERE_AWARDS.googleSub),
    googleRating: pick(t, 'google-rating', KARRIERE_AWARDS.googleRating),
  };
}

export function useKarriereEventLines(): typeof KARRIERE_EVENT_STATS {
  const t = useTextSection('careers_events_lines');
  return {
    content: pick(t, 'content', KARRIERE_EVENT_STATS.content),
    team: pick(t, 'team', KARRIERE_EVENT_STATS.team),
    promoter: pick(t, 'promoter', KARRIERE_EVENT_STATS.promoter),
    roadshow: pick(t, 'roadshow', KARRIERE_EVENT_STATS.roadshow),
  };
}
