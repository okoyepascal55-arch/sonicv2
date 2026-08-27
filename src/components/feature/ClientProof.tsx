import { useRef, useState, useEffect } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

interface Testimonial {
  brand: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  caseStudyLink: string;
}

const testimonials: Testimonial[] = [
  {
    brand: 'GARMIN',
    logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter."',
    author: 'Dana Eichinger',
    role: 'Director Marketing DACH',
    company: 'Garmin Deutschland GmbH',
    caseStudyLink: '/fallbeispiele',
  },
  {
    brand: 'GROUPE SEB',
    logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Hier finde ich, ohne großes Excel Kung-Fu, was ich benötige. Die SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit."',
    author: 'Ramin Dirinpur',
    role: 'Sales Promotion & Sales Training Manager',
    company: 'Groupe SEB Deutschland GmbH',
    caseStudyLink: '/fallbeispiele',
  },
  {
    brand: 'PHILIPS TV & SOUND',
    logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
    quote: '„Durch die SRT können wir live in unsere Projekte reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden."',
    author: 'Murat Yatkin',
    role: 'Managing Director DACH',
    company: 'Philips TV & Sound @TP Vision',
    caseStudyLink: '/fallbeispiele',
  },
  {
    brand: 'NESPRESSO',
    logo: 'https://cdn.brandfetch.io/idaYSyWs1H/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078167864',
    quote: '„Die SRT ermöglicht es Sonic, unsere Projekte effizient und zielgerichtet zu steuern und umzusetzen."',
    author: 'Veronika Vriens',
    role: 'B2C Commercial Excellence',
    company: 'Nespresso Deutschland GmbH',
    caseStudyLink: '/fallbeispiele',
  },
  {
    brand: "L'ORÉAL",
    logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Sonic liefert konstant hochqualifizierte Promotoren, die unsere Marke am POS perfekt repräsentieren und messbare Ergebnisse erzielen."',
    author: 'Sophie Müller',
    role: 'Field Sales Manager DACH',
    company: "L'Oréal Deutschland GmbH",
    caseStudyLink: '/fallbeispiele',
  },
  {
    brand: 'WMF',
    logo: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Mit Sonic haben wir einen Partner gefunden, der unsere Anforderungen an Qualität und Flexibilität im Außendienst vollständig erfüllt."',
    author: 'Thomas Becker',
    role: 'Head of Trade Marketing',
    company: 'WMF Group GmbH',
    caseStudyLink: '/fallbeispiele',
  },
];

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 380, height: 420 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const update = () => {
      if (cardRef.current) {
        setDimensions({ width: cardRef.current.offsetWidth, height: cardRef.current.offsetHeight });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const generateWavyBorderPath = (inset: number, amp: number, freq: number) => {
    const w = dimensions.width;
    const h = dimensions.height;
    const r = Math.max(16 - inset, 4);
    let path = `M ${inset + r},${inset}`;
    const segs = Math.floor((w - 2 * r - 2 * inset) / 25);
    for (let i = 1; i <= segs; i++) {
      const x = inset + r + ((w - 2 * r - 2 * inset) * i / segs);
      const wave = Math.sin(i * freq) * amp;
      const prevX = inset + r + ((w - 2 * r - 2 * inset) * (i - 1) / segs);
      const cpWave = Math.sin((i - 0.5) * freq) * amp * 1.2;
      path += ` Q ${(prevX + x) / 2},${inset + cpWave} ${x},${inset + wave}`;
    }
    path += ` Q ${w - inset},${inset} ${w - inset},${inset + r}`;
    const rSegs = Math.floor((h - 2 * r - 2 * inset) / 25);
    for (let i = 1; i <= rSegs; i++) {
      const y = inset + r + ((h - 2 * r - 2 * inset) * i / rSegs);
      const wave = Math.sin(i * freq + 1) * amp;
      const prevY = inset + r + ((h - 2 * r - 2 * inset) * (i - 1) / rSegs);
      const cpWave = Math.sin((i - 0.5) * freq + 1) * amp * 1.2;
      path += ` Q ${w - inset + cpWave},${(prevY + y) / 2} ${w - inset + wave},${y}`;
    }
    path += ` Q ${w - inset},${h - inset} ${w - inset - r},${h - inset}`;
    for (let i = 1; i <= segs; i++) {
      const x = w - inset - r - ((w - 2 * r - 2 * inset) * i / segs);
      const wave = Math.sin(i * freq + 2) * amp;
      const prevX = w - inset - r - ((w - 2 * r - 2 * inset) * (i - 1) / segs);
      const cpWave = Math.sin((i - 0.5) * freq + 2) * amp * 1.2;
      path += ` Q ${(prevX + x) / 2},${h - inset + cpWave} ${x},${h - inset + wave}`;
    }
    path += ` Q ${inset},${h - inset} ${inset},${h - inset - r}`;
    for (let i = 1; i <= rSegs; i++) {
      const y = h - inset - r - ((h - 2 * r - 2 * inset) * i / rSegs);
      const wave = Math.sin(i * freq + 3) * amp;
      const prevY = h - inset - r - ((h - 2 * r - 2 * inset) * (i - 1) / rSegs);
      const cpWave = Math.sin((i - 0.5) * freq + 3) * amp * 1.2;
      path += ` Q ${inset + cpWave},${(prevY + y) / 2} ${inset + wave},${y}`;
    }
    path += ` Q ${inset},${inset} ${inset + r},${inset}`;
    return path;
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white p-5 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-visible flex flex-col"
      style={{
        minWidth: 'clamp(280px, 80vw, 340px)',
        flex: '0 0 clamp(280px, 80vw, 340px)',
        borderRadius: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle lime tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] via-transparent to-primary-500/[0.05] pointer-events-none" style={{ borderRadius: 0 }} />

      {/* Wavy SVG border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <linearGradient id={`cp-wavy-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'oklch(var(--primary-500))', stopOpacity: isHovered ? 0.95 : 0.4 }} />
            <stop offset="50%" style={{ stopColor: 'oklch(var(--primary-600))', stopOpacity: isHovered ? 0.95 : 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'oklch(var(--primary-500))', stopOpacity: isHovered ? 0.95 : 0.4 }} />
          </linearGradient>
        </defs>
        <path
          d={generateWavyBorderPath(3, isHovered ? 2.5 : 1.5, 0.6)}
          fill="none"
          stroke={`url(#cp-wavy-${index})`}
          strokeWidth={isHovered ? 2 : 1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all ease-out"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 6px oklch(var(--primary-500) / 0.5))' : 'none',
            transitionDuration: '1.2s',
          }}
        />
      </svg>

      <div className="relative z-10 flex flex-col h-full">
        {/* TOP: Logo + Brand Name */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-background-200/70">
          <div className="w-11 h-11 bg-white shadow-md flex items-center justify-center p-1.5 ring-2 ring-background-200/70 flex-shrink-0" style={{ borderRadius: 0 }}>
            <img src={item.logo} alt={item.brand} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <h3 className="text-sm font-black text-foreground-950 tracking-wide leading-tight">{item.brand}</h3>
        </div>

        {/* MIDDLE: Quote */}
        <div className="flex-1 mb-4">
          <i className="ri-double-quotes-l text-2xl text-primary-500/40 block mb-1"></i>
          <p className="text-foreground-700 leading-relaxed text-sm md:text-xs italic">{item.quote}</p>
        </div>

        {/* BOTTOM: Author + Button */}
        <div className="mt-auto">
          <div className="mb-4">
            <div className="font-black text-foreground-950 text-sm md:text-xs">{item.author}</div>
            <div className="text-sm md:text-xs text-foreground-500 mt-0.5">{item.role}</div>
            <div className="text-sm md:text-xs text-primary-500 font-semibold mt-0.5">{item.company}</div>
          </div>
          <a
            href={item.caseStudyLink}
            className="inline-flex items-center justify-center min-h-[44px] border-2 border-foreground-950 text-foreground-950 text-sm md:text-xs font-black tracking-widest px-4 py-2 hover:bg-primary-500 hover:border-primary-500 hover:text-background-50 transition-all duration-300 whitespace-nowrap"
            style={{ borderRadius: 0 }}
          >
            FALLSTUDIE LESEN
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollPaused = useRef(false);
  const autoScrollRaf = useRef<number>(0);
  const { images: logoImages } = useMediaStore('common_clientproof_logos');

  // Merge dashboard logos with hardcoded testimonials — logo from dashboard if available
  const getLogo = (brandFallback: string) => {
    // Try to match by brand name
    const match = logoImages.find((img) => img.caption?.toLowerCase().includes(brandFallback.toLowerCase()));
    return match?.url || brandFallback;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const SCROLL_SPEED = 0.4;

    const drift = () => {
      if (!autoScrollPaused.current && el) {
        el.scrollLeft += SCROLL_SPEED;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      autoScrollRaf.current = requestAnimationFrame(drift);
    };

    const start = () => {
      if (!autoScrollRaf.current) {
        autoScrollRaf.current = requestAnimationFrame(drift);
      }
    };
    const stop = () => {
      if (autoScrollRaf.current) {
        cancelAnimationFrame(autoScrollRaf.current);
        autoScrollRaf.current = 0;
      }
    };

    // Only drift while the carousel is actually on screen — idle it out otherwise
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(el);

    start();
    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  return (
    <section className="sonic-section-md px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="sonic-container relative z-10">
        {/* Header — badge + heading + scroll controls in one row on desktop */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Kundenstimmen</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950">
              Was unsere Partner<br className="hidden md:block" /> über uns sagen
            </h2>
          </div>
          {/* Scroll arrows — desktop only */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0 pb-1">
            <button
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth * 0.6, behavior: 'smooth' });
              }}
              aria-label="Vorheriges Testimonial"
              className="w-10 h-10 flex items-center justify-center border border-foreground-200 hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <i className="ri-arrow-left-line text-sm text-foreground-950" />
            </button>
            <button
              onClick={() => {
                if (!scrollRef.current) return;
                scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth * 0.6, behavior: 'smooth' });
              }}
              aria-label="Nächstes Testimonial"
              className="w-10 h-10 flex items-center justify-center border border-foreground-200 hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <i className="ri-arrow-right-line text-sm text-foreground-950" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-4 -mx-4 md:mx-0 px-4 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { autoScrollPaused.current = true; }}
          onMouseLeave={() => { autoScrollPaused.current = false; }}
          onTouchStart={() => { autoScrollPaused.current = true; }}
          onTouchEnd={() => {
            // Resume drift 2.5s after the user lifts their finger — long enough
            // that a swipe doesn't immediately get fought by the auto-scroll.
            window.setTimeout(() => { autoScrollPaused.current = false; }, 2500);
          }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`${i}-${item.brand}`} item={{ ...item, logo: getLogo(item.logo) }} index={i % testimonials.length} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardW = scrollRef.current.scrollWidth / (testimonials.length * 2);
                scrollRef.current.scrollTo({ left: i * cardW * 3, behavior: 'smooth' });
              }}
              className="group flex items-center justify-center w-8 h-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={`Zu Testimonials ${i + 1}`}
            >
              <span className="block h-1 w-5 bg-foreground-300 group-hover:bg-primary-500 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}