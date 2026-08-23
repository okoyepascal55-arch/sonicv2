import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import KarriereHero from './components/KarriereHero';
import KarriereJobs from './components/KarriereJobs';
import KarriereCulture from './components/KarriereCulture';
import KarrierepfadeSection from './components/KarrierepfadeSection';
import SonicFamily from './components/SonicFamily';
import SonicTeamEvents from './components/SonicTeamEvents';
import KarriereAwards from './components/KarriereAwards';
import KarriereInPageNav from './components/KarriereInPageNav';

function StickyCta() {
  const scrollToJobs = () => {
    const el = document.getElementById('stellenangebote');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      onClick={scrollToJobs}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[200] bg-primary-500 text-foreground-950 font-bold text-xs sm:text-[13px] px-4 sm:px-6 py-2.5 sm:py-3.5 hover:bg-white transition-all duration-200 cursor-pointer whitespace-nowrap"
      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
    >
      <span className="flex items-center gap-2">
        <i className="ri-briefcase-line text-sm" />
        Stellenangebote
      </span>
    </button>
  );
}

export default function CareersGatewayPage() {
  useSEO({
    title: 'Karriere | Sonic Group — Jobs in Sales & Field Promotion DACH',
    description: 'Karriere bei Sonic Group: Interne Sales-Positionen in Krefeld oder flexible Field-Promotion-Jobs im DACH-Raum. Menschen mit Energie gesucht. Jetzt bewerben.',
    keywords: 'Karriere Sonic Group, Jobs Retail Promotion, Sales Jobs Deutschland, Field Promoter Jobs DACH, Stellenangebote Krefeld',
    canonical: 'https://sonic-group.de/karriere',
    ogTitle: 'Karriere bei Sonic Group — Menschen mit Energie gesucht',
    ogDescription: 'Zeige was du kannst. Interne Sales-Karriere am Campus Krefeld oder flexibler Field-Einsatz im DACH-Raum.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] bg-white">
      <main id="main-content">
        {/* In-Page Navigation */}
        <KarriereInPageNav heroRef={heroRef} />

        {/* Hero */}
        <div ref={heroRef}>
          <KarriereHero />
        </div>

        <WoodenDivider />

        {/* Kultur & Werte */}
        <KarriereCulture />

        <WoodenDivider />

        {/* Stellenangebote */}
        <KarriereJobs />

        <WoodenDivider />

        {/* Karrierepfade */}
        <KarrierepfadeSection />

        <WoodenDivider />

        {/* Sonic Spirit & Faces */}
        <SonicFamily />

        <WoodenDivider />

        {/* Leben bei Sonic */}
        <SonicTeamEvents />

        <WoodenDivider />

        {/* Ausgezeichnet */}
        <KarriereAwards />
      </main>

      {/* Sticky CTA */}
      <StickyCta />
    </div>
  );
}