interface RatgeberHeroProps {
  h1: string;
  h1Accent: string;
  heroSubtitle: string;
  heroSummary: string;
  heroImageUrl: string;
  category: string;
}

export default function RatgeberHero({ h1, h1Accent, heroSubtitle, heroSummary, heroImageUrl, category }: RatgeberHeroProps) {
  const stats = [
    { value: '60 %', label: 'Kaufentscheidungen am POS' },
    { value: '19+', label: 'Jahre Markenaktivierung' },
    { value: '2.000+', label: 'Markenbotschafter' },
    { value: 'DACH', label: 'Region' },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[480px] md:min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt={h1}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{category}</span>
              </div>
              <h1 className="leist-h1-sub text-white mb-4 drop-shadow-2xl">
                {h1}<br /><span className="text-primary-500">{h1Accent}</span>
              </h1>
              <p className="text-lg text-primary-500 font-bold mb-3 drop-shadow-lg">
                {heroSubtitle}
              </p>
              <p className="text-base text-white/75 leading-relaxed drop-shadow max-w-xl">
                {heroSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 mt-8 lg:mt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
              {stats.map((stat, idx) => (
                <div key={idx} className="px-5 py-5" style={{ borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.14)' : undefined }}>
                  <div className="font-black text-white tabular-nums mb-1 leading-none" style={{ fontSize: '26px', letterSpacing: '-0.03em', color: idx === 3 ? 'oklch(0.81 0.19 115)' : '#fff' }}>{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}