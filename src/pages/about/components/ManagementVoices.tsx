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

function ExecCard({ exec, idx }: { exec: typeof EXECUTIVES[0]; idx: number }) {
  return (
    <div className="border border-[oklch(0.885_0.004_110)] overflow-hidden">
      {/* Portrait */}
      <div className="relative bg-foreground-950" style={{ minHeight: '340px' }}>
        <img
          src={exec.image}
          alt={exec.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-5 left-5 bg-primary-500 text-foreground-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
          {exec.eyebrow}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-[clamp(24px,4vw,36px)] font-black text-white leading-none tracking-tight">{exec.name}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-black text-white">{exec.title}</span>
            <span className="w-1 h-1 bg-primary-500 flex-shrink-0" />
            <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{exec.tenure}</span>
          </div>
        </div>
      </div>

      {/* Text panel */}
      <div className="bg-foreground-950 p-7 md:p-10">
        <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          {String(idx + 1).padStart(2, '0')} / {String(EXECUTIVES.length).padStart(2, '0')}
        </div>
        <blockquote className="text-white font-black leading-[1.3] mb-5" style={{ fontSize: 'clamp(18px,2vw,24px)', letterSpacing: '-0.015em' }}>
          {exec.pullQuote}
        </blockquote>
        <p className="text-sm text-white/55 leading-relaxed mb-7">{exec.bio}</p>
        <div className="grid grid-cols-2 gap-3 mb-7">
          {exec.metrics.map((m) => (
            <div key={m.label} className="border border-white/10 px-4 py-3.5">
              <div className="text-xl font-black text-primary-500 leading-none">{m.value}</div>
              <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1.5">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
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
  );
}

export default function ManagementVoices({ leadershipImages }: { leadershipImages?: MediaItem[] }) {
  const tBadge   = useText('about_management_voices', 'about-voices-badge',   'Führungsperspektiven');
  const tHeading = useText('about_management_voices', 'about-voices-heading', 'Die Stimmen hinter Sonic.');
  const tSub     = useText('about_management_voices', 'about-voices-sub',     'Strategie, Kreation und Betrieb — drei Perspektiven, eine Überzeugung.');

  const execs = EXECUTIVES.map((exec) => {
    // Match by executive name in URL to handle multiple files per person correctly
    const name = exec.name.split(' ')[0].toLowerCase(); // e.g. "björn", "jo", "lucas"
    const matched = leadershipImages?.find(img => img.url.toLowerCase().includes(name) && img.url.match(/\d+\.webp$/i));
    return { ...exec, image: (matched?.url) || exec.image };
  });

  return (
    <section id="management-voices" className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-14 md:py-20">

        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
          </div>
          <h2 className="sonic-h2 text-foreground-950 mb-3">{tHeading}</h2>
          <p className="text-[15px] text-foreground-500 max-w-[480px] leading-relaxed">{tSub}</p>
        </div>

        {/* ── MOBILE / TABLET: simple 1-col stack ── */}
        <div className="flex flex-col gap-8 lg:hidden">
          {execs.map((exec, i) => (
            <ExecCard key={exec.id} exec={exec} idx={i} />
          ))}
        </div>

        {/* ── DESKTOP (lg+): staggered rows with ghost numerals ── */}
        <div className="hidden lg:flex flex-col gap-10">
          {execs.map((exec, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <div
                key={exec.id}
                className="relative"
                style={{
                  marginRight: imageLeft ? '96px' : undefined,
                  marginLeft:  imageLeft ? undefined : '96px',
                }}
              >
                {/* Ghost numeral */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-46px',
                    [imageLeft ? 'right' : 'left']: '-96px',
                    fontSize: '168px',
                    fontWeight: 900,
                    lineHeight: 0.7,
                    letterSpacing: '-0.06em',
                    color: 'oklch(0.16 0.006 118 / 0.05)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 0,
                  }}
                >
                  0{i + 1}
                </div>

                {/* Two-col card */}
                <div
                  className="relative z-10 grid border border-[oklch(0.885_0.004_110)] overflow-hidden"
                  style={{ gridTemplateColumns: imageLeft ? '0.86fr 1.14fr' : '1.14fr 0.86fr' }}
                >
                  {/* Portrait */}
                  <div
                    className="relative"
                    style={{ minHeight: '520px', order: imageLeft ? 1 : 2, backgroundColor: 'oklch(0.13 0.005 118)' }}
                  >
                    <img
                      src={exec.image}
                      alt={exec.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute top-5 left-5 bg-primary-500 text-foreground-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      {exec.eyebrow}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-[clamp(28px,3.5vw,44px)] font-black text-white leading-none tracking-tight">{exec.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-black text-white">{exec.title}</span>
                        <span className="w-1 h-1 bg-primary-500 flex-shrink-0" />
                        <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{exec.tenure}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text panel */}
                  <div
                    className="flex flex-col justify-between"
                    style={{ padding: '64px 56px', order: imageLeft ? 2 : 1, backgroundColor: 'oklch(0.975 0.002 110)' }}
                  >
                    <div>
                      <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        {String(i + 1).padStart(2, '0')} / {String(execs.length).padStart(2, '0')}
                      </div>
                      <blockquote
                        className="font-black leading-[1.28] mb-7"
                        style={{ fontSize: '31px', letterSpacing: '-0.02em', color: 'oklch(0.16 0.006 118)' }}
                      >
                        {exec.pullQuote}
                      </blockquote>
                      <p className="text-sm leading-relaxed mb-8" style={{ color: 'oklch(0.48 0.006 260)' }}>{exec.bio}</p>
                      <div className="grid grid-cols-2" style={{ borderTop: '1px solid oklch(0.885 0.004 110)' }}>
                        {exec.metrics.map((m, mi) => (
                          <div
                            key={m.label}
                            className="px-4 py-3.5"
                            style={mi === 0 ? { borderRight: '1px solid oklch(0.885 0.004 110)' } : undefined}
                          >
                            <div className="text-xl font-black text-primary-500 leading-none">{m.value}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider mt-1.5" style={{ color: 'oklch(0.62 0.006 260)' }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-end pt-6 mt-6" style={{ borderTop: '1px solid oklch(0.885 0.004 110)' }}>
                      <a
                        href={exec.linkedin}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.06em] text-primary-500 hover:text-foreground-950 transition-colors"
                      >
                        <i className="ri-linkedin-fill text-base" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA — identical to original */}
        <div id="kontakt" className="sonic-container mt-8 md:mt-10">
          <div className="border border-[#E7E4D4] py-6 md:py-7 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5]">
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-[15px] font-black text-foreground-950 leading-relaxed">
                Lass uns besprechen, wie Sonic deine{' '}
                <span className="text-primary-500">Marke unterstützen kann.</span>
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
