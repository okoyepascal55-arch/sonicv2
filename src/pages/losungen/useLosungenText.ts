import { useTextSection } from '@/hooks/useText';
import { SOLUTIONS, LOSUNGEN_PAGE_TEXT, LOSUNGEN_FAQ, type SolutionKey, type Solution } from './content';

const pick = (t: Record<string, string>, id: string, fallback: string) => (t[id]?.trim() ? t[id] : fallback);

/** One solution tab with any dashboard edits applied (images/icons stay from content.ts). */
export function useSolution(key: SolutionKey): Solution {
  const t = useTextSection(`losungen_${key}`);
  const s = SOLUTIONS[key];
  return {
    ...s,
    label: pick(t, 'label', s.label),
    title: pick(t, 'title', s.title),
    subtitle: pick(t, 'subtitle', s.subtitle),
    description: pick(t, 'description', s.description),
    challenges: s.challenges.map((c, i) => ({ ...c, title: pick(t, `challenge-${i + 1}-title`, c.title), desc: pick(t, `challenge-${i + 1}-desc`, c.desc) })),
    deliverables: s.deliverables.map((d, i) => ({ ...d, title: pick(t, `deliv-${i + 1}-title`, d.title), desc: pick(t, `deliv-${i + 1}-desc`, d.desc) })),
    steps: s.steps.map((st, i) => ({ ...st, title: pick(t, `step-${i + 1}-title`, st.title), desc: pick(t, `step-${i + 1}-desc`, st.desc) })),
    stats: s.stats.map((st, i) => ({ value: pick(t, `stat-${i + 1}-value`, st.value), label: pick(t, `stat-${i + 1}-label`, st.label) })),
    proof: s.proof.map((p, i) => pick(t, `proof-${i + 1}`, p)),
    modules: s.modules.map((m, i) => ({ ...m, name: pick(t, `module-${i + 1}`, m.name) })),
    finalCta: pick(t, 'finalCta', s.finalCta),
    ctaLabel: pick(t, 'ctaLabel', s.ctaLabel),
  } as Solution;
}

export function useSolutionLabels(): Record<SolutionKey, string> {
  const a = useTextSection('losungen_markteintritt');
  const b = useTextSection('losungen_absatz');
  const c = useTextSection('losungen_omnichannel');
  return {
    markteintritt: pick(a, 'label', SOLUTIONS.markteintritt.label),
    absatz: pick(b, 'label', SOLUTIONS.absatz.label),
    omnichannel: pick(c, 'label', SOLUTIONS.omnichannel.label),
  };
}

export function useLosungenPageText(): typeof LOSUNGEN_PAGE_TEXT {
  const t = useTextSection('losungen_page');
  const out = { ...LOSUNGEN_PAGE_TEXT };
  (Object.keys(out) as (keyof typeof out)[]).forEach((k) => { out[k] = pick(t, `lp-${k}`, out[k]); });
  return out;
}

export function useLosungenFaq() {
  const t = useTextSection('losungen_faq');
  return LOSUNGEN_FAQ.map((f, i) => ({ question: pick(t, `faq-${i + 1}-q`, f.question), answer: pick(t, `faq-${i + 1}-a`, f.answer) }));
}
