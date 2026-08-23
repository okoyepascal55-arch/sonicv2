import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';

export default function ImpactMetrics() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const metrics = [
    {
      value: '€2.19B',
      label: 'Total Sales Generated',
      description: 'Cumulative revenue driven for our brand partners across the DACH region',
      icon: 'ri-money-euro-circle-line',
    },
    {
      value: '150+',
      label: 'Successful Campaigns',
      description: 'Executed across DACH with fully measurable, documented results',
      icon: 'ri-rocket-line',
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      description: 'Average satisfaction score from brand partners after campaign completion',
      icon: 'ri-star-line',
    },
    {
      value: '+147%',
      label: 'Average Sales Lift',
      description: 'Mean increase in sales performance across all managed campaigns',
      icon: 'ri-line-chart-line',
    },
    {
      value: '20,000+',
      label: 'Trained Promoters',
      description: 'Expert talent network ready to represent your brand at any scale',
      icon: 'ri-team-line',
    },
    {
      value: '5.15 yrs',
      label: 'Average Tenure',
      description: 'Team stability ensuring consistent quality and brand knowledge',
      icon: 'ri-time-line',
    },
  ];

  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-foreground-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/8 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/8 blur-3xl pointer-events-none"></div>

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge text="Our Impact" variant="light" className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">THE NUMBERS SPEAK</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Quantifiable impact across every dimension of retail excellence
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative p-7 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Wooden texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* SVG border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-none">
                <defs>
                  <linearGradient id={`metric-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredCard === index ? 0.9 : 0.2} />
                    <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredCard === index ? 0.5 : 0.08} />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="0" ry="0" fill="none"
                  stroke={`url(#metric-grad-${index})`}
                  strokeWidth={hoveredCard === index ? 2 : 1}
                  style={{ filter: hoveredCard === index ? 'drop-shadow(0 0 8px rgba(200,212,0,0.5))' : 'none', transition: 'all 0.5s ease' }}
                >
                  <animate attributeName="stroke-dashoffset" values="0;-48" dur="4s" repeatCount="indefinite" />
                </rect>
              </svg>

              {/* Hover glow bg */}
              <div className={`absolute inset-0 bg-primary-500/5 transition-opacity duration-500 pointer-events-none ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500/15 mb-5 group-hover:bg-primary-500/25 transition-colors duration-300" style={{ borderRadius: 0 }}>
                  <i className={`${metric.icon} text-2xl text-primary-500`}></i>
                </div>
                <div className="text-4xl font-black text-primary-500 mb-2 leading-none">{metric.value}</div>
                <div className="text-sm font-black text-white uppercase tracking-wide mb-2">{metric.label}</div>
                <p className="text-xs text-white/60 leading-relaxed">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
