import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const { images: videoMedia } = useMediaStore('home_video');
  const { images: stripIcons } = useMediaStore('home_video_strip_wood_icons');

  const getStripIcon = (idx: number) => stripIcons[idx]?.url || stripDefaults[idx].fallbackIcon;

  const stripDefaults = [
    { fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20promoters%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20people%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-team-video-strip-01&orientation=squarish', label: '20.000+ Promoter' },
    { fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20shop%20building%20retail%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20store%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-store-video-strip-02&orientation=squarish', label: 'DACH-weit' },
    { fallbackIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20euro%20coin%20currency%20money%20sales%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20euro%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=72&height=72&seq=wood-euro-video-strip-03&orientation=squarish', label: '€2,19 Mrd. Umsatz' },
  ];

  const coverImage = videoMedia[0]?.url || 'https://readdy.ai/api/search-image?query=cinematic%20retail%20activation%20event%20scene%20with%20brand%20promoters%20engaging%20customers%20at%20modern%20trade%20show%20booth%20warm%20ambient%20lighting%20dynamic%20crowd%20interaction%20professional%20product%20demonstration%20sleek%20contemporary%20exhibition%20design%20with%20digital%20screens%20and%20branded%20displays%20high%20end%20commercial%20photography%20shallow%20depth%20of%20field%20editorial%20quality&width=1600&height=900&seq=video-cover-sonic-2026&orientation=landscape';
  const youtubeUrl = videoMedia[1]?.url || 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&loop=1&playlist=2H1rFHQsG4g&rel=0&modestbranding=1';

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Subtle highlight glow for video section */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-[#C8D400]/30 px-4 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">Sonic in Action</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-foreground-950 mb-5 leading-tight">
            ERLEBE SONIC DOINGS<br />
            <span className="text-primary-500">IN 2 MINUTEN.</span>
          </h2>
          <p className="text-base text-foreground-700 max-w-3xl mx-auto mb-3 leading-relaxed">
            Schau dir an, wie Sonic die Omnichannel-Lücke im echten Retail schließt — mit Menschen, die Marken erlebbar machen, und Aktionen, die sichtbar Umsatz bewegen.
          </p>
          <p className="text-sm text-foreground-500 max-w-3xl mx-auto leading-relaxed">
            Von POS und Field Sales über Activations, Events und Community Outreach bis hin zu echten Markenerlebnissen: So wird aus Strategie reale Wirkung.
          </p>
          <p className="text-sm font-bold text-[#111] mt-4 tracking-wide">People powered. Data proven.</p>
        </div>

        {/* Video Player */}
        <div className="relative overflow-hidden shadow-2xl" style={{ borderRadius: 0 }} role="region" aria-label="Sonic Retail Activation Video">
          {/* Border */}
          <div className="absolute inset-0 border-4 border-[#C8D400]/30 pointer-events-none z-20" style={{ borderRadius: 0 }} aria-hidden="true"></div>

          {!playing ? (
            /* ── Cover State ── */
            <div className="relative w-full h-[200px] sm:h-[320px] md:h-[480px] bg-[#1a1a1a] cursor-pointer group" onClick={() => setPlaying(true)} role="button" tabIndex={0} aria-label="Play Sonic video" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPlaying(true); }}>
              {/* Cover image */}
              <img
                src={coverImage}
                alt="Sonic Retail Activation"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/35"></div>

              {/* Central Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  {/* Outer ripple ring */}
                  <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-[#C8D400]/40 animate-ping opacity-70" style={{ animationDuration: '3s' }}></div>

                  {/* Button background circle */}
                  <div
                    className="relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #C8D400 0%, #a8b300 100%)',
                      boxShadow: '0 0 60px rgba(200,212,0,0.5), 0 8px 32px rgba(168,179,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Play triangle icon */}
                    <div className="w-0 h-0 ml-1.5"
                      style={{
                        borderTop: '16px solid transparent',
                        borderBottom: '16px solid transparent',
                        borderLeft: '28px solid #fff',
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                      }}
                    ></div>
                  </div>

                  {/* Hover glow ring */}
                  <div className="absolute inset-0 w-28 h-28 rounded-full border border-[#C8D400]/20 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>

              {/* Bottom subtle label */}
              <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.25em] transition-opacity duration-500 group-hover:opacity-0">Klicken zum Abspielen</span>
              </div>
            </div>
          ) : (
            /* ── Playing State ── */
            <div className="relative w-full h-[200px] sm:h-[320px] md:h-[480px]">
              <iframe
                className="w-full h-full"
                src={youtubeUrl}
                title="Sonic Retail Activation Excellence"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        {/* Wooden icon strip */}
        <div className="flex items-center justify-center gap-5 sm:gap-10 mt-8 flex-wrap">
          {[
            { woodIcon: getStripIcon(0), label: '20.000+ Promoter' },
            { woodIcon: getStripIcon(1), label: 'DACH-weit' },
            { woodIcon: getStripIcon(2), label: '€2,19 Mrd. Umsatz' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 group cursor-default">
              <div
                className="w-9 h-9 overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: '0 2px 8px rgba(139,90,43,0.2)',
                }}
              >
                <img
                  src={item.woodIcon}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-bold text-foreground-600 group-hover:text-foreground-950 transition-colors duration-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}