import { useState, useEffect, useRef, useId, useCallback, useLayoutEffect } from 'react';
import { useText } from '@/hooks/useText';

const nodes = [
  { id: 'agentur', label: 'Sonic-Daten', icon: 'ri-user-star-line', desc: 'Einsatzplanung & Kampagnenstatus in Echtzeit' },
  { id: 'externe', label: 'Externe Daten', icon: 'ri-global-line', desc: 'Marktdaten, POS & API-Feeds' },
  { id: 'kunde', label: 'Kunden-Daten', icon: 'ri-file-list-3-line', desc: 'Live-KPIs, Abverkauf & Forecasting' },
  { id: 'mitarbeiter', label: 'Mitarbeiter-Daten', icon: 'ri-smartphone-line', desc: 'Einsatztracking, Ziele & Abrechnung' },
];

const DIRECTIONS: Record<string, { dx: number; dy: number }> = {
  agentur: { dx: 0, dy: -1 },
  externe: { dx: -1, dy: 0 },
  kunde: { dx: 1, dy: 0 },
  mitarbeiter: { dx: 0, dy: 1 },
};

interface Point { x: number; y: number; r: number }
interface Lines { agentur: [Point, Point]; externe: [Point, Point]; kunde: [Point, Point]; mitarbeiter: [Point, Point] }
interface Positions { agentur: { x: number; y: number }; externe: { x: number; y: number }; kunde: { x: number; y: number }; mitarbeiter: { x: number; y: number } }

const OVERLAP = 3;
function shrinkToEdge(from: Point, to: Point): { x: number; y: number } {
  const dx = to.x - from.x; const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: from.x + (dx / dist) * (from.r - OVERLAP), y: from.y + (dy / dist) * (from.r - OVERLAP) };
}

export default function DataPaths() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);
  const tBadge = useText('srt_datapaths', 'srt-data-badge', 'Datenfluss');
  const tHeading = useText('srt_datapaths', 'srt-data-heading', 'So fließen die Daten durch das SRT.');
  const tSub = useText('srt_datapaths', 'srt-data-p1', 'Das SRT ist das zentrale Nervensystem — es verbindet Sonic, Kunden, Mitarbeiter und externe Systeme in einer einzigen, synchronen Datenbasis.');
  const woodenId = useId();

  const diagramRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLButtonElement>(null);
  const outerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [positions, setPositions] = useState<Positions | null>(null);
  const [lines, setLines] = useState<Lines | null>(null);

  const computePositions = useCallback(() => {
    const container = diagramRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setContainerSize({ w: rect.width, h: rect.height });
    // Use 38% of the smaller dimension for better visual spread
    const radius = Math.min(rect.width, rect.height) * 0.38;
    const cx = rect.width / 2; const cy = rect.height / 2;
    const next: Partial<Positions> = {};
    (Object.keys(DIRECTIONS) as Array<keyof Positions>).forEach((id) => {
      const { dx, dy } = DIRECTIONS[id];
      next[id] = { x: cx + dx * radius, y: cy + dy * radius };
    });
    setPositions(next as Positions);
  }, []);

  const measureLines = useCallback(() => {
    const container = diagramRef.current; const center = centerRef.current;
    if (!container || !center) return;
    const containerRect = container.getBoundingClientRect();
    const toPoint = (el: HTMLElement): Point => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - containerRect.left, y: r.top + r.height / 2 - containerRect.top, r: Math.min(r.width, r.height) / 2 };
    };
    const centerPoint = toPoint(center);
    const next: Partial<Lines> = {};
    (Object.keys(DIRECTIONS) as Array<keyof Lines>).forEach((id) => {
      const el = outerRefs.current[id];
      if (!el) return;
      const outerPoint = toPoint(el);
      const start = shrinkToEdge(outerPoint, centerPoint);
      const end = shrinkToEdge(centerPoint, outerPoint);
      next[id] = [{ x: start.x, y: start.y, r: 0 }, { x: end.x, y: end.y, r: 0 }];
    });
    setLines(next as Lines);
  }, []);

  useLayoutEffect(() => {
    computePositions();
    const ro = new ResizeObserver(() => { computePositions(); requestAnimationFrame(measureLines); });
    if (diagramRef.current) ro.observe(diagramRef.current);
    window.addEventListener('resize', computePositions);
    return () => { ro.disconnect(); window.removeEventListener('resize', computePositions); };
  }, [computePositions, measureLines]);

  useLayoutEffect(() => {
    measureLines();
    const t1 = setTimeout(measureLines, 150); const t2 = setTimeout(measureLines, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [positions, measureLines]);

  useEffect(() => {
    setTimeout(() => setPulse(true), 200);
    setTimeout(measureLines, 400);
  }, [measureLines]);

  const activeNodeData = nodes.find((n) => n.id === activeNode);

  return (
    <section id="datenfluss" className="sonic-section-lg px-4 md:px-6 bg-foreground-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500)) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tBadge}</span></div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="sonic-h2 text-background-50 uppercase">{tHeading}</h2>
            <p className="text-background-50/45 text-sm leading-relaxed max-w-md">{tSub}</p>
          </div>
        </div>

        {/* Same node diagram as homepage SRTTeaser */}
        <div ref={diagramRef} className="relative flex items-center justify-center" style={{ height: 'clamp(280px, 45vw, 460px)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${containerSize.w || 1} ${containerSize.h || 1}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id={`dp-glow-${woodenId}`}>
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {lines && (Object.entries(lines) as Array<[string, [Point, Point]]>).map(([id, [start, end]]) => (
              <line key={id} x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                stroke="oklch(var(--primary-500))" strokeWidth="1.5" strokeDasharray="5 5"
                opacity={activeNode === id ? 1 : 0.55} className="transition-all duration-300"
                filter={activeNode === id ? `url(#dp-glow-${woodenId})` : undefined} />
            ))}
            {pulse && lines && Object.entries(lines).map(([id, [start, end]], i) => (
              <g key={id}>
                <circle r="2" fill="oklch(var(--primary-500))" opacity="0.6">
                  <animateMotion dur="2.3s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${start.x},${start.y} L${end.x},${end.y}`} />
                </circle>
              </g>
            ))}
          </svg>

          {/* Center node — SRT */}
          <button ref={centerRef} onClick={() => setActiveNode(p => p === 'center' ? null : 'center')}
            onMouseEnter={() => setActiveNode('center')} onMouseLeave={() => setActiveNode(p => p === 'center' ? null : p)}
            className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer w-16 h-16 sm:w-24 sm:h-24 md:w-[104px] md:h-[104px] lg:w-[124px] lg:h-[124px] ${pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${activeNode === 'center' ? 'ring-2 ring-primary-500/60' : 'hover:ring-1 hover:ring-primary-500/40'}`}
            style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'oklch(var(--primary-500))', boxShadow: '0 0 40px oklch(var(--primary-500) / 0.2)' }}>
            <i className="ri-cpu-line text-foreground-950 text-base sm:text-xl lg:text-2xl" />
            <span className="hidden sm:block text-foreground-950 text-xs font-bold uppercase tracking-wider text-center leading-tight mt-1">SRT</span>
          </button>

          {/* Outer nodes */}
          {positions && nodes.map((node) => {
            const pos = positions[node.id as keyof Positions];
            const isActive = activeNode === node.id;
            return (
              <button key={node.id} ref={el => { outerRefs.current[node.id] = el; }}
                onClick={() => setActiveNode(p => p === node.id ? null : node.id)}
                className={`absolute z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}>
                <div className={`w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center border transition-all duration-300 backdrop-blur-lg ${isActive ? 'bg-primary-500/15 border-primary-500/70 text-primary-500' : 'bg-white/[0.08] border-white/25 text-white/85 hover:border-white/40 hover:text-primary-500'}`}>
                  <i className={`${node.icon} text-sm sm:text-xl lg:text-2xl`} />
                </div>
                <span className={`text-[9px] sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary-500' : 'text-white/85'}`}>{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Caption */}
        <div className="text-center mt-4 min-h-[20px]">
          {activeNodeData ? (
            <p className="text-xs sm:text-sm text-foreground-300">{activeNodeData.desc}</p>
          ) : (
            <p className="text-xs sm:text-sm text-foreground-500">Modul antippen für Details</p>
          )}
        </div>
      </div>
    </section>
  );
}
