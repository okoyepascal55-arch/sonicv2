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
    <section className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950" style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}>
      {/* Background photo */}
      <img
        src={heroImage || 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png'}
        alt="Sonic Group Leistungen"
        className="absolute inset-0 w-full h-full object-cover object-top"
        fetchPriority="high"
        decoding="async"
      />

      {/* Dark veil — bottom-heavy for anchored content */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0.30) 0%, rgba(11,11,12,0.20) 45%, rgba(11,11,12,0.82) 100%)' }}
        aria-hidden="true"
      />

      {/* Content — left-aligned, bottom-anchored */}
      <div className="relative z-20 w-full max-w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-full max-w-[640px]">
        {/* v3 eyebrow — 28px lime hairline + label */}
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>Leistungen</span>
        </div>

        {/* Main headline */}
        <h1 className="leist-h1-hub text-white mb-5 md:mb-6">
          MANPOWER TRIFFT{' '}
          <span
            className="text-primary-500 inline-block"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}
          >
            {CYCLING_WORDS[wordIdx]}
          </span>
        </h1>

        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-3">
          Full Service für deine Marken und Produkte im Retail
        </p>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[480px] mb-6 md:mb-8">
          Von Daten &amp; Software über Personal &amp; Staffing bis zu POS, Video und Events:{' '}
          Alles aus einer Hand — datenbasiert geplant, live reportet, messbar erfolgreich.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
          <a
            href="https://calendly.com/sonic-group/beratungsgespraech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 bg-primary-500 text-foreground-950 font-bold text-xs md:text-sm hover:bg-white transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-calendar-line text-base"></i>
            Beratungsgespräch buchen
          </a>
          <button
            onClick={onScrollToGrid}
            className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 border border-white/40 text-white font-bold text-xs md:text-sm hover:bg-white/10 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Alle Leistungen entdecken
            <i className="ri-arrow-down-line text-base"></i>
          </button>
        </div>
        </div>

        {/* 4-stat hairline strip — per brief: 26px/900 numbers, full-width */}
        <div
          className="w-full grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}
        >
          {[
            { value: '>500', label: 'Projekte' },
            { value: '>1,35 Mio.', label: 'Einsätze' },
            { value: '>100K', label: 'POS-Standorte' },
            { value: '2007', label: 'Gegründet' },
          ].map((s, i) => (
            <div
              key={i}
              className="px-3 md:px-8 py-4 md:py-6 flex flex-col gap-1"
              style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.14)' : undefined }}
            >
              <span
                className="font-black tabular-nums leading-none"
                style={{ fontSize: 'clamp(16px,3.5vw,26px)', letterSpacing: '-0.03em', color: i === 3 ? 'oklch(0.81 0.19 115)' : '#fff', whiteSpace: 'nowrap' }}
              >
                {s.value}
              </span>
              <span
                className="font-black uppercase tracking-[0.18em]"
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}