import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const { images: videoMedia } = useMediaStore('home_video');

  const coverImage = videoMedia[0]?.url || 'https://readdy.ai/api/search-image?query=cinematic%20retail%20activation%20event%20scene%20with%20brand%20promoters%20engaging%20customers%20at%20modern%20trade%20show%20booth%20warm%20ambient%20lighting%20dynamic%20crowd%20interaction%20professional%20product%20demonstration%20sleek%20contemporary%20exhibition%20design%20with%20digital%20screens%20and%20branded%20displays%20high%20end%20commercial%20photography%20shallow%20depth%20of%20field%20editorial%20quality&width=1600&height=900&seq=video-cover-sonic-2026-v2&orientation=landscape';
  const youtubeUrl = videoMedia[1]?.url || 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&loop=1&playlist=2H1rFHQsG4g&rel=0&modestbranding=1';

  return (
    <section className="sonic-section-md px-4 md:px-6 bg-white">
      <div className="sonic-container">
        {/* ── Unified Card ── */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.05)',
            border: '1px solid rgba(15,23,42,0.05)',
          }}
        >
          {/* Inner padding */}
          <div className="px-6 pt-10 pb-8 md:px-12 md:pt-14 md:pb-10">
            {/* ── Header: headline + subline, centered ── */}
            <div className="sonic-section-header" style={{ marginBottom: '2rem' }}>
              <h2 className="sonic-h2 text-foreground-950">
                Erlebe Sonic{' '}
                <span className="relative inline-block">
                  <span
                    className="relative z-10 px-2 py-0.5"
                    style={{
                      background: 'linear-gradient(180deg, rgba(200,212,0,0.35) 0%, rgba(200,212,0,0.15) 100%)',
                      borderRadius: 4,
                    }}
                  >
                    in 2 Minuten.
                  </span>
                </span>
              </h2>
              <p className="sonic-subline mt-3">
                Schau dir an, wie Sonic die Omnichannel-Lücke im echten Retail schließt — mit Menschen, die Marken erlebbar machen.
              </p>
            </div>

            {/* ── Video Player ── */}
            <div
              className="relative mx-auto overflow-hidden"
              style={{
                maxWidth: 960,
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
              }}
              role="region"
              aria-label="Sonic Retail Activation Video"
            >
              {/* Subtle inner frame line */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  border: '1px solid rgba(15,23,42,0.08)',
                  borderRadius: 12,
                }}
                aria-hidden="true"
              />

              {!playing ? (
                <div
                  className="relative w-full bg-[#1a1a1a] cursor-pointer group"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => setPlaying(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play Sonic video"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setPlaying(true);
                  }}
                >
                  {/* Cover image */}
                  <img
                    src={coverImage}
                    alt="Sonic Retail Activation"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Gentle dark overlay */}
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/30" />

                  {/* Play Button — clean, premium */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative">
                      {/* Single soft pulse ring */}
                      <div
                        className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border border-primary-500/30 animate-ping opacity-60"
                        style={{
                          borderRadius: '50%',
                          animationDuration: '2.5s',
                        }}
                      />

                      {/* Button */}
                      <div
                        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                        style={{
                          backgroundColor: '#C8D400',
                          borderRadius: '50%',
                          boxShadow: '0 8px 32px rgba(200,212,0,0.35), 0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        {/* Play triangle */}
                        <div
                          className="w-0 h-0 ml-1"
                          style={{
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            borderLeft: '18px solid #fff',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-5 left-0 right-0 text-center z-10">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 group-hover:opacity-0">
                      Klicken zum Abspielen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full bg-[#1a1a1a]" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={youtubeUrl}
                    title="Sonic Retail Activation Excellence"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: 12 }}
                  />
                </div>
              )}
            </div>

            {/* ── Bottom micro-bar ── */}
            <div className="flex items-center justify-center gap-6 mt-6 md:mt-8 flex-wrap">
              <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">
                20.000+ Promoter
              </span>
              <span className="w-1 h-1 bg-foreground-300" style={{ borderRadius: '50%' }} />
              <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">
                DACH-weit
              </span>
              <span className="w-1 h-1 bg-foreground-300" style={{ borderRadius: '50%' }} />
              <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">
                €2,19 Mrd. Umsatz
              </span>
              <span className="w-1 h-1 bg-foreground-300" style={{ borderRadius: '50%' }} />
              <a
                href="https://www.youtube.com/watch?v=2H1rFHQsG4g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-youtube-fill text-sm" />
                </span>
                Auf YouTube ansehen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}