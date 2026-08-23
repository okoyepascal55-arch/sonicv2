import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { openCalendly } from '@/components/feature/CalendlyWidget';
import { useText } from '@/hooks/useText';
import SectionBadge from '@/components/base/SectionBadge';
import WoodenButton from '@/components/base/WoodenButton';

export default function CaseStudiesCTA() {
  const tBadge = useText('casestudies_cta', 'casestudies-cta-badge', 'Lass uns sprechen');
  const tHeading = useText('casestudies_cta', 'casestudies-cta-heading', 'Deine Marke. Unser Einsatz.');
  const tSub = useText('casestudies_cta', 'casestudies-cta-sub', 'Wir bringen deine Marke dort zum Leuchten, wo die Kaufentscheidung fällt.');
  const tBtn1 = useText('casestudies_cta', 'casestudies-cta-btn-1', 'Gespräch buchen');
  const tBtn2 = useText('casestudies_cta', 'casestudies-cta-btn-2', 'Leistungen ansehen');

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);

  const benefits = [
    'Free consultation to understand your goals',
    'Custom strategy tailored to your brand',
    'Measurable results from day one',
  ];

  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-primary-500/8 rounded-none blur-3xl pointer-events-none"></div>

      <div className="sonic-container relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <SectionBadge text={tBadge} variant="dark" />
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            {tHeading}
          </h2>
          <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
            {tSub}
          </p>
        </div>

        {/* Main CTA Card */}
        <div
          className="rounded-none overflow-hidden relative mb-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`absolute inset-0 rounded-none border-4 transition-all duration-500 pointer-events-none z-20 ${isHovered ? 'border-primary-500' : 'border-foreground-100'}`} style={isHovered ? { boxShadow: '0 0 30px rgba(200,212,0,0.3)' } : {}}></div>

          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-[260px] lg:h-auto min-h-[260px]">
              <img
                src="https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg"
                alt="Partner with SONIC"
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/60 via-transparent to-transparent pointer-events-none"></div>
              <div className={`absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary-500 transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary-500 transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            {/* Content */}
            <div className="p-10 bg-white flex flex-col justify-center relative">
              <div className={`absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary-500 transition-all duration-500 pointer-events-none hidden lg:block ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary-500 transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary-500 rounded-none flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openCalendly()}
                  className="bg-primary-500 text-foreground-950 px-7 py-4 font-black text-sm uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <i className="ri-calendar-line"></i>
                  {tBtn1}
                </button>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Case Studies Request`}
                  className="bg-foreground-950 text-white px-7 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#2A2A2A] transition-all duration-300 whitespace-nowrap cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <i className="ri-download-line"></i>
                  {tBtn2}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {[
            { icon: 'ri-mail-line', label: 'Email Us', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            { icon: 'ri-phone-line', label: 'Call Us', value: '+49 2151 479 444 0', href: 'tel:+4921514794440' },
          ].map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              className="bg-white rounded-none p-5 transition-all duration-300 relative overflow-hidden cursor-pointer flex items-center gap-4 border border-foreground-100 hover:border-primary-500/40 group"
              onMouseEnter={() => setHoveredContact(index)}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-none">
                <defs>
                  <linearGradient id={`contact-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredContact === index ? 0.8 : 0.15} />
                    <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredContact === index ? 0.4 : 0.05} />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="0" ry="0" fill="none"
                  stroke={`url(#contact-grad-${index})`}
                  strokeWidth={hoveredContact === index ? 2 : 1}
                  style={{ filter: hoveredContact === index ? 'drop-shadow(0 0 5px rgba(200,212,0,0.4))' : 'none', transition: 'all 0.4s ease' }}
                >
                  {hoveredContact === index && (
                    <animate attributeName="stroke-dashoffset" values="0;-60" dur="4s" repeatCount="indefinite" />
                  )}
                </rect>
              </svg>
              <div className="w-11 h-11 bg-primary-500/15 flex items-center justify-center relative z-10 group-hover:bg-primary-500/25 transition-colors duration-300 flex-shrink-0" style={{ borderRadius: 0 }}>
                <i className={`${contact.icon} text-xl text-primary-500`}></i>
              </div>
              <div className="relative z-10 min-w-0">
                <p className="text-xs text-foreground-500 font-semibold uppercase tracking-wide">{contact.label}</p>
                <p className="text-sm font-black text-foreground-950 truncate">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
