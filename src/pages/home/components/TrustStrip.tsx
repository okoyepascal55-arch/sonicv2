import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

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
  const allBrands: { name: string; logo: string; scale?: number }[] = uploaded.length ? uploaded : fallbackBrands;


  const half = Math.ceil(allBrands.length / 2);
  const row1 = allBrands.slice(0, half);
  const row2 = allBrands.slice(half);

  const LogoCard = ({ brand, compact = false }: { brand: { name: string; logo: string; scale?: number }; compact?: boolean }) => (
    <div
      className={`flex items-center justify-center flex-shrink-0 bg-white transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer border hover:border-primary-500/40 group ${
        compact ? 'px-3 py-2' : 'p-2.5 md:p-5'
      }`}
      style={{ borderRadius: 0, borderColor: 'oklch(var(--foreground-950) / 0.1)', height: compact ? '40px' : '56px', minHeight: compact ? '40px' : '56px', maxHeight: compact ? '40px' : '56px' }}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className={`max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${compact ? 'h-4' : 'h-5 md:h-7'}`}
          loading="lazy"
          decoding="async"
          style={brand.scale ? { height: compact ? '22px' : '34px', maxHeight: compact ? '26px' : '40px' } : undefined}
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

  return (
    <section className="sonic-section-sm sm:px-4 md:px-6 bg-transparent relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

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

          {/* sm+: 2-row grid */}
          <div className="hidden sm:block">
            {/* Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mb-2 md:mb-4">
              {row1.map((brand, i) => (
                <LogoCard key={i} brand={brand} />
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
              {row2.map((brand, i) => (
                <LogoCard key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}