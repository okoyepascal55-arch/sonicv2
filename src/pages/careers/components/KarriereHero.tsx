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
      className="relative flex min-h-[320px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden group"
      style={{ background: 'oklch(0.13 0.005 118)', paddingTop: 'clamp(56px, 14vw, 80px)' }}
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
      <div className="relative z-10 sonic-container w-full pb-10 md:pb-14">
        <div className="max-w-[640px]">
          {/* Eyebrow — lime dash + label, matches Leistungen reference */}
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>Karriere bei Sonic</span>
          </div>

          {/* Headline — leist-h1-hub matches Leistungen reference */}
          <h1 className="leist-h1-hub text-white mb-5 md:mb-6">
            Menschen mit <span className="text-primary-500">Energie</span> gesucht
          </h1>

          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-3">
            Zeige, was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig ist uns deine Einstellung zum Job — nicht nur das, was du schon erreicht hast.
          </p>
          <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[480px] mb-6 md:mb-8">
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

          {/* Wooden scrolling stats ticker — same design language as homepage LiveMetrics */}
        </div>
      </div>
    </section>
  );
}
