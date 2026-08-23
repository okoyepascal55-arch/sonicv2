import { useEffect, useState, useRef } from 'react';

const navItems = [
  { id: 'stellenangebote', label: 'Stellen' },
  { id: 'darum', label: 'Kultur & DNA' },
  { id: 'pfade', label: 'Karrierepfade' },
  { id: 'spirit', label: 'Geschichten' },
  { id: 'leben', label: 'Leben bei Sonic' },
  { id: 'awards', label: 'Ausgezeichnet' },
];

const MAIN_NAV_H = 64;
const SCROLL_OFFSET = MAIN_NAV_H + 49 + 8;

interface Props {
  heroRef?: React.RefObject<HTMLElement | HTMLDivElement>;
}

export default function KarriereInPageNav({ heroRef }: Props) {
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);
  const heroThresholdRef = useRef<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Measure hero bottom
  useEffect(() => {
    const measure = () => {
      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        heroThresholdRef.current = rect.bottom + window.scrollY - 60;
      } else {
        heroThresholdRef.current = 500;
      }
    };
    const timer = setTimeout(measure, 250);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [heroRef]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const threshold = heroThresholdRef.current ?? 500;
        setVisible(window.scrollY >= threshold);

        const sections = navItems
          .map((n) => document.getElementById(n.id))
          .filter(Boolean) as HTMLElement[];
        let current = '';
        for (const sec of sections) {
          if (window.scrollY + SCROLL_OFFSET + 20 >= sec.offsetTop) {
            current = sec.id;
          }
        }
        setActiveId(current);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sliding indicator
  useEffect(() => {
    const btn = buttonRefs.current[activeId];
    const nav = navBarRef.current;
    if (btn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
    }
  }, [activeId, visible]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed left-0 right-0 z-[45] transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0 pointer-events-none'
      }`}
      style={{ top: `${MAIN_NAV_H}px` }}
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-foreground-950 w-full" />
      <div className="bg-foreground-950">
        <div className="max-w-full max-w-[1200px] mx-auto px-8">
          <div
            ref={navBarRef}
            className="relative flex items-center overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => { buttonRefs.current[item.id] = el; }}
                  onClick={() => scrollTo(item.id)}
                  className={`
                    relative flex-shrink-0 px-4 py-[14px] text-[12px] font-bold uppercase tracking-[0.07em]
                    whitespace-nowrap cursor-pointer transition-all duration-200
                    ${isActive ? 'text-primary-500' : 'text-foreground-400 hover:text-white'}
                  `}
                  style={{ borderRadius: 0, background: 'none', border: 'none' }}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Sliding underline indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-primary-500 transition-all duration-300 ease-out pointer-events-none"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
          </div>
        </div>
      </div>
      {/* Bottom separator */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C8D400]/40 to-transparent w-full" />
    </div>
  );
}