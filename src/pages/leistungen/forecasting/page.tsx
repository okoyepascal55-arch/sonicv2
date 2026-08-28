import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import ForecastingHero from './components/ForecastingHero';
import ForecastingContent from './components/ForecastingContent';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'wie-es-funktioniert', label: 'So funktioniert es', icon: 'ri-route-line' },
  { id: 'stats', label: 'Zahlen', icon: 'ri-bar-chart-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function ForecastingPage() {
  useSEO({
    title: 'Forecasting | Sonic Group — Datenbasierte Sell-out-Prognosen DACH',
    description: 'Forecasting von Sonic Group: Datenbasierte Sell-out-Prognosen, Standortanalysen und ROI-Planung für Retail-Projekte im DACH-Raum. Planungssicherheit vor dem ersten Einsatz.',
    keywords: 'Retail Forecasting DACH, Sell-out Prognose, Standortanalyse Retail, ROI Planung POS',
    canonical: 'https://sonic-group.de/leistungen/forecasting',
    ogTitle: 'Forecasting — Sonic Group DACH',
    ogDescription: 'Datenbasierte Sell-out-Prognosen & ROI-Planung für Retail im DACH-Raum.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      {/* Hero */}
      <div ref={heroRef}>
        <ForecastingHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <div style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
        <ForecastingContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Starte mit einer"
          headlineAccent="Forecasting-Session."
          subline="Wir analysieren deine Datenbasis und zeigen dir in 30 Minuten, welche Prognosegenauigkeit für dein Projekt realistisch ist."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Analyse deiner bestehenden Datenbasis' },
            { text: 'Einblick in unsere Forecasting-Methodik' },
            { text: 'Erste Einschätzung zur Prognosegenauigkeit' },
          ]}
          ctaLabel="Beratungsgespräch buchen"
          ctaMailSubject="Forecasting Beratungsgespräch"
          ctaIcon="ri-line-chart-line"
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
