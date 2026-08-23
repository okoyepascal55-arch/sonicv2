import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

const principleData = [
  {
    number: '01',
    fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20human%20figure%20people%20team%20group%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20human%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-human-dna-01&orientation=squarish',
    title: 'Der Mensch',
    description: 'Menschen, die Marken prägen. Promotions leben von den Menschen, die sie durchführen.',
  },
  {
    number: '02',
    fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightning%20bolt%20energy%20power%20drive%20motivation%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20energy%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-energy-dna-02&orientation=squarish',
    title: 'Der Antrieb',
    description: 'Wettbewerbsfähige Bezahlung und Entwicklungsperspektiven motivieren unser Team.',
  },
  {
    number: '03',
    fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20analytics%20data%20graph%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20data%20analytics%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-data-dna-03&orientation=squarish',
    title: 'Die Daten',
    description: 'Datenbasierte Entscheidungen verwandeln Intuition in messbare Erfolge.',
  },
  {
    number: '04',
    fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20wrench%20tool%20gear%20settings%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20tool%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-tool-dna-04&orientation=squarish',
    title: 'Das Werkzeug',
    description: 'Inhouse-IT und starke Partner lösen Herausforderungen mit den richtigen Tools.',
  },
];

export default function ModernDNA() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const { images: woodIcons } = useMediaStore('home_moderndna_wood_icons');

  const getIcon = (idx: number) => woodIcons[idx]?.url || principleData[idx].fallbackIcon;

  const isActive = (index: number) => hoveredCard === index || focusedCard === index;

  return (
    <section className="sonic-section-lg px-4 md:px-6 relative overflow-hidden bg-white">
      <div className="sonic-container relative z-10">
        {/* Section Header */}
        <div className="sonic-section-header">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
            <div className="w-1.5 h-1.5 bg-primary-500"></div>
            <p className="text-xs font-black text-foreground-950 tracking-[0.2em] uppercase">Sonic DNA</p>
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            Die Sonic DNA
          </h2>
          <p className="text-xs text-foreground-700 max-w-xl mx-auto">
            Was uns ausmacht und antreibt
          </p>
        </div>

        {/* Cards Grid — compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principleData.map((principle, index) => {
            const active = isActive(index);
            return (
              <div
                key={index}
                className="relative overflow-hidden cursor-default transition-all duration-500"
                style={{
                  transform: active ? 'translateY(-4px)' : 'translateY(0)',
                  background: active
                    ? 'oklch(var(--foreground-950))'
                    : 'rgba(255,255,255,0.92)',
                  boxShadow: active
                    ? '0 20px 48px rgba(0,0,0,0.2), 0 0 0 1px oklch(var(--primary-500) / 0.3)'
                    : '0 4px 16px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)',
                  borderRadius: 0,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setFocusedCard(index)}
                onBlur={() => setFocusedCard(null)}
                aria-label={`${principle.title}: ${principle.description}`}
              >
                {/* Lime accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: active ? '3px' : '2px',
                    background: active ? 'oklch(var(--primary-500))' : 'oklch(var(--primary-500) / 0.2)',
                    boxShadow: active ? '0 0 16px rgba(200,212,0,0.6)' : 'none',
                  }}
                  aria-hidden="true"
                />

                <div className="p-4 flex flex-col" style={{ minHeight: '160px' }}>
                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-[40px] font-black leading-none transition-all duration-500"
                      style={{
                        color: active ? 'oklch(var(--primary-500) / 0.15)' : 'rgba(0,0,0,0.06)',
                        letterSpacing: '-0.04em',
                      }}
                      aria-hidden="true"
                    >
                      {principle.number}
                    </span>
                    <div
                      className="w-9 h-9 overflow-hidden transition-all duration-500 flex-shrink-0"
                      style={{
                        transform: active ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
                        boxShadow: active
                          ? '0 6px 18px rgba(139,90,43,0.35), 0 0 12px rgba(200,212,0,0.2)'
                          : '0 2px 6px rgba(139,90,43,0.15)',
                      }}
                    >
                      <img
                        src={getIcon(index)}
                        alt={principle.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3
                    className="text-base font-black mb-1.5 leading-tight transition-colors duration-500"
                    style={{ color: active ? '#ffffff' : 'oklch(var(--foreground-950))' }}
                  >
                    {principle.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="mb-2 transition-all duration-500"
                    style={{
                      height: '1px',
                      background: active ? 'rgba(200,212,0,0.25)' : 'rgba(0,0,0,0.08)',
                    }}
                    aria-hidden="true"
                  />

                  <p
                    className="text-xs leading-relaxed transition-colors duration-500"
                    style={{ color: active ? 'rgba(255,255,255,0.7)' : 'oklch(var(--foreground-500))' }}
                  >
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}