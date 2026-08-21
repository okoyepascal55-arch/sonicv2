import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function TrustStrip() {
  const { images: logoImages } = useMediaStore('home_truststrip_logos');
  const tTrustBadge = useText('home_truststrip', 'home-trust-badge', 'Industry Leaders');

  // Exact 12 brands from ValuesVisual reference — split into 2 rows of 6
  const allBrands = [
    { name: 'Philips', logo: (logoImages[0] && logoImages[0].url) || 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887', scale: 1.45 },
    { name: 'Rowenta', logo: (logoImages[1] && logoImages[1].url) || 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Krups', logo: (logoImages[2] && logoImages[2].url) || 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Nexaro', logo: (logoImages[3] && logoImages[3].url) || 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773621883167' },
    { name: 'Vorwerk', logo: (logoImages[4] && logoImages[4].url) || 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Canon', logo: (logoImages[5] && logoImages[5].url) || 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Garmin', logo: (logoImages[6] && logoImages[6].url) || 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: "L'Oréal", logo: (logoImages[7] && logoImages[7].url) || 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Samsung', logo: (logoImages[8] && logoImages[8].url) || 'https://cdn.brandfetch.io/idMbGUGol-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667607407794' },
    { name: 'Bosch', logo: (logoImages[9] && logoImages[9].url) || 'https://cdn.brandfetch.io/bosch.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Dyson', logo: (logoImages[10] && logoImages[10].url) || 'https://cdn.brandfetch.io/dyson.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
    { name: 'Groupe SEB', logo: (logoImages[11] && logoImages[11].url) || 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', scale: 1.45 },
  ];

  const row1 = allBrands.slice(0, 6);
  const row2 = allBrands.slice(6, 12);

  const LogoCard = ({ brand }: { brand: { name: string; logo: string; scale?: number } }) => (
    <div
      className="flex items-center justify-center p-2.5 md:p-5 bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer border border-foreground-100/60 hover:border-[#C8D400]/30 group"
      style={{ borderRadius: 0, height: '56px', minHeight: '56px', maxHeight: '56px' }}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-full h-5 md:h-7 object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          style={brand.scale ? { height: '34px', maxHeight: '40px' } : undefined}
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
        <span className="text-sm font-black text-foreground-400 tracking-wide group-hover:text-[#1a1a1a] transition-colors duration-300">
          {brand.name.toUpperCase()}
        </span>
      )}
    </div>
  );

  return (
    <section className="py-8 md:py-14 px-4 md:px-6 bg-transparent relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="border-t border-foreground-200 pt-8 md:pt-12">
          <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-[#C8D400]/30 px-4 py-1.5 mb-3 md:mb-4">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">{tTrustBadge}</span>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-4 mb-2 md:mb-4">
            {row1.map((brand, i) => (
              <LogoCard key={i} brand={brand} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-4">
            {row2.map((brand, i) => (
              <LogoCard key={i} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}