import { useState, useEffect, useRef } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

interface DataStream {
  id: string;
  from: string;
  to: string;
  label: string;
  icon: string;
  color: string;
  dataPoints: string[];
  direction: 'in' | 'out' | 'both';
  description: string;
}

interface NodeData {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  streams: string[];
  details: { title: string; items: string[] }[];
  position: { x: number; y: number };
}

const NODES: NodeData[] = [
  { id: 'srt', label: 'SRT', sublabel: 'Sonic Reporting Tool', icon: 'ri-cpu-line', streams: ['agentur-srt', 'srt-kunde', 'mitarbeiter-srt', 'extern-srt'], details: [{ title: 'Echtzeit-Verarbeitung', items: ['Alle Datenströme laufen hier zusammen', 'KI-gestützte Auswertung', 'Automatische Report-Generierung'] }, { title: 'Single Source of Truth', items: ['Einheitliche Datenbasis', 'Versionierte Datenhistorie', 'Auditfähige Logs'] }], position: { x: 50, y: 50 } },
  { id: 'agentur', label: 'SONIC AGENTUR', sublabel: 'Interne Daten & Planung', icon: 'ri-user-star-line', streams: ['agentur-srt'], details: [{ title: 'Planungsdaten', items: ['Einsatzplanung & Schichtpläne', 'Kampagnenziele & Briefings', 'Budgetrahmen & Ressourcen'] }, { title: 'Kontrolldaten', items: ['Qualitätssicherung', 'Account-Management', 'Projektdokumentation'] }], position: { x: 50, y: 8 } },
  { id: 'mitarbeiter', label: 'MITARBEITER', sublabel: 'Field Force · Mobile App', icon: 'ri-smartphone-line', streams: ['mitarbeiter-srt'], details: [{ title: 'Live-Felddaten', items: ['GPS-Check-in (nur vor Ort)', 'Verkaufszahlen & Abschlüsse', 'Fotos & Produktrückmeldungen'] }, { title: 'Aufgaben & Abrechnung', items: ['Zielerreichungs-Tracking', 'Zeiterfassung & Pausen', 'Provisionen & Boni'] }], position: { x: 50, y: 92 } },
  { id: 'kunde', label: 'KUNDE', sublabel: 'Dashboard & Reports', icon: 'ri-file-list-3-line', streams: ['srt-kunde'], details: [{ title: 'Empfangene Insights', items: ['Live-KPI-Dashboard', 'Custom Reports (Excel/PPT/SQL)', 'Forecasting & Prognosen'] }, { title: 'Transparenz', items: ['Abverkaufsdaten in Echtzeit', 'Standort-Performance-Ranking', 'Benchmarks & Marktvergleich'] }], position: { x: 87, y: 50 } },
  { id: 'extern', label: 'EXTERNE DATEN', sublabel: 'ERP · WaWi · APIs', icon: 'ri-global-line', streams: ['extern-srt'], details: [{ title: 'Datenquellen', items: ['ERP- & WaWi-Systeme', 'Hersteller-Apps & POS', 'Marktforschungsdaten'] }, { title: 'Integrationen', items: ['Planogramm-Daten', 'WKZ-Verwaltung', 'Handelsdaten & Nielsen'] }], position: { x: 13, y: 50 } },
];

const STREAMS: DataStream[] = [
  { id: 'agentur-srt', from: 'agentur', to: 'srt', label: 'Planung → SRT', icon: 'ri-route-line', color: 'oklch(var(--primary-500))', direction: 'both', dataPoints: ['Einsatzplanung', 'Kampagnenziele', 'Briefings', 'Budgets'], description: 'Sonic überträgt Einsatzpläne, Kampagnenziele und Projektdaten ins SRT — und erhält aggregierte Performance-Daten zurück.' },
  { id: 'srt-kunde', from: 'srt', to: 'kunde', label: 'SRT → Kunde', icon: 'ri-dashboard-line', color: 'oklch(var(--primary-500))', direction: 'out', dataPoints: ['Live-KPIs', 'Reports', 'Forecasts', 'Rankings'], description: 'Kunden erhalten maßgeschneiderte Dashboards mit Live-KPIs, automatisch generierten Reports und datenbasierten Prognosen.' },
  { id: 'mitarbeiter-srt', from: 'mitarbeiter', to: 'srt', label: 'Field → SRT', icon: 'ri-map-pin-2-line', color: 'oklch(var(--primary-500))', direction: 'both', dataPoints: ['GPS-Check-in', 'Verkäufe', 'Fotos', 'Abrechnung'], description: 'Außendienstmitarbeiter erfassen Einsätze, Verkaufszahlen und Fotos in Echtzeit über die mobile App — GPS-verifiziert.' },
  { id: 'extern-srt', from: 'extern', to: 'srt', label: 'Extern → SRT', icon: 'ri-database-2-line', color: 'oklch(var(--primary-500))', direction: 'in', dataPoints: ['ERP-Daten', 'Marktdaten', 'POS-Feed', 'WKZ'], description: 'Externe Systeme (ERP, WaWi, Hersteller-Apps) liefern Kontext-Daten, die das SRT mit Felddaten zusammenführt.' },
];

function AnimatedPath({ x1, y1, x2, y2, active, stream }: { x1: number; y1: number; x2: number; y2: number; active: boolean; stream: DataStream }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cpX = midX - dy * 0.15;
  const cpY = midY + dx * 0.15;
  const d = `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;

  return (
    <g>
      <path d={d} stroke="rgba(200,212,0,0.08)" strokeWidth="8" fill="none" />
      <path d={d} stroke={active ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.25)'} strokeWidth={active ? 2.5 : 1.5} fill="none"
        strokeDasharray={active ? 'none' : '4 4'} style={{ transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }} />
      {active && (
        <>
          <circle r="4" fill="oklch(var(--primary-500))"><animateMotion dur="1.8s" repeatCount="indefinite" path={d} /></circle>
          {stream.direction === 'both' && (
            <circle r="3" fill="#fff" opacity="0.7">
              <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.1s" path={`M ${x2} ${y2} Q ${cpX} ${cpY} ${x1} ${y1}`} />
            </circle>
          )}
        </>
      )}
      {active && (
        <g transform={`translate(${cpX - 28} ${cpY - 11})`}>
          <rect width="56" height="16" fill="oklch(var(--primary-500))" rx="2" />
          <text x="28" y="11" textAnchor="middle" fill="#111" fontSize="7" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
            {stream.label.split('→')[0].trim()}
          </text>
        </g>
      )}
      <title>{stream.label}</title>
    </g>
  );
}

export default function DataPaths() {
  const tBadge = useText('srt_datapaths', 'srt-data-badge', 'Datenfluss');
  const tHeading = useText('srt_datapaths', 'srt-data-heading', 'SO FLIESSEN DIE DATEN DURCH DAS SRT.');
  const tP1 = useText('srt_datapaths', 'srt-data-p1', '');

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeStream, setActiveStream] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setAnimPhase(1), 400);
    return () => clearTimeout(t);
  }, [visible]);

  const activeNodeData = NODES.find((n) => n.id === activeNode);
  const activeStreamData = STREAMS.find((s) => s.id === activeStream);

  const px = (pct: number) => (pct / 100) * 500;
  const py = (pct: number) => (pct / 100) * 400;

  const isStreamActive = (streamId: string) => {
    if (activeNode) {
      const node = NODES.find((n) => n.id === activeNode);
      return node?.streams.includes(streamId) ?? false;
    }
    if (activeStream) return activeStream === streamId;
    return animPhase > 0;
  };

  const isNodeHighlighted = (nodeId: string) => {
    if (!activeNode && !activeStream) return true;
    if (activeNode === nodeId) return true;
    if (activeStream) {
      const stream = STREAMS.find((s) => s.id === activeStream);
      return stream?.from === nodeId || stream?.to === nodeId;
    }
    if (activeNode) {
      const node = NODES.find((n) => n.id === activeNode);
      return node?.streams.some((sid) => {
        const s = STREAMS.find((st) => st.id === sid);
        return s?.from === nodeId || s?.to === nodeId;
      }) ?? false;
    }
    return false;
  };

  return (
    <section ref={sectionRef} id="datenfluss" className="sonic-section-lg px-4 md:px-6 bg-foreground-950 relative overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500)) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="sonic-container relative z-10">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-8">
            <SectionBadge text={tBadge} variant="light" />
            <div className="h-px flex-1 bg-gradient-to-r from-primary-500/20 to-transparent" />
            <span className="text-2xs font-black text-background-50/20 uppercase tracking-widest hidden md:block">Interaktiv — Klicken zum Erkunden</span>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <h2 className="sonic-h2 text-background-50" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              {tHeading}
            </h2>
            <div className="lg:pb-2">
              <p className="text-background-50/60 text-base leading-relaxed mb-3">
                {tP1 || 'Das SRT ist das zentrale Nervensystem — es verbindet Sonic, Kunden, Mitarbeiter und externe Systeme in einer einzigen, synchronen Datenbasis.'}
              </p>
              <p className="text-background-50/40 text-xs font-semibold uppercase tracking-widest">Klicke auf einen Knoten oder Verbindung für Details</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {(activeNodeData || activeStreamData) ? (
              <div className="border border-primary-500/30 bg-primary-500/5 p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                <button onClick={() => { setActiveNode(null); setActiveStream(null); }}
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-foreground-500 hover:text-background-50/80 transition-colors cursor-pointer" aria-label="Details schließen">
                  <i className="ri-close-line text-sm" />
                </button>
                {activeNodeData && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary-500/15 border border-primary-500/30 flex items-center justify-center">
                        <i className={`${NODES.find(n => n.id === activeNode)?.icon} text-primary-500 text-lg`} />
                      </div>
                      <div>
                        <p className="text-primary-500 font-black text-xs uppercase tracking-widest">{activeNodeData.label}</p>
                        <p className="text-background-50/40 text-xs">{activeNodeData.sublabel}</p>
                      </div>
                    </div>
                    {activeNodeData.details.map((detail, i) => (
                      <div key={i} className="mb-4">
                        <p className="text-background-50/75 font-bold text-xs uppercase tracking-wider mb-2">{detail.title}</p>
                        <ul className="space-y-1.5">
                          {detail.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-foreground-500 text-xs">
                              <div className="w-1 h-1 bg-primary-500 flex-shrink-0" />{item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {activeStreamData && !activeNodeData && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary-500/15 border border-primary-500/30 flex items-center justify-center">
                        <i className={`${activeStreamData.icon} text-primary-500 text-lg`} />
                      </div>
                      <div>
                        <p className="text-primary-500 font-black text-xs uppercase tracking-widest">{activeStreamData.label}</p>
                        <p className="text-background-50/40 text-xs capitalize">{activeStreamData.direction === 'both' ? 'Bidirektional' : activeStreamData.direction === 'in' ? 'Eingehend' : 'Ausgehend'}</p>
                      </div>
                    </div>
                    <p className="text-background-50/75 text-xs leading-relaxed mb-4">{activeStreamData.description}</p>
                    <div className="border-t border-background-50/10 pt-3">
                      <p className="text-background-50/50 text-2xs font-black uppercase tracking-widest mb-2">Datentypen</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeStreamData.dataPoints.map((dp) => (
                          <span key={dp} className="text-2xs font-bold text-primary-500 bg-primary-500/10 border border-primary-500/20 px-2 py-0.5">{dp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-background-50/10 bg-background-50/5 p-6">
                <p className="text-background-50/60 text-xs font-bold uppercase tracking-widest mb-4">Datenpfade im Überblick</p>
                <div className="space-y-3">
                  {STREAMS.map((stream) => (
                    <button key={stream.id} onClick={() => setActiveStream(stream.id)}
                      className="w-full flex items-center gap-3 p-3 border border-background-50/10 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-200 cursor-pointer text-left group">
                      <div className="w-7 h-7 bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                        <i className={`${stream.icon} text-primary-500 text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-background-50/70 font-bold text-xs group-hover:text-background-50 transition-colors">{stream.label}</p>
                        <p className="text-background-50/30 text-2xs truncate group-hover:text-background-50/50 transition-colors">{stream.dataPoints.join(' · ')}</p>
                      </div>
                      <i className="ri-arrow-right-s-line text-foreground-600 group-hover:text-primary-500 transition-colors text-base flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-background-50/10 bg-background-50/5 p-4">
              <p className="text-background-50/40 text-2xs font-black uppercase tracking-widest mb-3">Legende</p>
              <div className="space-y-2">
                {[
                  { line: 'solid', label: 'Aktiver Datenstrom', color: 'oklch(var(--primary-500))' },
                  { line: 'dashed', label: 'Inaktive Verbindung', color: 'rgba(200,212,0,0.25)' },
                  { dot: true, label: 'Fließende Daten (animiert)', color: 'oklch(var(--primary-500))' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.dot ? (
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    ) : (
                      <div className="w-8 flex-shrink-0" style={{ height: 2, background: item.color, borderTop: item.line === 'dashed' ? `2px dashed ${item.color}` : `2px solid ${item.color}`, borderBottom: 'none' }} />
                    )}
                    <span className="text-background-50/60 text-2xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative border border-background-50/10 bg-foreground-950 overflow-hidden" style={{ aspectRatio: '5/4', minHeight: 320, maxHeight: 520 }}>
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-label="SRT Datenfluß-Diagramm">
                <AnimatedPath x1={px(50)} y1={py(15)} x2={px(50)} y2={py(42)} active={isStreamActive('agentur-srt')} stream={STREAMS[0]} />
                <AnimatedPath x1={px(58)} y1={py(50)} x2={px(83)} y2={py(50)} active={isStreamActive('srt-kunde')} stream={STREAMS[1]} />
                <AnimatedPath x1={px(50)} y1={py(85)} x2={px(50)} y2={py(58)} active={isStreamActive('mitarbeiter-srt')} stream={STREAMS[2]} />
                <AnimatedPath x1={px(17)} y1={py(50)} x2={px(42)} y2={py(50)} active={isStreamActive('extern-srt')} stream={STREAMS[3]} />
              </svg>

              {NODES.map((node) => {
                const highlighted = isNodeHighlighted(node.id);
                const isCenter = node.id === 'srt';
                const isActive = activeNode === node.id;
                return (
                  <button key={node.id} onClick={() => setActiveNode(isActive ? null : node.id)}
                    className={`absolute z-20 flex flex-col items-center gap-1 cursor-pointer group transition-all duration-300 ${isActive ? 'scale-110' : highlighted ? 'scale-100' : 'scale-90 opacity-40'}`}
                    style={{ left: `${node.position.x}%`, top: `${node.position.y}%`, transform: `translate(-50%, -50%) ${isActive ? 'scale(1.12)' : highlighted ? 'scale(1)' : 'scale(0.9)'}` }}
                    aria-label={`${node.label} — ${node.sublabel}`}>
                    {isCenter ? (
                      <div className={`flex flex-col items-center justify-center transition-all duration-300 w-14 h-14 sm:w-[88px] sm:h-[88px] ${isActive ? 'ring-4 ring-primary-500/50' : 'group-hover:ring-2 group-hover:ring-primary-500/30'}`}
                        style={{
                          background: 'oklch(var(--primary-500))',
                          boxShadow: isActive ? '0 0 40px rgba(200,212,0,0.6), 0 0 80px rgba(200,212,0,0.2)' : '0 0 20px rgba(200,212,0,0.3)',
                        }}>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-foreground-950"><i className={`${node.icon} text-lg sm:text-2xl`} /></div>
                        <span className="text-foreground-950 text-2xs font-black uppercase tracking-wider text-center leading-tight mt-1 px-1">{node.label}<br />{node.sublabel.split(' ')[0]}</span>
                        {isActive && <span className="absolute inset-0 animate-ping bg-primary-500/20 pointer-events-none" />}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center transition-all duration-300 w-12 h-12 sm:w-16 sm:h-16"
                        style={{
                          background: isActive ? 'rgba(200,212,0,0.15)' : 'rgba(26,26,26,0.95)',
                          border: `2px solid ${isActive ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.3)'}`,
                          boxShadow: isActive ? '0 0 24px rgba(200,212,0,0.4)' : '0 4px 16px rgba(0,0,0,0.6)',
                        }}>
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-colors duration-300 ${isActive ? 'text-primary-500' : 'text-primary-500/60'}`}>
                          <i className={`${node.icon} text-base sm:text-xl`} />
                        </div>
                      </div>
                    )}
                    {!isCenter && (
                      <span className={`text-3xs font-black uppercase tracking-wider text-center leading-tight transition-colors duration-300 mt-0.5 max-w-[64px] sm:max-w-[80px] ${isActive ? 'text-primary-500' : highlighted ? 'text-foreground-500' : 'text-foreground-600'}`}>
                        {node.label}
                      </span>
                    )}
                  </button>
                );
              })}
              <button onClick={() => setActiveStream(activeStream === 'agentur-srt' ? null : 'agentur-srt')} className="absolute z-10 cursor-pointer" style={{ top: '20%', left: '44%', width: '12%', height: '18%', background: 'transparent' }} aria-label="Agentur → SRT Verbindung" />
              <button onClick={() => setActiveStream(activeStream === 'srt-kunde' ? null : 'srt-kunde')} className="absolute z-10 cursor-pointer" style={{ top: '44%', left: '60%', width: '18%', height: '12%', background: 'transparent' }} aria-label="SRT → Kunde Verbindung" />
              <button onClick={() => setActiveStream(activeStream === 'mitarbeiter-srt' ? null : 'mitarbeiter-srt')} className="absolute z-10 cursor-pointer" style={{ top: '62%', left: '44%', width: '12%', height: '18%', background: 'transparent' }} aria-label="Mitarbeiter → SRT Verbindung" />
              <button onClick={() => setActiveStream(activeStream === 'extern-srt' ? null : 'extern-srt')} className="absolute z-10 cursor-pointer" style={{ top: '44%', left: '20%', width: '18%', height: '12%', background: 'transparent' }} aria-label="Extern → SRT Verbindung" />
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {STREAMS.map((stream) => (
                <button key={stream.id} onClick={() => setActiveStream(activeStream === stream.id ? null : stream.id)}
                  className={`flex items-center gap-2 px-3 py-2 border text-left transition-all duration-200 cursor-pointer group ${activeStream === stream.id ? 'border-primary-500 bg-primary-500/10' : 'border-background-50/10 bg-background-50/5 hover:border-primary-500/30 hover:bg-primary-500/5'}`}>
                  <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${activeStream === stream.id ? 'text-primary-500' : 'text-foreground-600 group-hover:text-primary-500'} transition-colors`}>
                    <i className={`${stream.icon} text-sm`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-3xs font-black uppercase tracking-wider leading-tight transition-colors ${activeStream === stream.id ? 'text-primary-500' : 'text-foreground-600 group-hover:text-background-50/70'}`}>
                      {stream.label.split('→').map((s, i) => i === 0 ? s.trim() : <span key={i} className="text-primary-500/60"> →{s}</span>)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-background-50/8 pt-10 grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: 'ri-refresh-line', val: '<50 ms', label: 'Latenz', detail: 'Echtzeit ohne Batch-Verzögerung' },
            { icon: 'ri-shield-keyhole-line', val: 'AES-256', label: 'Verschlüsselung', detail: 'End-to-End, TLS 1.3, DSGVO-konform' },
            { icon: 'ri-plug-line', val: '23+', label: 'API-Integrationen', detail: 'SAP, Salesforce, Nielsen, POS-Feeds' },
            { icon: 'ri-server-line', val: '99,97%', label: 'Uptime SLA', detail: 'Redundant, Frankfurt RZ, ISO 27001' },
          ].map((stat, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="w-9 h-9 bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                <i className={`${stat.icon} text-primary-500 text-base`} />
              </div>
              <div>
                <p className="text-primary-500 font-black text-base leading-tight">{stat.val}</p>
                <p className="text-background-50/60 text-xs font-bold">{stat.label}</p>
                <p className="text-background-50/40 text-2xs mt-0.5">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}