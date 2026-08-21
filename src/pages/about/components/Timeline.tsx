import { useState, useEffect, useRef } from 'react';
import LimeBadge from '@/components/base/LimeBadge';
import { useText } from '@/hooks/useText';

type SectionKey = 'new' | 'better' | 'things';

const sections: { key: SectionKey; tag: string; title: string; subtitle: string; color: string; items: { number: string; title: string; description: string }[] }[] = [
  {
    key: 'new',
    tag: '#Doing new things',
    title: 'Innovation',
    subtitle: 'Wir sind eine Vertriebsagentur und Eventagentur mit Schwerpunkt auf Innovationen, die eure Herausforderungen lösen.',
    color: 'oklch(var(--primary-500))',
    items: [
      {
        number: '01',
        title: 'Digitaler Talente-Pool',
        description: 'Unsere Datenbank enthält Stammdaten, Vorlieben und Performance-Daten. Für perfektes Matching.',
      },
      {
        number: '02',
        title: 'Sonic Reporting Tool',
        description: 'Unsere eigene Software für Projektmanagement, Personalsteuerung, Reporting und Abrechnung.',
      },
      {
        number: '03',
        title: '(Live) Video Studios',
        description: 'Die Anforderung: Field Force per Video für E-Commerce. Die Umsetzung: Unsere Studios und Moderatoren.',
      },
      {
        number: '04',
        title: 'Performance Marketing für Retail',
        description: 'Dank unserer Daten und -auswertungen ermöglichen wir unseren Kunden echtes Performance Marketing.',
      },
    ],
  },
  {
    key: 'better',
    tag: '#Doing things better',
    title: 'Verbesserung',
    subtitle: 'Wir bringen Unternehmen und Shopper zusammen. Genau so, wie für die Marke und im Markt ideal ist.',
    color: 'oklch(var(--foreground-950))',
    items: [
      {
        number: '01',
        title: 'KI',
        description: '2024 implementierten wir KI in das Sonic Reporting Tool, bspw. für Document Intelligence. Für besseres Projektverständnis.',
      },
      {
        number: '02',
        title: 'Eigenentwicklung',
        description: 'Was es nicht gibt, bauen wir selbst. Beispiel: Wir haben mit Partnern ein eigenes modulares Präsentationsmöbelstück entwickelt.',
      },
      {
        number: '03',
        title: 'Datenbasierte Verbesserungen',
        description: 'Unser Ziel: Umsatz- und Absatzwachstum für deine Marken. Die Grundlage: Daten und Ideen.',
      },
      {
        number: '04',
        title: 'Duales Studium',
        description: 'Bessere Fachkräfte? Besser selbst ausbilden. Wir sind Partner für duale Studiengänge.',
      },
    ],
  },
  {
    key: 'things',
    tag: '#Doing things',
    title: 'Unser Kern',
    subtitle: 'Das ist die Grundlage, auf der wir jeden Tag arbeiten — mit Überzeugung und vollem Einsatz.',
    color: 'oklch(var(--foreground-950))',
    items: [
      {
        number: '01',
        title: 'Starkes Team',
        description: 'Viele Backgrounds von Konzern bis Agentur. Betriebszugehörigkeit im Schnitt 5,15 Jahre.',
      },
      {
        number: '02',
        title: 'Datenbasiertes Tagesgeschäft',
        description: 'Wir lieben Zahlen, Daten, Fakten und nutzen sie für bessere Prozesse.',
      },
      {
        number: '03',
        title: 'Zwei Organisationen',
        description: 'Sonic Sales Support: die Agentur. Sonic Staff Service: der Personaldienstleister.',
      },
      {
        number: '04',
        title: 'Studios, Warehouse & Logistics',
        description: 'Phygital heißt: Physisch und digital Arbeit abliefern. Wir haben dafür eigene Infrastruktur.',
      },
    ],
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('new');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const tBadge = useText('about_timeline', 'about-timeline-badge', '#Doing');
  const tHeading = useText('about_timeline', 'about-timeline-heading', 'WAS UNS ANTREIBT');
  const tTab1 = useText('about_timeline', 'about-timeline-tab-1', '#Doing new things');
  const tTab2 = useText('about_timeline', 'about-timeline-tab-2', '#Doing things better');
  const tTab3 = useText('about_timeline', 'about-timeline-tab-3', '#Doing things');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = sections.find((s) => s.key === activeSection)!;

  return (
    <section ref={sectionRef} className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div
          className={`mb-8 md:mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center mb-5">
            <LimeBadge text={tBadge} />
          </div>
          <h2 className="text-3xl font-black text-foreground-950 leading-tight tracking-tight text-center mb-3">
            {tHeading.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-[#C8D400]">{tHeading.split(' ').slice(2).join(' ')}</span>
          </h2>
        </div>

        {/* Tab switcher */}
        <div
          className={`flex flex-col sm:flex-row gap-0 border border-black/10 overflow-hidden mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '100ms' }}
          role="tablist"
          aria-label="Timeline-Sektionen"
        >
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              role="tab"
              aria-selected={activeSection === s.key}
              aria-controls={`timeline-panel-${s.key}`}
              id={`timeline-tab-${s.key}`}
              className={`flex-1 px-3 py-3.5 text-[10px] font-black uppercase tracking-[0.06em] whitespace-nowrap cursor-pointer transition-all duration-300 border-r last:border-r-0 sm:border-r border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset ${
                activeSection === s.key
                  ? 'bg-foreground-950 text-white'
                  : 'bg-white text-black/40 hover:text-black hover:bg-[#FAFDF5]'
              }`}
              style={activeSection === s.key ? {
                boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.35), inset -1px -1px 4px rgba(255,255,255,0.06)',
              } : {
                boxShadow: '2px 2px 6px rgba(0,0,0,0.06), -1px -1px 4px rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              {s.tag === '#Doing new things' ? tTab1 : s.tag === '#Doing things better' ? tTab2 : tTab3}
              {activeSection === s.key && (
                <div className="block w-full h-0.5 bg-[#C8D400] mt-1.5 mx-auto" style={{ maxWidth: '40px' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          key={activeSection}
          role="tabpanel"
          id={`timeline-panel-${activeSection}`}
          aria-labelledby={`timeline-tab-${activeSection}`}
          style={{ animation: visible ? 'fadeSlideIn 0.4s ease-out' : undefined }}
        >
          {/* Section intro */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-2">{current.tag}</div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground-950 leading-tight tracking-tight">{current.title}</h3>
            </div>
            <p className="text-sm text-black/50 max-w-md leading-relaxed">{current.subtitle}</p>
          </div>

          {/* Items grid — asymmetric magazine layout */}
          <div className="grid sm:grid-cols-3 gap-3">
            {current.items.map((item, i) => {
              const isFeature = i === 0;
              const isCloser = i === 3;
              const colSpan = (isFeature || isCloser) ? 'sm:col-span-2' : 'sm:col-span-1';
              return (
              <div
                key={i}
                className={`relative p-7 md:p-8 cursor-default transition-all duration-300 border border-black/8 bg-white ${colSpan}`}
                style={hoveredItem === i ? {
                  boxShadow: '4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.90), inset 0 1px 0 rgba(255,255,255,0.8)',
                  transform: 'translateY(-1px)',
                } : {
                  boxShadow: '2px 2px 6px rgba(0,0,0,0.03), -1px -1px 4px rgba(255,255,255,0.7)',
                }}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                role="button"
                tabIndex={0}
                aria-label={`${item.title} — ${item.description}`}
                onFocus={() => setHoveredItem(i)}
                onBlur={() => setHoveredItem(null)}
              >
                {/* Big number bg */}
                <div
                  className="absolute top-4 right-5 font-black text-black leading-none select-none pointer-events-none transition-opacity duration-300"
                  style={{ fontSize: '4.5rem', opacity: hoveredItem === i ? 0.05 : 0.02 }}
                  aria-hidden="true"
                >
                  {item.number}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#0B0B0C] text-[#C8D400] flex items-center justify-center text-[11px] font-black">{item.number}</div>
                  {isFeature && (
                    <div className="hidden sm:block h-px flex-1 bg-black/10" />
                  )}
                </div>
                <h4 className="text-lg md:text-xl font-black text-foreground-950 mb-3 leading-tight tracking-tight">{item.title}</h4>
                <p className="text-sm text-black/50 leading-relaxed">{item.description}</p>

                {/* Bottom accent — subtle black instead of lime */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#C8D400] transition-all duration-500"
                  style={{ width: hoveredItem === i ? '100%' : '0%', opacity: 0.5 }}
                />
              </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}