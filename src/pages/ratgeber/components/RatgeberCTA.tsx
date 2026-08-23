import { openCalendly } from '@/components/feature/CalendlyWidget';

interface RatgeberCTAProps {
  headline: string;
  headlineAccent: string;
  subline: string;
}

export default function RatgeberCTA({ headline, headlineAccent, subline }: RatgeberCTAProps) {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="border border-foreground-950/15 bg-white p-10 md:p-14 relative overflow-hidden" style={{ borderRadius: 0 }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-3xl pointer-events-none translate-x-16 -translate-y-16" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8D400]/60 via-[#C8D400]/20 to-transparent" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/12 px-3 py-1 mb-5" style={{ borderRadius: 0 }}>
                <i className="ri-calendar-check-line text-foreground-950/50 text-xs"></i>
                <span className="text-xs font-black text-foreground-950/50 uppercase tracking-widest">Jetzt starten</span>
              </div>

              <h2 className="sonic-h2 text-foreground-950 mb-4">
                {headline}<br />
                <span className="text-primary-500">{headlineAccent}</span>
              </h2>

              <p className="text-foreground-950/55 text-base leading-relaxed">{subline}</p>
            </div>

            <div className="text-center md:text-right">
              <button
                type="button"
                onClick={() => openCalendly()}
                className="inline-flex items-center gap-3 bg-foreground-950 text-white px-10 py-5 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm uppercase tracking-wider"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line text-base"></i>
                Beratungsgespräch buchen
              </button>
              <p className="text-foreground-950/30 text-xs mt-3 font-semibold">
                Kostenfreies 30-Min-Gespräch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}