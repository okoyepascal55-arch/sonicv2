import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useEffect, useState } from 'react';

type Brand = { name: string; logo: string; scale?: number };

/* Logo normalisation (18.11.2026): every logo gets the same visual weight instead of the same
   height — wide wordmarks get less height, compact marks more (equal-area sizing from the image's
   own aspect ratio). Before hover all logos share one flat grey tone; hover shows the real colours. */
const toneCache = new Map<string, string>();
const FALLBACK_FILTER = 'grayscale(1) contrast(1.1) opacity(0.62)';

/** Resting filter for a logo: greyscale, with its brightness corrected so every logo lands on the
 *  same mid-dark grey (pale logos are darkened to the same near-black, then all are softened equally). Measured on a separate CORS
 *  image so the visible logo is never affected; if measuring is impossible → plain greyscale. */
function useRestFilter(url: string) {
  const [filter, setFilter] = useState<string>(() => toneCache.get(url) ?? FALLBACK_FILTER);
  useEffect(() => {
    if (!url) return;
    const cached = toneCache.get(url);
    if (cached) { setFilter(cached); return; }
    let cancelled = false;
    const probe = new Image();
    probe.crossOrigin = 'anonymous';
    probe.onload = () => {
      let result = FALLBACK_FILTER;
      try {
        const w = 64;
        const h = Math.max(1, Math.round((probe.naturalHeight / Math.max(1, probe.naturalWidth)) * w));
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        if (ctx) {
          ctx.drawImage(probe, 0, 0, w, h);
          const d = ctx.getImageData(0, 0, w, h).data;
          const alphaAt = (x: number, y: number) => d[(y * w + x) * 4 + 3];
          const transparentBg = [alphaAt(0, 0), alphaAt(w - 1, 0), alphaAt(0, h - 1), alphaAt(w - 1, h - 1)].every((v) => v < 20);
          if (transparentBg) {
            let sum = 0, n = 0;
            for (let i = 0; i < d.length; i += 4) {
              if (d[i + 3] < 128) continue;
              sum += (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
              n++;
            }
            if (n > 0) {
              const lum = Math.max(0.04, sum / n);
              const TARGET = 0.1;
              const f = Math.min(1, Math.max(0.12, TARGET / lum));
              result = `grayscale(1) brightness(${f.toFixed(2)}) opacity(0.62)`;
            }
          }
        }
      } catch { result = FALLBACK_FILTER; }
      toneCache.set(url, result);
      if (!cancelled) setFilter(result);
    };
    probe.onerror = () => { toneCache.set(url, FALLBACK_FILTER); };
    // separate URL so the browser doesn't reuse the visible logo's non-CORS cache entry
    probe.src = url + (url.includes('?') ? '&' : '?') + 'tone-probe=1';
    return () => { cancelled = true; };
  }, [url]);
  return filter;
}

function LogoCard({ brand, compact = false }: { brand: Brand; compact?: boolean }) {
  const [ratio, setRatio] = useState<number | null>(null);
  const restFilter = useRestFilter(brand.logo);
  // Equal-area sizing: height = sqrt(area / aspect ratio), clamped to the card.
  const area = compact ? 1100 : 2000;
  const maxH = compact ? 26 : 38;
  const minH = compact ? 10 : 14;
  const maxW = compact ? 92 : 132;
  let h = maxH * 0.7;
  if (ratio) {
    h = Math.sqrt(area / ratio);
    if (h * ratio > maxW) h = maxW / ratio;
    h = Math.min(maxH, Math.max(minH, h));
  }
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 bg-white transition-all duration-300 cursor-pointer border hover:border-primary-500/40 group ${compact ? 'px-3' : 'px-3 md:px-4'}`}
      style={{ borderRadius: 0, borderColor: 'oklch(var(--foreground-950) / 0.1)', height: compact ? '40px' : '56px', minWidth: compact ? '108px' : undefined }}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="trust-logo object-contain transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          style={{ height: `${Math.round(h)}px`, width: 'auto', maxWidth: '100%', ['--rest-filter' as string]: restFilter }}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
          }}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const span = document.createElement('span');
              span.className = 'text-sm font-black text-foreground-400 tracking-wide';
              span.textContent = brand.name.toUpperCase();
              parent.appendChild(span);
            }
          }}
        />
      ) : (
        <span className="text-sm font-black text-foreground-400 tracking-wide group-hover:text-foreground-950 transition-colors duration-300">
          {brand.name.toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default function TrustStrip() {
  const { images: logoImages } = useMediaStore('home_truststrip_logos');
  const tTrustBadge = useText('home_truststrip', 'home-trust-badge', 'Über 15 Kunden vertrauen uns');

  const fallbackBrands = [
    { name: 'Philips', logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', scale: 1.45 },
    { name: 'Rowenta', logo: 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Krups', logo: 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Nexaro', logo: 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773621883167' },
    { name: 'Vorwerk', logo: 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Canon', logo: 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Garmin', logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: "L'Oréal", logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Samsung', logo: 'https://cdn.brandfetch.io/idMbGUGol-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667607407794' },
    { name: 'Bosch', logo: 'https://cdn.brandfetch.io/bosch.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Dyson', logo: 'https://cdn.brandfetch.io/dyson.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Groupe SEB', logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', scale: 1.45 },
  ];

  // The dashboard is the source (22.10.2026): every uploaded logo is shown, in the dashboard order,
  // named by its label. The built-in list is only used while nothing is uploaded.
  const uploaded = logoImages
    .filter((img) => img.url && !img.url.startsWith('data:'))
    .map((img) => ({ name: (img.caption || '').trim() || 'Logo', logo: img.url, scale: /philips|groupe ?seb/i.test(img.caption || '') ? 1.45 : undefined }));
  const allBrands: Brand[] = uploaded.length ? uploaded : fallbackBrands;


  const half = Math.ceil(allBrands.length / 2);
  const row1 = allBrands.slice(0, half);
  const row2 = allBrands.slice(half);

  return (
    <section className="sonic-section-sm sm:px-4 md:px-6 bg-transparent relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <style>{`.trust-logo{filter:var(--rest-filter)}.group:hover .trust-logo{filter:none}`}</style>
      <div className="sonic-container relative z-10">
        <div className="border-t border-foreground-200 pt-5 sm:pt-8 md:pt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tTrustBadge}</span>
          </div>

          {/* Mobile: single-row horizontal scroll strip */}
          <div
            className="flex sm:hidden gap-2 overflow-x-auto pb-1 -mx-4 px-4"
            tabIndex={0}
            role="region"
            aria-label="Kundenlogos – seitlich scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allBrands.map((brand, i) => (
              <LogoCard key={i} brand={brand} compact />
            ))}
          </div>

          {/* sm+: 2-row grid — column count follows the number of uploaded logos (max 8 per row), so
              every row is full: 10 logos → 5 + 5, 12 → 6 + 6. Up to 10 logos keep that 2-row grid from
              tablet width on; larger sets fall back to 3 / 4 columns on small screens. */}
          <div
            className="hidden sm:grid [grid-template-columns:repeat(var(--trust-cols-sm),minmax(0,1fr))] md:[grid-template-columns:repeat(var(--trust-cols-md),minmax(0,1fr))] lg:[grid-template-columns:repeat(var(--trust-cols),minmax(0,1fr))] gap-2 md:gap-3"
            style={{
              ['--trust-cols' as string]: String(Math.min(8, Math.max(4, half))),
              ['--trust-cols-md' as string]: String(half <= 5 ? Math.max(4, half) : 4),
              ['--trust-cols-sm' as string]: String(half <= 5 ? Math.max(3, half) : 3),
            }}
          >
            {[...row1, ...row2].map((brand, i) => (
              <LogoCard key={i} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}