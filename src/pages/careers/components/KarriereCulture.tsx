import { useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker } from './ChapterKit';

const DNA_DATA = [
  { num: '01', title: 'Der Mensch', desc: 'Menschen, die Marken prägen. Promotions leben von den Menschen, die sie durchführen.' },
  { num: '02', title: 'Der Antrieb', desc: 'Wettbewerbsfähige Bezahlung und Entwicklungsperspektiven motivieren unser Team.' },
  { num: '03', title: 'Die Daten', desc: 'Datenbasierte Entscheidungen verwandeln Intuition in messbare Erfolge.' },
  { num: '04', title: 'Das Werkzeug', desc: 'Inhouse-IT und starke Partner lösen Herausforderungen mit den richtigen Tools.' },
];

const TAGS = ['Energie', 'Sympathie', 'Anpacken', 'Teamgeist', 'Kreativität'];

export default function KarriereCulture() {
  const [hoveredDna, setHoveredDna] = useState<number | null>(null);
  const { images: woodIcons } = useMediaStore('careers_dna_wood_icons');
  const getDnaIcon = (idx: number) => woodIcons[idx]?.url ? resolveImageUrl(woodIcons[idx].url) : null;

  const tP1 = useText('careers_culture', 'careers-culture-p1', 'Am Point of Sale, bei Messen, Events, Roadshows und per Video aus unseren Studios am Campus in Krefeld.');
  const tP2 = useText('careers_culture', 'careers-culture-p2', 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?');

  return (
    <section id="darum" className="py-20 md:py-[104px] px-5 md:px-10 bg-white">
      <div className="sonic-container">
        <ChapterHeader
          n="02"
          eyebrow="Unsere Kultur"
          heading={<>Starke Menschen für <Marker>starke Marken</Marker></>}
          sub="Wir lieben & leben Marken. Energie, Sympathie, Teamgeist, Kreativität und der Wille anzupacken — das zeichnet uns aus."
          headingMax="max-w-[700px]"
        />

        {/* Statement card */}
        <div className="relative bg-foreground-950 px-7 py-10 md:px-14 md:pt-14 md:pb-10 mb-14 overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary-500" aria-hidden="true" />
          <div className="max-w-2xl">
            <p className="text-[26px] md:text-[34px] font-black leading-[1.16] tracking-[-0.03em] text-white mb-5">
              Wir lieben &amp; leben Marken.
            </p>
            <p className="text-[15px] leading-[1.75] text-white/60 mb-3">{tP1}</p>
            <p className="text-[15px] leading-[1.75] text-white/60">{tP2}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-7 border-t border-white/10">
            {TAGS.map((tag) => (
              <span key={tag} className="px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-primary-500" style={{ border: '1px solid oklch(var(--primary-500) / 0.3)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* DNA */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14 mb-14">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] mb-4" style={{ color: 'oklch(var(--foreground-500))' }}>Unsere DNA</p>
            <p className="text-sm leading-[1.75]" style={{ color: 'oklch(var(--foreground-400))' }}>Vier Konstanten, die jede Entscheidung bei Sonic trägt.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)', borderLeft: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            {DNA_DATA.map((item, i) => {
              const active = hoveredDna === i;
              return (
                <div
                  key={item.num}
                  className="relative p-9 overflow-hidden transition-colors duration-200"
                  style={{
                    background: active ? '#fafdf5' : '#fff',
                    borderRight: '1px solid oklch(var(--foreground-950) / 0.1)',
                    borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)',
                  }}
                  onMouseEnter={() => setHoveredDna(i)}
                  onMouseLeave={() => setHoveredDna(null)}
                >
                  <span
                    className="absolute top-2.5 right-3.5 font-black leading-[0.8] tracking-[-0.05em] select-none pointer-events-none transition-colors duration-200"
                    style={{ fontSize: '76px', color: active ? 'oklch(var(--primary-500) / 0.12)' : 'oklch(var(--foreground-950) / 0.04)' }}
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>
{getDnaIcon(i) && (
                    <div className="relative w-10 h-10 overflow-hidden mb-4 flex-shrink-0">
                      <img src={getDnaIcon(i)!} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <p className="relative text-[22px] font-black tracking-[-0.02em] text-foreground-950 mb-3">{item.title}</p>
                  <p className="relative text-sm leading-[1.7]" style={{ color: 'oklch(var(--foreground-500))' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
