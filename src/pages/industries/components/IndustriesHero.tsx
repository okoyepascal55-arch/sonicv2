import SectionBadge from '@/components/base/SectionBadge';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';

export default function IndustriesHero() {
  const { images: industriesHeroImages } = useMediaStore('industries_hero_bg');
  const heroImage = industriesHeroImages[0]?.url || 'https://readdy.ai/api/search-image?query=modern%20consumer%20electronics%20retail%20store%20interior%20premium%20product%20displays%20smartphones%20smartwatches%20home%20appliances%20professional%20brand%20activation%20team%20engaging%20customers%20dramatic%20overhead%20lighting%20cinematic%20dark%20moody%20atmosphere%20wide%20angle&width=1920&height=1080&seq=industries-hero-v2&orientation=landscape';

  return (
    <section className="relative min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Branchen"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70"></div>
      </div>

      {/* Lime ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-500/6 blur-[120px] pointer-events-none z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 text-center w-full">
        {/* Badge */}
        <SectionBadge text="Unsere Branchen" variant="light" className="mb-6" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight">
          TIEFE BRANCHEN-<br />
          <span className="text-primary-500">EXPERTISE.</span>
        </h1>

        <p className="text-base md:text-xl text-white/80 mb-3 md:mb-4 font-semibold max-w-3xl mx-auto">
          Consumer Electronics, Haushaltsgeräte, Beauty und Lifestyle-Marken.
        </p>
        <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12">
          Wir verstehen dein Marktumfeld, deine Konsumenten und was wirklich den Abverkauf antreibt — mit 17+ Jahren Erfahrung im DACH-Raum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#industries"
            className="inline-flex items-center gap-2 bg-primary-500 text-[#111] px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-building-2-line"></i>
            Alle Branchen entdecken
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 font-black text-sm uppercase tracking-wider hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-chat-1-line"></i>
            Branche besprechen
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <i className="ri-arrow-down-line text-3xl text-primary-500"></i>
      </div>
    </section>
  );
}
