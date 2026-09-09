import { useState, useEffect, useRef, useCallback } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker } from './ChapterKit';

/* ── Site design tokens ───────────────────────────────────────────────────── */
const DARK    = 'oklch(0.13 0.005 118)';          // foreground-950
const DARK2   = 'oklch(0.16 0.005 118)';          // slightly lighter dark
const LIME    = 'oklch(0.81 0.19 115)';           // primary-500
const BORDER  = 'rgba(255,255,255,0.08)';
const BORDER2 = 'rgba(255,255,255,0.12)';

/* ── Types ────────────────────────────────────────────────────────────────── */
type Face = { id:string; name:string; role:string; pullQuote:string; bio:string; closingQuote?:string; image:string; };

/* ── Data ─────────────────────────────────────────────────────────────────── */
const getFaces = (db:{url:string}[]): Face[] => [
  { id:'sascha',   name:'Sascha M.',   role:'Senior IT Admin',
    pullQuote: '„Gute IT ist unsichtbar — und genau das ist das Ziel.',
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
    image: db[0]?.url || 'https://readdy.ai/api/search-image?query=professional+man+IT+administrator+confident+portrait+dark+editorial+modern+office&width=440&height=560&seq=sf-sascha-01&orientation=portrait' },
  { id:'marcel',   name:'Marcel W.',   role:'Finance Controller',
    pullQuote: '„Zahlen erzählen Geschichten — man muss nur wissen, wie man sie liest.',
    bio: 'Marcel bringt finanzielle Klarheit in ein schnellwachsendes Unternehmen. Als Finance Controller stellt er sicher, dass Entscheidungen auf verlässlichen Grundlagen getroffen werden.',
    image: db[1]?.url || 'https://readdy.ai/api/search-image?query=professional+man+finance+controller+confident+editorial+dark+portrait+office+modern&width=440&height=560&seq=sf-marcel-02&orientation=portrait' },
  { id:'andrew',   name:'Andrew W.',   role:'Event & Logistics Manager',
    pullQuote: '„Im Event-Geschäft gibt es kein \'Morgen\' — alles muss heute klappen.',
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
    image: db[2]?.url || 'https://readdy.ai/api/search-image?query=professional+man+event+logistics+manager+confident+editorial+dark+portrait+modern&width=440&height=560&seq=sf-andrew-03&orientation=portrait' },
  { id:'michelle', name:'Michelle G.', role:'Senior Project Manager',
    pullQuote: '„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung.',
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
    image: db[3]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+senior+project+manager+confident+editorial+dark+portrait+modern&width=440&height=560&seq=sf-michelle-04&orientation=portrait' },
  { id:'janina',   name:'Janina B.',   role:'HR Manager',
    pullQuote: '„Eigentlich sollte es nur ein Nebenjob während des Studiums sein. Am Ende wurde daraus mein Karriereweg."',
    bio: `Als Janina zur Sonic kam, war sie noch Studentin. Den ersten Kontakt zur Agentur hatte sie allerdings schon deutlich früher. Ihr Bruder war bereits seit 2007 für Sonic im Promotionbereich tätig und entwickelte sich später zum Trainer. Über ihn erhielt auch sie die Möglichkeit, während ihres BWL-Studiums erste Erfahrungen bei Sonic zu sammeln.

Während des Studiums war sie regelmäßig auf verschiedenen Projekten im Einsatz: Promotionjobs auf der IFA in Berlin für Sony, verschiedene Sony-Roadshows sowie Einsätze für Nespresso.

Ein zufälliges Kennenlernen während einer Roadshow führte zur Bewerbung im HR-Team. Ihr erstes Gespräch mit dem Geschäftsführer fand in einer Berliner Kneipe statt — in lockerer Runde, mit dem Gefühl, nicht ein Unternehmen, sondern Menschen kennenzulernen.

2020 startete sie mit einem Praktikum. Als eine Kollegin längere Zeit ausfiel, übernahm sie früh Verantwortung — ins kalte Wasser geworfen, aber nie allein gelassen. Heute verantwortet sie das operative Personalmanagement bei Sonic.`,
    closingQuote: '„Karrierewege lassen sich nicht immer planen. Manchmal entstehen sie genau dort, wo Menschen Potenziale erkennen, Vertrauen schenken und Entwicklung ermöglichen."',
    image: db[4]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+manager+warm+authentic+smile+editorial+dark+portrait+modern+office&width=440&height=560&seq=sf-janina-05&orientation=portrait' },
  { id:'inga',     name:'Inga L.',     role:'Jr. Art Direktorin',
    pullQuote: '„Eigentlich sollte es nur ein Praktikum werden. Am Ende wurde daraus mein Karriereweg."',
    bio: `Als Inga bei Sonic startete, stand zunächst das Studium im Vordergrund. Für ihr Marketing-Management-Studium war ein Pflichtpraktikum erforderlich. Was als Studienanforderung begann, entwickelte sich schnell zu mehr.

Die Arbeit, das Team und die vielseitigen Projekte überzeugten sie so sehr, dass sie auch nach dem Praktikum bei Sonic blieb. Nach ihrem Abschluss: der Einstieg in eine Vollzeitposition.

Dabei kennt Inga nicht nur die Agenturseite. Für den Kunden AVOURY war sie selbst als Promoterin im Einsatz und reiste dafür bis nach Wien. Diese Perspektive hilft ihr heute, Kampagnen nicht nur kreativ zu denken, sondern auch aus Sicht derer zu betrachten, die sie umsetzen.

Heute ist Inga Teil des Creation Teams: Design, Social Media, kreative Konzepte und Events — von der ersten Idee bis zur Umsetzung.`,
    closingQuote: '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte."',
    image: db[5]?.url || 'https://readdy.ai/api/search-image?query=professional+young+woman+creative+art+director+social+media+confident+editorial+dark+portrait+modern+studio&width=440&height=560&seq=sf-inga-06&orientation=portrait' },
];

/* ── Book component ────────────────────────────────────────────────────────── */
function SonicBook({ faces }: { faces: Face[] }) {
  const [open,   setOpen]   = useState(false);
  const [landed, setLanded] = useState(false);
  const [idx,    setIdx]    = useState(0);
  const [phase,  setPhase]  = useState<'idle'|'prep'|'run'>('idle');
  const [dir,    setDir]    = useState<1|-1>(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear  = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const later  = (fn:()=>void, ms:number) => { const t=setTimeout(fn,ms); timers.current.push(t); };
  useEffect(() => () => clear(), []);

  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  const openBook = useCallback(() => {
    if (open) return;
    setOpen(true);
    if (reduced) { setLanded(true); return; }
    later(() => setLanded(true), 960);
  }, [open, reduced]);

  const goTo = useCallback((next:number) => {
    if (next === idx || phase !== 'idle') return;
    if (!open) { openBook(); later(() => goTo(next), 1100); return; }
    const d: 1|-1 = next > idx ? 1 : -1;
    setDir(d);
    if (reduced) { setIdx(next); return; }
    setPhase('prep');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setPhase('run');
      later(() => setIdx(next), 360);
      later(() => setPhase('idle'), 760);
    }));
  }, [idx, phase, open, openBook, reduced]);

  const face  = faces[idx];
  const paras = face.bio.split('\n\n').filter(Boolean);

  return (
    <div>
      {/* ── DESKTOP BOOK (lg+) ──────────────────────────────────────────── */}
      <div className="hidden lg:block">

        {/* Stage with perspective */}
        <div style={{ perspective:'2400px', perspectiveOrigin:'50% 38%' }}>
          <div className="relative mx-auto" style={{ maxWidth:1080, minHeight:520 }}>

            {/* ── CLOSED COVER (right half only) ───────────────────────── */}
            {!landed && (
              <div
                role="button" tabIndex={0} aria-label="Buch öffnen"
                onClick={openBook}
                onKeyDown={e => { if (e.key==='Enter'||e.key===' ') openBook(); }}
                className="absolute inset-y-0 cursor-pointer select-none overflow-hidden"
                style={{
                  left:'50%', width:'50%',
                  transformOrigin:'left center', transformStyle:'preserve-3d',
                  transform: open && !landed ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transition: open && !landed ? 'transform 960ms cubic-bezier(.55,.05,.25,1)' : 'none',
                  zIndex:20, background:DARK,
                  boxShadow:`0 32px 64px -20px rgba(0,0,0,.7), inset 0 0 0 1px ${LIME}22`,
                }}
              >
                {/* Front face */}
                <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ backfaceVisibility:'hidden' }}>
                  {/* Lime spine on LEFT edge of the cover */}
                  <div className="absolute top-0 left-0 bottom-0 w-[12px]" style={{
                    background:`linear-gradient(90deg,${LIME},oklch(0.60 0.15 115) 60%,transparent)`,
                  }} />
                  {/* Faint embossed inner frame */}
                  <div className="absolute" style={{ inset:'16px 14px', border:`1px solid ${LIME}30` }} />

                  {/* Cover content */}
                  <div className="flex-1 flex flex-col justify-between pl-8 pr-7 py-10">
                    <div>
                      <div className="h-[2px] w-8 mb-5" style={{ background:LIME }} />
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-6" style={{ color:LIME }}>KAPITEL 04</p>
                      <p className="font-black leading-[1.02] text-white mb-2" style={{ fontSize:'clamp(26px,3vw,42px)', letterSpacing:'-0.03em' }}>
                        Sonic<br />Spirit
                      </p>
                      <span className="inline-block font-black px-2 py-0.5 leading-[1.02]" style={{ fontSize:'clamp(26px,3vw,42px)', letterSpacing:'-0.03em', background:LIME, color:DARK }}>
                        & Faces
                      </span>
                      <p className="mt-6 text-[13px] leading-[1.7] max-w-[26ch]" style={{ color:'rgba(255,255,255,0.4)' }}>
                        Sechs Kapitel. Sechs Menschen, die Sonic jeden Tag prägen.
                      </p>
                    </div>
                    {/* CTA */}
                    <div className="flex items-center gap-3" style={{ animation:'bookCta 2.2s ease-in-out infinite' }}>
                      <style>{`@keyframes bookCta { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`}</style>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white">BUCH ÖFFNEN</p>
                      <span className="font-black" style={{ color:LIME }}>→</span>
                    </div>
                  </div>
                </div>

                {/* Back face — dark (not paper!) */}
                <div className="absolute inset-0" style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)', background:DARK2, boxShadow:`inset 0 0 40px rgba(0,0,0,.4)` }} />
              </div>
            )}

            {/* ── PAGE-TURN SHEET ────────────────────────────────────────── */}
            {phase !== 'idle' && (
              <div className="absolute top-0 bottom-0 pointer-events-none z-30" style={{
                width:'50%',
                left: dir===1 ? '50%' : 0,
                transformOrigin: dir===1 ? 'left center' : 'right center',
                transform: phase==='run' ? `rotateY(${dir===1 ? -179 : 179}deg)` : 'rotateY(0deg)',
                transition: phase==='run' ? 'transform 720ms cubic-bezier(.42,0,.3,1)' : 'none',
                background: `linear-gradient(${dir===1?'90deg':'270deg'},${DARK} 0%,${DARK2} 30%,${DARK} 100%)`,
                borderLeft:  dir===1  ? `1px solid ${LIME}30` : undefined,
                borderRight: dir===-1 ? `1px solid ${LIME}30` : undefined,
              }} />
            )}

            {/* ── OPEN SPREAD ────────────────────────────────────────────── */}
            <div className="grid" style={{
              gridTemplateColumns:'1fr 1fr',
              opacity: landed ? 1 : 0,
              transition: landed ? 'opacity 420ms ease 60ms' : 'none',
              boxShadow:'0 40px 80px -28px rgba(0,0,0,.7)',
            }}>
              {/* ── LEFT PAGE — portrait + opening quote ─────────────────── */}
              <div className="relative overflow-hidden flex flex-col" style={{ background:DARK, minHeight:520 }}>
                {/* Portrait fills top portion */}
                <div className="relative flex-1" style={{ minHeight:320 }}>
                  <img
                    key={`${idx}-img`}
                    src={face.image} alt={face.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                    loading="lazy"
                  />
                  {/* Gradient to protect quote readability below */}
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,transparent 40%,rgba(11,11,12,0.95) 85%,rgba(11,11,12,1) 100%)' }} />
                  {/* Chapter number — top left */}
                  <div className="absolute top-5 left-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color:`${LIME}80` }}>
                      KAPITEL {String(idx+1).padStart(2,'0')} / {String(faces.length).padStart(2,'0')}
                    </p>
                  </div>
                </div>

                {/* Quote strip — at the bottom of the left page (the "opening quote") */}
                <div className="px-7 pb-7 pt-4" style={{ background:DARK }}>
                  {/* Lime rule above quote */}
                  <div className="h-[1px] w-8 mb-4" style={{ background:LIME }} />
                  <blockquote
                    className="font-black leading-snug text-white"
                    style={{ fontSize:'clamp(15px,1.6vw,20px)', letterSpacing:'-0.02em' }}
                  >
                    {face.pullQuote}
                  </blockquote>
                </div>

                {/* Name plate — very bottom */}
                <div className="flex items-center justify-between px-7 py-4" style={{ borderTop:`1px solid ${BORDER}`, background:'rgba(0,0,0,0.35)' }}>
                  <div>
                    <p className="font-black text-white leading-none" style={{ fontSize:'clamp(14px,1.4vw,18px)', letterSpacing:'-0.02em' }}>{face.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1.5" style={{ color:LIME }}>{face.role}</p>
                  </div>
                  <div className="h-[1px] w-10" style={{ background:`${LIME}60` }} />
                </div>
              </div>

              {/* ── RIGHT PAGE — story ──────────────────────────────────── */}
              <div className="relative" style={{ background:DARK2, borderLeft:`1px solid ${BORDER}` }}>
                {/* Ribbon bookmark — centred on the spine between both pages */}
                <div className="absolute pointer-events-none" style={{
                  left:'-8px', top:'-16px', width:16, height:'38%',
                  background:`linear-gradient(180deg,${LIME},oklch(0.68 0.16 115) 40%,oklch(0.55 0.12 115))`,
                  clipPath:'polygon(0 0,100% 0,100% 100%,50% 88%,0 100%)',
                  boxShadow:`0 2px 8px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.1)`,
                  zIndex:10,
                }} />

                {/* Lime seam — the spine line (center of book) */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px]" style={{ background:`linear-gradient(180deg,transparent,${LIME}60 20%,${LIME}80 50%,${LIME}60 80%,transparent)` }} />

                {/* Scrollable story content */}
                <div className="overflow-y-auto h-full" style={{ maxHeight:520, padding:'clamp(28px,3vw,48px) clamp(24px,2.8vw,44px) clamp(28px,3vw,48px) clamp(32px,3.4vw,52px)' }}>
                  {/* Chapter eyebrow */}
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.28em] whitespace-nowrap" style={{ color:`${LIME}90` }}>
                      KAPITEL {String(idx+1).padStart(2,'0')} VON {String(faces.length).padStart(2,'0')}
                    </p>
                    <div className="flex-1 h-px" style={{ background:BORDER }} />
                  </div>

                  {/* Bio paragraphs */}
                  <div className="space-y-4">
                    {paras.map((p,i) => (
                      <p key={i} style={{ fontSize:'clamp(13px,1.05vw,15px)', lineHeight:1.76, color:'rgba(255,255,255,0.55)' }}>{p}</p>
                    ))}
                  </div>

                  {/* Closing quote */}
                  {face.closingQuote && (
                    <div className="mt-8 pt-6" style={{ borderTop:`1px solid ${BORDER}` }}>
                      <p className="text-[26px] font-black leading-none mb-3" style={{ color:LIME }}>„</p>
                      <p className="leading-[1.65] italic" style={{ fontSize:'clamp(13px,1.05vw,15px)', color:'rgba(255,255,255,0.5)' }}>
                        {face.closingQuote.replace(/^„|["""]$/g,'')}
                      </p>
                      <div className="flex items-center gap-3 mt-5">
                        <div className="h-px flex-1" style={{ background:`${LIME}50` }} />
                        <p className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color:`${LIME}70` }}>
                          {face.name} · {face.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Chapter tabs ──────────────────────────────────────────────── */}
        <div className="mx-auto mt-[1px]" style={{ maxWidth:1080, display:'grid', gridTemplateColumns:`repeat(${faces.length},1fr)`, gap:1, background:BORDER }}>
          {faces.map((f,i) => {
            const active = i === idx;
            return (
              <button key={f.id} type="button" onClick={() => goTo(i)}
                className="text-left flex flex-col gap-1.5 cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                style={{ padding:'14px 16px', background: active ? DARK : 'rgba(11,11,12,0.04)', borderTop:`2px solid ${active ? LIME : 'transparent'}` }}>
                <span className="font-black text-[12px] leading-tight" style={{ color: active ? '#fff' : 'oklch(0.4 0.005 118)' }}>{f.name}</span>
                <span className="font-bold text-[9px] uppercase tracking-[0.18em]" style={{ color: active ? LIME : 'oklch(0.55 0.005 118)' }}>{f.role}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE FALLBACK ─────────────────────────────────────────────── */}
      <div className="block lg:hidden" style={{ border:`1px solid ${BORDER}` }}>
        {/* Portrait */}
        <div className="relative overflow-hidden" style={{ minHeight:280, background:DARK }}>
          <img src={face.image} alt={face.name} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom,transparent 40%,rgba(11,11,12,0.98) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-4">
            <div className="h-px w-6 mb-3" style={{ background:LIME }} />
            <blockquote className="font-black text-white leading-snug mb-4" style={{ fontSize:'clamp(14px,4vw,18px)' }}>{face.pullQuote}</blockquote>
            <p className="font-black text-white text-sm leading-none">{face.name}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-1" style={{ color:LIME }}>{face.role}</p>
          </div>
        </div>
        {/* Story */}
        <div className="px-6 py-7" style={{ background:DARK2 }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[9px] font-black uppercase tracking-[0.28em]" style={{ color:`${LIME}80` }}>KAPITEL {String(idx+1).padStart(2,'0')} / {String(faces.length).padStart(2,'0')}</span>
            <div className="flex-1 h-px" style={{ background:BORDER }} />
          </div>
          <div className="space-y-4 mb-6">
            {paras.map((p,i) => <p key={i} className="text-[13px] leading-[1.74]" style={{ color:'rgba(255,255,255,0.55)' }}>{p}</p>)}
          </div>
          {face.closingQuote && (
            <div className="pt-5" style={{ borderTop:`1px solid ${BORDER}` }}>
              <p className="text-[22px] font-black leading-none mb-2" style={{ color:LIME }}>„</p>
              <p className="italic text-[13px] leading-relaxed" style={{ color:'rgba(255,255,255,0.5)' }}>{face.closingQuote.replace(/^„|["""]$/g,'')}</p>
            </div>
          )}
        </div>
        {/* 3-col tabs */}
        <div className="grid grid-cols-3" style={{ gap:1, background:BORDER }}>
          {faces.map((f,i) => {
            const active = i===idx;
            return (
              <button key={f.id} type="button" onClick={() => { setIdx(i); }}
                className="px-3 py-3 text-left flex flex-col gap-1 cursor-pointer"
                style={{ background: active ? DARK : 'rgba(11,11,12,0.03)', borderTop:`2px solid ${active ? LIME : 'transparent'}` }}>
                <span className="font-black text-[11px] leading-tight" style={{ color: active ? '#fff' : 'oklch(0.4 0.005 118)' }}>{f.name.split(' ')[0]}</span>
                <span className="text-[8px] font-bold uppercase tracking-wide" style={{ color: active ? LIME : 'oklch(0.55 0.005 118)' }}>{f.role.split(' ').slice(0,2).join(' ')}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Export ───────────────────────────────────────────────────────────────── */
export default function SonicFamily() {
  const tBadge   = useText('careers_family','careers-family-badge',   'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family','careers-family-heading', 'Sonic Spirit & Faces');
  const tSub     = useText('careers_family','careers-family-sub',     'Sechs Geschichten. Eine Überzeugung: Potenzial schlägt Lebenslauf.');
  const tCta     = useText('careers_family','careers-family-cta',     'Teil der Geschichte werden');

  const { images:db } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(db);
  const [hMain, hAccent] = tHeading.includes(' & ')
    ? [tHeading.split(' & ')[0], `& ${tHeading.split(' & ').slice(1).join(' & ')}`]
    : [tHeading, ''];

  return (
    <section id="spirit" className="bg-white py-20 md:py-[104px] px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader n="04" eyebrow={tBadge}
          heading={<>{hMain} {hAccent && <Marker>{hAccent}</Marker>}</>}
          sub={tSub} headingMax="max-w-[620px]" />
        <SonicBook faces={FACES} />
        <div className="mt-10 text-center">
          <a href={`mailto:${CONTACT_EMAIL}?subject=Bewerbung`}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-foreground-950 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all">
            {tCta} <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
