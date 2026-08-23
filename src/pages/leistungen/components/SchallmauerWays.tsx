import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useNavigate } from 'react-router-dom';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const FALLBACK_SCHALLMAUER_ICONS = [
  'https://readdy.ai/api/search-image?query=carved%20wooden%20rocket%20launch%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-rocket-leist-1&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20growth%20arrow%20upward%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-chart-leist-2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20globe%20world%20internet%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-way-globe-leist-3&orientation=squarish',
];

interface Way {
  key: string;
  num: string;
  title: string;
  headline: string;
  desc: string;
  bullets: string[];
  cta: string;
  link: string;
  tags: string[];
}

const WAYS: Way[] = [
  {
    key: 'markteintritt',
    num: '01',
    title: 'Markteintritt',
    headline: 'Neu im Markt. Maximale Sichtbarkeit.',
    desc: 'Dein Produkt ist kaufbereit, aber noch unbekannt? Wir ändern das. Mit Menschen, die deine Marke verstehen und sie am Point of Sale, per Video und bei Events zum Leben erwecken.',
    bullets: [
      'Brand Ambassadors am POS',
      'Datenbasierte Standortplanung mit SRT',
      'Launch-Events & Promotions',
      'Live-Reporting ab Tag 1',
    ],
    cta: 'Markteintritt planen',
    link: '/losungen?open=markteintritt',
    tags: ['Markteinführung', 'POS', 'Live-Kommunikation'],
  },
  {
    key: 'absatz',
    num: '02',
    title: 'Absatz steigern',
    headline: 'Produkt im Regal. Sell-out über Plan.',
    desc: 'Unsere Field-Force-Teams sind deine verlängerte Vertriebsmannschaft am POS: daten- und ROI-getrieben geplant, lückenlos reportet. Du weißt vorher, was du erwarten kannst.',
    bullets: [
      'Festangestellte Promoter mit Produktwissen',
      'Forecasting vor dem ersten Einsatz',
      'GPS-Tracking & Live-Dashboard',
      'Kontinuierliche Optimierung',
    ],
    cta: 'Absatz steigern',
    link: '/losungen?open=absatz',
    tags: ['Field Force', 'Retail', 'ROI'],
  },
  {
    key: 'omnichannel',
    num: '03',
    title: 'Omnichannel',
    headline: 'Human Power in allen Kanälen.',
    desc: 'Die größte Schwachstelle im Omnichannel? Beratung. Unsere Lösung: Live-Video-Kaufberatung, erreichbar im Online-Shop oder per QR-Code auf der Verpackung.',
    bullets: [
      'Live-Video im Online-Shop',
      'QR-Code auf Verpackung & POS-Display',
      'Geschulte Video-Berater aus dem Talentepool',
      'Skalierbar von 100 bis 10.000 Calls/Monat',
    ],
    cta: 'Omnichannel starten',
    link: '/losungen?open=omnichannel',
    tags: ['Live-Video', 'E-Commerce', 'Conversions'],
  },
];

export default function SchallmauerWays() {
  const { images: woodIcons } = useMediaStore('leistungen_schallmauer_wood_icons');
  const [active, setActive] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const way = WAYS[active];

  const getWoodIcon = (index: number) => {
    const item = woodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_SCHALLMAUER_ICONS[index];
  };

  return (
    <section className="sonic-section-md bg-white md:px-4 md:px-6 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full max-w-[600px] h-[600px] bg-primary-500/3 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/2 blur-[100px]" />
      </div>

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <SectionBadge text="Die Retail-Schallmauer" variant="dark" className="mb-5" />
          <h2 className="sonic-h2 text-foreground-950">
            Dein Weg zum <span className="text-primary-500">Retail-Erfolg</span>
          </h2>
          <p className="text-sm md:text-base text-foreground-600 max-w-xl mx-auto">
            Wähle deinen Pfad — oder kombiniere alle drei für maximale Marktdurchdringung.
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WAYS.map((w, i) => {
            const isHovered = hoveredCard === w.key;
            const woodIcon = getWoodIcon(i);
            return (
              <div
                key={w.key}
                className="relative overflow-hidden cursor-pointer transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  background: isHovered
                    ? 'oklch(var(--foreground-950))'
                    : '#ffffff',
                  boxShadow: isHovered
                    ? '0 28px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,212,0,0.3)'
                    : '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
                  borderRadius: 0,
                }}
                onMouseEnter={() => { setHoveredCard(w.key); setActive(WAYS.findIndex(x => x.key === w.key)); }}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Lime accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: isHovered ? '3px' : '2px',
                    background: isHovered ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)',
                    boxShadow: isHovered ? '0 0 20px rgba(200,212,0,0.6)' : 'none',
                  }}
                />

                <div className="p-6 flex flex-col h-full min-h-[260px]">
                  {/* Number + Wood Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="font-black leading-none select-none transition-all duration-500"
                      style={{
                        fontSize: '4rem',
                        color: isHovered ? 'rgba(200,212,0,0.15)' : 'rgba(0,0,0,0.06)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                      }}
                    >
                      {w.num}
                    </span>
                    <div
                      className="w-14 h-14 overflow-hidden flex-shrink-0 transition-all duration-500"
                      style={{
                        transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
                        boxShadow: isHovered
                          ? '0 8px 24px rgba(139,90,43,0.35), 0 0 16px rgba(200,212,0,0.2)'
                          : '0 2px 8px rgba(139,90,43,0.15)',
                      }}
                    >
                      <img src={woodIcon} alt={w.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>

                  <h3
                    className="sonic-h3 mb-2 leading-tight transition-colors duration-500"
                    style={{ color: isHovered ? '#ffffff' : 'oklch(var(--foreground-950))' }}
                  >
                    {w.title}
                  </h3>

                  <div
                    className="mb-3 transition-all duration-500"
                    style={{
                      height: '1px',
                      background: isHovered ? 'rgba(200,212,0,0.25)' : 'rgba(0,0,0,0.08)',
                    }}
                  />

                  <p
                    className="text-sm leading-relaxed flex-1 mb-4 transition-colors duration-500"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.7)' : '#6b7280' }}
                  >
                    {w.headline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {w.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-black px-2.5 py-1 uppercase tracking-wider transition-all duration-500"
                        style={{
                          background: isHovered ? 'rgba(200,212,0,0.12)' : 'rgba(0,0,0,0.05)',
                          color: isHovered ? 'oklch(var(--primary-500))' : '#9ca3af',
                          border: isHovered
                            ? '1px solid rgba(200,212,0,0.25)'
                            : '1px solid transparent',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(w.link); }}
                    className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest px-5 py-3 transition-all duration-300 whitespace-nowrap w-fit cursor-pointer"
                    style={{
                      background: isHovered ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.07)',
                      color: isHovered ? 'oklch(var(--foreground-950))' : 'oklch(var(--foreground-500))',
                      boxShadow: isHovered ? '0 4px 20px rgba(200,212,0,0.4)' : 'none',
                    }}
                  >
                    {w.cta}
                    <i className="ri-arrow-right-line text-sm" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
