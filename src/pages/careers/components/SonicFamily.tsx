import { useEffect, useRef, useState } from 'react';
import { INITIATIVE_URL } from '../usePathData';
import { useText, useTextSection } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker, INK } from './ChapterKit';

type Face = {
  id: string;
  name: string;
  role: string;
  pullQuote: string;
  bio: string;
  closingQuote?: string;   // optional second quote shown at bottom of card
  image: string;
};

/* Four voices (15.10.2026). Portraits: Dashboard → Medien → Karriere → „Sonic Spirit & Faces“ —
   matched by the name at the start of the caption (e.g. „Sascha M. — …“), else by position. */
const BASE_FACES: Face[] = [
  {
    id: 'sascha',
    name: 'Sascha M.',
    role: 'Senior IT Admin',
    pullQuote: "„Gute IT ist unsichtbar — und genau das ist das Ziel. Wenn die Systeme laufen, läuft Sonic.“",
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
    image: '',
  },
  {
    id: 'andrew',
    name: 'Andrew W.',
    role: 'Event and Logistics Manager',
    pullQuote: "„Im Event-Geschäft gibt es kein 'Morgen'. Alles muss heute klappen — und das ist genau das, was mich antreibt.“",
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
    image: '',
  },
  {
    id: 'michelle',
    name: 'Michelle G.',
    role: 'Senior Project Manager',
    pullQuote: "„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung und echte Teamarbeit.“",
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
    image: '',
  },
  {
    id: 'janina',
    name: 'Janina B.',
    role: 'HR Manager',
    pullQuote: '„Eigentlich sollte es nur ein Nebenjob während des Studiums sein. Am Ende wurde daraus mein Karriereweg.“',
    bio: `Als Janina zur Sonic kam, war sie noch Studentin. Den ersten Kontakt zur Agentur hatte sie allerdings schon deutlich früher. Ihr Bruder war bereits seit 2007 für Sonic im Promotionbereich tätig und entwickelte sich später zum Trainer. Über ihn erhielt auch sie die Möglichkeit, während ihres BWL-Studiums mit den Schwerpunkten Personalmanagement und Marketing erste Erfahrungen bei Sonic zu sammeln.

Während des Studiums war sie regelmäßig für Sonic auf verschiedenen Projekten im Einsatz. Dazu gehörten Promotionjobs auf der IFA in Berlin für Sony, verschiedene Sony-Roadshows sowie Einsätze für Nespresso. Diese Zeit war für sie besonders spannend, da sie nicht nur praktische Erfahrungen sammeln konnte, sondern auch viele unterschiedliche Menschen und Arbeitsbereiche kennenlernte.

Ein zufälliges Kennenlernen während einer Roadshow führte schließlich dazu, dass sie sich bei Sonic für das HR-Team bewarb. Was ihr dabei bis heute in Erinnerung geblieben ist: Ihr erstes Kennenlernen mit dem Geschäftsführer verlief alles andere als klassisch. Statt in einem Besprechungsraum fand das Treffen in einer Berliner Kneipe statt. In lockerer Runde mit mehreren Kolleginnen und Kollegen entstand schnell das Gefühl, nicht einfach nur ein Unternehmen kennenzulernen, sondern Menschen. Genau dieser persönliche und unkomplizierte Umgang prägt für sie die Sonic bis heute.

Kurz darauf folgte das offizielle Vorstellungsgespräch und 2020 schließlich der Start mit einem Praktikum im Personalbereich. Was zunächst als Praktikum begann, entwickelte sich schnell zu mehr. Nach kurzer Zeit wurde Janina übernommen und erhielt die Möglichkeit, sich immer tiefer in die verschiedenen Themen des Personalmanagements einzuarbeiten.

Eine besonders prägende Phase begann, als eine Kollegin über einen längeren Zeitraum ausfiel. Dadurch musste sie früh Verantwortung übernehmen und wurde im wahrsten Sinne des Wortes ins kalte Wasser geworfen. Rückblickend war genau diese Zeit eine der wertvollsten Erfahrungen ihrer bisherigen Laufbahn. Sie lernte in kurzer Zeit unglaublich viel, entwickelte sich fachlich weiter und gewann das Vertrauen, auch anspruchsvolle Themen eigenständig zu übernehmen.

Dabei war sie nie auf sich allein gestellt. Durch ihre Kolleginnen und Kollegen, die Führungskräfte und die Geschäftsleitung erfuhr sie stets großes Vertrauen, Unterstützung und die Möglichkeit, sich kontinuierlich weiterzuentwickeln. Genau diese Kombination aus Herausforderung, Vertrauen und Zusammenhalt hat ihren Weg bei Sonic entscheidend geprägt.

Heute ist Janina für das operative Personalmanagement verantwortlich. Dabei begleitet sie Mitarbeitende und Führungskräfte in allen personalrelevanten Themen und gestaltet aktiv Prozesse und Strukturen mit.

Manchmal beginnt der passende Karriereweg dort, wo man ursprünglich nur einen Studentenjob gesucht hat. Aus ersten Promotion-Einsätzen während des Studiums wurden neue Chancen, spannende Herausforderungen und Schritt für Schritt eine langfristige berufliche Heimat bei Sonic.`,
    closingQuote: '„Karrierewege lassen sich nicht immer planen. Manchmal entstehen sie genau dort, wo Menschen Potenziale erkennen, Vertrauen schenken und Entwicklung ermöglichen.“',
    image: '',
  },
];

function pickPortrait(images: { url: string; caption?: string }[], face: Face, index: number): string {
  const first = face.name.split(' ')[0].toLowerCase();
  const byName = images.find((img) => img.url && (img.caption || '').trim().toLowerCase().startsWith(first));
  return byName?.url || images[index]?.url || '';
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

function Portrait({ face, isActive }: { face: Face; isActive: boolean }) {
  return face.image ? (
    <img
      src={face.image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-top"
      style={{
        filter: isActive ? 'none' : 'grayscale(1) brightness(0.55) contrast(1.05)',
        transform: isActive ? 'scale(1)' : 'scale(1.06)',
        transition: `filter 0.7s ${EASE}, transform 1.2s ${EASE}`,
      }}
      loading="lazy"
      draggable={false}
    />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center font-black text-white/10" style={{ fontSize: 'clamp(64px,9vw,140px)' }} aria-hidden="true">
      {face.name.charAt(0)}
    </span>
  );
}

export default function SonicFamily() {
  const tBadge   = useText('careers_family', 'careers-family-badge', 'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub     = useText('careers_family', 'careers-family-sub', 'Persönliche Geschichten, ehrliche Interviews und die Werte, die unsere Kultur ausmachen.');
  const tCta     = useText('careers_family', 'careers-family-cta', 'Teil der Geschichte werden');
  const tCtaBefore = useText('careers_family', 'careers-family-cta-before', 'Willst du auch Teil von');
  const tCtaAccent = useText('careers_family', 'careers-family-cta-accent', 'Sonic Spirit & Faces');
  const tCtaAfter  = useText('careers_family', 'careers-family-cta-after',  'werden?');
  const tCtaSub    = useText('careers_family', 'careers-family-cta-sub',    'Wir suchen Menschen, die ihre Geschichte teilen — 15 Minuten, ehrliche Fragen, kein Drehbuch.');
  const tMore = useText('careers_family', 'careers-family-more', 'Ganze Geschichte lesen');
  const tLess = useText('careers_family', 'careers-family-less', 'Weniger anzeigen');
  const tStory = useText('careers_family', 'careers-family-story-label', 'Die Geschichte');
  const tNext = useText('careers_family', 'careers-family-next', 'Nächste Geschichte');

  // Dashboard → Text → Stimmen & Gesichter → Tab „Karriere“
  const faceText = [
    useTextSection('karriere_face_sascha'),
    useTextSection('karriere_face_andrew'),
    useTextSection('karriere_face_michelle'),
    useTextSection('karriere_face_janina'),
  ];

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = BASE_FACES.map((face, i) => {
    const t = faceText[i] ?? {};
    const pick = (key: string, fallback: string) => (t[`face-${face.id}-${key}`]?.trim() ? t[`face-${face.id}-${key}`] : fallback);
    const closing = t[`face-${face.id}-closing`];
    return {
      ...face,
      image: pickPortrait(dbImages, face, i),
      name: pick('name', face.name),
      role: pick('role', face.role),
      pullQuote: pick('pullquote', face.pullQuote),
      bio: pick('bio', face.bio),
      // Empty closing quote in the dashboard hides it
      closingQuote: closing !== undefined ? (closing.trim() || undefined) : face.closingQuote,
    };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const active = FACES[activeIndex];
  const select = (i: number) => { setActiveIndex(i); setExpanded(false); };
  const storyRef = useRef<HTMLDivElement>(null);
  const goNext = () => {
    select((activeIndex + 1) % FACES.length);
    // keep the reader oriented: bring the portraits back into view
    const el = document.getElementById('spirit-faces');
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    }
  };

  // Mobile carousel: keep the active card in view, and follow swipes
  const railRef = useRef<HTMLDivElement>(null);
  const autoScrollUntil = useRef(0);
  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[activeIndex] as HTMLElement | undefined;
    if (rail && card && rail.scrollWidth > rail.clientWidth) {
      const target = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
      if (Math.abs(rail.scrollLeft - target) > 4) {
        autoScrollUntil.current = Date.now() + 700; // ignore our own scroll while it runs
        rail.scrollTo({ left: target, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth || Date.now() < autoScrollUntil.current) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - rail.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best !== activeIndex) { setActiveIndex(best); setExpanded(false); }
  };

  const paragraphs = active.bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const PREVIEW = 2;
  const shown = expanded ? paragraphs : paragraphs.slice(0, PREVIEW);
  const canExpand = paragraphs.length > PREVIEW;

  const headingParts = tHeading.split(' & ');
  const headingMain  = headingParts[0] ?? tHeading;
  const headingAccent = headingParts.length > 1 ? `& ${headingParts.slice(1).join(' & ')}` : '';
  const LIME = 'oklch(0.81 0.19 115)';
  const num = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <section id="spirit" className="bg-white py-10 md:py-14 px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader
          n="03"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-full"
        />

        {/* ── Desktop: expanding portrait panels ── */}
        <div
          id="spirit-faces"
          className="hidden lg:flex gap-2"
          style={{ height: 'clamp(520px, 44vw, 640px)' }}
          role="group"
          aria-label="Geschichte auswählen"
        >
          {FACES.map((face, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={face.id}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                aria-controls="spirit-story"
                aria-label={`${face.name} — ${face.role}`}
                className="group relative overflow-hidden text-left cursor-pointer min-w-0"
                style={{ flex: isActive ? '3.4 1 0%' : '1 1 0%', background: INK, transition: `flex 0.8s ${EASE}` }}
              >
                <Portrait face={face} isActive={isActive} />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(10,11,9,0.94) 0%, rgba(10,11,9,0.55) 38%, rgba(10,11,9,0.05) 70%)'
                      : 'linear-gradient(to top, rgba(10,11,9,0.85) 0%, rgba(10,11,9,0.25) 60%)',
                    transition: `background 0.6s ${EASE}`,
                  }}
                />
                {/* Lime frame line */}
                <span className="absolute top-0 left-0 h-1 pointer-events-none" style={{ width: isActive ? '100%' : '0%', background: LIME, transition: `width 0.8s ${EASE}` }} aria-hidden="true" />

                {/* Number */}
                <span className="absolute top-5 left-5 text-[11px] font-black tracking-[0.24em] tabular-nums" style={{ color: isActive ? LIME : 'rgba(255,255,255,0.6)' }} aria-hidden="true">
                  {num(i)}
                </span>

                {/* Collapsed: vertical name */}
                <span
                  className="absolute left-1/2 bottom-6 -translate-x-1/2 whitespace-nowrap text-[13px] font-black uppercase tracking-[0.28em] text-white group-hover:text-primary-500"
                  style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)', opacity: isActive ? 0 : 1, transition: `opacity 0.35s ${EASE}, color 0.2s` }}
                  aria-hidden="true"
                >
                  {face.name}
                </span>

                {/* Expanded: quote + name */}
                <span
                  className="absolute left-0 right-0 bottom-0 p-8 xl:p-10 block"
                  style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'none' : 'translateY(16px)', transition: `opacity 0.5s ${EASE} ${isActive ? '0.25s' : '0s'}, transform 0.6s ${EASE} ${isActive ? '0.25s' : '0s'}` }}
                  aria-hidden={!isActive}
                >
                  <i className="ri-double-quotes-l text-3xl block mb-3" style={{ color: LIME }} aria-hidden="true" />
                  <span className="block font-black text-white max-w-[640px]" style={{ fontSize: 'clamp(22px,2.1vw,32px)', lineHeight: 1.18, letterSpacing: '-0.025em' }}>
                    {face.pullQuote}
                  </span>
                  <span className="flex items-end justify-between gap-6 mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                    <span className="block">
                      <span className="block font-black text-white leading-none" style={{ fontSize: 'clamp(28px,2.6vw,40px)', letterSpacing: '-0.035em' }}>{face.name}</span>
                      <span className="block mt-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: LIME }}>{face.role}</span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/50 tabular-nums">{num(i)} / {num(FACES.length - 1)}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Mobile / tablet: swipeable portrait cards ── */}
        <div
          ref={railRef}
          onScroll={onRailScroll}
          className="lg:hidden -mx-5 md:-mx-10 px-5 md:px-10 flex gap-3 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
          role="group"
          aria-label="Geschichte auswählen"
        >
          {FACES.map((face, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={face.id}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                aria-controls="spirit-story"
                className="relative flex-shrink-0 overflow-hidden text-left snap-center"
                style={{ width: 'min(82%, 420px)', aspectRatio: '4 / 5', background: INK }}
              >
                <Portrait face={face} isActive={isActive} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.94) 0%, rgba(10,11,9,0.45) 45%, transparent 75%)' }} />
                <span className="absolute top-0 left-0 h-1" style={{ width: isActive ? '100%' : '0%', background: LIME, transition: `width 0.6s ${EASE}` }} aria-hidden="true" />
                <span className="absolute top-4 left-4 text-[10px] font-black tracking-[0.24em]" style={{ color: isActive ? LIME : 'rgba(255,255,255,0.7)' }} aria-hidden="true">{num(i)}</span>
                <span className="absolute left-0 right-0 bottom-0 p-5 block">
                  <span className="block font-black text-white text-[17px] leading-[1.25] mb-4" style={{ letterSpacing: '-0.02em' }}>{face.pullQuote}</span>
                  <span className="block font-black text-white text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>{face.name}</span>
                  <span className="block mt-1.5 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: LIME }}>{face.role}</span>
                </span>
              </button>
            );
          })}
        </div>
        {/* Mobile progress */}
        <div className="lg:hidden flex gap-1.5 mt-4" aria-hidden="true">
          {FACES.map((f, i) => (
            <span key={f.id} className="h-[3px] flex-1" style={{ background: i === activeIndex ? LIME : 'oklch(var(--foreground-950) / 0.12)', transition: 'background 0.3s' }} />
          ))}
        </div>

        {/* ── The story (full width; name and role are already on the portrait) ── */}
        <div
          id="spirit-story"
          ref={storyRef}
          aria-live="polite"
          className="mt-3 lg:mt-2 p-7 md:p-10 xl:p-12"
          style={{ background: INK }}
        >
          <div className="flex items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-7 h-0.5 flex-shrink-0" style={{ background: LIME }} aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: LIME }}>{tStory}</span>
            </div>
            <div className="hidden lg:flex gap-1.5" aria-hidden="true">
              {FACES.map((f, i) => (
                <span key={f.id} className="h-[3px] w-10" style={{ background: i === activeIndex ? LIME : 'rgba(255,255,255,0.14)', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>

          <div key={`b-${active.id}`} className="animate-fadeIn">
            <div className={shown.length > 1 ? 'lg:columns-2 lg:gap-14' : ''}>
              {shown.map((para, i) => (
                <p
                  key={i}
                  className={`leading-[1.8] mb-5 last:mb-0 break-inside-avoid ${
                    shown.length === 1 ? 'text-[17px] md:text-[20px] text-white/85' : i === 0 ? 'text-[17px] md:text-[18px] text-white/85' : 'text-[15px] md:text-[16px] text-white/65'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
            {active.closingQuote && (expanded || !canExpand) && (
              <p className="mt-10 pt-8 font-black text-white" style={{ fontSize: 'clamp(18px,1.9vw,26px)', lineHeight: 1.35, letterSpacing: '-0.02em', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {active.closingQuote}
              </p>
            )}
          </div>

          <div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {canExpand ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] cursor-pointer hover:text-white transition-colors"
                style={{ color: LIME }}
              >
                {expanded ? tLess : tMore}
                <i className={expanded ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} aria-hidden="true" />
              </button>
            ) : <span />}
            <button
              type="button"
              onClick={goNext}
              className="group inline-flex items-center gap-4 cursor-pointer"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white group-hover:text-primary-500 transition-colors">{tNext}</span>
              <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-primary-500 text-foreground-950 group-hover:bg-white transition-colors" aria-hidden="true">
                <i className="ri-arrow-right-line text-lg" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="border bg-white py-7 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-5 mt-3"
          style={{ borderColor: 'oklch(var(--foreground-950) / 0.08)' }}
        >
          <div className="text-center sm:text-left">
            <p className="text-base font-black text-foreground-950 leading-snug">
              {tCtaBefore} {tCtaAccent && <Marker>{tCtaAccent}</Marker>} {tCtaAfter}
            </p>
            {tCtaSub && (
              <p className="text-[13px] mt-1.5" style={{ color: 'oklch(0.55 0.006 260)' }}>
                {tCtaSub}
              </p>
            )}
          </div>
          <a
            href={INITIATIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-4 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-user-add-line text-sm" />
            {tCta}
          </a>
        </div>
      </div>
    </section>
  );
}
