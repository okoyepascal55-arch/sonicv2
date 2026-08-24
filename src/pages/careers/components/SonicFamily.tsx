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
  pullFull: string;
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
    pullFull: '„Ich kam 2016 ohne ein Wort Deutsch nach Deutschland. Mit viel Ehrgeiz habe ich die IHK-Ausbildung geschafft, bin dann mutig zu Sonic gewechselt — und hier hat man mir nicht nur einen Job gegeben, sondern gezeigt, was möglich ist, wenn Potenzial auf Perspektive trifft."',
    metric: '127% Zielerreichung',
    metricLabel: '',
    image: dbImages[0]?.url || 'https://readdy.ai/api/search-image?query=confident%20young%20man%20professional%20smart%20casual%20clothing%20modern%20retail%20agency%20environment%20authentic%20portrait%20warm%20smile%20editorial%20photography%20light%20cream%20background%20natural%20light%20high%20contrast%20sharp%20commercial%20quality%20portrait%204x5%20aspect%20ratio&width=600&height=800&seq=sf-face-hassibullah-v3&orientation=portrait',
  },
  {
    id: 'andrew',
    name: 'Andrew',
    role: 'Field Promoter',
    location: 'Bundesweit',
    since: 'Seit 2019',
    pullFull: '„Nach meiner Auszeit war ich unsicher. Sonic hat mich nicht bewertet — sie haben mich einfach willkommen geheißen. Vertrauen ist hier keine Frage des Lebenslaufs."',
    metric: '22 Länder bereist',
    metricLabel: '',
    image: dbImages[1]?.url || 'https://readdy.ai/api/search-image?query=professional%20man%20late%2030s%20event%20manager%20confident%20presence%20trade%20show%20exhibition%20creative%20agency%20atmosphere%20editorial%20portrait%20photography%20light%20cream%20background%20sharp%20detail%20authentic%20natural%20expression%20portrait%204x5&width=600&height=800&seq=sf-face-andrew-v3&orientation=portrait',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Regional Lead · Mentor',
    location: 'NRW',
    since: 'Seit 2018',
    pullFull: '„Nach meinem Rückschlag hat Sonic auf mich geschaut — nicht auf die Lücke im Lebenslauf. Heute bin ich Regional Lead und gebe als Mentor genau das zurück, was mir selbst den Neustart ermöglicht hat."',
    metric: '5 J. Regional Lead',
    metricLabel: '',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=mature%20confident%20man%2040s%20regional%20manager%20leader%20strong%20composed%20presence%20modern%20office%20building%20environment%20editorial%20portrait%20photography%20high%20contrast%20dramatic%20side%20lighting%20light%20cream%20background%20sharp%20detail%20authoritative%20portrait%204x5&width=600&height=800&seq=sf-face-peter-v3&orientation=portrait',
  },
  {
    id: 'tanja',
    name: 'Tanja',
    role: 'Recruiting Lead',
    location: 'Krefeld',
    since: 'Seit 2020',
    pullFull: '„Ich habe Sonics Recruiting von Grund auf aufgebaut. Hier durfte ich vom ersten Tag an Verantwortung übernehmen — heute stehen wir fünfmal als Kununu Top Company da."',
    metric: '98% Bewerberzufriedenheit',
    metricLabel: '',
    image: dbImages[3]?.url || 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20recruiter%20warm%20authentic%20smile%20modern%20office%20creative%20agency%20bright%20natural%20environment%20editorial%20portrait%20photography%20natural%20light%20clean%20light%20cream%20background%20sharp%20detail%20professional%20yet%20approachable%20portrait%204x5&width=600&height=800&seq=sf-face-tanja-v3&orientation=portrait',
  },
  {
    id: 'janina',
    name: 'Janina',
    role: 'HR Director',
    location: 'Krefeld',
    since: 'Seit 2017',
    pullFull: '„Mein größter Erfolg ist keine Zahl — es sind die Menschen, die seit Jahren bleiben. 5,15 Jahre im Schnitt, dreimal über dem Branchendurchschnitt. Das ist gelebte Kultur."',
    metric: 'Ø 5,15 J. Betriebszugehörigkeit',
    metricLabel: '',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20director%20executive%20poised%20elegant%20confident%20modern%20corporate%20environment%20editorial%20portrait%20photography%20dramatic%20soft%20studio%20lighting%20light%20cream%20background%20sharp%20detail%20professional%20polished%20portrait%204x5&width=600&height=800&seq=sf-face-janina-v3&orientation=portrait',
  },
];

export default function SonicFamily() {
  const tBadge = useText('careers_family', 'careers-family-badge', 'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'Sonic Spirit & Faces');
  const tSub = useText('careers_family', 'careers-family-sub', 'Persönliche Geschichten, ehrliche Interviews und die Werte, die unsere Kultur ausmachen.');
  const tCta = useText('careers_family', 'careers-family-cta', 'Jetzt mitmachen');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);

  const headingParts = tHeading.split(' & ');
  const headingMain = headingParts[0] ?? tHeading;
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FACES.map((face) => (
            <div key={face.id} className="bg-white flex flex-col" style={{ border: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
              <div className="relative h-[232px] overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)' }}>
                <img src={face.image} alt={`${face.name} — ${face.role}`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.85) 0%, rgba(10,11,9,0.05) 55%, transparent 100%)' }} />
                <div className="absolute left-0 right-0 bottom-0 p-4">
                  <p className="text-xl font-black leading-none tracking-[-0.025em] text-white mb-1">{face.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">{face.role}</p>
                </div>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                <p className="text-[13px] leading-[1.65]" style={{ color: 'oklch(var(--foreground-500))' }}>{face.pullFull}</p>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: 'oklch(var(--foreground-400))' }}>
                    {face.location} · {face.since}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-black tracking-[-0.01em] text-foreground-950" style={{ background: 'oklch(var(--primary-500) / 0.9)' }}>
                    {face.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 border py-7 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-5" style={{ borderColor: 'oklch(var(--foreground-950) / 0.1)', background: 'oklch(var(--background-100))' }}>
          <div className="text-center sm:text-left">
            <p className="text-lg font-black text-foreground-950 leading-snug">
              Willst du auch Teil von <Marker>Sonic Spirit &amp; Faces</Marker> werden?
            </p>
            <p className="text-[13px] mt-1.5" style={{ color: 'oklch(var(--foreground-500))' }}>
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
