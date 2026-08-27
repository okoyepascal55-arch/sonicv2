import { useSEO } from '@/hooks/useSEO';
import { useRef } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenDivider from '@/components/base/WoodenDivider';
import SRTHero from './components/SRTHero';
import TheProblem from './components/TheProblem';
import Features from './components/Features';
import VideoShowcase from './components/VideoShowcase';
import FunctionalityOverview from './components/FunctionalityOverview';
import EmployeeApp from './components/EmployeeApp';
import DataPaths from './components/DataPaths';
import Zusammenarbeit from './components/Zusammenarbeit';
import Proof from './components/Proof';
import Industries from './components/Industries';
import PricingAndAccess from './components/PricingAndAccess';
import LeistungenPageNav from '../../components/feature/LeistungenPageNav';

const NAV_ITEMS = [
  { id: 'das-problem', label: 'Das Problem', icon: 'ri-error-warning-line' },
  { id: 'features', label: 'All-in-Software', icon: 'ri-apps-line' },
  { id: 'srt-in-aktion', label: 'In Aktion', icon: 'ri-play-circle-line' },
  { id: 'funktionsumfang', label: 'Funktionsumfang', icon: 'ri-list-check-2' },
  { id: 'team-app', label: 'Team-App', icon: 'ri-smartphone-line' },
  { id: 'zusammenarbeit', label: 'Zusammenarbeit', icon: 'ri-git-merge-line' },
  { id: 'datenfluss', label: 'Datenfluss', icon: 'ri-flow-chart' },
  { id: 'branchen', label: 'Branchen', icon: 'ri-building-line' },
  { id: 'kundenstimmen', label: 'Kundenstimmen', icon: 'ri-chat-quote-line' },
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
  const { images: srtFeatureIcons } = useMediaStore('srt_feature_icons');

  return (
    <div className="bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      {/* Hero */}
      <div ref={heroRef} id="overview">
        <SRTHero onScrollToFeatures={() => {
          const el = document.getElementById('features');
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
        }} />
      </div>

      <WoodenDivider />

      {/* Problem */}
      <div id="das-problem"><TheProblem /></div>

      <WoodenDivider />

      {/* Features */}
      <div id="features"><Features featureIcons={srtFeatureIcons} /></div>

      <WoodenDivider />

      {/* Video showcase */}
      <div id="srt-in-aktion"><VideoShowcase /></div>

      <WoodenDivider />

      {/* Function overview */}
      <div id="funktionsumfang"><FunctionalityOverview /></div>

      <WoodenDivider />

      {/* Employee app */}
      <div id="team-app"><EmployeeApp /></div>

      <WoodenDivider />

      {/* Collaboration process */}
      <div id="zusammenarbeit"><Zusammenarbeit /></div>

      <WoodenDivider />

      {/* Data flow */}
      <div id="datenfluss"><DataPaths /></div>

      <WoodenDivider />

      {/* Industries + Config */}
      <div id="branchen"><Industries /></div>

      <WoodenDivider />

      {/* Social proof */}
      <div id="kundenstimmen"><Proof /></div>

      <WoodenDivider />

      {/* Pricing + Access — combined */}
      <div id="preise-zugang"><PricingAndAccess /></div>
    </div>
  );
}