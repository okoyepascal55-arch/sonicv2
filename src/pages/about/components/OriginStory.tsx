import { useEffect, useRef, useState } from 'react';
import LimeBadge from '@/components/base/LimeBadge';
import type { MediaItem } from '@/lib/mediaStore';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const tickerStats = [
  { icon: 'ri-briefcase-line', value: '>500', label: 'Projekte' },
  { icon: 'ri-user-line', value: '>1,35 Mio.', label: 'Einsätze' },
  { icon: 'ri-store-2-line', value: '>100.000', label: 'POS-Umsetzungen' },
  { icon: 'ri-calendar-check-line', value: '2007', label: 'Gegründet' },
  { icon: 'ri-team-line', value: '>2.000', label: 'Talente im Pool' },
  { icon: 'ri-global-line', value: 'DACH', label: 'Marktabdeckung' },
  { icon: 'ri-bar-chart-2-line', value: '>2 Mrd. €', label: 'Umsatz generiert' },
  { icon: 'ri-medal-line', value: '17+', label: 'Jahre Erfahrung' },
];

export default function OriginStory({ focusImages }: { focusImages?: MediaItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { images: woodTicker } = useMediaStore('about_origin_story_wood_bg');

  const tBadge = useText('about_origin_story', 'about-origin-badge', 'Über uns');
  const tHeading = useText('about_origin_story', 'about-origin-heading', 'MARKEN IM HERZEN. ERFOLG IM FOKUS.');
  const tP1 = useText('about_origin_story', 'about-origin-p1', 'Wir sind eine unabhängige Marketing- und Sales-Agentur.');
  const tP2 = useText('about_origin_story', 'about-origin-p2', 'Seit 2007 leben wir Marken und machen sie erfolgreich.');
  const tP3 = useText('about_origin_story', 'about-origin-p3', 'Unsere Strategie: Ärmel hoch und anpacken!');
  const tCta = useText('about_origin_story', 'about-origin-cta', 'Unsere Lösungen entdecken');
  const tickerBg = woodTicker[0]?.url || 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20with%20clearly%20visible%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20deep%20grain%20lines%20carved%20oak%20walnut%20surface%20close%20up%20macro%20photography%20warm%20brown%20color%20natural%20material%20visible%20grain%20depth%20dark%20rich%20finish%20consistent%20with%20briefcase%20star%20wooden%20icons&width=1920&height=100&seq=about-origin-wood-ticker-v1&orientation=landscape';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white">

      {/* ── MAIN CONTENT ── */}
      <div className="py-8 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Section label */}
          <div
            className={`flex items-center justify-center mb-6 md:mb-10 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <LimeBadge text={tBadge} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
            {/* Left: Image with stat overlay */}
            <div
              className={`relative transition-all duration-900 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[4/5]">
                {(focusImages && focusImages[0] && focusImages[0].url) ? (
                  <img
                    src={focusImages[0].url}
                    alt="Sonic Sales Promotion Team"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute top-3 left-3 md:top-5 md:left-5 bg-primary-500 text-foreground-950 px-3 md:px-4 py-1.5 md:py-2 text-[11px] font-black uppercase tracking-widest">
                  Seit 2007
                </div>
              </div>

              {/* Floating stat card — rounded, clean */}
              <div className="mt-4 md:mt-0 md:absolute md:-bottom-6 md:-right-4 lg:-right-6 bg-white border border-background-200 p-4 md:p-5 md:w-52" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div className="text-3xl md:text-4xl font-black text-foreground-950 leading-none mb-1 md:mb-2">17+</div>
                <div className="text-xs font-bold text-foreground-400 uppercase tracking-wider">
                  Jahre Markenerfolg im DACH-Raum
                </div>
                <div className="mt-3 h-1 w-10 bg-primary-500" />
              </div>
            </div>

            {/* Right: Text content */}
            <div
              className={`pt-0 md:pt-2 lg:pt-8 transition-all duration-900 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              <h2 className="text-xl md:text-3xl font-black text-foreground-950 mb-4 md:mb-6 leading-tight tracking-tight">
                {tHeading.split('.')[0] || tHeading}<br />
                <span className="text-primary-500">{tHeading.includes('.') ? tHeading.split('.').slice(1).join('.') + '.' : ''}</span>
              </h2>

              <div className="space-y-3 md:space-y-4 text-sm md:text-[15px] leading-relaxed text-foreground-600 mb-5 md:mb-8">
                <p>{tP1}</p>
                <p>{tP2}</p>
                <p>{tP3}</p>
              </div>

              <a
                href="/losungen"
                className="inline-flex items-center gap-3 px-5 md:px-7 py-2.5 md:py-3 bg-foreground-950 text-white font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap text-xs md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                {tCta}
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── WOOD TICKER STRIP ── */}
      <div className="relative overflow-hidden border-y border-primary-500/15 py-3" aria-hidden="true">
        <div className="absolute inset-0">
          <img
            src={tickerBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground-950/45" />
        </div>
        <div className="relative z-10 overflow-hidden">
          <div className="flex items-center gap-6 animate-scroll-optimized whitespace-nowrap py-0.5">
            <div className="flex items-center gap-2 px-4">
              <div className="w-1.5 h-1.5 bg-white/70 animate-pulse-slow" />
              <span className="text-xs font-sans tabular-nums text-white uppercase tracking-wider font-black drop-shadow-md">SONIC</span>
            </div>
            {tickerStats.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-white/30 drop-shadow-md text-xs">·</span>
                <i className={`${s.icon} text-white/80 drop-shadow-md text-xs`} />
                <span className="text-sm font-sans tabular-nums font-black text-white drop-shadow-md">{s.value}</span>
                <span className="text-xs text-white/80 drop-shadow-md font-bold">{s.label}</span>
              </div>
            ))}
            <span className="text-white/30 drop-shadow-md text-xs">·</span>
            <span className="text-xs text-white/70 drop-shadow-md font-bold">Seit 2007 für deine Marke</span>
            <span className="text-white/30 drop-shadow-md text-xs">·</span>
            <div className="flex items-center gap-2 px-4">
              <div className="w-1.5 h-1.5 bg-white/70 animate-pulse-slow" />
              <span className="text-xs font-sans tabular-nums text-white uppercase tracking-wider font-black drop-shadow-md">SONIC</span>
            </div>
            {tickerStats.map((s, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-2">
                <span className="text-white/30 drop-shadow-md text-xs">·</span>
                <i className={`${s.icon} text-white/80 drop-shadow-md text-xs`} />
                <span className="text-sm font-sans tabular-nums font-black text-white drop-shadow-md">{s.value}</span>
                <span className="text-xs text-white/80 drop-shadow-md font-bold">{s.label}</span>
              </div>
            ))}
            <span className="text-white/30 drop-shadow-md text-xs">·</span>
            <span className="text-xs text-white/70 drop-shadow-md font-bold">Seit 2007 für deine Marke</span>
            <span className="text-white/30 drop-shadow-md text-xs">·</span>
          </div>
        </div>
      </div>

      {/* ── Thin transition label into Referenzen ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-12 pb-5 md:pb-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-foreground-200/60" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-foreground-300 whitespace-nowrap">Über die Sonic Group — Referenzen</span>
          <div className="h-px flex-1 bg-foreground-200/60" />
        </div>
      </div>

    </section>
  );
}