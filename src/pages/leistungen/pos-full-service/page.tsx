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
    title: 'POS Full Service | Sonic Group — Point of Sale Promotion & Retail Activation Deutschland',
    description: 'POS Full Service von Sonic Group: 2.000+ geschulte Markenbotschafter für Shop-in-Shop, Produktdemos und Live-Promotions im deutschen Handel. Messbare Umsatzsteigerung am Point of Sale — DACH-weit skalierbar.',
    keywords: 'POS Full Service Deutschland, Point of Sale Promotion, Retail Activation DACH, Shop in Shop, Markenbotschafter, Produktdemonstration Retail, Promoter Agentur Deutschland, Verkaufsförderung POS, Brand Ambassador POS, Außendienst Promotion, Field Force POS, POS Marketing Agentur',
    canonical: 'https://sonic-group.de/leistungen/pos-full-service',
    ogTitle: 'POS Full Service — Sonic Group DACH',
    ogDescription: 'Geschulte Markenbotschafter, Shop-in-Shop-Konzepte und POS-Promotions für messbare Umsatzsteigerung im deutschen Handel.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'POS Full Service', item: 'https://sonic-group.de/leistungen/pos-full-service' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'POS Full Service', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Retail Activation / Point of Sale Promotion',
        areaServed: ['DE','AT','CH'],
        description: 'Vollständige POS-Aktivierung: Shop-in-Shop, Produktdemos, Promoter-Management und Reporting für Marken im DACH-Handel.',
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <POSHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <div style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
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
