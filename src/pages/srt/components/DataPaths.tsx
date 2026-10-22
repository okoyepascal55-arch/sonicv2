import { useReviewText } from '@/hooks/useReviewText';
import { useMotionPaused } from '@/lib/motion';
import { useState, useEffect, useRef, useId, useCallback, useLayoutEffect } from 'react';
import { useText } from '@/hooks/useText';
import { PAPER, HAIR, MUTED } from './SrtKit';

const nodes = [
  { id: 'agentur', label: 'Sonic-Daten', icon: 'ri-user-star-line', desc: 'Einsatzplanung & Kampagnenstatus in Echtzeit' },
  { id: 'externe', label: 'Externe Daten', icon: 'ri-global-line', desc: 'Handelsdaten, Online-Shops & Hersteller-Apps' },
  { id: 'kunde', label: 'Kunden-Daten', icon: 'ri-file-list-3-line', desc: 'Live-KPIs, Abverkauf & Reportings' },
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
  const motionPaused = useMotionPaused();
  const dn = useReviewText('common_srt_data_nodes');
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
    // Wide spread (22.10.2026): the diagram uses the full panel width, not just a square in the middle
    const rx = Math.min(rect.width * 0.36, 460);
    const ry = rect.height * 0.36;
    const cx = rect.width / 2; const cy = rect.height / 2;
    const next: Partial<Positions> = {};
    (Object.keys(DIRECTIONS) as Array<keyof Positions>).forEach((id) => {
      const { dx, dy } = DIRECTIONS[id];
      next[id] = { x: cx + dx * rx, y: cy + dy * ry };
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
    <section id="datenfluss" className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span></div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="sonic-h2 text-foreground-950">{tHeading}</h2>
            <p className="text-[15px] md:text-[16px] leading-relaxed max-w-md" style={{ color: MUTED }}>{tSub}</p>
          </div>
        </div>

        {/* Node diagram in an app window, full width (22.10.2026) */}
        <div style={{ background: PAPER, border: `1px solid ${HAIR}` }}>
        <div ref={diagramRef} className="relative flex items-center justify-center" style={{ height: 'clamp(300px, 44vw, 540px)', background: 'radial-gradient(ellipse 40% 45% at 50% 50%, oklch(0.81 0.19 115 / 0.16), transparent 70%)' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${containerSize.w || 1} ${containerSize.h || 1}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id={`dp-glow-${woodenId}`}>
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {lines && (Object.entries(lines) as Array<[string, [Point, Point]]>).map(([id, [start, end]]) => (
              <line key={id} x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                stroke="oklch(0.62 0.15 115)" strokeWidth="1.5"
                opacity={activeNode === id ? 1 : 0.55} className={`transition-opacity duration-300 ${motionPaused ? '' : 'srt-flow'}`}
                style={motionPaused ? { strokeDasharray: '5 5' } : undefined}
                filter={activeNode === id ? `url(#dp-glow-${woodenId})` : undefined} />
            ))}
            {pulse && !motionPaused && lines && Object.entries(lines).map(([id, [start, end]], i) => (
              <g key={id}>
                <circle r="3.5" fill="oklch(0.62 0.15 115)" filter={`url(#dp-glow-${woodenId})`}>
                  <animateMotion dur="2.3s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M${start.x},${start.y} L${end.x},${end.y}`} />
                </circle>
                <circle r="2" fill="oklch(0.62 0.15 115)" opacity="0.55">
                  <animateMotion dur="2.3s" begin={`${i * 0.5 + 1.15}s`} repeatCount="indefinite" path={`M${start.x},${start.y} L${end.x},${end.y}`} />
                </circle>
              </g>
            ))}
          </svg>

          {/* Center node — SRT */}
          <button ref={centerRef} onClick={() => setActiveNode(p => p === 'center' ? null : 'center')}
            aria-label="Sonic Reporting Tool (SRT) — zentrale Datenbasis"
            onMouseEnter={() => setActiveNode('center')} onMouseLeave={() => setActiveNode(p => p === 'center' ? null : p)}
            className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer w-16 h-16 sm:w-24 sm:h-24 md:w-[104px] md:h-[104px] lg:w-[124px] lg:h-[124px] ${pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} ${activeNode === 'center' ? 'ring-2 ring-primary-500/60' : 'hover:ring-1 hover:ring-primary-500/40'}`}
            style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'oklch(0.13 0.005 118)', boxShadow: '0 24px 50px -18px rgba(0,0,0,0.5)' }}>
            {!motionPaused && <span className="srt-core-ring absolute inset-0 pointer-events-none" aria-hidden="true" />}
            <i className="ri-cpu-line text-primary-500 text-base sm:text-xl lg:text-2xl" aria-hidden="true" />
            <span className="hidden sm:block text-white text-xs font-bold uppercase tracking-wider text-center leading-tight mt-1">SRT</span>
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
                <div className={`w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center border transition-all duration-300 backdrop-blur-lg ${isActive ? 'bg-white border-primary-500 text-foreground-950 shadow-lg' : 'bg-white border-black/10 text-foreground-950/75 hover:border-primary-500 shadow-sm'}`}>
                  <i className={`${node.icon} text-sm sm:text-xl lg:text-2xl`} aria-hidden="true" />
                </div>
                <span className={`text-[9px] sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-foreground-950' : 'text-foreground-950/70'}`}>{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Caption */}
        <div className="text-center py-4 min-h-[20px]" style={{ borderTop: `1px solid ${HAIR}` }}>
          {activeNodeData ? (
            <p className="text-xs sm:text-sm text-foreground-950/70">{dn[`n${nodes.findIndex((n) => n.id === activeNodeData.id) + 1}-desc`] || activeNodeData.desc}</p>
          ) : (
            <p className="text-xs sm:text-sm text-foreground-500">Modul antippen für Details</p>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
