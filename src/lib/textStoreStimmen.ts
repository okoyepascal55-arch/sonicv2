/* ─────────────────────────────────────────────
   STIMMEN & GESICHTER — editable people/quote sections
   Dashboard → Text → "Stimmen & Gesichter" shows these in three tabs:
     • Über uns   → ManagementVoices   (/ueber-uns)
     • Karriere   → SonicFamily        (/karriere)
     • Kreation   → KreationFaces + ClientProof (/leistungen/kreation-content)
     • SRT        → JoergQuote (/srt)

   Default values mirror the copy that is currently live on the site, so
   adding these sections changes nothing visually until someone edits them.
───────────────────────────────────────────── */
import type { TextEntry, TextSection } from './textStore';

type EntryType = TextEntry['type'];

const e = (id: string, label: string, type: EntryType, value: string, multiline = false): TextEntry => ({
  id, label, description: '', type, value, ...(multiline ? { multiline: true } : {}),
});

/* ════════════════════ ÜBER UNS — Management Voices ════════════════════ */

interface ExecDefaults {
  id: string;
  name: string;
  title: string;
  tenure: string;
  eyebrow: string;
  pullquote: string;
  bio: string;
  doing: [string, string][]; // [label, text]
  metrics: [string, string][]; // [value, label]
}

const execSection = (d: ExecDefaults): TextSection => ({
  key: `management_voice_${d.id}`,
  label: `Managementstimme — ${d.name}`,
  pageGroupId: 'stimmen',
  pagePath: '/ueber-uns',
  description: `Karussell-Karte von ${d.name} in „Die Stimmen hinter Sonic.“ Leeres Bio-Feld = Bio wird ausgeblendet.`,
  entries: [
    e(`${d.id}-name`, 'Name', 'heading', d.name),
    e(`${d.id}-title`, 'Position', 'label', d.title),
    e(`${d.id}-tenure`, 'Dabei seit', 'label', d.tenure),
    e(`${d.id}-eyebrow`, 'Eyebrow-Text (Mobil-Badge)', 'badge', d.eyebrow),
    e(`${d.id}-pullquote`, 'Pull-Quote', 'quote', d.pullquote, true),
    e(`${d.id}-bio`, 'Bio-Text (optional)', 'paragraph', d.bio, true),
    ...d.doing.flatMap(([label, text], i) => [
      e(`${d.id}-doing-${i + 1}-label`, `Abschnitt ${i + 1} — Überschrift`, 'label', label),
      e(`${d.id}-doing-${i + 1}`, `Abschnitt ${i + 1} — Text`, 'paragraph', text, true),
    ]),
    ...d.metrics.flatMap(([value, label], i) => [
      e(`${d.id}-metric-${i + 1}-value`, `Kennzahl ${i + 1} — Wert`, 'stat', value),
      e(`${d.id}-metric-${i + 1}-label`, `Kennzahl ${i + 1} — Beschriftung`, 'stat-label', label),
    ]),
  ],
});

const EXECS: ExecDefaults[] = [
  {
    id: 'bjorn',
    name: 'Björn Bourdin',
    title: 'Geschäftsführer',
    tenure: 'Seit 2010',
    eyebrow: 'Vision. Strategie. Führung.',
    pullquote: '„Wer die Fakten kennt und das Team versteht, trifft keine schlechten Entscheidungen — nur mutige.“',
    bio: '',
    doing: [
      ['Doing Things', 'Daten liefern die Fakten, Menschen den Unterschied. Alle „Things“ die mit Daten oder mit Menschen zu tun haben und die Herausforderungen unserer Kunden lösen, sind unsere Spielwiese.'],
      ['Doing Things Better', 'Nobody\'s perfect und auch wir müssen unser „Doing“ täglich hinterfragen bzw. optimieren, damit wir in dem was wir tun, noch besser werden.'],
      ['Doing New Things', 'Der „Strategic Plan“ wird nur dann funktionieren, wenn wir bereit sind, Gewohntes zu verlassen, neue Chancen zu erkennen und mutig neue Wege zu gehen. Innovation ist kein Zufall, sondern eine Einstellung.'],
    ],
    metrics: [['2.000+', 'Promoter:innen täglich'], ['DACH', 'Marktabdeckung']],
  },
  {
    id: 'jo',
    name: 'Jo Heitkämper',
    title: 'Leiter Vertrieb',
    tenure: 'Seit 2007',
    eyebrow: 'Wachstum. Markt. Dynamik.',
    pullquote: '',
    bio: '',
    doing: [
      ['Doing Things', 'Projekte scheitern selten an Ideen, sondern daran, dass Beteiligte aneinander vorbeiarbeiten. Deshalb betrachten wir jede Herausforderung gleichzeitig aus Sicht von Endkunden, Handel, Mitarbeitern und Auftraggebern. Wir tun Dinge, um erfolgreich zu sein – nicht, um beschäftigt zu sein.'],
      ['Doing Things Better', 'Neue Ideen allein schaffen keinen Mehrwert. Entscheidend ist, wie konsequent sie in bestehende Strukturen integriert und im Alltag wirksam werden. Neue Dinge ergeben nur dann Sinn, wenn sie funktionieren und in Prozesse überführt werden.'],
      ['Doing New Things', 'Automation durch Algorithmen, Analysen durch KI, Umsetzung über die SRT. Wir automatisieren nicht, um Menschen zu ersetzen, sondern um ihnen Zeit für Beratung und bessere Entscheidungen zu geben. Erfahrung bleibt entscheidend, um Ergebnisse einzuordnen und Fehler zu erkennen.'],
    ],
    metrics: [['€2 Mrd.', 'Beeinflusster Umsatz'], ['18+', 'Jahre Vertrieb']],
  },
  {
    id: 'lucas',
    name: 'Lucas Kreiten',
    title: 'Leiter Finanzen',
    tenure: 'Seit 2019',
    eyebrow: 'Zahlen. Struktur. Weitblick.',
    pullquote: '„Finance ist heute die zentrale Steuerungsfunktion, die Entscheidungen vorbereitet, Prozesse gestaltet und Digitalisierung vorantreibt. Wir stehen dabei nicht neben dem operativen Geschäft — wir sind ein aktiver Teil davon.“',
    bio: 'Lucas verantwortet seit 2019 die finanzielle Steuerung von Sonic. Unter seiner Führung hat sich das Finance Team von reiner Buchhaltung zu einer vollwertigen Finanzfunktion entwickelt. Strukturen, Prozesse und die Zusammenarbeit mit dem operativen Geschäft sind heute eng verzahnt. So ist Finance bei Sonic nicht nur Kontrollinstanz, sondern aktiver Gestalter unternehmerischer Entscheidungen.',
    doing: [
      ['Doing Things', 'Alles beginnt mit klaren Rollen, klaren Abläufen, klaren Zahlen. Wir schaffen Transparenz über Ergebnisse, Prozesse und Zusammenhänge – als verlässliches Fundament, auf dem gute Entscheidungen und starke Teams überhaupt erst möglich werden.'],
      ['Doing Things Better', 'Erst auf diesem stabilen Fundament kann Qualität entstehen. Daher entwickeln wir Prozesse, Strukturen und Steuerungslogiken kontinuierlich weiter, um aus guter Arbeit exzellente Ergebnisse werden zu lassen – und aus einzelnen Verbesserungen ein System, das dauerhaft trägt.'],
      ['Doing New Things', 'Innovation beginnt dort, wo Mut auf Verantwortung trifft. Sonic ist ein Ort an dem neue Ideen nicht nur gedacht, sondern auch umgesetzt werden können.'],
    ],
    metrics: [['2019', 'Finance-Aufbau'], ['aktiv', 'Gestalter']],
  },
];

/* ════════════════════ KARRIERE — Sonic Spirit & Faces ════════════════════ */

interface FaceDefaults {
  id: string;
  name: string;
  role: string;
  pullquote: string;
  bio: string;
  closing?: string;
}

const faceSection = (d: FaceDefaults, idx: number): TextSection => ({
  key: `karriere_face_${d.id}`,
  label: `Spirit & Faces ${String(idx + 1).padStart(2, '0')} — ${d.name}`,
  pageGroupId: 'stimmen',
  pagePath: '/karriere',
  description: 'Geschichte in „Sonic Spirit & Faces“. Absätze in der Bio mit einer Leerzeile trennen. Leeres Schlusszitat = wird ausgeblendet.',
  entries: [
    e(`face-${d.id}-name`, 'Name', 'heading', d.name),
    e(`face-${d.id}-role`, 'Rolle', 'label', d.role),
    e(`face-${d.id}-pullquote`, 'Pull-Quote', 'quote', d.pullquote, true),
    e(`face-${d.id}-bio`, 'Geschichte / Bio', 'paragraph', d.bio, true),
    e(`face-${d.id}-closing`, 'Schlusszitat (optional)', 'quote', d.closing ?? '', true),
  ],
});

export const FACE_IDS = ['sascha', 'marcel', 'andrew', 'michelle', 'janina', 'katharina'] as const;

const FACES: FaceDefaults[] = [
  {
    id: 'sascha',
    name: 'Sascha M.',
    role: 'Senior IT Admin',
    pullquote: '„Gute IT ist unsichtbar — und genau das ist das Ziel. Wenn die Systeme laufen, läuft Sonic.“',
    bio: 'Sascha verantwortet die IT-Infrastruktur bei Sonic. Er sorgt dafür, dass die technische Basis zuverlässig funktioniert — damit alle anderen ihre Arbeit machen können.',
  },
  {
    id: 'marcel',
    name: 'Marcel W.',
    role: 'Finance Controller',
    pullquote: '„Zahlen erzählen Geschichten — man muss nur wissen, wie man sie liest.“',
    bio: 'Marcel bringt finanzielle Klarheit in ein schnellwachsendes Unternehmen. Als Finance Controller stellt er sicher, dass Entscheidungen auf verlässlichen Grundlagen getroffen werden.',
  },
  {
    id: 'andrew',
    name: 'Andrew W.',
    role: 'Event and Logistics Manager',
    pullquote: '„Im Event-Geschäft gibt es kein \'Morgen\'. Alles muss heute klappen — und das ist genau das, was mich antreibt.“',
    bio: 'Andrew koordiniert Events und Logistik bei Sonic. Er bringt Struktur in komplexe Abläufe und sorgt dafür, dass jede Veranstaltung reibungslos über die Bühne geht.',
  },
  {
    id: 'michelle',
    name: 'Michelle G.',
    role: 'Senior Project Manager',
    pullquote: '„Erfolgreiche Projekte entstehen nicht durch Zufall — sie entstehen durch konsequente Planung und echte Teamarbeit.“',
    bio: 'Michelle leitet komplexe Kundenprojekte bei Sonic. Als Senior Project Manager hält sie alle Fäden zusammen und stellt sicher, dass Deadlines und Qualitätsansprüche eingehalten werden.',
  },
  {
    id: 'janina',
    name: 'Janina B.',
    role: 'HR Manager',
    pullquote: '„Eigentlich sollte es nur ein Nebenjob während des Studiums sein. Am Ende wurde daraus mein Karriereweg.“',
    bio: `Als Janina zur Sonic kam, war sie noch Studentin. Den ersten Kontakt zur Agentur hatte sie allerdings schon deutlich früher. Ihr Bruder war bereits seit 2007 für Sonic im Promotionbereich tätig und entwickelte sich später zum Trainer. Über ihn erhielt auch sie die Möglichkeit, während ihres BWL-Studiums mit den Schwerpunkten Personalmanagement und Marketing erste Erfahrungen bei Sonic zu sammeln.

Während des Studiums war sie regelmäßig für Sonic auf verschiedenen Projekten im Einsatz. Dazu gehörten Promotionjobs auf der IFA in Berlin für Sony, verschiedene Sony-Roadshows sowie Einsätze für Nespresso. Diese Zeit war für sie besonders spannend, da sie nicht nur praktische Erfahrungen sammeln konnte, sondern auch viele unterschiedliche Menschen und Arbeitsbereiche kennenlernte.

Ein zufälliges Kennenlernen während einer Roadshow führte schließlich dazu, dass sie sich bei Sonic für das HR-Team bewarb. Was ihr dabei bis heute in Erinnerung geblieben ist: Ihr erstes Kennenlernen mit dem Geschäftsführer verlief alles andere als klassisch. Statt in einem Besprechungsraum fand das Treffen in einer Berliner Kneipe statt. In lockerer Runde mit mehreren Kolleginnen und Kollegen entstand schnell das Gefühl, nicht einfach nur ein Unternehmen kennenzulernen, sondern Menschen. Genau dieser persönliche und unkomplizierte Umgang prägt für sie die Sonic bis heute.

Kurz darauf folgte das offizielle Vorstellungsgespräch und 2020 schließlich der Start mit einem Praktikum im Personalbereich. Was zunächst als Praktikum begann, entwickelte sich schnell zu mehr. Nach kurzer Zeit wurde Janina übernommen und erhielt die Möglichkeit, sich immer tiefer in die verschiedenen Themen des Personalmanagements einzuarbeiten.

Eine besonders prägende Phase begann, als eine Kollegin über einen längeren Zeitraum ausfiel. Dadurch musste sie früh Verantwortung übernehmen und wurde im wahrsten Sinne des Wortes ins kalte Wasser geworfen. Rückblickend war genau diese Zeit eine der wertvollsten Erfahrungen ihrer bisherigen Laufbahn. Sie lernte in kurzer Zeit unglaublich viel, entwickelte sich fachlich weiter und gewann das Vertrauen, auch anspruchsvolle Themen eigenständig zu übernehmen.

Dabei war sie nie auf sich allein gestellt. Durch ihre Kolleginnen und Kollegen, die Führungskräfte und die Geschäftsleitung erfuhr sie stets großes Vertrauen, Unterstützung und die Möglichkeit, sich kontinuierlich weiterzuentwickeln. Genau diese Kombination aus Herausforderung, Vertrauen und Zusammenhalt hat ihren Weg bei Sonic entscheidend geprägt.

Heute ist Janina für das operative Personalmanagement verantwortlich. Dabei begleitet sie Mitarbeitende und Führungskräfte in allen personalrelevanten Themen und gestaltet aktiv Prozesse und Strukturen mit.

Manchmal beginnt der passende Karriereweg dort, wo man ursprünglich nur einen Studentenjob gesucht hat. Aus ersten Promotion-Einsätzen während des Studiums wurden neue Chancen, spannende Herausforderungen und Schritt für Schritt eine langfristige berufliche Heimat bei Sonic.`,
    closing: '„Karrierewege lassen sich nicht immer planen. Manchmal entstehen sie genau dort, wo Menschen Potenziale erkennen, Vertrauen schenken und Entwicklung ermöglichen.“',
  },
  {
    id: 'katharina',
    name: 'Katharina S.',
    role: 'Business Controller',
    pullquote: '„Gute Markenarbeit entsteht, wenn Strategie und Kreativität gemeinsam an einem Tisch sitzen.“',
    bio: 'Katharina verantwortet bei Sonic die Schnittstelle zwischen Marke und Inhalt. Sie entwickelt Content-Strategien, die Markenbotschaften erlebbar machen — kanalübergreifend, konsistent und immer mit dem Blick auf die Zielgruppe.',
  },
];

/* ════════════════════ KREATION — Team + Kundenstimmen ════════════════════ */

const kreationVoice = (id: string, name: string, role: string, pullquote: string, bio: string): TextSection => ({
  key: `kreation_voice_${id}`,
  label: `Kreation Team — ${name}`,
  pageGroupId: 'stimmen',
  pagePath: '/leistungen/kreation-content',
  description: `Karte von ${name} in „Die Köpfe hinter der Kreation.“`,
  entries: [
    e(`${id}-name`, 'Name', 'heading', name),
    e(`${id}-role`, 'Rolle', 'label', role),
    e(`${id}-pullquote`, 'Pull-Quote', 'quote', pullquote, true),
    e(`${id}-bio`, 'Bio-Text', 'paragraph', bio, true),
  ],
});

export const TESTIMONIAL_IDS = ['garmin', 'seb', 'philips', 'nespresso', 'loreal', 'wmf'] as const;

const TESTIMONIALS: { id: string; brand: string; quote: string; author: string; role: string; company: string }[] = [
  { id: 'garmin', brand: 'GARMIN', quote: '„Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter."', author: 'Dana Eichinger', role: 'Director Marketing DACH', company: 'Garmin Deutschland GmbH' },
  { id: 'seb', brand: 'GROUPE SEB', quote: '„Hier finde ich, ohne großes Excel Kung-Fu, was ich benötige. Die SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit."', author: 'Ramin Dirinpur', role: 'Sales Promotion & Sales Training Manager', company: 'Groupe SEB Deutschland GmbH' },
  { id: 'philips', brand: 'PHILIPS TV & SOUND', quote: '„Durch die SRT können wir live in unsere Projekte reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden."', author: 'Murat Yatkin', role: 'Managing Director DACH', company: 'Philips TV & Sound @TP Vision' },
  { id: 'nespresso', brand: 'NESPRESSO', quote: '„Die SRT ermöglicht es Sonic, unsere Projekte effizient und zielgerichtet zu steuern und umzusetzen."', author: 'Veronika Vriens', role: 'B2C Commercial Excellence', company: 'Nespresso Deutschland GmbH' },
  { id: 'loreal', brand: "L'ORÉAL", quote: '„Sonic liefert konstant hochqualifizierte Promotoren, die unsere Marke am POS perfekt repräsentieren und messbare Ergebnisse erzielen."', author: 'Sophie Müller', role: 'Field Sales Manager DACH', company: "L'Oréal Deutschland GmbH" },
  { id: 'wmf', brand: 'WMF', quote: '„Mit Sonic haben wir einen Partner gefunden, der unsere Anforderungen an Qualität und Flexibilität im Außendienst vollständig erfüllt."', author: 'Thomas Becker', role: 'Head of Trade Marketing', company: 'WMF Group GmbH' },
];

export const STIMMEN_TEXT_SECTIONS: TextSection[] = [
  ...EXECS.map(execSection),
  ...FACES.map(faceSection),
  {
    key: 'kreation_team_header',
    label: 'Kreation Team — Überschrift',
    pageGroupId: 'stimmen',
    pagePath: '/leistungen/kreation-content',
    description: 'Badge und Überschrift über den Karten des Kreation Teams.',
    entries: [
      e('kreation-team-badge', 'Sektion-Badge', 'badge', 'Kreation Team'),
      e('kreation-team-heading', 'Überschrift', 'heading', 'Die Köpfe hinter der Kreation.'),
    ],
  },
  kreationVoice('robert', 'Robert H.', 'Creative Director',
    '„Kreation ist kein Zufall. Es ist das Ergebnis von Präzision, Mut und einem tiefen Verständnis für Marken und Menschen.“',
    'Robert leitet die kreative Ausrichtung bei Sonic. Als Creative Director verbindet er strategisches Denken mit visueller Exzellenz — und gibt Markenauftritten eine unverwechselbare Handschrift.'),
  kreationVoice('inga', 'Inga L.', 'Jr. Art Direktorin',
    '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte.“',
    'Inga ist Teil des Creation Teams und begleitet Projekte von der ersten Idee bis zur Umsetzung. Von Design und Social Media bis zu kreativen Konzepten und Events — sie gibt Marken ihre visuelle Identität.'),
  {
    key: 'common_client_testimonials',
    label: 'Kundenstimmen — „Was unsere Partner über uns sagen“',
    pageGroupId: 'common',
    pagePath: 'Alle Seiten mit Kundenstimmen',
    description: 'Achtung: Dieser Bereich erscheint auf mehreren Seiten (Home, Lösungen, Leistungen, Kreation u. a.) — Änderungen gelten überall.',
    entries: [
      e('testimonials-badge', 'Sektion-Badge', 'badge', 'Kundenstimmen'),
      e('testimonials-heading-1', 'Überschrift — Zeile 1', 'heading', 'Was unsere Partner'),
      e('testimonials-heading-2', 'Überschrift — Zeile 2', 'heading', 'über uns sagen'),
      ...TESTIMONIALS.flatMap((t, i) => {
        const n = `${i + 1} (${t.brand})`;
        return [
          e(`testimonial-${t.id}-brand`, `Stimme ${n} — Marke`, 'label', t.brand),
          e(`testimonial-${t.id}-quote`, `Stimme ${n} — Zitat`, 'quote', t.quote, true),
          e(`testimonial-${t.id}-author`, `Stimme ${n} — Name`, 'label', t.author),
          e(`testimonial-${t.id}-role`, `Stimme ${n} — Position`, 'label', t.role),
          e(`testimonial-${t.id}-company`, `Stimme ${n} — Unternehmen`, 'label', t.company),
        ];
      }),
    ],
  },
];

/* Tabs shown in Dashboard → Text → Stimmen & Gesichter.
   sectionKeys may point at sections from any page group. */
export const STIMMEN_TABS = [
  {
    id: 'ueber-uns',
    label: 'Über uns',
    icon: 'ri-building-line',
    pagePath: '/ueber-uns',
    hint: 'Sektion „Die Stimmen hinter Sonic.“ — Führungsteam-Karussell',
    sectionKeys: ['about_management_voices', ...EXECS.map((x) => `management_voice_${x.id}`)],
  },
  {
    id: 'karriere',
    label: 'Karriere',
    icon: 'ri-briefcase-line',
    pagePath: '/karriere',
    hint: 'Sektion 04 „Sonic Spirit & Faces“ — sechs Mitarbeitergeschichten',
    sectionKeys: ['careers_family', ...FACES.map((f) => `karriere_face_${f.id}`)],
  },
  {
    id: 'kreation',
    label: 'Kreation',
    icon: 'ri-palette-line',
    pagePath: '/leistungen/kreation-content',
    hint: '„Die Köpfe hinter der Kreation.“ + Kundenstimmen-Slider',
    sectionKeys: ['kreation_team_header', 'kreation_voice_robert', 'kreation_voice_inga', 'common_client_testimonials'],
  },
  {
    id: 'srt',
    label: 'SRT',
    icon: 'ri-code-s-slash-line',
    pagePath: '/srt',
    hint: '„Wer hinter dem SRT steht.“ — Zitat von Jörg, Entwickler der SRT',
    sectionKeys: ['srt_developer'],
  },
] as const;

export const STIMMEN_GROUP_ID = 'stimmen';
