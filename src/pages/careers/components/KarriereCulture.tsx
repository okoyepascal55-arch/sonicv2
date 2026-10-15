import { useText } from '@/hooks/useText';
import { Marker, LIME_MUTED } from './ChapterKit';
import { useKarriereAwards } from '../useKarriereText';

/* Unsere Kultur — final layout „7b“ (15.10.2026): editorial header, values line,
   hairline bento with the four DNA constants and a slim „Ausgezeichnet“ strip.
   White tiles, 1px lines, no fills, no icons, no giant numbers.
   Texts: Dashboard → Texte → Karriere → „KarriereCulture …“ and „Karriere DNA“,
   ratings: „Karriere — Auszeichnungen“. */

export const REVIEW_LINKS = {
  kununu: 'https://www.kununu.com/de/sonic-sales-support1',
  google: 'https://www.google.com/maps/search/?api=1&query=Sonic+Sales+%26+Support+GmbH+Krefeld',
};

const HAIR = '#E2E2E2';
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

function Eyebrow({ children, bar = true }: { children: React.ReactNode; bar?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {bar && <span className="w-[18px] h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />}
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: LIME_MUTED }}>{children}</span>
    </span>
  );
}

export default function KarriereCulture() {
  const tEyebrow = useText('careers_culture', 'careers-culture-eyebrow', 'Unsere Kultur');
  const tHeading = useText('careers_culture', 'careers-culture-heading', 'Starke Menschen für starke Marken');
  const tLead = useText('careers_culture', 'careers-culture-lead', 'Wir lieben & leben Marken');
  const tP1 = useText('careers_culture', 'careers-culture-p1', 'Wir lieben und leben Marken, insbesondere am Point of Sale, auf Messen, bei Events, auf Roadshows und per Video aus unseren Studios an unserem Campus in Krefeld.');
  const tP2 = useText('careers_culture', 'careers-culture-p2', 'Energiegeladen und sympathisch: Diese Beschreibung passt auf die Menschen, die bei Sonic arbeiten. Passt sie auch auf dich?');
  const tValues = useText('careers_culture', 'careers-culture-values', 'Energie | Sympathie | Anpacken | Teamgeist | Kreativität');
  const tDnaEyebrow = useText('careers_culture', 'careers-culture-dna-eyebrow', 'Unsere DNA — Vier Konstanten, die jede Entscheidung bei Sonic trägt.');
  const tAwardEyebrow = useText('careers_culture', 'careers-culture-award-eyebrow', 'Ausgezeichnet');
  const tAwardHeading = useText('careers_culture', 'careers-culture-award-heading', 'Kultur? Leben wir.');
  const tAwardText = useText('careers_culture', 'careers-culture-award-text', 'Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.');

  const dna = [
    { title: useText('karriere_dna', 'dna-mensch-title', 'Der Mensch'), desc: useText('karriere_dna', 'dna-mensch-desc', 'Menschen, die Marken prägen. Ob eine Smartwatch oder eine frische Teemarke – Promotions leben von den Menschen, die sie durchführen. Deshalb setzen wir auf Fachberater, die für die Marke brennen. Das Ergebnis? Transparent und messbar – jederzeit schwarz auf weiß nachvollziehbar.') },
    { title: useText('karriere_dna', 'dna-antrieb-title', 'Der Antrieb'), desc: useText('karriere_dna', 'dna-antrieb-desc', 'Nicht jeder lässt sich durch dasselbe motivieren. Eine faire, nachvollziehbare Bezahlung und Entwicklungsperspektiven sind oft genauso wichtig wie frisches Obst im Büro oder ein direkter Ansprechpartner im Projektteam – anstelle einer anonymen Hotline.') },
    { title: useText('karriere_dna', 'dna-daten-title', 'Die Daten'), desc: useText('karriere_dna', 'dna-daten-desc', 'Entscheidungen beginnen oft mit einer Intuition – sollten jedoch mit Daten analysiert, evaluiert und getroffen werden. Nur so lassen sich unsere Empfehlungen in messbare Erfolge umwandeln. Jahrelange Erfahrung und umfassende Daten helfen uns, die richtigen Maßnahmen zu entwickeln.') },
    { title: useText('karriere_dna', 'dna-werkzeug-title', 'Das Werkzeug'), desc: useText('karriere_dna', 'dna-werkzeug-desc', 'Eigene Prozesse beherrschen – aber nicht alles selbst entwickeln. Unser Inhouse-IT-Team programmiert oder sourct gezielt die richtigen Tools, um gemeinsam mit starken Partnern die Herausforderungen unserer Kunden bestmöglich zu lösen.') },
  ];

  const aw = useKarriereAwards();
  const badges = [
    { name: 'kununu', rating: aw.kununuRating, sub: aw.kununuSub, href: REVIEW_LINKS.kununu, lime: true },
    { name: 'Google', rating: aw.googleRating, sub: aw.googleSub, href: REVIEW_LINKS.google, lime: false },
  ];

  // „Starke Menschen für starke Marken“ → highlight the part after „für “
  const forIdx = tHeading.lastIndexOf(' für ');
  const headMain = forIdx > -1 ? tHeading.slice(0, forIdx + 5) : tHeading;
  const headMark = forIdx > -1 ? tHeading.slice(forIdx + 5) : '';
  const values = tValues.split('|').map((v) => v.trim()).filter(Boolean);
  // p1 already starts with the lead phrase in older dashboard values → don't print it twice
  const p1 = tP1.trim();

  return (
    <section id="darum" className="bg-white py-10 md:py-14 px-5 md:px-10">
      <div className="sonic-container flex flex-col gap-10 md:gap-14">
        {/* 3.1 Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-6 lg:gap-16 lg:items-end">
          <div className="flex flex-col gap-3">
            <Eyebrow>{tEyebrow}</Eyebrow>
            <h2 className="sonic-h2 text-foreground-950" style={{ lineHeight: 1.1 }}>
              {headMain}{headMark && <Marker>{headMark}</Marker>}
            </h2>
          </div>
          <div className="flex flex-col gap-3.5 text-[15px] leading-[1.7]" style={{ color: '#333', textWrap: 'pretty' } as React.CSSProperties}>
            <p><strong className="font-black text-foreground-950">{tLead}</strong> — {p1}</p>
            <p>{tP2}</p>
          </div>
        </div>

        {/* 3.2 Values row */}
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5 py-[22px]" style={{ borderTop: '1px solid #0A0A0A', borderBottom: '1px solid #0A0A0A' }} aria-label="Unsere Werte">
          {values.map((v, i) => (
            <li key={v} className="flex items-center gap-7">
              <span className="text-[20px] md:text-[24px] font-black text-foreground-950" style={{ letterSpacing: '-0.01em' }}>{v}</span>
              {i < values.length - 1 && <span className="w-2 h-2 bg-primary-500 flex-shrink-0" aria-hidden="true" />}
            </li>
          ))}
        </ul>

        {/* 3.3 DNA + award strip — hairline bento */}
        <div className="flex flex-col gap-5">
          <Eyebrow>{tDnaEyebrow}</Eyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px" style={{ background: HAIR, border: `1px solid ${HAIR}` }}>
            {dna.map((d, i) => (
              <div key={i} className={`bg-white flex flex-col justify-between gap-9 px-7 py-8 md:px-9 md:py-10 lg:min-h-[280px] ${SPANS[i]}`}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-black tabular-nums" style={{ color: LIME_MUTED }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] font-extrabold tracking-[0.2em]" style={{ color: '#999' }}>/ 04</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <h3 className="text-[26px] md:text-[30px] font-black text-foreground-950" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>{d.title}</h3>
                  <p className="text-[14px] leading-[1.75] max-w-[520px]" style={{ color: '#444' }}>{d.desc}</p>
                </div>
              </div>
            ))}

            {/* Award strip */}
            <div className="bg-white lg:col-span-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] items-center gap-5 lg:gap-8 p-5 lg:pl-9">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-3">
                  <Eyebrow bar={false}>{tAwardEyebrow}</Eyebrow>
                  <span className="text-[15px] font-black text-foreground-950">{tAwardHeading}</span>
                </div>
                <p className="text-[12px] leading-[1.5]" style={{ color: '#555' }}>{tAwardText}</p>
              </div>
              <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-[repeat(2,250px)] gap-2">
                {badges.map((b) => (
                  <a
                    key={b.name}
                    href={b.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="grid grid-cols-[72px_1fr] items-center gap-3 h-16 px-4 hover:opacity-85 transition-opacity"
                    style={{ background: b.lime ? 'oklch(var(--primary-500))' : '#fff', boxShadow: `inset 0 0 0 1px ${HAIR}` }}
                    aria-label={`${b.name} ${b.rating} — ${b.sub} (öffnet die Bewertungen)`}
                  >
                    <span className="text-[24px] font-black text-foreground-950 whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>{b.rating}</span>
                    <span className="flex flex-col gap-[3px] min-w-0">
                      <span className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground-950">{b.name}</span>
                        <span className="text-[12px] font-black text-foreground-950" aria-hidden="true">↗</span>
                      </span>
                      <span className="text-[10px] leading-[1.3]" style={{ color: '#333' }}>{b.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
