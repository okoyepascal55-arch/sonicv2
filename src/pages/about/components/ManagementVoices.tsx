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
    bio: 'Björn führt Sonic als Geschäftsführer mit strategischer Weitsicht. Seit 2010 treibt er die operative Exzellenz des Unternehmens voran — von Prozessoptimierung bis zur DACH-weiten Koordination.',
    metrics: [
      { value: '20.000+', label: 'Promoter:innen täglich' },
      { value: 'DACH', label: 'Marktabdeckung' },
    ],
    linkedin: 'https://www.linkedin.com/in/bj%C3%B6rn-bourdin-33100b3/',
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
    bio: 'Jo ist seit der Gründung 2007 das Sales-Herz von Sonic. Mit über 18 Jahren Erfahrung im Retail- und Promotion-Markt hat er über €2B in beeinflussten Umsätzen verantwortet.',
    metrics: [
      { value: '€2 Mrd.', label: 'Beeinflusster Umsatz' },
      { value: '18+', label: 'Jahre Vertrieb' },
    ],
    linkedin: 'https://www.linkedin.com/in/jo-heitk%C3%A4mper-81522260/',
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
    bio: 'Lucas verantwortet seit 2014 die finanzielle Strategie von Sonic. Unter seiner Führung wurde Sonic zu einer vollständigen Inhouse-Produktion — von CGI und Live Video bis zum Messebau.',
    metrics: [
      { value: '150+', label: 'Brands betreut' },
      { value: 'CGI · Live', label: 'Video & Messebau' },
    ],
    linkedin: 'https://www.linkedin.com/in/lucas-kreiten/',
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

  const exec = execs[activeIdx];

  const goTo = useCallback((i: number) => {
    if (i === activeIdx) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIdx(i);
      setTransitioning(false);
    }, 240);
  }, [activeIdx]);

  const headingWords = tHeading.trim().split(/\s+/);
  const headingMain = headingWords.length > 1 ? headingWords.slice(0, -1).join(' ') : tHeading;
  const headingAccent = headingWords.length > 1 ? headingWords[headingWords.length - 1] : '';

  return (
    <section id="management-voices" className="relative bg-white overflow-hidden">
      <div className="max-w-full max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20">
        {/* ── HEADER + SELECTOR ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-[0.06em] px-3.5 py-[7px] mb-5">
              <span className="w-1.5 h-1.5 bg-foreground-950 flex-shrink-0" />
              {tBadge}
            </div>
            <h2 className="text-[clamp(28px,3.6vw,46px)] font-black text-foreground-950 leading-[1.06] tracking-tight uppercase">
              {headingMain}{' '}
              <span className="text-primary-500">{headingAccent}</span>
            </h2>
            <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[440px]">{tSub}</p>
          </div>

          {/* Selector — numbered tabs */}
          <div className="flex items-stretch gap-0 flex-shrink-0 border border-black/10 overflow-hidden">
            {execs.map((e, i) => {
              const isActive = activeIdx === i;
              return (
                <button
                  key={e.id}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2.5 px-4 md:px-5 py-3 text-left whitespace-nowrap cursor-pointer transition-colors duration-300 border-r last:border-r-0 border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-inset ${
                    isActive ? 'bg-foreground-950' : 'bg-white hover:bg-[#FAFDF5]'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 text-[10px] font-black transition-colors duration-300 ${
                      isActive ? 'bg-primary-500 text-foreground-950' : 'border border-black/15 text-black/40'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-sm font-black leading-none transition-colors duration-300"
                    style={{ color: isActive ? '#FFFFFF' : 'rgba(0,0,0,0.6)' }}
                  >
                    {e.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SPLIT CARD (photo + dark panel, matches Team) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white border border-[#E7E4D4] overflow-hidden">
          {/* Left — full-bleed portrait */}
          <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] bg-foreground-950">
            <img
              key={`portrait-${exec.id}`}
              src={exec.image}
              alt={exec.name}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {exec.eyebrow}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">{exec.name}</div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-black text-white">{exec.title}</span>
                <span className="w-1 h-1 bg-primary-500" />
                <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{exec.tenure}</span>
              </div>
            </div>
          </div>

          {/* Right — dark ink panel */}
          <div className="bg-foreground-950 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                {String(activeIdx + 1).padStart(2, '0')} / {String(execs.length).padStart(2, '0')}
              </div>

              <blockquote
                key={`quote-${activeIdx}`}
                className="text-xl md:text-2xl font-black text-white leading-[1.35] mb-6"
              >
                {exec.pullQuote}
              </blockquote>

              <p key={`bio-${activeIdx}`} className="text-sm leading-relaxed text-white/55 mb-7">
                {exec.bio}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exec.metrics.map((m) => (
                  <div key={m.label} className="border border-white/10 px-4 py-3.5">
                    <div className="text-xl font-black text-primary-500 leading-none">{m.value}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer nav + social */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo((activeIdx - 1 + execs.length) % execs.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Vorherige Person"
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <button
                  onClick={() => goTo((activeIdx + 1) % execs.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Nächste Person"
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
              <a
                href={exec.linkedin}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.06em] text-primary-500 hover:text-white transition-colors"
              >
                <i className="ri-linkedin-fill text-base" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ── CONTACT CTA ── */}
        <div id="kontakt" className="sonic-container mt-8 md:mt-10">
          <div className="border border-[#E7E4D4] py-6 md:py-7 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5]">
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-[15px] font-black text-foreground-950 leading-relaxed">
                Lass uns besprechen, wie Sonic deine <span className="text-primary-500">Marke unterstützen kann.</span>
              </p>
              <p className="text-xs text-[#6E6E68] mt-1 hidden sm:block">
                Unabhängige Agentur — über 500 Projekte — B2B, B2B2C &amp; D2C
              </p>
            </div>
            <button
              type="button"
              onClick={() => openCalendly()}
              className="inline-flex items-center gap-2 bg-foreground-950 text-white px-6 py-3 font-black hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-300 whitespace-nowrap cursor-pointer text-xs flex-shrink-0"
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