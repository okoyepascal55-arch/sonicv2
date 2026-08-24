import { useText } from '@/hooks/useText';
import { ChapterHeader } from './ChapterKit';

const REVIEW_LINKS = {
  kununu: 'https://www.kununu.com/de/sonic-sales-support1',
  google: 'https://www.google.com/maps/search/?api=1&query=Sonic+Sales+%26+Support+GmbH+Krefeld',
  glassdoor: 'https://www.glassdoor.com/Reviews/Sonic-Sales-Support-Reviews-E1288022.htm',
};

export default function KarriereAwards() {
  const tHeading = useText('careers_culture', 'careers-culture-award-heading', 'Kultur? Leben wir.');
  const tAwardText = useText(
    'careers_culture',
    'careers-culture-award-text',
    'Wir geben jeden Tag unser Bestes, damit unsere Agentur ein erstklassiger Ort zum Arbeiten ist. Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.'
  );

  const badges = [
    { label: 'Kununu', sub: 'Top Company 2022–2026', rating: '★★★★★', href: REVIEW_LINKS.kununu },
    { label: 'Google', sub: 'Bewertungen', rating: '4.8', href: REVIEW_LINKS.google },
    { label: 'Glassdoor', sub: 'Bewertungen', rating: '★★★★★', href: REVIEW_LINKS.glassdoor },
  ];

  return (
    <section id="awards" className="py-16 md:py-[88px] px-5 md:px-10" style={{ background: 'oklch(0.13 0.005 118)' }}>
      <div className="sonic-container">
        <ChapterHeader
          n="03"
          eyebrow="Auszeichnungen"
          heading={tHeading}
          sub={tAwardText}
          dark
          headingSize="clamp(1.75rem, 2.8vw, 2.75rem)"
          headingMax="max-w-[620px]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
          {badges.map((b, i) => (
            <a
              key={i}
              href={b.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex items-center justify-between gap-6 px-0 py-8 sm:px-8 hover:opacity-80 transition-opacity"
              style={{
                borderRight: i < badges.length - 1 ? '1px solid rgba(255,255,255,0.14)' : undefined,
                paddingLeft: i === 0 ? 0 : undefined,
              }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <i className="ri-star-fill text-[15px] text-primary-500" />
                  <span className="text-[15px] font-black uppercase tracking-[0.06em] text-white">{b.label}</span>
                </div>
                <span className="text-[13px] font-semibold text-white/45">{b.sub}</span>
              </div>
              <span className="text-[15px] font-black text-primary-500 whitespace-nowrap tabular-nums">{b.rating}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
