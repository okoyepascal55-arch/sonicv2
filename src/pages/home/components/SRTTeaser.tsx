import { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizModal from './QuizModal';
import WoodenButton from '@/components/base/WoodenButton';

const nodes = [
  { id: 'agentur', label: 'Sonic Agentur', icon: 'ri-user-star-line', desc: 'Einsatzplanung & Kampagnenstatus in Echtzeit' },
  { id: 'daten', label: 'Externe Daten', icon: 'ri-global-line', desc: 'Marktdaten, POS & API-Feeds' },
  { id: 'kunde', label: 'Kunde', icon: 'ri-file-list-3-line', desc: 'Live-KPIs, Abverkauf & Forecasting' },
  { id: 'mitarbeiter', label: 'Mitarbeiter', icon: 'ri-smartphone-line', desc: 'Einsatztracking, Ziele & Abrechnung' },
];

const SVG_WIDTH = 600;
const SVG_HEIGHT = 500;
const CENTER_NODE = { cx: 300, cy: 250, r: 76 };
const OUTER_NODES = {
  top: { cx: 300, cy: 68, r: 44 },
  left: { cx: 85, cy: 250, r: 44 },
  right: { cx: 515, cy: 250, r: 44 },
  bottom: { cx: 300, cy: 432, r: 44 },
};

function getLineCoords(
  outer: { cx: number; cy: number; r: number },
  center: { cx: number; cy: number; r: number }
) {
  const dx = center.cx - outer.cx;
  const dy = center.cy - outer.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: outer.cx + ux * outer.r,
    y1: outer.cy + uy * outer.r,
    x2: center.cx - ux * center.r,
    y2: center.cy - uy * center.r,
  };
}

const LINES = {
  agentur: getLineCoords(OUTER_NODES.top, CENTER_NODE),
  daten: getLineCoords(OUTER_NODES.left, CENTER_NODE),
  kunde: getLineCoords(OUTER_NODES.right, CENTER_NODE),
  mitarbeiter: getLineCoords(OUTER_NODES.bottom, CENTER_NODE),
};

export default function SRTTeaser() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const woodenId = useId();


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
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const activeNodeData = nodes.find((n) => n.id === activeNode);
  const toggleNode = (id: string) => setActiveNode((prev) => (prev === id ? null : id));

  return (
    <section
      ref={sectionRef}
      className="sonic-section-md px-4 md:px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a1a1a 0%, #111111 55%, #0B0B0C 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[700px] bg-primary-500/[0.07] rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="sonic-container relative z-10">
        {/* ── Header ── */}
        <div className="sonic-section-header">
          <div className="flex items-center gap-3 mb-2">
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

        {/* ── Diagram — one radial node-map at every breakpoint ── */}
        <div
          className="flex relative items-center justify-center"
          style={{ height: 'clamp(280px, 60vw, 460px)' }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
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

            {/* Connection lines */}
            {Object.entries(LINES).map(([id, line]) => (
              <line
                key={id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="oklch(var(--primary-500))"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                opacity={activeNode === id ? 1 : 0.45}
                className="transition-all duration-300"
                filter={activeNode === id ? `url(#srt-glow-${woodenId})` : undefined}
              />
            ))}

            {/* Travelling data packets */}
            {isVisible &&
              [
                { line: LINES.agentur, dur: '2s', delay: '0s' },
                { line: LINES.daten, dur: '2.5s', delay: '0.6s' },
                { line: LINES.kunde, dur: '2.2s', delay: '1.1s' },
                { line: LINES.mitarbeiter, dur: '2.8s', delay: '0.3s' },
              ].map(({ line, dur, delay }, i) => (
                <g key={i}>
                  <circle r="2" fill="oklch(var(--primary-500))" opacity="0.6">
                    <animateMotion
                      dur={dur}
                      begin={delay}
                      repeatCount="indefinite"
                      path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                    />
                  </circle>
                </g>
              ))}
          </svg>

          {/* Center node */}
          <button
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

          {/* Outer nodes */}
          {[
            { node: nodes[0], coords: OUTER_NODES.top },
            { node: nodes[1], coords: OUTER_NODES.left },
            { node: nodes[2], coords: OUTER_NODES.right },
            { node: nodes[3], coords: OUTER_NODES.bottom },
          ].map(({ node, coords }) => (
            <NodeButton
              key={node.id}
              node={node}
              active={activeNode === node.id}
              onClick={() => toggleNode(node.id)}
              leftPct={(coords.cx / SVG_WIDTH) * 100}
              topPct={(coords.cy / SVG_HEIGHT) * 100}
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
  leftPct: number;
  topPct: number;
}

function NodeButton({ node, active, onClick, leftPct, topPct }: NodeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${
        active ? 'scale-110' : 'hover:scale-105'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
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