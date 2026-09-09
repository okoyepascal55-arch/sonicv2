import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { ChapterHeader, Marker } from './ChapterKit';

type Face = {
  id: string;
  name: string;
  role: string;
  chapter: string;           // "Vom Promotionsjob zur HR Managerin"
  pullQuote: string;
  bio: string;
  closingQuote?: string;
  image: string;
};

const getFaces = (dbImages: { url: string }[]): Face[] => [
  {
    id: 'sascha',
    name: 'Sascha M.',
    role: 'Senior IT Admin',
    chapter: '',
    pullQuote: '„Gute IT ist unsichtbar — und genau das ist das Ziel. Wenn die Systeme laufen, läuft Sonic."',
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
    image: dbImages[0]?.url || 'https://readdy.ai/api/search-image?query=professional+man+IT+administrator+confident+portrait+modern+office+editorial&width=400&height=500&seq=sf-sascha-01&orientation=portrait',
  },
  {
    id: 'marcel',
    name: 'Marcel W.',
    role: 'Finance Controller',
    chapter: '',
    pullQuote: '„Zahlen erzählen Geschichten — man muss nur wissen, wie man sie liest."',
    bio: 'Marcel bringt finanzielle Klarheit in ein schnellwachsendes Unternehmen. Als Finance Controller stellt er sicher, dass Entscheidungen auf verlässlichen Grundlagen getroffen werden.',
    image: dbImages[1]?.url || 'https://readdy.ai/api/search-image?query=professional+man+finance+controller+confident+editorial+portrait+office+modern&width=400&height=500&seq=sf-marcel-02&orientation=portrait',
  },
  {
    id: 'andrew',
    name: 'Andrew W.',
    role: 'Event and Logistics Manager',
    chapter: '',
    pullQuote: '„Im Event-Geschäft gibt es kein \'Morgen\'. Alles muss heute klappen — und das ist genau das, was mich antreibt."',
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=professional+man+event+logistics+manager+confident+editorial+portrait+modern+office&width=400&height=500&seq=sf-andrew-03&orientation=portrait',
  },
  {
    id: 'michelle',
    name: 'Michelle G.',
    role: 'Senior Project Manager',
    chapter: '',
    pullQuote: '„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung und echte Teamarbeit."',
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
    image: dbImages[3]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+senior+project+manager+confident+editorial+portrait+modern+office&width=400&height=500&seq=sf-michelle-04&orientation=portrait',
  },
  {
    id: 'janina',
    name: 'Janina B.',
    role: 'HR Manager',
    chapter: 'Vom Promotionsjob zur HR Managerin',
    pullQuote: '„Eigentlich sollte es nur ein Nebenjob während des Studiums sein. Am Ende wurde daraus mein Karriereweg."',
    bio: 'Als Janina zur Sonic kam, war sie noch Studentin. Den ersten Kontakt zur Agentur hatte sie allerdings schon deutlich früher. Ihr Bruder war bereits seit 2007 für Sonic im Promotionbereich tätig und entwickelte sich später zum Trainer. Über ihn erhielt auch sie die Möglichkeit, während ihres BWL-Studiums mit den Schwerpunkten Personalmanagement und Marketing erste Erfahrungen bei Sonic zu sammeln.\n\nWährend des Studiums war sie regelmäßig für Sonic auf verschiedenen Projekten im Einsatz. Dazu gehörten Promotionjobs auf der IFA in Berlin für Sony, verschiedene Sony-Roadshows sowie Einsätze für Nespresso. Diese Zeit war für sie besonders spannend, da sie nicht nur praktische Erfahrungen sammeln konnte, sondern auch viele unterschiedliche Menschen und Arbeitsbereiche kennenlernte.\n\nEin zufälliges Kennenlernen während einer Roadshow führte schließlich dazu, dass sie sich bei Sonic für das HR-Team bewarb. Was ihr dabei bis heute in Erinnerung geblieben ist: Ihr erstes Kennenlernen mit dem Geschäftsführer verlief alles andere als klassisch. Statt in einem Besprechungsraum fand das Treffen in einer Berliner Kneipe statt. In lockerer Runde mit mehreren Kolleginnen und Kollegen entstand schnell das Gefühl, nicht einfach nur ein Unternehmen kennenzulernen, sondern Menschen. Genau dieser persönliche und unkomplizierte Umgang prägt für sie die Sonic bis heute.\n\nKurz darauf folgte das offizielle Vorstellungsgespräch und 2020 schließlich der Start mit einem Praktikum im Personalbereich. Was zunächst als Praktikum begann, entwickelte sich schnell zu mehr. Eine besonders prägende Phase begann, als eine Kollegin über einen längeren Zeitraum ausfiel — dadurch musste sie früh Verantwortung übernehmen und wurde im wahrsten Sinne des Wortes ins kalte Wasser geworfen. Rückblickend war genau diese Zeit eine der wertvollsten Erfahrungen ihrer bisherigen Laufbahn.\n\nHeute ist Janina für das operative Personalmanagement verantwortlich. Dabei begleitet sie Mitarbeitende und Führungskräfte in allen personalrelevanten Themen und gestaltet aktiv Prozesse und Strukturen mit.',
    closingQuote: '„Karrierewege lassen sich nicht immer planen. Manchmal entstehen sie genau dort, wo Menschen Potenziale erkennen, Vertrauen schenken und Entwicklung ermöglichen."',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional+woman+HR+manager+warm+authentic+smile+editorial+portrait+modern+office&width=400&height=500&seq=sf-janina-05&orientation=portrait',
  },
  {
    id: 'inga',
    name: 'Inga L.',
    role: 'Jr. Art Direktorin',
    chapter: 'Vom Pflichtpraktikum zur kreativen Allrounderin',
    pullQuote: '„Eigentlich sollte es nur ein Praktikum werden. Am Ende wurde daraus mein Karriereweg."',
    bio: 'Als Inga bei Sonic startete, stand zunächst das Studium im Vordergrund. Für ihr Marketing-Management-Studium war ein Pflichtpraktikum erforderlich. Was als Studienanforderung begann, entwickelte sich jedoch schnell zu mehr.\n\nDie Arbeit, das Team und die vielseitigen Projekte überzeugten sie so sehr, dass sie auch nach dem Praktikum neben ihrem Studium bei Sonic blieb. Nach ihrem erfolgreichen Abschluss war der nächste Schritt klar: der Einstieg in eine Vollzeitposition.\n\nHeute ist Inga Teil des Creation Teams und begleitet Projekte von der ersten Idee bis zur Umsetzung. Neben Design- und Marketingthemen verantwortet sie Social-Media-Inhalte, entwickelt kreative Konzepte und unterstützt bei der Planung und Umsetzung von Events.\n\nDabei kennt Inga nicht nur die Agenturseite. Für den Kunden AVOURY war sie selbst als Promoterin im Einsatz, stand direkt mit Kundinnen und Kunden im Austausch und sammelte wertvolle Erfahrungen am Point of Sale. Für verschiedene Projekte führte ihr Weg sogar bis nach Wien. Diese Perspektive hilft ihr heute, Kampagnen nicht nur kreativ zu denken, sondern auch aus Sicht der Menschen zu betrachten, die sie später umsetzen.',
    closingQuote: '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte."',
    image: dbImages[5]?.url || 'https://readdy.ai/api/search-image?query=professional+young+woman+creative+art+director+social+media+confident+editorial+portrait+modern+studio&width=400&height=500&seq=sf-inga-06&orientation=portrait',
  },
];

export default function SonicFamily() {
  const tBadge   = useText('careers_family', 'careers-family-badge',   'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub     = useText('careers_family', 'careers-family-sub',     'Sechs Geschichten. Eine Überzeugung: Potenzial schlägt Lebenslauf.');
  const tCta     = useText('careers_family', 'careers-family-cta',     'Teil der Geschichte werden');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);
  const [activeId, setActiveId] = useState<string>(FACES[0].id);
  const active = FACES.find(f => f.id === activeId) ?? FACES[0];

  const headingParts = tHeading.split(' & ');
  const headingMain   = headingParts[0] ?? tHeading;
  const headingAccent = headingParts.length > 1 ? `& ${headingParts.slice(1).join(' & ')}` : '';

  // Split bio on \n\n for paragraph rendering
  const bioParagraphs = active.bio.split('\n\n').filter(Boolean);

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

        {/* Card — text-first, editorial layout */}
        <div style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>

          {/* Story panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

            {/* Left sidebar — portrait + identity (compact) */}
            <div className="relative flex flex-col" style={{ background: 'oklch(0.13 0.005 118)', minHeight: '280px' }}>
              <img
                key={active.id}
                src={active.image}
                alt={`${active.name}`}
                className="w-full h-full object-cover object-top transition-opacity duration-300 absolute inset-0"
                loading="lazy"
              />
              {/* Gradient for text legibility */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.96) 0%, rgba(10,11,9,0.55) 55%, rgba(10,11,9,0.1) 100%)' }} />

              <div className="relative z-10 mt-auto p-6">
                {/* Chapter title if present */}
                {active.chapter && (
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] mb-2" style={{ color: 'oklch(0.81 0.19 115 / 0.7)' }}>
                    {active.chapter}
                  </p>
                )}
                <p className="font-black text-white text-xl leading-none tracking-tight mb-1">{active.name}</p>
                <p className="text-[11px] text-white/50 font-bold">{active.role}</p>
              </div>
            </div>

            {/* Right — text-first editorial area */}
            <div className="flex flex-col" style={{ background: 'oklch(0.13 0.005 118)' }}>
              <div className="p-7 md:p-10 flex-1 overflow-y-auto" style={{ maxHeight: '520px' }}>

                {/* Opening pull quote — large */}
                <i className="ri-double-quotes-l text-2xl mb-4 block" style={{ color: 'oklch(0.81 0.19 115 / 0.4)' }} />
                <blockquote
                  className="font-black leading-snug text-white mb-7"
                  style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', letterSpacing: '-0.02em' }}
                >
                  {active.pullQuote}
                </blockquote>

                {/* Hairline separator */}
                <div className="mb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                {/* Bio — paragraph by paragraph */}
                <div className="space-y-4">
                  {bioParagraphs.map((para, i) => (
                    <p key={i} className="text-[13px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Closing quote — if present */}
                {active.closingQuote && (
                  <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[13px] leading-relaxed italic font-bold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {active.closingQuote}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 px-7 md:px-10 py-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">
                  {active.name} · {active.role}
                </span>
              </div>
            </div>
          </div>

          {/* Face selector — 6 name tabs */}
          <div
            className="grid grid-cols-3 sm:grid-cols-6"
            style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}
          >
            {FACES.map((face, i) => {
              const isActive = face.id === activeId;
              return (
                <button
                  key={face.id}
                  type="button"
                  onClick={() => setActiveId(face.id)}
                  className="flex flex-col items-center justify-center gap-2 py-4 sm:py-5 px-2 sm:px-3 cursor-pointer transition-all duration-200 focus:outline-none"
                  style={{
                    background: isActive ? 'oklch(0.13 0.005 118)' : 'white',
                    borderRight: (i + 1) % 3 !== 0 && i < FACES.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.1)' : undefined,
                    borderBottom: i < 3 ? '1px solid oklch(var(--foreground-950) / 0.1)' : undefined,
                    borderLeft: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent',
                  }}
                  aria-pressed={isActive}
                  aria-label={`${face.name} — Geschichte lesen`}
                >
                  {/* Portrait thumbnail */}
                  <div className="w-10 h-10 overflow-hidden flex-shrink-0 relative"
                    style={{ border: isActive ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}>
                    <img src={face.image} alt={face.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy" />
                  </div>
                  {/* Name + role */}
                  <div className="text-center">
                    <p className="text-[10px] font-black leading-tight"
                      style={{ color: isActive ? 'oklch(0.81 0.19 115)' : 'oklch(var(--foreground-950))' }}>
                      {face.name.split(' ')[0]}
                    </p>
                    <p className="text-[8px] hidden sm:block leading-tight"
                      style={{ color: isActive ? 'rgba(255,255,255,0.45)' : 'oklch(var(--foreground-500))' }}>
                      {face.role.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
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
