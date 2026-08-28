import { useState, useEffect, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import VideoHero from './components/VideoHero';
import VideoContent from './components/VideoContent';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'vorteile', label: 'Vorteile', icon: 'ri-thumb-up-line' },
  { id: 'kostenrechner', label: 'Kostenrechner', icon: 'ri-calculator-line' },
  { id: 'phygital', label: 'Phygital', icon: 'ri-links-line' },
  { id: 'formate', label: 'Formate', icon: 'ri-film-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function VideoPage() {
  useSEO({
    title: 'Live Video Promotion | Sonic Group — 1:1 Video-Beratung & Live Shopping DACH',
    description: 'Live Video Promotion von Sonic Group: 1:1 Video-Kaufberatung, Live Shopping Events und Phygital Retail für den DACH-Markt. Conversion steigern, Retouren senken.',
    keywords: 'Live Video Promotion, Video Kaufberatung, Live Shopping DACH, Phygital Retail, Video Commerce',
    canonical: 'https://sonic-group.de/leistungen/live-video',
    ogTitle: 'Live Video Promotion — Sonic Group',
    ogDescription: '1:1 Video-Beratung & Live Shopping für den DACH-Markt. Conversion +34%, Retouren -28%.',
  });

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />
      <div ref={heroRef}>
        <VideoHero />
      </div>

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      <div style={{ background: 'linear-gradient(180deg, oklch(0.975 0.002 110) 0%, #fff 100%)' }}>
        <VideoContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Jetzt Video-Demo"
          headlineAccent="anfordern."
          subline="Lass uns besprechen, wie (Live) Video Promotion deine Marke weiterbringt."
          checkItems={[
            { text: 'Kostenfreies 30-Minuten-Strategiegespräch' },
            { text: 'Live-Demo in einem unserer Studios' },
            { text: 'Individuelle Kosten-Nutzen-Analyse' },
            { text: 'Erste Einschätzung zur Timeline' },
          ]}
          ctaLabel="Beratungsgespräch buchen"
          ctaMailSubject="Video Demo anfragen"
          ctaIcon="ri-video-line"
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
