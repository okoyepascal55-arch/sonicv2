import { useTextSection } from '@/hooks/useText';
import { REVIEW_DEFAULTS } from '@/lib/textStoreReview';

/** Texts of one review section: dashboard value if set, otherwise the default. */
export function useReviewText(sectionKey: string): Record<string, string> {
  const t = useTextSection(sectionKey);
  const defaults = REVIEW_DEFAULTS[sectionKey] ?? {};
  const out: Record<string, string> = { ...defaults };
  for (const k of Object.keys(t)) if (t[k]?.trim() || defaults[k] === '') out[k] = t[k] ?? '';
  return out;
}
