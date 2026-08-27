import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
}

interface LeistungenPageNavProps {
  items: NavItem[];
  /** Ref to the hero element — nav stays hidden until user scrolls past its bottom edge */
  heroRef?: React.RefObject<HTMLElement | HTMLDivElement>;
}

const MAIN_NAV_H = 64;
const INPAGE_NAV_H = 49;
const SCROLL_OFFSET = MAIN_NAV_H + INPAGE_NAV_H + 8;

export default function LeistungenPageNav({ items, heroRef }: LeistungenPageNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || '');
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const heroThresholdRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        heroThresholdRef.current = rect.bottom + window.scrollY - 60;
      } else {
        heroThresholdRef.current = 300;
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
        const threshold = heroThresholdRef.current ?? 300;
        setVisible(window.scrollY >= threshold);
        const offset = SCROLL_OFFSET + 16;
        let current = items[0]?.id || '';
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top <= offset) current = item.id;
        }
        setActiveId(current);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  useEffect(() => {
    const btn = buttonRefs.current[activeId];
    const nav = navRef.current;
    if (btn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
    }
  }, [activeId, visible]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[LeistungenPageNav] Element with id "${id}" not found.`);
      return;
    }
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const activeIndex = items.findIndex((i) => i.id === activeId);
  const activeItem = items[activeIndex];

  return (
    <>
      <div
        className={`fixed left-0 right-0 z-40 transition-all duration-300 hidden md:block ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0 pointer-events-none'
        }`}
        style={{ top: `${MAIN_NAV_H}px` }}
      >
        <div className="h-[2px] bg-foreground-950 w-full" />
        <div className="w-full bg-foreground-950">
          <div className="w-full px-4 md:px-6">
            <div ref={navRef} className="relative hidden md:flex items-stretch overflow-x-auto" style={{ scrollbarWidth: 'none', justifyContent: 'center' }}>
              <div className="flex-shrink-0 flex items-center pr-5 mr-2 border-r border-white/10">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-white/30">
                  {String(activeIndex + 1).padStart(2, '0')}<span className="opacity-40">/{String(items.length).padStart(2, '0')}</span>
                </span>
              </div>

              {items.map((item) => {
                const isActive = activeId === item.id;
                const cls = [
                  'relative flex items-center gap-2 px-5 py-[14px] text-xs font-black uppercase tracking-[0.18em]',
                  'whitespace-nowrap cursor-pointer transition-all duration-200 flex-shrink-0 group',
                  isActive ? 'text-[#C8D400]' : 'text-white/40 hover:text-white',
                ].join(' ');
                const inner = (
                  <>
                    {item.icon && <span className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isActive ? 'text-[#C8D400]' : 'opacity-50 group-hover:opacity-80'}`}><i className={`${item.icon} text-sm`} /></span>}
                    <span>{item.label}</span>
                    {item.href && <i className="ri-external-link-line text-xs opacity-50 ml-0.5" />}
                  </>
                );
                if (item.href) return <Link key={item.id} to={item.href} className={cls} style={{ textDecoration: 'none' }}>{inner}</Link>;
                return <button key={item.id} ref={(el) => { buttonRefs.current[item.id] = el; }} onClick={() => scrollTo(item.id)} className={cls} style={{ background: 'transparent', border: 'none' }}>{inner}</button>;
              })}

              <div className="absolute bottom-0 h-[2px] bg-[#C8D400] transition-all duration-300 ease-out pointer-events-none" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
            </div>

            <div ref={mobileMenuRef} className="md:hidden relative w-full">
              <div className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-black uppercase tracking-[0.25em] flex-shrink-0 text-white/30">{String(activeIndex + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}</span>
                  <div className="w-[1px] h-4 flex-shrink-0 bg-white/15" />
                  {activeItem?.icon && <i className={`${activeItem.icon} text-sm text-[#C8D400] flex-shrink-0`} />}
                  <span className="text-xs font-black uppercase tracking-[0.18em] truncate text-[#C8D400]">{activeItem?.label}</span>
                </div>
                <button onClick={() => setMobileOpen((v) => !v)} className="flex items-center gap-2 px-3 py-2 flex-shrink-0 bg-white/10 hover:bg-white/20 text-white cursor-pointer" aria-label="Navigation öffnen">
                  <span className="text-xs font-black uppercase tracking-widest text-white/50">Menü</span>
                  <i className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-base`} />
                </button>
              </div>

              {mobileOpen && (
                <div className="absolute top-full left-0 right-0 z-50 bg-foreground-950 border-t border-white/10" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'slideDown 0.2s ease-out' }}>
                  {items.map((item, i) => {
                    const isActive = activeId === item.id;
                    const cls = ['w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all duration-150 cursor-pointer','border-b border-white/5 last:border-b-0',isActive ? 'bg-[#C8D400]/15 text-[#C8D400]' : 'text-white/50 hover:text-white hover:bg-white/5'].join(' ');
                    const inner = (
                      <>
                        <span className={`text-xs font-black w-5 flex-shrink-0 ${isActive ? 'text-[#C8D400]' : 'opacity-30'}`}>{String(i + 1).padStart(2, '0')}</span>
                        {item.icon && <span className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${isActive ? 'text-[#C8D400]' : 'opacity-40'}`}><i className={`${item.icon} text-sm`} /></span>}
                        <span className="text-xs font-black uppercase tracking-[0.18em] flex-1">{item.label}</span>
                        {item.href && <i className="ri-external-link-line text-xs opacity-50" />}
                        {isActive && !item.href && <div className="w-4 h-4 flex items-center justify-center bg-[#C8D400] flex-shrink-0"><i className="ri-check-line text-foreground-950 text-xs" /></div>}
                      </>
                    );
                    if (item.href) return <Link key={item.id} to={item.href} className={cls} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>{inner}</Link>;
                    return <button key={item.id} onClick={() => scrollTo(item.id)} className={cls}>{inner}</button>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C8D400]/40 to-transparent w-full" />
      </div>

      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

        /* Leistungen DC alignment: desktop challenge is light; mobile remains dark. */
        @media (min-width: 768px) {
          section#herausforderung {
            background: #fff !important;
            border-bottom: 1px solid oklch(0.885 0.004 110) !important;
          }

          /* Scroll-card solution modules become the approved desktop grid.
             Mobile keeps the existing horizontal interaction. */
          section#loesung .flex.gap-4.overflow-x-auto {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
            overflow: visible !important;
            padding-bottom: 0 !important;
          }

          section#loesung .flex.gap-4.overflow-x-auto > * {
            width: auto !important;
            min-width: 0 !important;
            flex-shrink: 1 !important;
          }

          section#loesung .flex.items-center.mb-6.gap-3 > button {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          section#herausforderung {
            background: oklch(0.13 0.005 118) !important;
          }
        }

        /* Dark section dividers must transition through black, never white. */
        section#herausforderung + div {
          background: #000 !important;
        }
      `}</style>
    </>
  );
}
