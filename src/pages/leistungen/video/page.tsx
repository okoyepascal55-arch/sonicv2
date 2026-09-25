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
    description: 'Live Video Promotion von Sonic Group: Professionelle 1:1 Video-Kaufberatung und Live Shopping Events direkt aus unseren Studios in Krefeld. Phygitale Retail-Aktivierung für Marken, die Online- und Offline-Kanäle verbinden wollen — messbar, skalierbar, DACH-weit.',
    keywords: 'Live Video Promotion, Video Kaufberatung Deutschland, Live Shopping DACH, Phygital Retail, Video Commerce, Live Video Studio, 1:1 Videoberatung Retail, Shoppable Video, Live Stream Shopping, Virtual Sales Promoter, Video Sales Activation, Online POS Beratung',
    canonical: 'https://sonic-group.de/leistungen/live-video',
    ogTitle: 'Live Video Promotion — Phygital Retail | Sonic Group',
    ogDescription: 'Professionelle 1:1 Video-Beratung und Live Shopping aus eigenen Studios — die Brücke zwischen Online und stationärem Handel.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Live Video Promotion', item: 'https://sonic-group.de/leistungen/live-video' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'Live Video Promotion', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Live Video Commerce / Phygital Retail Activation',
        areaServed: ['DE','AT','CH'],
        description: '1:1 Video-Kaufberatung und Live Shopping Events aus professionellen Studios für Marken im DACH-Handel.',
      },
    ],
  })

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
