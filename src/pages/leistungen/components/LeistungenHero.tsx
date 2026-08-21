import React from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useCallback, useEffect, useState } from 'react';

const CYCLING_WORDS = [
  'ROI',
  'RETAIL',
  'POS',
  'EVENTS',
  'STAFFING',
  'VIDEO',
  'DATA',
  'GROWTH',
];

interface Props {
  onScrollToGrid: () => void;
}

export default function LeistungenHero({ onScrollToGrid }: Props) {
  const { images: leistungenHeroImages } = useMediaStore('leistungen_hero_images');
  const heroImage = leistungenHeroImages[0]?.url
    ? resolveImageUrl(leistungenHeroImages[0].url)
    : undefined;
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const cycleWord = useCallback(() => {
    setWordVisible(false);
    setTimeout(() => {
      setWordIdx((prev) => (prev + 1) % CYCLING_WORDS.length);
      setWordVisible(true);
    }, 320);
  }, []);

  useEffect(() => {
    const id = setInterval(cycleWord, 2200);
    return () => clearInterval(id);
  }, [cycleWord]);

  return (
    <section className="relative min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      {/* Background photo */}
      <img
        src={heroImage || 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png'}
        alt="Sonic Group Leistungen"
        className="absolute inset-0 w-full h-full object-cover object-top"
        fetchPriority="high"
        decoding="async"
      />

      {/* Dark veil */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.75) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#C8D400]/35 px-4 py-1.5 mb-7"
          style={{ background: 'rgba(200,212,0,0.1)' }}
        >
          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
          <span className="text-xs font-black text-[#C8D400] uppercase tracking-widest">Leistungen</span>
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-[1.0] tracking-tight">
          MANPOWER<br />
          TRIFFT{' '}
          <span
            className="text-[#C8D400] inline-block"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}
          >
            {CYCLING_WORDS[wordIdx]}
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-white/80 mb-3 font-semibold max-w-2xl mx-auto">
          Full Service für deine Marken und Produkte im Retail
        </p>
        <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10">
          Von Daten &amp; Software über Personal &amp; Staffing bis zu POS, Video und Events:{' '}
          Alles aus einer Hand — datenbasiert geplant, live reportet, messbar erfolgreich.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-14">
          <a
            href="https://calendly.com/sonic-group/beratungsgespraech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary-500 text-[#111] px-8 py-4 font-black hover:bg-white hover:text-[#111] transition-all duration-300 whitespace-nowrap cursor-pointer text-sm uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2"
          >
            <i className="ri-calendar-line text-base"></i>
            Beratungsgespräch buchen
          </a>
          <button
            onClick={onScrollToGrid}
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-8 py-4 font-black hover:border-[#C8D400] hover:text-[#C8D400] transition-all duration-300 whitespace-nowrap cursor-pointer text-sm uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2"
          >
            Alle Leistungen entdecken
            <i className="ri-arrow-down-line text-base"></i>
          </button>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
}