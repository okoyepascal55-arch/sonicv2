import { useMediaStore } from '@/lib/mediaStore';

export default function KarriereHero() {
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

  return (
    <section
      className="relative flex min-h-[380px] sm:min-h-[480px] md:min-h-[640px] items-center overflow-hidden"
      id="stellen"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Decorative wave SVG background */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 140"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70%] md:w-[50%] max-w-full max-w-[700px]"
        >
          <path
            d="M0 70 Q 25 20 50 70 T 100 70 T 150 70 T 200 70 T 250 70 T 300 70"
            fill="none"
            stroke="oklch(var(--primary-500))"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M0 90 Q 25 60 50 90 T 100 90 T 150 90 T 200 90 T 250 90 T 300 90"
            fill="none"
            stroke="#3A3A3C"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M0 50 Q 25 30 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50"
            fill="none"
            stroke="#3A3A3C"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,11,12,0.25) 0%, rgba(11,11,12,0.50) 50%, rgba(11,11,12,0.90) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-full max-w-[1200px] px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-full max-w-[640px]">
          {/* Eyebrow — cleaner, rounded */}
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
            <span className="w-1.5 h-1.5 bg-primary-500" />
            <span className="text-primary-500">Karriere bei Sonic</span>
          </div>

          {/* Headline */}
          <h1 className="sonic-h1 text-white mb-5 md:mb-6">
            Menschen mit{' '}
            <span className="text-primary-500">Energie</span>{' '}
            gesucht
          </h1>

          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-3">
            Zeige, was du kannst, und freue dich auf gemeinsame Erfolge. Wichtig
            ist uns deine Einstellung zum Job — nicht nur das, was du schon
            erreicht hast.
          </p>
          <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[480px] mb-6 md:mb-8">
            Aktuelle Stellen am Sonic-Campus in Krefeld und deutschlandweite
            Einsätze für unsere Kundenprojekte.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
            <button
              onClick={scrollToJobs}
              className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 bg-primary-500 text-foreground-950 font-bold text-xs md:text-sm hover:bg-white transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Alle Stellen ansehen
            </button>
            <a
              href="https://calendly.com/sonic-group/tanja-15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 border border-white/40 text-white font-bold text-xs md:text-sm hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Initiativbewerbung
            </a>
          </div>

          {/* Trust stats row — cleaner spacing */}
          <div className="flex flex-wrap gap-6 md:gap-9 border-t border-white/15 pt-5 md:pt-6">
            {[
              { icon: 'ri-star-fill', value: '4.8/5', label: 'Kununu Score' },
              { icon: 'ri-time-line', value: '\u00D8 5,15 J.', label: 'Betriebszugeh\u00F6rigkeit' },
              { icon: 'ri-user-community-line', value: '20.000+', label: 'Talente im Netzwerk' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <i className={`${stat.icon} text-sm text-primary-500`} />
                </div>
                <div>
                  <div className="text-sm md:text-base font-black text-white leading-none tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/50 font-bold mt-0.5 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}