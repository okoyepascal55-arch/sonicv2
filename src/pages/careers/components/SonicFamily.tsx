import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';

type Face = {
  id: string;
  name: string;
  role: string;
  location: string;
  since: string;
  pullFull: string;
  traits: { num: string; title: string; desc: string }[];
  qa: { q: string; a: string }[];
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
    pullFull: 'Ich kam 2016 ohne ein Wort Deutsch nach Deutschland. Mit viel Ehrgeiz habe ich die IHK-Ausbildung geschafft, bin dann mutig zu Sonic gewechselt — und hier hat man mir nicht nur einen Job gegeben, sondern gezeigt, was möglich ist, wenn Potenzial auf Perspektive trifft.',
    traits: [
      { num: '01', title: 'Ehrgeiz', desc: 'hat sich von null Deutschkenntnissen bis zur IHK-Ausbildung gekämpft.' },
      { num: '02', title: 'Macher-Mentalität', desc: 'packt an, statt lange zu reden.' },
      { num: '03', title: 'Neustart-Mut', desc: 'ist für den Job nach Bayern gezogen — ohne doppelten Boden.' },
      { num: '04', title: 'Verlässlich', desc: 'Vertrauen und Teamgeist als Basis für den Erfolg.' },
    ],
    qa: [
      { q: 'Was hat dich damals zu Sonic geführt?', a: 'Ich kam 2016 ohne Deutschkenntnisse nach Deutschland. Mit viel Ehrgeiz habe ich die IHK-Ausbildung geschafft und bin dann mutig zu Sonic gewechselt — inklusive Umzug nach Bayern.' },
      { q: 'Wie sieht dein Alltag als Sales Activator aus?', a: 'Jeder Tag ist anders. Ich bin beim Kunden, berate und präsentiere — und abends weiß ich genau, was ich erreicht habe.' },
      { q: 'Was gibst du neuen Bewerber:innen mit?', a: 'Deine Einstellung zählt mehr als dein Lebenslauf. Zeig, was du willst — nicht nur, was du kannst.' },
    ],
    metric: '127%',
    metricLabel: 'Zielerreichung',
    image: dbImages[0]?.url || 'https://readdy.ai/api/search-image?query=confident%20young%20man%20professional%20smart%20casual%20clothing%20modern%20retail%20agency%20environment%20authentic%20portrait%20warm%20smile%20editorial%20photography%20light%20cream%20background%20natural%20light%20high%20contrast%20sharp%20commercial%20quality%20portrait%204x5%20aspect%20ratio&width=600&height=800&seq=sf-face-hassibullah-v3&orientation=portrait',
  },
  {
    id: 'andrew',
    name: 'Andrew',
    role: 'Field Promoter',
    location: 'Bundesweit',
    since: 'Seit 2019',
    pullFull: 'Nach meiner Auszeit war ich unsicher. Sonic hat mich nicht bewertet — sie haben mich einfach willkommen geheißen. Vertrauen ist hier keine Frage des Lebenslaufs.',
    traits: [
      { num: '01', title: 'Denkt in Lösungen', desc: 'findet immer einen Weg — oder kennt jemanden, der ihn findet.' },
      { num: '02', title: 'Erfahrung & Neugier', desc: 'Event, Technik und Menschlichkeit in einem.' },
      { num: '03', title: 'Unfassbar sympathisch', desc: 'der geborene Ansprechpartner für alle.' },
      { num: '04', title: 'Fährt (fast) alles', desc: 'wenn es Räder oder einen Motor hat, ist er dabei.' },
    ],
    qa: [
      { q: 'Wie war deine Rückkehr zu Sonic?', a: 'Nach einer gesundheitsbedingten Auszeit war ich unsicher. Sonic hat mich nicht bewertet — sie haben mich einfach willkommen geheißen.' },
      { q: 'Was hat dir in dieser Zeit am meisten geholfen?', a: 'Das Team. Kein Druck, klare Erwartungen — und das Gefühl: Hier zählt der Mensch, nicht nur die Leistung.' },
      { q: 'Was reizt dich am Einsatz im ganzen Land?', a: 'Die Abwechslung. Kein Standort, kein Team, kein Tag ist wie der andere — genau das hält mich in Bewegung.' },
    ],
    metric: '22',
    metricLabel: 'Länder bereist',
    image: dbImages[1]?.url || 'https://readdy.ai/api/search-image?query=professional%20man%20late%2030s%20event%20manager%20confident%20presence%20trade%20show%20exhibition%20creative%20agency%20atmosphere%20editorial%20portrait%20photography%20light%20cream%20background%20sharp%20detail%20authentic%20natural%20expression%20portrait%204x5&width=600&height=800&seq=sf-face-andrew-v3&orientation=portrait',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Regional Lead · Mentor',
    location: 'NRW',
    since: 'Seit 2018',
    pullFull: 'Nach meinem Rückschlag hat Sonic auf mich geschaut — nicht auf die Lücke im Lebenslauf. Heute bin ich Regional Lead und gebe als Mentor genau das zurück, was mir selbst den Neustart ermöglicht hat.',
    traits: [
      { num: '01', title: 'Kämpfernatur', desc: 'gibt nie auf und zieht andere mit seiner Energie mit.' },
      { num: '02', title: 'Neustart-Mentalität', desc: 'hat bewiesen, dass ein Rückschlag keine Endstation ist.' },
      { num: '03', title: 'Mentor aus Leidenschaft', desc: 'gibt weiter, was ihm selbst den Neustart ermöglicht hat.' },
      { num: '04', title: 'Überzeugend', desc: 'Fachwissen trifft auf echte Menschenkenntnis.' },
    ],
    qa: [
      { q: 'Wie hast du dich nach dem Rückschlag neu aufgestellt?', a: 'Sonic hat auf die Person geschaut, nicht auf den Rückschlag. Ich hatte den Raum, mich wieder aufzubauen — genau das war der Unterschied.' },
      { q: 'Was bedeutet dir deine Rolle als Mentor?', a: 'Ich kann weitergeben, was mir selbst geholfen hat. Wenn jemand an einer Herausforderung wächst, ist das die größte Bestätigung.' },
      { q: 'Was rätst du jemandem, der gerade einen Rückschlag erlebt hat?', a: 'Nicht an sich selbst zweifeln. Eine Station im Lebenslauf sagt nichts darüber aus, wer du bist — deine Haltung schon.' },
    ],
    metric: '5J.',
    metricLabel: 'Regional Lead',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=mature%20confident%20man%2040s%20regional%20manager%20leader%20strong%20composed%20presence%20modern%20office%20building%20environment%20editorial%20portrait%20photography%20high%20contrast%20dramatic%20side%20lighting%20light%20cream%20background%20sharp%20detail%20authoritative%20portrait%204x5&width=600&height=800&seq=sf-face-peter-v3&orientation=portrait',
  },
  {
    id: 'tanja',
    name: 'Tanja',
    role: 'Recruiting Lead',
    location: 'Krefeld',
    since: 'Seit 2020',
    pullFull: 'Ich habe Sonics Recruiting von Grund auf aufgebaut. Hier durfte ich vom ersten Tag an Verantwortung übernehmen — heute stehen wir fünfmal als Kununu Top Company da.',
    traits: [
      { num: '01', title: 'Aufgebaut', desc: 'hat Sonics Recruiting von Grund auf entwickelt.' },
      { num: '02', title: 'Menschenkennerin', desc: 'spürt sofort, wer wirklich ins Team passt.' },
      { num: '03', title: 'Strukturiert', desc: 'klare Prozesse, persönliche Betreuung.' },
      { num: '04', title: 'Ausgezeichnet', desc: 'fünfmal Kununu Top Company unter ihrer Leitung.' },
    ],
    qa: [
      { q: 'Was macht den Campus Krefeld besonders?', a: 'Die Atmosphäre. Kurze Wege, echte Gesichter. Du läufst morgens rein und weißt sofort, wen du heute siehst.' },
      { q: 'Wie sieht dein Alltag im Recruiting aus?', a: 'Kein Tag ist gleich. Ich koordiniere, organisiere und bin Ansprechpartnerin — für das Team genauso wie für externe Partner.' },
      { q: 'Woran erkennst du, dass jemand wirklich zu Sonic passt?', a: 'An der Einstellung. Fachliches lässt sich lernen — aber Energie, Sympathie und der Wille anzupacken müssen von Anfang an da sein.' },
    ],
    metric: '98%',
    metricLabel: 'Bewerberzufriedenheit',
    image: dbImages[3]?.url || 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20recruiter%20warm%20authentic%20smile%20modern%20office%20creative%20agency%20bright%20natural%20environment%20editorial%20portrait%20photography%20natural%20light%20clean%20light%20cream%20background%20sharp%20detail%20professional%20yet%20approachable%20portrait%204x5&width=600&height=800&seq=sf-face-tanja-v3&orientation=portrait',
  },
  {
    id: 'janina',
    name: 'Janina',
    role: 'HR Director',
    location: 'Krefeld',
    since: 'Seit 2017',
    pullFull: 'Mein größter Erfolg ist keine Zahl — es sind die Menschen, die seit Jahren bleiben. 5,15 Jahre im Schnitt, dreimal über dem Branchendurchschnitt. Das ist gelebte Kultur.',
    traits: [
      { num: '01', title: 'Kultur gestaltet', desc: 'eine Arbeitskultur, die Talente hält und fördert.' },
      { num: '02', title: 'Strategisch', desc: 'HR als Treiber fürs Business, nicht als Verwaltung.' },
      { num: '03', title: 'Menschlich', desc: 'immer ein offenes Ohr für das Team.' },
      { num: '04', title: 'Kultur, die hält', desc: 'Ø 5,15 Jahre Betriebszugehörigkeit — dreimal Branchenschnitt.' },
    ],
    qa: [
      { q: 'Was war dein größter Erfolg bei Sonic?', a: 'Dass die Betriebszugehörigkeit dreimal über dem Branchenschnitt liegt. Das ist kein Zufall — es ist das Ergebnis gelebter Kultur.' },
      { q: 'Was macht Sonic als Arbeitgeber einzigartig?', a: 'Hier darfst du wirklich Verantwortung übernehmen — von Anfang an. Das ist selten und unglaublich wertvoll.' },
      { q: 'Woran misst du, ob die Kultur funktioniert?', a: 'Daran, dass Menschen bleiben und wachsen. Wenn jemand nach Jahren noch mit Energie zur Arbeit kommt, stimmt die Kultur.' },
    ],
    metric: 'Ø 5,15J.',
    metricLabel: 'Betriebszugehörigkeit',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20director%20executive%20poised%20elegant%20confident%20modern%20corporate%20environment%20editorial%20portrait%20photography%20dramatic%20soft%20studio%20lighting%20light%20cream%20background%20sharp%20detail%20professional%20polished%20portrait%204x5&width=600&height=800&seq=sf-face-janina-v3&orientation=portrait',
  },
];

export default function SonicFamily() {
  const [idx, setIdx] = useState(0);
  const [expandedQA, setExpandedQA] = useState<number[]>([]);

  const tBadge = useText('careers_family', 'careers-family-badge', 'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub = useText('careers_family', 'careers-family-sub', 'Persönliche Geschichten, ehrliche Interviews und die Werte, die unsere Kultur ausmachen.');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);
  const face = FACES[idx];

  const goTo = (i: number) => {
    if (i === idx) return;
    setExpandedQA([]);
    setIdx(i);
  };

  const toggleQA = (qi: number) => {
    setExpandedQA((prev) =>
      prev.includes(qi) ? prev.filter((i) => i !== qi) : [...prev, qi]
    );
  };

  return (
    <section id="spirit" className="py-[88px] px-8" style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="max-w-[640px] mb-11">
          <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
            <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
            {tBadge}
          </div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
            {tHeading.split(' & ')[0] || 'Sonic Spirit'}{' '}
            <span className="text-[#C3D62A]">& {tHeading.includes('&') ? tHeading.split('& ').slice(1).join('& ') : 'Faces'}</span>
          </h2>
          <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">{tSub}</p>
        </div>

        {/* Story card */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.55fr_1fr] bg-white  overflow-hidden border border-[#E7E4D4]">
          {/* Avatar panel */}
          <div
            className="relative flex items-end p-5 md:p-7 min-h-[320px] lg:min-h-[420px]"
            style={{
              background: 'linear-gradient(160deg, #1A1A1B, #0B0B0C)',
            }}
          >
            {/* Portrait image */}
            <div className="absolute top-[30px] left-[30px] right-[30px] bottom-[100px]  overflow-hidden">
              <img
                key={face.id}
                src={face.image}
                alt={face.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/70 via-transparent to-transparent" />
            </div>

            {/* Name overlay */}
            <div className="relative z-10">
              <div className="text-[#DCE94D] text-xs font-bold uppercase tracking-[0.05em]">
                {face.role}
              </div>
              <div className="font-black text-[20px] text-white mt-1">
                {face.name}
              </div>
              <div className="text-[#8F8F89] text-xs mt-1.5">
                {face.location} · {face.since}
              </div>
            </div>
          </div>

          {/* Story body */}
          <div className="p-5 md:p-9">
            {/* Lead quote */}
            <div className="bg-[#FAFDF5]  p-5 text-sm leading-[1.6] text-[#0B0B0C] mb-6">
              {face.pullFull}
            </div>

            {/* Q&A */}
            <div className="flex flex-col mb-5">
              {face.qa.map((item, qi) => {
                const isOpen = expandedQA.includes(qi);
                return (
                  <div key={qi} className="border-t border-[#E7E4D4]">
                    <button
                      className="w-full flex items-center justify-between py-3.5 text-left cursor-pointer"
                      onClick={() => toggleQA(qi)}
                    >
                      <span className="text-sm font-semibold text-[#0B0B0C] pr-4">
                        {item.q}
                      </span>
                      <span className="text-[#C3D62A] font-black text-xs flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className={`text-xs leading-relaxed text-[#9A9A93] pb-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-3.5 my-5">
              {face.traits.map((trait, ti) => (
                <div key={ti}>
                  <div className="text-[11px] text-[#C3D62A] font-black mb-0.5">
                    {trait.num}
                  </div>
                  <h5 className="text-[13px] font-bold text-[#0B0B0C] mb-0.5">
                    {trait.title}
                  </h5>
                  <p className="text-xs text-[#9A9A93] leading-relaxed">
                    {trait.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Metric badge */}
            <div className="inline-flex items-center gap-2.5 bg-[#0B0B0C] text-[#DCE94D]  px-4.5 py-3">
              <b className="text-[18px] font-black">{face.metric}</b>
              <span className="text-[11px] text-[#B5B5AF] uppercase block">{face.metricLabel}</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#E7E4D4]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo((idx - 1 + FACES.length) % FACES.length)}
                  className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer transition-all duration-200 hover:bg-[#0B0B0C] hover:text-white border border-[#E7E4D4] text-[#9A9A93]"
                  aria-label="Vorherige Person"
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <span className="text-[11px] text-[#9A9A93] font-mono tabular-nums min-w-[28px] text-center">
                  {idx + 1}/{FACES.length}
                </span>
                <button
                  onClick={() => goTo((idx + 1) % FACES.length)}
                  className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer transition-all duration-200 hover:bg-[#0B0B0C] hover:text-white border border-[#E7E4D4] text-[#9A9A93]"
                  aria-label="Nächste Person"
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                {FACES.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => goTo(i)}
                    className="transition-all duration-300 cursor-pointer"
                    aria-label={f.name}
                    style={{
                      width: i === idx ? '20px' : '5px',
                      height: '5px',
                      background: i === idx ? '#DCE94D' : 'rgba(0,0,0,0.12)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0C]  p-6 md:p-7">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Willst du auch Teil von Sonic Spirit &amp; Faces werden?</h4>
            <p className="text-xs text-white/35 max-w-lg">
              Wir suchen Menschen, die Lust haben, ihre Geschichte und Persönlichkeit zu teilen — 15 Minuten, ehrliche Fragen, kein Drehbuch.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 hover:bg-[#C3D62A] whitespace-nowrap bg-[#DCE94D] text-[#0B0B0C] "
          >
            Jetzt mitmachen <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}