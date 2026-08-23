import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

export default function CaseStudiesHero() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const { images: heroBg } = useMediaStore('casestudies_hero_background');

  const stats = [
    { value: '€2.19B', label: 'Total Sales Generated' },
    { value: '150+', label: 'Successful Campaigns' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950" style={{ paddingTop: '80px' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {(heroBg[0] && heroBg[0].url) ? (
          <img
            src={heroBg[0].url}
            alt="Case Studies Hero"
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-full max-w-[640px]">
        <div className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6">
          <span className="w-1.5 h-1.5 bg-foreground-950" />
          Fallbeispiele
        </div>

        <h1 className="sonic-h1 text-white mb-5 md:mb-6">
          BEWIESENE ERGEBNISSE.<br />
          <span className="text-primary-500">ECHTER IMPACT.</span>
        </h1>

        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-6 md:mb-8">
          Wie wir führende Marken zu außergewöhnlichen Ergebnissen im DACH-Raum geführt haben.
        </p>
        </div>

        <div className="flex flex-wrap gap-6 mt-6 md:mt-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative bg-white/[0.04] backdrop-blur-[2px] px-8 py-4 rounded-sm border border-white/[0.06] cursor-pointer overflow-visible"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* 2 Wavy SVG Border Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-none">
                <defs>
                  <linearGradient id={`hero-stat-outer-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity={hoveredStat === index ? 1 : 0.3} />
                    <stop offset="50%" stopColor="#a8b300" stopOpacity={hoveredStat === index ? 1 : 0.2} />
                    <stop offset="100%" stopColor="#C8D400" stopOpacity={hoveredStat === index ? 1 : 0.3} />
                  </linearGradient>
                  <linearGradient id={`hero-stat-inner-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C8D400" stopOpacity={hoveredStat === index ? 0.7 : 0.12} />
                    <stop offset="50%" stopColor="#a8b300" stopOpacity={hoveredStat === index ? 0.7 : 0.08} />
                    <stop offset="100%" stopColor="#C8D400" stopOpacity={hoveredStat === index ? 0.7 : 0.12} />
                  </linearGradient>
                </defs>
                
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke={`url(#hero-stat-outer-${index})`}
                  strokeWidth={hoveredStat === index ? 2 : 0.8}
                  className="transition-all ease-out"
                  style={{
                    filter: hoveredStat === index ? 'drop-shadow(0 0 6px rgba(200, 212, 0, 0.5))' : 'none',
                    transitionDuration: '1.2s',
                  }}
                >
                  {hoveredStat === index && (
                    <animate attributeName="stroke-dashoffset" values="0;-60" dur="4s" repeatCount="indefinite" />
                  )}
                </rect>
                
                <rect
                  x="5"
                  y="5"
                  width="calc(100% - 10px)"
                  height="calc(100% - 10px)"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke={`url(#hero-stat-inner-${index})`}
                  strokeWidth={hoveredStat === index ? 1.4 : 0.5}
                  className="transition-all ease-out"
                  style={{
                    filter: hoveredStat === index ? 'drop-shadow(0 0 4px rgba(200, 212, 0, 0.4))' : 'none',
                    transitionDuration: '1.2s',
                  }}
                >
                  {hoveredStat === index && (
                    <animate attributeName="stroke-dashoffset" values="0;60" dur="5s" repeatCount="indefinite" />
                  )}
                </rect>
              </svg>

              <div className="relative z-10">
                <div className="text-3xl font-black text-primary-500 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
