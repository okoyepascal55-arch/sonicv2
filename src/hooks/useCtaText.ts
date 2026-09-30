import { useTextSection } from '@/hooks/useText';
import { CTA_DEFAULTS } from '@/lib/textStoreCta';

/** Site-wide CTA labels: dashboard value if set, otherwise the default. */
export function useCtaText(): Record<string, string> {
  const t = useTextSection('common_cta');
  const out: Record<string, string> = { ...CTA_DEFAULTS };
  for (const k of Object.keys(t)) if (t[k]?.trim()) out[k] = t[k];
  return out;
}
