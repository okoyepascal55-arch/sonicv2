import { useState, useEffect, useRef, useCallback } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker } from './ChapterKit';

/* ── Tokens (matching site design system) ────────────────────────────────── */
const LIME   = 'oklch(0.81 0.19 115)';       // primary-500
const INK    = 'oklch(0.13 0.005 118)';       // foreground-950
const PAPER_L = 'linear-gradient(90deg,#efece0,#f8f6ef 22%,#f7f5ee)';
const PAPER_R = 'linear-gradient(90deg,#f7f5ec,#faf8f2 20%,#f4f1e6)';

/* ── Types ───────────────────────────────────────────────────────────────── */
type Face = {
  id: string; name: string; role: string;
  pullQuote: string; bio: string; closingQuote?: string; image: string;
};

/* ── Data ────────────────────────────────────────────────────────────────── */
const getFaces = (db: { url: string }[]): Face[] => [
  { id:'sascha',   name:'Sascha M.',   role:'Senior IT Admin',
    pullQuote:  '„Gute IT ist unsichtbar — und genau das ist das Ziel. Wenn die Systeme laufen, läuft Sonic."',
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
    image: db[0]?.url || 'https://readdy.ai/api/search-image?query=professional+man+IT+administrator+confident+portrait+modern+office+editorial&width=400&height=520&seq=sf-sascha-01&orientation=portrait' },
  { id:'marcel',   name:'Marcel W.',   role:'Finance Controller',
    pullQuote:  '„Zahlen erzählen Geschichten — man muss nur wissen, wie man sie liest."',
    bio: 'Marcel bringt finanzielle Klarheit in ein schnellwachsendes Unternehmen. Als Finance Controller stellt er sicher, dass Entscheidungen auf verlässlichen Grundlagen getroffen werden.',
    image: db[1]?.url || 'https://readdy.ai/api/search-image?query=professional+man+finance+controller+confident+editorial+portrait+office+modern&width=400&height=520&seq=sf-marcel-02&orientation=portrait' },
  { id:'andrew',   name:'Andrew W.',   role:'Event & Logistics Manager',
    pullQuote:  '„Im Event-Geschäft gibt es kein \'Morgen\'. Alles muss heute klappen — und das ist genau das, was mich antreibt."',
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
    image: db[2]?.url || 'https://readdy.ai/api/search-image?query=professional+man+event+logistics+manager+confident+editorial+portrait+modern+office&width=400&height=520&seq=sf-andrew-03&orientation=portrait' },
  { id:'michelle', name:'Michelle G.', role:'Senior Project Manager',
    pullQuote:  '„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung und echte Teamarbeit."',
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
    image: db[3]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+senior+project+manager+confident+editorial+portrait+modern+office&width=400&height=520&seq=sf-michelle-04&orientation=portrait' },
  { id:'janina',   name:'Janina B.',   role:'HR Manager',
    pullQuote: '„Eigentlich sollte es nur ein Nebenjob während des Studiums sein. Am Ende wurde daraus mein Karriereweg."',
    bio: `Als Janina zur Sonic kam, war sie noch Studentin. Den ersten Kontakt zur Agentur hatte sie allerdings schon deutlich früher. Ihr Bruder war bereits seit 2007 für Sonic im Promotionbereich tätig und entwickelte sich später zum Trainer. Über ihn erhielt auch sie die Möglichkeit, während ihres BWL-Studiums mit den Schwerpunkten Personalmanagement und Marketing erste Erfahrungen bei Sonic zu sammeln.

Während des Studiums war sie regelmäßig für Sonic auf verschiedenen Projekten im Einsatz. Dazu gehörten Promotionjobs auf der IFA in Berlin für Sony, verschiedene Sony-Roadshows sowie Einsätze für Nespresso. Diese Zeit war für sie besonders spannend, da sie nicht nur praktische Erfahrungen sammeln konnte, sondern auch viele unterschiedliche Menschen und Arbeitsbereiche kennenlernte.

Ein zufälliges Kennenlernen während einer Roadshow führte schließlich dazu, dass sie sich bei Sonic für das HR-Team bewarb. Was ihr dabei bis heute in Erinnerung geblieben ist: Ihr erstes Kennenlernen mit dem Geschäftsführer verlief alles andere als klassisch. Statt in einem Besprechungsraum fand das Treffen in einer Berliner Kneipe statt. In lockerer Runde mit mehreren Kolleginnen und Kollegen entstand schnell das Gefühl, nicht einfach nur ein Unternehmen kennenzulernen, sondern Menschen. Genau dieser persönliche und unkomplizierte Umgang prägt für sie die Sonic bis heute.

Kurz darauf folgte das offizielle Vorstellungsgespräch und 2020 schließlich der Start mit einem Praktikum im Personalbereich. Was zunächst als Praktikum begann, entwickelte sich schnell zu mehr. Nach kurzer Zeit wurde Janina übernommen und erhielt die Möglichkeit, sich immer tiefer in die verschiedenen Themen des Personalmanagements einzuarbeiten.

Eine besonders prägende Phase begann, als eine Kollegin über einen längeren Zeitraum ausfiel. Dadurch musste sie früh Verantwortung übernehmen und wurde im wahrsten Sinne des Wortes ins kalte Wasser geworfen. Rückblickend war genau diese Zeit eine der wertvollsten Erfahrungen ihrer bisherigen Laufbahn. Sie lernte in kurzer Zeit unglaublich viel, entwickelte sich fachlich weiter und gewann das Vertrauen, auch anspruchsvolle Themen eigenständig zu übernehmen.

Dabei war sie nie auf sich allein gestellt. Durch ihre Kolleginnen und Kollegen, die Führungskräfte und die Geschäftsleitung erfuhr sie stets großes Vertrauen, Unterstützung und die Möglichkeit, sich kontinuierlich weiterzuentwickeln. Genau diese Kombination aus Herausforderung, Vertrauen und Zusammenhalt hat ihren Weg bei Sonic entscheidend geprägt.

Heute ist Janina für das operative Personalmanagement verantwortlich. Dabei begleitet sie Mitarbeitende und Führungskräfte in allen personalrelevanten Themen und gestaltet aktiv Prozesse und Strukturen mit.

Manchmal beginnt der passende Karriereweg dort, wo man ursprünglich nur einen Studentenjob gesucht hat. Aus ersten Promotion-Einsätzen während des Studiums wurden neue Chancen, spannende Herausforderungen und Schritt für Schritt eine langfristige berufliche Heimat bei Sonic.`,
    closingQuote: '„Karrierewege lassen sich nicht immer planen. Manchmal entstehen sie genau dort, wo Menschen Potenziale erkennen, Vertrauen schenken und Entwicklung ermöglichen."',
    image: db[4]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+manager+warm+authentic+smile+editorial+portrait+modern+office&width=400&height=520&seq=sf-janina-05&orientation=portrait' },
  { id:'inga',     name:'Inga L.',     role:'Jr. Art Direktorin',
    pullQuote: '„Eigentlich sollte es nur ein Praktikum werden. Am Ende wurde daraus mein Karriereweg."',
    bio: `Als Inga bei Sonic startete, stand zunächst das Studium im Vordergrund. Für ihr Marketing-Management-Studium war ein Pflichtpraktikum erforderlich. Was als Studienanforderung begann, entwickelte sich jedoch schnell zu mehr.

Die Arbeit, das Team und die vielseitigen Projekte überzeugten sie so sehr, dass sie auch nach dem Praktikum neben ihrem Studium bei Sonic blieb. Nach ihrem erfolgreichen Abschluss war der nächste Schritt klar: der Einstieg in eine Vollzeitposition.

Heute ist Inga Teil des Creation Teams und begleitet Projekte von der ersten Idee bis zur Umsetzung. Neben Design- und Marketingthemen verantwortet sie Social-Media-Inhalte, entwickelt kreative Konzepte und unterstützt bei der Planung und Umsetzung von Events.

Dabei kennt Inga nicht nur die Agenturseite. Für den Kunden AVOURY war sie selbst als Promoterin im Einsatz, stand direkt mit Kundinnen und Kunden im Austausch und sammelte wertvolle Erfahrungen am Point of Sale. Für verschiedene Projekte führte ihr Weg sogar bis nach Wien. Diese Perspektive hilft ihr heute, Kampagnen nicht nur kreativ zu denken, sondern auch aus Sicht der Menschen zu betrachten, die sie später umsetzen.`,
    closingQuote: '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte."',
    image: db[5]?.url || 'https://readdy.ai/api/search-image?query=professional+young+woman+creative+art+director+social+media+confident+editorial+portrait+modern+studio&width=400&height=520&seq=sf-inga-06&orientation=portrait' },
];

/* ── The Book component ──────────────────────────────────────────────────── */
function SonicBook({ faces }: { faces: Face[] }) {
  const [open,    setOpen]    = useState(false);
  const [landed,  setLanded]  = useState(false);
  const [idx,     setIdx]     = useState(0);
  const [phase,   setPhase]   = useState<'idle'|'prep'|'run'>('idle');
  const [dir,     setDir]     = useState<1|-1>(1);
  const [imgIdx,  setImgIdx]  = useState(0);   // separate so portrait fades independently
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timerRef.current.forEach(clearTimeout); timerRef.current = []; };
  const later = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timerRef.current.push(t);
    return t;
  };

  useEffect(() => () => clearTimers(), []);

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* open the book */
  const handleOpen = useCallback(() => {
    if (open) return;
    setOpen(true);
    if (prefersReduced) { setLanded(true); return; }
    later(() => setLanded(true), 980);
  }, [open, prefersReduced]);

  /* turn page to a new chapter */
  const goTo = useCallback((next: number) => {
    if (next === idx || phase !== 'idle') return;
    if (!open) { handleOpen(); later(() => goTo(next), 1100); return; }

    const d = next > idx ? 1 : -1;
    setDir(d);

    if (prefersReduced) {
      setIdx(next); setImgIdx(next); return;
    }

    setPhase('prep');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('run');
        later(() => { setIdx(next); setImgIdx(next); }, 360);
        later(() => setPhase('idle'), 760);
      });
    });
  }, [idx, phase, open, handleOpen, prefersReduced]);

  const face = faces[idx];
  const paras = face.bio.split('\n\n').filter(Boolean);

  /* ── Mobile fallback (< 1024px handled by CSS) ─────────────────────────── */
  return (
    <div>
      {/* Desktop book */}
      <div className="hidden lg:block">
        <div style={{ perspective: '2400px', perspectiveOrigin: '50% 40%' }}>
          <div className="mx-auto relative" style={{ maxWidth: 1080, minHeight: 440 }}>

            {/* Closed cover (right half, before open) */}
            {!landed && (
              <div
                onClick={handleOpen}
                onKeyDown={(e) => { if (e.key==='Enter'||e.key===' ') handleOpen(); }}
                role="button" tabIndex={0} aria-label="Buch öffnen"
                className="absolute top-0 bottom-0 cursor-pointer select-none"
                style={{
                  left: '50%', width: '50%', transformOrigin: 'left center',
                  transform: open && !landed ? 'rotateY(-180deg)' : 'rotateY(0)',
                  transition: open && !landed ? `transform 950ms cubic-bezier(.55,.05,.25,1)` : 'none',
                  transformStyle: 'preserve-3d', zIndex: 20,
                  background: 'linear-gradient(100deg,#000 0 4%,#141410 6%,#0d0d0a 30%,#17170f 70%,#0a0a08)',
                  boxShadow: '0 24px 50px -18px rgba(0,0,0,.6)',
                }}
              >
                {/* Front face */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  {/* Lime spine */}
                  <div className="absolute top-0 left-0 bottom-0 w-[14px]" style={{ background: `linear-gradient(90deg,${LIME},#8f9800 60%,rgba(0,0,0,.6))` }} />
                  {/* Embossed inner frame */}
                  <div className="absolute inset-[14px]" style={{ border: `1px solid rgba(199,211,2,.22)` }} />
                  {/* Content */}
                  <div className="ml-4">
                    <div className="h-[3px] w-[28px] mb-4" style={{ background: LIME }} />
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] mb-6" style={{ color: LIME }}>KAPITEL 04</p>
                    <p className="font-black leading-[1.02] text-white mb-4" style={{ fontSize: 'clamp(28px,3.4vw,46px)', letterSpacing: '-0.02em' }}>
                      Sonic<br />Spirit
                    </p>
                    <span className="font-black leading-[1.02] px-2 py-0.5 inline-block" style={{ fontSize: 'clamp(28px,3.4vw,46px)', letterSpacing: '-0.02em', background: LIME, color: INK }}>& Faces</span>
                    <p className="mt-5 text-[13px] leading-[1.7] max-w-[30ch]" style={{ color: '#8f927f' }}>
                      Fünf Kapitel. Fünf Menschen, die Sonic jeden Tag prägen.
                    </p>
                  </div>
                  {/* Footer CTA */}
                  <div className="ml-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '2.2s' }}>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">BUCH ÖFFNEN</p>
                    <span style={{ color: LIME }}>→</span>
                  </div>
                </div>

                {/* Back face (paper inner cover) */}
                <div className="absolute inset-0" style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(90deg,#dedac9,#f1eee4 40%,#e9e6d9)',
                  boxShadow: 'inset 0 0 60px rgba(60,58,30,.18)',
                }} />
              </div>
            )}

            {/* Page-turn sheet */}
            {phase !== 'idle' && (
              <div className="absolute top-0 bottom-0 pointer-events-none z-30" style={{
                width: '50%',
                left: dir === 1 ? '50%' : 0,
                transformOrigin: dir === 1 ? 'left center' : 'right center',
                transform: phase === 'run' ? `rotateY(${dir === 1 ? -179 : 179}deg)` : 'rotateY(0deg)',
                transition: phase === 'run' ? 'transform 720ms cubic-bezier(.42,0,.3,1)' : 'none',
                background: 'linear-gradient(90deg,#e8e5d8,#faf8f2 26%,#f6f3ea 78%,#eae7da)',
                boxShadow: '0 0 50px rgba(0,0,0,.22)',
                borderLeft: dir === 1 ? `1px solid rgba(199,211,2,.15)` : undefined,
                borderRight: dir === -1 ? `1px solid rgba(199,211,2,.15)` : undefined,
              }} />
            )}

            {/* Open spread */}
            {(open || !prefersReduced) && (
              <div
                className="grid relative overflow-hidden"
                style={{
                  gridTemplateColumns: '1fr 1fr',
                  opacity: landed ? 1 : 0,
                  transition: landed ? 'opacity 420ms ease 60ms' : 'none',
                  boxShadow: '0 30px 60px -24px rgba(20,20,10,.45)',
                }}
              >
                {/* Page-block physicality slabs (behind pages) */}
                <div className="absolute pointer-events-none" style={{ inset: '1% 1.4% -1.6%', background: 'linear-gradient(180deg,#cdc9b6,#b9b5a1)', boxShadow: '0 44px 70px -30px rgba(30,30,14,.55)', zIndex: -1 }} />
                <div className="absolute pointer-events-none" style={{ top: '0.5%', right: '0.7%', bottom: '-0.8%', left: '0.7%', background: 'linear-gradient(180deg,#e4e0cf,#cfcbb6)', zIndex: -1 }} />
                {/* Bottom edge lime stain */}
                <div className="absolute bottom-0 left-0 right-0 h-[6px] pointer-events-none" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.18),rgba(199,211,2,.55) 22%,rgba(0,0,0,.12) 50%,rgba(199,211,2,.55) 78%,rgba(0,0,0,.18))', filter: 'blur(.3px)', zIndex: 10 }} />

                {/* LEFT PAGE — portrait */}
                <div className="relative" style={{ background: PAPER_L, boxShadow: 'inset 26px 0 40px -26px rgba(40,38,20,.35)', padding: 'clamp(14px,1.8vw,26px)' }}>
                  {/* Portrait frame */}
                  <div className="relative overflow-hidden" style={{ height: 440, background: '#ddd9cb', boxShadow: '0 0 0 1px rgba(199,211,2,.5), 0 10px 26px -14px rgba(30,30,14,.5)' }}>
                    <img
                      key={imgIdx}
                      src={face.image}
                      alt={face.name}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                  {/* Name plate */}
                  <div className="absolute bottom-[clamp(14px,1.8vw,26px)] left-[clamp(14px,1.8vw,26px)] right-[clamp(14px,1.8vw,26px)] px-[18px] py-4" style={{ background: INK }}>
                    <p className="font-black leading-none text-white" style={{ fontSize: 'clamp(20px,2.2vw,30px)', letterSpacing: '-0.02em' }}>{face.name}</p>
                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: LIME }}>{face.role}</p>
                  </div>
                </div>

                {/* RIGHT PAGE — chapter text */}
                <div className="relative" style={{ background: PAPER_R, boxShadow: 'inset -22px 0 34px -24px rgba(40,38,20,.28)' }}>
                  {/* Gutter shadow overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg,transparent,rgba(38,36,20,.22) 34%,rgba(24,24,12,.42) 48%,rgba(24,24,12,.42) 52%,rgba(38,36,20,.18) 66%,transparent)', zIndex: 1, width: 64 }} />
                  {/* Lime spine seam */}
                  <div className="absolute top-0 bottom-0 w-[2px] pointer-events-none" style={{ left: 0, background: `linear-gradient(180deg,rgba(199,211,2,.55),rgba(199,211,2,.12) 40%,rgba(199,211,2,.55))`, zIndex: 2 }} />
                  {/* Lime ribbon bookmark */}
                  <div className="absolute top-[-14px] pointer-events-none" style={{ left: 'calc(50% + 44px)', width: 16, height: '36%', background: 'linear-gradient(180deg,#aeb800,#c7d302 40%,#8f9800)', clipPath: 'polygon(0 0,100% 0,100% 100%,50% 86%,0 100%)', boxShadow: '2px 0 6px rgba(0,0,0,.25)', zIndex: 3 }} />
                  {/* Paper sheen */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(115deg,rgba(255,255,255,.4),transparent 34%,transparent 66%,rgba(60,58,30,.1))', zIndex: 4 }} />

                  {/* Scrollable content */}
                  <div className="relative overflow-y-auto" style={{
                    height: '100%', maxHeight: 520, zIndex: 5,
                    padding: 'clamp(26px,3.2vw,48px) clamp(24px,3vw,44px) clamp(26px,3.2vw,48px) clamp(30px,3.6vw,56px)',
                  }}>
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-5">
                      <p className="text-[11px] font-black uppercase tracking-[0.24em] whitespace-nowrap" style={{ color: '#8a8f6a' }}>
                        KAPITEL {String(idx + 1).padStart(2,'0')} VON {String(faces.length).padStart(2,'0')}
                      </p>
                      <div className="flex-1 h-px" style={{ background: '#e0dccd' }} />
                    </div>

                    {/* Pull quote — large */}
                    <blockquote className="font-black leading-snug mb-5" style={{ fontSize: 'clamp(17px,1.8vw,24px)', color: '#111', letterSpacing: '-0.02em' }}>
                      {face.pullQuote}
                    </blockquote>
                    <div className="mb-5 h-px" style={{ background: '#e0dccd' }} />

                    {/* Body paragraphs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {paras.map((p, i) => (
                        <p key={i} style={{ fontSize: 'clamp(13px,1.05vw,15px)', lineHeight: 1.72, color: '#33352e', textWrap: 'pretty' as any }}>{p}</p>
                      ))}
                    </div>

                    {/* Closing quote */}
                    {face.closingQuote && (
                      <div className="mt-7" style={{ borderTop: '1px solid #e0dccd', paddingTop: 26 }}>
                        <p className="text-[34px] font-black leading-none mb-2" style={{ color: LIME, fontFamily: 'Georgia, serif' }}>„</p>
                        <p className="italic leading-[1.6]" style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: '#1b1c18', fontFamily: 'Georgia, serif' }}>
                          {face.closingQuote.replace(/^„|"$/g, '')}
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <div className="h-px flex-1" style={{ background: LIME, opacity: 0.5 }} />
                          <p className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: '#6d7255' }}>{face.name} · {face.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapter tabs */}
        <div className="mx-auto mt-[2px]" style={{ maxWidth: 1080, display: 'grid', gridTemplateColumns: `repeat(${faces.length}, 1fr)`, gap: 2 }}>
          {faces.map((f, i) => {
            const active = i === idx;
            return (
              <button
                key={f.id} type="button" onClick={() => goTo(i)}
                className="text-left transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                style={{
                  padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 5,
                  background: active ? INK : '#f7f5ee',
                  borderTop: `3px solid ${active ? LIME : 'transparent'}`,
                }}
              >
                <span className="font-black text-[13px] leading-tight" style={{ color: active ? '#fff' : '#3a3c34' }}>{f.name}</span>
                <span className="font-bold text-[10px] uppercase tracking-[0.16em] leading-snug" style={{ color: active ? LIME : '#8f927f' }}>{f.role}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile fallback — stacked, no 3D */}
      <div className="block lg:hidden" style={{ border: `1px solid rgba(0,0,0,0.1)` }}>
        {/* Portrait + name */}
        <div className="relative" style={{ height: 280, background: '#ddd9cb' }}>
          <img src={face.image} alt={face.name}
            className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: INK }}>
            <p className="font-black text-white text-lg leading-none">{face.name}</p>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] mt-1" style={{ color: LIME }}>{face.role}</p>
          </div>
        </div>

        {/* Text */}
        <div className="p-6" style={{ background: PAPER_R }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: '#8a8f6a' }}>KAPITEL {String(idx + 1).padStart(2,'0')} / {String(faces.length).padStart(2,'0')}</span>
            <div className="flex-1 h-px" style={{ background: '#e0dccd' }} />
          </div>
          <blockquote className="font-black leading-snug text-[17px] text-[#111] mb-4">{face.pullQuote}</blockquote>
          <div className="h-px mb-4" style={{ background: '#e0dccd' }} />
          {paras.map((p, i) => (
            <p key={i} className="text-[13px] leading-[1.72] text-[#33352e] mb-4 last:mb-0">{p}</p>
          ))}
          {face.closingQuote && (
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid #e0dccd' }}>
              <p className="italic text-[14px] leading-relaxed text-[#1b1c18]" style={{ fontFamily: 'Georgia, serif' }}>{face.closingQuote}</p>
            </div>
          )}
        </div>

        {/* Mobile tabs — 3-col grid */}
        <div className="grid grid-cols-3 gap-[2px]" style={{ background: '#ddd9c7' }}>
          {faces.map((f, i) => {
            const active = i === idx;
            return (
              <button key={f.id} type="button" onClick={() => { setIdx(i); setImgIdx(i); }}
                className="px-2 py-3 text-left flex flex-col gap-1 cursor-pointer"
                style={{ background: active ? INK : '#f7f5ee', borderTop: `2px solid ${active ? LIME : 'transparent'}` }}>
                <span className="font-black text-[11px]" style={{ color: active ? '#fff' : '#3a3c34' }}>{f.name.split(' ')[0]}</span>
                <span className="text-[8px] font-bold uppercase tracking-wide" style={{ color: active ? LIME : '#8f927f' }}>{f.role.split(' ').slice(0,2).join(' ')}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Section export ──────────────────────────────────────────────────────── */
export default function SonicFamily() {
  const tBadge   = useText('careers_family', 'careers-family-badge',   'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub     = useText('careers_family', 'careers-family-sub',     'Sechs Geschichten. Eine Überzeugung: Potenzial schlägt Lebenslauf.');
  const tCta     = useText('careers_family', 'careers-family-cta',     'Teil der Geschichte werden');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);

  const parts = tHeading.split(' & ');
  const hMain = parts[0] ?? tHeading;
  const hAccent = parts.length > 1 ? `& ${parts.slice(1).join(' & ')}` : '';

  return (
    <section id="spirit" className="bg-white py-20 md:py-[104px] px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader
          n="04"
          eyebrow={tBadge}
          heading={<>{hMain} {hAccent && <Marker>{hAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-[620px]"
        />
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
