import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';

// ── TABS ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'konzeption', label: 'Konzeption & Kreation', icon: 'ri-lightbulb-flash-line', sectionId: 'konzept' },
  { id: 'content',    label: 'Content Creation',       icon: 'ri-camera-line',           sectionId: 'content-creation' },
  { id: 'cgi',        label: 'CGI & 3D-Design',         icon: 'ri-box-3-line',            sectionId: 'cgi-3d' },
];

// ── HARDCODED FALLBACKS — Primary images only ──
const FALLBACK_PRIMARY: Record<string, string[]> = {
  konzeption: [
    'https://readdy.ai/api/search-image?query=professional%20brand%20campaign%20visual%20design%20studio%20shower%20bathroom%20products%20elegant%20minimalist%20photography%20dark%20atmospheric%20background%20lime%20green%20accent%20lighting%20premium%20commercial%20photography%20dramatic%20contrast%20product%20showcase&width=800&height=600&seq=k1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=product%20photography%20brand%20identity%20key%20visual%20consumer%20electronics%20packaging%20close%20up%20studio%20shot%20clean%20white%20background%20professional%20commercial%20photography%20sharp%20detail%20vibrant%20colors&width=400&height=300&seq=k2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20identity%20visual%20design%20system%20logo%20typography%20color%20palette%20minimalist%20design%20studio%20creative%20agency%20branding%20materials%20flat%20lay%20professional%20elegant%20premium&width=400&height=300&seq=k3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20studio%20smartphone%20photography%20product%20shoot%20behind%20scenes%20creative%20team%20colorful%20vibrant%20social%20media%20assets%20creation%20agency%20lifestyle%20photography&width=600&height=300&seq=k4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=e-commerce%20packaging%20design%20product%20shelf%20retail%20point%20of%20sale%20display%20premium%20consumer%20electronics%20packaging%20box%20beautiful%20product%20presentation%20lifestyle%20editorial%20photography%20high%20end%20commercial&width=1200&height=350&seq=k5-a&orientation=landscape',
  ],
  content: [
    'https://readdy.ai/api/search-image?query=inhouse%20product%20photography%20studio%20professional%20camera%20setup%20consumer%20electronics%20product%20shooting%20dark%20moody%20atmospheric%20professional%20studio%20lighting%20equipment%20creative%20setup%20professional%20grade&width=800&height=600&seq=c1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=video%20production%20social%20media%20reels%20short%20form%20content%20creation%20studio%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20professional%20video%20production%20setup%20modern%20studio%20dark%20dramatic&width=400&height=300&seq=c2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=live%20streaming%20studio%20setup%20professional%20lighting%20camera%20crew%20live%20video%20production%20product%20presentation%20host%20presenter%20modern%20clean%20studio%20lime%20green%20accent%20light%20broadcast%20quality&width=400&height=300&seq=c3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=instructional%20how-to%20video%20production%20product%20demonstration%20hands%20product%20detail%20close%20up%20professional%20lighting%20studio%20tutorial%20content%20creation%20sharp%20detail%20commercial%20quality%20photography&width=600&height=300&seq=c4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20event%20documentation%20photography%20IFA%20Berlin%20consumer%20electronics%20fair%20professional%20event%20photography%20wide%20angle%20crowd%20exhibitors%20modern%20technology%20displays%20dramatic%20night%20event%20photography&width=1200&height=350&seq=c5-a&orientation=landscape',
  ],
  cgi: [
    'https://readdy.ai/api/search-image?query=3D%20CGI%20architectural%20visualization%20luxury%20electric%20vehicle%20showroom%20interior%20photorealistic%20render%20modern%20minimalist%20design%20lime%20green%20accent%20lighting%20futuristic%20automotive%20showroom%20high%20quality%20visualization&width=800&height=600&seq=g1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20stand%203D%20visualization%20CGI%20render%20photorealistic%20exhibition%20booth%20design%20modern%20retail%20interior%20digital%20twin%20architecture%20render%20dramatic%20lighting%20professional%20commercial%20CGI%20quality&width=400&height=300&seq=g2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=AI%20generated%20concept%20visualization%20product%20design%20futuristic%20technology%20creative%20concept%20art%20digital%20art%20abstract%20modern%20design%20generative%20AI%20product%20visualization%20lime%20green%20dark%20background%20atmospheric%20digital%20art&width=400&height=300&seq=g3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=motion%20graphics%203D%20animation%20product%20visualization%20render%20digital%20cinematic%20dark%20dramatic%20lime%20green%20glow%20particle%20effects%20modern%20motion%20design%20brand%20animation%20premium%20quality%20CGI%20dramatic%20composition&width=600&height=300&seq=g4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=photorealistic%20CGI%20product%20packaging%20visualization%20consumer%20electronics%20lifestyle%20render%20floating%20product%20box%20render%203D%20photorealistic%20dramatic%20studio%20lighting%20lime%20green%20accent%20commercial%20quality%20packaging%20visualization&width=1200&height=350&seq=g5-a&orientation=landscape',
  ],
};

const SECONDARY_SECTION_KEYS: Record<string, string> = {
  konzeption: 'leistungen_kreation_showcase_secondary_konzeption',
  content: 'leistungen_kreation_showcase_secondary_content',
  cgi: 'leistungen_kreation_showcase_secondary_cgi',
};

// ── FALLBACK SECONDARY IMAGES ──
const FALLBACK_SECONDARY: Record<string, string[]> = {
  konzeption: [
    'https://readdy.ai/api/search-image?query=creative%20agency%20branding%20campaign%20shower%20product%20packaging%20premium%20editorial%20photography%20clean%20white%20studio%20dark%20shadows%20beautiful%20product%20art%20direction%20commercial%20quality&width=800&height=600&seq=k1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=close%20up%20product%20key%20visual%20brand%20photography%20consumer%20goods%20clean%20elegant%20studio%20high%20end%20commercial%20sharp%20detail&width=400&height=300&seq=k2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20guidelines%20design%20collateral%20typography%20system%20clean%20minimal%20premium%20agency%20design%20flat%20lay%20photography&width=400&height=300&seq=k3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=multi%20channel%20digital%20assets%20design%20mockup%20social%20media%20instagram%20facebook%20phone%20screen%20modern%20creative%20studio&width=600&height=300&seq=k4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=online%20shop%20product%20photography%20clean%20minimalist%20ecommerce%20beautiful%20lifestyle%20staging%20high%20end%20commercial%20product%20flat%20lay%20editorial%20photography&width=1200&height=350&seq=k5-b&orientation=landscape',
  ],
  content: [
    'https://readdy.ai/api/search-image?query=product%20photography%20studio%20setup%20behind%20the%20scenes%20dark%20dramatic%20lighting%20professional%20camera%20rig%20consumer%20electronics&width=800&height=600&seq=c1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=short%20form%20video%20reel%20production%20smartphone%20vertical%20format%20social%20media%20creative%20director%20studio%20lights&width=400&height=300&seq=c2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=live%20video%20studio%20broadcasting%20shopping%20stream%20presenter%20product%20demonstration%20professional%20studio%20sharp%20detail%20clean&width=400&height=300&seq=c3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=tutorial%20hands-on%20product%20explainer%20video%20close%20up%20detail%20studio%20lighting%20white%20background%20clean&width=600&height=300&seq=c4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20IFA%20Berlin%20exhibitor%20booth%20consumer%20electronics%20nighttime%20dramatic%20event%20photography%20wide%20exhibition%20hall%20professional&width=1200&height=350&seq=c5-b&orientation=landscape',
  ],
  cgi: [
    'https://readdy.ai/api/search-image?query=photorealistic%20CGI%20automotive%20showroom%20interior%20visualization%20electric%20car%20luxury%20clean%20modern%20architecture%20render%20lime%20accent&width=800&height=600&seq=g1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=exhibition%20booth%203D%20render%20photorealistic%20architecture%20visualization%20retail%20consumer%20electronics%20trade%20show%20stand%20design&width=400&height=300&seq=g2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=generative%20AI%20artwork%20futuristic%20product%20concept%20digital%20abstract%20art%20lime%20green%20neon%20dark%20background%20high%20tech&width=400&height=300&seq=g3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=3D%20motion%20animation%20render%20product%20brand%20dark%20atmospheric%20cinematic%20lime%20electric%20glow%20particles%20CGI%20quality&width=600&height=300&seq=g4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=packaging%203D%20visualization%20CGI%20photorealistic%20render%20product%20floating%20clean%20studio%20background%20commercial%20premium%20quality&width=1200&height=350&seq=g5-b&orientation=landscape',
  ],
};

// ── META DATA (non-image fields for each item) ──
const ITEM_META: Record<string, Array<Omit<ShowcaseItem, 'images'>>> = {
  konzeption: [
    { id: 'k1', span: 'main', tag: 'Kampagne',      title: 'shower+ — Full Brand Campaign',    sub: 'Konzept bis Rollout' },
    { id: 'k2', span: 'sm',   tag: 'Key Visual',    title: 'Brand Photography',               sub: 'Konsistente Markenwelt' },
    { id: 'k3', span: 'sm',   tag: 'Brand Identity', title: 'Visual Design System',           sub: 'Marken konsequent gebaut', badge: null },
    { id: 'k4', span: 'md',   tag: 'Social Content', title: 'Multi-Channel Assets',           sub: 'Alle Kanäle. Eine Linie.' },
    { id: 'k5', span: 'wide', tag: 'E-Commerce',     title: 'E-Commerce Design & Content',   sub: 'Online-Regal gestaltet wie ein Flagshipstore' },
  ],
  content: [
    { id: 'c1', span: 'main', tag: 'Fotoproduktion', title: 'Inhouse Product Shoot',          sub: 'Professionelle Produktbilder' },
    { id: 'c2', span: 'sm',   tag: 'Video',          title: 'Social Reel Production',         sub: 'Scroll-stopping content' },
    { id: 'c3', span: 'sm',   tag: 'Live',           title: 'Nexaro Live Studio',             sub: 'Live Shopping & Streaming', badge: 'LIVE' },
    { id: 'c4', span: 'md',   tag: 'How-To',         title: 'Instructional Content',          sub: 'Produkte erklären. Vertrauen aufbauen.' },
    { id: 'c5', span: 'wide', tag: 'Event Doku',     title: 'Event-Dokumentation — IFA Berlin', sub: 'Von der Messe direkt in alle Kanäle' },
  ],
  cgi: [
    { id: 'g1', span: 'main', tag: '3D / CGI',       title: 'Lucid Motors — EV Stand CGI',   sub: 'Architekturgenaue Visualisierung' },
    { id: 'g2', span: 'sm',   tag: 'Visualization',  title: 'Messe Stands & Shops',          sub: 'Vor dem Bau schon erlebbar' },
    { id: 'g3', span: 'sm',   tag: 'AI',             title: 'AI-Generierung',                sub: 'Konzepte in Minuten', badge: 'AI' },
    { id: 'g4', span: 'md',   tag: 'Motion',         title: 'Motion Graphics & 3D Animation', sub: 'Bewegte Markenwelten' },
    { id: 'g5', span: 'wide', tag: 'Packaging-Viz',  title: 'Packaging zum Leben erwecken — Photorealistic CGI', sub: 'Fotorealistische Produktvisualisierungen für alle Kanäle' },
  ],
};

interface ShowcaseItem {
  id: string; span: 'main' | 'sm' | 'md' | 'wide';
  tag: string; title: string; sub: string;
  images: string[];
  badge?: string | null;
}

// ── BEFORE/AFTER SLIDER ──────────────────────────────────────────────
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // ── Dashboard images for Before/After ──
  const { images: baImages } = useMediaStore('leistungen_kreation_before_after');
  const realityImg = baImages[0]?.url || 'https://readdy.ai/api/search-image?query=Philips%20brand%20trade%20show%20booth%20IFA%20Berlin%20real%20built%20exhibition%20stand%20professional%20retail%20display%20modern%20premium%20consumer%20electronics%20physical%20stand%20interior%20wide%20angle%20shot%20dramatic%20event%20photography&width=1200&height=680&seq=ba-reality&orientation=landscape';
  const cgiImg = baImages[1]?.url || 'https://readdy.ai/api/search-image?query=Philips%20trade%20show%20booth%20photorealistic%20CGI%203D%20render%20architectural%20visualization%20exhibition%20stand%20design%20lime%20green%20accent%20lighting%20futuristic%20dark%20atmosphere%20high%20quality%20render%20IFA%20Berlin%20concept&width=1200&height=680&seq=ba-cgi&orientation=landscape';

  useEffect(() => {
    const el = revealRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const updatePct = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPct(Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging) updatePct(e.clientX); };
    const onUp = () => setDragging(false);
    const onTouch = (e: TouchEvent) => { if (dragging) updatePct(e.touches[0].clientX); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouch, { passive: true }); window.addEventListener('touchend', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); window.removeEventListener('touchmove', onTouch); window.removeEventListener('touchend', onUp); };
  }, [dragging, updatePct]);

  return (
    <div ref={revealRef} className="mt-[3px]" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="flex items-start justify-between gap-4 px-8 py-7 bg-foreground-950/5 border border-foreground-950/[0.08]">
        <div>
          <div className="text-[9px] font-black uppercase tracking-[0.18em] text-primary-500 mb-2">CGI → Reality Vergleich</div>
          <h3 className="text-3xl md:text-4xl font-black text-foreground-950 leading-none tracking-tight mb-1.5">CGI-Render vs. gebauter Stand</h3>
          <p className="text-xs font-light text-foreground-950/40">Ziehe den Regler — Philips @ IFA Berlin</p>
        </div>
        <a href={`mailto:${CONTACT_EMAIL}?subject=CGI%20Portfolio%20anfragen`} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-primary-500 hover:text-foreground-950 whitespace-nowrap bg-transparent text-foreground-950/40 border border-foreground-950/[0.12]" style={{ borderRadius: 0 }}>Portfolio anfragen <i className="ri-arrow-right-line" /></a>
      </div>
      <div ref={containerRef} className="relative overflow-hidden cursor-col-resize select-none" style={{ height: '340px' }}
        onMouseDown={(e) => { setDragging(true); updatePct(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); updatePct(e.touches[0].clientX); }}
      >
        <div className="absolute inset-0">
          <img src={realityImg} alt="Reality" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-foreground-950/20" />
          <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-[0.12em] px-3 py-1.5 bg-background-50/20 border border-background-50/30 text-background-50/80" style={{ backdropFilter: 'blur(8px)' }}>Gebauter Stand</div>
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
          <img src={cgiImg} alt="CGI" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-primary-500/5" />
          <div className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.12em] px-3 py-1.5 bg-primary-500 text-foreground-950">CGI Render</div>
        </div>
        <div className="absolute top-0 bottom-0 z-20 pointer-events-none w-0.5 bg-primary-500" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-black text-sm cursor-col-resize w-10 h-10 bg-primary-500 text-foreground-950" style={{ borderRadius: 0, boxShadow: '0 0 0 4px rgba(200,212,0,0.2)' }}>↔</div>
        </div>
      </div>
    </div>
  );
}

// ── LIGHTBOX ─────────────────────────────────────────────────────────
interface LightboxProps {
  items: ShowcaseItem[];
  startIdx: number;
  onClose: () => void;
}

function Lightbox({ items, startIdx, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIdx);
  const [imgIdx, setImgIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((i: number) => {
    setAnimating(true);
    setTimeout(() => { setIdx((i + items.length) % items.length); setImgIdx(0); setAnimating(false); }, 200);
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(idx + 1);
      if (e.key === 'ArrowLeft') goTo(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, goTo, onClose]);

  const item = items[idx];

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground-950/97"
      style={{ backdropFilter: 'blur(24px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-10 border-b border-background-50/[0.07]">
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' }} className="text-primary-500">Portfolio</span>
          <span className="text-xs font-black uppercase tracking-widest px-2 py-1 bg-primary-500 text-foreground-950">{item.tag}</span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px' }} className="text-background-50/35">{idx + 1} / {items.length}</span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-500 hover:text-foreground-950 bg-background-50/8 border border-background-50/[0.12] text-background-50/60"
            style={{ borderRadius: 0, fontSize: '14px' }}
          >✕</button>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex items-center justify-center w-full flex-1 px-16 py-20">
        {/* Prev button */}
        <button
          onClick={() => goTo(idx - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-500 hover:text-foreground-950 bg-background-50/[0.07] border border-background-50/[0.12] text-background-50/60"
          style={{ borderRadius: 0 }}
        >
          <i className="ri-arrow-left-line text-lg" />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden w-full max-h-[60vh] flex items-center justify-center" style={{ maxWidth: '900px' }}>
          <img
            key={`${idx}-${imgIdx}`}
            src={item.images[imgIdx]}
            alt={item.title}
            className="max-w-full max-h-[60vh] object-contain"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
          />
          {/* Lime border accent */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(197,229,46,0.2)' }} />

          {/* Multi-image dots if >1 */}
          {item.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {item.images.map((_, ii) => (
                <button
                  key={ii}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(ii); }}
                  className="cursor-pointer transition-all duration-200"
                  style={{ width: ii === imgIdx ? '20px' : '6px', height: '3px', background: ii === imgIdx ? '#C8D400' : 'rgba(255,255,255,0.3)', borderRadius: 0 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => goTo(idx + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-500 hover:text-foreground-950 bg-background-50/[0.07] border border-background-50/[0.12] text-background-50/60"
          style={{ borderRadius: 0 }}
        >
          <i className="ri-arrow-right-line text-lg" />
        </button>
      </div>

      {/* Info bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-5 border-t border-background-50/[0.07]">
        <div>
          <h3 className="text-xl font-black text-background-50 leading-none tracking-tight mb-1">{item.title}</h3>
          <p className="text-xs font-light text-background-50/40">{item.sub}</p>
        </div>
        {/* Film strip */}
        <div className="hidden lg:flex gap-1.5">
          {items.slice(0, 8).map((it, i) => (
            <button
              key={it.id}
              onClick={() => goTo(i)}
              className="relative overflow-hidden cursor-pointer transition-all duration-200"
              style={{ width: '52px', height: '36px', opacity: i === idx ? 1 : 0.4, border: i === idx ? '1px solid #C8D400' : '1px solid transparent', borderRadius: 0 }}
            >
              <img src={it.images[0]} alt={it.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.body);
}

// ── CARD WITH AUTO-ROTATING IMAGES ───────────────────────────────────
interface CardProps {
  item: ShowcaseItem;
  colSpan: string; rowSpan: string;
  onOpen: () => void;
  titleSize: string;
  isWide?: boolean;
}

function ShowcaseCard({ item, colSpan, rowSpan, onOpen, titleSize, isWide = false }: CardProps) {
  const [hov, setHov] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate images
  useEffect(() => {
    if (item.images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setImgIdx(p => (p + 1) % item.images.length);
    }, 3200 + Math.random() * 800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [item.images.length]);

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{ gridColumn: colSpan, gridRow: rowSpan, minHeight: isWide ? '200px' : undefined, height: isWide ? '200px' : '100%' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onOpen}
    >
      {/* Images with cross-fade */}
      {item.images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
          loading="lazy"
          decoding="async"
          style={{
            opacity: i === imgIdx ? (hov ? 0.88 : 1) : 0,
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            transition: i === imgIdx ? 'opacity 0.9s ease, transform 0.7s ease-out' : 'opacity 0.7s ease',
          }}
        />
      ))}

      {/* Living overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.12) 50%,transparent 100%)' }} />
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg,rgba(200,212,0,0.07) 0%,transparent 60%)', opacity: hov ? 1 : 0 }} />

      {/* Live badge */}
      {item.badge === 'LIVE' && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.1em]" style={{ background: 'rgba(200,212,0,0.2)', border: '0.5px solid rgba(200,212,0,0.5)', color: '#C8D400', backdropFilter: 'blur(8px)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C8D400' }} />LIVE
        </div>
      )}
      {item.badge === 'AI' && (
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.1em] bg-primary-500 text-foreground-950">AI</div>
      )}

      {/* Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`text-[8px] font-black uppercase tracking-[0.12em] px-2.5 py-1 transition-all duration-300 ${hov ? 'bg-primary-500 text-foreground-950' : 'bg-primary-500/80 text-foreground-950'}`}>{item.tag}</span>
      </div>

      {/* Expand icon */}
      <div className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center transition-all duration-300 bg-foreground-950/55" style={{ opacity: hov ? 1 : 0, transform: hov ? 'scale(1) rotate(0)' : 'scale(0.6) rotate(-15deg)' }}>
        <i className="ri-zoom-in-line text-background-50 text-xs" />
      </div>

      {/* Lime border */}
      <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 0 1.5px #C8D400', opacity: hov ? 1 : 0 }} />
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10 transition-all duration-300" style={{ borderTop: hov ? '2px solid rgba(200,212,0,0.7)' : '2px solid transparent', borderRight: hov ? '2px solid rgba(200,212,0,0.7)' : '2px solid transparent' }} />
      <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10 transition-all duration-300" style={{ borderBottom: hov ? '2px solid rgba(200,212,0,0.5)' : '2px solid transparent', borderLeft: hov ? '2px solid rgba(200,212,0,0.5)' : '2px solid transparent' }} />

      {/* Image dots indicator */}
      {item.images.length > 1 && (
        <div className="absolute bottom-12 right-3 z-10 flex gap-1">
          {item.images.map((_, i) => (
            <div key={i} className="transition-all duration-400" style={{ width: i === imgIdx ? '14px' : '4px', height: '2px', background: i === imgIdx ? '#C8D400' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-4">
        <div className="transition-all duration-400" style={{ transform: hov ? 'translateY(0)' : 'translateY(3px)', opacity: hov ? 1 : 0.9 }}>
          <h3 className="font-black text-background-50 leading-tight mb-1" style={{ fontSize: titleSize }}>{item.title}</h3>
          <p className="text-background-50/55 text-[10px] font-medium leading-relaxed transition-all duration-300" style={{ maxHeight: hov ? '40px' : '0', overflow: 'hidden', opacity: hov ? 1 : 0 }}>{item.sub}</p>
        </div>
      </div>
    </div>
  );
}

// ── SCROLL REVEAL ────────────────────────────────────────────────────
function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── MAIN ─────────────────────────────────────────────────────────────
export default function KreationShowcase() {
  const [activeTab, setActiveTab] = useState<'konzeption' | 'content' | 'cgi'>('konzeption');
  const [isChanging, setIsChanging] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: ShowcaseItem[]; idx: number } | null>(null);
  const headerReveal = useReveal(0.1);
  const gridReveal = useReveal(0.04);

  // ── Dashboard: Primary showcase images ──
  const { images: dbPrimary } = useMediaStore('leistungen_kreation_showcase_images');

  // ── Dashboard: Secondary auto-rotate images (per tab) ──
  const secKonz = useMediaStore('leistungen_kreation_showcase_secondary_konzeption');
  const secContent = useMediaStore('leistungen_kreation_showcase_secondary_content');
  const secCgi = useMediaStore('leistungen_kreation_showcase_secondary_cgi');

  const secByTab: Record<string, { url: string }[]> = {
    konzeption: secKonz.images,
    content: secContent.images,
    cgi: secCgi.images,
  };

  // ── Build ITEMS dynamically: merge dashboard images with fallbacks ──
  const items: ShowcaseItem[] = (() => {
    const metas = ITEM_META[activeTab];
    const fbPrimary = FALLBACK_PRIMARY[activeTab];
    const fbSecondary = FALLBACK_SECONDARY[activeTab];

    // Primary images from dashboard; map by index
    const primaryByIndex: Record<number, string> = {};
    dbPrimary.forEach((img, i) => { primaryByIndex[i] = img.url; });

    // Secondary images from dashboard; map by index
    const secImgs = secByTab[activeTab];
    const secondaryByIndex: Record<number, string> = {};
    secImgs.forEach((img, i) => { secondaryByIndex[i] = img.url; });

    return metas.map((meta, i) => {
      const primary = primaryByIndex[i] || fbPrimary[i] || '';
      const secondary = secondaryByIndex[i] || fbSecondary[i] || primary;
      return {
        ...meta,
        images: [primary, secondary],
      } as ShowcaseItem;
    });
  })();

  const switchTab = useCallback((id: 'konzeption' | 'content' | 'cgi') => {
    if (id === activeTab) return;
    setIsChanging(true);
    setTimeout(() => { setActiveTab(id); setIsChanging(false); }, 240);
  }, [activeTab]);

  const openLightbox = (idx: number) => setLightbox({ items, idx });

  return (
    <>
    <section id="konzept" className="py-16 md:py-28 relative overflow-hidden bg-white">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.02) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(200,212,0,0.07) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* ── HEADER ── */}
        <div
          ref={headerReveal.ref}
          className="mb-10 md:mb-14"
          style={{ opacity: headerReveal.visible ? 1 : 0, transform: headerReveal.visible ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-foreground-950/6 border border-foreground-950/[0.1]">
                <i className="ri-gallery-line text-sm text-foreground-950" />
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground-950">Showcase</span>
              </div>
              
              <h2 className="font-black leading-[0.9] tracking-tight mb-3 text-foreground-950" style={{ fontSize: 'clamp(36px,5.5vw,68px)' }}>
                Unsere Arbeit.<br /><span className="text-primary-500">Deine Wirkung.</span>
              </h2>
              <p className="text-sm max-w-sm leading-relaxed text-foreground-950/45">
                {activeTab === 'konzeption' && 'Von der ersten Idee bis zum fertigen Konzept — Kreation die verkauft.'}
                {activeTab === 'content' && 'Foto, Video und Live-Produktion — komplett inhouse für alle Kanäle.'}
                {activeTab === 'cgi' && 'Fotorealistische 3D-Welten, AI-Konzepte und Motion Graphics in einer Produktion.'}
              </p>
            </div>
            {/* Tab switcher */}
            <div className="flex-shrink-0">
              <div className="flex border border-foreground-950/[0.12] bg-white" style={{ borderRadius: 0 }}>
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => switchTab(tab.id as 'konzeption' | 'content' | 'cgi')}
                      className={`flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer whitespace-nowrap border-r last:border-r-0 border-foreground-950/10 ${
                        isActive
                          ? 'bg-foreground-950 text-primary-500'
                          : 'text-foreground-950/40'
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <i className={`${tab.icon} text-sm`} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end gap-1 mt-2">
                {TABS.map(t => (
                  <div key={t.id} className={`transition-all duration-400 ${activeTab === t.id ? 'w-7 bg-primary-500' : 'w-2 bg-foreground-950/15'}`} style={{ height: '2px' }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SHOWCASE GRID ── */}
        <div
          ref={gridReveal.ref}
          style={{ opacity: isChanging ? 0 : (gridReveal.visible ? 1 : 0), transform: isChanging ? 'translateY(12px) scale(0.99)' : (gridReveal.visible ? 'none' : 'translateY(40px) scale(0.98)'), transition: isChanging ? 'opacity 0.24s ease, transform 0.24s ease' : 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}
        >
          <div className="grid gap-[3px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: 'repeat(2,240px)' }}>
            <ShowcaseCard item={items[0]} colSpan="span 5" rowSpan="span 2" onOpen={() => openLightbox(0)} titleSize="clamp(1rem,2vw,1.35rem)" />
            <ShowcaseCard item={items[1]} colSpan="span 4" rowSpan="span 1" onOpen={() => openLightbox(1)} titleSize="0.85rem" />
            <ShowcaseCard item={items[2]} colSpan="span 3" rowSpan="span 1" onOpen={() => openLightbox(2)} titleSize="0.85rem" />
            <ShowcaseCard item={items[3]} colSpan="span 4" rowSpan="span 1" onOpen={() => openLightbox(3)} titleSize="0.85rem" />
            <ShowcaseCard item={items[4] ?? items[3]} colSpan="span 3" rowSpan="span 1" onOpen={() => openLightbox(4)} titleSize="0.82rem" />
          </div>
          <div className="mt-[3px]">
            <ShowcaseCard item={items[4]} colSpan="span 12" rowSpan="auto" onOpen={() => openLightbox(4)} titleSize="1rem" isWide />
          </div>
        </div>

        {/* Before/After — CGI only */}
        {activeTab === 'cgi' && <BeforeAfterSlider />}

        {/* Bottom CTA */}
        <div className="mt-[3px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-8 py-5 bg-foreground-950/5 border border-foreground-950/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 bg-primary-500/[0.12]">
              <i className="ri-image-line text-primary-500" />
            </div>
            <span className="text-sm font-semibold text-foreground-950/50">Alle Beispiele auf Anfrage verfügbar</span>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Kreation%20Portfolio%20anfragen`} className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer group w-full sm:w-auto justify-center hover:bg-foreground-950 hover:text-background-50 bg-primary-500 text-foreground-950" style={{ borderRadius: 0 }}>
            Portfolio anfragen
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>

    {/* Lightbox */}
    {lightbox && (
      <Lightbox
        items={lightbox.items}
        startIdx={lightbox.idx}
        onClose={() => setLightbox(null)}
      />
    )}
    </>
  );
}
