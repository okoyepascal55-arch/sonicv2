import { useState } from 'react';
import { useText } from '@/hooks/useText';
import SectionBadge from '@/components/base/SectionBadge';

const DNA_DATA = [
  {
    num: '01',
    title: 'Der Mensch',
    desc: 'Menschen, die Marken prägen. Promotions leben von den Menschen, die sie durchführen.',
  },
  {
    num: '02',
    title: 'Der Antrieb',
    desc: 'Wettbewerbsfähige Bezahlung und Entwicklungsperspektiven motivieren unser Team.',
  },
  {
    num: '03',
    title: 'Die Daten',
    desc: 'Datenbasierte Entscheidungen verwandeln Intuition in messbare Erfolge.',
  },
  {
    num: '04',
    title: 'Das Werkzeug',
    desc: 'Inhouse-IT und starke Partner lösen Herausforderungen mit den richtigen Tools.',
  },
];

const TAGS = ['Energie', 'Sympathie', 'Anpacken', 'Teamgeist', 'Kreativität'];

const WERTE = [
  { num: '01', title: 'Gemeinschaftlich', desc: 'Nur als Team sind wir Sonic. Wir unterstützen uns gegenseitig und lernen voneinander.' },
  { num: '02', title: 'Menschlich', desc: 'Wir wollen, dass du erfolgreich sein kannst. Das beginnt bei uns mit gegenseitiger Wertschätzung.' },
  { num: '03', title: 'Flexibel', desc: 'Wir finden uns gern in neue Situationen ein und bestärken uns darin, Neues auszuprobieren.' },
  { num: '04', title: 'Einfachheit', desc: 'Klarer Fokus auf das Wesentliche: gute Strukturen, kurze Wege, praktische Tools.' },
  { num: '05', title: 'Verantwortung', desc: 'Unsere Stärken und Fähigkeiten setzen wir verantwortungsbewusst ein. So ergänzen wir uns perfekt.' },
  { num: '06', title: 'Arbeitsumfeld', desc: 'Aufgaben, die zu deiner Persönlichkeit passen. Menschen, mit denen man gerne zusammenarbeitet.' },
];

export default function KarriereCulture() {
  const [hoveredDna, setHoveredDna] = useState<number | null>(null);
  const [hoveredWert, setHoveredWert] = useState<number | null>(null);

  const tP1 = useText('careers_culture', 'careers-culture-p1', '');
  const tP2 = useText('careers_culture', 'careers-culture-p2', '');

  const scrollToPaths = () => {
    const el = document.getElementById('pfade');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="darum" className="sonic-section-lg px-4 md:px-6 bg-background-100">
      <div className="sonic-container">

        {/* ── Section header ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <SectionBadge text="Unsere Kultur" variant="dark" className="mb-5" />
          <h2 className="sonic-h2 text-foreground-950">
            Starke Menschen für{' '}
            <span className="text-primary-500">starke Marken</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-foreground-500 max-w-xl leading-relaxed">
            Wir lieben &amp; leben Marken. Energie, Sympathie, Teamgeist, Kreativität und der Wille anzupacken — das zeichnet uns aus.
          </p>
        </div>

        {/* ── Statement card ── */}
        <div className="relative overflow-hidden bg-foreground-950 p-8 md:p-12 mb-12 md:mb-16">
          {/* Lime left accent */}
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary-500" aria-hidden="true" />

          <div className="max-w-2xl pl-2">
            <h3 className="sonic-h3 text-white mb-4">
              Wir lieben &amp; leben Marken.
            </h3>
            <p className="text-sm text-foreground-300 leading-relaxed mb-3">
              {tP1 || 'Am Point of Sale, bei Messen, Events, Roadshows und per Video aus unseren Studios am Campus in Krefeld.'}
            </p>
            <p className="text-sm text-foreground-300 leading-relaxed">
              {tP2 || 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?'}
            </p>
          </div>

          {/* Tags + CTA */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-white/10 pl-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-black text-primary-500 border border-primary-500/25 px-3 py-1.5 uppercase tracking-[0.1em]"
              >
                {tag}
              </span>
            ))}
            <button
              onClick={scrollToPaths}
              className="ml-auto text-xs font-black text-white/60 hover:text-primary-500 transition-colors cursor-pointer uppercase tracking-[0.12em]"
            >
              Karrierepfade →
            </button>
          </div>
        </div>

        {/* ── DNA + Werte ── */}
        <div className="space-y-14">

          {/* DNA — numbered editorial cards */}
          <div>
            <p className="sonic-label text-foreground-400 mb-6">Unsere DNA</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground-200/60">
              {DNA_DATA.map((item, i) => {
                const active = hoveredDna === i;
                return (
                  <div
                    key={item.num}
                    className="relative bg-white p-7 md:p-8 cursor-default transition-colors duration-200 overflow-hidden"
                    style={{ background: active ? '#fafdf5' : '#ffffff' }}
                    onMouseEnter={() => setHoveredDna(i)}
                    onMouseLeave={() => setHoveredDna(null)}
                  >
                    {/* Lime left border on hover */}
                    <div
                      className="absolute top-0 left-0 bottom-0 transition-all duration-200"
                      style={{ width: '3px', background: active ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.15)' }}
                      aria-hidden="true"
                    />
                    {/* Ghost number */}
                    <div
                      className="absolute top-4 right-5 font-black leading-none select-none pointer-events-none transition-colors duration-200"
                      style={{ fontSize: '5rem', color: active ? 'rgba(200,212,0,0.12)' : 'rgba(0,0,0,0.04)', letterSpacing: '-0.04em' }}
                      aria-hidden="true"
                    >
                      {item.num}
                    </div>
                    <div className="relative">
                      <p className="sonic-label text-primary-500 mb-4">{item.num}</p>
                      <h4 className="sonic-h3 text-foreground-950 mb-2">{item.title}</h4>
                      <p className="text-sm text-foreground-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Werte — left-border card grid */}
          <div>
            <p className="sonic-label text-foreground-400 mb-6">Unsere Werte</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WERTE.map((val, i) => {
                const active = hoveredWert === i;
                return (
                  <div
                    key={val.num}
                    className="relative p-6 md:p-7 bg-white transition-all duration-200"
                    style={{
                      borderLeft: `3px solid ${active ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)'}`,
                      borderTop: '0.5px solid rgba(0,0,0,0.07)',
                      borderRight: '0.5px solid rgba(0,0,0,0.07)',
                      borderBottom: '0.5px solid rgba(0,0,0,0.07)',
                      background: active ? '#fafdf5' : '#ffffff',
                    }}
                    onMouseEnter={() => setHoveredWert(i)}
                    onMouseLeave={() => setHoveredWert(null)}
                  >
                    <p className="sonic-label text-primary-500 mb-3">{val.num}</p>
                    <h4 className="sonic-h3 text-foreground-950 mb-2">{val.title}</h4>
                    <p className="text-sm text-foreground-500 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
