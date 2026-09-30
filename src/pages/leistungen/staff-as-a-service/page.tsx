import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useLeistungenText, splitList } from '@/hooks/useLeistungenText';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import StaffHero from './components/StaffHero';
import StaffContent from './components/StaffContent';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'ablauf', label: 'Ablauf', icon: 'ri-route-line' },
  { id: 'aufgabenbereiche', label: 'Aufgabenbereiche', icon: 'ri-focus-3-line' },
  { id: 'socks', label: 'S.O.C.K.S.', icon: 'ri-award-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function StaffAsAServicePage() {
  useSEO({
    title: 'Staff as a Service | Sonic Group — Promoter:innen & Field Force aus dem Talentpool',
    description: 'Staff as a Service von Sonic Group: Recruiting, Onboarding, Payroll und Steuerung aus einer Hand. Über 1.800 aktive Menschen im Talentpool, 200+ Promoter:innen im Einsatz — per kurzfristiger Beschäftigung, befristeter Teil-/Vollzeit oder Arbeitnehmerüberlassung.',
    keywords: 'Staff as a Service, Retail Staffing DACH, Promoter Deutschland, Brand Ambassador Agentur, Field Force Germany, Außendienst Mitarbeiter, Personaldienstleister Promotion, Promoter Pool, Eventpersonal DACH, Retail Experten, Sales Promoter vermitteln, Messepersonal, Hostess Agentur',
    canonical: 'https://sonic-group.de/leistungen/staff-as-a-service',
    ogTitle: 'Staff as a Service — Promoter:innen & Brand Ambassadors | Sonic Group',
    ogDescription: 'Recruiting, Payroll und Steuerung aus einer Hand: über 1.800 Menschen im Talentpool, 200+ Promoter:innen im Einsatz — für POS, Events und Field Force.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Staff as a Service', item: 'https://sonic-group.de/leistungen/staff-as-a-service' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'Staff as a Service', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Retail Staffing / Brand Ambassador Services',
        areaServed: ['DE','AT','CH'],
        description: 'Recruiting, Onboarding, Payroll und Steuerung von Promoter:innen, Brand Ambassadors und Field Force — aus einem Talentpool mit über 1.800 aktiven Menschen.',
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);
  const tCta = useLeistungenText('leistungen_staff_cta');

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <StaffHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <div style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
        <StaffContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline={tCta['headline']}
          headlineAccent={tCta['headline-accent']}
          subline={tCta['subline']}
          checkItems={splitList(tCta['check-items']).map((text) => ({ text }))}
          ctaLabel={tCta['cta-label']}
          ctaMailSubject="Staff as a Service Beratung"
          ctaIcon="ri-user-add-line"
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
