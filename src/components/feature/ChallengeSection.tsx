import { useState, useEffect, useRef } from 'react';

export interface ChallengeItem {
  icon: string;
  stat?: string;
  statLabel?: string;
  title: string;
  desc: string;
  trigger?: string;
  woodIcon?: string;
}

interface ChallengeSectionProps {
  id?: string;
  badge?: string;
  headline: string;
  subline?: string;
  challenges: ChallengeItem[];
}

export default function ChallengeSection({
  id = 'herausforderung',
  badge = 'Deine Herausforderung',
  headline,
  subline,
  challenges,
}: ChallengeSectionProps) {
  const [active, setActive] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(Array(challenges.length).fill(false));
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const revealedCount = revealed.filter(Boolean).length;
  const total = challenges.length;
  const allRevealed = revealedCount === total;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleReveal = (i: number) => {
    setRevealed(prev => { const n = [...prev]; n[i] = true; return n; });
    setActive(i);
  };

  const counterLabel = () => {
    if (allRevealed) return `${total}/${total} erkannt? Dann reden wir.`;
    if (revealedCount === 0) return 'Hover über die Punkte — erkennst du dich wieder?';
    return `${revealedCount}/${total} erkannt — weiter scrollen?`;
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden py-16 md:py-28 px-4 md:px-6"
      style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/3 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header row */}
        <div
          className="mb-12 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-black text-primary-500 uppercase tracking-[0.2em] mb-6">{badge}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground-950 leading-[1.05] mb-4">
              {headline}
            </h2>
            {subline && (
              <p className="text-foreground-950/50 text-base md:text-lg max-w-xl leading-relaxed">{subline}</p>
            )}
          </div>

          {/* Gamified counter — top right on desktop */}
          <div
            className="flex-shrink-0 lg:text-right"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.3s',
            }}
          >
            {/* Progress dots */}
            <div className="flex items-center gap-2 lg:justify-end mb-3">
              {challenges.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    width: revealed[i] ? '28px' : '8px',
                    height: '8px',
                    background: revealed[i] ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.1)',
                    boxShadow: revealed[i] ? '0 0 8px rgba(200,212,0,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
            {/* Counter text */}
            <div
              className="text-[11px] font-black uppercase tracking-widest transition-all duration-500"
              style={{
                color: allRevealed ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.25)',
              }}
            >
              {counterLabel()}
            </div>
            {/* CTA arrow when all revealed */}
            {allRevealed && (
              <a
                href="#loesung"
                className="inline-flex items-center gap-2 mt-3 text-[#C8D400] text-xs font-black uppercase tracking-widest cursor-pointer hover:gap-3 transition-all duration-300"
                style={{ animation: 'fadeSlideIn 0.4s ease-out' }}
              >
                Zur Lösung
                <i className="ri-arrow-down-line text-sm" />
              </a>
            )}
          </div>
        </div>

        {/* Challenge cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground-950/[0.08]">
          {challenges.map((c, i) => {
            const isActive = active === i;
            const isRevealed = revealed[i];
            return (
              <div
                key={i}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${i < challenges.length - 1 ? 'border-b md:border-b-0 md:border-r border-foreground-950/[0.08]' : ''}`}
                style={{
                  background: isActive
                    ? 'rgba(200,212,0,0.06)'
                    : isRevealed
                    ? 'rgba(200,212,0,0.025)'
                    : 'rgba(0,0,0,0.015)',
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${0.15 + i * 0.12}s, transform 0.6s ease ${0.15 + i * 0.12}s, background 0.4s ease`,
                }}
                onMouseEnter={() => { setActive(i); handleReveal(i); }}
                onMouseLeave={() => setActive(null)}
                onClick={() => handleReveal(i)}
              >
                {/* Left lime bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] transition-all duration-300"
                  style={{
                    background: isActive ? 'oklch(var(--primary-500))' : isRevealed ? 'rgba(200,212,0,0.25)' : 'transparent',
                    boxShadow: isActive ? '0 0 14px rgba(200,212,0,0.45)' : 'none',
                  }}
                />
                {/* Top edge glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-all duration-300"
                  style={{
                    background: isActive ? 'linear-gradient(90deg, #C8D400, transparent)' : 'transparent',
                  }}
                />
                {/* Giant watermark number */}
                <div
                  className="absolute bottom-0 right-0 font-black select-none pointer-events-none leading-none"
                  style={{
                    fontSize: 'clamp(80px, 10vw, 130px)',
                    color: isActive ? 'rgba(200,212,0,0.06)' : 'rgba(0,0,0,0.025)',
                    lineHeight: 0.85,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 p-7 md:p-9 flex flex-col min-h-[280px] md:min-h-[340px]">
                  {/* Icon + index */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: isActive ? 'oklch(var(--primary-500))' : isRevealed ? 'rgba(200,212,0,0.12)' : 'rgba(0,0,0,0.06)',
                        transform: isActive ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
                      }}
                    >
                      <i
                        className={`${c.icon} text-lg transition-colors duration-300`}
                        style={{ color: isActive ? '#111' : isRevealed ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.4)' }}
                      />
                    </div>
                    {/* Revealed checkmark OR index */}
                    {isRevealed ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center transition-all duration-300"
                        style={{ background: 'rgba(200,212,0,0.2)', border: '1px solid rgba(200,212,0,0.4)' }}
                      >
                        <i className="ri-check-line text-[#C8D400] text-xs" />
                      </div>
                    ) : (
                      <span
                        className="text-[11px] font-black tracking-widest"
                        style={{ color: 'rgba(0,0,0,0.15)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-black leading-tight mb-4 transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(1.2rem, 1.9vw, 1.55rem)',
                      color: isActive ? 'oklch(var(--foreground-950))' : 'rgba(0,0,0,0.68)',
                    }}
                  >
                    {c.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="text-sm leading-relaxed flex-grow transition-all duration-400"
                    style={{
                      color: 'rgba(0,0,0,0.45)',
                      opacity: isActive ? 1 : 0.65,
                      transform: isActive ? 'translateY(0)' : 'translateY(3px)',
                    }}
                  >
                    {c.desc}
                  </p>

                  {/* Trigger micro-CTA */}
                  <div
                    className="mt-6 flex items-center gap-2 transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                    }}
                  >
                    <div className="w-5 h-px bg-[#C8D400]" />
                    <span className="text-[11px] font-black text-[#C8D400] uppercase tracking-widest">
                      {c.trigger ?? 'Klingt bekannt?'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom status bar */}
        <div
          className="mt-8 flex items-center gap-4"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}
        >
          <div className="h-px flex-grow" style={{ background: 'rgba(0,0,0,0.07)' }} />
          <div className="flex items-center gap-3">
            {/* Mini progress bar */}
            <div
              className="relative overflow-hidden"
              style={{ width: '80px', height: '2px', background: 'rgba(0,0,0,0.08)' }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 transition-all duration-700"
                style={{
                  width: `${(revealedCount / total) * 100}%`,
                  background: 'oklch(var(--primary-500))',
                  boxShadow: revealedCount > 0 ? '0 0 8px rgba(200,212,0,0.5)' : 'none',
                }}
              />
            </div>
            <span
              className="text-[10px] font-black uppercase tracking-[0.18em] transition-colors duration-500 whitespace-nowrap"
              style={{ color: allRevealed ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.2)' }}
            >
              {allRevealed
                ? `${total}/${total} — Wir haben die Lösung.`
                : `${revealedCount}/${total} erkannt`}
            </span>
          </div>
          <div className="h-px flex-grow" style={{ background: 'rgba(0,0,0,0.07)' }} />
        </div>
      </div>

    </section>
  );
}