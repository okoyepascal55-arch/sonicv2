/* ─────────────────────────────────────────────
   Über uns — „Wer mit Sonic erfolgreich ist" client tiles (11/2026).
   One shared source for the website grid and the dashboard „Kundenlogos" card.
   Names, categories, order and show/hide: text section „about_clients".
   Logo files: image slot „about_client_logos" (image label = brand name).
───────────────────────────────────────────── */
import { useTextSection } from '@/hooks/useText';
import { useBrandLogos, brandKey } from '@/lib/brandLogos';

export const CLIENT_TEXT_SECTION = 'about_clients';
export const CLIENT_LOGO_SLOT = 'about_client_logos';
export const CLIENT_SLOTS = 12;

/* Last-resort logo links by brand (any dashboard upload with the same label wins). */
export const FALLBACK_LOGOS: Record<string, string> = {
  tcl: 'https://cdn.brandfetch.io/tcl.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  rowenta: 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  krups: 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  tefal: 'https://cdn.brandfetch.io/tefal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  canon: 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  garmin: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  wmf: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  nexaro: 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773621883167',
  vorwerk: 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
  groupeseb: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
};

export interface ClientSlot {
  slot: number;          // 1 … CLIENT_SLOTS
  name: string;
  category: string;
  hidden: boolean;
  logo: string;          // the logo the website shows ('' = name only)
  fallbackLogo: string;
}

/** All slots (also empty ones) in page order, with the logo each would show. */
export function useClientSlots(): ClientSlot[] {
  const ct = useTextSection(CLIENT_TEXT_SECTION);
  const { logoFor } = useBrandLogos(CLIENT_LOGO_SLOT);
  return Array.from({ length: CLIENT_SLOTS }, (_, i) => {
    const n = i + 1;
    const name = (ct[`c${n}-name`] ?? '').trim();
    const fallbackLogo = FALLBACK_LOGOS[brandKey(name)] ?? '';
    return {
      slot: n,
      name,
      category: (ct[`c${n}-category`] ?? '').trim(),
      hidden: (ct[`c${n}-hidden`] ?? '').trim().toLowerCase() === 'ja',
      fallbackLogo,
      logo: name ? logoFor(name, fallbackLogo) : '',
    };
  });
}

/** The tiles the website shows: named and not hidden, in slot order. */
export function useClientTiles(): ClientSlot[] {
  return useClientSlots().filter((c) => c.name && !c.hidden);
}
