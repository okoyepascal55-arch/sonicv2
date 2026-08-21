import { useState } from 'react';
import QuizModal from './QuizModal';
import { useMediaStore } from '@/lib/mediaStore';

export default function ConsultationButton() {
  const [quizOpen, setQuizOpen] = useState(false);
  const { images: woodIcons } = useMediaStore('home_consultation_wood_icon');
  const woodIcon = woodIcons[0]?.url || 'https://readdy.ai/api/search-image?query=carved%20wooden%20compass%20direction%20finder%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20navigation%20tool%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-compass-survey-cta-v1&orientation=squarish';

  return (
    <>
      <section className="py-12 md:py-14 px-4 md:px-6 bg-white relative overflow-hidden">
        {/* Subtle lime ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary-500/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          {/* Ruling line with label */}
          <div className="flex items-center gap-5 w-full max-w-2xl mb-8">
            <div className="flex-1 h-px bg-[#111]/10" />
            <span className="text-xs font-black text-foreground-950/30 uppercase tracking-[0.3em] whitespace-nowrap">Dein nächster Schritt</span>
            <div className="flex-1 h-px bg-[#111]/10" />
          </div>

          {/* Single survey CTA */}
          <button
            onClick={() => setQuizOpen(true)}
            className="group flex items-center gap-4 sm:gap-6 bg-primary-500 text-white px-6 sm:px-10 py-5 font-black transition-all duration-300 cursor-pointer hover:bg-[#111] hover:text-white w-full max-w-2xl"
            style={{ borderRadius: 0 }}
          >
            {/* Wooden icon */}
            <div
              className="w-14 h-14 overflow-hidden flex-shrink-0 transition-all duration-300"
              style={{
                boxShadow: '0 4px 14px rgba(139,90,43,0.35)',
              }}
            >
              <img
                src={woodIcon}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text block */}
            <div className="text-left flex-1">
              <div
                className="text-xs font-black uppercase tracking-[0.28em] mb-1 transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                30-Sekunden Kurzumfrage
              </div>
              <div className="text-base md:text-lg font-black uppercase tracking-wide leading-tight">
                Welche Sonic-Lösung passt zu dir?
              </div>
            </div>

            {/* Arrow */}
            <i className="ri-arrow-right-line text-2xl flex-shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
          </button>

          {/* Subline */}
          <p className="text-xs text-[#111]/35 mt-4 font-semibold tracking-wide">
            Keine Registrierung · Kein Commitment · Sofortiges Ergebnis
          </p>
        </div>
      </section>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}
