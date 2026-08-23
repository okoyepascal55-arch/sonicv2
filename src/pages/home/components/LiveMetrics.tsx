import { useState, useEffect, useRef } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

const COMPANY_DATA = {
  productsSold: '>3,7 Mio.',
  revenueGenerated: '>2 Mrd. €',
  assignmentsCompleted: '>1,35 Mio.',
  promoters: '20,000+',
  coverage: 'DACH',
  implementations: '100K+',
  retailPartners: '500+',
  successRate: '98%',
  conversion: '+340%',
};

export default function LiveMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { images: woodBgImages } = useMediaStore('home_livemetrics_wood_bg');
  const woodBgUrl = woodBgImages[0]?.url || 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20with%20clearly%20visible%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20deep%20grain%20lines%20carved%20oak%20walnut%20surface%20close%20up%20macro%20photography%20warm%20brown%20color%20natural%20material%20visible%20grain%20depth%20dark%20rich%20finish%20consistent%20with%20briefcase%20star%20wooden%20icons&width=1920&height=100&seq=wood-ticker-chestnut-dualcta-match-v1&orientation=landscape';

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const desktopMetrics = [
    { icon: 'ri-shopping-bag-line', value: COMPANY_DATA.productsSold, label: 'Produkte' },
    { icon: 'ri-money-euro-circle-line', value: COMPANY_DATA.revenueGenerated, label: 'Umsatz' },
    { icon: 'ri-map-pin-line', value: COMPANY_DATA.assignmentsCompleted, label: 'Einsätze' },
    { icon: 'ri-user-star-line', value: COMPANY_DATA.promoters, label: 'Promoter' },
    { icon: 'ri-store-2-line', value: COMPANY_DATA.implementations, label: 'POS' },
    { icon: 'ri-line-chart-line', value: COMPANY_DATA.conversion, label: 'Conversion' },
  ];

  const mobileMetrics = desktopMetrics.slice(0, 4);

  const TickerItems = ({ items, prefix }: { items: typeof desktopMetrics; prefix: string }) => (
    <>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse-slow" />
        <span className="text-[10px] sm:text-xs font-sans tabular-nums text-white uppercase tracking-wider font-black drop-shadow-md whitespace-nowrap">
          LIVE
        </span>
      </div>
      {items.map((metric, idx) => (
        <div key={`${prefix}-m-${idx}`} className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="text-primary-500 drop-shadow-md text-xs">•</span>
          <i className={`${metric.icon} text-primary-500 drop-shadow-md text-xs sm:text-sm`} />
          <span className="text-xs sm:text-sm font-sans tabular-nums font-black text-white drop-shadow-md whitespace-nowrap">
            {metric.value}
          </span>
          <span className="text-[10px] sm:text-xs text-white/90 drop-shadow-md font-bold whitespace-nowrap">
            {metric.label}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-primary-500 drop-shadow-md text-xs">•</span>
        <span className="text-[10px] sm:text-xs text-white/80 drop-shadow-md font-bold whitespace-nowrap">SRT</span>
        <span className="text-primary-500 drop-shadow-md text-xs">•</span>
      </div>
    </>
  );

  return (
    <section className="sonic-section-sm sm:md:relative overflow-hidden border-y border-foreground-200/40">
      {/* Chestnut brown wood texture */}
      <div className="absolute inset-0" aria-hidden="true">
        <img src={woodBgUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground-950/50" />
      </div>

      <div className="relative z-10 overflow-hidden">
        {/* Mobile: leaner, fewer items */}
        <div
          className={`flex items-center gap-5 sm:gap-6 md:gap-8 animate-scroll-optimized whitespace-nowrap py-1.5 sm:py-2 transition-opacity duration-700 md:hidden ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={prefersReducedMotion ? { animation: 'none' } : undefined}
          aria-hidden="true"
        >
          <TickerItems items={mobileMetrics} prefix="m" />
          <TickerItems items={mobileMetrics} prefix="m-dup" />
        </div>

        {/* Desktop: full strip */}
        <div
          className={`hidden md:flex items-center gap-8 animate-scroll-optimized whitespace-nowrap py-2 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={prefersReducedMotion ? { animation: 'none' } : undefined}
          aria-hidden="true"
        >
          <TickerItems items={desktopMetrics} prefix="d" />
          <TickerItems items={desktopMetrics} prefix="d-dup" />
        </div>

        {/* Screen-reader accessible static list */}
        <div className="sr-only" role="list" aria-label="Sonic Group Unternehmenskennzahlen">
          {desktopMetrics.map((metric, idx) => (
            <span key={idx} role="listitem">
              {metric.label}: {metric.value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}