import type { InternalLink } from '../data/types';

interface RatgeberInternalLinksProps {
  links: InternalLink[];
}

export default function RatgeberInternalLinks({ links }: RatgeberInternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground-950 leading-tight tracking-tight mb-3">
          Sonic Group Services
        </h2>
        <p className="text-foreground-950/55 text-base mb-8">
          Entdecken Sie, wie Sonic Group diese Strategien für Ihre Marke umsetzt:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group block border border-foreground-950/10 bg-white p-5 hover:border-[#C8D400]/50 transition-all duration-300 cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-arrow-right-up-line text-[#C8D400] text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"></i>
                <h4 className="text-base font-black text-foreground-950 group-hover:text-[#C8D400] transition-colors duration-200 leading-snug">
                  {link.label}
                </h4>
              </div>
              <p className="text-foreground-950/55 text-sm leading-relaxed pl-7">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}