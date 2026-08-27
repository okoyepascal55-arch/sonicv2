import { useMediaStore } from '@/lib/mediaStore';

export default function TeamHero() {
  const { images: teamHeroImages } = useMediaStore('team_hero_images');
  const heroImage = teamHeroImages[0]?.url || 'https://readdy.ai/api/search-image?query=professional%20team%20collaboration%20in%20modern%20office%20workspace%20diverse%20group%20of%20sales%20consultants%20working%20together%20bright%20natural%20lighting%20contemporary%20interior%20design%20teamwork%20atmosphere%20business%20environment%20productive%20meeting%20space&width=1920&height=1080&seq=team-hero-dark-bg&orientation=landscape';

  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-foreground-950" style={{ paddingTop: 'clamp(56px, 14vw, 80px)', paddingBottom: '60px' }}>
      {/* Dark background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Team background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{"Our Team"}</span>
          </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-5 md:mb-8 leading-tight break-words">
          NUR WELTKLASSE-<wbr />PROFIS
          <br />
          FÜR{' '}
          <span className="text-primary-500">WELTKLASSE-<wbr />MARKEN</span>
        </h1>
        
        <p className="text-base md:text-xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Wir suchen Fachberater, die für die Marke brennen. Menschen, die Ärmel hochkrempeln 
          und mit anpacken – denn bei Sonic lieben und leben wir Marken.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a 
            href="/karriere" 
            className="w-full sm:w-auto px-6 py-3.5 bg-primary-500 text-foreground-950 font-black hover:bg-white hover:text-foreground-950 transition-all whitespace-nowrap cursor-pointer text-sm"
            style={{ borderRadius: 0 }}
          >
            Offene Stellen ansehen
          </a>
          <a 
            href="#values" 
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer text-sm"
            style={{ borderRadius: 0 }}
          >
            Unsere Werte entdecken
          </a>
        </div>
        
        {/* Team photo cards */}
        <div className="mt-10 md:mt-16 flex justify-center gap-3 md:gap-6 flex-wrap">
          <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform" style={{ outline: '2px solid rgba(139,90,43,0.3)' }}>
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20friendly%20sales%20consultant%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-1&orientation=squarish"
              alt="Team member"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform" style={{ outline: '2px solid rgba(139,90,43,0.3)' }}>
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20confident%20brand%20ambassador%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-2&orientation=squarish"
              alt="Team member"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform" style={{ outline: '2px solid rgba(139,90,43,0.3)' }}>
            <img
              src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20enthusiastic%20retail%20specialist%20smiling%20warm%20lighting%20clean%20background&width=96&height=96&seq=team-photo-3&orientation=squarish"
              alt="Team member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-3xl text-primary-500"></i>
      </div>
    </section>
  );
}
