import { useState, useCallback } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

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
    pullFull: '„Nach meiner Auszeit war ich unsicher. Sonic hat mich nicht bewertet — sie haben mich einfach willkommen geheißen. Vertrauen ist hier keine Frage des Lebenslaufs."',
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
    pullFull: '„Nach meinem Rückschlag hat Sonic auf mich geschaut — nicht auf die Lücke im Lebenslauf. Heute bin ich Regional Lead und gebe als Mentor genau das zurück, was mir selbst den Neustart ermöglicht hat."',
    metric: '5 J.',
    metricLabel: 'Regional Lead',
    image: dbImages[2]?.url || 'https://readdy.ai/api/search-image?query=mature%20confident%20man%2040s%20regional%20manager%20leader%20strong%20composed%20presence%20modern%20office%20building%20environment%20editorial%20portrait%20photography%20high%20contrast%20dramatic%20side%20lighting%20light%20cream%20background%20sharp%20detail%20authoritative%20portrait%204x5&width=600&height=800&seq=sf-face-peter-v3&orientation=portrait',
  },
  {
    id: 'tanja',
    name: 'Tanja',
    role: 'Recruiting Lead',
    location: 'Krefeld',
    since: 'Seit 2020',
    pullFull: '„Ich habe Sonics Recruiting von Grund auf aufgebaut. Hier durfte ich vom ersten Tag an Verantwortung übernehmen — heute stehen wir fünfmal als Kununu Top Company da."',
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
    pullFull: '„Mein größter Erfolg ist keine Zahl — es sind die Menschen, die seit Jahren bleiben. 5,15 Jahre im Schnitt, dreimal über dem Branchendurchschnitt. Das ist gelebte Kultur."',
    metric: 'Ø 5,15 J.',
    metricLabel: 'Betriebszugehörigkeit',
    image: dbImages[4]?.url || 'https://readdy.ai/api/search-image?query=professional%20woman%20HR%20director%20executive%20poised%20elegant%20confident%20modern%20corporate%20environment%20editorial%20portrait%20photography%20dramatic%20soft%20studio%20lighting%20light%20cream%20background%20sharp%20detail%20professional%20polished%20portrait%204x5&width=600&height=800&seq=sf-face-janina-v3&orientation=portrait',
  },
];

export default function SonicFamily() {
  const [idx, setIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const tBadge = useText('careers_family', 'careers-family-badge', 'Echte Menschen. Echte Geschichten.');
  const tHeading = useText('careers_family', 'careers-family-heading', 'SONIC SPIRIT & FACES');
  const tSub = useText('careers_family', 'careers-family-sub', 'Persönliche Geschichten, ehrliche Interviews und die Werte, die unsere Kultur ausmachen.');
  const tCta = useText('careers_family', 'careers-family-cta', 'Jetzt mitmachen');

  const { images: dbImages } = useMediaStore('careers_sonicfamily_images');
  const FACES = getFaces(dbImages);
  const face = FACES[idx];

  const goTo = useCallback(
    (i: number) => {
      if (i === idx) return;
      setTransitioning(true);
      setTimeout(() => {
        setIdx(i);
        setTransitioning(false);
      }, 240);
    },
    [idx]
  );

  const headingParts = tHeading.split(' & ');
  const headingMain = headingParts[0] ?? tHeading;
  const headingAccent = headingParts.length > 1 ? `& ${headingParts.slice(1).join(' & ')}` : '';

  return (
    <section id="spirit" className="sonic-section-lg relative bg-white overflow-hidden">
      <div className="max-w-full max-w-[1280px] mx-auto px-6 md:px-10">
        {/* ── HEADER ── */}
        <div className="max-w-full max-w-[640px] mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-[7px] mb-5" style={{ background: 'oklch(var(--primary-500) / 0.12)', border: '1px solid oklch(var(--primary-500) / 0.28)' }}>
            <span className="w-1.5 h-1.5 flex-shrink-0" style={{ background: 'oklch(var(--primary-500))' }} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: 'oklch(var(--primary-500))' }}>{tBadge}</span>
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            {headingMain}{' '}
            {headingAccent && <span className="text-primary-500">{headingAccent}</span>}
          </h2>
          <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-full max-w-[520px]">{tSub}</p>
        </div>

        {/* ── SPLIT CARD (portrait + dark panel) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white border border-[#E7E4D4] overflow-hidden">
          {/* Left — full-bleed portrait */}
          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] bg-foreground-950">
            <img
              key={`face-${face.id}`}
              src={face.image}
              alt={`${face.name} — ${face.role}`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
                transitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {face.role}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="text-[clamp(36px,4.2vw,54px)] font-black text-white leading-none tracking-tight">
                {face.name}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-500" />
                <span className="text-sm font-black text-white">{face.location}</span>
                <span className="w-1 h-1 bg-primary-500/50" />
                <span className="text-xs text-white/50 font-bold uppercase tracking-wider">{face.since}</span>
              </div>
            </div>
          </div>

          {/* Right — dark ink panel */}
          <div className="bg-foreground-950 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-5">
                {String(idx + 1).padStart(2, '0')} / {String(FACES.length).padStart(2, '0')}
              </div>

              <blockquote
                key={`quote-${idx}`}
                className="text-xl md:text-2xl font-black text-white leading-[1.4] mb-7"
              >
                {face.pullFull}
              </blockquote>

              <div className="inline-flex items-baseline gap-3 border border-white/10 px-5 py-4">
                <span className="text-3xl font-black text-primary-500 leading-none tabular-nums">{face.metric}</span>
                <span className="text-[11px] text-white/45 font-bold uppercase tracking-wider">{face.metricLabel}</span>
              </div>
            </div>

            {/* Footer nav */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo((idx - 1 + FACES.length) % FACES.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Vorherige Geschichte"
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <button
                  onClick={() => goTo((idx + 1) % FACES.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Nächste Geschichte"
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.06em] text-white/30">
                {face.role}
              </span>
            </div>
          </div>
        </div>

        {/* ── Face selector ── */}
        <div className="mt-6 border border-[#E7E4D4] bg-white p-2 md:p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {FACES.map((f, i) => {
              const isActive = i === idx;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2.5 p-2 text-left cursor-pointer transition-colors duration-200 border ${
                    isActive
                      ? 'bg-foreground-950 border-[#0B0B0C]'
                      : 'bg-white border-transparent hover:border-primary-500/50'
                  }`}
                >
                  <div className="w-9 h-9 overflow-hidden flex-shrink-0">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-black truncate ${isActive ? 'text-white' : 'text-foreground-950'}`}>
                      {f.name}
                    </div>
                    <div className={`text-[10px] uppercase tracking-wide truncate ${isActive ? 'text-primary-500' : 'text-foreground-400'}`}>
                      {f.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className="sonic-container mt-8 md:mt-10">
          <div className="border border-[#E7E4D4] py-6 md:py-7 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5]">
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-[15px] font-black text-foreground-950 leading-relaxed">
                Willst du auch Teil von <span className="text-primary-500">Sonic Spirit &amp; Faces</span> werden?
              </p>
              <p className="text-xs text-[#6E6E68] mt-1 hidden sm:block">
                Wir suchen Menschen, die ihre Geschichte teilen — 15 Minuten, ehrliche Fragen, kein Drehbuch.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-foreground-950 text-white px-6 py-3 font-black hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-300 whitespace-nowrap cursor-pointer text-xs flex-shrink-0"
            >
              <i className="ri-user-add-line text-sm" />
              {tCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}