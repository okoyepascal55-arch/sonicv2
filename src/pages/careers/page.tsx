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
    description: 'Jobs bei Sonic Group: Sales & Marketing am Campus Krefeld oder Field Promotion DACH-weit. Brand Ambassadors, Promoter, Event Manager, Sales Manager — Jetzt bewerben.',
    keywords: 'Karriere Sonic Group, Jobs Sales Marketing Deutschland, Field Promoter Jobs DACH, Brand Ambassador Stelle, Promoter Stellenangebote, Event Manager Jobs, Stellenangebote Krefeld, retail jobs Europe, marketing jobs Germany, promotional staff agency DACH, Promotionjob, Eventjob Deutschland, Außendienst Jobs NRW',
    canonical: 'https://sonic-group.de/karriere',
    ogTitle: 'Karriere bei Sonic Group — Dein Job in Sales & Brand Activation',
    ogDescription: 'Intern am Campus Krefeld oder flexibel im DACH-Einsatz: Wir suchen Menschen mit Energie für Sales, Events & Brand Activation.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://sonic-group.de/karriere',
        'name': 'Karriere bei Sonic Group',
        'description': 'Jobs und Karrieremöglichkeiten bei Sonic Group in Sales, Marketing, Events und Field Promotion',
        'url': 'https://sonic-group.de/karriere',
        'isPartOf': { '@id': 'https://sonic-group.de/#website' },
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Sonic Group', 'item': 'https://sonic-group.de' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Karriere', 'item': 'https://sonic-group.de/karriere' },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        'title': 'Field Promoter / Brand Ambassador DACH',
        'description': 'Flexible Einsätze für Top-Marken im DACH-Raum: Promotion, Verkauf, Beratung am POS. Für Einsteiger und Erfahrene.',
        'datePosted': '2026-09-01',
        'validThrough': '2026-12-31',
        'employmentType': 'PART_TIME',
        'hiringOrganization': { '@type': 'Organization', 'name': 'Sonic Group', 'sameAs': 'https://sonic-group.de' },
        'jobLocation': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'addressCountry': 'DE' } },
        'baseSalary': { '@type': 'MonetaryAmount', 'currency': 'EUR', 'value': { '@type': 'QuantitativeValue', 'unitText': 'HOUR' } },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        'title': 'Sales Manager / Inhouse-Karriere Krefeld',
        'description': 'Interne Sales- und Projektmanagement-Position am Campus Krefeld. Aufstiegsmöglichkeiten, Hybridarbeit, Top-Unternehmenskultur.',
        'datePosted': '2026-09-01',
        'validThrough': '2026-12-31',
        'employmentType': 'FULL_TIME',
        'hiringOrganization': { '@type': 'Organization', 'name': 'Sonic Group', 'sameAs': 'https://sonic-group.de' },
        'jobLocation': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'streetAddress': 'Campus Fichtenhain 46', 'addressLocality': 'Krefeld', 'postalCode': '47807', 'addressCountry': 'DE' } },
      },
    ],
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
