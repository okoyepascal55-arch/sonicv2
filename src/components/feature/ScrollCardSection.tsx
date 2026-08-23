import { useState, useRef } from 'react';

export interface ScrollCardData {
  woodIcon?: string;
  icon?: string;
  num: string;
  accent: string;
  title: string;
  desc: string;
  tags?: string[];
}

interface ScrollCardSectionProps {
  data: ScrollCardData[];
  label: string;
  theme?: 'dark' | 'light';
  variant?: 'wood' | 'remix';
  cardWidth?: string;
  cardMinHeight?: string;
  showWoodIcon?: boolean;
  className?: string;
}

function resolveThemeTokens(theme: 'dark' | 'light', isActive: boolean) {
  const d = theme === 'dark';
  return {
    cardBg: d ? (isActive ? '#ffffff' : 'rgba(255,255,255,0.05)') : (isActive ? '#111' : '#ffffff'),
    cardBorder: d ? (isActive ? 'rgba(200,212,0,0.5)' : 'rgba(255,255,255,0.08)') : (isActive ? 'rgba(200,212,0,0.5)' : 'rgba(0,0,0,0.09)'),
    cardShadow: d
      ? (isActive ? '0 0 0 1px rgba(200,212,0,0.35), 0 24px 48px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)')
      : (isActive ? '0 0 0 1px rgba(200,212,0,0.3), 0 24px 48px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.04)'),
    titleColor: d ? (isActive ? '#111' : '#fff') : (isActive ? '#fff' : '#111'),
    descColor: d ? (isActive ? '#555' : 'rgba(255,255,255,0.5)') : (isActive ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)'),
    accentColor: d ? (isActive ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.5)') : (isActive ? 'oklch(var(--primary-500))' : 'rgba(139,110,0,0.7)'),
    numWatermarkColor: d ? (isActive ? 'rgba(200,212,0,0.07)' : 'rgba(255,255,255,0.04)') : (isActive ? 'rgba(200,212,0,0.07)' : 'rgba(0,0,0,0.04)'),
    topBarBg: d ? (isActive ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)') : (isActive ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.08)'),
    topBarGlow: isActive ? '0 0 14px rgba(200,212,0,0.5)' : 'none',
    dotPipBg: d ? (isActive ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.4)') : (isActive ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.6)'),
    cornerBorderColor: isActive ? 'rgba(200,212,0,0.5)' : 'transparent',
    labelColor: d ? 'rgba(255,255,255,0.2)' : 'rgba(17,17,17,0.3)',
    arrowBgDefault: d ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
    arrowColorDefault: d ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)',
    arrowBgHover: d ? 'rgba(200,212,0,0.6)' : 'oklch(var(--primary-500))',
    arrowColorHover: d ? '#111' : '#111',
    navBorderColor: d ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)',
    navTextColor: d ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
    navHoverBorderColor: 'oklch(var(--primary-500))',
    dotInactiveBg: d ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
    countColor: d ? (isActive ? '#999' : 'rgba(255,255,255,0.25)') : (isActive ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'),
    borderTopColor: d ? (isActive ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)') : (isActive ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'),
    iconBoxShadow: d ? (isActive ? '0 10px 24px rgba(139,90,43,0.35)' : '0 4px 14px rgba(139,90,43,0.22)') : (isActive ? '0 10px 24px rgba(139,90,43,0.35)' : '0 4px 14px rgba(139,90,43,0.18)'),
  };
}

export default function ScrollCardSection({
  data,
  label,
  theme = 'light',
  variant = 'wood',
  cardWidth = 'clamp(280px, 26vw, 340px)',
  cardMinHeight = '380px',
  showWoodIcon = true,
  className = '',
}: ScrollCardSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    setActiveIdx(i);
    scrollRef.current?.scrollTo({ left: i * 380, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';
  const resolvedLabelColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(17,17,17,0.3)';
  const resolvedNavBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)';
  const resolvedNavText = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const resolvedDotInactive = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  return (
    <div className={className}>
      <div className="flex items-center mb-6 gap-3">
        <span
          className="text-[11px] font-black uppercase tracking-widest flex-grow"
          style={{ color: resolvedLabelColor }}
        >
          {label}
        </span>
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer"
          style={{ borderColor: resolvedNavBorder, color: resolvedNavText }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'oklch(var(--primary-500))';
            e.currentTarget.style.color = 'oklch(var(--primary-500))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = resolvedNavBorder;
            e.currentTarget.style.color = resolvedNavText;
          }}
          aria-label="links"
        >
          <i className="ri-arrow-left-s-line text-xl" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 flex items-center justify-center border transition-all duration-200 cursor-pointer"
          style={{ borderColor: resolvedNavBorder, color: resolvedNavText }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'oklch(var(--primary-500))';
            e.currentTarget.style.color = 'oklch(var(--primary-500))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = resolvedNavBorder;
            e.currentTarget.style.color = resolvedNavText;
          }}
          aria-label="rechts"
        >
          <i className="ri-arrow-right-s-line text-xl" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((item, idx) => {
          const isA = activeIdx === idx;
          const t = resolveThemeTokens(theme, isA);

          return (
            <div
              key={idx}
              className="flex-shrink-0 snap-start relative overflow-hidden cursor-default"
              style={{
                width: cardWidth,
                minHeight: cardMinHeight,
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
                transition: 'all 0.3s ease',
                transform: isA ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: t.cardShadow,
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 z-20"
                style={{
                  height: isA ? '3px' : '2px',
                  background: t.topBarBg,
                  boxShadow: t.topBarGlow,
                  transition: 'all 0.3s ease',
                }}
              />
              {/* Left accent line */}
              <div
                className="absolute top-0 left-0 bottom-0 z-20 w-0.5"
                style={{
                  background: isA ? 'oklch(var(--primary-500))' : 'transparent',
                  transition: 'background 0.3s ease',
                }}
              />
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 z-10" style={{ borderColor: t.cornerBorderColor, transition: 'border-color 0.3s ease' }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 z-10" style={{ borderColor: t.cornerBorderColor, transition: 'border-color 0.3s ease' }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 z-10" style={{ borderColor: t.cornerBorderColor, transition: 'border-color 0.3s ease' }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 z-10" style={{ borderColor: t.cornerBorderColor, transition: 'border-color 0.3s ease' }} />
              {/* Watermark number */}
              <div
                className="absolute bottom-4 right-4 font-black leading-none select-none pointer-events-none z-0"
                style={{ fontSize: '6rem', color: t.numWatermarkColor, lineHeight: 1, transition: 'color 0.3s ease' }}
              >
                {item.num}
              </div>

              <div className="relative z-10 p-7 flex flex-col" style={{ minHeight: cardMinHeight }}>
                {/* Accent label */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5" style={{ background: t.dotPipBg, transition: 'background 0.3s ease' }} />
                  <span
                    className="text-[10px] font-black uppercase tracking-widest"
                    style={{ color: t.accentColor, transition: 'color 0.3s ease' }}
                  >
                    {item.accent}
                  </span>
                </div>

                {/* Icon */}
                {showWoodIcon && item.woodIcon && (
                  <div
                    className="w-[56px] h-[56px] overflow-hidden mb-6 flex-shrink-0"
                    style={{
                      boxShadow: t.iconBoxShadow,
                      transition: 'all 0.35s ease',
                      transform: isA ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    <img src={item.woodIcon} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}

                {variant === 'remix' && item.icon && (
                  <div
                    className="w-[56px] h-[56px] flex items-center justify-center mb-6 flex-shrink-0"
                    style={{
                      background: isA
                        ? 'linear-gradient(145deg, #d4e100, #C8D400)'
                        : (theme === 'dark' ? 'linear-gradient(145deg, #1c1c1c, #111)' : 'rgba(0,0,0,0.07)'),
                      boxShadow: isA
                        ? '0 10px 24px rgba(200,212,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)'
                        : (theme === 'dark' ? '0 8px 20px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)'),
                      transition: 'all 0.35s ease',
                    }}
                  >
                    <i
                      className={`${item.icon} text-xl`}
                      style={{ color: isA ? '#111' : (theme === 'dark' ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.5)'), transition: 'color 0.35s ease' }}
                    />
                  </div>
                )}

                {/* Title */}
                <h3
                  className="text-base font-black mb-3 leading-snug uppercase"
                  style={{ color: t.titleColor, transition: 'color 0.3s ease' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-grow"
                  style={{ color: t.descColor, transition: 'color 0.3s ease' }}
                >
                  {item.desc}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4 mt-4"
                  style={{
                    borderTop: `1px solid ${t.borderTopColor}`,
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-widest"
                    style={{ color: t.countColor, transition: 'color 0.3s ease' }}
                  >
                    {item.num} / {String(data.length).padStart(2, '0')}
                  </span>
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{
                      background: isA ? 'oklch(var(--primary-500))' : (theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'),
                      transform: isA ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <i
                      className="ri-arrow-right-line text-sm"
                      style={{
                        color: isA ? '#111' : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)'),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="cursor-pointer"
            style={{
              width: i === (activeIdx ?? 0) ? '22px' : '6px',
              height: '3px',
              background: i === (activeIdx ?? 0) ? 'oklch(var(--primary-500))' : resolvedDotInactive,
              border: 'none',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
            aria-label={`${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}