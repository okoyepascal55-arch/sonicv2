import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

export default function IndustryCTA() {
  const tBadge = useText('industries_cta', 'industries-cta-badge', 'Kein Commitment. Nur ein Gespräch.');
  const tHeading = useText('industries_cta', 'industries-cta-heading', 'LASS UNS DEINE BRANCHE BESPRECHEN.');
  const tSub = useText('industries_cta', 'industries-cta-sub', 'Produktlaunch, Markteintritt oder Optimierung — wir haben die Branchenexpertise.');
  const tBtn = useText('industries_cta', 'industries-cta-btn-1', 'Beratung anfragen');
  return (
    <section id="contact" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container relative z-10">

        {/* Main CTA block */}
        <div className="bg-foreground-950 p-6 sm:p-10 md:p-16 text-center relative overflow-hidden" style={{ borderRadius: 0 }}>
          {/* Top lime accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-500" style={{ boxShadow: '0 0 20px rgba(200,212,0,0.6)' }} />
          {/* Lime glow orb */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-500/6 blur-[90px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">{tBadge}</span>
          </div>

          <h2 className="sonic-h2 text-white mb-6">
            {tHeading.split('.')[0] || tHeading}.<br />
            <span className="text-primary-500">{tHeading.includes('.') ? tHeading.split('.').slice(1).join('.') : 'BRANCHE BESPRECHEN.'}</span>
          </h2>

          <p className="text-base text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            {tSub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 px-7 py-3 bg-primary-500 text-foreground-950 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap text-sm"
              style={{ borderRadius: 0 }}
            >
              {tBtn}
              <i className="ri-arrow-right-line" />
            </a>
            <a
              href="tel:+4921514794440"
              className="inline-flex items-center gap-3 px-7 py-3 border-2 border-primary-500 text-primary-500 font-black hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap text-sm"
              style={{ borderRadius: 0 }}
            >
              <i className="ri-phone-line" />
              +49 2151 479 444 0
            </a>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground-200 mt-px">
          {[
            { icon: 'ri-mail-line', title: 'E-Mail', content: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
            { icon: 'ri-phone-line', title: 'Telefon', content: '+49 2151 479 444 0', href: 'tel:+4921514794440' },
            { icon: 'ri-map-pin-line', title: 'Adresse', content: 'Campus Fichtenhain 46\n47807 Krefeld', href: undefined },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 text-center group hover:bg-[#FAFDF5] transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-primary-500/15">
                <i className={`${item.icon} text-xl text-primary-500`}></i>
              </div>
              <h3 className="font-black text-foreground-950 mb-2 text-sm uppercase tracking-wide leading-tight">{item.title}</h3>
              {item.href ? (
                <a href={item.href} className="text-foreground-500 hover:text-primary-500 transition-colors cursor-pointer text-sm">
                  {item.content}
                </a>
              ) : (
                <p className="text-foreground-500 text-sm whitespace-pre-line">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
