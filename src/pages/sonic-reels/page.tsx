import { useCallback, useEffect, useState } from 'react';
import SonicReelsTimeline from './components/SonicReelsTimeline';
import { useTextSection } from '@/hooks/useText';
import { useSEO } from '@/hooks/useSEO';
import { CONTACT_EMAIL } from '@/lib/contact';

export interface EraPhoto {
  src: string;
  caption: string;
}

export interface EraData {
  id: string;
  label: string;
  years: string;
  tagline: string;
  quote: string;
  attribution: string;
  accent: string;
  filter: string;
  photo: string;
  caption?: string;
  photos: EraPhoto[];
}

/* ── Base data (photos, filters, accents — never changes) ── */
const ERA_BASE: Array<Omit<EraData, 'quote' | 'attribution'> & { quote?: string; attribution?: string }> = [
  {
    id: 'era-2007-2015',
    label: '2007–2015',
    years: '2007–2015',
    tagline: 'The Genesis',
    accent: '#c8d400',
    filter: 'sepia(0.5) hue-rotate(55deg) saturate(0.72) contrast(0.95) brightness(0.88)',
    photo: '/images/Über uns/Sonic Reels/2007-2015/DSC06048.webp',
    caption: '',
    photos: [
      { src: '/images/Über uns/Sonic Reels/2007-2015/DSC06048.webp', caption: 'First desk, first client — the backroom years.' },
      { src: '/images/Über uns/Sonic Reels/2007-2015/10 Jahre Sonic (12 von 248).webp', caption: 'Ten years in — the team outgrew the backroom.' },
      { src: '/images/Über uns/Sonic Reels/2007-2015/10 Jahre Sonic (17 von 248).webp', caption: 'Celebrating a decade of standing room only.' },
      { src: '/images/Über uns/Sonic Reels/2007-2015/10 Jahre Sonic (93 von 248).webp', caption: 'The early crew, before the name meant anything.' },
      { src: '/images/Über uns/Sonic Reels/2007-2015/DSC04386.webp', caption: 'Training the first wave by hand.' },
    ],
  },
  {
    id: 'era-2015-2019',
    label: '2015–2019',
    years: '2015–2019',
    tagline: 'The Momentum',
    accent: '#c8d400',
    filter: 'sepia(0.38) hue-rotate(46deg) saturate(1) contrast(1.05)',
    photo:
      'https://readdy.ai/api/search-image?query=dramatic%20wide%20angle%20view%20of%20a%20large%20modern%20German%20consumer%20electronics%20store%20Samsung%20brand%20zone%20with%20multiple%20promoters%20working%20simultaneously%20confident%20professional%20atmosphere%20clean%20premium%20retail%20environment%20cinematic%20photography%202016%20era%20high%20energy%20commercial%20photography&width=1920&height=1080&seq=sonic-reels-hero-2015&orientation=landscape',
    photos: [
      {
        src: 'https://readdy.ai/api/search-image?query=dramatic%20wide%20angle%20view%20of%20a%20large%20modern%20German%20consumer%20electronics%20store%20Samsung%20brand%20zone%20with%20multiple%20promoters%20working%20simultaneously%20confident%20professional%20atmosphere%20clean%20premium%20retail%20environment%20cinematic%20photography%202016%20era%20high%20energy%20commercial%20photography&width=1920&height=1080&seq=sonic-reels-hero-2015&orientation=landscape',
        caption: 'Two hundred specialists. One rollout.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=brand%20ambassadors%20in%20Samsung%20retail%20training%20session%20learning%20product%20demonstration%20techniques%20in%20modern%20electronics%20store%20professional%20corporate%20atmosphere%20warm%20ambient%20lighting%202015%20commercial%20photography%20realistic%20detailed%20high%20resolution&width=1200&height=900&seq=sonic-reels-2015-01&orientation=landscape',
        caption: 'Samsung training — every rep, every product.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=professional%20brand%20promoter%20demonstrating%20Samsung%20smartphone%20to%20customer%20at%20retail%20electronics%20store%20point%20of%20sale%20display%20clean%20modern%20store%20interior%20warm%20ambient%20lighting%202015%20era%20commercial%20photography%20realistic%20marketing%20scene&width=1200&height=900&seq=sonic-reels-2015-02&orientation=landscape',
        caption: 'One demo at a time, the floor came alive.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=marketing%20team%20morning%20briefing%20huddle%20before%20Samsung%20product%20launch%20retail%20campaign%20group%20of%20brand%20ambassadors%20holding%20tablets%20and%20plans%20modern%20bright%20office%20natural%20light%202016%20era%20editorial%20corporate%20photography&width=1200&height=900&seq=sonic-reels-2015-03&orientation=landscape',
        caption: 'Morning briefing before the doors opened.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=busy%20consumer%20electronics%20retail%20floor%20with%20multiple%20promotional%20stands%20and%20Samsung%20brand%20zones%20customers%20browsing%20modern%20store%20layout%20bright%20clean%20atmosphere%202016%20era%20wide%20angle%20commercial%20photography&width=1200&height=900&seq=sonic-reels-2015-04&orientation=landscape',
        caption: 'Two hundred specialists across the DACH.',
      },
    ],
  },
  {
    id: 'era-2019-2022',
    label: '2019–2022',
    years: '2019–2022',
    tagline: 'The Resilience',
    accent: '#c8d400',
    filter: 'sepia(0.26) hue-rotate(38deg) saturate(1.05) contrast(1.08)',
    photo: '/images/Über uns/Sonic Reels/2019-2022/IMG_2662 Kopie.webp',
    caption: '',
    photos: [
      { src: '/images/Über uns/Sonic Reels/2019-2022/IMG_2662 Kopie.webp', caption: 'Closed doors. Open playbook.' },
      { src: '/images/Über uns/Sonic Reels/2019-2022/1VITAMIN RUN Kopie.webp', caption: 'Vitamin Run — keeping spirits up in lockdown.' },
      { src: '/images/Über uns/Sonic Reels/2019-2022/2 Kopie.webp', caption: 'Rebuilding the playbook in seventy-two hours.' },
      { src: '/images/Über uns/Sonic Reels/2019-2022/3 Kopie.webp', caption: 'Masks on, hands ready, brands first.' },
      { src: '/images/Über uns/Sonic Reels/2019-2022/8bf219be-9a18-4894-aaf8-54ff1b946699 Kopie.webp', caption: 'The first store to reopen — we were inside.' },
      { src: '/images/Über uns/Sonic Reels/2019-2022/IMG_2679 Kopie.webp', caption: 'Social distance, full engagement.' },
    ],
  },
  {
    id: 'era-2022-2023',
    label: '2022–2023',
    years: '2022–2023',
    tagline: 'The Acceleration',
    accent: '#c8d400',
    filter: 'sepia(0.16) hue-rotate(28deg) saturate(1.1) contrast(1.1)',
    photo: '/images/Über uns/Sonic Reels/2022-2023/IMG_8931 Kopie.webp',
    caption: '',
    photos: [
      { src: '/images/Über uns/Sonic Reels/2022-2023/IMG_8931 Kopie.webp', caption: 'Five brands. Zero missed metrics.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/1.RBA Canon Kopie.webp', caption: 'RBA launch — Canon front and center.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/717c9fd9-fa26-41f9-9b0a-f38151a0c6d5 Kopie.webp', caption: 'A full retail floor, every corner activated.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/BILD_2 Kopie.webp', caption: 'Merchandising at scale.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/BILD_3 Kopie.webp', caption: 'The shelf, perfected.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/DSC05528 Kopie.webp', caption: 'Training the next hundred specialists.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/DSC05532 Kopie.webp', caption: 'Live on the floor, no rehearsal.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/DSC05554 Kopie.webp', caption: 'A day in the field, five brands deep.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/IMG_5398 Kopie.webp', caption: 'The crew that made two billion move.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/KUNUNU_PIC Kopie.webp', caption: 'Kununu top-rated — the team said it best.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/P1 Kopie.webp', caption: 'Priority one: the customer.' },
      { src: '/images/Über uns/Sonic Reels/2022-2023/PHOTO-2023-09-28-22-26-22 Kopie.webp', caption: 'End of season, still standing.' },
    ],
  },
  {
    id: 'era-2024',
    label: '2024',
    years: '2024',
    tagline: 'The Edge',
    accent: '#c8d400',
    filter: 'sepia(0.07) hue-rotate(16deg) saturate(1.15) contrast(1.12)',
    photo:
      'https://readdy.ai/api/search-image?query=sleek%20futuristic%20modern%20tech%20office%20with%20large%20curved%20monitors%20showing%20retail%20analytics%20dashboards%20glowing%20data%20visualisations%20warm%20accent%20lighting%20minimalist%20interior%20design%20Sonic%20brand%20team%20reviewing%20live%20campaign%20data%20editorial%20corporate%20tech%20photography%202024%20premium%20atmosphere&width=1920&height=1080&seq=sonic-reels-hero-2024&orientation=landscape',
    photos: [
      {
        src: 'https://readdy.ai/api/search-image?query=sleek%20futuristic%20modern%20tech%20office%20with%20large%20curved%20monitors%20showing%20retail%20analytics%20dashboards%20glowing%20data%20visualisations%20warm%20accent%20lighting%20minimalist%20interior%20design%20Sonic%20brand%20team%20reviewing%20live%20campaign%20data%20editorial%20corporate%20tech%20photography%202024%20premium%20atmosphere&width=1920&height=1080&seq=sonic-reels-hero-2024&orientation=landscape',
        caption: 'The data finally saw what we saw.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=premium%20Garmin%20smartwatch%20retail%20display%20with%20professional%20brand%20promoter%20explaining%20features%20to%20customer%20modern%20sports%20store%20clean%20merchandising%20warm%20accent%20lighting%202024%20commercial%20product%20photography&width=1200&height=900&seq=sonic-reels-2024-01&orientation=landscape',
        caption: 'Garmin grew 130% — the proof was on screen.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=closeup%20of%20large%20monitor%20displaying%20retail%20analytics%20dashboard%20with%20glowing%20charts%20and%20real%20time%20sales%20data%20visualization%20dark%20modern%20office%20warm%20accent%20lighting%202024%20technology%20photography&width=1200&height=900&seq=sonic-reels-2024-02&orientation=landscape',
        caption: 'Live dashboards replaced gut feeling.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=team%20of%20analysts%20reviewing%20live%20campaign%20performance%20data%20on%20large%20curved%20screen%20modern%20tech%20office%20collaboration%20warm%20ambient%20light%202024%20editorial%20corporate%20photography&width=1200&height=900&seq=sonic-reels-2024-03&orientation=landscape',
        caption: 'The team watching the investment work.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=Garmin%20point%20of%20sale%20merchandising%20display%20in%20sports%20retail%20store%20clean%20organized%20premium%20product%20presentation%20subtle%20lighting%20brand%20colors%202024%20retail%20photography&width=1200&height=900&seq=sonic-reels-2024-04&orientation=landscape',
        caption: 'Every shelf, every display, every metric.',
      },
    ],
  },
  {
    id: 'era-2025',
    label: '2025',
    years: '2025',
    tagline: 'The Peak',
    accent: '#c8d400',
    filter: 'sepia(0.02) hue-rotate(6deg) saturate(1.2) contrast(1.15)',
    photo:
      'https://readdy.ai/api/search-image?query=cinematic%20aerial%20drone%20photograph%20of%20Sonic%20Promotions%20largest%20ever%20team%20event%20outdoor%20arena%20Cologne%20summer%202025%20thousands%20of%20brand%20ambassadors%20on%20a%20large%20field%20branded%20shirts%20visible%20from%20above%20geometric%20patterns%20golden%20hour%20light%20epic%20scale%20commercial%20photography%20dramatic&width=1920&height=1080&seq=sonic-reels-hero-2025&orientation=landscape',
    photos: [
      {
        src: 'https://readdy.ai/api/search-image?query=cinematic%20aerial%20drone%20photograph%20of%20Sonic%20Promotions%20largest%20ever%20team%20event%20outdoor%20arena%20Cologne%20summer%202025%20thousands%20of%20brand%20ambassadors%20on%20a%20large%20field%20branded%20shirts%20visible%20from%20above%20geometric%20patterns%20golden%20hour%20light%20epic%20scale%20commercial%20photography%20dramatic&width=1920&height=1080&seq=sonic-reels-hero-2025&orientation=landscape',
        caption: '2,000 strong — the top of the mountain.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=aerial%20view%20of%20massive%20team%20event%20in%20large%20arena%20thousands%20of%20brand%20ambassadors%20seated%20in%20colorful%20branded%20shirts%20geometric%20patterns%20stage%20in%20center%20bright%20lights%202025%20event%20photography&width=1200&height=900&seq=sonic-reels-2025-01&orientation=landscape',
        caption: 'The arena held every one of them.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=concert%20style%20stage%20with%20dramatic%20lighting%20and%20large%20screens%20at%20corporate%20team%20celebration%20event%20arena%20atmosphere%20beams%20of%20light%20confetti%202025%20event%20photography&width=1200&height=900&seq=sonic-reels-2025-02&orientation=landscape',
        caption: 'One stage, two thousand voices.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=energetic%20crowd%20of%20brand%20ambassadors%20wearing%20matching%20branded%20shirts%20cheering%20at%20outdoor%20event%20golden%20hour%20warm%20sunlight%20festival%20atmosphere%202025%20photography&width=1200&height=900&seq=sonic-reels-2025-03&orientation=landscape',
        caption: 'The shirts said it before we could.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=celebration%20moment%20team%20members%20raising%20hands%20cheering%20confetti%20falling%20golden%20hour%20outdoor%20corporate%20event%20joyful%20atmosphere%202025%20photography&width=1200&height=900&seq=sonic-reels-2025-04&orientation=landscape',
        caption: 'One evening to celebrate the best year yet.',
      },
    ],
  },
  {
    id: 'era-2026',
    label: '2026',
    years: '2026',
    tagline: 'The Horizon',
    accent: '#c8d400',
    filter: 'sepia(0) saturate(1.2) contrast(1.15)',
    photo:
      'https://readdy.ai/api/search-image?query=bold%20visionary%20architectural%20concept%20photograph%20of%20futuristic%20retail%20experience%20zone%20with%20advanced%20holographic%20product%20display%20digital%20signage%20ambient%20lighting%20premium%20brand%20activation%20space%20ultramodern%20design%20aesthetic%20editorial%20photography%20aspirational%202026%20forward-looking%20technology%20and%20human%20connection&width=1920&height=1080&seq=sonic-reels-hero-2026&orientation=landscape',
    photos: [
      {
        src: 'https://readdy.ai/api/search-image?query=bold%20visionary%20architectural%20concept%20photograph%20of%20futuristic%20retail%20experience%20zone%20with%20advanced%20holographic%20product%20display%20digital%20signage%20ambient%20lighting%20premium%20brand%20activation%20space%20ultramodern%20design%20aesthetic%20editorial%20photography%20aspirational%202026%20forward-looking%20technology%20and%20human%20connection&width=1920&height=1080&seq=sonic-reels-hero-2026&orientation=landscape',
        caption: 'Next stop: Europe.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=futuristic%20retail%20experience%20zone%20with%20holographic%20product%20display%20advanced%20digital%20signage%20ambient%20lighting%20premium%20brand%20activation%20space%20ultramodern%20design%202026%20concept%20photography&width=1200&height=900&seq=sonic-reels-2026-01&orientation=landscape',
        caption: 'The retail floor of tomorrow, already here.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=modern%20European%20city%20street%20with%20premium%20retail%20storefronts%20illuminated%20digital%20displays%20evening%20light%20architectural%20photography%20forward%20looking%202026%20urban%20retail&width=1200&height=900&seq=sonic-reels-2026-02&orientation=landscape',
        caption: 'From Cologne to every capital.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=large%20wall%20of%20digital%20signage%20screens%20in%20premium%20retail%20environment%20showing%20dynamic%20brand%20content%20ambient%20lighting%20modern%20minimal%20interior%20design%202026%20photography&width=1200&height=900&seq=sonic-reels-2026-03&orientation=landscape',
        caption: 'Digital first, human always.',
      },
      {
        src: 'https://readdy.ai/api/search-image?query=premium%20brand%20activation%20space%20with%20interactive%20displays%20and%20elegant%20lighting%20design%20futuristic%20retail%20showroom%20warm%20ambient%20atmosphere%202026%20editorial%20photography&width=1200&height=900&seq=sonic-reels-2026-04&orientation=landscape',
        caption: 'Defining what European retail looks like.',
      },
    ],
  },
];

/* ── Film countdown splash ────────────────────────────────────────────────── */
function FilmCountdown({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(4);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      onDone();
      return;
    }
    const flickerT = setTimeout(() => setFlicker(true), 60);
    const flickerOff = setTimeout(() => setFlicker(false), 160);
    const next = setTimeout(() => setCount((c) => c - 1), 700);
    return () => {
      clearTimeout(flickerT);
      clearTimeout(flickerOff);
      clearTimeout(next);
    };
  }, [count, onDone]);

  return (
    <div
      className="fixed inset-0 z-system flex items-center justify-center overflow-hidden"
      style={{ background: flicker ? '#1a1a00' : '#0a0a0a' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: flicker ? 0.12 : 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center py-4" style={{ background: '#1a1a1a' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="rounded-[1px] border border-white/20" style={{ width: 14, height: 10, background: 'rgba(0,0,0,0.7)' }} />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-10 flex flex-col justify-around items-center py-4" style={{ background: '#1a1a1a' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="rounded-[1px] border border-white/20" style={{ width: 14, height: 10, background: 'rgba(0,0,0,0.7)' }} />
        ))}
      </div>
      <div className="relative flex flex-col items-center gap-6">
        <div
          className="relative flex items-center justify-center"
          style={{ width: 180, height: 180, border: '2px solid rgba(200,212,0,0.3)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-full h-px" style={{ background: 'rgba(200,212,0,0.15)' }} />
            <div className="absolute h-full w-px" style={{ background: 'rgba(200,212,0,0.15)' }} />
          </div>
          {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
            <div key={i} className="absolute" style={{ top: sy === -1 ? 8 : 'auto', bottom: sy === 1 ? 8 : 'auto', left: sx === -1 ? 8 : 'auto', right: sx === 1 ? 8 : 'auto' }}>
              <div style={{ width: 12, height: 12, borderTop: sy === -1 ? '2px solid rgba(200,212,0,0.6)' : 'none', borderBottom: sy === 1 ? '2px solid rgba(200,212,0,0.6)' : 'none', borderLeft: sx === -1 ? '2px solid rgba(200,212,0,0.6)' : 'none', borderRight: sx === 1 ? '2px solid rgba(200,212,0,0.6)' : 'none' }} />
            </div>
          ))}
          {count > 0 ? (
            <span
              key={count}
              className="font-black"
              style={{ fontSize: '7rem', color: flicker ? '#C8D400' : 'rgba(255,255,255,0.9)', fontFamily: '"Bebas Neue", Impact, sans-serif', lineHeight: 1, animation: 'countPop 0.3s ease-out' }}
            >
              {count}
            </span>
          ) : (
            <i className="ri-film-line text-primary-500" style={{ fontSize: '4rem' }} />
          )}
        </div>
        <span className="font-black uppercase tracking-[0.5em]" style={{ fontSize: '0.6rem', color: 'rgba(200,212,0,0.5)', fontFamily: 'monospace' }}>
          SONIC REELS · ARCHIV
        </span>
      </div>
      <style>{`
        @keyframes countPop {
          from { transform: scale(1.3); opacity: 0.5; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function SonicReelsPage() {
  const [showCountdown, setShowCountdown] = useState(true);
  const [splashVisible, setSplashVisible] = useState(false);

  useSEO({
    title: 'Sonic Reels | 2007 bis heute — Unsere Geschichte | Sonic Group',
    description: 'Sonic Reels: Fast zwei Jahrzehnte Retail Activation in Bildern. Die Geschichte von Sonic Group von 2007 bis heute — Markenaktivierung im DACH-Raum.',
    keywords: 'sonic reels, sonic group geschichte, retail activation archiv, markenaktivierung historie',
    canonical: 'https://sonic-group.de/sonic-reels',
  });

  const handleCountdownDone = useCallback(() => {
    setShowCountdown(false);
    setTimeout(() => setSplashVisible(true), 100);
  }, []);

  /* ── Pull editable text from the dashboard store ── */
  const texts = useTextSection('sonicreels_page');

  const eras: EraData[] = ERA_BASE.map((base, i) => {
    const n = i + 1;
    return {
      ...base,
      quote: texts[`reels-era-${n}-quote`] || base.quote || '',
      attribution: texts[`reels-era-${n}-attribution`] || base.attribution || '',
      caption: texts[`reels-era-${n}-caption`] || base.caption || '',
    };
  });

  const splashSub = texts['reels-splash-sub'] || '2007 — Present';
  const pageTitle = texts['reels-page-title'] || 'Sonic';
  const pageTitleAccent = texts['reels-page-title-accent'] || 'Reels';
  const pageSubtitle = texts['reels-page-subtitle'] || 'Nearly two decades of retail activation — told through the moments that defined us.';

  const endLabel = texts['reels-end-label'] || 'The story continues';
  const endLine1 = texts['reels-end-text-line1'] || 'Every era added a chapter. Every campaign wrote a sentence.';
  const endLine2 = texts['reels-end-text-line2'] || 'The next line starts with you.';
  const endCta = texts['reels-end-cta'] || 'Start the Next Chapter';

  return (
    <div className="bg-[#161512] overflow-x-hidden">
      {showCountdown && <FilmCountdown onDone={handleCountdownDone} />}

      {/* ── SPLASH HERO ── */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#161512', minHeight: '150px', padding: '24px 0 28px' }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,212,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="relative z-10 sonic-container px-6 text-center"
          style={{ opacity: splashVisible ? 1 : 0, transform: splashVisible ? 'none' : 'translateY(16px)', transition: 'all 0.8s ease' }}
        >
          <div className="inline-flex items-center gap-2.5 mb-3">
            <div className="h-px w-6 bg-primary-500/40" />
            <span className="text-primary-500/60 text-[10px] font-black uppercase tracking-[0.3em]">{splashSub}</span>
            <div className="h-px w-6 bg-primary-500/40" />
          </div>
          <h1 className="font-black text-white leading-none uppercase" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            {pageTitle} <span style={{ color: '#C8D400' }}>{pageTitleAccent}</span>
          </h1>
          <p className="text-white/35 text-xs font-medium max-w-lg mx-auto mt-2 leading-relaxed">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* ── UNIFIED TIMELINE ── */}
      <SonicReelsTimeline eras={eras} />

      {/* ── END CARD — dark cinematic, inline with new aesthetic ── */}
      <div className="relative overflow-hidden" style={{ background: '#161512' }}>
        {/* Subtle grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
        {/* Giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="font-black text-white/[0.025] leading-none" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}>2007+</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(200,212,0,0.35))' }} />
            <span className="text-primary-500 text-xs font-black uppercase tracking-[0.4em]">{endLabel}</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(200,212,0,0.35))' }} />
          </div>

          {/* Quote */}
          <blockquote
            className="font-medium leading-relaxed max-w-xl mx-auto mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}
          >
            &ldquo;{endLine1}&rdquo;
          </blockquote>
          <p className="font-black uppercase tracking-[0.25em] mb-12" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>
            {endLine2}
          </p>

          {/* CTA — understated, outline style */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 px-10 py-4 border font-black uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
            style={{
              borderColor: 'rgba(200,212,0,0.4)',
              color: '#C8D400',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,212,0,0.08)';
              e.currentTarget.style.borderColor = 'rgba(200,212,0,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(200,212,0,0.4)';
            }}
          >
            {endCta}
            <i className="ri-arrow-right-line text-lg" />
          </a>

          {/* Sprocket strip decoration */}
          <div className="flex items-center justify-center gap-3 mt-16 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-[1px]" style={{ width: 10, height: 7, background: 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}