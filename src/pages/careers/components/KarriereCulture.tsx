import { useState } from 'react';
import { useText } from '@/hooks/useText';

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

  const tP1 = useText('careers_culture', 'careers-culture-p1', '');
  const tP2 = useText('careers_culture', 'careers-culture-p2', '');

  const scrollToPaths = () => {
    const el = document.getElementById('pfade');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* ── DARUM SONIC ── */}
      <section id="darum" className="py-[88px] px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Section head */}
          <div className="max-w-[640px] mb-11">
            <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
              <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
              Darum Sonic
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
              Starke Menschen für{' '}
              <span className="text-[#C3D62A]">starke Marken</span>
            </h2>
          </div>

          {/* darum-grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5">
            {/* Dark quote card */}
            <div className="bg-[#0B0B0C] text-white  p-10 flex flex-col justify-between min-h-[400px]">
              <div>
                {/* Eyebrow on dark */}
                <div className="inline-flex items-center gap-2 bg-[#1A1A1B] text-[#DCE94D] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-6 ">
                  <span className="w-1.5 h-1.5 bg-[#DCE94D] " />
                  Darum Sonic
                </div>
                <h3 className="text-[26px] font-black leading-[1.25] mb-4">
                  Wir lieben &amp; leben Marken.
                </h3>
                <p className="text-sm text-[#B5B5AF] leading-[1.6] mb-3">
                  {tP1 || 'Am Point of Sale, bei Messen, Events, Roadshows und per Video aus unseren Studios am Campus in Krefeld.'}
                </p>
                <p className="text-sm text-[#B5B5AF] leading-[1.6] mb-5">
                  {tP2 || 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?'}
                </p>

                <div className="flex flex-wrap gap-2">
                  {TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-[7px] bg-[#1A1A1B] border border-[#2C2C2E] text-[#DCE94D] font-bold text-xs uppercase tracking-[0.03em] "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#2C2C2E] pt-[18px] mt-2">
                <span className="text-[13px] font-semibold text-[#B5B5AF]">
                  Sonic Campus Krefeld — Team &amp; Kultur
                </span>
                <button
                  onClick={scrollToPaths}
                  className="text-[13px] font-bold text-[#DCE94D] hover:text-white transition-colors cursor-pointer"
                >
                  Karrierepfade →
                </button>
              </div>
            </div>

            {/* 2x2 feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DNA_DATA.map((item, i) => {
                const active = hoveredDna === i;
                return (
                  <div
                    key={item.num}
                    className="bg-[#FAFDF5]  p-[26px] border border-[#E7E4D4] cursor-pointer transition-all duration-300"
                    style={{
                      background: active ? '#0B0B0C' : '#FAFDF5',
                      borderColor: active ? '#C3D62A' : '#E7E4D4',
                    }}
                    onMouseEnter={() => setHoveredDna(i)}
                    onMouseLeave={() => setHoveredDna(null)}
                  >
                    <div
                      className="text-[26px] font-black leading-none mb-3"
                      style={{ color: active ? 'rgba(220,233,77,0.18)' : '#C3D62A' }}
                      aria-hidden="true"
                    >
                      {item.num}
                    </div>
                    <h4
                      className="text-base font-bold mb-1.5 transition-colors duration-300"
                      style={{ color: active ? '#fff' : '#0B0B0C' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-[13px] leading-[1.5] transition-colors duration-300"
                      style={{ color: active ? 'rgba(255,255,255,0.72)' : '#6E6E68' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WERTE ── */}
      <section className="py-[88px] px-8" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #FAFDF5 50%, #ffffff 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[640px] mb-11">
            <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
              <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
              Sonic-Werte
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
              Diese Werte{' '}
              <span className="text-[#C3D62A]">leben wir</span>
            </h2>
            <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">
              Wir stellen uns auf dich ein, wenn du dich auf unsere Werte einstellen kannst.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WERTE.map((val) => (
              <div
                key={val.num}
                className="bg-white  p-7 border border-[#E7E4D4]"
              >
                <div className="w-11 h-11  bg-[#0B0B0C] flex items-center justify-center mb-[18px] text-[#DCE94D] font-black text-sm">
                  {val.num}
                </div>
                <h4 className="text-base font-bold uppercase tracking-wide mb-2 text-[#0B0B0C]">
                  {val.title}
                </h4>
                <p className="text-[13px] leading-[1.55] text-[#6E6E68]">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}