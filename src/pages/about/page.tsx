import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenDivider from '@/components/base/WoodenDivider';
import OriginStory from './components/OriginStory';
import ValuesVisual from './components/ValuesVisual';
import LeadershipTeam from './components/LeadershipTeam';
import ManagementVoices from './components/ManagementVoices';
import { useText } from '@/hooks/useText';

const BRAND_LOGOS = [
  { src: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Philips', label: 'Unterhaltungselektronik' },
  { src: 'https://cdn.brandfetch.io/idMbGUGol-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Samsung', label: 'Consumer Electronics' },
  { src: 'https://cdn.brandfetch.io/krups.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Krups', label: 'Küchengeräte' },
  { src: 'https://cdn.brandfetch.io/rowenta.de/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Rowenta', label: 'Haushaltsgeräte' },
  { src: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: "L'Oréal", label: 'Beauty & Kosmetik' },
  { src: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Garmin', label: 'Wearables & Navigation' },
  { src: 'https://cdn.brandfetch.io/canon.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Canon', label: 'Bildgebung & Druck' },
  { src: 'https://cdn.brandfetch.io/bosch.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Bosch', label: 'Haushaltsgeräte' },
  { src: 'https://cdn.brandfetch.io/dyson.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Dyson', label: 'Premium Haushaltsgeräte' },
  { src: 'https://cdn.brandfetch.io/vorwerk.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Vorwerk', label: 'Haushaltsgeräte' },
  { src: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX', alt: 'Groupe SEB', label: 'Mehrmarken' },
  { src: 'https://cdn.brandfetch.io/id2dYOZ6uf/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX', alt: 'Nexaro', label: 'Robotik & Reinigung' },
];

export default function AboutPage() {
  useSEO({
    title: 'Über uns | Sonic Group — Sales- & Marketing-Agentur seit 2007',
    description: 'Sonic Group: Unabhängige Marketing- und Sales-Agentur seit 2007. Über 500 Projekte, 1,35 Mio. Einsätze. Partner von Philips, Rowenta, Krups, Canon, Garmin & mehr.',
    keywords: 'Sonic Group, Sales Promotion Agentur Deutschland, Marketing Agentur seit 2007, POS Agentur',
    canonical: 'https://sonic-group.de/ueber-uns',
    ogTitle: 'Über Sonic Group — Marken im Herzen, Erfolg im Fokus',
    ogDescription: 'Seit 2007 unabhängig: Sonic Group vereint Konzeption, Kreation und Koordination unter einem Dach.',
    ogType: 'website',
  });

  const { images: headerImages } = useMediaStore('/images/Über uns/Über uns/1. Header');

  const tHeroBadge = useText('about_hero', 'about-hero-badge', 'Über Sonic');
  const tHeroH1 = useText('about_hero', 'about-hero-h1', 'MARKEN IM HERZEN.');
  const tHeroH1Line2 = useText('about_hero', 'about-hero-h1-line2', 'ERFOLG IM FOKUS.');
  const tHeroSub = useText('about_hero', 'about-hero-sub', 'Unabhängige Marketing- und Sales-Agentur — von Konzeption bis Koordination, am POS, im Studio, auf Messen und Events. Seit 2007 mit vollem Einsatz für deine Marke.');

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      <main id="main-content">
        {/* ── HERO ── */}
        <div ref={heroRef}>
          <section
            className="relative flex flex-col justify-end overflow-hidden"
            style={{ minHeight: '720px', background: 'oklch(0.13 0.005 118)' }}
          >
            {headerImages[0]?.url && (
              <img
                src={headerImages[0].url}
                alt="Sonic Group — Über uns"
                className="absolute inset-0 w-full h-full object-cover object-top"
                fetchPriority="high"
              />
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,11,9,0.55) 0%, rgba(10,11,9,0.25) 45%, rgba(10,11,9,0.92) 100%)' }} />

            <div className="relative z-10 w-full mx-auto px-10 pb-16" style={{ maxWidth: '1280px' }}>
              {/* v3 eyebrow */}
              <div className="v3-eyebrow mb-7">
                <span className="v3-eyebrow-line" />
                <span className="v3-eyebrow-label--light" style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'oklch(0.81 0.19 115)' }}>{tHeroBadge}</span>
              </div>

              <h1 className="text-white mb-6" style={{ fontSize: 'clamp(52px,7vw,88px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.035em', textTransform: 'uppercase' }}>
                {tHeroH1}<br />
                <span style={{ color: 'oklch(0.81 0.19 115)' }}>{tHeroH1Line2}</span>
              </h1>

              <p className="mb-12" style={{ maxWidth: '560px', fontSize: '17px', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)' }}>{tHeroSub}</p>

              {/* Stat band — glass, hairline border */}
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px) saturate(1.3)', WebkitBackdropFilter: 'blur(20px) saturate(1.3)', border: '1px solid rgba(255,255,255,0.14)' }}>
                {[
                  { value: '500+', label: 'Projekte' },
                  { value: '1,35 Mio.', label: 'Einsätze' },
                  { value: '>2.000', label: 'Talente im Pool' },
                  { value: '2007', label: 'Gegründet', lime: true },
                ].map((s, i) => (
                  <div key={i} className="px-8 py-7" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : undefined }}>
                    <p className="mb-2" style={{ fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.035em', color: s.lime ? 'oklch(0.81 0.19 115)' : '#fff' }}>{s.value}</p>
                    <p style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── ORIGIN STORY ── */}
        <OriginStory />

        {/* Wooden divider — kept exactly as-is */}
        <WoodenDivider />

        {/* ── REFERENZEN — hairline grid ── */}
        <section id="referenzen" className="v3-bg-off-white" style={{ padding: '96px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: '1280px' }}>
            <div className="flex items-end justify-between gap-12 mb-12">
              <div>
                <div className="v3-eyebrow">
                  <span className="v3-eyebrow-line" />
                  <span className="v3-eyebrow-label">Referenzen</span>
                </div>
                <h2 className="v3-h2">
                  Wer mit Sonic <span className="v3-marker">erfolgreich</span> ist
                </h2>
              </div>
              <p style={{ margin: 0, maxWidth: '380px', fontSize: '15px', lineHeight: 1.7, color: 'oklch(0.48 0.006 260)' }}>
                12 Markenpartner vertrauen seit 2007 auf unsere Expertise am POS, in Studios und auf Events.
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4" style={{ borderTop: '1px solid oklch(0.88 0.004 110)', borderLeft: '1px solid oklch(0.88 0.004 110)' }}>
              {BRAND_LOGOS.map((logo) => (
                <div key={logo.alt} className="flex flex-col items-center justify-center gap-3 p-7" style={{ minHeight: '148px', borderRight: '1px solid oklch(0.88 0.004 110)', borderBottom: '1px solid oklch(0.88 0.004 110)' }}>
                  <img src={logo.src} alt={logo.alt} style={{ height: '28px', width: 'auto', maxWidth: '120px', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.55 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.62 0.006 260)' }}>{logo.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <ValuesVisual />

        <WoodenDivider />

        {/* ── LEADERSHIP TEAM ── */}
        <LeadershipTeam />

        <WoodenDivider />

        {/* ── MANAGEMENT VOICES ── */}
        <ManagementVoices />

        <WoodenDivider />
      </main>
    </div>
  );
}
