import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '@/components/base/WoodenDivider';
import KarriereHero from './components/KarriereHero';
import KarriereStatsTicker from './components/KarriereStatsTicker';
import KarriereInPageNav from './components/KarriereInPageNav';
import KarrierepfadeSection from './components/KarrierepfadeSection';
import KarriereCulture from './components/KarriereCulture';
import KarriereAwards from './components/KarriereAwards';
import SonicFamily from './components/SonicFamily';
import SonicTeamEvents from './components/SonicTeamEvents';
import CareerShowcase from './components/CareerShowcase';
import KarriereJobs from './components/KarriereJobs';

function MobileStickyCta() {
  const scrollToJobs = () => {
    const el = document.getElementById('stellenangebote');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(22px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
        borderTop: '1px solid oklch(var(--foreground-950) / 0.1)',
      }}
    >
      <button
        onClick={scrollToJobs}
        className="w-full h-[52px] flex items-center justify-center gap-2.5 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-[0.12em] cursor-pointer"
      >
        <i className="ri-briefcase-line text-base" />
        Stellenangebote
      </button>
    </div>
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
    <div className="min-h-[100dvh] bg-white pb-[76px] lg:pb-0">
      <main id="main-content">
        {/* In-Page chapter rail */}
        <KarriereInPageNav heroRef={heroRef} />

        {/* Hero (00) */}
        <div ref={heroRef}>
          <KarriereHero />
        </div>
        <KarriereStatsTicker />

        {/* Dark-bg WoodenDivider — hero(dark) exit into 01(light) */}
        <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

        {/* 01 — Zwei Wege */}
        <KarrierepfadeSection />

        <WoodenDivider />

        {/* 02 — Kultur & DNA */}
        <KarriereCulture />

        <WoodenDivider />

        {/* 03 — Ausgezeichnet */}
        <KarriereAwards />

        {/* Dark-bg WoodenDivider — 03(dark) exit into 04(light) */}
        <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

        {/* 04 — Geschichten */}
        <SonicFamily />

        <WoodenDivider />

        {/* 05 — Leben bei Sonic */}
        <SonicTeamEvents />
        <CareerShowcase />

        <WoodenDivider />

        {/* 06 — Stellen */}
        <KarriereJobs />
      </main>

      {/* Mobile sticky CTA */}
      <MobileStickyCta />
    </div>
  );
}
