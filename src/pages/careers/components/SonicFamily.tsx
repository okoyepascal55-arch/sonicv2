import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker } from './ChapterKit';

type Face = {
  id: string;
  name: string;
  role: string;
  location: string;
  since: string;
  pullQuote: string;
  bio: string;
  metric: string;
  metricLabel: string;
  image: string;
};

const getFaces = (dbImages: { url: string }[]): Face[] => [
  {
    id: 'hassibullah',
    name: 'Hassibullah',
    role: 'Sales Activator',
    location: 'Bayern',
    since: 'Seit 2016',
    pullQuote: '„Ich kam 2016 ohne ein Wort Deutsch nach Deutschland. Mit viel Ehrgeiz habe ich die IHK-Ausbildung geschafft, bin dann mutig zu Sonic gewechselt — und hier hat man mir nicht nur einen Job gegeben, sondern gezeigt, was möglich ist, wenn Potenzial auf Perspektive trifft."',
    bio: 'Hassibullah kam 2016 nach Deutschland und baute sich durch Einsatz und Ehrgeiz eine Karriere im Retail auf. Bei Sonic fand er ein Team, das auf ihn vertraut — nicht auf seinen Lebenslauf.',
    metric: '127%',
    metricLabel: 'Zielerreichung',
    image: dbImages[0]?.url || 'https://readdy.ai/api/search-image?query=confident+young+man+professional+retail+agency+authentic+portrait+warm+smile+high+contrast&width=600&height=800&seq=sf-01&orientation=portrait',
  },
  {
    id: 'andrew',
    name: 'Andrew',
    role: 'Field Promoter',
    location: 'Bundesweit',
    since: 'Seit 2019',
    pullQuote: '„Nach meiner Auszeit war ich unsicher. Sonic hat mich nicht bewertet — sie haben mich einfach willkommen geheißen."',
    bio: 'Andrew kehrte nach einer persönlichen Auszeit zurück in die Berufswelt. Sonic hat ihn ohne Vorbehalte aufgenommen. Heute ist er bundesweit im Einsatz und hat das Vertrauen zurückgewonnen, das er brauchte.',
    metric: '22',
    metricLabel: 'Städte im Einsatz',
    image: dbImages[1]?.url || 'https://readdy.ai/api/search-image?query=professional+man+event+manager+confident+editorial+portrait+light+background&width=600&height=800&seq=sf-02&orientation=portrait',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Regional Lead · Mentor',
    location: 'NRW',
    since: 'Seit 2018',
    pullQuote: '„Nach meinem Rückschlag hat Sonic auf mich geschaut — nicht auf die Lücke im Lebenslauf. Heute bin ich Regional Lead und Mentor."',
    bio: 'Peter weiß, wie es ist, neu anfangen zu müssen. Sonic gab ihm die Chance — und er hat sie genutzt. Als Regional Lead gibt er heute zurück, was ihm selbst den Neustart ermöglicht hat.',
    metric: '5 J.',
    metricLabel: 'Regional Lead',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=mature+confident+man+regional+manager+leader+editorial+portrait+studio+lighting&width=600&height=800&seq=sf-03&orientation=portrait',
  },
  {
    id: 'tanja',
    name: 'Tanja',
    role: 'Recruiting Lead',
    location: 'Krefeld',
    since: 'Seit 2020',
    pullQuote: '„Ich habe Sonics Recruiting von Grund auf aufgebaut. Hier durfte ich vom ersten Tag an Verantwortung übernehmen."',
    bio: 'Tanja baute das Recruiting-Team von null auf. Unter ihrer Führung wurde Sonic fünfmal als Kununu Top Company ausgezeichnet — ein Ergebnis, das für sich spricht.',
    metric: '98%',
    metricLabel: 'Bewerberzufriedenheit',
    image: dbImages[3]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+recruiter+warm+smile+modern+office+editorial+portrait&width=600&height=800&seq=sf-04&orientation=portrait',
  },
  {
    id: 'janina',
    name: 'Janina',
    role: 'HR Director',
    location: 'Krefeld',
    since: 'Seit 2017',
    pullQuote: '„Mein größter Erfolg ist keine Zahl — es sind die Menschen, die seit Jahren bleiben."',
    bio: 'Janina verantwortet die Unternehmenskultur bei Sonic. Die Ø-Betriebszugehörigkeit von 5,15 Jahren — dreimal über dem Branchendurchschnitt — ist das beste Zeugnis ihrer Arbeit.',
    metric: 'Ø 5,15 J.',
    metricLabel: 'Betriebszugehörigkeit',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+director+executive+poised+elegant+editorial+portrait&width=600&height=800&seq=sf-05&orientation=portrait',
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
                <div
                  className="inline-flex items-center gap-2 mb-4 px-3 py-1.5"
                  style={{ background: 'oklch(0.81 0.19 115)', color: 'oklch(0.16 0.006 118)' }}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{active.metric} {active.metricLabel}</span>
                </div>
                <p
                  className="font-black text-white leading-none tracking-tight mb-1"
                  style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.03em' }}
                >
                  {active.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-white">{active.role}</span>
                  <span className="w-1 h-1 bg-primary-500 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/50">{active.since}</span>
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
                  {active.location} · {active.since}
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
