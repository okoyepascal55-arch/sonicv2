import { useMediaStore } from '@/lib/mediaStore';

/**
 * One shared brand-logo library (22.10.2026).
 * Every logo spot on the site looks up a brand BY NAME in the logos uploaded in the dashboard —
 * the label (caption) of an upload is the brand name. The spot's own slot wins, then any other
 * logo slot; the old external (Brandfetch) link is only the last fallback.
 *   Dashboard → Medien → Fallbeispiele „Markenlogos“, Common „ClientProof — Brand Logos“,
 *   Home „TrustStrip — Brand Logos“, Über uns „Kundenlogos“.
 */
const LOGO_SLOTS = ['case_studies_brand_logos', 'common_clientproof_logos', 'home_truststrip_logos', 'about_client_logos'] as const;
export type LogoSlot = (typeof LOGO_SLOTS)[number];

/** „L'Oréal“ → „loreal“, „Groupe SEB“ → „groupeseb“ */
export function brandKey(name: string): string {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

const usable = (url?: string) => !!url && !url.startsWith('data:');

export function useBrandLogos(primary?: LogoSlot) {
  const cs = useMediaStore('case_studies_brand_logos').images;
  const cp = useMediaStore('common_clientproof_logos').images;
  const ts = useMediaStore('home_truststrip_logos').images;
  const ab = useMediaStore('about_client_logos').images;
  const bySlot: Record<LogoSlot, typeof cs> = {
    case_studies_brand_logos: cs, common_clientproof_logos: cp, home_truststrip_logos: ts, about_client_logos: ab,
  };
  const order: LogoSlot[] = primary ? [primary, ...LOGO_SLOTS.filter((s) => s !== primary)] : [...LOGO_SLOTS];

  /** Uploaded logo for this brand, else the fallback. */
  const logoFor = (brand: string, fallback = ''): string => {
    const key = brandKey(brand);
    if (!key) return fallback;
    for (const slot of order) {
      const hit = bySlot[slot].find((img) => {
        const cap = brandKey(img.caption || '');
        return usable(img.url) && cap.length >= 3 && (cap === key || cap.startsWith(key) || key.startsWith(cap));
      });
      if (hit) return hit.url;
    }
    return fallback;
  };
  return { logoFor, slotImages: bySlot };
}
