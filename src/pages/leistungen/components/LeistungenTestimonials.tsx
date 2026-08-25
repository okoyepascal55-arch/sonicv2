import { useRef, useState, useEffect } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import WoodenCard from '@/components/base/WoodenCard';

interface Testimonial {
  brand: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    brand: 'GARMIN',
    logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter."',
    author: 'Dana Eichinger',
    role: 'Director Marketing DACH',
    company: 'Garmin Deutschland GmbH',
  },
  {
    brand: 'GROUPE SEB',
    logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Hier finde ich, ohne großes Excel Kung-Fu, was ich benötige. Die SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit."',
    author: 'Ramin Dirinpur',
    role: 'Sales Promotion & Sales Training Manager',
    company: 'Groupe SEB Deutschland GmbH',
  },
  {
    brand: 'PHILIPS TV & SOUND',
    logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
    quote: '„Durch die SRT können wir live in unsere Projekte reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden."',
    author: 'Murat Yatkin',
    role: 'Managing Director DACH',
    company: 'Philips TV & Sound @TP Vision',
  },
  {
    brand: 'NESPRESSO',
    logo: 'https://cdn.brandfetch.io/idaYSyWs1H/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1668078167864',
    quote: '„Die SRT ermöglicht es Sonic, unsere Projekte effizient und zielgerichtet zu steuern und umzusetzen."',
    author: 'Veronika Vriens',
    role: 'B2C Commercial Excellence',
    company: 'Nespresso Deutschland GmbH',
  },
  {
    brand: "L'ORÉAL",
    logo: 'https://cdn.brandfetch.io/loreal.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Sonic liefert konstant hochqualifizierte Promotoren, die unsere Marke am POS perfekt repräsentieren und messbare Ergebnisse erzielen."',
    author: 'Sophie Müller',
    role: 'Field Sales Manager DACH',
    company: "L'Oréal Deutschland GmbH",
  },
  {
    brand: 'WMF',
    logo: 'https://cdn.brandfetch.io/wmf.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
    quote: '„Mit Sonic haben wir einen Partner gefunden, der unsere Anforderungen an Qualität und Flexibilität im Außendienst vollständig erfüllt."',
    author: 'Thomas Becker',
    role: 'Head of Trade Marketing',
    company: 'WMF Group GmbH',
  },
];

// Identical visual language to homepage ClientProof — wavy border, white card, same structure
// but wider cards (2-per-view instead of 3)
function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 460 });
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
      const prevX = inset + r + ((w - 2 * r - 2 * inset) * (i - 1) / segs);
      const cpWave = Math.sin((i - 0.5) * freq) * amp * 1.2;
      path += ` Q ${(prevX + x) / 2},${inset + cpWave} ${x},${inset + Math.sin(i * freq) * amp}`;
    }
    path += ` Q ${w - inset},${inset} ${w - inset},${inset + r}`;
    const rSegs = Math.floor((h - 2 * r - 2 * inset) / 25);
    for (let i = 1; i <= rSegs; i++) {
      const y = inset + r + ((h - 2 * r - 2 * inset) * i / rSegs);
      const prevY = inset + r + ((h - 2 * r - 2 * inset) * (i - 1) / rSegs);
      const cpWave = Math.sin((i - 0.5) * freq + 1) * amp * 1.2;
      path += ` Q ${w - inset + cpWave},${(prevY + y) / 2} ${w - inset + Math.sin(i * freq + 1) * amp},${y}`;
    }
    path += ` Q ${w - inset},${h - inset} ${w - inset - r},${h - inset}`;
    for (let i = 1; i <= segs; i++) {
      const x = w - inset - r - ((w - 2 * r - 2 * inset) * i / segs);
      const prevX = w - inset - r - ((w - 2 * r - 2 * inset) * (i - 1) / segs);
      const cpWave = Math.sin((i - 0.5) * freq + 2) * amp * 1.2;
      path += ` Q ${(prevX + x) / 2},${h - inset + cpWave} ${x},${h - inset + Math.sin(i * freq + 2) * amp}`;
    }
    path += ` Q ${inset},${h - inset} ${inset},${h - inset - r}`;
    for (let i = 1; i <= rSegs; i++) {
      const y = h - inset - r - ((h - 2 * r - 2 * inset) * i / rSegs);
      const prevY = h - inset - r - ((h - 2 * r - 2 * inset) * (i - 1) / rSegs);
      const cpWave = Math.sin((i - 0.5) * freq + 3) * amp * 1.2;
      path += ` Q ${inset + cpWave},${(prevY + y) / 2} ${inset + Math.sin(i * freq + 3) * amp},${y}`;
    }
    path += ` Q ${inset},${inset} ${inset + r},${inset}`;
    return path;
  };

  return (
    <div style={{ minWidth: '420px', flex: '0 0 calc(50% - 12px)' }}>
    <WoodenCard
      className="flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        {/* Logo + brand */}
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-foreground-100">
          <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center p-2 ring-2 ring-foreground-100 flex-shrink-0">
            <img src={item.logo} alt={item.brand} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <h3 className="text-sm font-black text-foreground-950 tracking-wide leading-tight">{item.brand}</h3>
        </div>

        {/* Quote */}
        <div className="flex-1 mb-5">
          <i className="ri-double-quotes-l text-3xl text-primary-500/40 block mb-2" />
          <p className="text-foreground-700 leading-relaxed text-sm italic">{item.quote}</p>
        </div>

        {/* Author + CTA */}
        <div className="mt-auto">
          <div className="mb-5">
            <div className="font-black text-foreground-950 text-sm">{item.author}</div>
            <div className="text-xs text-foreground-500 mt-0.5">{item.role}</div>
            <div className="text-xs text-primary-500 font-semibold mt-0.5">{item.company}</div>
          </div>
          <a
            href="/fallbeispiele"
            className="inline-block border-2 border-foreground-950 text-foreground-950 text-xs font-black tracking-widest px-5 py-2.5 hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 whitespace-nowrap active:scale-95"
          >
            FALLSTUDIE LESEN
          </a>
        </div>
      </div>
    </WoodenCard>
    </div>
  );
}

export default function LeistungenTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="sonic-section-md px-6 bg-white relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[350px] bg-primary-500/4 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="sonic-container relative z-10">
        {/* Header — centered, same pattern as ClientProof */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/15 px-4 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 bg-foreground-950 animate-pulse" />
            <div className="flex items-center gap-3">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Kundenstimmen</span>
          </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-tight tracking-tight mb-6 uppercase">
            WAS UNSERE PARTNER<br />ÜBER UNS SAGEN
          </h2>
          {/* Scroll controls — centered */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Vorheriges Testimonial"
              className="w-10 h-10 flex items-center justify-center border-2 border-foreground-200 hover:border-primary-500 hover:bg-primary-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-none"
            >
              <i className="ri-arrow-left-line text-base text-foreground-950" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Nächstes Testimonial"
              className="w-10 h-10 flex items-center justify-center border-2 border-foreground-200 hover:border-primary-500 hover:bg-primary-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-none"
            >
              <i className="ri-arrow-right-line text-base text-foreground-950" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(TESTIMONIALS.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardW = scrollRef.current.scrollWidth / TESTIMONIALS.length;
                scrollRef.current.scrollTo({ left: i * cardW * 2, behavior: 'smooth' });
              }}
              aria-label={`Seite ${i + 1}`}
              className="h-1 w-5 bg-foreground-300 hover:bg-primary-500 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
