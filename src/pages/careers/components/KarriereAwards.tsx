import { useText } from '@/hooks/useText';
import { INK } from './ChapterKit';
import { useKarriereAwards } from '../useKarriereText';

export const REVIEW_LINKS = {
  kununu: 'https://www.kununu.com/de/sonic-sales-support1',
  google: 'https://www.google.com/maps/search/?api=1&query=Sonic+Sales+%26+Support+GmbH+Krefeld',
};

/* Ausgezeichnet — closes the Kultur & DNA chapter (15.10.2026): the culture claim,
   then the proof. Both rating cards link straight to the reviews. */
export default function KarriereAwards() {
  const tEyebrow = useText('careers_culture', 'careers-culture-award-eyebrow', 'Ausgezeichnet');
  const tHeading = useText('careers_culture', 'careers-culture-award-heading', 'Kultur? Leben wir.');
  const tAwardText = useText(
    'careers_culture',
    'careers-culture-award-text',
    'Wir geben jeden Tag unser Bestes, damit unsere Agentur ein erstklassiger Ort zum Arbeiten ist. Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.'
  );
  const tRead = useText('careers_culture', 'careers-culture-award-link', 'Bewertungen lesen');

  // Dashboard → Text → Karriere → „Karriere — Auszeichnungen“
  const aw = useKarriereAwards();
  const badges = [
    { label: 'kununu', sub: aw.kununuSub, rating: aw.kununuRating, href: REVIEW_LINKS.kununu },
    { label: 'Google', sub: aw.googleSub, rating: aw.googleRating, href: REVIEW_LINKS.google },
  ];

  return (
    <section id="awards" className="bg-white pb-10 md:pb-14 px-5 md:px-10" aria-labelledby="awards-heading">
      <div className="sonic-container">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-2">
          {/* Claim */}
          <div className="p-7 md:p-9 flex flex-col justify-between gap-6" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tEyebrow}</span>
              </div>
              <h3 id="awards-heading" className="font-black text-foreground-950 leading-tight" style={{ fontSize: 'clamp(24px,2.4vw,32px)', letterSpacing: '-0.025em' }}>{tHeading}</h3>
            </div>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'oklch(var(--foreground-500))' }}>{tAwardText}</p>
          </div>

          {/* Proof — clickable rating cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {badges.map((b) => (
              <a
                key={b.label}
                href={b.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group relative flex flex-col justify-between gap-8 p-7 md:p-9 overflow-hidden"
                style={{ background: INK }}
                aria-label={`${b.label}: ${b.rating} — ${tRead}`}
              >
                <span className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-primary-500 transition-all duration-500" aria-hidden="true" />
                <span className="flex items-center justify-between gap-4">
                  <span className="text-[13px] font-black uppercase tracking-[0.2em] text-white">{b.label}</span>
                  <i className="ri-arrow-right-up-line text-xl text-white/50 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                </span>
                <span className="block">
                  <span className="block font-black text-primary-500 tabular-nums leading-none" style={{ fontSize: 'clamp(44px,5vw,64px)', letterSpacing: '-0.04em' }}>{b.rating}</span>
                  <span className="block mt-3 text-[13px] font-semibold text-white/60">{b.sub}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-white group-hover:text-primary-500 transition-colors">
                  {tRead}
                  <i className="ri-arrow-right-line" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
