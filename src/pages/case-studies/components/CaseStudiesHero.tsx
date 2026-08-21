import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';

export default function CaseStudiesHero() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const { images: heroBg } = useMediaStore('casestudies_hero_background');

  const stats = [
    { value: '€2.19B', label: 'Total Sales Generated' },
    { value: '150+', label: 'Successful Campaigns' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="relative min-h-[480px] md:min-h-[520px] flex items-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        {(heroBg[0] && heroBg[0].url) ? (
          <img
            src={heroBg[0].url}
            alt="Case Studies Hero"
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center text-white">
        <SectionBadge text="Fallbeispiele" variant="light" className="mb-6" />

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight">
          BEWIESENE ERGEBNISSE.<br />
          <span className="text-primary-500">ECHTER IMPACT.</span>
        </h1>
        
        <p className="text-xl text-white/75 max-w-3xl mx-auto mb-12 font-semibold">
          Wie wir führende Marken zu außergewöhnlichen Ergebnissen im DACH-Raum geführt haben.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
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
                <div className="text-3xl font-black text-[#C8D400] mb-1">{stat.value}</div>
                <div className="text-sm font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
