import { useState, useEffect, useRef, useId, useCallback, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizModal from './QuizModal';
import WoodenButton from '@/components/base/WoodenButton';

const nodes = [
  { id: 'agentur', label: 'Sonic-Daten', icon: 'ri-user-star-line', desc: 'Einsatzplanung & Kampagnenstatus in Echtzeit' },
  { id: 'daten', label: 'Externe Daten', icon: 'ri-global-line', desc: 'Marktdaten, POS & API-Feeds' },
  { id: 'kunde', label: 'Kunden-Daten', icon: 'ri-file-list-3-line', desc: 'Live-KPIs, Abverkauf & Forecasting' },
  { id: 'mitarbeiter', label: 'Mitarbeiter-Daten', icon: 'ri-smartphone-line', desc: 'Einsatztracking, Ziele & Abrechnung' },
];

// Cardinal directions for the 4 outer nodes — top/left/right/bottom.
const DIRECTIONS: Record<string, { dx: number; dy: number }> = {
  agentur: { dx: 0, dy: -1 },      // top
  daten: { dx: -1, dy: 0 },        // left
  kunde: { dx: 1, dy: 0 },         // right
  mitarbeiter: { dx: 0, dy: 1 },   // bottom
};

interface Point { x: number; y: number; r: number }
interface Lines { agentur: [Point, Point]; daten: [Point, Point]; kunde: [Point, Point]; mitarbeiter: [Point, Point] }
interface Positions { agentur: { x: number; y: number }; daten: { x: number; y: number }; kunde: { x: number; y: number }; mitarbeiter: { x: number; y: number } }

// Small overlap (px) so the line visually disappears a couple pixels under
// each box's edge instead of stopping exactly on the mathematical boundary.
const OVERLAP = 3;

function shrinkToEdge(from: Point, to: Point): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return { x: from.x + ux * (from.r - OVERLAP), y: from.y + uy * (from.r - OVERLAP) };
}

export default function SRTTeaser() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const woodenId = useId();

  // ── Measured, symmetric geometry ────────────────────────────────────
  // All 4 outer nodes sit at the SAME absolute pixel radius from the
  // center — one shared distance, computed from the container's actual
  // size — so every connecting line is exactly the same length by
  // construction. The lines themselves are then drawn between the
  // measured, real edges of the center box and each outer box (via
  // ResizeObserver + getBoundingClientRect), so they connect precisely
  // to the boxes at any screen size instead of relying on static,
  // guessed coordinates that can drift out of sync with responsive
  // Tailwind breakpoints.
  const diagramRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLButtonElement>(null);
  const outerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [positions, setPositions] = useState<Positions | null>(null);
  const [lines, setLines] = useState<Lines | null>(null);

  // Pass 1: compute the shared radius + each outer node's pixel position,
  // purely from container size (doesn't need the boxes to exist yet).
  const computePositions = useCallback(() => {
    const container = diagramRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setContainerSize({ w: rect.width, h: rect.height });

    // Radius is a fraction of the smaller container dimension, so the
    // diagram always fits with room for the boxes' own size, at every
    // breakpoint — and is IDENTICAL in all 4 directions.
    const radius = Math.min(rect.width, rect.height) * 0.34;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const next: Partial<Positions> = {};
    (Object.keys(DIRECTIONS) as Array<keyof Positions>).forEach((id) => {
      const { dx, dy } = DIRECTIONS[id];
      next[id] = { x: cx + dx * radius, y: cy + dy * radius };
    });
    setPositions(next as Positions);
  }, []);

  // Pass 2: once boxes are positioned (and rendered), measure their real
  // edges to draw the connecting lines precisely.
  const measureLines = useCallback(() => {
    const container = diagramRef.current;
    const center = centerRef.current;
    if (!container || !center) return;

    const containerRect = container.getBoundingClientRect();
    const toPoint = (el: HTMLElement): Point => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
        r: Math.min(r.width, r.height) / 2,
      };
    };

    const centerPoint = toPoint(center);
    const next: Partial<Lines> = {};
    (Object.keys(DIRECTIONS) as Array<keyof Lines>).forEach((id) => {
      const el = outerRefs.current[id];
      if (!el) return;
      const outerPoint = toPoint(el);
      const start = shrinkToEdge(outerPoint, centerPoint);
      const end = shrinkToEdge(centerPoint, outerPoint);
      next[id] = [
        { x: start.x, y: start.y, r: 0 },
        { x: end.x, y: end.y, r: 0 },
      ];
    });
    setLines(next as Lines);
  }, []);

  useLayoutEffect(() => {
    computePositions();
    const ro = new ResizeObserver(() => {
      computePositions();
      // Boxes reposition on the same frame; measure lines just after.
      requestAnimationFrame(measureLines);
    });
    if (diagramRef.current) ro.observe(diagramRef.current);
    window.addEventListener('resize', computePositions);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computePositions);
    };
  }, [computePositions, measureLines]);

  useLayoutEffect(() => {
    // Re-measure lines whenever positions change (i.e. after layout).
    measureLines();
    const t1 = setTimeout(measureLines, 150);
    const t2 = setTimeout(measureLines, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [positions, measureLines]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      setPulse(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setPulse(true), 400);
          setTimeout(measureLines, 450);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [measureLines]);

  const activeNodeData = nodes.find((n) => n.id === activeNode);
  const toggleNode = (id: string) => setActiveNode((prev) => (prev === id ? null : id));

  return (
    <section
      ref={sectionRef}
      className="sonic-section-md px-4 md:px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a1a1a 0%, #111111 55%, #0B0B0C 100%)' }}
    >
      <div className="sonic-container relative z-10">
        {/* ── Header ── */}
        <div className="sonic-section-header">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Field-Force ERP</span>
          </div>
          <h2 className="sonic-h2 text-white">
            SRT: Sonic{' '}
            <span className="text-primary-500">Reporting Tool</span>
          </h2>
          <p className="sonic-subline" style={{ color: 'oklch(var(--foreground-300))' }}>
            Marktforschung, Forecasting, Einsatzplanung und Abrechnung — alles in einem Tool.
          </p>
        </div>

        {/* ── Diagram ── */}
        <div
          ref={diagramRef}
          className="flex relative items-center justify-center"
          style={{ height: 'clamp(300px, 55vw, 520px)' }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${containerSize.w || 1} ${containerSize.h || 1}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id={`srt-glow-${woodenId}`}>
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines — all 4 the same length, drawn from measured box edges */}
            {lines &&
              (Object.entries(lines) as Array<[string, [Point, Point]]>).map(([id, [start, end]]) => (
                <line
                  key={id}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="oklch(var(--primary-500))"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  opacity={activeNode === id ? 1 : 0.55}
                  className="transition-all duration-300"
                  filter={activeNode === id ? `url(#srt-glow-${woodenId})` : undefined}
                />
              ))}

            {/* Travelling data packets */}
            {isVisible && lines &&
              Object.entries(lines).map(([id, [start, end]], i) => (
                <g key={id}>
                  <circle r="2" fill="oklch(var(--primary-500))" opacity="0.6">
                    <animateMotion
                      dur="2.3s"
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                      path={`M${start.x},${start.y} L${end.x},${end.y}`}
                    />
                  </circle>
                </g>
              ))}
          </svg>

          {/* Center node */}
          <button
            ref={centerRef}
            onClick={() => setActiveNode((prev) => (prev === 'center' ? null : 'center'))}
            onMouseEnter={() => setActiveNode('center')}
            onMouseLeave={() => setActiveNode((prev) => (prev === 'center' ? null : prev))}
            className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
              w-16 h-16 sm:w-24 sm:h-24 md:w-[104px] md:h-[104px] lg:w-[124px] lg:h-[124px]
              ${pulse ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
              ${activeNode === 'center' ? 'ring-2 ring-primary-500/60' : 'hover:ring-1 hover:ring-primary-500/40'}`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'oklch(var(--primary-500))',
              boxShadow: '0 0 40px oklch(var(--primary-500) / 0.2)',
            }}
            aria-label="Sonic Reporting Tool — Zentrales ERP-System"
          >
            <div className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center text-foreground-950">
              <i className="ri-cpu-line text-base sm:text-xl lg:text-2xl" />
            </div>
            <span className="hidden sm:block text-foreground-950 text-xs font-bold uppercase tracking-wider text-center leading-tight mt-1">
              SRT
            </span>
          </button>

          {/* Outer nodes — positioned at equal pixel radius from center */}
          {positions && nodes.map((node) => (
            <NodeButton
              key={node.id}
              node={node}
              active={activeNode === node.id}
              onClick={() => toggleNode(node.id)}
              left={positions[node.id as keyof Positions].x}
              top={positions[node.id as keyof Positions].y}
              buttonRef={(el) => { outerRefs.current[node.id] = el; }}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="text-center mt-4 md:mt-2 min-h-[20px] md:min-h-[24px]">
          {activeNodeData ? (
            <p className="text-xs sm:text-sm text-foreground-300">{activeNodeData.desc}</p>
          ) : (
            <p className="text-xs sm:text-sm text-foreground-500">Modul antippen für Details</p>
          )}
        </div>

        {/* ── Compact CTA (nudge) ── */}
        <div className="mt-8 md:mt-10 flex flex-col items-center">
          <button
            onClick={() => setQuizOpen(true)}
            className="group inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-primary-500 text-foreground-950 px-6 py-3 font-black uppercase tracking-wide text-sm md:text-base transition-colors duration-300 cursor-pointer hover:bg-white text-center"
            style={{ borderRadius: 0 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.22em] opacity-80">30-Sekunden Kurzumfrage</span>
            <span className="text-sm md:text-base font-black uppercase leading-tight">Welche Sonic-Lösung passt zu dir?</span>
            <i className="ri-arrow-right-line text-lg flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="text-xs text-foreground-400 mt-3 font-semibold tracking-wide">
            Keine Registrierung · Kein Commitment
          </p>
        </div>
      </div>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}

interface NodeButtonProps {
  node: { id: string; label: string; icon: string };
  active: boolean;
  onClick: () => void;
  left: number;
  top: number;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

function NodeButton({ node, active, onClick, left, top, buttonRef }: NodeButtonProps) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`absolute z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
        active ? 'scale-110' : 'hover:scale-105'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
      style={{ left: `${left}px`, top: `${top}px` }}
      aria-label={node.label}
      aria-pressed={active}
    >
      <div
        className={`w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center border transition-all duration-300 backdrop-blur-lg ${
          active
            ? 'bg-primary-500/15 border-primary-500/70 text-primary-500'
            : 'bg-white/[0.08] border-white/25 text-white/85 hover:border-white/40 hover:text-primary-500'
        }`}
      >
        <i className={`${node.icon} text-sm sm:text-xl lg:text-2xl`} />
      </div>
      <span
        className={`text-[9px] sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 ${
          active ? 'text-primary-500' : 'text-white/85'
        }`}
      >
        {node.label}
      </span>
    </button>
  );
}
