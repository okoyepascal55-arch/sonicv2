import { useState, useEffect, useRef } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

// Static company data - no random fluctuations
const COMPANY_DATA = {
  productsSold: '>3,7 Mio.',
  revenueGenerated: '>2 Mrd. €',
  talentPool: '>2.000',
  assignmentsCompleted: '>1,35 Mio.',
  promoters: '20,000+',
  avgTenure: '5.15 yrs',
  coverage: 'DACH',
  implementations: '100K+',
  retailPartners: '500+',
  successRate: '98%',
  liveSessions: '5,000+',
  conversion: '+340%',
  reach: '2M+',
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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics = [
    { icon: 'ri-shopping-bag-line', value: COMPANY_DATA.productsSold, label: 'Produkte verkauft' },
    { icon: 'ri-money-euro-circle-line', value: COMPANY_DATA.revenueGenerated, label: 'Umsatz generiert' },
    { icon: 'ri-team-line', value: COMPANY_DATA.talentPool, label: 'Talente im Pool' },
    { icon: 'ri-map-pin-line', value: COMPANY_DATA.assignmentsCompleted, label: 'Einsätze durchgeführt' },
    { icon: 'ri-user-star-line', value: COMPANY_DATA.promoters, label: 'Trained Promoters' },
    { icon: 'ri-store-2-line', value: COMPANY_DATA.implementations, label: 'POS Implementations' },
    { icon: 'ri-video-line', value: COMPANY_DATA.liveSessions, label: 'Live Sessions' },
    { icon: 'ri-line-chart-line', value: COMPANY_DATA.conversion, label: 'Conversion Boost' },
  ];

  return (
    <section ref={sectionRef} className="py-4 px-0 relative overflow-hidden border-y-2 border-[#8B5A2B]/30">
      {/* Chestnut brown wood texture - exact match to DualCTA wooden icons */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={woodBgUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#3B1F0A]/40"></div>
      </div>

      <div className="relative z-10 overflow-hidden">
        {/* Continuously scrolling metrics bar with GPU acceleration */}
        <div
          className={`flex items-center gap-8 animate-scroll-optimized whitespace-nowrap py-2 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={prefersReducedMotion ? { animation: 'none' } : undefined}
          aria-hidden="true"
        >
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-4">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow"></div>
            <span className="text-xs font-sans tabular-nums text-white uppercase tracking-wider font-black drop-shadow-md">
              LIVE
            </span>
          </div>

          {metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-primary-500 drop-shadow-md">•</span>
              <i className={`${metric.icon} text-primary-500 drop-shadow-md`}></i>
              <span className="text-sm font-sans tabular-nums font-black text-white drop-shadow-md">{metric.value}</span>
              <span className="text-xs text-white/90 drop-shadow-md font-bold">{metric.label}</span>
            </div>
          ))}

          <span className="text-primary-500 drop-shadow-md">•</span>
          <span className="text-xs text-white/80 drop-shadow-md font-bold">Powered by SRT</span>
          <span className="text-primary-500 drop-shadow-md">•</span>

          {/* Duplicate for seamless scroll */}
          <div className="flex items-center gap-2 px-4">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow"></div>
            <span className="text-xs font-sans tabular-nums text-white uppercase tracking-wider font-black drop-shadow-md">
              LIVE
            </span>
          </div>

          {metrics.map((metric, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-2">
              <span className="text-primary-500 drop-shadow-md">•</span>
              <i className={`${metric.icon} text-primary-500 drop-shadow-md`}></i>
              <span className="text-sm font-sans tabular-nums font-black text-white drop-shadow-md">{metric.value}</span>
              <span className="text-xs text-white/90 drop-shadow-md font-bold">{metric.label}</span>
            </div>
          ))}

          <span className="text-primary-500 drop-shadow-md">•</span>
          <span className="text-xs text-white/80 drop-shadow-md font-bold">Powered by SRT</span>
          <span className="text-primary-500 drop-shadow-md">•</span>
        </div>

        {/* Screen-reader accessible static list — same content, no animation */}
        <div className="sr-only" role="list" aria-label="Sonic Group Unternehmenskennzahlen">
          {metrics.map((metric, idx) => (
            <span key={idx} role="listitem">
              {metric.label}: {metric.value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}