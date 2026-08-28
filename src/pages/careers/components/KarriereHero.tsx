import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

export default function KarriereHero() {
  const [hovered, setHovered] = useState(false);
  const { images: heroBgImages } = useMediaStore('careers_hero_images');
  const { images: karriereImages } = useMediaStore('/images/Karriere');

  const heroImage =
    heroBgImages[0]?.url ||
    karriereImages[0]?.url ||
    '/images/Karriere/GIGATV_029.webp';

  const scrollToJobs = () => {
    const el = document.getElementById('stellenangebote');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPfade = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('pfade');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative flex min-h-[320px] sm:min-h-[400px] md:min-h-[560px] items-end overflow-hidden group"
      style={{ background: 'oklch(0.13 0.005 118)' }}
      id="stellen"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
          fetchPriority="high"
          decoding="async"
        />
      </div>


      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0.32) 0%, rgba(11,11,12,0.5) 50%, rgba(11,11,12,0.95) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 sonic-container w-full pb-14 md:pb-[72px] pt-16">
        <div className="max-w-[820px]">
          {/* Chapter eyebrow — 00 */}
          <div className="flex items-center gap-3.5 mb-6 md:mb-7">
            <span className="text-[11px] font-black tracking-[0.24em] text-white/40">00</span>
            <span className="w-7 h-0.5 bg-primary-500" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Karriere bei Sonic</span>
          </div>

          {/* Headline */}
          <h1
            className="font-black uppercase text-white mb-6 md:mb-7"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5.75rem)', lineHeight: 0.96, letterSpacing: '-0.038em' }}
          >
            Menschen mit <span className="text-primary-500">Energie</span> gesucht
          </h1>

          <p className="text-[15px] md:text-[17px] leading-relaxed text-white/80 max-w-[540px] mb-3">
            Zeige, was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig ist uns deine Einstellung zum Job — nicht nur das, was du schon erreicht hast.
          </p>
          <p className="text-[13px] md:text-[15px] leading-relaxed text-white/50 max-w-[540px] mb-9 md:mb-11">
            Aktuelle Stellen am Sonic-Campus in Krefeld und deutschlandweite Einsätze für unsere Kundenprojekte.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
            <button
              onClick={scrollToJobs}
              className="inline-flex items-center gap-2.5 px-6 md:px-8 py-4 md:py-[18px] bg-primary-500 text-foreground-950 text-[12px] font-black uppercase tracking-[0.14em] hover:bg-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Alle Stellen ansehen
              <i className="ri-arrow-right-line text-[15px]" />
            </button>
            <a
              href="#pfade"
              onClick={scrollToPfade}
              className="inline-flex items-center gap-2.5 px-6 md:px-8 py-4 md:py-[18px] text-white text-[12px] font-black uppercase tracking-[0.14em] whitespace-nowrap cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.26)' }}
            >
              Initiativbewerbung
            </a>
          </div>

          {/* Trust stat bar — glass, 3-col with dividers */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px) saturate(1.3)', WebkitBackdropFilter: 'blur(20px) saturate(1.3)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            {[
              { icon: 'ri-star-fill', value: '4.8/5', label: 'Kununu Score' },
              { icon: 'ri-time-line', value: 'Ø 5,15 J.', label: 'Betriebszugehörigkeit' },
              { icon: 'ri-user-community-line', value: '2.000+', label: 'Talente im Netzwerk' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 px-6 md:px-[30px] py-5 md:py-[26px]"
                style={i < 2 ? { borderRight: '1px solid rgba(255,255,255,0.12)' } : undefined}
              >
                <i className={`${stat.icon} text-[18px] text-primary-500 flex-shrink-0`} />
                <div>
                  <p className="text-2xl md:text-[32px] font-black leading-none tracking-[-0.035em] text-white tabular-nums mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
