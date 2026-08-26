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
    title: 'Talentpool | Sonic Group — 20.000+ Promoter & Brand Ambassadors DACH',
    description: 'Der Sonic Talentpool: 20.000+ festangestellte Promoter, Brand Ambassadors und Retail-Experten für den DACH-Markt. Schnell verfügbar, intensiv geschult, messbar erfolgreich.',
    keywords: 'Talentpool Promoter DACH, Brand Ambassador Deutschland, Retail Experten, Promoter Pool',
    canonical: 'https://sonic-group.de/leistungen/talentpool',
    ogTitle: 'Talentpool — Sonic Group DACH',
    ogDescription: '20.000+ festangestellte Promoter & Brand Ambassadors für den DACH-Markt.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      <div ref={heroRef}>
        <TalentpoolHero />
      </div>

      <WoodenDivider />

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
