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
    description: 'Events, Messen und Roadshows von Sonic Group: Modulare Messestände, Brand Activation, Fahrzeug-Promotions und Live-Events im DACH-Raum. Full Service aus einer Hand.',
    keywords: 'Events Messen DACH, Messestand Aufbau, Brand Activation Events, Roadshow Deutschland, Promotions Events',
    canonical: 'https://sonic-group.de/leistungen/events-messen',
    ogTitle: 'Events & Messen — Sonic Group DACH',
    ogDescription: 'Modulare Messestände, Roadshows und Brand Activation Events im DACH-Raum. Full Service aus einer Hand.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <EventsHero />
      </div>

      <div style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
        <EventsContent />
      </div>

      <WoodenDivider />

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
