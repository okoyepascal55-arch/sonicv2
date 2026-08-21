import { useState, useCallback } from 'react';
import type { MediaItem } from '@/lib/mediaStore';
import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useText } from '@/hooks/useText';

const EXECUTIVES = [
  {
    id: 'bjorn',
    name: 'Björn Bourdin',
    title: 'Geschäftsführer',
    tag: 'Strategie · Führung',
    tenure: 'Seit 2010',
    eyebrow: 'Vision. Strategie. Führung.',
    pullQuote: '„Wir sind eine Agentur, die nicht verwaltet, sondern gestaltet. Qualität entsteht nicht durch Kontrolle, sondern durch Vertrauen in ein exzellentes Team."',
    bio: 'Björn führt Sonic als Geschäftsführer mit strategischer Weitsicht. Seit 2010 treibt er die operative Exzellenz des Unternehmens voran — von Prozessoptimierung bis zur DACH-weiten Koordination. Seine Arbeit hält das System am Laufen, das 20.000+ Promoter:innen täglich trägt.',
    metrics: [
      { value: '20.000+', label: 'Promoter:innen täglich' },
      { value: 'DACH', label: 'Marktabdeckung' },
    ],
    qa: [
      { q: 'Was ist das Rückgrat von Sonics operativer Stärke?', a: 'Das SRT — unser inhouse entwickeltes Reporting-Tool. Es verbindet Planung, Einsatz und Messung in einer Plattform. Keine Blackbox.' },
      { q: 'Wie managed man 150+ Brands gleichzeitig?', a: 'Klare Strukturen, klare Verantwortlichkeiten, und ein Team, das wirklich eigene Entscheidungen trifft. Mikro-Management skaliert nicht.' },
      { q: 'Was macht einen guten Partner aus?', a: 'Verlässlichkeit über Phasen hinweg. Nicht nur wenn alles läuft, sondern besonders wenn es schwierig wird.' },
    ],
    linkedin: 'https://www.linkedin.com/in/bj%C3%B6rn-bourdin-33100b3/',
    calendly: 'https://calendly.com/sonic-group/30min',
    image: '/images/Über uns/Leadership Perspectives/Björn Bourdin3.webp',
  },
  {
    id: 'jo',
    name: 'Jo Heitkämper',
    title: 'Leiter Vertrieb',
    tag: 'Vertrieb · Wachstum',
    tenure: 'Seit 2007',
    eyebrow: 'Wachstum. Markt. Dynamik.',
    pullQuote: '„Der Point of Sale ist der ehrlichste Ort der Welt. Dort entscheidet sich, ob eine Marke funktioniert — nicht im Meeting-Raum."',
    bio: 'Jo ist seit der Gründung 2007 das Sales-Herz von Sonic. Mit über 18 Jahren Erfahrung im Retail- und Promotion-Markt hat er über €2B in beeinflussten Umsätzen verantwortet und Sonic zu einem der führenden Sales-Partner im DACH-Raum aufgebaut.',
    metrics: [
      { value: '€2 Mrd.', label: 'Beeinflusster Umsatz' },
      { value: '18+', label: 'Jahre Vertrieb' },
    ],
    qa: [
      { q: 'Was treibt Sonic nach 18 Jahren noch an?', a: 'Die Überzeugung, dass jede Marke eine Chance verdient, am Point of Sale wirklich erlebt zu werden. Das ist unser täglicher Antrieb.' },
      { q: 'Wie hat sich die Branche verändert?', a: 'Schneller, digitaler, komplexer — aber das Herzstück bleibt dasselbe: der Mensch, der ein Produkt in die Hand nimmt und sich entscheidet.' },
      { q: 'Was ist Sonics strategische Richtung für die nächsten Jahre?', a: 'Wir investieren massiv in Technologie und Kreation. SRT, Live Video, CGI — das sind keine Trend-Features, sondern strukturelle Vorteile.' },
    ],
    linkedin: 'https://www.linkedin.com/in/jo-heitk%C3%A4mper-81522260/',
    calendly: 'https://calendly.com/sonic-group/30min',
    image: '/images/Über uns/Leadership Perspectives/Jo Heitkämper2.webp',
  },
  {
    id: 'lucas',
    name: 'Lucas Kreiten',
    title: 'Leiter Finanzen',
    tag: 'Finanzen · Strategie',
    tenure: 'Seit 2014',
    eyebrow: 'Zahlen. Struktur. Weitblick.',
    pullQuote: '„Nachhaltiges Wachstum entsteht nicht durch Glück — es ist das Ergebnis fundierter Planung, kluger Investitionen und finanzieller Disziplin."',
    bio: 'Lucas verantwortet seit 2014 die finanzielle Strategie von Sonic. Unter seiner Führung wurden die Investitionen in Kreation, Technologie und Infrastruktur so gesteuert, dass Sonic heute eine vollständige Inhouse-Produktion betreibt — von CGI und Live Video bis zum Messebau.',
    metrics: [
      { value: '150+', label: 'Brands betreut' },
      { value: 'CGI · Live', label: 'Video & Messebau' },
    ],
    qa: [
      { q: 'Wie steuert man das Wachstum einer Agentur mit 150+ Brands?', a: 'Mit einem klaren Kompass: Jede Investition muss sich am POS auszahlen. Wir investieren nicht in Hype — wir investieren in Wirkung.' },
      { q: 'Welche Rolle spielt Technologie in der Finanzstrategie?', a: 'Eine zentrale. SRT gibt uns Echtzeit-Daten, die uns erlauben, Budgets dynamisch anzupassen. Das ist unser Wettbewerbsvorteil.' },
      { q: 'Was ist die größte finanzielle Herausforderung in der Branche?', a: 'Skalierung ohne Qualitätsverlust. Wir wachsen bewusst — lieber etwas langsamer, dafür nachhaltig.' },
    ],
    linkedin: 'https://www.linkedin.com/in/lucas-kreiten/',
    calendly: 'https://calendly.com/sonic-group/30min',
    image: '/images/Über uns/Leadership Perspectives/Lucas Kreiten1.webp',
  },
];

export default function ManagementVoices({ leadershipImages }: { leadershipImages?: MediaItem[] }) {
  const tBadge = useText('about_management_voices', 'about-voices-badge', 'Führungsperspektiven');
  const tHeading = useText('about_management_voices', 'about-voices-heading', 'Die Stimmen hinter Sonic.');
  const tSub = useText('about_management_voices', 'about-voices-sub', 'Strategie, Kreation und Betrieb — drei Perspektiven, eine Überzeugung.');

  const execs = EXECUTIVES.map((exec, idx) => ({
    ...exec,
    image: (leadershipImages && leadershipImages[idx] && leadershipImages[idx].url) || exec.image,
  }));

  const [activeIdx, setActiveIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [openQa, setOpenQa] = useState(0);
  const [qaAnimKey, setQaAnimKey] = useState(0);

  const exec = execs[activeIdx];

  const goTo = useCallback((i: number) => {
    if (i === activeIdx) return;
    setTransitioning(true);
    setOpenQa(0);
    setTimeout(() => {
      setActiveIdx(i);
      setQaAnimKey((k) => k + 1);
      setTransitioning(false);
    }, 280);
  }, [activeIdx]);

  const toggleQa = (qi: number) => {
    setOpenQa((prev) => (prev === qi ? -1 : qi));
  };

  const headingWords = tHeading.trim().split(/\s+/);
  const headingMain = headingWords.length > 1 ? headingWords.slice(0, -1).join(' ') : tHeading;
  const headingAccent = headingWords.length > 1 ? headingWords[headingWords.length - 1] : '';

  return (
    <section id="management-voices" className="relative bg-white overflow-hidden">
      {/* Top lime accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(220,233,77,0.35) 25%,rgba(220,233,77,0.35) 75%,transparent 100%)' }}
      />

      {/* ── HEADER + TABS ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-8 md:pb-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-black uppercase tracking-[0.06em] px-3.5 py-[7px] mb-5">
              <span className="w-1.5 h-1.5 bg-[#0B0B0C] flex-shrink-0" />
              {tBadge}
            </div>
            <h2 className="text-[clamp(28px,3.6vw,46px)] font-black text-[#0B0B0C] leading-[1.06] tracking-tight uppercase">
              {headingMain}{' '}
              <span className="text-[#C3D62A]">{headingAccent}</span>
            </h2>
            <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[440px]">{tSub}</p>
          </div>

          {/* Tab strip */}
          <div className="flex items-stretch gap-0 flex-shrink-0 overflow-x-auto lg:overflow-x-visible -mx-6 lg:mx-0 px-6 lg:px-0">
            {execs.map((e, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={e.id}
                  onClick={() => goTo(i)}
                  className="relative flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors duration-300 text-left whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3D62A]"
                  style={{
                    background: isActive ? '#0B0B0C' : 'transparent',
                    border: '0.5px solid rgba(0,0,0,0.1)',
                    borderLeft: i === 0 ? '0.5px solid rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 flex-shrink-0 text-[11px] font-black transition-colors duration-300"
                    style={{
                      background: isActive ? '#DCE94D' : 'transparent',
                      color: isActive ? '#0B0B0C' : 'rgba(0,0,0,0.3)',
                      border: isActive ? 'none' : '0.5px solid rgba(0,0,0,0.12)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div
                      className="text-sm font-black leading-none tracking-tight transition-colors duration-300"
                      style={{ color: isActive ? '#FFFFFF' : 'rgba(0,0,0,0.6)' }}
                    >
                      {e.name}
                    </div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.08em] mt-1 transition-colors duration-300"
                      style={{ color: isActive ? '#DCE94D' : 'rgba(0,0,0,0.3)' }}
                    >
                      {e.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SPOTLIGHT ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-12 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] bg-white border border-[#E7E4D4] overflow-hidden">
          {/* LEFT — full-bleed portrait */}
          <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] bg-[#0B0B0C]">
            <img
              key={`portrait-${exec.id}`}
              src={exec.image}
              alt={exec.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/20 to-transparent" />
            <div className="absolute top-4 right-4 text-[44px] leading-none font-black text-white/10 select-none" aria-hidden="true">
              {String(activeIdx + 1).padStart(2, '0')}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-0.5 bg-[#DCE94D]" />
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#DCE94D]">{exec.eyebrow}</span>
              </div>
              <div className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">{exec.name}</div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-black text-white">{exec.title}</span>
                <span className="w-1 h-1 bg-[#DCE94D]" />
                <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{exec.tenure}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — interview */}
          <div className="bg-white flex flex-col">
            <div className="p-7 md:p-10 flex-1 flex flex-col">
              {/* Pull quote — bolder */}
              <blockquote
                key={`quote-${activeIdx}`}
                className="relative text-xl md:text-2xl font-black text-[#0B0B0C] leading-[1.35] mb-7"
              >
                <span className="absolute -top-3 -left-1 text-[#DCE94D] text-5xl leading-none font-black" aria-hidden="true">„</span>
                <span className="relative block pl-8">{exec.pullQuote}</span>
              </blockquote>

              {/* Bio */}
              <p
                key={`bio-${activeIdx}`}
                className="text-sm leading-relaxed text-[#6E6E68] mb-7"
              >
                {exec.bio}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {exec.metrics.map((m) => (
                  <div key={m.label} className="bg-[#0B0B0C] px-4 py-3.5">
                    <div className="text-xl font-black text-[#DCE94D] leading-none">{m.value}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Q&A accordion */}
              <div className="flex flex-col border-t border-[#E7E4D4]">
                {exec.qa.map((item, qi) => {
                  const isOpen = openQa === qi;
                  return (
                    <div key={`${qaAnimKey}-${qi}`} className="border-b border-[#E7E4D4]">
                      <button
                        onClick={() => toggleQa(qi)}
                        className="w-full flex items-center gap-3 py-4 cursor-pointer text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3D62A]"
                      >
                        <span
                          className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-[9px] font-black transition-colors duration-300"
                          style={{
                            background: isOpen ? '#DCE94D' : '#0B0B0C',
                            color: isOpen ? '#0B0B0C' : '#DCE94D',
                          }}
                        >
                          Q
                        </span>
                        <span className="flex-1 text-sm font-black text-[#0B0B0C] tracking-tight">
                          {item.q}
                        </span>
                        <i
                          className={`ri-arrow-down-s-line text-base text-[#0B0B0C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ maxHeight: isOpen ? '220px' : '0px', opacity: isOpen ? 1 : 0 }}
                      >
                        <p className="text-sm leading-relaxed pb-5 pl-9 text-[#6E6E68]">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer nav + socials */}
            <div className="flex items-center justify-between px-7 md:px-10 py-4 border-t border-[#E7E4D4] bg-[#FAFDF5]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo((activeIdx - 1 + execs.length) % execs.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-[#0B0B0C] hover:text-white border border-[#E7E4D4] text-[#6E6E68]"
                  aria-label="Vorherige Person"
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <span className="text-xs text-[#6E6E68] font-mono tabular-nums min-w-[32px] text-center">
                  {activeIdx + 1} / {execs.length}
                </span>
                <button
                  onClick={() => goTo((activeIdx + 1) % execs.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-[#0B0B0C] hover:text-white border border-[#E7E4D4] text-[#6E6E68]"
                  aria-label="Nächste Person"
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
              <a
                href={exec.linkedin}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.06em] text-[#0B0B0C] hover:text-[#6E6E68] transition-colors"
              >
                <i className="ri-linkedin-fill text-base" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ── CONTACT CTA ── */}
        <div id="kontakt" className="max-w-5xl mx-auto mt-8 md:mt-10">
          <div className="border border-[#E7E4D4] py-6 md:py-7 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5]">
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-[15px] font-black text-[#0B0B0C] leading-relaxed">
                Lass uns besprechen, wie Sonic deine <span className="text-[#C3D62A]">Marke unterstützen kann.</span>
              </p>
              <p className="text-xs text-[#6E6E68] mt-1 hidden sm:block">
                Unabhängige Agentur — über 500 Projekte — B2B, B2B2C &amp; D2C
              </p>
            </div>
            <button
              type="button"
              onClick={() => openCalendly()}
              className="inline-flex items-center gap-2 bg-[#0B0B0C] text-white px-6 py-3 font-black hover:bg-[#DCE94D] hover:text-[#0B0B0C] transition-colors duration-300 whitespace-nowrap cursor-pointer text-xs flex-shrink-0"
            >
              <i className="ri-calendar-line text-sm" />
              Beratungsgespräch buchen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}