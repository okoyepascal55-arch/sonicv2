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
    { label: 'Kununu', sub: 'Top Company 2022–2026', href: REVIEW_LINKS.kununu },
    { label: 'Google', sub: 'Sehr positiv', href: REVIEW_LINKS.google },
    { label: 'Glassdoor', sub: 'Sehr positiv', href: REVIEW_LINKS.glassdoor },
  ];

  return (
    <section id="awards" className="py-[88px] px-8" style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[640px] mb-9">
          <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
            <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
            Ausgezeichnet
          </div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
            {tHeading}
          </h2>
          <p className="text-sm text-[#6E6E68] leading-relaxed max-w-xl mt-3">
            {tAwardText || 'Wir geben jeden Tag unser Bestes, damit unsere Agentur ein erstklassiger Ort zum Arbeiten ist. Die Auszeichnung zur "Kununu Top Company" haben wir 2022, 2023, 2024, 2025 und 2026 erhalten.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr_0.7fr] gap-5 items-stretch">
          {/* ── LEFT: Rating badges ── */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2.5 mb-5">
              {badges.map((b, i) => (
                <a
                  key={i}
                  href={b.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-white border border-[#E7E4D4] hover:border-[#DCE94D] transition-colors cursor-pointer group"
                >
                  <span className="text-[#C3D62A] text-sm">
                    <i className="ri-star-fill" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#0B0B0C] uppercase tracking-wide group-hover:underline">
                      {b.label}
                    </div>
                    <div className="text-[11px] text-[#9A9A93] font-semibold">
                      {b.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href={REVIEW_LINKS.kununu}
              rel="nofollow noopener"
              target="_blank"
              className="inline-block hover:opacity-80 transition-opacity cursor-pointer mt-auto"
            >
              <img
                alt="kununu Top Company — Sonic Group"
                src="https://widgets.kununu.com/widget_logo/profiles/71cce505-4438-43a5-8cd5-f09a2ac33372"
                className="h-11 object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          {/* ── MIDDLE: Siegel ── */}
          <a
            href={REVIEW_LINKS.kununu}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex flex-col items-center justify-center bg-white border border-[#E7E4D4]  p-5 relative overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#DCE94D]/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#DCE94D]/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#DCE94D]/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#DCE94D]/40" />
            <img
              src="https://storage.readdy-site.link/project_files/904b87b8-ea75-4880-a50b-adb150b0e454/300d4ef6-7bf4-4959-8eb1-a129d4aea934_top-company-siegel-5-jahre-in-folge-scaled.jpg?v=5ae539f36ba3abceac53aa630e585931"
              alt="Kununu Top Company Siegel — 5 Jahre in Folge"
              className="w-full object-contain"
              style={{ maxHeight: '170px' }}
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* ── RIGHT: Google Reviews ── */}
          <a
            href={REVIEW_LINKS.google}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="relative flex flex-col bg-white border border-[#E7E4D4] hover:border-[#DCE94D] transition-colors overflow-hidden cursor-pointer group"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#DCE94D] z-10" />
            <div className="px-5 py-3 flex items-center justify-between border-b border-[#E7E4D4]">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 flex items-center justify-center bg-[#DCE94D]/15 ">
                  <i className="ri-google-line text-xs text-[#C3D62A]" />
                </div>
                <span className="text-[11px] font-bold text-[#0B0B0C] uppercase tracking-wide">
                  Google Bewertungen
                </span>
              </div>
              <span className="text-[11px] font-black text-[#C3D62A]">★★★★★</span>
            </div>
            <div className="flex-1 p-2" style={{ minHeight: '180px' }}>
              <div className="flex flex-col items-center justify-center h-full py-6">
                <div className="text-[32px] font-black text-[#0B0B0C] leading-none">4.8</div>
                <div className="text-sm text-[#C3D62A] my-1">★★★★★</div>
                <div className="text-xs text-[#9A9A93]">Bewertungen auf Google ansehen</div>
              </div>
            </div>
            <div className="px-5 py-2.5 border-t border-[#E7E4D4] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#9A9A93] uppercase tracking-widest">
                Google Reviews
              </span>
              <span className="text-[10px] font-black text-[#C3D62A] flex items-center gap-1">
                Auf Google öffnen
                <i className="ri-arrow-right-up-line text-xs" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}