import type { AnswerFirstData } from '../data/types';

interface RatgeberAnswerFirstProps {
  data: AnswerFirstData;
}

export default function RatgeberAnswerFirst({ data }: RatgeberAnswerFirstProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground-950 leading-tight tracking-tight mb-6">
          {data.question}
        </h2>
        <div className="border-l-4 border-[#C8D400] pl-6">
          <p className="text-base md:text-lg text-foreground-950/70 leading-relaxed">
            {data.answer}
          </p>
        </div>
      </div>
    </section>
  );
}