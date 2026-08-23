import { useState } from 'react';
import { useText } from '@/hooks/useText';

const DNA_DATA = [
  {
    num: '01',
    title: 'Der Mensch',
    desc: 'Menschen, die Marken prägen. Promotions leben von den Menschen, die sie durchführen.',
    image: 'https://readdy.ai/api/search-image?query=confident%20friendly%20retail%20promoter%20professional%20engaging%20warmly%20with%20a%20customer%20inside%20a%20bright%20modern%20retail%20store%20environment%20natural%20window%20light%20authentic%20candid%20editorial%20moment%20clean%20neutral%20warm%20background%20soft%20focus%20high%20detail%20harmonious%20composition&width=600&height=400&seq=dna-mensch-v1&orientation=landscape',
  },
  {
    num: '02',
    title: 'Der Antrieb',
    desc: 'Wettbewerbsfähige Bezahlung und Entwicklungsperspektiven motivieren unser Team.',
    image: 'https://readdy.ai/api/search-image?query=energetic%20team%20of%20professionals%20high%20five%20celebrating%20a%20successful%20moment%20in%20a%20bright%20modern%20creative%20office%20space%20warm%20natural%20light%20authentic%20candid%20editorial%20photography%20clean%20neutral%20background%20sense%20of%20motion%20and%20drive%20high%20detail&width=600&height=400&seq=dna-antrieb-v1&orientation=landscape',
  },
  {
    num: '03',
    title: 'Die Daten',
    desc: 'Datenbasierte Entscheidungen verwandeln Intuition in messbare Erfolge.',
    image: 'https://readdy.ai/api/search-image?query=sleek%20modern%20analytics%20dashboard%20with%20charts%20and%20performance%20metrics%20displayed%20on%20a%20laptop%20screen%20on%20a%20clean%20wooden%20desk%20in%20a%20bright%20workspace%20warm%20natural%20lighting%20editorial%20product%20photography%20minimal%20composition%20soft%20neutral%20background%20high%20detail&width=600&height=400&seq=dna-daten-v1&orientation=landscape',
  },
  {
    num: '04',
    title: 'Das Werkzeug',
    desc: 'Inhouse-IT und starke Partner lösen Herausforderungen mit den richtigen Tools.',
    image: 'https://readdy.ai/api/search-image?query=organized%20modern%20creative%20studio%20tools%20and%20devices%20neatly%20arranged%20on%20a%20clean%20workbench%20in%20a%20bright%20industrial%20workspace%20warm%20natural%20light%20editorial%20still%20life%20photography%20minimal%20clean%20composition%20neutral%20background%20high%20detail&width=600&height=400&seq=dna-werkzeug-v1&orientation=landscape',
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

  const tP1 = useText('careers_culture', 'careers-culture-p1', '');
  const tP2 = useText('careers_culture', 'careers-culture-p2', '');

  const scrollToPaths = () => {
    const el = document.getElementById('pfade');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="darum" className="sonic-section-lg px-4 md:px-6 bg-white">
      <div className="sonic-container">
        {/* ── Headline ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 className="sonic-h2 text-foreground-950">
            Starke Menschen für{' '}
            <span className="text-primary-500">starke Marken</span>
          </h2>
          <p className="mt-4 text-sm md:text-base font-bold text-[#6E6E68] tracking-wide max-w-xl leading-relaxed">
            Wir lieben &amp; leben Marken. Energie, Sympathie, Teamgeist, Kreativität und der Wille anzupacken — das zeichnet uns aus.
          </p>
        </div>

        {/* ── Statement card ── */}
        <div className="relative overflow-hidden bg-foreground-950 p-8 md:p-12 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-black text-white leading-snug mb-4">
              Wir lieben &amp; leben Marken.
            </h3>
            <p className="text-sm text-[#B5B5AF] leading-relaxed mb-3">
              {tP1 || 'Am Point of Sale, bei Messen, Events, Roadshows und per Video aus unseren Studios am Campus in Krefeld.'}
            </p>
            <p className="text-sm text-[#B5B5AF] leading-relaxed">
              {tP2 || 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?'}
            </p>
          </div>

          {/* Tags + CTA */}
          <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold text-primary-500 bg-primary-500/10 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
            <button
              onClick={scrollToPaths}
              className="ml-auto text-xs font-bold text-white hover:text-primary-500 transition-colors cursor-pointer"
            >
              Karrierepfade →
            </button>
          </div>
        </div>

        {/* ── DNA (pictorial) + Werte (bento) ── */}
        <div className="space-y-12">
          {/* DNA — pictorial cards */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground-400 mb-4">
              Unsere DNA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-4 gap-4">
              {DNA_DATA.map((item, i) => {
                const active = hoveredDna === i;
                return (
                  <div
                    key={item.num}
                    className="overflow-hidden border bg-white transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: active ? 'rgba(200,212,0,0.55)' : '#E7E4D4',
                      transform: active ? 'translateY(-3px)' : 'translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredDna(i)}
                    onMouseLeave={() => setHoveredDna(null)}
                  >
                    <div className="relative h-36 md:h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700"
                        style={{ transform: active ? 'scale(1.06)' : 'scale(1)' }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/45 to-transparent" aria-hidden="true" />
                      <div
                        className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center text-xs font-black"
                        style={{ background: 'rgba(11,11,12,0.72)', color: '#C8D400', border: '1px solid rgba(200,212,0,0.4)' }}
                      >
                        {item.num}
                      </div>
                    </div>
                    <div className="p-5">
                      <h5 className="text-sm font-bold text-foreground-950 mb-1.5">
                        {item.title}
                      </h5>
                      <p className="text-xs leading-relaxed text-[#6E6E68]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Werte — bento numbered-card system (matches Über uns Timeline) */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground-400 mb-4">
              Unsere Werte
            </h4>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {WERTE.map((val, i) => {
                const isWide = i === 0 || i === 3 || i === 4;
                return (
                  <div
                    key={val.num}
                    className={`relative p-7 md:p-8 border border-black/8 bg-white ${
                      isWide ? 'sm:col-span-2' : 'sm:col-span-1'
                    }`}
                  >
                    {/* Watermark number */}
                    <div
                      className="absolute top-4 right-5 text-7xl font-black leading-none text-black/[0.04] select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {val.num}
                    </div>

                    <div className="w-9 h-9 bg-foreground-950 text-primary-500 flex items-center justify-center text-[11px] font-black mb-4">
                      {val.num}
                    </div>
                    <h4 className="text-lg md:text-xl font-black text-foreground-950 mb-3 leading-tight tracking-tight">
                      {val.title}
                    </h4>
                    <p className="text-sm text-black/50 leading-relaxed">
                      {val.desc}
                    </p>
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