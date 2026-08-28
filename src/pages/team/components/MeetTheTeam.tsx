import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function MeetTheTeam() {
  const tBadge = useText('team_meet_the_team', 'team-mtt-badge', 'Our People');
  const tHeading = useText('team_meet_the_team', 'team-mtt-heading', 'MEET THE TEAM');
  const tSub = useText('team_meet_the_team', 'team-mtt-sub', 'Real people, real stories, real impact');

  const [activeProfile, setActiveProfile] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredPolaroid, setHoveredPolaroid] = useState(false);
  const { images: woodIcons } = useMediaStore('team_meet_team_wood_icons');
  const getWoodIcon = (idx: number) => woodIcons[idx]?.url || highlightsData[idx].fallbackWoodIcon;

  const highlightsData = [
    { icon: 'ri-heart-pulse-line', title: 'Human-First Culture', desc: '5.15 years average tenure—3x the industry standard', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20heart%20pulse%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-heart-chestnut&orientation=squarish' },
    { icon: 'ri-user-star-line', title: 'Growth Opportunities', desc: 'Clear career paths with mentorship and training programs', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20star%20person%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-star-chestnut&orientation=squarish' },
    { icon: 'ri-team-line', title: 'Diverse Family', desc: '2.000+ professionals from all backgrounds united by purpose', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=wooden%20team%20group%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=48&height=48&seq=wood-group-chestnut&orientation=squarish' },
  ];

  const profiles = [
    {
      name: 'Hassibullah',
      role: 'Sales Professional',
      story: 'From refugee to top performer—Hassibullah joined Sonic with determination and now leads our most challenging accounts.',
      metric: '127% of target',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg',
      icon: 'ri-star-line',
      duration: '2:45',
      views: '8.2K',
    },
    {
      name: 'Andrew',
      role: 'International Account Manager',
      story: 'Worked in 22 countries before finding his home at Sonic. His global perspective shapes our international strategies.',
      metric: '22 countries',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
      icon: 'ri-global-line',
      duration: '3:12',
      views: '6.5K',
    },
    {
      name: 'Peter',
      role: 'Regional Lead',
      story: 'After a career setback, Peter rebuilt his confidence at Sonic. Now he mentors others through their own comebacks.',
      metric: '5 years tenure',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg',
      icon: 'ri-shield-check-line',
      duration: '4:08',
      views: '9.1K',
    },
    {
      name: 'Tanja',
      role: 'Recruitment Lead',
      story: 'Tanja built our hiring process from scratch, achieving 98% satisfaction. She knows what makes great talent tick.',
      metric: '98% satisfaction',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
      icon: 'ri-user-heart-line',
      duration: '3:35',
      views: '7.8K',
    },
    {
      name: 'Janina',
      role: 'HR Director',
      story: 'Champions our human-first culture. Under her leadership, average tenure reached 5.15 years—3x industry average.',
      metric: '5.15 years avg',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
      icon: 'ri-heart-pulse-line',
      duration: '5:22',
      views: '11.3K',
    },
    {
      name: 'Marcel',
      role: 'Garmin Account Lead',
      story: 'Drove Garmin revenue from €947/day to €2,178/day. His strategic approach sets the standard for account management.',
      metric: '+130% growth',
      image: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg',
      icon: 'ri-line-chart-line',
      duration: '4:15',
      views: '10.4K',
    },
  ];

  const currentProfile = profiles[activeProfile];

  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Subtle highlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-primary-500/8 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/6 blur-3xl pointer-events-none"></div>
      
      <div className="sonic-container relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          </div>
          <h2 className="sonic-h2 text-foreground-950 mb-3">{tHeading}</h2>
          <p className="text-base md:text-xl text-foreground-600 max-w-2xl mx-auto">{tSub}</p>
        </div>

        {/* Video Showcase Area — side-by-side layout */}
        <div 
          className="relative overflow-visible group cursor-pointer"
          style={{ borderRadius: 0, minHeight: '420px', background: 'oklch(var(--foreground-950))' }}
          onMouseEnter={() => setIsVideoHovered(true)}
          onMouseLeave={() => setIsVideoHovered(false)}
        >
          {/* Dark background fill */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#101410,#090c08)' }} />

          {/* Corner accents */}
          <div className={`hidden md:block absolute top-5 left-5 w-10 h-10 z-20 transition-all duration-500 ${isVideoHovered ? 'opacity-100' : 'opacity-40'}`} style={{ borderTop: '1.5px solid rgba(200,212,0,0.5)', borderLeft: '1.5px solid rgba(200,212,0,0.5)' }} />
          <div className={`hidden md:block absolute top-5 right-5 w-10 h-10 z-20 transition-all duration-500 ${isVideoHovered ? 'opacity-100' : 'opacity-40'}`} style={{ borderTop: '1.5px solid rgba(200,212,0,0.5)', borderRight: '1.5px solid rgba(200,212,0,0.5)' }} />

          {/* Animated lime border on hover */}
          <div
            className={`absolute inset-0 border-4 transition-all duration-500 pointer-events-none z-20 ${isVideoHovered ? 'border-primary-500' : 'border-transparent'}`}
            style={{ borderRadius: 0 }}
          />

          {/* Content — side by side: polaroid left + profile panel right */}
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-0 h-full min-h-[420px]">
            {/* ── POLAROID FRAME — left side ── */}
            <div
              className="relative flex flex-col flex-shrink-0 self-center md:self-auto m-4 md:m-0"
              onMouseEnter={() => setHoveredPolaroid(true)}
              onMouseLeave={() => setHoveredPolaroid(false)}
              style={{
                background: 'oklch(var(--background-100))',
                padding: '8px 8px 40px 8px',
                boxShadow: hoveredPolaroid
                  ? '0 32px 80px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.6)'
                  : '0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)',
                transform: hoveredPolaroid
                  ? 'rotate(0deg) scale(1.02) translateY(-8px)'
                  : 'rotate(-0.8deg) scale(1)',
                transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)',
                width: 'clamp(280px, 44%, 420px)',
                cursor: 'pointer',
              }}
            >
              {/* Photo area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className={`w-full h-full object-cover object-top transition-transform duration-700 ${isVideoHovered ? 'scale-105' : 'scale-100'}`}
                  style={{ filter: 'contrast(1.04) brightness(0.93)' }}
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 transition-opacity duration-500 ${isVideoHovered ? 'opacity-80' : 'opacity-100'}`} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'oklch(var(--primary-500))' }} />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className={`w-12 h-12 md:w-16 md:h-16 bg-primary-500 flex items-center justify-center shadow-2xl transform transition-all duration-500 cursor-pointer ${isVideoHovered ? 'scale-125 bg-[#b8c400]' : 'scale-100'}`} style={{ borderRadius: 0 }}>
                    <i className={`ri-play-fill text-xl md:text-3xl text-white ml-0.5 md:ml-1 transition-transform duration-300 ${isVideoHovered ? 'scale-110' : 'scale-100'}`}></i>
                  </button>
                </div>
              </div>

              {/* Polaroid caption strip */}
              <div className="flex flex-col items-center justify-center pt-2.5 pb-1 relative overflow-hidden" style={{ background: 'oklch(var(--background-100))' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'grain\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23grain)\' opacity=\'0.12\'/%3E%3C/svg%3E")', backgroundSize: '120px 120px', opacity: 0.6, mixBlendMode: 'multiply' }} />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(180,160,120,0.04) 3px, rgba(180,160,120,0.04) 4px)', opacity: 0.8 }} />
                <div className="relative z-10 text-[11px] font-black uppercase tracking-[0.14em] text-foreground-950/70 leading-none">{currentProfile.name}</div>
                <div className="relative z-10 text-[9px] font-medium uppercase tracking-[0.1em] text-foreground-950/40 mt-0.5">{currentProfile.role}</div>
              </div>
            </div>

            {/* ── PROFILE PANEL — right side ── */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-2 md:gap-3 mb-3">
                <div className="w-7 h-7 md:w-9 md:h-9 bg-primary-500 flex items-center justify-center" style={{ borderRadius: 0 }}>
                  <i className={`${currentProfile.icon} text-sm md:text-lg text-white`}></i>
                </div>
                <span className="text-primary-500 font-bold text-xs md:text-sm">{currentProfile.role}</span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-3">{currentProfile.name}&apos;s Story</h3>
              <p className="text-sm md:text-base text-white/70 mb-5 leading-relaxed max-w-lg">{currentProfile.story}</p>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm">
                <div className="flex items-center gap-1.5 text-white/50">
                  <i className="ri-time-line"></i>
                  <span>{currentProfile.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50">
                  <i className="ri-eye-line"></i>
                  <span>{currentProfile.views} views</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary-500 font-bold">
                  <i className="ri-trophy-line"></i>
                  <span>{currentProfile.metric}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6 md:mt-8">
          {profiles.map((profile, index) => (
            <button
              key={index}
              onClick={() => setActiveProfile(index)}
              className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 font-bold transition-all whitespace-nowrap cursor-pointer text-sm ${
                activeProfile === index
                  ? 'bg-primary-500 text-foreground-950 shadow-lg'
                  : 'bg-white text-foreground-600 hover:bg-foreground-100 border-2 border-foreground-200 hover:border-primary-500/50'
              }`}
              style={{ borderRadius: 0 }}
            >
              <i className={`${profile.icon} text-base`}></i>
              <span>{profile.name}</span>
            </button>
          ))}
        </div>

        {/* Key Highlights Below */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {[
            { icon: 'ri-heart-pulse-line', title: 'Human-First Culture', desc: '5.15 years average tenure—3x the industry standard', woodIcon: getWoodIcon(0) },
            { icon: 'ri-user-star-line', title: 'Growth Opportunities', desc: 'Clear career paths with mentorship and training programs', woodIcon: getWoodIcon(1) },
            { icon: 'ri-team-line', title: 'Diverse Family', desc: '2.000+ professionals from all backgrounds united by purpose', woodIcon: getWoodIcon(2) },
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white p-5 md:p-6 border border-foreground-100 hover:border-primary-500/40 transition-all duration-500 relative overflow-visible cursor-pointer"
              style={{ borderRadius: 0 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Subtle green background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8D400]/3 via-transparent to-[#C8D400]/5 pointer-events-none" />
              
              {/* Single Wavy SVG Border Line - matching homepage */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                  <linearGradient id={`team-highlight-single-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredCard === index ? 1 : 0.2} />
                    <stop offset="50%" stopColor="#a8b300" stopOpacity={hoveredCard === index ? 1 : 0.12} />
                    <stop offset="100%" stopColor="oklch(var(--primary-500))" stopOpacity={hoveredCard === index ? 1 : 0.2} />
                  </linearGradient>
                </defs>
                
                {/* Single wavy line */}
                <rect
                  x="2"
                  y="2"
                  width="calc(100% - 4px)"
                  height="calc(100% - 4px)"
                  rx="0"
                  ry="0"
                  fill="none"
                  stroke={`url(#team-highlight-single-${index})`}
                  strokeWidth={hoveredCard === index ? 2 : 0.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all ease-out"
                  style={{
                    filter: hoveredCard === index ? 'drop-shadow(0 0 6px rgba(200, 212, 0, 0.5))' : 'none',
                    transitionDuration: '1.2s',
                  }}
                >
                  {hoveredCard === index && (
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-60"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  )}
                </rect>
              </svg>
              
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 overflow-hidden bg-primary-500/15" style={{ borderRadius: 0 }}>
                  <img
                    src={item.woodIcon}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-base font-black text-foreground-950 mb-1.5 leading-tight tracking-tight">{item.title}</h4>
                <p className="text-foreground-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
