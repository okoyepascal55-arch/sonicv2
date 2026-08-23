import type { InternalLink } from '../data/types';

interface RatgeberCrossLinksProps {
  links: InternalLink[];
}

export default function RatgeberCrossLinks({ links }: RatgeberCrossLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 px-3 py-1 mb-5" style={{ borderRadius: 0 }}>
          <i className="ri-links-line text-foreground-950/60 text-xs"></i>
          <span className="text-xs font-black text-foreground-950/60 uppercase tracking-widest">Weiterführende Ratgeber</span>
        </div>

        <h2 className="sonic-h2 text-foreground-950 mb-3">
          Verwandte Themen
        </h2>
        <p className="text-foreground-950/55 text-base mb-8">
          Vertiefen Sie Ihr Wissen mit diesen thematisch verwandten Ratgeber-Artikeln:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group block border border-foreground-950/10 bg-[#fafaf8] p-5 hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-article-line text-primary-500 text-sm group-hover:scale-110 transition-transform duration-200"></i>
                <h4 className="text-sm font-black text-foreground-950 group-hover:text-primary-500 transition-colors duration-200 leading-snug">
                  {link.label}
                </h4>
              </div>
              <p className="text-foreground-950/50 text-xs leading-relaxed">
                {link.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-primary-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Weiterlesen</span>
                <i className="ri-arrow-right-line text-xs group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}