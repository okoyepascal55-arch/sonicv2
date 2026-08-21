import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import POSHero from './components/POSHero';
import POSContent from './components/POSContent';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'beispiele', label: 'Beispiele', icon: 'ri-image-line' },
  { id: 'arbeitsweise', label: 'Arbeitsweise', icon: 'ri-route-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function POSFullServicePage() {
  useSEO({
    title: 'POS Full Service | Sonic Group — Point of Sale Promotion & Retail Activation DACH',
    description: 'POS Full Service von Sonic Group: Geschulte Markenbotschafter, Shop-in-Shop-Konzepte und datenbasierte Retail Activation am Point of Sale im DACH-Raum.',
    keywords: 'POS Full Service, Point of Sale Promotion, Retail Activation DACH, Shop in Shop, Markenbotschafter POS',
    canonical: 'https://sonic-group.de/leistungen/pos-full-service',
    ogTitle: 'POS Full Service — Sonic Group DACH',
    ogDescription: 'Geschulte Markenbotschafter & datenbasierte POS-Activation im DACH-Raum.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <POSHero />
      </div>

      <div style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
        <POSContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Bereit für"
          headlineAccent="POS-Performance?"
          subline="Lass uns in 30 Minuten besprechen, wie wir deinen Point of Sale zum Point of Success machen."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Deine Ziele, unser modulares System' },
            { text: 'Einblick in unsere POS-Referenzen' },
            { text: 'Erste Einschätzung zur Timeline' },
          ]}
          ctaLabel="POS-Projekt besprechen"
          ctaMailSubject="POS Full Service Beratung"
          ctaIcon="ri-store-line"
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
