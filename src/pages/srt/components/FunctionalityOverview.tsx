import { useState, useEffect, useRef } from 'react';
import { useMotionPaused } from '@/lib/motion';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { WindowBar, SrtHeader, PAPER, HAIR, MUTED, MONO, LIME } from './SrtKit';

const MODULES = [
  { id: 'planung',   number: '01', icon: 'ri-calendar-2-line',         title: 'Einsatzplanung',       subtitle: 'Drag-and-Drop Kalender',              detail: 'Plane Einsätze mit einem visuellen Drag-and-Drop-Kalender. Weise Aufgaben direkt Mitarbeitern zu, setze Prioritäten und verfolge den Status in Echtzeit.', img: 'https://readdy.ai/api/search-image?query=modern+enterprise+SaaS+dark+UI+scheduling+calendar+drag+drop+lime+green+retail+field+force&width=1200&height=680&seq=srt-func-01-plan&orientation=landscape' },
  { id: 'talentpool',number: '02', icon: 'ri-team-line',               title: 'Talentpool',           subtitle: 'Von Recruiting bis Abrechnung',        detail: 'Von Bewerbung bis Abrechnung: Onboarding, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten liegen zentral im SRT. Kein Tool-Wechsel.', img: 'https://readdy.ai/api/search-image?query=HR+talent+management+dashboard+dark+UI+lime+green+employee+profiles+grid+SaaS&width=1200&height=680&seq=srt-func-02-talent&orientation=landscape' },
  { id: 'gps',       number: '03', icon: 'ri-map-pin-2-line',          title: 'GPS Check-in',         subtitle: 'Nur vor Ort — keine Umgehung möglich', detail: 'Das System prüft per GPS, ob der Mitarbeiter wirklich am Einsatzort ist. Erst dann wird die Zeiterfassung freigegeben. Transparenz für alle Seiten.', img: 'https://readdy.ai/api/search-image?query=GPS+tracking+map+dark+UI+retail+store+locations+field+force+lime+green+SaaS&width=1200&height=680&seq=srt-func-03-gps&orientation=landscape' },
  { id: 'extdaten',  number: '04', icon: 'ri-plug-line',               title: 'Datenintegration',     subtitle: 'Online-Shops, Hersteller-Apps & Handelsdaten', detail: 'Daten aus Online-Shops, Hersteller-Apps und dem Handel laufen im SRT in einer Oberfläche zusammen — inklusive WKZ-Handling.', img: 'https://readdy.ai/api/search-image?query=data+integration+API+ERP+dark+UI+lime+green+enterprise+SaaS+connected+systems&width=1200&height=680&seq=srt-func-04-ext&orientation=landscape' },
  { id: 'docintel',  number: '05', icon: 'ri-file-text-line',          title: 'Dokumenten-KI',     subtitle: 'KI-gestützte Dokumentenverarbeitung',  detail: 'Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet. Spart Stunden manueller Arbeit.', img: 'https://readdy.ai/api/search-image?query=AI+document+processing+dark+UI+lime+green+enterprise+SaaS+invoice+automation&width=1200&height=680&seq=srt-func-05-doc&orientation=landscape' },
  { id: 'route',     number: '06', icon: 'ri-route-line',              title: 'Routenplanung',        subtitle: 'In Entwicklung · ab 2026/27',          detail: 'Geplant für 2026/27: Das SRT soll Routen für den Außendienst planen — auf Basis von Einsatzorten und Zeitfenstern.', img: 'https://readdy.ai/api/search-image?query=route+optimization+map+dark+UI+field+sales+lime+green+SaaS+enterprise&width=1200&height=680&seq=srt-func-06-route&orientation=landscape' },
];

const INTERVAL = 4500;

export default function FunctionalityOverview() {
  const { images: moduleImages } = useMediaStore('srt_functionality_images');
  const getImg = (idx: number) => moduleImages[idx]?.url ? resolveImageUrl(moduleImages[idx].url) : MODULES[idx].img;

  const tBadge   = useText('srt_functionality', 'srt-func-badge',    'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading',  'Die Module hinter dem Dashboard.');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');
  // Dashboard → Text → SRT → „SRT — Funktionsumfang: 6 Module“
  const mt = useReviewText('srt_modules');
  const modules = MODULES.map((m, i) => ({
    ...m,
    title: mt[`m${i + 1}-title`] ?? m.title,
    subtitle: mt[`m${i + 1}-subtitle`] ?? m.subtitle,
    detail: mt[`m${i + 1}-detail`] ?? m.detail,
  }));

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive(p => (p + 1) % MODULES.length), INTERVAL);
  };

  const motionPaused = useMotionPaused();
  useEffect(() => {
    if (!paused && !motionPaused) startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, motionPaused]);

  const select = (i: number) => {
    if (timer.current) clearInterval(timer.current);
    setActive(i);
    setPaused(true);
    setTimeout(() => { setPaused(false); }, 8000);
  };

  const mod = modules[active];

  return (
    <section id="funktionsumfang" className="bg-white relative py-16 md:py-24 px-4 md:px-6">
      <div className="sonic-container">
        <SrtHeader
          eyebrow={<>{tBadge} <span style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.35)' }}>— 6 Module</span></>}
          title={tHeading}
          side={
            <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-foreground-950 hover:bg-foreground-950 hover:text-white transition-colors whitespace-nowrap"
              style={{ border: '1px solid rgba(0,0,0,0.2)' }}>
              {tDemoCta} <i className="ri-arrow-right-line" aria-hidden="true" />
            </a>
          }
        />

        {/* Feature picker (light redesign 22.10.2026): module list left, live preview right */}
        <div className="grid lg:grid-cols-[minmax(260px,320px)_1fr] gap-6 lg:gap-10 items-start">
          {/* Module list — vertical on desktop, swipeable chips on phones/tablets */}
          <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0" style={{ scrollbarWidth: 'none' }} role="tablist" aria-label="Module">
            {modules.map((m, i) => {
              const on = active === i;
              return (
                <button key={m.id} type="button" role="tab" aria-selected={on} onClick={() => select(i)}
                  className="relative flex-shrink-0 lg:w-full text-left px-4 py-3 lg:px-5 lg:py-4 cursor-pointer transition-colors duration-200"
                  style={{ background: on ? PAPER : 'transparent', border: `1px solid ${on ? HAIR : 'transparent'}`, borderLeft: `2px solid ${on ? LIME : 'transparent'}` }}>
                  <span className="flex items-center gap-3">
                    <i className={`${m.icon} text-[17px] ${on ? 'text-foreground-950' : 'text-foreground-950/40'}`} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className={`block text-[14px] font-black whitespace-nowrap ${on ? 'text-foreground-950' : 'text-foreground-950/55'}`}>{m.title}</span>
                      <span className="hidden lg:block text-[12px] leading-snug mt-0.5" style={{ color: on ? MUTED : 'rgba(0,0,0,0.38)' }}>{m.subtitle}</span>
                    </span>
                    <span className="hidden lg:block ml-auto text-[10px]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.3)' }}>{m.number}</span>
                  </span>
                  {on && !paused && (
                    <span key={active} className="absolute left-0 bottom-0 h-[2px] hidden lg:block" style={{ background: LIME, animation: `srtProg ${INTERVAL}ms linear forwards` }} aria-hidden="true" />
                  )}
                </button>
              );
            })}
            <style>{`@keyframes srtProg { from { width: 0% } to { width: 100% } } @keyframes srtFuncFade { from { opacity: 0; transform: scale(1.01) } to { opacity: 1; transform: scale(1) } }`}</style>
          </div>

          {/* Preview window */}
          <div>
            <div className="overflow-hidden bg-white" style={{ border: `1px solid ${HAIR}`, boxShadow: '0 40px 80px -40px rgba(0,0,0,0.35)' }}>
              <WindowBar title={<>SRT · Module · {mod.title}</>} light />
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#f2f2ee' }}>
                <img key={active} src={getImg(active)} alt={mod.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ animation: 'srtFuncFade 0.4s ease forwards' }} loading="lazy" />
              </div>
            </div>
            <div key={`t-${active}`} className="mt-6 animate-fadeIn">
              <p className="text-[11px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: MONO, color: 'oklch(0.55 0.08 115)' }}>Modul {mod.number} / 06 — {mod.subtitle}</p>
              <h3 className="text-[22px] md:text-[26px] font-black text-foreground-950 mb-2" style={{ letterSpacing: '-0.02em' }}>{mod.title}</h3>
              <p className="text-[15px] leading-relaxed max-w-[680px]" style={{ color: MUTED }}>{mod.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
