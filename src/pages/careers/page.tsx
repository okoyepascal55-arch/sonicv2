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
    title: 'Karriere | Sonic Group — Jobs in Sales, Events & Field Promotion | DACH',
    description: 'Karriere bei Sonic Group: Sales- und Marketing-Jobs am Campus Krefeld oder als Promoter im Field Force Netzwerk DACH-weit. Festanstellung, echte Entwicklungsperspektiven und wettbewerbsfähige Vergütung für Promoter, Brand Manager und Sales Experten.',
    keywords: 'Karriere Sonic Group, Jobs Sales Marketing Deutschland, Field Promoter Jobs DACH, Brand Ambassador Stelle, Promoter Festanstellung, Campus Krefeld Jobs, Marketing Agentur Karriere, Sales Jobs Krefeld, Eventmanager Stelle, Retail Experte Jobs, Außendienst Job, Nachwuchs Talente Handel',
    canonical: 'https://sonic-group.de/karriere',
    ogTitle: 'Karriere bei Sonic Group — Jobs in Sales, Brand Activation & Field Force',
    ogDescription: 'Festanstellung als Promoter oder Campus-Job in Krefeld — echte Entwicklungsperspektiven im DACH-Retail.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Karriere', item: 'https://sonic-group.de/karriere' },
      ]},
      { '@context': 'https://schema.org', '@type': 'EmployerAggregateRating',
        itemReviewed: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        ratingValue: '4.5', bestRating: '5', ratingCount: '150',
      },
    ],
  })

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
