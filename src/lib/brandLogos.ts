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
    // All matches in slot priority; a full wordmark beats a square app icon (e.g. Brandfetch „…/icon.jpeg“),
    // which renders as a solid block on the case-study cards.
    const hits: string[] = [];
    for (const slot of order) {
      for (const img of bySlot[slot]) {
        const cap = brandKey(img.caption || '');
        if (usable(img.url) && cap.length >= 3 && (cap === key || cap.startsWith(key) || key.startsWith(cap))) hits.push(img.url);
      }
    }
    const isIcon = (u: string) => /\/icon\.(jpe?g|png|webp)/i.test(u);
    const best = hits.find((u) => !isIcon(u)) || (fallback && !isIcon(fallback) ? '' : hits[0]);
    if (best) return best;
    return fallback;
  };
  return { logoFor, slotImages: bySlot };
}
