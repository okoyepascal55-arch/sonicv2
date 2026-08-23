import { useEffect, useRef, useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';

const clients = [
  { name: 'Philips', category: 'Unterhaltungselektronik', logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887' },
  { name: 'Rowenta', category: 'Haushaltsgeräte', logo: 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Krups', category: 'Küchengeräte', logo: 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Vorwerk', category: 'Haushaltsgeräte', logo: 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Canon', category: 'Bildgebung & Druck', logo: 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Garmin', category: 'Wearables & Navigation', logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: "L'Oréal", category: 'Beauty & Kosmetik', logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Nexaro', category: 'Robotik & Reinigungstechnologie', logo: 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1773621883167' },
  { name: 'Bosch', category: 'Haushaltsgeräte', logo: 'https://cdn.brandfetch.io/bosch.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Dyson', category: 'Premium Haushaltsgeräte', logo: 'https://cdn.brandfetch.io/dyson.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'Groupe SEB', category: 'Mehrmarken', logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
  { name: 'WMF', category: 'Premium Küche', logo: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' },
];

export default function ValuesVisual() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLogoError = (i: number) => {
    setLogoErrors((prev) => new Set(prev).add(i));
  };

  return (
    <section ref={sectionRef} id="referenzen" className="bg-background-100 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div
          className={`mb-10 md:mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h2 className="sonic-h2 text-foreground-950">
              Wer mit Sonic erfolgreich ist
            </h2>
            <span className="sonic-label text-foreground-300">12 Markenpartner</span>
          </div>
          <p className="text-sm text-foreground-500 max-w-lg leading-relaxed">
            Seit 2007 vertrauen führende Marken auf unsere Expertise am POS, in Studios und auf Events.
          </p>
        </div>

        {/* Client grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:grid-cols-4 gap-px bg-black/8 border border-black/8 overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '120ms' }}
        >
          {clients.map((client, i) => {
            const hasLogoError = logoErrors.has(i);
            return (
              <div
                key={i}
                className="bg-background-100 p-5 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-[#FAFDF5] transition-colors duration-200 min-h-[120px]"
                role="button"
                tabIndex={0}
                aria-label={`${client.name} — ${client.category}`}
              >
                {!hasLogoError && client.logo ? (
                  <div className="mb-2.5 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 opacity-55 group-hover:opacity-100 group-hover:scale-105">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-7 w-auto max-w-[120px] object-contain"
                      loading="lazy"
                      onError={() => handleLogoError(i)}
                    />
                  </div>
                ) : (
                  <div className="mb-2.5 text-sm font-black text-black/55 group-hover:text-foreground-950 transition-colors duration-300">{client.name}</div>
                )}
                <div className="text-[9px] md:text-[10px] font-bold text-black/25 uppercase tracking-wider group-hover:text-primary-500/60 transition-colors duration-200 mt-auto">{client.category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}