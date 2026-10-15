import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
    title: 'Karriere bei Sonic | Jobs am Campus Krefeld und im POS-Team',
    description: 'Jobs bei Sonic: im Campus-Team in Krefeld oder im POS-Team deutschlandweit. Faire Bezahlung mit Provision und Qualitätsbonus, Schulungen vor jedem Projekt und echte Entwicklungsperspektiven – seit 2007.',
    keywords: 'Karriere Sonic Group, Jobs Sales Marketing Deutschland, Field Promoter Jobs DACH, Brand Ambassador Stelle, Campus Krefeld Jobs, Marketing Agentur Karriere, Sales Jobs Krefeld, Eventmanager Stelle, Retail Experte Jobs, Außendienst Job, Nachwuchs Talente Handel',
    canonical: 'https://sonic-group.de/karriere',
    ogTitle: 'Karriere bei Sonic — Campus Team & POS Team',
    ogDescription: 'Campus-Job in Krefeld oder Einsatz am POS – faire Bezahlung, Schulungen und echte Entwicklungsperspektiven.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Karriere', item: 'https://sonic-group.de/karriere' },
      ]},
      { '@context': 'https://schema.org', '@type': 'EmployerAggregateRating',
        itemReviewed: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        ratingValue: '4.2', bestRating: '5', ratingCount: '54',
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);

  // Arriving with a hash (e.g. /karriere#stellenangebote from the team pages) → scroll there
  const location = useLocation();
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      tries += 1;
      if (el) {
        window.clearInterval(timer);
        const top = el.getBoundingClientRect().top + window.scrollY - 121;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else if (tries > 30) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [location.hash]);

  return (
    <div className="min-h-[100dvh] bg-white pb-[76px] lg:pb-0">
      <div>
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

        {/* 02 — Geschichten */}
        <SonicFamily />

        <WoodenDivider />

        {/* 03 — Kultur & DNA, closing with the ratings (Ausgezeichnet) */}
        <KarriereCulture />
        <KarriereAwards />

        <WoodenDivider />

        {/* 04 — Leben bei Sonic */}
        <SonicTeamEvents />
        <CareerShowcase />

        <WoodenDivider />

        {/* 05 — Stellen */}
        <KarriereJobs />
      </div>

      {/* Mobile sticky CTA */}
      <MobileStickyCta />
    </div>
  );
}
