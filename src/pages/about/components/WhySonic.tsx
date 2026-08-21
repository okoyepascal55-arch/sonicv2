import { useEffect, useRef, useState } from 'react';
import { openCalendly } from '@/components/feature/CalendlyWidget';

export default function WhySonic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="kontakt" className="bg-white py-14 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          className={`border border-black/8 py-6 md:py-8 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center sm:text-left">
            <p className="text-sm md:text-[15px] font-bold text-foreground-950 leading-relaxed">
              Lass uns besprechen, wie Sonic deine <span className="text-[#C8D400]">Marke unterstützen kann.</span>
            </p>
            <p className="text-xs text-black/35 mt-1 hidden sm:block">
              Unabhängige Agentur — über 500 Projekte — B2B, B2B2C & D2C
            </p>
          </div>
          <button
            type="button"
            onClick={() => openCalendly()}
            className="inline-flex items-center gap-2 bg-foreground-950 text-white px-6 py-3 font-black hover:bg-primary-500 hover:text-[#111] transition-all duration-300 whitespace-nowrap cursor-pointer text-xs flex-shrink-0"
          >
            <i className="ri-calendar-line text-sm"></i>
            Beratungsgespräch buchen
          </button>
        </div>
      </div>
    </section>
  );
}