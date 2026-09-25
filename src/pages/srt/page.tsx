import { useSEO } from '@/hooks/useSEO';
import { useRef } from 'react';
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
  { id: 'preise-zugang', label: 'Preise & Zugang', icon: 'ri-price-tag-3-line' },
];

export default function SRTPage() {
  useSEO({
    title: 'SRT — Sonic Reporting Tool | Field Force Software für Echtzeit-Retail-Steuerung DACH',
    description: 'Das Sonic Reporting Tool (SRT): Echtzeit-Dashboards, GPS-Einsatzplanung, KI-gestütztes Forecasting und automatische Berichte für den Außendienst. Die Retail-Software, die Sonic intern für über 2.000 Promoter nutzt — jetzt für Partnermarken verfügbar.',
    keywords: 'Sonic Reporting Tool, SRT Software, Field Force Software, Retail Echtzeit Dashboard, Außendienst Steuerung, GPS Tracking Promoter, Retail Analytics, KI Forecasting Retail, Sell-Out Prognose, Field Marketing Software Germany, Retail Intelligence DACH, POS Reporting Tool, Promoter App',
    canonical: 'https://sonic-group.de/srt',
    ogTitle: 'SRT — Sonic Reporting Tool für Retail Field Force',
    ogDescription: 'Echtzeit-Dashboards, GPS-Tracking und KI-Forecasting für Field Marketing Teams. Das Tool, das Sonic intern für 2.000+ Promoter nutzt.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'SRT', item: 'https://sonic-group.de/srt' },
      ]},
      { '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'Sonic Reporting Tool (SRT)', applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description: 'Echtzeit-Retail-Management-Software: GPS-Einsatzplanung, Live-Dashboards, Forecasting und Berichtswesen für Field Force Teams.',
        offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' }},
        featureList: ['Echtzeit-Dashboards', 'GPS-Einsatzplanung', 'KI-Forecasting', 'Automatische Berichte', 'Sell-Out Analyse'],
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />
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
