import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenHero from './components/LeistungenHero';
import LeistungenStats from './components/LeistungenStats';
import ServiceGrid from './components/ServiceGrid';
import SchallmauerWays from './components/SchallmauerWays';
import ClientProof from '../../components/feature/ClientProof';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import WoodenDivider from '@/components/base/WoodenDivider';
import { StackedSectionReveal } from '@/components/feature/SectionReveal';

const NAV_ITEMS = [
  { id: 'zahlen', label: 'Zahlen', icon: 'ri-bar-chart-2-line' },
  { id: 'service-grid', label: 'Leistungen', icon: 'ri-apps-line' },
  { id: 'schallmauer', label: 'Schallmauer', icon: 'ri-sound-module-line' },
  { id: 'kundenstimmen', label: 'Kundenstimmen', icon: 'ri-chat-quote-line' },
];

export default function LeistungenPage() {
  useSEO({
    title: 'Leistungen | Sonic Group — POS, Live Video, Events, Staffing & Logistik',
    description: 'Alle Leistungen von Sonic Group: POS Full Service, Live Video Promotion, Events & Messen, Staff as a Service, Talentpool, Kreation & Content, Forecasting, Warehouse & Logistik.',
    keywords: 'POS Full Service, Live Video Promotion, Events Messen DACH, Staff as a Service, Retail Staffing, Kreation Content',
    canonical: 'https://sonic-group.de/leistungen',
    ogTitle: 'Leistungen — Sonic Group DACH',
    ogDescription: 'Von POS-Promotion bis Live Video: Alle Retail-Leistungen von Sonic Group für den DACH-Markt.',
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const scrollToGrid = () => {
    const el = document.getElementById('service-grid');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 125;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <main id="main-content">
        <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />
        <div ref={heroRef}><LeistungenHero onScrollToGrid={scrollToGrid} /></div>

        <div id="zahlen">
          <StackedSectionReveal index={0} totalSections={4}><LeistungenStats /></StackedSectionReveal>
        </div>
        <WoodenDivider />

        <div id="service-grid">
          <StackedSectionReveal index={1} totalSections={4}><ServiceGrid sectionRef={gridRef} /></StackedSectionReveal>
        </div>
        <WoodenDivider />

        <div id="schallmauer">
          <StackedSectionReveal index={2} totalSections={4}><SchallmauerWays /></StackedSectionReveal>
        </div>
        <WoodenDivider />

        <div id="kundenstimmen" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #FAFDF5 50%, #ffffff 100%)' }}>
          <StackedSectionReveal index={3} totalSections={4}><ClientProof /></StackedSectionReveal>
        </div>
      </main>

      <WoodenDivider />
      <LeistungenKontakt
        headline="Bereit, die Retail-"
        headlineAccent="Schallmauer zu durchbrechen?"
        subline="In 30 Minuten klären wir gemeinsam, welche Leistungen deinen ROI am stärksten steigern."
        checkItems={[{ text: 'Kostenfreies 30-Minuten-Strategiegespräch' }, { text: 'Alle Leistungen im Überblick' }, { text: 'Erste Einschätzung zur Timeline' }]}
        ctaLabel="Beratungsgespräch buchen"
        ctaMailSubject="Beratungsgespräch buchen"
        ctaIcon="ri-calendar-line"
      />
    </div>
  );
}
