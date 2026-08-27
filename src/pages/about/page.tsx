import { useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenDivider from '@/components/base/WoodenDivider';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import OriginStory from './components/OriginStory';
import Timeline from './components/Timeline';
import ValuesVisual from './components/ValuesVisual';
import LeadershipTeam from './components/LeadershipTeam';
import ManagementVoices from './components/ManagementVoices';
import { StackedSectionReveal } from '@/components/feature/SectionReveal';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

const ABOUT_NAV_ITEMS = [
  { id: 'uber-uns', label: 'Über uns', icon: 'ri-home-heart-line' },
  { id: 'team', label: 'Team', icon: 'ri-group-line' },
  { id: 'management-voices', label: 'Management', icon: 'ri-mic-line' },
];

export default function AboutPage() {
  useSEO({
    title: 'Über uns | Sonic Group — Sales- & Marketing-Agentur seit 2007',
    description: 'Sonic Group: Unabhängige Marketing- und Sales-Agentur seit 2007. Über 500 Projekte, 1,35 Mio. Einsätze. Partner von Philips, Rowenta, Krups, Canon, Garmin & mehr. Jetzt kennenlernen.',
    keywords: 'Sonic Group, Sales Promotion Agentur Deutschland, Marketing Agentur seit 2007, POS Agentur',
    canonical: 'https://sonic-group.de/ueber-uns',
    ogTitle: 'Über Sonic Group — Marken im Herzen, Erfolg im Fokus',
    ogDescription: 'Seit 2007 unabhängig: Sonic Group vereint Konzeption, Kreation und Koordination unter einem Dach. 500+ Projekte, 1,35 Mio. Einsätze für Top-Marken wie Philips, Garmin, Canon und mehr.',
    ogType: 'website',
    ogImage: 'https://readdy.ai/api/search-image?query=Professional%20team%20of%20diverse%20marketing%20and%20sales%20professionals%20standing%20together%20in%20a%20modern%20industrial%20studio%20space%20with%20warm%20lighting%2C%20collaborative%20atmosphere%2C%20brand%20logos%20subtly%20visible%20on%20screens%20in%20background%2C%20editorial%20corporate%20photography%2C%20authentic%20expressions%2C%20clean%20composition&width=1200&height=630&seq=about-og-2026&orientation=landscape',
  });

  // ── Dashboard-managed media ──
  const { images: headerImages } = useMediaStore('/images/Über uns/Über uns/1. Header');
  const { images: focusImages } = useMediaStore('/images/Über uns/Über uns/2. Marken im Herzen. Erfolg im Fokus');
  const { images: leadershipImages } = useMediaStore('/images/Über uns/Leadership Perspectives');

  // ── Text Store hooks ──
  const tHeroBadge = useText('about_hero', 'about-hero-badge', 'Über Sonic');
  const tHeroH1 = useText('about_hero', 'about-hero-h1', 'MARKEN IM HERZEN.');
  const tHeroH1Line2 = useText('about_hero', 'about-hero-h1-line2', 'ERFOLG IM FOKUS.');
  const tHeroSub = useText('about_hero', 'about-hero-sub', 'Unabhängige Marketing- und Sales-Agentur — von Konzeption bis Koordination, am POS, im Studio, auf Messen und Events. Seit 2007 mit vollem Einsatz für deine Marke.');

  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white">
      <main id="main-content">
      {/* ── IN-PAGE NAV — desktop float ── */}
      <LeistungenPageNav items={ABOUT_NAV_ITEMS} heroRef={heroRef} />

      {/* ── HERO — bottom-anchored, matching careers ── */}
      <div ref={heroRef}>
        <section
          className="relative min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex flex-col justify-end overflow-hidden bg-foreground-950"
          style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}
        >
          {/* Full-bleed background image */}
          {headerImages[0]?.url && (
            <img
              src={headerImages[0].url}
              alt="Sonic Group — Über uns"
              className="absolute inset-0 w-full h-full object-cover object-center"
              fetchPriority="high"
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/75" />



          {/* Hero content — bottom-anchored */}
          <div className="relative z-10 max-w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-10 md:pb-14 w-full">
            {/* Eyebrow badge — unified token pattern */}
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-primary-500">{tHeroBadge}</span>
            </div>

            {/* Large headline */}
            <h1 className="leist-h1-hub text-white mb-4 md:mb-5">
              {tHeroH1}<br />
              <span className="text-primary-500">{tHeroH1Line2}</span>
            </h1>

            <p className="text-white/60 text-sm md:text-base max-w-full max-w-[520px] leading-relaxed mb-8 md:mb-10">
              {tHeroSub}
            </p>

            {/* Stats row — sharp icon boxes */}
            <div className="flex flex-wrap gap-6 md:gap-8 border-t border-white/15 pt-5 md:pt-6">
              {[
                { value: '500+', label: 'Projekte' },
                { value: '1,35 Mio.', label: 'Einsätze' },
                { value: '>2.000', label: 'Talente im Pool' },
                { value: '2007', label: 'Gegründet' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 border border-white/20 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <i className="ri-arrow-right-up-line text-primary-500 text-sm" />
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-black text-white leading-none">{s.value}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Dark-bg WoodenDivider — hero(dark) exit into uber-uns(light) */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      {/* ── SECTIONS ── */}
      <div id="uber-uns">
        <StackedSectionReveal index={0} totalSections={4}>
          <OriginStory focusImages={focusImages} />
          <ValuesVisual />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      <div id="team">
        <StackedSectionReveal index={2} totalSections={4}>
          <LeadershipTeam />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />

      <div id="management-voices">
        <StackedSectionReveal index={3} totalSections={4}>
          <ManagementVoices leadershipImages={leadershipImages} />
        </StackedSectionReveal>
      </div>

      <WoodenDivider />
      </main>
    </div>
  );
}