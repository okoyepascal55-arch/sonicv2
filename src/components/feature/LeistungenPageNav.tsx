import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface NavItem { id: string; label: string; icon?: string; href?: string; }
interface LeistungenPageNavProps { items: NavItem[]; heroRef?: React.RefObject<HTMLElement | HTMLDivElement>; }

const MAIN_NAV_H = 64;      // fallback until the real header height is measured
const INPAGE_NAV_H = 49;

/* Height of the site header (73px desktop, 65px mobile) — the bar sits directly below it
   and section jumps land just below the bar. */
function headerHeight(): number {
  const h = document.querySelector('header');
  const r = h?.getBoundingClientRect();
  return r && r.bottom > 0 ? Math.round(r.bottom) : MAIN_NAV_H;
}

export default function LeistungenPageNav({ items, heroRef }: LeistungenPageNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || '');
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const heroThresholdRef = useRef<number | null>(null);
  const [navTop, setNavTop] = useState(MAIN_NAV_H);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => setNavTop(headerHeight());
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);
  const offset = () => headerHeight() + (barRef.current?.getBoundingClientRect().height || INPAGE_NAV_H) + 8;

  useEffect(() => {
    const measure = () => {
      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        heroThresholdRef.current = rect.bottom + window.scrollY - 60;
      } else heroThresholdRef.current = 300;
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
        setVisible(window.scrollY >= (heroThresholdRef.current ?? 300));
        const limit = offset() + 16;
        let current = items[0]?.id || '';
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top <= limit) current = item.id;
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
      setIndicatorStyle({ left: btnRect.left - navRect.left + nav.scrollLeft, width: btnRect.width });
      // keep the active item in view when the bar is wider than the screen
      if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
        nav.scrollTo({ left: nav.scrollLeft + (btnRect.left - navRect.left) - navRect.width / 2 + btnRect.width / 2, behavior: 'smooth' });
      }
    }
  }, [activeId, visible]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset()), behavior: 'smooth' });
    setMobileOpen(false);
    // Sections above can still change height while we scroll (images, reveal animations) —
    // re-check once the smooth scroll has settled and correct the landing position.
    // Stops as soon as the visitor scrolls on their own.
    const timers = [700, 1400, 2500].map((ms) => window.setTimeout(() => {
      const delta = el.getBoundingClientRect().top - offset();
      if (Math.abs(delta) > 4) window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: 'smooth' });
    }, ms));
    const cancel = () => { timers.forEach((t) => window.clearTimeout(t)); ['wheel', 'touchstart', 'keydown'].forEach((ev) => window.removeEventListener(ev, cancel)); };
    ['wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }));
    window.setTimeout(cancel, 2600);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const activeIndex = items.findIndex(i => i.id === activeId);
  const activeItem = items[activeIndex];

  return (
    <>
      <div ref={barRef} className={`fixed left-0 right-0 z-40 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0 pointer-events-none'}`} style={{ top: navTop }} inert={!visible}>
        <div className="h-[2px] bg-foreground-950 w-full" />
        <div className="w-full bg-foreground-950 px-4 md:px-6">
          {/* Centered when it fits; starts left and scrolls when it doesn't (centering an overflowing
              row would cut off its first items with no way to reach them). */}
          <div ref={navRef} className="relative hidden md:block overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-stretch w-max mx-auto">
            <div className="flex-shrink-0 flex items-center pr-5 mr-2 border-r border-white/10"><span className="text-xs font-black uppercase tracking-[0.25em] text-white/30">{String(activeIndex + 1).padStart(2, '0')}<span className="opacity-40">/{String(items.length).padStart(2, '0')}</span></span></div>
            {items.map(item => {
              const isActive = activeId === item.id;
              const cls = `relative flex items-center gap-2 px-3 2xl:px-5 py-[14px] text-xs font-black uppercase tracking-[0.12em] 2xl:tracking-[0.18em] whitespace-nowrap cursor-pointer transition-all duration-200 flex-shrink-0 group ${isActive ? 'text-[#C8D400]' : 'text-white/40 hover:text-white'}`;
              const inner = <>{item.icon && <span className={`w-5 h-5 hidden 2xl:flex items-center justify-center flex-shrink-0 ${isActive ? 'text-[#C8D400]' : 'opacity-50'}`}><i className={`${item.icon} text-sm`} /></span>}<span>{item.label}</span>{item.href && <i className="ri-external-link-line text-xs opacity-50 ml-0.5" />}</>;
              return item.href ? <Link key={item.id} to={item.href} className={cls} style={{ textDecoration: 'none' }}>{inner}</Link> : <button key={item.id} ref={el => { buttonRefs.current[item.id] = el; }} onClick={() => scrollTo(item.id)} className={cls} style={{ background: 'transparent', border: 'none' }}>{inner}</button>;
            })}
          </div>
            <div className="absolute bottom-0 h-[2px] bg-[#C8D400] transition-all duration-300 ease-out pointer-events-none" style={{ left: indicatorStyle.left, width: indicatorStyle.width }} />
          </div>
          <div ref={mobileMenuRef} className="md:hidden relative w-full">
            <div className="flex items-center justify-between py-3 gap-3"><div className="flex items-center gap-2 min-w-0"><span className="text-xs font-black uppercase tracking-[0.25em] flex-shrink-0 text-white/30">{String(activeIndex + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}</span><div className="w-px h-4 bg-white/15" />{activeItem?.icon && <i className={`${activeItem.icon} text-sm text-[#C8D400]`} />}<span className="text-xs font-black uppercase tracking-[0.18em] truncate text-[#C8D400]">{activeItem?.label}</span></div><button onClick={() => setMobileOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white cursor-pointer"><span className="text-xs font-black uppercase tracking-widest text-white/50">Menü</span><i className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-base`} /></button></div>
            {mobileOpen && <div className="absolute top-full left-0 right-0 z-50 bg-foreground-950 border-t border-white/10">{items.map((item, i) => <button key={item.id} onClick={() => scrollTo(item.id)} className={`w-full flex items-center gap-3 px-5 py-3.5 text-left border-b border-white/5 ${activeId === item.id ? 'bg-[#C8D400]/15 text-[#C8D400]' : 'text-white/50'}`}><span className="text-xs font-black w-5 opacity-50">{String(i + 1).padStart(2, '0')}</span>{item.icon && <i className={`${item.icon} text-sm`} />}<span className="text-xs font-black uppercase tracking-[0.18em] flex-1">{item.label}</span></button>)}</div>}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#C8D400]/40 to-transparent w-full" />
      </div>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
}
