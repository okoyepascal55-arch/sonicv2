import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function IndustryExpertise() {
  const tBadge = useText('industries_expertise', 'industries-expertise-badge', 'Unsere Kompetenz');
  const tHeading = useText('industries_expertise', 'industries-expertise-heading', 'WAS UNS UNTERSCHEIDET');
  const tSub = useText('industries_expertise', 'industries-expertise-sub', '17+ Jahre Branchen-Expertise mit nachweisbaren Ergebnissen für führende Marken.');

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { images: woodIcons } = useMediaStore('industries_expertise_wood_icons');
  const getWoodIcon = (idx: number) => woodIcons[idx]?.url || expertiseData[idx].fallbackWoodIcon;

  const expertiseData = [
    { number: '01', title: 'Marktkenntnis', description: 'Tiefes Verständnis der DACH-Marktdynamik, des Verbraucherverhaltens und der Retail-Landschaften.', icon: 'ri-compass-3-line', tags: ['DACH-Markt', 'Consumer Insights'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20compass%20navigation%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-compass-walnut&orientation=squarish' },
    { number: '02', title: 'Produkttraining', description: 'Umfassende Schulungsprogramme, die sicherstellen, dass Markenbotschafter echte Produktexperten sind.', icon: 'ri-graduation-cap-line', tags: ['Schulungen', 'Produktwissen'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20graduation%20cap%20education%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-grad-walnut&orientation=squarish' },
    { number: '03', title: 'Handelspartnerschaften', description: 'Etablierte Partnerschaften mit führenden Retailern in Deutschland, Österreich und der Schweiz.', icon: 'ri-links-line', tags: ['Retail-Netzwerk', 'Partnerschaften'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20handshake%20partnership%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-handshake-walnut&orientation=squarish' },
    { number: '04', title: 'Datenbasierte Insights', description: 'Echtzeit-Analysen und Reporting, um Performance und ROI kontinuierlich zu optimieren.', icon: 'ri-bar-chart-2-line', tags: ['Analytics', 'Echtzeit-ROI'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20analytics%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-chart-walnut&orientation=squarish' },
    { number: '05', title: 'Skalierbare Lösungen', description: 'Von Einzelstore-Piloten bis zu deutschlandweiten Kampagnen — wir wachsen mit deinen Anforderungen.', icon: 'ri-rocket-line', tags: ['Skalierung', 'Nationwide'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20rocket%20launch%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-rocket-walnut&orientation=squarish' },
    { number: '06', title: 'Phygitale Integration', description: 'Nahtlose Verbindung zwischen physischem Retail und digitalen Erlebnissen.', icon: 'ri-global-line', tags: ['Phygital', 'Omnichannel'], fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20globe%20world%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-globe-walnut&orientation=squarish' },
  ];

  const expertise = expertiseData.map((e, i) => ({ ...e, woodIcon: getWoodIcon(i) }));

  const stats = [
    { value: '650K+', label: 'Man-Days' },
    { value: '500+', label: 'Projekte' },
    { value: '100K+', label: 'POS-Umsetzungen' },
    { value: '17+', label: 'Jahre Erfahrung' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 mb-4 leading-tight tracking-tight">
            {tHeading}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 max-w-2xl mx-auto">
            {tSub}
          </p>
        </div>

        {/* Expertise grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {expertise.map((item, index) => {
            const isHovered = hoveredCard === index;
            return (
              <div
                key={index}
                className="relative overflow-hidden cursor-default transition-all duration-500"
                style={{
                  borderRadius: 0,
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  background: isHovered
                    ? 'linear-gradient(145deg, #1a1a1a 0%, #111 100%)'
                    : '#ffffff',
                  boxShadow: isHovered
                    ? '0 28px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,212,0,0.3)'
                    : '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Lime accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: isHovered ? '3px' : '2px',
                    background: isHovered ? '#C8D400' : 'rgba(200,212,0,0.2)',
                    boxShadow: isHovered ? '0 0 20px rgba(200,212,0,0.6)' : 'none',
                  }}
                />

                {/* Left edge-lit border */}
                <div
                  className="absolute left-0 top-3 bottom-3 w-0.5 transition-all duration-500"
                  style={{ background: isHovered ? '#C8D400' : 'transparent' }}
                />

                {/* Number watermark */}
                <div
                  className="absolute bottom-4 right-5 font-black leading-none select-none pointer-events-none transition-all duration-500"
                  style={{
                    fontSize: '5rem',
                    opacity: isHovered ? 0.06 : 0.032,
                    color: isHovered ? '#C8D400' : '#000',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {item.number}
                </div>

                {/* Corner brackets */}
                <div className={`absolute top-3 left-3 w-4 h-4 border-t border-l transition-all duration-300 ${isHovered ? 'opacity-100 border-[#C8D400]/50' : 'opacity-0 border-[#C8D400]'}`} />
                <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r transition-all duration-300 ${isHovered ? 'opacity-100 border-[#C8D400]/50' : 'opacity-0 border-[#C8D400]'}`} />
                <div className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l transition-all duration-300 ${isHovered ? 'opacity-100 border-[#C8D400]/50' : 'opacity-0 border-[#C8D400]'}`} />
                <div className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r transition-all duration-300 ${isHovered ? 'opacity-100 border-[#C8D400]/50' : 'opacity-0 border-[#C8D400]'}`} />

                <div className="p-8 flex flex-col min-h-[240px] relative z-10">
                  {/* Icon box + wooden icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      style={{
                        background: isHovered
                          ? 'linear-gradient(135deg, rgba(200,212,0,0.2) 0%, rgba(200,212,0,0.08) 100%)'
                          : 'linear-gradient(135deg, #f5f5f0 0%, #ededea 100%)',
                        boxShadow: isHovered
                          ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(200,212,0,0.2)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <i className={`${item.icon} text-2xl transition-colors duration-500`}
                        style={{ color: isHovered ? '#C8D400' : '#555' }}
                      />
                    </div>
                    <div
                      className="w-12 h-12 overflow-hidden flex-shrink-0 transition-all duration-500"
                      style={{
                        transform: isHovered ? 'scale(1.08) rotate(-2deg)' : 'scale(1)',
                        boxShadow: isHovered
                          ? '0 6px 20px rgba(139,90,43,0.3)'
                          : '0 2px 8px rgba(139,90,43,0.12)',
                      }}
                    >
                      <img src={item.woodIcon} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>

                  <h3
                    className="text-base font-black mb-2 leading-tight transition-colors duration-500"
                    style={{ color: isHovered ? '#ffffff' : '#1A1A1A' }}
                  >
                    {item.title}
                  </h3>

                  <div
                    className="mb-3 transition-all duration-500"
                    style={{ height: '1px', background: isHovered ? 'rgba(200,212,0,0.2)' : 'rgba(0,0,0,0.07)' }}
                  />

                  <p
                    className="text-sm leading-relaxed flex-1 mb-4 transition-colors duration-500"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : '#6B7280' }}
                  >
                    {item.description}
                  </p>

                </div>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#111] border border-[#111] overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111] px-8 py-10 text-center relative overflow-hidden group"
            >
              {/* Lime top bar on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-[#C8D400] transition-all duration-300"
                style={{ opacity: 0 }}
              />
              <div className="absolute inset-0 bg-[#C8D400]/0 group-hover:bg-[#C8D400]/5 transition-colors duration-300" />
              <div
                className="text-3xl lg:text-4xl font-black mb-2 relative z-10"
                style={{ color: '#C8D400' }}
              >
                {stat.value}
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-white/40 relative z-10">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
