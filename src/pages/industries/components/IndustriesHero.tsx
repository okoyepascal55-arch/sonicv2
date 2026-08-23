import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';

export default function IndustriesHero() {
  const { images: industriesHeroImages } = useMediaStore('industries_hero_bg');
  const heroImage = industriesHeroImages[0]?.url || 'https://readdy.ai/api/search-image?query=modern%20consumer%20electronics%20retail%20store%20interior%20premium%20product%20displays%20smartphones%20smartwatches%20home%20appliances%20professional%20brand%20activation%20team%20engaging%20customers%20dramatic%20overhead%20lighting%20cinematic%20dark%20moody%20atmosphere%20wide%20angle&width=1920&height=1080&seq=industries-hero-v2&orientation=landscape';

  return (
    <section className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950" style={{ paddingTop: '80px' }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Branchen"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80"></div>
      </div>

      {/* Lime ambient glow */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-500/6 blur-[120px] pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <div className="max-w-[640px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6">
          <span className="w-1.5 h-1.5 bg-foreground-950" />
          Unsere Branchen
        </div>

        <h1 className="sonic-h1 text-white mb-5 md:mb-6">
          TIEFE BRANCHEN-<br />
          <span className="text-primary-500">EXPERTISE.</span>
        </h1>

        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-3">
          Consumer Electronics, Haushaltsgeräte, Beauty und Lifestyle-Marken.
        </p>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[480px] mb-6 md:mb-8">
          Wir verstehen dein Marktumfeld, deine Konsumenten und was wirklich den Abverkauf antreibt — mit 17+ Jahren Erfahrung im DACH-Raum.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#industries"
            className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 bg-primary-500 text-foreground-950 font-bold text-xs md:text-sm hover:bg-white transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-building-2-line"></i>
            Alle Branchen entdecken
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 border border-white/40 text-white font-bold text-xs md:text-sm hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-chat-1-line"></i>
            Branche besprechen
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
