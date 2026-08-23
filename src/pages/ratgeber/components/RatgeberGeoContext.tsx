import type { GeoContextData } from '../data/types';

interface RatgeberGeoContextProps {
  data: GeoContextData;
}

const GEO_LABELS: Record<string, string> = {
  local: 'Lokale Expertise',
  regional: 'Regionale Verankerung',
  national: 'Bundesweite Reichweite',
  international: 'Internationale Ausrichtung',
};

export default function RatgeberGeoContext({ data }: RatgeberGeoContextProps) {
  return (
    <section className="sonic-section-lg md:" style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 px-3 py-1 mb-5" style={{ borderRadius: 0 }}>
          <i className="ri-map-pin-line text-foreground-950/60 text-xs"></i>
          <span className="text-xs font-black text-foreground-950/60 uppercase tracking-widest">{GEO_LABELS[data.level] || 'Geografischer Kontext'}</span>
        </div>

        <h2 className="sonic-h2 text-foreground-950 mb-6">
          {data.heading}
        </h2>

        <p className="text-base text-foreground-950/70 leading-relaxed mb-8">
          {data.content}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.cities.length > 0 && (
            <div className="border border-foreground-950/10 bg-white p-5" style={{ borderRadius: 0 }}>
              <h4 className="text-sm font-black text-foreground-950 uppercase tracking-wider mb-3">Städte</h4>
              <div className="flex flex-wrap gap-2">
                {data.cities.map((city) => (
                  <span key={city} className="px-3 py-1 bg-primary-500/10 text-foreground-950/70 text-xs font-semibold" style={{ borderRadius: 0 }}>
                    {city}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.regions.length > 0 && (
            <div className="border border-foreground-950/10 bg-white p-5" style={{ borderRadius: 0 }}>
              <h4 className="text-sm font-black text-foreground-950 uppercase tracking-wider mb-3">Regionen</h4>
              <div className="flex flex-wrap gap-2">
                {data.regions.map((region) => (
                  <span key={region} className="px-3 py-1 bg-primary-500/10 text-foreground-950/70 text-xs font-semibold" style={{ borderRadius: 0 }}>
                    {region}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.countries.length > 0 && (
            <div className="border border-foreground-950/10 bg-white p-5" style={{ borderRadius: 0 }}>
              <h4 className="text-sm font-black text-foreground-950 uppercase tracking-wider mb-3">Länder</h4>
              <div className="flex flex-wrap gap-2">
                {data.countries.map((country) => (
                  <span key={country} className="px-3 py-1 bg-primary-500/10 text-foreground-950/70 text-xs font-semibold" style={{ borderRadius: 0 }}>
                    {country}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}