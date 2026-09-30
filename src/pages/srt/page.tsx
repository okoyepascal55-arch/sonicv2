import { useSEO } from '@/hooks/useSEO';
import { useRef } from 'react';
import { useReviewText } from '@/hooks/useReviewText';
import SRTHeroReference from './components/SRTHeroReference';
import TheProblemReference from './components/TheProblemReference';
import FeaturesReference from './components/FeaturesReference';
import ProductShowcase from './components/ProductShowcase';
import FunctionalityOverview from './components/FunctionalityOverview';
import DataPaths from './components/DataPaths';
import Zusammenarbeit from './components/Zusammenarbeit';
import Proof from './components/Proof';
import Industries from './components/Industries';
import PricingAndAccess from './components/PricingAndAccess';
import JoergQuote from './components/JoergQuote';
import SRTWavyDivider from './components/SRTWavyDivider';
import LeistungenPageNav from '../../components/feature/LeistungenPageNav';
import './srt-final-fidelity.css';

const NAV_ITEMS = [
  { id: 'das-problem', label: 'Das Problem', icon: 'ri-error-warning-line' },
  { id: 'features', label: 'All-in-Software', icon: 'ri-apps-line' },
  { id: 'funktionsumfang', label: 'Funktionsumfang', icon: 'ri-list-check-2' },
  { id: 'team-app', label: 'Team-App', icon: 'ri-smartphone-line' },
  { id: 'zusammenarbeit', label: 'Zusammenarbeit', icon: 'ri-git-merge-line' },
  { id: 'datenfluss', label: 'Datenfluss', icon: 'ri-flow-chart' },
  { id: 'branchen', label: 'Branchen', icon: 'ri-building-line' },
  { id: 'srt-proof', label: 'SRT in Zahlen', icon: 'ri-bar-chart-2-line' },
  { id: 'preise-zugang', label: 'Zugang', icon: 'ri-key-2-line' },
];

export default function SRTPage() {
  useSEO({
    title: 'SRT — Sonic Reporting Tool | Field-Force-Software für Retail seit 2008',
    description: 'Das Sonic Reporting Tool (SRT): seit 2008 im Einsatz, über 21 Versionen, über 1,3 Mio. erledigte Einsätze. Live-Daten, Einsatzplanung, Document Intelligence und individuelle Reportings (PowerPoint, Excel, SQL) für die Retail- und Field-Force-Projekte von Sonic.',
    keywords: 'Sonic Reporting Tool, SRT Software, Field Force Software, Retail Reporting, Live-Dashboard Retail, Außendienst Steuerung, Einsatzplanung Promoter, Retail Analytics, Document Intelligence, Field Marketing Software, POS Reporting Tool, Promoter App',
    canonical: 'https://sonic-group.de/srt',
    ogTitle: 'SRT — Sonic Reporting Tool für Retail & Field Force',
    ogDescription: 'Seit 2008, über 21 Versionen: das Tool, mit dem Sonic seine Einsätze im Handel steuert — mit Live-Daten und individuellen Reportings für Kunden.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'SRT', item: 'https://sonic-group.de/srt' },
      ]},
      { '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'Sonic Reporting Tool (SRT)', applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Das Sonic Reporting Tool (SRT) — seit 2008, über 21 Versionen: Einsatzplanung, Live-Dashboards, Document Intelligence und individuelle Reportings für Retail- und Field-Force-Projekte.',
        offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' }},
        featureList: ['Live-Dashboards', 'Einsatz- und Aufgabenplanung', 'Fotos und GPS-Koordinaten', 'Document Intelligence', 'Individuelle Reportings (PowerPoint, Excel, SQL)'],
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);
  // Dashboard → Text → SRT → „SRT — Seitennavigation“
  const navText = useReviewText('srt_nav');
  const navItems = NAV_ITEMS.map((item) => ({ ...item, label: navText[item.id] || item.label }));

  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <LeistungenPageNav items={navItems} heroRef={heroRef} />
      <div ref={heroRef} id="overview"><SRTHeroReference /></div>
      <SRTWavyDivider darkBackground />
      <TheProblemReference />
      <SRTWavyDivider />
      <FeaturesReference />
      <SRTWavyDivider />
      <ProductShowcase />

      <FunctionalityOverview />
      <SRTWavyDivider darkBackground />
      <Zusammenarbeit />
      <SRTWavyDivider />
      <DataPaths />
      <SRTWavyDivider darkBackground />
      <Industries />
      <SRTWavyDivider />
      <Proof />
      <SRTWavyDivider darkBackground />
      <JoergQuote />
      <SRTWavyDivider />
      <PricingAndAccess />
    </div>
  );
}
