import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
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
    title: 'Staff as a Service | Sonic Group — Retail Staffing & Promoter DACH',
    description: 'Staff as a Service von Sonic Group: 20.000+ festangestellte Promoter und Brand Ambassadors für Retail, Events und POS im DACH-Raum. Flexibel, skalierbar, datenbasiert.',
    keywords: 'Staff as a Service, Retail Staffing DACH, Promoter Deutschland, Brand Ambassador, Feldvertrieb',
    canonical: 'https://sonic-group.de/leistungen/staff-as-a-service',
    ogTitle: 'Staff as a Service — Sonic Group DACH',
    ogDescription: '20.000+ Promoter & Brand Ambassadors für Retail und Events im DACH-Raum.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <StaffHero />
      </div>

      <WoodenDivider />

      <div style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }}>
        <StaffContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Bereit für Personal"
          headlineAccent="ohne Overhead?"
          subline="Lass uns in 30 Minuten klären, welches Staffing-Modell zu deinem Projekt passt."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Deine Anforderungen, unser Talentpool' },
            { text: 'Einblick in Schulungskonzepte und S.O.C.K.S.' },
            { text: 'Erste Einschätzung zur Verfügbarkeit' },
          ]}
          ctaLabel="Beratung buchen"
          ctaMailSubject="Staff as a Service Beratung"
          ctaIcon="ri-user-add-line"
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
