import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import TalentpoolHero from './components/TalentpoolHero';
import TalentpoolContent from './components/TalentpoolContent';

const NAV_ITEMS = [
  { id: 'herausforderung', label: 'Herausforderung', icon: 'ri-alert-line' },
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'talentprofile', label: 'Talentprofile', icon: 'ri-user-star-line' },
  { id: 'stats', label: 'Zahlen', icon: 'ri-bar-chart-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function TalentpoolPage() {
  useSEO({
    title: 'Talentpool | Sonic Group — 2.000+ Retail Promoter & Brand Ambassadors direkt buchen',
    description: 'Sonic Talentpool: Zugang zu über 2.000 festangestellten, qualifizierten Promotern, Brand Ambassadors und Retail-Experten in ganz DACH. Sofort einsatzbereit, branchenerfahren, datengesteuert ausgewählt — für POS, Events und Field Force.',
    keywords: 'Talentpool Promoter DACH, Brand Ambassador buchen, Retail Experten vermitteln, Promoter Pool Deutschland, Fachberater Retail, Außendienst Experten, Sales Promoter Pool, Promoter Recruiting DACH, Markenberater Handel, Consumer Electronics Promoter, Haushaltsgeräte Promoter',
    canonical: 'https://sonic-group.de/leistungen/talentpool',
    ogTitle: 'Talentpool — 2.000+ Retail Promoter | Sonic Group DACH',
    ogDescription: 'Direkter Zugang zu über 2.000 qualifizierten Promotern und Brand Ambassadors — sofort einsetzbar für POS, Events und Field Force.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Talentpool', item: 'https://sonic-group.de/leistungen/talentpool' },
      ]},
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <TalentpoolHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <div style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
        <TalentpoolContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Dein Projekt."
          headlineAccent="Unsere Talente."
          subline="In 30 Minuten klären wir, wie viele Talente du brauchst, wo sie eingesetzt werden und was du erwarten kannst."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Einblick in unseren Talentepool' },
            { text: 'Schulungskonzepte und Qualitätssicherung' },
            { text: 'Erste Einschätzung zur Verfügbarkeit' },
          ]}
          ctaLabel="Beratungsgespräch buchen"
          ctaMailSubject="Talentepool Beratungsgespräch"
          ctaIcon="ri-team-line"
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
