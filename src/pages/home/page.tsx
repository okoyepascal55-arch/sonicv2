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
    title: 'Sonic Group | Retail Activation Agency for DACH & Europe — Market Entry Partner',
    description: 'Sonic Group: Retail activation partner for Chinese and US manufacturers entering Germany, Austria, Switzerland. POS promotion, field staffing, live video, brand ambassador programs. 1.35M+ assignments. €2B+ sell-out.',
    keywords: 'retail activation agency Germany, DACH market entry, POS promotion Germany, field marketing DACH, brand ambassador agency Europe, market entry Germany China brand, US brand launch Germany, Markteinführung Deutschland, Promotionagentur DACH, Sonic Group Krefeld, retail staffing Europe, live video promotion, trade marketing Germany',
    canonical: 'https://sonic-group.de/',
    ogTitle: 'Sonic Group — Retail Activation Agency | DACH & Europe',
    ogDescription: 'From POS to live video: Full-service retail activation for Chinese & US brands entering DACH. 1.35M+ assignments. €2B+ sell-out. 2,000+ field staff.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://sonic-group.de/',
      'name': 'Sonic Group — Retail Activation Agency DACH & Europe',
      'description': 'Full-service retail activation and market entry agency for brands launching in Germany, Austria, Switzerland.',
      'url': 'https://sonic-group.de',
      'isPartOf': { '@id': 'https://sonic-group.de/#website' },
      'about': { '@id': 'https://sonic-group.de/#organization' },
    },
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
