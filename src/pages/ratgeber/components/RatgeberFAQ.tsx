import { useState } from 'react';
import type { FAQItem } from '../data/types';
import SchemaOrg from '@/components/feature/SchemaOrg';

interface RatgeberFAQProps {
  faqs: FAQItem[];
}

function buildFAQSchema(faqs: FAQItem[]) {
  return {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export default function RatgeberFAQ({ faqs }: RatgeberFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <SchemaOrg type="faq" data={buildFAQSchema(faqs)} />
      <section className="sonic-section-lg md:bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="leist-h2 text-foreground-950 mb-10">
            Häufig gestellte Fragen
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border border-foreground-950/10 bg-white transition-colors duration-200"
                  style={{ borderRadius: 0 }}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-[#FAFDF5] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-foreground-950 pr-4 leading-snug">{faq.question}</span>
                    <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <i className="ri-arrow-down-s-line text-primary-500 text-lg"></i>
                    </div>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '600px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-5 text-foreground-950/70 text-sm md:text-base leading-relaxed border-t border-foreground-950/5 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}