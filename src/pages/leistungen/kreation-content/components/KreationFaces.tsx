import { useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const PEOPLE = [
  {
    id: 'robert',
    name: 'Robert H.',
    role: 'Creative Director',
    pullQuote: '"Kreation ist kein Zufall. Es ist das Ergebnis von Präzision, Mut und einem tiefen Verständnis für Marken und Menschen."',
    bio: 'Robert leitet die kreative Ausrichtung bei Sonic. Als Creative Director verbindet er strategisches Denken mit visueller Exzellenz — und gibt Markenauftritten eine unverwechselbare Handschrift.',
  },
  {
    id: 'inga',
    name: 'Inga L.',
    role: 'Jr. Art Direktorin',
    pullQuote: '"Design entscheidet in Sekunden. Wer das versteht, denkt nicht in Gestaltung — sondern in Wirkung."',
    bio: 'Inga bringt Kreation auf die Fläche: von der Idee über das Layout bis zum finalen Asset. Als Jr. Art Direktorin gibt sie Kampagnen und Markenwelten ihre visuelle Identität.',
  },
];

export default function KreationFaces() {
  const { images: img0 } = useMediaStore('kreation_faces_robert');
  const { images: img1 } = useMediaStore('kreation_faces_inga');
  const dbImages = [img0[0], img1[0]];

  const [activeId, setActiveId] = useState(PEOPLE[0].id);
  const active = PEOPLE.find(p => p.id === activeId) ?? PEOPLE[0];
  const activeIdx = PEOPLE.findIndex(p => p.id === activeId);

  const getImg = (idx: number) => {
    const item = dbImages[idx];
    const url = item?.url ? resolveImageUrl(item.url) : null;
    return url || (idx === 0
      ? 'https://readdy.ai/api/search-image?query=professional%20man%20creative%20director%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20artistic%20modern%20agency&width=600&height=800&seq=kf-robert-01&orientation=portrait'
      : 'https://readdy.ai/api/search-image?query=professional%20woman%20content%20head%20creative%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20modern%20agency&width=600&height=800&seq=kf-inga-02&orientation=portrait');
  };

  return (
    <section id="team" className="sonic-section-lg px-4 md:px-6 bg-white">
      <div className="sonic-container">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Kreation Team</span>
          </div>
          <h2 className="sonic-h2 text-foreground-950 uppercase">Die Köpfe hinter der Kreation.</h2>
        </div>

        <div className="flex flex-col gap-0" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
          {/* Story panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '460px' }}>
            {/* Portrait */}
            <div className="relative overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)', minHeight: '300px' }}>
              <img
                key={active.id}
                src={getImg(activeIdx)}
                alt={`${active.name} — ${active.role}`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.88) 0%, rgba(10,11,9,0.1) 55%, transparent 100%)' }} />
              <div className="absolute left-0 right-0 bottom-0 p-7 md:p-10">
                <p className="font-black text-white leading-none tracking-tight mb-1" style={{ fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.03em' }}>{active.name}</p>
                <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider">{active.role}</span>
              </div>
            </div>

            {/* Quote + bio */}
            <div className="flex flex-col justify-between p-8 md:p-12" style={{ background: 'oklch(0.13 0.005 118)' }}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-8" style={{ color: 'oklch(0.81 0.19 115)' }}>{active.role}</p>
                <i className="ri-double-quotes-l text-3xl mb-5 block" style={{ color: 'oklch(0.81 0.19 115 / 0.35)' }} />
                <blockquote className="font-black leading-[1.28] text-white mb-8" style={{ fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '-0.02em' }}>
                  {active.pullQuote}
                </blockquote>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{active.bio}</p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="w-6 h-px flex-1" style={{ background: 'oklch(0.81 0.19 115 / 0.3)' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">{active.name} · {active.role}</span>
              </div>
            </div>
          </div>

          {/* Name selector */}
          <div className="grid" style={{ gridTemplateColumns: `repeat(${PEOPLE.length}, 1fr)`, borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            {PEOPLE.map((person, i) => {
              const isActive = person.id === activeId;
              return (
                <button key={person.id} onClick={() => setActiveId(person.id)}
                  className="flex flex-col items-center justify-center gap-2 py-5 px-3 cursor-pointer transition-all duration-200 focus:outline-none"
                  style={{
                    background: isActive ? 'oklch(0.13 0.005 118)' : '#fff',
                    borderRight: i < PEOPLE.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.1)' : undefined,
                    borderTop: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent',
                  }}>
                  <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden flex-shrink-0"
                    style={{ border: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}>
                    <img src={getImg(i)} alt={person.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="text-center">
                    <p className="font-black leading-none" style={{ fontSize: '11px', color: isActive ? '#fff' : 'oklch(0.16 0.006 118)' }}>{person.name}</p>
                    <p className="text-[9px] font-bold mt-0.5 uppercase tracking-[0.1em]" style={{ color: isActive ? 'oklch(0.81 0.19 115)' : 'oklch(0.6 0.006 260)' }}>{person.role}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
