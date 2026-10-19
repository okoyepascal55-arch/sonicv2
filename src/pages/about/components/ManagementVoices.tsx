import type { MediaItem } from '@/lib/mediaStore';
import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useText, useTextSection } from '@/hooks/useText';
import { useCtaText } from '@/hooks/useCtaText';
import VoicesShowcase, { VoicesCta, markLastWord, type Voice } from '@/components/feature/VoicesShowcase';
import { Marker } from '@/pages/careers/components/ChapterKit';

type DoingItem = { label: string; text: string; alt?: string };

const EXECUTIVES = [
  {
    id: 'bjorn',
    name: 'Björn Bourdin',
    title: 'Geschäftsführer',
    tag: 'Strategie · Führung',
    tenure: 'Seit 2010',
    eyebrow: 'Vision. Strategie. Führung.',
    pullQuote: '„Wer die Fakten kennt und das Team versteht, trifft keine schlechten Entscheidungen — nur mutige.“',
    bio: '',
    doing: [
      { label: 'Doing Things', text: 'Daten liefern die Fakten, Menschen den Unterschied. Alle \u201eThings\u201c die mit Daten oder mit Menschen zu tun haben und die Herausforderungen unserer Kunden lösen, sind unsere Spielwiese.' },
      { label: 'Doing Things Better', text: "Nobody's perfect und auch wir m\u00fcssen unser \u201eDoing\u201c t\u00e4glich hinterfragen bzw. optimieren, damit wir in dem was wir tun, noch besser werden." },
      { label: 'Doing New Things', text: 'Der \u201eStrategic Plan\u201c wird nur dann funktionieren, wenn wir bereit sind, Gewohntes zu verlassen, neue Chancen zu erkennen und mutig neue Wege zu gehen. Innovation ist kein Zufall, sondern eine Einstellung.' },
    ] as DoingItem[],
    // 200+ / DACH already run in the page ticker above — not repeated here (flow review 30.09.2026)
    metrics: [] as { value: string; label: string }[],
    linkedin: 'https://www.linkedin.com/in/bj%C3%B6rn-bourdin-33100b3/',
    image: '', // fallback removed — deleted images must stay deleted
  },
  {
    id: 'jo',
    name: 'Jo Heitkämper',
    title: 'Leiter Vertrieb',
    tag: 'Vertrieb · Wachstum',
    tenure: 'Seit 2007',
    eyebrow: 'Wachstum. Markt. Dynamik.',
    pullQuote: '„Projekte scheitern selten an Ideen, sondern daran, dass Beteiligte aneinander vorbeiarbeiten. Deshalb betrachten wir jede Herausforderung gleichzeitig aus Sicht von Endkunden, Handel, Mitarbeitern und Auftraggebern. Wir tun Dinge, um erfolgreich zu sein – nicht, um beschäftigt zu sein.“',
    bio: '',
    doing: [
      { label: 'Doing Things', text: 'Projekte scheitern selten an Ideen, sondern daran, dass Beteiligte aneinander vorbeiarbeiten. Deshalb betrachten wir jede Herausforderung gleichzeitig aus Sicht von Endkunden, Handel, Mitarbeitern und Auftraggebern. Wir tun Dinge, um erfolgreich zu sein – nicht, um beschäftigt zu sein.', alt: 'Ausführung schlägt Idee. Wir synchronisieren Perspektiven, damit Maßnahmen Wirkung erzeugen.' },
      { label: 'Doing Things Better', text: 'Neue Ideen allein schaffen keinen Mehrwert. Entscheidend ist, wie konsequent sie in bestehende Strukturen integriert und im Alltag wirksam werden. Neue Dinge ergeben nur dann Sinn, wenn sie funktionieren und in Prozesse überführt werden.', alt: 'Integration schlägt Innovation. Nur skalierbare, prozessfähige Lösungen schaffen Mehrwert.' },
      { label: 'Doing New Things', text: 'Automation durch Algorithmen, Analysen durch KI, Umsetzung über die SRT. Wir automatisieren nicht, um Menschen zu ersetzen, sondern um ihnen Zeit für Beratung und bessere Entscheidungen zu geben. Erfahrung bleibt entscheidend, um Ergebnisse einzuordnen und Fehler zu erkennen.', alt: 'Technologie erhöht Output, ersetzt aber keine Entscheidung. Wirkung entsteht durch Erfahrung.' },
    ] as DoingItem[],
    metrics: [
      { value: '€2 Mrd.', label: 'Beeinflusster Umsatz' },
      { value: 'Seit 2007', label: 'bei Sonic' },
    ],
    linkedin: 'https://www.linkedin.com/in/jo-heitk%C3%A4mper-81522260/',
    image: '', // fallback removed — deleted images must stay deleted
  },
  {
    id: 'lucas',
    name: 'Lucas Kreiten',
    title: 'Leiter Finanzen',
    tag: 'Finanzen · Strategie',
    tenure: 'Seit 2019',
    eyebrow: 'Zahlen. Struktur. Weitblick.',
    pullQuote: '„Finance ist heute die zentrale Steuerungsfunktion, die Entscheidungen vorbereitet, Prozesse gestaltet und Digitalisierung vorantreibt. Wir stehen dabei nicht neben dem operativen Geschäft — wir sind ein aktiver Teil davon.“',
    bio: '',
    doing: [
      { label: 'Doing Things', text: 'Alles beginnt mit klaren Rollen, klaren Abläufen, klaren Zahlen. Wir schaffen Transparenz über Ergebnisse, Prozesse und Zusammenhänge – als verlässliches Fundament, auf dem gute Entscheidungen und starke Teams überhaupt erst möglich werden.' },
      { label: 'Doing Things Better', text: 'Erst auf diesem stabilen Fundament kann Qualität entstehen. Daher entwickeln wir Prozesse, Strukturen und Steuerungslogiken kontinuierlich weiter, um aus guter Arbeit exzellente Ergebnisse werden zu lassen – und aus einzelnen Verbesserungen ein System, das dauerhaft trägt.' },
      { label: 'Doing New Things', text: 'Innovation beginnt dort, wo Mut auf Verantwortung trifft. Sonic ist ein Ort an dem neue Ideen nicht nur gedacht, sondern auch umgesetzt werden können.' },
    ] as DoingItem[],
    metrics: [
      { value: '2019', label: 'Finance-Aufbau' },
      { value: 'aktiv', label: 'Gestalter' },
    ],
    linkedin: 'https://www.linkedin.com/in/lucas-kreiten/',
    image: '', // fallback removed — deleted images must stay deleted
  },
];

// Name tokens used to find each executive's portrait in the dashboard media
// section. Matched as whole words, so "jo" never matches inside other words.
const PORTRAIT_NAME_TOKENS: Record<string, string[]> = {
  bjorn: ['björn', 'bjoern', 'bjorn', 'bourdin'],
  jo: ['jo', 'heitkämper', 'heitkaemper', 'heitkamper'],
  lucas: ['lucas', 'kreiten'],
};

function portraitWords(raw: string): Set<string> {
  let text = raw;
  try { text = decodeURIComponent(raw); } catch { /* keep raw */ }
  return new Set(text.normalize('NFC').toLowerCase().split(/[^a-zäöüß]+/).filter(Boolean));
}

export default function ManagementVoices({ leadershipImages }: { leadershipImages?: MediaItem[] }) {
  const tBadge   = useText('about_management_voices', 'about-voices-badge',   'Führungsperspektiven');
  const tHeading = useText('about_management_voices', 'about-voices-heading', 'Die Stimmen hinter Sonic.');
  const tSub     = useText('about_management_voices', 'about-voices-sub',     'Strategie, Kreation und Betrieb — drei Perspektiven, eine Überzeugung.');

  // Dashboard → Text → Stimmen & Gesichter → Tab „Über uns“
  const tCtaText   = useText('about_management_voices', 'about-voices-cta-text',   'Wie kann Sonic deine');
  const tCtaAccent = useText('about_management_voices', 'about-voices-cta-accent', 'Marke unterstützen?');
  const tCtaSub    = useText('about_management_voices', 'about-voices-cta-sub',    'Unabhängige Agentur — B2B, B2B2C & D2C');
  const cta        = useCtaText();
  const tCtaBtn    = cta.book;

  const bjornText = useTextSection('management_voice_bjorn');
  const joText    = useTextSection('management_voice_jo');
  const lucasText = useTextSection('management_voice_lucas');

  // Overlay dashboard text onto the static defaults (empty/missing → default,
  // except bio which may be intentionally cleared to hide it).
  const applyText = (exec: typeof EXECUTIVES[0], t: Record<string, string>) => {
    const pick = (key: string, fallback: string) => (t[`${exec.id}-${key}`]?.trim() ? t[`${exec.id}-${key}`] : fallback);
    return {
      ...exec,
      name: pick('name', exec.name),
      title: pick('title', exec.title),
      tenure: pick('tenure', exec.tenure),
      linkedin: pick('linkedin', exec.linkedin),
      eyebrow: pick('eyebrow', exec.eyebrow),
      pullQuote: pick('pullquote', exec.pullQuote),
      bio: t[`${exec.id}-bio`] ?? exec.bio,
      doing: exec.doing.map((d, i) => ({
        ...d,
        label: pick(`doing-${i + 1}-label`, d.label),
        text: pick(`doing-${i + 1}`, d.text),
      })),
      // A metric cleared in the dashboard is hidden (not replaced by the default).
      metrics: exec.metrics
        .map((m, i) => {
          const vKey = `${exec.id}-metric-${i + 1}-value`;
          return {
            value: vKey in t ? (t[vKey] ?? '').trim() : m.value,
            label: pick(`metric-${i + 1}-label`, m.label),
          };
        })
        .filter((m) => m.value !== ''),
    };
  };

  const resolvedExecs = [
    applyText(EXECUTIVES[0], bjornText),
    applyText(EXECUTIVES[1], joText),
    applyText(EXECUTIVES[2], lucasText),
  ];

  // Match portraits strictly by the person's own name tokens (file name or
  // caption). No position-based fallback: if a person's photo is deleted, they
  // get NO photo rather than someone else's (previously Jo inherited slot 2,
  // which was one of Björn's photos).
  const execs = resolvedExecs.map((exec, i) => {
    const tokens = PORTRAIT_NAME_TOKENS[EXECUTIVES[i].id] ?? [];
    const matched = leadershipImages?.find((img) => {
      const words = portraitWords(img.url + ' ' + (img.caption || ''));
      return tokens.some((t) => words.has(t));
    });
    return { ...exec, image: matched?.url ?? '' };
  });

  const LIME = 'oklch(0.81 0.19 115)';
  const voices: Voice[] = execs.map((exec) => ({
    id: exec.id,
    name: exec.name,
    role: [exec.title, exec.tenure].filter(Boolean).join(' · '),
    pullQuote: exec.pullQuote,
    image: exec.image,
    storyLabel: exec.eyebrow,
    paragraphs: exec.bio ? [exec.bio] : [],
    extra: (
      <div className="flex flex-col gap-8">
        {exec.doing.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {exec.doing.map((d, di) => (
              <div key={di} className="pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <p lang="en" className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: LIME }}>{d.label}</p>
                <p className="text-[15px] md:text-[16px] leading-[1.75] text-white/75">{d.text}</p>
              </div>
            ))}
          </div>
        )}
        {(exec.metrics.length > 0 || exec.linkedin) && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            {exec.metrics.length > 0 ? (
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                {exec.metrics.map((m, mi) => (
                  <div key={mi}>
                    <p className="font-black text-white leading-none" style={{ fontSize: 'clamp(24px,2.2vw,32px)', letterSpacing: '-0.03em' }}>{m.value}</p>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">{m.label}</p>
                  </div>
                ))}
              </div>
            ) : <span />}
            {exec.linkedin && (
              <a
                href={exec.linkedin}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-[11px] font-black uppercase tracking-[0.16em] hover:text-white transition-colors"
                style={{ color: LIME }}
              >
                <i className="ri-linkedin-fill text-base" aria-hidden="true" />
                {exec.name} auf LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    ),
  }));

  return (
    <VoicesShowcase
      id="management-voices"
      eyebrow={tBadge}
      heading={markLastWord(tHeading)}
      sub={tSub}
      voices={voices}
      storyLabel="Perspektive"
      nextLabel="Nächste Perspektive"
      footer={
        <VoicesCta
          text={<>{tCtaText} {tCtaAccent && <Marker>{tCtaAccent}</Marker>}</>}
          sub={tCtaSub}
          button={
            <button
              type="button"
              onClick={() => openCalendly()}
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-4 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-calendar-line text-sm" aria-hidden="true" />
              {tCtaBtn}
            </button>
          }
        />
      }
    />
  );
}
