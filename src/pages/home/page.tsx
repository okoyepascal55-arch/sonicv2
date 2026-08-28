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
import WoodenDivider from '../../components/base/WoodenDivider';
import { StackedSectionReveal } from '../../components/feature/SectionReveal';

export default function HomePage() {
  useSEO({
    title: 'Sonic Group | DACH Market Activation & Retail Excellence',
    description: 'Sonic Group ist Ihr Full-Service-Partner für Market Activation im DACH-Raum. POS-Promotion, Live Video, Events, Staffing & Forecasting — über 1,35 Mio. Einsätze, €2 Mrd. Umsatz generiert.',
    keywords: 'DACH Market Activation, Retail Promotion Deutschland, POS Staffing, Live Video Beratung, Markteintritt DACH',
    canonical: 'https://sonic-group.de/',
    ogTitle: 'Sonic Group — Retail Activation Partner DACH',
    ogDescription: 'Über 1,35 Mio. Einsätze. €2 Mrd. Umsatz. 2.000+ Talente. Ihr Full-Service-Partner für Retail Activation im DACH-Raum.',
  });

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
      <div className="w-full h-8 pointer-events-none" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #FAFDF5 100%)' }} aria-hidden="true" />

      <WoodenDivider />

      <div className="w-full h-8 pointer-events-none" style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }} aria-hidden="true" />

      <section id="contact" className="relative z-10 bg-white">
        <Contact />
      </section>
    </div>
  );
}
