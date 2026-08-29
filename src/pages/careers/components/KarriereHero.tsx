import { useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

export default function KarriereHero() {
  const [hovered, setHovered] = useState(false);
  const { images: heroBgImages } = useMediaStore('careers_hero_images');
  const { images: karriereImages } = useMediaStore('/images/Karriere');
  const { images: woodBgImages } = useMediaStore('home_livemetrics_wood_bg');
  const woodBgUrl = woodBgImages[0]?.url
    ? resolveImageUrl(woodBgImages[0].url)
    : 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20oak%20walnut%20surface%20close%20up%20macro%20photography%20dark%20rich%20finish&width=1920&height=100&seq=wood-ticker-karriere&orientation=landscape';

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
      <div className="relative z-10 sonic-container w-full pb-14 md:pb-16">
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
      {/* Wooden stats ticker — full-width, outside the padded container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute inset-0" aria-hidden="true">
          <img src={woodBgUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-foreground-950/60" />
        </div>
        <div className="relative z-10 overflow-hidden py-3 md:py-3.5">
          <div
            className="flex items-center gap-6 md:gap-10 animate-scroll-optimized whitespace-nowrap"
            aria-hidden="true"
          >
            {[
              { icon: 'ri-star-fill', value: '4.8/5', label: 'Kununu Score' },
              { icon: 'ri-time-line', value: 'Ø 5,15 J.', label: 'Betriebszugehörigkeit' },
              { icon: 'ri-user-community-line', value: '2.000+', label: 'Talente im Netzwerk' },
              { icon: 'ri-award-line', value: '4.8/5', label: 'Kununu Score' },
              { icon: 'ri-time-line', value: 'Ø 5,15 J.', label: 'Betriebszugehörigkeit' },
              { icon: 'ri-user-community-line', value: '2.000+', label: 'Talente im Netzwerk' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5 flex-shrink-0">
                {i === 0 || i === 3 ? <span className="text-primary-500 text-[10px]">●</span> : <span className="text-primary-500/30 text-[10px]">·</span>}
                <i className={`${stat.icon} text-primary-500 text-sm drop-shadow`} />
                <span className="text-sm font-black text-white tabular-nums drop-shadow">{stat.value}</span>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
