import { useSEO } from '@/hooks/useSEO';
import { useRef } from 'react';
import SRTHeroReference from './components/SRTHeroReference';
import TheProblemReference from './components/TheProblemReference';
import FeaturesReference from './components/FeaturesReference';
import VideoShowcase from './components/VideoShowcase';
import FunctionalityOverview from './components/FunctionalityOverview';
import EmployeeApp from './components/EmployeeApp';
import DataPaths from './components/DataPaths';
import Zusammenarbeit from './components/Zusammenarbeit';
import Proof from './components/Proof';
import Industries from './components/Industries';
import PricingAndAccess from './components/PricingAndAccess';
import SRTWavyDivider from './components/SRTWavyDivider';
import LeistungenPageNav from '../../components/feature/LeistungenPageNav';
import './srt-final-fidelity.css';

const NAV_ITEMS = [
  { id: 'das-problem', label: 'Das Problem', icon: 'ri-error-warning-line' },
  { id: 'features', label: 'All-in-Software', icon: 'ri-apps-line' },
  { id: 'srt-in-aktion', label: 'In Aktion', icon: 'ri-play-circle-line' },
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
    title: 'SRT — Sonic Reporting Tool | Echtzeit-Retail-Software für Field Force DACH',
    description: 'Das Sonic Reporting Tool (SRT): Echtzeit-Dashboards, GPS-Tracking, Forecasting und Live-KPIs für Field Force und Retail Activation im DACH-Raum. Jetzt Zugang anfragen.',
    keywords: 'Sonic Reporting Tool, SRT Software, Field Force Tracking, Retail Echtzeit Dashboard, Promoter Software',
    canonical: 'https://sonic-group.de/srt',
    ogTitle: 'SRT — Sonic Reporting Tool für Retail Activation',
    ogDescription: 'Echtzeit-Dashboards, GPS-Tracking & Forecasting für Field Force im DACH-Raum.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />
      <div ref={heroRef} id="overview"><SRTHeroReference /></div>
      <SRTWavyDivider darkBackground />
      <TheProblemReference />
      <SRTWavyDivider />
      <FeaturesReference />
      <SRTWavyDivider darkBackground />
      <VideoShowcase />
      <SRTWavyDivider />
      <FunctionalityOverview />
      <SRTWavyDivider darkBackground />
      <EmployeeApp />
      <SRTWavyDivider darkBackground />
      <Zusammenarbeit />
      <SRTWavyDivider />
      <DataPaths />
      <SRTWavyDivider darkBackground />
      <Industries />
      <SRTWavyDivider darkBackground />
      <Proof />
      <SRTWavyDivider darkBackground />
      <PricingAndAccess />
    </div>
  );
}
