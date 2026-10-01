import { useSEO } from '@/hooks/useSEO';
import HeroRevamp from './components/HeroRevamp';
import TrustStrip from './components/TrustStrip';
import LiveMetrics from './components/LiveMetrics';
import VideoShowcase from './components/VideoShowcase';
import ChallengeSection from './components/ChallengeSection';
import ServicesGrid from './components/ServicesGrid';
import SRTTeaser from './components/SRTTeaser';
import ClientProof from '../../components/feature/ClientProof';
import Contact from './components/Contact';
import LeistungenKontakt from '../../components/feature/LeistungenKontakt';
import { useCtaText } from '@/hooks/useCtaText';
import { useReviewText } from '@/hooks/useReviewText';
import WoodenDivider from '../../components/base/WoodenDivider';
import { StackedSectionReveal } from '../../components/feature/SectionReveal';

export default function HomePage() {
  useSEO({
    title: 'Sonic Group | Promotionagentur & Sales Support für POS, Studio und Events – Krefeld, seit 2007',
    description: 'Sonic Group aus Krefeld: Promotion, Point of Sale, Live-Video-Beratung aus eigenen Studios, Events und Schulungen – seit 2007. Über 2 Mrd. € Umsatz für unsere Kunden, über 1,3 Mio. Einsätze, über 1.000 betreute Stores.',
    keywords: 'retail activation agency Germany, DACH market entry, POS promotion Germany, field marketing DACH, brand ambassador agency Europe, market entry Germany China brand, US brand launch Germany, Markteinführung Deutschland, Promotionagentur DACH, Sonic Group Krefeld, retail staffing Europe, live video promotion, trade marketing Germany',
    canonical: 'https://sonic-group.de/',
    ogTitle: 'Sonic Group — Promotionagentur & Sales Support | DACH',
    ogDescription: 'Promotion, POS, Studio und Events aus einer Hand. Über 200 Promoter:innen im Einsatz, über 2 Mrd. € Umsatz für unsere Kunden, über 1,3 Mio. Einsätze.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://sonic-group.de/',
      'name': 'Sonic Group — Promotionagentur & Sales Support DACH',
      'description': 'Promotion, POS, Live-Video-Beratung, Events und Schulungen für Marken in Deutschland, Österreich und der Schweiz – seit 2007.',
      'url': 'https://sonic-group.de',
      'isPartOf': { '@id': 'https://sonic-group.de/#website' },
      'about': { '@id': 'https://sonic-group.de/#organization' },
    },
  });

  const cta = useCtaText();
  // Dashboard → Text → Home → „Abschluss-CTA (Home)“
  const closing = useReviewText('home_closing_cta');

  const totalSections = 8;

  return (
    <div className="min-h-[100dvh]">

      {/* ── Hero wrapper ── */}
      <div className="relative bg-gradient-to-b from-white via-[#FFF9F0]/40 to-white overflow-hidden">
        <section id="hero" className="relative z-10">
          <HeroRevamp />
        </section>
        <StackedSectionReveal index={0} totalSections={totalSections}>
          <section id="trust" className="relative z-10 bg-white">
            <TrustStrip />
          </section>
        </StackedSectionReveal>
      </div>

      {/* LiveMetrics */}
      <StackedSectionReveal index={1} totalSections={totalSections}>
        <section id="metrics" className="relative z-10" style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }}>
          <LiveMetrics />
        </section>
      </StackedSectionReveal>

      <WoodenDivider />

      <StackedSectionReveal index={2} totalSections={totalSections}>
        <section id="video" className="relative z-10 bg-white">
          <VideoShowcase />
        </section>
      </StackedSectionReveal>

      <WoodenDivider />

      <StackedSectionReveal index={3} totalSections={totalSections}>
        <section id="challenge" className="relative z-10 bg-white">
          <ChallengeSection />
        </section>
      </StackedSectionReveal>

      <WoodenDivider />

      {/* losungen anchor */}
      <div id="losungen" style={{ scrollMarginTop: '80px' }} />

      <StackedSectionReveal index={4} totalSections={totalSections}>
        <section id="services" className="relative z-10 bg-white">
          <ServicesGrid />
        </section>
      </StackedSectionReveal>

      <WoodenDivider />

      <StackedSectionReveal index={5} totalSections={totalSections}>
        <section id="srt-teaser" className="relative z-10">
          <SRTTeaser />
        </section>
      </StackedSectionReveal>

      {/* Dark-bg WoodenDivider — SRTTeaser(dark) → ClientProof(light) */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <StackedSectionReveal index={6} totalSections={totalSections}>
        <section id="client-proof" className="relative z-10 bg-white">
          <ClientProof />
        </section>
      </StackedSectionReveal>

      {/* Gradient bridge into Contact */}
      <div className="w-full h-3 pointer-events-none" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #FAFDF5 100%)' }} aria-hidden="true" />

      <WoodenDivider />

      <div className="w-full h-3 pointer-events-none" style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }} aria-hidden="true" />

      <section id="contact" className="relative z-10 bg-white">
        <Contact />
      </section>

      {/* Closing CTA — same lean box as the Leistungen pages (cta.book + cta.microline) */}
      <LeistungenKontakt
        headline={closing['headline']}
        headlineAccent={closing['headline-accent']}
        subline={closing['subline']}
        ctaLabel={cta.book}
        ctaMailSubject="Anfrage über die Startseite"
        ctaIcon="ri-calendar-line"
      />
    </div>
  );
}
