import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker } from './ChapterKit';

type Face = {
  id: string;
  name: string;
  role: string;
  pullQuote: string;
  bio: string;
  image: string;
};

const getFaces = (dbImages: { url: string }[]): Face[] => [
  {
    id: 'sascha',
    name: 'Sascha M.',
    role: 'Senior IT Admin',
    pullQuote: "„Gute IT ist unsichtbar — und genau das ist das Ziel. Wenn die Systeme laufen, läuft Sonic.“",
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
    image: dbImages[0]?.url || 'https://readdy.ai/api/search-image?query=professional+man+IT+administrator+confident+portrait+modern+office+editorial&width=600&height=800&seq=sf-sascha-01&orientation=portrait',
  },
  {
    id: 'marcel',
    name: 'Marcel W.',
    role: 'Finance Controller',
    pullQuote: "„Zahlen erzählen Geschichten — man muss nur wissen, wie man sie liest.“",
    bio: 'Marcel bringt finanzielle Klarheit in ein schnellwachsendes Unternehmen. Als Finance Controller stellt er sicher, dass Entscheidungen auf verlässlichen Grundlagen getroffen werden.',
    image: dbImages[1]?.url || 'https://readdy.ai/api/search-image?query=professional+man+finance+controller+confident+editorial+portrait+office+modern&width=600&height=800&seq=sf-marcel-02&orientation=portrait',
  },
  {
    id: 'andrew',
    name: 'Andrew W.',
    role: 'Event and Logistics Manager',
    pullQuote: "„Im Event-Geschäft gibt es kein 'Morgen'. Alles muss heute klappen — und das ist genau das, was mich antreibt.“",
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=professional+man+event+logistics+manager+confident+editorial+portrait+modern+office&width=600&height=800&seq=sf-andrew-03&orientation=portrait',
  },
  {
    id: 'michelle',
    name: 'Michelle G.',
    role: 'Senior Project Manager',
    pullQuote: "„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung und echte Teamarbeit.“",
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
    image: dbImages[3]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+senior+project+manager+confident+editorial+portrait+modern+office&width=600&height=800&seq=sf-michelle-04&orientation=portrait',
  },
  {
    id: 'janina',
    name: 'Janina B.',
    role: 'HR Manager',
    pullQuote: "„Menschen sind das Herzstück von Sonic. Meine Aufgabe ist es, die richtigen Menschen zu finden — und sicherzustellen, dass sie sich hier entfalten können.“",
    bio: 'Janina verantwortet das Human Resources Management bei Sonic. Sie gestaltet Recruiting, Onboarding und Unternehmenskultur so, dass Talente langfristig bleiben.',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+manager+warm+authentic+smile+editorial+portrait+modern+office&width=600&height=800&seq=sf-janina-05&orientation=portrait',
  },
];

export default function SonicFamily() {
  const tBadge   = useText('careers_family', 'careers-family-badge', 'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub     = useText('careers_family', 'careers-family-sub', 'Fünf Geschichten. Eine Überzeugung: Potenzial schlägt Lebenslauf.');
  const tCta     = useText('careers_family', 'careers-family-cta', 'Teil der Geschichte werden');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);

  // Active face — defaults to first one
  const [activeId, setActiveId] = useState<string>(FACES[0].id);
  const active = FACES.find(f => f.id === activeId) ?? FACES[0];

  const headingParts = tHeading.split(' & ');
  const headingMain  = headingParts[0] ?? tHeading;
  const headingAccent = headingParts.length > 1 ? `& ${headingParts.slice(1).join(' & ')}` : '';

  return (
    <section id="spirit" className="bg-white py-20 md:py-[104px] px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader
          n="04"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-[620px]"
        />

        {/* ── Main layout: story panel (top) + name selector (bottom) ── */}
        <div className="flex flex-col gap-0" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>

          {/* Story panel — controlled by selected name below */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '520px' }}>
            {/* Portrait */}
            <div
              className="relative overflow-hidden"
              style={{ background: 'oklch(0.13 0.005 118)', minHeight: '340px' }}
            >
              <img
                key={active.id}
                src={active.image}
                alt={`${active.name} — ${active.role}`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.88) 0%, rgba(10,11,9,0.1) 55%, transparent 100%)' }} />

              {/* Name + role overlay */}
              <div className="absolute left-0 right-0 bottom-0 p-7 md:p-10">

                <p
                  className="font-black text-white leading-none tracking-tight mb-1"
                  style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.03em' }}
                >
                  {active.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-white">{active.role}</span>

                </div>
              </div>
            </div>

            {/* Quote + bio */}
            <div
              className="flex flex-col justify-between p-8 md:p-12"
              style={{ background: 'oklch(0.13 0.005 118)' }}
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-8" style={{ color: 'oklch(0.81 0.19 115)' }}>
                  {active.role}
                </p>
                <i className="ri-double-quotes-l text-3xl mb-5 block" style={{ color: 'oklch(0.81 0.19 115 / 0.35)' }} />
                <blockquote
                  className="font-black leading-[1.28] text-white mb-8"
                  style={{ fontSize: 'clamp(18px,2vw,26px)', letterSpacing: '-0.02em' }}
                >
                  {active.pullQuote}
                </blockquote>
                <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {active.bio}
                </p>
              </div>

              <div
                className="flex items-center gap-3 pt-6 mt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="w-6 h-px flex-1" style={{ background: 'oklch(0.81 0.19 115 / 0.3)' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                  {active.name} · {active.role}
                </span>
              </div>
            </div>
          </div>

          {/* ── Name selector strip (bottom) — clicking reveals story above ── */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${FACES.length}, 1fr)`,
              borderTop: '1px solid oklch(var(--foreground-950) / 0.1)',
            }}
          >
            {FACES.map((face, i) => {
              const isActive = face.id === activeId;
              return (
                <button
                  key={face.id}
                  onClick={() => setActiveId(face.id)}
                  className="flex flex-col items-center justify-center gap-2 py-5 px-3 cursor-pointer transition-all duration-200 focus:outline-none"
                  style={{
                    background: isActive ? 'oklch(0.13 0.005 118)' : '#fff',
                    borderRight: i < FACES.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.1)' : undefined,
                    borderTop: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent',
                  }}
                  aria-pressed={isActive}
                >
                  {/* Small portrait thumbnail */}
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 overflow-hidden flex-shrink-0"
                    style={{ border: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}
                  >
                    <img
                      src={face.image}
                      alt={face.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Name + role */}
                  <div className="text-center hidden sm:block">
                    <p
                      className="font-black leading-none"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '-0.01em',
                        color: isActive ? '#fff' : 'oklch(0.16 0.006 118)',
                      }}
                    >
                      {face.name}
                    </p>
                    <p
                      className="text-[9px] font-bold mt-0.5 uppercase tracking-[0.1em]"
                      style={{ color: isActive ? 'oklch(0.81 0.19 115)' : 'oklch(0.6 0.006 260)' }}
                    >
                      {face.role.split(' · ')[0]}
                    </p>
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="hidden sm:block w-1 h-1"
                      style={{ background: 'oklch(0.81 0.19 115)', borderRadius: '50%' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="border bg-white py-7 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-5 mt-3"
          style={{ borderColor: 'oklch(var(--foreground-950) / 0.08)' }}
        >
          <div className="text-center sm:text-left">
            <p className="text-base font-black text-foreground-950 leading-snug">
              Willst du auch Teil von <Marker>Sonic Spirit &amp; Faces</Marker> werden?
            </p>
            <p className="text-[13px] mt-1.5" style={{ color: 'oklch(0.55 0.006 260)' }}>
              Wir suchen Menschen, die ihre Geschichte teilen — 15 Minuten, ehrliche Fragen, kein Drehbuch.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
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
