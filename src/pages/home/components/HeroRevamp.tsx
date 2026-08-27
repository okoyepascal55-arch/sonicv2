import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const DYNAMIC_KEYWORDS = [
  'THINGS',
  'RETAIL',
  'POS',
  'EVENTS',
  'ACTIVATIONS',
  'COMMUNITY OUTREACH',
  'FORECASTING',
  'FIELD SALES',
  'BRAND EXPERIENCE',
  'MERCHANDISING',
  'TRADE MARKETING',
];

const CHAR_DELAY = 100; // ms per character reveal
const HOLD_TIME = 2400; // ms to hold the completed word before advancing

function useTextTypewriter(text: string, trigger: number, charDelay = CHAR_DELAY) {
  const [revealed, setRevealed] = useState(text.length);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      setRevealed(text.length);
      return;
    }

    setRevealed(0);
    let count = 0;

    const tick = setInterval(() => {
      count++;
      setRevealed(count);
      if (count >= text.length) {
        clearInterval(tick);
      }
    }, charDelay);

    return () => clearInterval(tick);
  }, [text, trigger, charDelay]);

  return revealed;
}

function AnimatedLine({ text, className, lineDelay = 0 }: { text: string; className?: string; lineDelay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{
            ['--char-index' as string]: i,
            animation: 'charIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            animationDelay: `${lineDelay + i * 22}ms`,
            opacity: 0,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

function HoverLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ ['--char-index' as string]: i }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

interface HeroRevampProps {
  scrolled?: boolean;
}

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    setCount(0);
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── reusable image error handler ── */
function hideBrokenImg(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  target.style.display = 'none';
}

export default function HeroRevamp({ scrolled }: HeroRevampProps) {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // ── Dashboard-managed media ──
  const { images: statIcons } = useMediaStore('home_hero_stats');
  const { images: ctaIcons } = useMediaStore('home_hero_cta_icons');
  const { images: woodTextures } = useMediaStore('home_hero_wood_textures');

  // Parallax: normalized mouse offset (-0.5 to 0.5) relative to viewport
  const targetParallax = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const nx = lerp(currentParallax.current.x, targetParallax.current.x, 0.06);
      const ny = lerp(currentParallax.current.y, targetParallax.current.y, 0.06);
      currentParallax.current = { x: nx, y: ny };

      if (statsRef.current) {
        statsRef.current.style.setProperty('--parallax-x', nx.toFixed(5));
        statsRef.current.style.setProperty('--parallax-y', ny.toFixed(5));
      }

      // Idle out once converged — no endless per-frame loop when the mouse is still
      const settled =
        Math.abs(nx - targetParallax.current.x) < 0.0005 &&
        Math.abs(ny - targetParallax.current.y) < 0.0005;
      if (settled) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetParallax.current = {
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      };
      // (Re)start the animation loop if it has idled out
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Depth factors per card — each moves at a slightly different rate
  const PARALLAX_DEPTHS = [5, 8, 6, 10];

  const navigate = useNavigate();

  const [keywordIndex, setKeywordIndex] = useState(0);
  const [scrambleKey, setScrambleKey] = useState(0);
  const [started, setStarted] = useState(false);
  const keyword = DYNAMIC_KEYWORDS[keywordIndex];
  const combo = `DOING ${keyword}`;
  const comboRevealed = useTextTypewriter(combo, scrambleKey);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const word = DYNAMIC_KEYWORDS[keywordIndex];
    const buildTime = (word.length + 6) * CHAR_DELAY; // +6 accounts for the "DOING " prefix
    const timeout = window.setTimeout(() => {
      setKeywordIndex((prev) => (prev + 1) % DYNAMIC_KEYWORDS.length);
      setScrambleKey((prev) => prev + 1);
    }, buildTime + HOLD_TIME);
    return () => clearTimeout(timeout);
  }, [keywordIndex, started]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setStatsVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(false);
          setTimeout(() => setStatsVisible(true), 50);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const scrollToLosungen = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('losungen');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleJoinSonic = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/karriere');
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('de-DE').format(num);

  // ── Text Store hooks ──
  const tH1Line1 = useText('home_hero', 'home-hero-h1-line1', 'WE HAVE A');
  const tH1Line2 = useText('home_hero', 'home-hero-h1-line2', 'STRATEGIC PLAN.');
  const tH1Line3 = useText('home_hero', 'home-hero-h1-line3', "IT'S CALLED DOING");
  const tSubtitle = useText('home_hero', 'home-hero-subtitle', 'People powered. Data proven.');
  const tLeftBadge = useText('home_hero', 'home-hero-left-badge', 'Daten Liefern Fakten.');
  const tLeftH3 = useText('home_hero', 'home-hero-left-h3', 'SUCHST DU EINE');
  const tLeftH3Accent = useText('home_hero', 'home-hero-left-h3-accent', 'AGENTUR');
  const tLeftH3End = useText('home_hero', 'home-hero-left-h3-line3', 'MIT POWER?');
  const tLeftDesc = useText('home_hero', 'home-hero-left-desc', 'Dein Full-Service-Partner für Performance Marketing, Retail-Aktivierung und nachhaltiges Markenwachstum.');
  const tLeftBtn = useText('home_hero', 'home-hero-left-btn', 'Starte deinen Markteintritt');
  const tRightBadge = useText('home_hero', 'home-hero-right-badge', 'Mensch. Der Unterschied.');
  const tRightH3 = useText('home_hero', 'home-hero-right-h3', 'SUCHST DU EINEN');
  const tRightH3Accent = useText('home_hero', 'home-hero-right-h3-accent', 'JOB');
  const tRightH3End = useText('home_hero', 'home-hero-right-h3-line3', 'MIT ENERGIE?');
  const tRightDesc = useText('home_hero', 'home-hero-right-desc', 'Arbeite für die größten Marken Deutschlands — und mach sie noch erfolgreicher.');
  const tRightBtn = useText('home_hero', 'home-hero-right-btn', 'Komm zu Sonic');
  const tStatLabel1 = useText('home_hero', 'home-hero-stat-1-label', 'Produkte verkauft');
  const tStatLabel2 = useText('home_hero', 'home-hero-stat-2-label', 'Umsatz generiert');
  const tStatLabel3 = useText('home_hero', 'home-hero-stat-3-label', 'Einsätze');
  const tStatLabel4 = useText('home_hero', 'home-hero-stat-4-label', '1:1 Live Video Calls');

  const produkte = useCountUp(3700000, 1800, statsVisible);
  const umsatz = useCountUp(2000, 1600, statsVisible);
  const einsaetze = useCountUp(1350000, 1700, statsVisible);
  const videoCalls = useCountUp(50000, 1500, statsVisible);

  const statsData = [
    {
      value: produkte,
      display: (v: number) => `>${(v / 1_000_000).toFixed(1).replace('.', ',')} Mio.`,
      label: tStatLabel1,
      woodIcon: (statIcons[0] && statIcons[0].url) || '',
      fallbackIcon: 'ri-shopping-bag-line',
      color: 'oklch(var(--primary-500))',
    },
    {
      value: umsatz,
      display: (v: number) => `>${v >= 2000 ? '2' : (v / 1000).toFixed(1)} Mrd. €`,
      label: tStatLabel2,
      woodIcon: (statIcons[1] && statIcons[1].url) || '',
      fallbackIcon: 'ri-money-euro-circle-line',
      color: 'oklch(var(--foreground-950))',
    },
    {
      value: einsaetze,
      display: (v: number) => `>${(v / 1_000_000).toFixed(2).replace('.', ',')} Mio.`,
      label: tStatLabel3,
      woodIcon: (statIcons[2] && statIcons[2].url) || '',
      fallbackIcon: 'ri-map-pin-line',
      color: 'oklch(var(--primary-500))',
    },
    {
      value: videoCalls,
      display: (v: number) => `>${v >= 50000 ? '50.000' : v.toLocaleString('de-DE')}`,
      label: tStatLabel4,
      woodIcon: (statIcons[3] && statIcons[3].url) || '',
      fallbackIcon: 'ri-video-line',
      color: 'oklch(var(--foreground-950))',
    },
  ];

  return (
    <section className="relative pt-16 md:pt-20 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden">
      <div className="sonic-container relative" style={{ zIndex: 10 }}>
        {/* Hero Headline */}
        <div className="text-center pt-6 md:pt-14 pb-5 md:pb-14 px-2">
          <style>{`
            @keyframes charIn {
              from { opacity: 0; transform: translateY(24px) rotateX(-12deg); }
              to   { opacity: 1; transform: translateY(0) rotateX(0deg); }
            }
            .hero-headline { perspective: 900px; }
            .hero-char {
              display: inline-block;
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), text-shadow 0.35s ease;
              transition-delay: calc(var(--char-index) * 14ms);
            }
            .hero-headline:hover .hero-char {
              transform: translateY(-5px);
              text-shadow: 0 8px 24px oklch(var(--primary-500) / 0.22);
            }
            .hero-keyword-char {
              display: inline-block;
              transition: transform 0.2s ease;
              transition-delay: calc(var(--char-index) * 8ms);
            }
            .hero-headline:hover .hero-keyword-char {
              transform: translateY(-3px);
            }
          `}</style>
          <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-foreground-950 mb-4 md:mb-6 leading-[1.05] tracking-tight">
            <AnimatedLine text={tH1Line1} lineDelay={0} />
            <br />
            <AnimatedLine text={tH1Line2} lineDelay={120} />
            <br />
            <span
              className="inline-block"
              style={{
                opacity: 0,
                animation: 'charIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                animationDelay: '260ms',
              }}
            >
              <HoverLine text={tH1Line3.split('DOING')[0]} />
              <br />
              <span className="text-primary-500 inline-block relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
                {combo.split('').map((char, i) => (
                  <span
                    key={i}
                    className="hero-keyword-char"
                    style={{
                      ['--char-index' as string]: i,
                      opacity: i < comboRevealed ? 1 : 0,
                      display: char === ' ' ? 'inline' : undefined,
                    }}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </span>
            </span>
          </h1>
        </div>

        {/* Modern Dual CTA */}
        <div
          ref={ctaRef}
          className="sonic-container relative"
          onMouseMove={handleMouseMove}
        >
          {/* Cursor-following glow */}
          <div
            className="absolute w-full max-w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl transition-all duration-700 ease-out z-0"
            style={{
              background:
                hoveredSide === 'left'
                  ? 'radial-gradient(circle, oklch(var(--foreground-900)) 0%, transparent 70%)'
                  : hoveredSide === 'right'
                  ? 'radial-gradient(circle, oklch(var(--primary-500)) 0%, transparent 70%)'
                  : 'none',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          <div className="relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] overflow-hidden shadow-2xl ring-1 ring-black/5">
            {/* LEFT — For Brands — DARK GLASS */}
            <a
              href="#losungen"
              onClick={scrollToLosungen}
              className="relative group cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Solid dark glass */}
              <div className="absolute inset-0 transition-all duration-700" style={{ background: 'oklch(var(--foreground-950))' }} />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(oklch(var(--primary-500) / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500) / 0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5 transition-opacity duration-700 ${
                  hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className={`absolute top-0 left-0 w-24 h-24 transition-all duration-700 ${hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 to-transparent" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-primary-500 to-transparent" />
              </div>
              <div className={`absolute bottom-0 right-0 w-24 h-24 transition-all duration-700 ${hoveredSide === 'left' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary-500 to-transparent" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-primary-500 to-transparent" />
              </div>

              <div className="relative z-10 p-5 md:p-10 lg:p-12 flex flex-col h-full" style={{ minHeight: 'clamp(220px, 45vw, 420px)' }}>
                <div className="flex items-center gap-2 mb-4 md:mb-8">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${hoveredSide === 'left' ? 'bg-primary-500 shadow-lg shadow-[#C8D400]/50 scale-125' : 'bg-primary-500/50'}`} />
                  <span className="text-primary-500/70 text-xs font-bold tracking-widest uppercase">{tLeftBadge}</span>
                </div>
                <div className={`w-10 h-10 md:w-16 md:h-16 relative overflow-hidden mb-4 md:mb-8 transition-all duration-500 ring-1 ring-white/10 ${hoveredSide === 'left' ? 'scale-110 ring-primary-500/40 shadow-xl shadow-primary-500/20' : ''}`}>
                  {/* Fallback icon — sits behind the wooden icon image */}
                  <div className="absolute inset-0 bg-primary-500 flex items-center justify-center">
                    <i className="ri-bar-chart-box-line text-lg md:text-xl text-gray-900"></i>
                  </div>
                  {(ctaIcons[0] && ctaIcons[0].url) ? (
                    <img
                      src={ctaIcons[0].url}
                      alt="Datenicon"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={hideBrokenImg}
                    />
                  ) : null}
                </div>
                <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-3 leading-tight tracking-tight">
                  {tLeftH3}<br />
                  <span className={`transition-colors duration-500 ${hoveredSide === 'left' ? 'text-primary-500' : 'text-white/60'}`}>
                    {tLeftH3Accent}
                  </span>
                  <br />
                  {tLeftH3End}
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-8 max-w-xs">
                  {tLeftDesc}
                </p>
                <div className="flex-grow" />
                <div className="flex items-center gap-4">
                  <span className="relative inline-flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-500 whitespace-nowrap max-w-full">
                    <span className="absolute inset-0 overflow-hidden">
                      {(woodTextures[0] && woodTextures[0].url) ? (
                        <img
                          src={woodTextures[0].url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={hideBrokenImg}
                        />
                      ) : null}
                      <span className={`absolute inset-0 transition-all duration-500 ${hoveredSide === 'left' ? 'bg-primary-500/90' : 'bg-black/50'}`} />
                    </span>
                    <span className="relative z-10 flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 transition-all duration-500 text-white text-xs sm:text-sm whitespace-nowrap">
                      {tLeftBtn}
                      <i className={`ri-arrow-right-line transition-transform duration-300 ${hoveredSide === 'left' ? 'translate-x-1' : ''}`} />
                    </span>
                    <span className={`absolute inset-0 ring-2 transition-all duration-500 ${hoveredSide === 'left' ? 'ring-primary-500/60 shadow-lg shadow-primary-500/20' : 'ring-white/10'}`} />
                  </span>
                </div>
              </div>
            </a>

            {/* CENTER — Wood Divider — hidden on mobile, shown as horizontal line */}
            <div className="relative w-full h-1 md:w-6 md:h-auto hidden md:block z-20" aria-hidden="true">
              {(woodTextures[2] && woodTextures[2].url) ? (
                <img
                  src={woodTextures[2].url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={hideBrokenImg}
                />
              ) : null}
              <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            </div>

            {/* RIGHT — For Talent — LIGHT GLASS */}
            <a
              href="/karriere"
              onClick={handleJoinSonic}
              className="relative group cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 border-t border-foreground-200/20 md:border-t-0"
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Frosted light glass */}
              <div className="absolute inset-0 bg-white transition-all duration-700" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle, oklch(var(--foreground-900)) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/8 via-transparent to-primary-500/5 transition-opacity duration-700 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute top-0 right-0 w-24 h-24 transition-all duration-700 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary-500 to-transparent" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-primary-500 to-transparent" />
              </div>
              <div className={`absolute bottom-0 left-0 w-24 h-24 transition-all duration-700 ${hoveredSide === 'right' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 to-transparent" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-primary-500 to-transparent" />
              </div>

              <div className="relative z-10 p-5 md:p-10 lg:p-12 flex flex-col h-full" style={{ minHeight: 'clamp(220px, 45vw, 420px)' }}>
                <div className="flex items-center gap-2 mb-4 md:mb-8">
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${hoveredSide === 'right' ? 'bg-primary-500 shadow-lg shadow-[#C8D400]/50 scale-125' : 'bg-foreground-300'}`} />
                  <span className="text-foreground-400 text-xs font-bold tracking-widest uppercase">{tRightBadge}</span>
                </div>
                <div className={`w-10 h-10 md:w-16 md:h-16 relative overflow-hidden mb-4 md:mb-8 transition-all duration-500 ring-1 ring-foreground-200 ${hoveredSide === 'right' ? 'scale-110 ring-primary-500/40 shadow-xl shadow-primary-500/20' : ''}`}>
                  {/* Fallback icon — sits behind the wooden icon image */}
                  <div className="absolute inset-0 bg-primary-500 flex items-center justify-center">
                    <i className="ri-team-line text-lg md:text-xl text-gray-900"></i>
                  </div>
                  {(ctaIcons[1] && ctaIcons[1].url) ? (
                    <img
                      src={ctaIcons[1].url}
                      alt="Sonic Team"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={hideBrokenImg}
                    />
                  ) : null}
                </div>
                <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-foreground-950 mb-2 md:mb-3 leading-tight tracking-tight">
                  {tRightH3}<br />
                  <span className={`transition-colors duration-500 ${hoveredSide === 'right' ? 'text-primary-500' : 'text-foreground-400'}`}>
                    {tRightH3Accent}
                  </span>
                  <br />
                  {tRightH3End}
                </h3>
                <p className="text-foreground-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-8 max-w-xs">
                  {tRightDesc}
                </p>
                <div className="flex-grow" />
                <div className="flex items-center gap-4">
                  <span className="relative inline-flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-500 whitespace-nowrap max-w-full">
                    <span className="absolute inset-0 overflow-hidden">
                      {(woodTextures[1] && woodTextures[1].url) ? (
                        <img
                          src={woodTextures[1].url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={hideBrokenImg}
                        />
                      ) : null}
                      <span className={`absolute inset-0 transition-all duration-500 ${hoveredSide === 'right' ? 'bg-primary-500/90' : 'bg-black/40'}`} />
                    </span>
                    <span className="relative z-10 flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 transition-all duration-500 text-white text-xs sm:text-sm whitespace-nowrap">
                      {tRightBtn}
                      <i className={`ri-arrow-right-line transition-transform duration-300 ${hoveredSide === 'right' ? 'translate-x-1' : ''}`} />
                    </span>
                    <span className={`absolute inset-0 ring-2 transition-all duration-500 ${hoveredSide === 'right' ? 'ring-primary-500/60 shadow-lg shadow-primary-500/20' : 'ring-foreground-200/40'}`} />
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* ── Stats Strip ── REMOVED — stats now live in LiveMetrics ticker ── */}
        </div>
      </div>
    </section>
  );
}