import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { useCtaText } from '@/hooks/useCtaText';
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
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function ForecastingPage() {
  useSEO({
    title: 'Forecasting | Sonic Group — Datenbasierte Sell-out-Prognosen für Retail DACH',
    description: 'Retail Forecasting von Sonic Group: Datenbasierte Sell-out-Prognosen, Standortanalysen und ROI-Planung für Field Force Einsätze in Deutschland. Plane Promoter-Budgets mit nachvollziehbaren Prognosen auf Basis von über 1,3 Mio. dokumentierten Einsätzen im Sonic Reporting Tool (SRT).',
    keywords: 'Retail Forecasting DACH, Sell-out Prognose, Standortanalyse Retail, ROI Planung POS, Promoter Budget Optimierung, Absatzprognose Deutschland, Datenbasiertes Marketing, Sonic Reporting Tool SRT, Retail Reporting, Sell-Through Forecast',
    canonical: 'https://sonic-group.de/leistungen/forecasting',
    ogTitle: 'Forecasting — Datenbasierte Retail-Prognosen | Sonic Group',
    ogDescription: 'Plausible Sell-out-Prognosen und ROI-Planung für Field-Force-Einsätze — datenbasiert, standortgenau, nachvollziehbar.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Forecasting', item: 'https://sonic-group.de/leistungen/forecasting' },
      ]},
    ],
  })

  const tc = useLeistungenText('leistungen_forecasting_cta');
  const cta = useCtaText();
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
          headline={tc.headline}
          headlineAccent={tc.headline_accent}
          subline={tc.subline}
          ctaLabel={cta.book}
          ctaMailSubject="Forecasting Beratungsgespräch"
          ctaIcon="ri-line-chart-line"
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
