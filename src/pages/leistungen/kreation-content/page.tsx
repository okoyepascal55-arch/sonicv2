import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import ChallengeSection from '@/components/feature/ChallengeSection';
import KreationFaces from './components/KreationFaces';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import KreationHero from './components/KreationHero';
import KreationProcess from './components/KreationProcess';
import KreationChapters from './components/KreationChapters';
import './kreation-ausstellung.css';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { useCtaText } from '@/hooks/useCtaText';

// Card texts: Dashboard → Text → Kreation & Content — Lösung (Karten)
const SOLUTIONS = [
  { num: '01', fallback: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20concept%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-kreation-sol-bulb-01&orientation=squarish' },
  { num: '02', fallback: 'https://readdy.ai/api/search-image?query=carved%20wooden%20paintbrush%20palette%20design%20creative%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-kreation-sol-palette-02&orientation=squarish' },
  { num: '03', fallback: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20retail%20display%20POS%20shelving%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-kreation-sol-pos-03&orientation=squarish' },
  { num: '04', fallback: 'https://readdy.ai/api/search-image?query=carved%20wooden%20document%20file%20copy%20asset%20production%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-kreation-sol-file-04&orientation=squarish' },
];

const CHALLENGES: ChallengeItem[] = [
  { icon: 'ri-puzzle-line', title: 'Wenig Added Value', desc: 'Social Content, How-to-Videos, POS-Branding, Events: Oft aus verschiedenen Quellen, und nicht immer optimal aufeinander abgestimmt.', trigger: 'Auch bei euch so?' },
  { icon: 'ri-contrast-2-line', title: 'Uneinheitlicher Look', desc: 'Unterschiedliche Teams, Designer, Locations, Presenter, Herangehensweisen: Der Content wirkt nicht wie aus einem Guss.', trigger: 'Klingt vertraut?' },
  { icon: 'ri-time-line', title: 'Koordinationsaufwand', desc: 'Schwierig: Verschiedene Content-Lieferanten so zu koordinieren, dass die richtigen Botschaften zum richtigen Zeitpunkt fertig sind.', trigger: 'Schon frustriert?' },
];
const DISCIPLINES = [
  { label: 'Konzeption', fallback: 'https://readdy.ai/api/search-image?query=wooden%20lightbulb%20idea%20concept%20strategy%20creative%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-konzept-disc-1&orientation=squarish' },
  { label: 'CI & Layout', fallback: 'https://readdy.ai/api/search-image?query=wooden%20grid%20layout%20design%20system%20ci%20branding%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-layout-disc-2&orientation=squarish' },
  { label: 'POS & Rollout', fallback: 'https://readdy.ai/api/search-image?query=wooden%20store%20retail%20display%20pos%20stand%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-pos-disc-3&orientation=squarish' },
];

const NAV_ITEMS = [
  { id: 'herausforderung', label: 'Herausforderung', icon: 'ri-alert-line' },
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'konzept', label: 'Konzept & Kreation', icon: 'ri-palette-line' },
  { id: 'team', label: 'Kreation Team', icon: 'ri-group-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function KreationContentPage() {
  const { images: solutionWoodIcons } = useMediaStore('leistungen_kreation_solution_wood_icons');
  const { images: disciplineWoodIcons } = useMediaStore('leistungen_kreation_discipline_wood_icons');
  const heroRef = useRef<HTMLDivElement>(null);
  const tChallengeHeading = useText('leistungen_kreation_content', 'kreation-challenge-heading', 'Content aus zu vielen Einzelteilen.');
  const tChallengeSub = useText('leistungen_kreation_content', 'kreation-challenge-sub', 'Assets kommen oft aus verschiedenen Quellen.');
  const tCta = useLeistungenText('leistungen_kreation_cta');
  const cta = useCtaText();
  useSEO({
    title: 'Kreation & Content | Sonic Group — Inhouse CI, Layout, POS-Design & Content DACH',
    description: 'Inhouse Kreation von Sonic Group: Von CI-Konzeption und Layout bis POS-Design, Social Content und innovativen Formaten — alles aus einer strategischen Kreativhand für Marken im DACH-Raum. Konsistentes Branding vom Konzept bis zum POS-Display.',
    keywords: 'Content Produktion DACH, Inhouse Studio Krefeld, POS Design Deutschland, Social Content Agentur, CI Konzeption, Layout Markendesign, Kreativagentur DACH, Brand Design Retail, POS Display Design, Campaign Konzeption, Marketing Material Produktion, Visual Identity DACH',
    canonical: 'https://sonic-group.de/leistungen/kreation-content',
    ogTitle: 'Kreation & Content — Inhouse Kreativagentur | Sonic Group DACH',
    ogDescription: 'CI, Layout, POS-Design und Content aus einer Hand — Inhouse-Kreation von Sonic Group für konsistentes Markenmarketing im DACH-Handel.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Kreation & Content', item: 'https://sonic-group.de/leistungen/kreation-content' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'Kreation & Content', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Creative Production / Brand Design / Content Creation',
        areaServed: ['DE','AT','CH'],
      },
    ],
  })

  const solutionIcon = (i: number) => solutionWoodIcons[i]?.url ? resolveImageUrl(solutionWoodIcons[i].url) : SOLUTIONS[i].fallback;
  const disciplineIcon = (i: number) => disciplineWoodIcons[i]?.url ? resolveImageUrl(disciplineWoodIcons[i].url) : DISCIPLINES[i].fallback;
  // Chapter index marks: the Disziplinen icons (Konzeption, CI & Layout, POS & Rollout) plus the matching Lösung icons
  const indexIcons = {
    konzeption: disciplineIcon(0),
    innovation: solutionIcon(3),
    ci: disciplineIcon(1),
    layout: solutionIcon(1),
    pos: disciplineIcon(2),
  };

  return (
    <div id="kreation-page" className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />
      <div ref={heroRef}><KreationHero /></div>
      {/* Dark hero → dark Herausforderung: one wooden divider on dark */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>
      <ChallengeSection id="herausforderung" headline={tChallengeHeading} subline={tChallengeSub} challenges={CHALLENGES} />
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>
      <KreationProcess fallbackIcons={SOLUTIONS.map((s) => s.fallback)} />
      <KreationChapters indexIcons={indexIcons} />
      <KreationFaces />
      <section id="referenzen"><ClientProof only={['nexaro', 'vorwerk']} /></section>
      <WoodenDivider />
      <div><LeistungenKontakt headline={tCta['headline']} headlineAccent={tCta['headline-accent']} subline={tCta['subline']} ctaLabel={cta.book} ctaMailSubject="Kreation Content Beratung" ctaIcon="ri-calendar-line" /></div>
      <ScrollToTopButton />
    </div>
  );
}
