import { useText } from '@/hooks/useText';

export default function ClientTrust() {
  const tHeading = useText('team_clienttrust', 'team-trust-heading', 'VERTRAUEN VON WELTMARKEN');
  const tSub = useText('team_clienttrust', 'team-trust-sub', 'Unsere Teams arbeiten täglich mit den größten Marken der Welt.');
  const brands = [
    'Philips', 'Garmin', 'Canon', 'L\'Oréal', 'Rowenta',
    'Krups', 'Vorwerk', 'Tefal', 'WMF', 'Melitta'
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="w-12 h-0.5 bg-primary-500 mx-auto mb-6" />
        <h2 className="sonic-h2 text-foreground-950 mb-4">
          {tHeading}
        </h2>
        <p className="text-base md:text-lg text-foreground-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          {tSub}
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="px-5 py-2.5 bg-[#FAFDF5] border border-foreground-100 text-sm font-black text-foreground-950 hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500 transition-all duration-300 cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              {brand}
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a1a] p-8 md:p-14 max-w-4xl mx-auto border-2 border-primary-500/20" style={{ borderRadius: 0 }}>
          <div className="text-primary-500/20 text-7xl md:text-9xl font-black leading-none mb-3 md:mb-4 select-none">&quot;</div>
          <p className="text-lg md:text-2xl font-bold text-white italic leading-relaxed mb-6">
            &ldquo;Die Qualität der Sonic-Teams ist außergewöhnlich.
            Professionell, motiviert und immer mit vollem Einsatz für unsere Marke.&rdquo;
          </p>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
            — Führende DACH-Marke
          </p>
        </div>
      </div>
    </section>
  );
}
