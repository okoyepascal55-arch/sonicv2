import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ClientProof from '@/components/feature/ClientProof';
import WoodenDivider from '@/components/base/WoodenDivider';
import VideoHero from './components/VideoHero';
import VideoContent from './components/VideoContent';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { useCtaText } from '@/hooks/useCtaText';
import { useMediaStore } from '@/lib/mediaStore';
import { getYouTubeId } from '@/lib/youtube';

const NAV_ITEMS = [
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'video', label: 'Video', icon: 'ri-play-circle-line' },
  { id: 'vorteile', label: 'Vorteile', icon: 'ri-thumb-up-line' },
  { id: 'kostenrechner', label: 'Kostenrechner', icon: 'ri-calculator-line' },
  { id: 'phygital', label: 'Phygital', icon: 'ri-links-line' },
  { id: 'formate', label: 'Formate', icon: 'ri-film-line' },
  { id: 'referenzen', label: 'Referenzen', icon: 'ri-chat-quote-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];

export default function VideoPage() {
  useSEO({
    title: 'Live Video | Sonic Group — 1:1 Video-Beratung & Live Shopping DACH',
    description: 'Live Video von Sonic Group: 1:1 Video-Kaufberatung und Live Shopping Events direkt aus unseren Studios in Krefeld — über 47.000 Live-Beratungen, Ø 5,5 Min. Gesprächsdauer. Phygitale Retail-Aktivierung für Marken, die Online- und Offline-Kanäle verbinden wollen — messbar, skalierbar, DACH-weit.',
    keywords: 'Live Video Promotion, Video Kaufberatung Deutschland, Live Shopping DACH, Phygital Retail, Video Commerce, Live Video Studio, 1:1 Videoberatung Retail, Shoppable Video, Live Stream Shopping, Virtual Sales Promoter, Video Sales Activation, Online POS Beratung',
    canonical: 'https://sonic-group.de/leistungen/live-video',
    ogTitle: 'Live Video — Phygital Retail | Sonic Group',
    ogDescription: 'Professionelle 1:1 Video-Beratung und Live Shopping aus eigenen Studios — die Brücke zwischen Online und stationärem Handel.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://sonic-group.de/leistungen' },
        { '@type': 'ListItem', position: 3, name: 'Live Video', item: 'https://sonic-group.de/leistungen/live-video' },
      ]},
      { '@context': 'https://schema.org', '@type': 'Service',
        name: 'Live Video', provider: { '@type': 'Organization', name: 'Sonic Sales Support GmbH' },
        serviceType: 'Live Video Commerce / Phygital Retail Activation',
        areaServed: ['DE','AT','CH'],
        description: '1:1 Video-Kaufberatung und Live Shopping Events aus professionellen Studios für Marken im DACH-Handel.',
      },
    ],
  })

  const heroRef = useRef<HTMLDivElement>(null);
  const tc = useLeistungenText('leistungen_video_cta');
  const cta = useCtaText();
  // The video block is hidden while no YouTube link is set — hide its nav entry too
  const { images: ytSection } = useMediaStore('leistungen_video_youtube');
  const hasVideo = !!(getYouTubeId(ytSection[0]?.url) || getYouTubeId(ytSection[0]?.caption));
  const navItems = hasVideo ? NAV_ITEMS : NAV_ITEMS.filter((item) => item.id !== 'video');

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={navItems} heroRef={heroRef} />
      <div ref={heroRef}>
        <VideoHero />
      </div>

      <div>
        <VideoContent />
      </div>

      <WoodenDivider />

      <section id="referenzen">
        <ClientProof only={['mediamarktsaturn', 'nexaro', 'seb']} />
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline={tc['headline']}
          headlineAccent={tc['headline-accent']}
          subline={tc['subline']}
          ctaLabel={cta.book}
          ctaMailSubject="Video Demo anfragen"
          ctaIcon="ri-video-line"
        />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
