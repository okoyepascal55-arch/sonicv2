import { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionBadge from '@/components/base/SectionBadge';

const modules = [
  { icon: 'ri-user-star-line', label: 'Sonic Agentur' },
  { icon: 'ri-global-line', label: 'Externe Daten' },
  { icon: 'ri-file-list-3-line', label: 'Kunde' },
  { icon: 'ri-smartphone-line', label: 'Mitarbeiter' },
];

const nodes = [
  {
    id: 'agentur',
    label: 'SONIC AGENTUR',
    mobileLabel: 'SONIC AGENTUR',
    icon: 'ri-user-star-line',
    position: 'top',
    detail: {
      title: 'Sonic Agentur',
      desc: 'Direkte Anbindung an alle Sonic-Agenturdaten — Einsatzplanung, Teamleistung und Kampagnenstatus in Echtzeit.',
      tags: ['Einsatzplanung', 'Teamleistung', 'Kampagnenstatus'],
    },
  },
  {
    id: 'daten',
    label: 'EXTERNE DATEN',
    mobileLabel: 'EXTERN',
    icon: 'ri-global-line',
    position: 'left',
    detail: {
      title: 'Externe Daten',
      desc: 'Integration externer Marktdaten, POS-Systeme und Drittanbieter-Feeds für ein vollständiges Bild.',
      tags: ['Marktdaten', 'POS-Integration', 'API-Feeds'],
    },
  },
  {
    id: 'kunde',
    label: 'KUNDE',
    mobileLabel: 'KUNDE',
    icon: 'ri-file-list-3-line',
    position: 'right',
    detail: {
      title: 'Kunde',
      desc: 'Kunden erhalten maßgeschneiderte Dashboards mit Live-KPIs, Abverkaufsdaten und Forecasting.',
      tags: ['Live-KPIs', 'Abverkauf', 'Forecasting'],
    },
  },
  {
    id: 'mitarbeiter',
    label: 'MITARBEITER',
    mobileLabel: 'TEAM',
    icon: 'ri-smartphone-line',
    position: 'bottom',
    detail: {
      title: 'Mitarbeiter',
      desc: 'Außendienstmitarbeiter tracken Einsätze, Zielerreichung und Abrechnung direkt über die mobile App.',
      tags: ['Einsatztracking', 'Zielerreichung', 'Abrechnung'],
    },
  },
];

const SVG_WIDTH = 600;
const SVG_HEIGHT = 500;
const CENTER_NODE = { cx: 300, cy: 250, r: 76 };
const OUTER_NODES = {
  top: { cx: 300, cy: 70, r: 42 },
  left: { cx: 85, cy: 250, r: 42 },
  right: { cx: 515, cy: 250, r: 42 },
  bottom: { cx: 300, cy: 430, r: 42 },
};

function getLineCoords(
  outerNode: { cx: number; cy: number; r: number },
  centerNode: { cx: number; cy: number; r: number }
) {
  const dx = centerNode.cx - outerNode.cx;
  const dy = centerNode.cy - outerNode.cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: outerNode.cx + ux * outerNode.r,
    y1: outerNode.cy + uy * outerNode.r,
    x2: centerNode.cx - ux * centerNode.r,
    y2: centerNode.cy - uy * centerNode.r,
  };
}

const LINE_TOP = getLineCoords(OUTER_NODES.top, CENTER_NODE);
const LINE_LEFT = getLineCoords(OUTER_NODES.left, CENTER_NODE);
const LINE_RIGHT = getLineCoords(OUTER_NODES.right, CENTER_NODE);
const LINE_BOTTOM = getLineCoords(OUTER_NODES.bottom, CENTER_NODE);

export default function SRTTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulseCenter, setPulseCenter] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const navigate = useNavigate();
  const woodenId = useId();

  const handleNav = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      setPulseCenter(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setPulseCenter(true), 600);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const activeNodeData = nodes.find((n) => n.id === activeNode);

  // Two-way sync: map between module index and node id
  const nodeIdToModuleIndex: Record<string, number> = {
    agentur: 0,
    daten: 1,
    kunde: 2,
    mitarbeiter: 3,
  };
  const moduleIndexToNodeId: Record<number, string> = {
    0: 'agentur',
    1: 'daten',
    2: 'kunde',
    3: 'mitarbeiter',
  };

  const handleModuleClick = (i: number) => {
    setActiveModule(i);
    const nodeId = moduleIndexToNodeId[i];
    if (nodeId) setActiveNode(nodeId);
  };

  const handleNodeClick = (id: string | null) => {
    if (id === 'center') {
      setActiveNode('center');
      return;
    }
    const newActiveNode = activeNode === id ? null : id;
    setActiveNode(newActiveNode);
    if (newActiveNode && nodeIdToModuleIndex[newActiveNode] !== undefined) {
      setActiveModule(nodeIdToModuleIndex[newActiveNode]);
    }
  };

  // Determine left panel detail: show node detail if a specific node is active, otherwise default
  const leftDetailActive = activeNodeData && activeNode !== 'center';

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #0f0f0f 0%, #0a0a0a 50%, #060606 100%)' }}
    >
      {/* ── Ambient glow orbs — balanced across both columns ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-500/[0.03] rounded-full blur-[160px] pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-0 w-[300px] h-[500px] bg-primary-500/[0.02] rounded-full blur-[120px] pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[400px] bg-primary-500/[0.015] rounded-full blur-[130px] pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* ── Subtle wooden wave decorative line at top ── */}
      <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        <svg className="absolute w-[200%] h-full animate-wave-1" viewBox="0 0 2000 20" preserveAspectRatio="none">
          <path d="M0,10 Q50,4 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10 T1100,10 T1200,10 T1300,10 T1400,10 T1500,10 T1600,10 T1700,10 T1800,10 T1900,10 T2000,10" fill="none" stroke="oklch(var(--primary-500))" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Use md: breakpoint for 2-col so tablets get the full experience */}
        <div className="grid md:grid-cols-[1fr_1.4fr] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] gap-6 md:gap-8 lg:gap-10 xl:gap-16 items-start md:items-center">
          {/* ── Left — Glass Content Panel ── */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative overflow-hidden p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]">
              {/* Wooden SVG border */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`srt-left-wooden-${woodenId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity="0.12" />
                    <stop offset="50%" stopColor="oklch(var(--primary-600))" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  fill="none"
                  stroke={`url(#srt-left-wooden-${woodenId})`}
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Content */}
              <div className="relative z-10">
                {/* Eyebrow */}
                <SectionBadge text="Field-Force ERP" variant="light" className="mb-3 md:mb-5" />

                {/* Headline — tighter on small screens */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-2 md:mb-4 leading-[1.15]">
                  SRT: SONIC
                  <br />
                  <span className="text-primary-500">REPORTING TOOL</span>
                </h2>

                {/* Subtle wooden line separator */}
                <div className="w-12 sm:w-16 h-px mb-2 md:mb-4 overflow-hidden" aria-hidden="true">
                  <svg className="w-full h-full" viewBox="0 0 64 1" preserveAspectRatio="none">
                    <line x1="0" y1="0.5" x2="64" y2="0.5" stroke="oklch(var(--primary-500))" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Description — syncs with active node */}
                {leftDetailActive && activeNodeData ? (
                  <div className="mb-3 md:mb-5 max-w-lg">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-primary-500 bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 flex-shrink-0">
                        <i className={`${activeNodeData.icon} text-sm md:text-base`} />
                      </div>
                      <p className="text-primary-500 text-xs md:text-sm font-black uppercase tracking-wider">
                        {activeNodeData.detail.title}
                      </p>
                    </div>
                    <p className="text-foreground-300 text-xs sm:text-sm leading-relaxed mb-2 md:mb-3">
                      {activeNodeData.detail.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-none sm:flex sm:flex-nowrap sm:overflow-x-auto sm:pb-1 sm:-mx-1 sm:px-1 mb-4 md:mb-8" style={{ scrollbarWidth: 'none' }}>
                      {activeNodeData.detail.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-xs font-bold text-primary-500/80 bg-primary-500/5 backdrop-blur-sm border border-primary-500/15 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground-300 text-xs sm:text-sm leading-relaxed mb-3 md:mb-6 max-w-lg">
                    Unser Field‑Force‑ERP‑System: Marktforschung, Forecasting, Einsatzplanung,
                    Einsatztracking, Zielerreichung, Abrechnung, Dashboards. Alles in einem Tool,
                    angedockt an eure Software.
                  </p>
                )}

                {/* Module tags — 2x2 grid on tiny screens, horizontal scroll on sm+ */}
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-none sm:flex sm:flex-nowrap sm:overflow-x-auto sm:pb-1 sm:-mx-1 sm:px-1 mb-4 md:mb-8" style={{ scrollbarWidth: 'none' }}>
                  {modules.map((mod, i) => (
                    <button
                      key={i}
                      onClick={() => handleModuleClick(i)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 transition-all duration-500 cursor-pointer backdrop-blur-md min-h-[44px] ${
                        activeModule === i
                          ? 'bg-primary-500/10 border border-primary-500/40 shadow-[0_0_20px_oklch(var(--primary-500)/0.08)]'
                          : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] active:bg-white/[0.08]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 md:w-5 md:h-5 flex items-center justify-center transition-colors duration-500 ${
                          activeModule === i ? 'text-primary-500' : 'text-foreground-500'
                        }`}
                      >
                        <i className={`${mod.icon} text-[12px] sm:text-[13px] md:text-base`} />
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs md:text-sm font-semibold transition-colors duration-500 whitespace-nowrap ${
                          activeModule === i ? 'text-white' : 'text-foreground-500'
                        }`}
                      >
                        {mod.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* CTA — WoodenButton style */}
                <button
                  onClick={() => handleNav('/srt')}
                  className="inline-flex items-center gap-2 md:gap-3 bg-primary-500 text-foreground-950 px-5 md:px-7 py-2.5 md:py-3.5 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 relative overflow-hidden group active:scale-[0.97] min-h-[44px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    Mehr dazu
                    <i className="ri-arrow-right-line text-sm md:text-lg" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right – Glass Diagram Panel ── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* Main glass panel with wooden SVG border */}
              <div
                className="relative overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]"
                role="region"
                aria-label="SRT Field-Force ERP System-Diagramm"
              >
                {/* Wooden SVG border */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`srt-wooden-${woodenId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredNode ? 0.5 : 0.1} />
                      <stop offset="50%" stopColor="oklch(var(--primary-600))" stopOpacity={hoveredNode ? 0.4 : 0.06} />
                      <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredNode ? 0.5 : 0.1} />
                    </linearGradient>
                  </defs>
                  <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke={`url(#srt-wooden-${woodenId})`}
                    strokeWidth={hoveredNode ? 1.5 : 0.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all ease-out"
                    style={{ transitionDuration: '1.2s' }}
                  />
                </svg>

                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'radial-gradient(oklch(var(--primary-500) / 0.5) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500/60" />
                  <span className="text-[10px] sm:text-2xs text-foreground-500 font-medium uppercase tracking-[0.15em]">
                    Field‑Force ERP
                  </span>
                </div>

                {/* Floating stat badges — md and up */}
                <div className="hidden md:block absolute top-[60px] left-5 z-20 backdrop-blur-lg bg-black/30 border border-white/[0.06] px-3 py-2">
                  <div className="text-3xs text-foreground-500 font-medium uppercase tracking-wider whitespace-nowrap">
                    Einsätze / Monat
                  </div>
                  <div className="text-sm font-bold text-white leading-tight">12.400+</div>
                </div>

                <div className="hidden md:block absolute top-[60px] right-5 z-20 backdrop-blur-lg bg-black/30 border border-white/[0.06] px-3 py-2">
                  <div className="text-3xs text-foreground-500 font-medium uppercase tracking-wider whitespace-nowrap">
                    Zielerreichung
                  </div>
                  <div className="text-sm font-bold text-primary-500 leading-tight">94.7%</div>
                </div>

                {/* ── Mobile: 2×2 Module Grid ── */}
                <div className="md:hidden relative z-10 mt-1">
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {nodes.map((node) => {
                      const isActive = activeNode === node.id;
                      return (
                        <button
                          key={node.id}
                          onClick={() => handleNodeClick(node.id)}
                          className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 backdrop-blur-md border transition-all duration-300 cursor-pointer min-h-[64px] sm:min-h-[72px] ${
                            isActive
                              ? 'bg-primary-500/10 border-primary-500/40 shadow-[0_0_20px_oklch(var(--primary-500)/0.08)]'
                              : 'bg-white/[0.03] border-white/[0.06] active:bg-white/[0.08]'
                          }`}
                          aria-label={`${node.label} — Modul im SRT System`}
                          aria-expanded={isActive}
                          aria-controls="srt-detail-panel"
                        >
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors duration-300 ${
                              isActive ? 'text-primary-500' : 'text-foreground-500'
                            }`}
                          >
                            <i className={`${node.icon} text-base sm:text-lg`} />
                          </div>
                          <span
                            className={`text-[9px] sm:text-2xs font-semibold uppercase tracking-wide text-center leading-tight ${
                              isActive ? 'text-primary-500' : 'text-foreground-600'
                            }`}
                          >
                            {node.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Center node indicator on mobile */}
                  <div className="flex items-center justify-center mt-2 sm:mt-3">
                    <button
                      onClick={() => handleNodeClick('center')}
                      className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                        activeNode === 'center'
                          ? 'bg-primary-500/15 border-primary-500/40'
                          : 'bg-white/[0.03] border-white/[0.06]'
                      }`}
                      style={{
                        background: activeNode === 'center' ? 'oklch(var(--primary-500) / 0.15)' : undefined,
                      }}
                      aria-label="Sonic Reporting Tool — Zentrales ERP-System"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-primary-500">
                        <i className="ri-cpu-line text-sm sm:text-base" />
                      </div>
                      <span className="text-[10px] sm:text-2xs font-bold text-white uppercase tracking-wider">SRT Zentrale</span>
                    </button>
                  </div>
                </div>

                {/* ── Desktop: Full SVG Diagram ── */}
                <div
                  className="hidden md:flex relative z-10 items-center justify-center"
                  style={{ height: 'clamp(300px, 46vw, 560px)' }}
                >
                  {/* SVG lines & packets */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <filter id={`srt-glow-${woodenId}`}>
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Connection lines */}
                    {[
                      { line: LINE_TOP, id: 'agentur' },
                      { line: LINE_LEFT, id: 'daten' },
                      { line: LINE_RIGHT, id: 'kunde' },
                      { line: LINE_BOTTOM, id: 'mitarbeiter' },
                    ].map(({ line, id }) => (
                      <line
                        key={id}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="oklch(var(--primary-500))"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                        opacity={activeNode === id ? 1 : 0.22}
                        className="transition-all duration-300"
                        filter={activeNode === id ? `url(#srt-glow-${woodenId})` : undefined}
                      />
                    ))}

                    {/* Travelling data packets — only render once section is in view (perf) */}
                    {isVisible &&
                      [
                        { line: LINE_TOP, dur: '2s', delay: '0s' },
                        { line: LINE_LEFT, dur: '2.5s', delay: '0.6s' },
                        { line: LINE_RIGHT, dur: '2.2s', delay: '1.1s' },
                        { line: LINE_BOTTOM, dur: '2.8s', delay: '0.3s' },
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

                  {/* HTML nodes */}
                  <div className="absolute inset-0">
                    {/* Center node */}
                    <button
                      onClick={() => handleNodeClick('center')}
                      onMouseEnter={() => setHoveredNode('center')}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`absolute z-20 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
                      w-[100px] h-[100px] md:w-[118px] md:h-[118px] lg:w-[132px] lg:h-[132px]
                      ${pulseCenter ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                      ${activeNode === 'center' ? 'ring-2 ring-primary-500/50' : 'hover:ring-1 hover:ring-primary-500/40'}
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'oklch(var(--primary-500))',
                        boxShadow: activeNode === 'center'
                          ? '0 0 60px oklch(var(--primary-500) / 0.25)'
                          : '0 0 30px oklch(var(--primary-500) / 0.1)',
                      }}
                      aria-label="Sonic Reporting Tool — Zentrales ERP-System"
                      aria-expanded={activeNode === 'center'}
                      aria-controls="srt-detail-panel"
                    >
                      <div
                        className="absolute inset-[-4px] rounded-full border border-primary-500/20 backdrop-blur-sm pointer-events-none"
                        style={{
                          background: activeNode === 'center'
                            ? 'radial-gradient(circle, oklch(var(--primary-500) / 0.08) 60%, transparent 100%)'
                            : 'transparent',
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border border-primary-500/40 pointer-events-none animate-srt-pulse-ring"
                        aria-hidden="true"
                      />
                      <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center text-foreground-950 relative z-10">
                        <i className="ri-cpu-line text-lg md:text-xl" />
                      </div>
                      <span className="relative z-10 text-foreground-950 text-2xs font-bold uppercase tracking-wider text-center leading-tight mt-0.5 px-1 opacity-80">
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
                        activeNode={activeNode}
                        hoveredNode={hoveredNode}
                        onClick={handleNodeClick}
                        onHover={setHoveredNode}
                        svgCoords={coords}
                        containerWidth={SVG_WIDTH}
                        containerHeight={SVG_HEIGHT}
                        woodenId={woodenId}
                      />
                    ))}
                  </div>
                </div>

                {/* Detail panel — glass */}
                <div
                  id="srt-detail-panel"
                  className={`relative z-10 transition-all duration-300 overflow-hidden ${
                    activeNodeData ? 'max-h-48 sm:max-h-56 md:max-h-64 opacity-100 mt-2 sm:mt-3' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  {activeNodeData && (
                    <div className="backdrop-blur-xl bg-black/30 border border-primary-500/20 px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-primary-500 text-xs font-black uppercase tracking-wider mb-1">
                            {activeNodeData.detail.title}
                          </p>
                          <p className="text-foreground-400 text-xs leading-relaxed mb-3">
                            {activeNodeData.detail.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {activeNodeData.detail.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-2xs font-bold text-primary-500/80 bg-primary-500/5 backdrop-blur-sm border border-primary-500/15 px-2 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleNodeClick(null)}
                          className="text-foreground-600 hover:text-primary-500 transition-colors cursor-pointer flex-shrink-0 w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                          aria-label="Detail-Panel schließen"
                        >
                          <i className="ri-close-line text-base" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {!activeNode && (
                  <div className="relative z-10 text-center mt-2 sm:mt-3">
                    <p className="text-[10px] sm:text-2xs text-foreground-600 font-medium">
                      Modul anklicken für Details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom wooden wave line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-5 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
        <svg className="absolute w-[200%] h-full animate-wave-2" viewBox="0 0 2000 20" preserveAspectRatio="none">
          <path d="M0,10 Q50,16 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10 T1100,10 T1200,10 T1300,10 T1400,10 T1500,10 T1600,10 T1700,10 T1800,10 T1900,10 T2000,10" fill="none" stroke="oklch(var(--primary-500))" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.12" />
        </svg>
      </div>
    </section>
  );
}

// ── NodeButton (Glass + Wooden border) ─────────────────────────────────────
interface NodeButtonProps {
  node: { id: string; label: string; icon: string };
  activeNode: string | null;
  hoveredNode: string | null;
  onClick: (id: string | null) => void;
  onHover: (id: string | null) => void;
  svgCoords: { cx: number; cy: number; r: number };
  containerWidth: number;
  containerHeight: number;
  woodenId: string;
}

function NodeButton({
  node,
  activeNode,
  hoveredNode,
  onClick,
  onHover,
  svgCoords,
  containerWidth,
  containerHeight,
  woodenId,
}: NodeButtonProps) {
  const isActive = activeNode === node.id;
  const leftPct = (svgCoords.cx / containerWidth) * 100;
  const topPct = (svgCoords.cy / containerHeight) * 100;
  const btnSize = 48;

  return (
    <button
      onClick={() => {
        onClick(node.id);
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className={`absolute z-20 flex flex-col items-center gap-1.5 cursor-pointer group transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'scale-110' : 'hover:scale-105'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
      aria-label={`${node.label} — Modul im SRT System`}
      aria-expanded={isActive}
      aria-controls="srt-detail-panel"
    >
      {/* Glass node square with wooden SVG border */}
      <div
        className="relative flex items-center justify-center transition-all duration-300 backdrop-blur-lg w-12 h-12"
      >
        {/* Wooden SVG border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`node-border-${node.id}-${woodenId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity={isActive ? 0.7 : 0.15} />
              <stop offset="50%" stopColor="oklch(var(--primary-600))" stopOpacity={isActive ? 0.5 : 0.08} />
              <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity={isActive ? 0.7 : 0.15} />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width={btnSize - 2}
            height={btnSize - 2}
            fill="none"
            stroke={`url(#node-border-${node.id}-${woodenId})`}
            strokeWidth={isActive ? 2 : 0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all ease-out"
            style={{ transitionDuration: '0.8s' }}
          />
        </svg>

        {/* Glass background */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isActive
              ? 'bg-primary-500/10'
              : 'bg-white/[0.03] group-hover:bg-white/[0.06]'
          }`}
        />

        {/* Inner glow when active */}
        {isActive && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, oklch(var(--primary-500) / 0.6) 0%, transparent 70%)',
            }}
          />
        )}

        {/* Icon */}
        <div
          className={`relative z-10 w-6 h-6 flex items-center justify-center transition-colors duration-300 ${
            isActive ? 'text-primary-500' : 'text-foreground-500 group-hover:text-primary-500/70'
          }`}
        >
          <i className={`${node.icon} text-lg`} />
        </div>
      </div>

      {/* Label with glass pill */}
      <span
        className={`text-3xs sm:text-2xs font-semibold uppercase tracking-wide transition-colors duration-300 whitespace-nowrap px-1.5 sm:px-2 py-0.5 backdrop-blur-sm border ${
          isActive
            ? 'text-primary-500 bg-primary-500/5 border-primary-500/20'
            : 'text-foreground-600 group-hover:text-foreground-400 bg-transparent border-transparent'
        }`}
      >
        {node.label}
      </span>
    </button>
  );
}