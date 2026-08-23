import { useText } from '@/hooks/useText';

const REVIEW_LINKS = {
  kununu: 'https://www.kununu.com/de/sonic-sales-support1',
  google: 'https://www.google.com/maps/search/?api=1&query=Sonic+Sales+%26+Support+GmbH+Krefeld',
  glassdoor: 'https://www.glassdoor.com/Reviews/Sonic-Sales-Support-Reviews-E1288022.htm',
};

export default function KarriereAwards() {
  const tHeading = useText('careers_culture', 'careers-culture-award-heading', 'Kultur? Leben wir.');
  const tAwardText = useText('careers_culture', 'careers-culture-award-text', '');

  const badges = [
    { label: 'Kununu', sub: 'Top Company 2022–2026', rating: '★★★★★', href: REVIEW_LINKS.kununu },
    { label: 'Google', sub: 'Bewertungen', rating: '4.8', href: REVIEW_LINKS.google },
    { label: 'Glassdoor', sub: 'Bewertungen', rating: '★★★★★', href: REVIEW_LINKS.glassdoor },
  ];

  return (
    <section id="awards" className="py-14 md:py-16 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-8 md:mb-10">
          <h2 className="text-[clamp(28px,3.6vw,46px)] font-black text-[#0B0B0C] leading-[1.06] tracking-tight uppercase">
            {tHeading}
          </h2>
          <p className="text-sm text-[#6E6E68] leading-relaxed max-w-xl mt-3">
            {tAwardText || 'Wir geben jeden Tag unser Bestes, damit unsere Agentur ein erstklassiger Ort zum Arbeiten ist. Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#E7E4D4] divide-y sm:divide-y-0 sm:divide-x divide-[#E7E4D4]">
          {badges.map((b, i) => (
            <a
              key={i}
              href={b.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex items-center justify-between gap-4 p-6 hover:bg-[#FAFDF5] transition-colors group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[#C8D400] text-sm">
                    <i className="ri-star-fill" />
                  </span>
                  <span className="text-sm font-black text-[#0B0B0C] uppercase tracking-wide">
                    {b.label}
                  </span>
                </div>
                <div className="text-xs text-[#6E6E68] font-semibold">{b.sub}</div>
              </div>
              <span className="text-[#C8D400] font-black text-sm whitespace-nowrap">{b.rating}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}