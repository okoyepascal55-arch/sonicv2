import type { InternalLink } from '../data/types';

interface RatgeberInternalLinksProps {
  links: InternalLink[];
}

export default function RatgeberInternalLinks({ links }: RatgeberInternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="sonic-section-lg md:" style={{ background: 'linear-gradient(180deg, oklch(var(--background-100)) 0%, white 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="leist-h2 text-foreground-950 mb-3">
          Sonic Group Services
        </h2>
        <p className="text-foreground-950/55 text-base mb-8">
          Entdecke, wie Sonic Group diese Strategien für deine Marke umsetzt:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group block border border-foreground-950/10 bg-white p-5 hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-arrow-right-up-line text-primary-500 text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"></i>
                <h4 className="text-base font-black text-foreground-950 group-hover:text-primary-500 transition-colors duration-200 leading-snug">
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