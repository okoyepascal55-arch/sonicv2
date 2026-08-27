import { useRef, useEffect, useState, useCallback } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import KreationShowcase from './components/KreationShowcase';
import Carousel3D from './components/Carousel3D';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

// Placeholder icon art — inline SVG gradient (works as <img src>) until a real wood icon is set via the dashboard.
const svgGradient = (hexA: string, hexB: string, size = 112) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hexA}"/><stop offset="1" stop-color="${hexB}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  )}`;

const FALLBACK_KREATION_SOLUTION_ICONS = [
  svgGradient('#3a3320', '#17160f'),
  svgGradient('#20323a', '#0f1517'),
  svgGradient('#2b3a20', '#12160e'),
  svgGradient('#302038', '#141118'),
];

const NAV_ITEMS = [
  { id: 'herausforderung', label: 'Herausforderung', icon: 'ri-alert-line' },
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'konzept', label: 'Konzept & Kreation', icon: 'ri-palette-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

const KREATION_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-puzzle-line',
    title: 'Wenig Added Value',
    desc: 'Social Content, How-to-Videos, POS-Branding, Events: Oft aus verschiedenen Quellen, und nicht immer optimal aufeinander abgestimmt.',
    trigger: 'Auch bei euch so?',
  },
  {
    icon: 'ri-contrast-2-line',
    title: 'Uneinheitlicher Look',
    desc: 'Unterschiedliche Teams, Designer, Locations, Presenter, Herangehensweisen: Der Content wirkt nicht wie aus einem Guss.',
    trigger: 'Klingt vertraut?',
  },
  {
    icon: 'ri-time-line',
    title: 'Koordinationsaufwand',
    desc: 'Schwierig: Verschiedene Content-Lieferanten so zu koordinieren, dass die richtigen Botschaften zum richtigen Zeitpunkt fertig sind.',
    trigger: 'Schon frustriert?',
  },
];

const SOLUTIONS = [
  {
    woodIcon: svgGradient('#3a3320', '#17160f'),
    num: '01',
    title: '(Kampagnen-)Konzeption',
    desc: 'Wir arbeiten heraus, wofür deine Marke steht und wie begeisternder Content aussehen könnte. From scratch oder adaptiert von deiner globalen Strategie.',
    tags: ['Strategie', 'Konzept', 'Kampagne'],
  },
  {
    woodIcon: svgGradient('#20323a', '#0f1517'),
    num: '02',
    title: 'Content Creation & Design',
    desc: 'Wir erstellen die Vorlagen für die Realisierung: Gestaltung plus Briefings / Texte / Scripts. Für Print / Packaging / POS, Digital / Shop, Social / Video.',
    tags: ['Design', 'Print', 'Digital'],
  },
  {
    woodIcon: svgGradient('#2b3a20', '#12160e'),
    num: '03',
    title: 'Foto- & Video-Produktion',
    desc: 'Produktfotos und -filme, 3D / CGI / AI, Social Clips, Lifestyle-Shots, Event-Dokus, Imagefilme — in eigenen Studios und on Location.',
    tags: ['Foto', 'Video', 'CGI'],
  },
  {
    woodIcon: svgGradient('#302038', '#141118'),
    num: '04',
    title: 'Asset-Produktion',
    desc: 'Post Production, Reinzeichnungen, Druck, Möbel- und Messebau, Content einpflegen / ausspielen.',
    tags: ['Post-Pro', 'Druck', 'Rollout'],
  },
];

const STATS = [
  { val: 480, suffix: '+', label: 'Kampagnen' },
  { val: 12000, suffix: '+', label: 'Assets produziert' },
  { val: 6, suffix: '', label: 'Inhouse-Studios' },
];

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const run = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let startTime: number | null = null;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (start) run();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, run]);

  return count;
}

/* ── Animated stat item ── */
function AnimatedStat({
  val, suffix, label, delay, triggered,
}: {
  val: number; suffix: string; label: string; delay: number; triggered: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [triggered, delay]);
  const count = useCountUp(val, 1400, active);

  return (
    <div className="text-center">
      <div className="text-3xl font-black text-foreground-950 tabular-nums">
        {active ? count.toLocaleString('de-DE') : '0'}{suffix}
      </div>
      <div className="text-foreground-950/30 text-xs font-black uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

const WOOD_ICONS = [
  { img: svgGradient('#3a3320', '#17160f', 120), label: 'Kreation' },
  { img: svgGradient('#2b3a20', '#12160e', 120), label: 'Produktion' },
  { img: svgGradient('#302038', '#141118', 120), label: 'CGI & 3D' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Wooden icons strip with stagger scroll reveal ── */
function WoodIconsStrip({ icons }: { icons: { img: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="sonic-section-md bg-white px-6 border-b border-foreground-950/8">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {icons.map((w, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
              }}
            >
              {/* Icon with subtle lift on hover */}
              <div
                className="w-16 h-16 overflow-hidden group cursor-default"
                style={{
                  borderRadius: 0,
                  transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'; }}
              >
                <img src={w.img} alt={w.label} className="w-full h-full object-cover" loading="lazy" />
              </div>
              {/* Label with animated underline */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-black text-foreground-950/55 uppercase tracking-widest">{w.label}</span>
                {/* Thin lime underline draws in after icon appears */}
                <div
                  style={{
                    height: '1px',
                    background: 'oklch(var(--primary-500))',
                    width: visible ? '24px' : '0px',
                    transition: `width 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 120 + 300}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function KreationContentPage() {
  const { images: solutionWoodIcons } = useMediaStore('leistungen_kreation_solution_wood_icons');
  const { images: disciplineWoodIcons } = useMediaStore('leistungen_kreation_discipline_wood_icons');
  const tChallengeHeading = useText('leistungen_kreation_content', 'kreation-challenge-heading', 'Content aus zu vielen Einzelteilen.');
  const tChallengeSub = useText('leistungen_kreation_content', 'kreation-challenge-sub', 'Assets kommen oft aus verschiedenen Quellen.');
  const tSolutionHeading = useText('leistungen_kreation_content', 'kreation-solution-heading', 'Content aus einer Hand. Inhouse.');
  const tSolutionSub = useText('leistungen_kreation_content', 'kreation-solution-sub', 'Von Kampagnenkonzept bis Design und Roll-out, von Fotografie bis zu (Live) Video.');
  const tCtaBtn = useText('leistungen_kreation_content', 'kreation-cta-btn', 'Content-Beratung buchen');
  const tHeroBadge = useText('leistungen_kreation', 'kreation-hero-badge', 'Inhouse Kreation & Content');
  const tHeroH1Line1 = useText('leistungen_kreation', 'kreation-hero-heading-line1', 'Kreation,');
  const tHeroH1Accent = useText('leistungen_kreation', 'kreation-hero-heading-accent', 'die verkauft.');
  const tHeroSubtitle = useText('leistungen_kreation', 'kreation-hero-subtitle', 'Von Kampagnenkonzept bis Rollout — Foto, Video, CGI und POS-Design aus einer Hand.');
  const heroRef = useRef<HTMLDivElement>(null);
  const solutionScroll = useRef<HTMLDivElement>(null);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const solutionReveal = useReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  const getSolutionWoodIcon = (index: number) => {
    const item = solutionWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_KREATION_SOLUTION_ICONS[index];
  };

  const resolvedDisciplineIcons = WOOD_ICONS.map((w, i) => {
    const item = disciplineWoodIcons[i];
    return { img: item?.url ? resolveImageUrl(item.url) : w.img, label: w.label };
  });

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsTriggered(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useSEO({
    title: 'Kreation & Content | Sonic Group — Inhouse Foto, Video & CGI DACH',
    description: 'Kreation & Content von Sonic Group: Inhouse Foto- und Videoproduktion, CGI & 3D, Social Content und POS-Design für Marken im DACH-Raum. Alles aus einer Hand.',
    keywords: 'Content Produktion DACH, Inhouse Studio, CGI 3D Produktion, POS Design, Social Content Agentur',
    canonical: 'https://sonic-group.de/leistungen/kreation-content',
    ogTitle: 'Kreation & Content — Sonic Group DACH',
    ogDescription: 'Inhouse Foto, Video, CGI & POS-Design für Marken im DACH-Raum.',
  });

  const scrollCards = (ref: React.RefObject<HTMLDivElement>, dir: 'left' | 'right') => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      {/* ── HERO + CAROUSEL — one unified composition on warm background ── */}
      <div ref={heroRef}>
        <section className="relative w-full overflow-hidden min-h-[360px] md:min-h-[520px] bg-white pt-20 pb-[60px]"
        >
          {/* Lime radial glow — very subtle, behind headline */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '1000px',
              height: '600px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(200,212,0,0.09) 0%, transparent 65%)',
            }}
          />

          {/* Hero copy */}
          <div className="relative z-10 w-full sonic-container px-6 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-foreground-950/30 text-xs font-bold uppercase tracking-widest">Leistungen</span>
              <i className="ri-arrow-right-s-line text-foreground-950/25 text-sm"></i>
              <span className="text-primary-500 text-xs font-black uppercase tracking-widest">Kreation &amp; Content</span>
            </div>

            {/* Badge */}
            <div className="mb-10 flex items-center justify-center gap-3">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tHeroBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="leist-h1-flagship text-foreground-950 mb-6">
              {tHeroH1Line1}<br />
              <span className="text-primary-500">{tHeroH1Accent}</span>
            </h1>

            <p className="text-base md:text-lg text-foreground-950/50 max-w-2xl mx-auto leading-relaxed mb-10">
              {tHeroSubtitle}
            </p>

            {/* Stats — count-up on scroll into view */}
            <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-10 mb-12">
              {STATS.map((s, i) => (
                <AnimatedStat
                  key={i}
                  val={s.val}
                  suffix={s.suffix}
                  label={s.label}
                  delay={i * 120}
                  triggered={statsTriggered}
                />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Kreation%20Content%20Beratung`}
                className="inline-flex items-center gap-2 bg-foreground-950 text-background-50 px-7 py-3 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line"></i>{tCtaBtn}
              </a>
              <a
                href="/leistungen/live-video"
                className="inline-flex items-center gap-2 border-2 border-foreground-950/12 text-foreground-950/60 px-6 py-3 font-black hover:border-foreground-950 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
                style={{ borderRadius: 0 }}
              >
                Live Video<i className="ri-arrow-right-line ml-1"></i>
              </a>
            </div>
          </div>

          {/* Carousel — same background, flows directly below copy */}
          <Carousel3D />
        </section>
      </div>

      {/* Wooden icons strip — stagger reveal on scroll */}
      <WoodIconsStrip icons={resolvedDisciplineIcons} />

      {/* ── CHALLENGE — shared dark component ── */}
      <ChallengeSection
        id="herausforderung"
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={KREATION_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── SOLUTION — light warm bg (directly after dark ChallengeSection) ── */}
      <section id="loesung" className="sonic-section-lg px-4 md:px-6 relative overflow-hidden bg-white">
        <div
          ref={solutionReveal.ref}
          className="sonic-container relative"
          style={{
            opacity: solutionReveal.visible ? 1 : 0,
            transform: solutionReveal.visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Die Lösung</span>
              </div>
              <h2 className="leist-h2 text-foreground-950 mb-3">
                {tSolutionHeading}
              </h2>
              <p className="text-foreground-950/50 text-base max-w-2xl">{tSolutionSub}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => scrollCards(solutionScroll, 'left')} className="w-10 h-10 flex items-center justify-center border border-foreground-950/15 text-foreground-950/50 hover:border-foreground-950 hover:text-foreground-950 transition-all duration-200 cursor-pointer" style={{ borderRadius: 0 }}>
                <i className="ri-arrow-left-s-line text-xl" />
              </button>
              <button onClick={() => scrollCards(solutionScroll, 'right')} className="w-10 h-10 flex items-center justify-center border border-foreground-950/15 text-foreground-950/50 hover:border-foreground-950 hover:text-foreground-950 transition-all duration-200 cursor-pointer" style={{ borderRadius: 0 }}>
                <i className="ri-arrow-right-s-line text-xl" />
              </button>
            </div>
          </div>

          <div
            ref={solutionScroll}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SOLUTIONS.map((s, i) => {
              const isHov = hoveredSolution === i;
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 snap-start relative overflow-hidden group cursor-default ${isHov ? 'bg-foreground-950 border border-primary-500/50' : 'bg-white border border-foreground-950/[0.09]'}`}
                  style={{
                    width: 'clamp(280px, 30vw, 360px)',
                    minHeight: '300px',
                    borderRadius: 0,
                    transition: 'background 0.35s ease, border-color 0.35s ease',
                  }}
                  onMouseEnter={() => setHoveredSolution(i)}
                  onMouseLeave={() => setHoveredSolution(null)}
                >
                  <div className="absolute top-0 left-0 right-0 h-0 group-hover:h-[3px] bg-primary-500 transition-all duration-300" />
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[2px] transition-all duration-500 bg-primary-500/70" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary-500/0 group-hover:border-primary-500/60 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary-500/0 group-hover:border-primary-500/60 transition-all duration-300" />
                  <div
                    className={`absolute top-2 right-4 text-7xl font-black pointer-events-none select-none leading-none ${isHov ? 'text-primary-500/8' : 'text-foreground-950/[0.04]'}`}
                  >
                    {s.num}
                  </div>
                  <div className="relative z-10 p-7">
                    <div
                      className={`w-12 h-12 overflow-hidden mb-6 flex-shrink-0 transition-all duration-500 ${isHov ? 'scale-110 -rotate-3' : 'scale-100'}`}
                      style={{
                        borderRadius: 0,
                        transition: 'transform 0.5s ease',
                      }}
                    >
                      <img src={getSolutionWoodIcon(i)} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono font-black text-xs text-primary-500">{s.num}</span>
                      <div className={isHov ? 'flex-1 h-px bg-primary-500/25' : 'flex-1 h-px bg-foreground-950/8'} />
                    </div>
                    <h3 className={`font-black text-base uppercase tracking-wide mb-3 transition-colors duration-300 ${isHov ? 'text-background-50' : 'text-foreground-950'}`}>
                      {s.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${isHov ? 'text-background-50/60' : 'text-foreground-950/55'}`}>
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[9px] font-black px-2 py-0.5 uppercase tracking-widest transition-colors duration-300 ${isHov ? 'text-background-50 bg-primary-500/[0.12] border border-primary-500/30' : 'text-foreground-950 bg-primary-500/8 border border-primary-500/20'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-6">
            {SOLUTIONS.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 h-1 ${i === 0 ? 'w-5 bg-primary-500' : 'w-1.5 bg-foreground-950/15'}`}
                style={{ borderRadius: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bento Showcase */}
      <KreationShowcase />

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Content-Beratung"
          headlineAccent="buchen."
          subline="Wir zeigen dir in 30 Minuten, wie wir im Bereich Kreation und Content arbeiten — von Konzept bis Produktion."
          checkItems={[
            { text: 'Strategische Herangehensweise' },
            { text: 'Deine Ziele, unsere Beispiele' },
            { text: 'Studio-Tour' },
          ]}
          ctaLabel="Beratung buchen"
          ctaMailSubject="Kreation Content Beratung"
          ctaIcon="ri-calendar-line"
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
