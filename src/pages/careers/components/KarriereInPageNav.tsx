import { useEffect, useState, useRef } from 'react';

const navItems = [
  { id: 'pfade', n: '01', label: 'Zwei Wege' },
  { id: 'darum', n: '02', label: 'Kultur & DNA' },
  { id: 'awards', n: '03', label: 'Ausgezeichnet' },
  { id: 'spirit', n: '04', label: 'Geschichten' },
  { id: 'leben', n: '05', label: 'Leben bei Sonic' },
  { id: 'stellenangebote', n: '06', label: 'Stellen' },
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed left-0 right-0 z-[45] transition-all duration-300 hidden md:block ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0 pointer-events-none'
      }`}
      style={{ top: `${MAIN_NAV_H}px`, background: 'oklch(0.13 0.005 118)', borderBottom: '1px solid oklch(var(--primary-500) / 0.3)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 flex items-stretch overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex-shrink-0 flex items-baseline gap-2 pl-4 pr-4 md:pl-0 md:pr-[22px] md:mr-[22px] py-[15px] cursor-pointer whitespace-nowrap transition-colors duration-200"
              style={{
                borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                background: 'none',
                border: 'none',
                borderBottomWidth: '2px',
                borderBottomColor: isActive ? 'oklch(var(--primary-500))' : 'transparent',
              }}
            >
              <span
                className="text-[10px] font-black tracking-[0.2em]"
                style={{ color: isActive ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.3)' }}
              >
                {item.n}
              </span>
              <span
                className="text-[12px] font-black uppercase tracking-[0.12em]"
                style={{ color: isActive ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.45)' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => scrollTo('stellenangebote')}
          className="hidden md:inline-flex ml-auto items-center gap-2 self-center px-5 py-[11px] bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.12em] whitespace-nowrap cursor-pointer flex-shrink-0"
        >
          <i className="ri-briefcase-line text-sm" />
          Bewerben
        </button>
      </div>
    </div>
  );
}
