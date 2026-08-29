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

        {/* DNA eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <p className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(var(--foreground-500))' }}>Unsere DNA — Vier Konstanten, die jede Entscheidung bei Sonic trägt.</p>
        </div>

        {/* Bento grid — inside sonic-container, 2-row asymmetric layout */}
        {/* Desktop (md+): 3-col grid — wide | narrow / narrow | wide */}
        {/* Mobile: 1-col stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground-950/[0.08]">
          {DNA_DATA.map((item, i) => {
            const active = hoveredDna === i;
            const icon = getDnaIcon(i);
            // Cards 0 and 3 are wide (col-span-2); cards 1 and 2 are narrow (col-span-1)
            const isWide = i === 0 || i === 3;
            const minH = isWide ? '320px' : '260px';
            return (
              <div
                key={item.num}
                className={`relative overflow-hidden transition-all duration-300 cursor-default group${isWide ? ' md:col-span-2' : ' md:col-span-1'}`}
                style={{ background: active ? '#FAFDF5' : '#ffffff', minHeight: minH }}
                onMouseEnter={() => setHoveredDna(i)}
                onMouseLeave={() => setHoveredDna(null)}
              >
                {/* Ghost number */}
                <span
                  className="absolute top-3 right-4 font-black leading-none select-none pointer-events-none transition-colors duration-300"
                  style={{ fontSize: isWide ? '104px' : '80px', color: active ? 'oklch(var(--primary-500) / 0.10)' : 'oklch(var(--foreground-950) / 0.035)' }}
                  aria-hidden="true"
                >{item.num}</span>

                {/* Lime sweep border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] transition-transform duration-300 origin-left"
                  style={{ background: 'oklch(var(--primary-500))', transform: active ? 'scaleX(1)' : 'scaleX(0)' }} />

                <div className={`relative z-10 flex flex-col h-full ${isWide ? 'p-8 md:p-10' : 'p-7 md:p-9'}`}>
                  {icon && (
                    <div className="w-11 h-11 overflow-hidden mb-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <img src={icon} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block" style={{ color: 'oklch(var(--primary-500) / 0.6)' }}>{item.num} / 04</span>
                  <h3 className={`font-black tracking-[-0.025em] text-foreground-950 leading-none mb-3 ${isWide ? 'text-[28px] md:text-[34px]' : 'text-[22px] md:text-[26px]'}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'oklch(var(--foreground-500))' }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>{/* /sonic-container */}
    </section>
  );
}
