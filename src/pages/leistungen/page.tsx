import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenHero from './components/LeistungenHero';
import LeistungenStats from './components/LeistungenStats';
import ServiceGrid from './components/ServiceGrid';
import SchallmauerWays from './components/SchallmauerWays';
import IndustrySelector from './components/IndustrySelector';
import ClientProof from '../../components/feature/ClientProof';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import WoodenDivider from '@/components/base/WoodenDivider';
import { StackedSectionReveal } from '@/components/feature/SectionReveal';

const NAV_ITEMS = [
  { id: 'zahlen', label: 'Zahlen', icon: 'ri-bar-chart-2-line' },
  { id: 'service-grid', label: 'Leistungen', icon: 'ri-apps-line' },
  { id: 'schallmauer', label: 'Schallmauer', icon: 'ri-sound-module-line' },
  { id: 'branchen', label: 'Branchen', icon: 'ri-building-line' },
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
      const offset = 125; // Combined height of header + buffer
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <main id="main-content">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      {/* Hero */}
      <div ref={heroRef}>
        <LeistungenHero onScrollToGrid={scrollToGrid} />
      </div>

      {/* Stats strip — subtle warm tint breaks the pure-white run, matching homepage LiveMetrics */}
      <div id="zahlen" style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
        <StackedSectionReveal index={0} totalSections={5}>
          <LeistungenStats />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      {/* Service Grid */}
      <div id="service-grid">
        <StackedSectionReveal index={1} totalSections={5}>
          <ServiceGrid sectionRef={gridRef} />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      {/* Schallmauer */}
      <div id="schallmauer">
        <StackedSectionReveal index={2} totalSections={5}>
          <SchallmauerWays />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      {/* Industry selector */}
      <div id="branchen">
        <StackedSectionReveal index={3} totalSections={5}>
          <IndustrySelector />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      {/* Testimonials — same canonical ClientProof used on Home and every other page */}
      <div id="kundenstimmen" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #FAFDF5 50%, #ffffff 100%)' }}>
        <StackedSectionReveal index={4} totalSections={5}>
          <ClientProof />
        </StackedSectionReveal>
      </div>
      </main>

      <WoodenDivider />

      {/* Final CTA — standardized with LeistungenKontakt like all sub-pages */}
      <LeistungenKontakt
        headline="Bereit, die Retail-"
        headlineAccent="Schallmauer zu durchbrechen?"
        subline="In 30 Minuten klären wir gemeinsam, welche Leistungen deinen ROI am stärksten steigern."
        checkItems={[
          { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
          { text: 'Alle Leistungen im Überblick' },
          { text: 'Erste Einschätzung zur Timeline' },
        ]}
        ctaLabel="Beratungsgespräch buchen"
        ctaMailSubject="Beratungsgespräch buchen"
        ctaIcon="ri-calendar-line"
      />
    </div>
  );
}