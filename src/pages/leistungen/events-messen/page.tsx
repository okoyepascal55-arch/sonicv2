import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import EventsHero from './components/EventsHero';
import EventsContent from './components/EventsContent';
import EventsShowcase from './components/EventsShowcase';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'events', label: 'Events', icon: 'ri-calendar-event-line' },
  { id: 'arbeitsweise', label: 'Arbeitsweise', icon: 'ri-route-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function EventsMessenPage() {
  useSEO({
    title: 'Events & Messen | Sonic Group — Roadshows, Messestände & Brand Activation DACH',
    description: 'Events, Messen und Roadshows von Sonic Group: Modulare Messestände, Brand Activation und Roadshow-Konzepte für internationale und lokale Marken in Deutschland, Österreich und der Schweiz. Konzeption, Aufbau, Betreuung — alles aus einer Hand.',
    keywords: 'Events Messen DACH, Messestand Aufbau, Brand Activation Events, Roadshow Deutschland, Messestand Konzeption, Eventmarketing Agentur, Messe Promoter, Produktlaunch Event, Consumer Electronics Messe, IFA Berlin Agentur, Roadshow Österreich Schweiz, Live Event Marketing',
    canonical: 'https://sonic-group.de/leistungen/events-messen',
    ogTitle: 'Events & Messen — Brand Activation | Sonic Group DACH',
    ogDescription: 'Roadshows, Messestände und Brand Activation Events für Marken in DACH — Konzeption, Aufbau und Betreuung aus einer Hand.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Events & Messen', item: 'https://sonic-group.de/leistungen/events-messen' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'Events & Messen', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Event Marketing / Trade Show Activation',
        areaServed: ['DE','AT','CH'],
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <EventsHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <EventsContent />

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <EventsShowcase />

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Bereit für deinen"
          headlineAccent="nächsten Auftritt?"
          subline="Lass uns in 30 Minuten besprechen, wie wir deine Marke zum Erlebnis machen."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Deine Ziele, unser modulares System' },
            { text: 'Einblick in unsere Arbeitsweise und SRT' },
            { text: 'Erste Einschätzung zur Timeline' },
          ]}
          ctaLabel="Beratung buchen"
          ctaMailSubject="Events Messen Beratung"
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
