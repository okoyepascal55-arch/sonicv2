import type { ContentSection } from '../data/types';

interface RatgeberContentProps {
  sections: ContentSection[];
}

export default function RatgeberContent({ sections }: RatgeberContentProps) {
  return (
    <section className="sonic-section-lg md:bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {sections.map((section, index) => (
          <div key={index} className={`mb-14 ${index === sections.length - 1 ? 'mb-0' : ''}`}>
            <h2 className="sonic-h2 text-foreground-950 mb-5">
              {section.title}
            </h2>
            <p className="text-base text-foreground-950/70 leading-relaxed mb-5">
              {section.content}
            </p>

            {section.highlights && section.highlights.length > 0 && (
              <ul className="space-y-3 mt-4">
                {section.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center bg-primary-500 flex-shrink-0 mt-0.5" style={{ borderRadius: 0 }}>
                      <i className="ri-check-line text-white text-xs"></i>
                    </div>
                    <span className="text-foreground-950/70 text-sm md:text-base leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}