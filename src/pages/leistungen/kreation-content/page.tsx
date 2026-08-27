import { useEffect, useRef, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import Carousel3DReference from './components/Carousel3DReference';
import KreationShowcaseReference from './components/KreationShowcaseReference';
import KreationHeroStats from './components/KreationHeroStats';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const fallbackIcon = (a: string, b: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`)}`;

const SOLUTIONS = [
  { num: '01', title: '(Kampagnen-)Konzeption', desc: 'Wir arbeiten heraus, wofür deine Marke steht und wie begeisternder Content aussehen könnte. From scratch oder adaptiert von deiner globalen Strategie.', tags: ['Strategie', 'Konzept', 'Kampagne'], fallback: fallbackIcon('#3a3320', '#17160f') },
  { num: '02', title: 'Content Creation & Design', desc: 'Wir erstellen die Vorlagen für die Realisierung: Gestaltung plus Briefings / Texte / Scripts. Für Print / Packaging / POS, Digital / Shop, Social / Video.', tags: ['Design', 'Print', 'Digital'], fallback: fallbackIcon('#20323a', '#0f1517') },
  { num: '03', title: 'Foto- & Video-Produktion', desc: 'Produktfotos und -filme, 3D / CGI / AI, Social Clips, Lifestyle-Shots, Event-Dokus, Imagefilme — in eigenen Studios und on Location.', tags: ['Foto', 'Video', 'CGI'], fallback: fallbackIcon('#2b3a20', '#12160e') },
  { num: '04', title: 'Asset-Produktion', desc: 'Post Production, Reinzeichnungen, Druck, Möbel- und Messebau, Content einpflegen / ausspielen.', tags: ['Post-Pro', 'Druck', 'Rollout'], fallback: fallbackIcon('#302038', '#141118') },
];

const CHALLENGES: ChallengeItem[] = [
  { icon: 'ri-puzzle-line', title: 'Wenig Added Value', desc: 'Social Content, How-to-Videos, POS-Branding, Events: Oft aus verschiedenen Quellen, und nicht immer optimal aufeinander abgestimmt.', trigger: 'Auch bei euch so?' },
  { icon: 'ri-contrast-2-line', title: 'Uneinheitlicher Look', desc: 'Unterschiedliche Teams, Designer, Locations, Presenter, Herangehensweisen: Der Content wirkt nicht wie aus einem Guss.', trigger: 'Klingt vertraut?' },
  { icon: 'ri-time-line', title: 'Koordinationsaufwand', desc: 'Schwierig: Verschiedene Content-Lieferanten so zu koordinieren, dass die richtigen Botschaften zum richtigen Zeitpunkt fertig sind.', trigger: 'Schon frustriert?' },
];

const DISCIPLINES = [
  { label: 'Kreation', fallback: fallbackIcon('#3a3320', '#17160f') },
  { label: 'Produktion', fallback: fallbackIcon('#2b3a20', '#12160e') },
  { label: 'CGI & 3D', fallback: fallbackIcon('#302038', '#141118') },
];

const NAV_ITEMS = [
  { id: 'herausforderung', label: 'Herausforderung', icon: 'ri-alert-line' },
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'konzept', label: 'Konzept & Kreation', icon: 'ri-palette-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function KreationContentPage() {
  const { images: solutionWoodIcons } = useMediaStore('leistungen_kreation_solution_wood_icons');
  const { images: disciplineWoodIcons } = useMediaStore('leistungen_kreation_discipline_wood_icons');
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [solutionVisible, setSolutionVisible] = useState(false);

  const tChallengeHeading = useText('leistungen_kreation_content', 'kreation-challenge-heading', 'Content aus zu vielen Einzelteilen.');
  const tChallengeSub = useText('leistungen_kreation_content', 'kreation-challenge-sub', 'Assets kommen oft aus verschiedenen Quellen.');
  const tSolutionHeading = useText('leistungen_kreation_content', 'kreation-solution-heading', 'Content aus einer Hand. Inhouse.');
  const tSolutionSub = useText('leistungen_kreation_content', 'kreation-solution-sub', 'Von Kampagnenkonzept bis Design und Roll-out, von Fotografie bis zu (Live) Video.');
  const tCtaBtn = useText('leistungen_kreation_content', 'kreation-cta-btn', 'Content-Beratung buchen');
  const tHeroBadge = useText('leistungen_kreation', 'kreation-hero-badge', 'Inhouse Kreation & Content');
  const tHeroH1Line1 = useText('leistungen_kreation', 'kreation-hero-heading-line1', 'Kreation,');
  const tHeroH1Accent = useText('leistungen_kreation', 'kreation-hero-heading-accent', 'die verkauft.');
  const tHeroSubtitle = useText('leistungen_kreation', 'kreation-hero-subtitle', 'Von Kampagnenkonzept bis Rollout — Foto, Video, CGI und POS-Design aus einer Hand.');

  useSEO({
    title: 'Kreation & Content | Sonic Group — Inhouse Foto, Video & CGI DACH',
    description: 'Kreation & Content von Sonic Group: Inhouse Foto- und Videoproduktion, CGI & 3D, Social Content und POS-Design für Marken im DACH-Raum. Alles aus einer Hand.',
    keywords: 'Content Produktion DACH, Inhouse Studio, CGI 3D Produktion, POS Design, Social Content Agentur',
    canonical: 'https://sonic-group.de/leistungen/kreation-content',
    ogTitle: 'Kreation & Content — Sonic Group DACH',
    ogDescription: 'Inhouse Foto, Video, CGI & POS-Design für Marken im DACH-Raum.',
  });

  useEffect(() => {
    const el = solutionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setSolutionVisible(true); }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getSolutionIcon = (index: number) => solutionWoodIcons[index]?.url ? resolveImageUrl(solutionWoodIcons[index].url) : SOLUTIONS[index].fallback;
  const resolvedDisciplines = DISCIPLINES.map((item, i) => ({ ...item, src: disciplineWoodIcons[i]?.url ? resolveImageUrl(disciplineWoodIcons[i].url) : item.fallback }));

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <section className="relative w-full overflow-hidden bg-white pb-[60px]" style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: 1000, height: 600, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,212,0,0.09) 0%, transparent 65%)' }} />
          <div className="relative z-10 w-full sonic-container px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-8"><span className="text-foreground-950/30 text-xs font-bold uppercase tracking-widest">Leistungen</span><i className="ri-arrow-right-s-line text-foreground-950/25 text-sm" /><span className="text-primary-500 text-xs font-black uppercase tracking-widest">Kreation &amp; Content</span></div>
            <div className="mb-10 flex items-center justify-center gap-3"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tHeroBadge}</span></div>
            <h1 className="leist-h1-flagship text-foreground-950 mb-6">{tHeroH1Line1}<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{tHeroH1Accent}</span></h1>
            <p className="text-base md:text-lg text-foreground-950/50 max-w-2xl mx-auto leading-relaxed mb-10">{tHeroSubtitle}</p>
            <KreationHeroStats />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Kreation%20Content%20Beratung`} className="inline-flex items-center gap-2 bg-foreground-950 text-background-50 px-7 py-3 font-black text-sm hover:bg-primary-500 hover:text-foreground-950 transition-colors"><i className="ri-calendar-line" />{tCtaBtn}</a>
              <a href="/leistungen/video" className="inline-flex items-center gap-2 border-2 border-foreground-950/12 text-foreground-950/60 px-6 py-3 font-black text-sm hover:border-foreground-950 hover:text-foreground-950 transition-colors">Live Video<i className="ri-arrow-right-line" /></a>
            </div>
          </div>
          <Carousel3DReference />
        </section>
      </div>

      <section className="sonic-section-md bg-white px-6 border-b border-foreground-950/8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {resolvedDisciplines.map(item => <div key={item.label} className="flex flex-col items-center gap-4 py-4"><img src={item.src} alt={item.label} className="w-16 h-16 object-cover" loading="lazy" /><span className="text-xs font-black text-foreground-950/55 uppercase tracking-widest">{item.label}</span><div className="h-px w-6 bg-primary-500" /></div>)}
        </div>
      </section>

      <ChallengeSection id="herausforderung" headline={tChallengeHeading} subline={tChallengeSub} challenges={CHALLENGES} />
      <WoodenDivider />

      <section id="loesung" className="sonic-section-lg px-4 md:px-6 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 500, height: 500, background: 'oklch(0.81 0.19 115 / 0.08)', filter: 'blur(120px)' }} />
        <div ref={solutionRef} className="sonic-container relative" style={{ opacity: solutionVisible ? 1 : 0, transform: solutionVisible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Die Lösung</span></div><h2 className="leist-h2 text-foreground-950 uppercase mb-3">{tSolutionHeading}</h2><p className="text-foreground-950/50 text-base max-w-2xl">{tSolutionSub}</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOLUTIONS.map((item, i) => { const active = hoveredSolution === i; return <div key={item.num} className={`relative overflow-hidden group ${active ? 'bg-foreground-950 border-primary-500' : 'bg-white border-foreground-950/[0.09]'}`} style={{ minHeight: 280, borderWidth: 1, borderStyle: 'solid' }} onMouseEnter={() => setHoveredSolution(i)} onMouseLeave={() => setHoveredSolution(null)}>
              <div className="relative z-10 p-7"><img src={getSolutionIcon(i)} alt="" className={`w-12 h-12 object-cover mb-6 transition-transform duration-300 ${active ? 'scale-110' : ''}`} /><div className="flex items-center gap-2 mb-3"><span className="font-mono font-black text-xs text-primary-500">{item.num}</span><div className={`flex-1 h-px ${active ? 'bg-primary-500/25' : 'bg-foreground-950/8'}`} /></div><h3 className={`font-black text-base uppercase tracking-wide mb-3 ${active ? 'text-background-50' : 'text-foreground-950'}`}>{item.title}</h3><p className={`text-sm leading-relaxed mb-4 ${active ? 'text-background-50/60' : 'text-foreground-950/55'}`}>{item.desc}</p><div className="flex flex-wrap gap-1.5">{item.tags.map(tag => <span key={tag} className={`text-[9px] font-black px-2 py-0.5 uppercase tracking-widest ${active ? 'text-background-50 bg-primary-500/[0.12] border-primary-500/30' : 'text-foreground-950 bg-primary-500/8 border-primary-500/20'} border`}>{tag}</span>)}</div></div>
            </div>; })}
          </div>
        </div>
      </section>

      <KreationShowcaseReference />
      <WoodenDivider />
      <section id="referenzen"><ClientProof /></section>
      <WoodenDivider />
      <div id="kontakt"><LeistungenKontakt headline="Content-Beratung" headlineAccent="buchen." subline="Wir zeigen dir in 30 Minuten, wie wir im Bereich Kreation und Content arbeiten — von Konzept bis Produktion." checkItems={[{ text: 'Strategische Herangehensweise' }, { text: 'Deine Ziele, unsere Beispiele' }, { text: 'Studio-Tour' }]} ctaLabel="Beratung buchen" ctaMailSubject="Kreation Content Beratung" ctaIcon="ri-calendar-line" /></div>
      <ScrollToTopButton />
    </div>
  );
}
