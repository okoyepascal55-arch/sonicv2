import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useText } from '@/hooks/useText';
import { CONTACT_EMAIL } from '@/lib/contact';

export default function FinalCTA() {
  const tBadge = useText('losungen_cta', 'losungen-cta-badge', 'Jetzt starten');
  const tHeading = useText('losungen_cta', 'losungen-cta-heading', 'BEREIT FÜR MESSBAREN ERFOLG?');
  const tSub = useText('losungen_cta', 'losungen-cta-sub', 'Starte dein Projekt in 60 Sekunden — wähle deine Branche und wir melden uns.');
  const tConsult = useText('losungen_cta', 'losungen-cta-consult', '30-minütiges Beratungsgespräch buchen');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const industries = [
    'Consumer Electronics',
    'Haushaltsgeräte',
    'Sport & Outdoor',
    'Kosmetik',
    'Food & Beverages',
  ];

  const handleNext = () => {
    if (selectedIndustry) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#111] relative overflow-hidden">
      {/* Lime ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8D400]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C8D400]/4 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header — homepage style on dark bg */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C8D400]/15 border border-[#C8D400]/30 px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-[#C8D400] animate-pulse" />
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">{tBadge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            BEREIT FÜR<br />
            <span className="text-primary-500">MESSBAREN ERFOLG?</span>
          </h2>
          <p className="text-base text-white/60 max-w-xl mx-auto mt-4">
            {tSub}
          </p>
        </div>

        {/* Quick Start Form */}
        <div className="bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] p-8 md:p-10 mb-8 rounded-sm">
          {/* Lime top accent */}
          <div className="h-[2px] bg-[#C8D400] mb-8 w-12"></div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center bg-[#C8D400]/20 border-2 border-[#C8D400]/40 mx-auto mb-4">
                <i className="ri-check-double-line text-3xl text-primary-500"></i>
              </div>
              <h3 className="text-xl font-black text-white mb-2 uppercase">Vielen Dank!</h3>
              <p className="text-white/60 text-sm mb-6">
                Wir melden uns in Kürze bezüglich <strong className="text-primary-500">{selectedIndustry}</strong>.
              </p>
              <button
                onClick={() => { setSubmitted(false); setSelectedIndustry(''); }}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/[0.08] text-white/70 font-black text-xs uppercase tracking-wider hover:border-[#C8D400] hover:text-primary-500 transition-all cursor-pointer whitespace-nowrap rounded-sm"
              >
                <i className="ri-refresh-line"></i>
                Neu starten
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-black text-white uppercase tracking-wider">
                    In welcher Branche bist du aktiv?
                  </h3>
                  <span className="text-xs text-white/30 font-bold">Schritt 1 von 1</span>
                </div>

                <div className="space-y-2">
                  {industries.map((industry, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all duration-200 ${
                        selectedIndustry === industry
                          ? 'border-[#C8D400] bg-[#C8D400]/10'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="industry"
                        value={industry}
                        checked={selectedIndustry === industry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-4 h-4 accent-[#C8D400] cursor-pointer"
                      />
                      <span className={`text-sm font-bold transition-colors duration-200 ${selectedIndustry === industry ? 'text-white' : 'text-white/50'}`}>
                        {industry}
                      </span>
                      {selectedIndustry === industry && (
                        <i className="ri-check-line text-primary-500 ml-auto text-base"></i>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!selectedIndustry}
                className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap ${
                  selectedIndustry
                    ? 'bg-[#C8D400] text-[#111] hover:bg-white hover:scale-[1.02] cursor-pointer'
                    : 'bg-white/[0.06] text-white/20 cursor-not-allowed'
                }`}
                style={{ borderRadius: 0 }}
              >
                <span>Anfrage absenden</span>
                <i className="ri-arrow-right-line text-base"></i>
              </button>
            </>
          )}
        </div>

        {/* Alternative CTA */}
        <div className="text-center">
          <p className="text-white/40 text-sm mb-6 font-semibold">
            Oder buche direkt ein Beratungsgespräch
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespräch%20anfragen`}
            className="inline-flex items-center gap-3 bg-transparent border-2 border-[#C8D400]/40 text-white px-8 py-4 font-black text-sm uppercase tracking-wider hover:border-[#C8D400] hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap"
            style={{ borderRadius: 0 }}
          >
            <i className="ri-calendar-line text-lg"></i>
            <span>{tConsult}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
