import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '../../components/base/WoodenDivider';
import LeistungenPageNav from '../../components/feature/LeistungenPageNav';
import SectionReveal from '../../components/feature/SectionReveal';
import IndustriesHero from './components/IndustriesHero';
import IndustryGrid from './components/IndustryGrid';
import IndustryExpertise from './components/IndustryExpertise';
import IndustryCTA from './components/IndustryCTA';

const INDUSTRIES_NAV_ITEMS = [
  { id: 'industries', label: 'Branchen', icon: 'ri-building-line' },
  { id: 'expertise', label: 'Expertise', icon: 'ri-award-line' },
  { id: 'contact', label: 'Kontakt', icon: 'ri-mail-line' },
];

export default function IndustriesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'Branchen | Retail Activation für Consumer Electronics, FMCG & mehr | Sonic Group',
    description: 'Sonic Group aktiviert Marken in Consumer Electronics, FMCG, Haushaltsgeräten, Sport & Outdoor und mehr. Über 1,3 Mio. Einsätze und 2 Mrd. € generierter Umsatz im DACH-Raum.',
    keywords: 'retail activation branchen, consumer electronics promotion, fmcg markenaktivierung, pos dienstleistungen, branchenlösungen retail',
    canonical: 'https://sonic-group.de/industries',
  });

  return (
    <div className="min-h-[100dvh] bg-white">
      <LeistungenPageNav items={INDUSTRIES_NAV_ITEMS} heroRef={heroRef} />
      <div ref={heroRef}>
        <IndustriesHero />
      </div>
      <WoodenDivider />
      <SectionReveal direction="up" intensity="subtle">
        <div id="industries">
          <IndustryGrid />
        </div>
      </SectionReveal>
      <WoodenDivider />
      <SectionReveal direction="up" intensity="subtle" delay={60}>
        <div id="expertise">
          <IndustryExpertise />
        </div>
      </SectionReveal>
      <WoodenDivider />
      <SectionReveal direction="up" intensity="medium">
        <IndustryCTA />
      </SectionReveal>
    </div>
  );
}