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
    { value: '20.000+', label: 'Markenbotschafter' },
    { value: 'DACH', label: 'Region' },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt={h1}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        </div>

        <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-primary-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-black text-[#C8D400] uppercase tracking-widest mb-6">
                {category}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
                {h1}<br /><span className="text-[#C8D400]">{h1Accent}</span>
              </h1>
              <p className="text-lg text-[#C8D400] font-bold mb-3 drop-shadow-lg">
                {heroSubtitle}
              </p>
              <p className="text-base text-white/75 leading-relaxed drop-shadow max-w-xl">
                {heroSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-black/40 backdrop-blur-sm p-5 border border-white/15 hover:border-[#C8D400]/50 transition-all duration-300" style={{ borderRadius: 0 }}>
                  <div className="text-3xl font-black text-[#C8D400] tabular-nums mb-1 leading-tight">{stat.value}</div>
                  <div className="text-white/65 text-xs font-bold uppercase tracking-wide leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}