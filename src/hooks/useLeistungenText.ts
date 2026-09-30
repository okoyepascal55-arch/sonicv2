import { useTextSection } from '@/hooks/useText';
import { LEISTUNGEN_DEFAULTS } from '@/lib/textStoreLeistungen';

/** Texts of one Leistungen section: dashboard value if set, otherwise the default. */
export function useLeistungenText(sectionKey: string): Record<string, string> {
  const t = useTextSection(sectionKey);
  const defaults = LEISTUNGEN_DEFAULTS[sectionKey] ?? {};
  const out: Record<string, string> = { ...defaults };
  for (const k of Object.keys(t)) if (t[k]?.trim() || defaults[k] === '') out[k] = t[k] ?? '';
  return out;
}

/** Split a dashboard value on "|" into a list (used for tags / bullet lists). */
export const splitList = (v: string | undefined): string[] =>
  (v ?? '').split('|').map((s) => s.trim()).filter(Boolean);
