import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizModal from './QuizModal';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const challengeData = [
  {
    id: 'markteintritt',
    number: '01',
    tag: 'MARKTEINTRITT',
    heading: 'MARKTEINTRITT',
    desc: 'Neue Marken und Produkte sind erklärungsbedürftig. Wir machen deine Botschaft am POS, per Video und per Live-Kommunikation erlebbar.',
    fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20rocket%20launch%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20rocket%20ship%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-rocket-challenge-1&orientation=squarish',
    solutionKey: 'markteintritt',
    cta: 'MEHR DAZU',
    tags: ['Markteinführung', 'POS', 'Live-Kommunikation'],
  },
  {
    id: 'absatz',
    number: '02',
    tag: 'ABSATZ STEIGERN',
    heading: 'ABSATZ STEIGERN',
    desc: 'Unsere Field-Force-Teams sorgen dafür, dass euer Produkt im Retail stärker verkauft wird. Planbar. Profitabel. Immer im Blick: Zielerreichung und ROI.',
    fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20growth%20arrow%20upward%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20rising%20graph%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-chart-challenge-2&orientation=squarish',
    solutionKey: 'absatz',
    cta: 'MEHR DAZU',
    tags: ['Field Force', 'Retail', 'ROI'],
  },
  {
    id: 'omnichannel',
    number: '03',
    tag: 'OMNICHANNEL OPTIMIEREN',
    heading: 'OMNICHANNEL OPTIMIEREN',
    desc: 'Bereichert Packaging und Online-Shop mit Zugang zu Live-Video-Kaufberatung: Conversions steigern, Retouren vermeiden.',
    fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20shop%20building%20icon%20made%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20retail%20storefront%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-carved-store-challenge-3&orientation=squarish',
    solutionKey: 'omnichannel',
    cta: 'MEHR DAZU',
    tags: ['Live-Video', 'E-Commerce', 'Conversions'],
  },
];

export default function ChallengeSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const navigate = useNavigate();
  const { images: woodIcons } = useMediaStore('home_challenge_wood_icons');

  const challenges = challengeData.map((c, i) => ({
    ...c,
    woodIcon: woodIcons[i]?.url || c.fallbackWoodIcon,
  }));

  // ── Text Store hooks ──
  const tBadge = useText('home_challenge', 'home-challenge-badge', 'Deine Challenge');
  const tHeading = useText('home_challenge', 'home-challenge-heading', 'Drei Wege. Ein Partner.');
  const tPath1Title = useText('home_challenge', 'home-challenge-path-1', 'Markteintritt');
  const tPath2Title = useText('home_challenge', 'home-challenge-path-2', 'Absatz steigern');
  const tPath3Title = useText('home_challenge', 'home-challenge-path-3', 'Omnichannel');
  const tPath1Desc = useText('home_challenge', 'home-challenge-path-1-desc', '');
  const tPath2Desc = useText('home_challenge', 'home-challenge-path-2-desc', '');
  const tPath3Desc = useText('home_challenge', 'home-challenge-path-3-desc', '');
  const tPaths = [tPath1Title, tPath2Title, tPath3Title];
  const tDescs = [tPath1Desc, tPath2Desc, tPath3Desc];

  const handleMehrDazu = (solutionKey: string) => {
    navigate(`/losungen?open=${solutionKey}`);
  };

  const isActive = (id: string) => hoveredCard === id || focusedCard === id;

  return (
    <>
      <section id="losungen" className="sonic-section-md px-4 md:px-6 bg-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-full max-w-[600px] h-[600px] bg-primary-500/3 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/2 rounded-full blur-[100px]"></div>
        </div>

        <div className="sonic-container relative z-10">
          {/* Header */}
          <div className="sonic-section-header">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950">
              {(() => {
                const sentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
                const main = sentences[0] ?? tHeading;
                const accent = sentences.length > 1 ? sentences.slice(1).join(' ') : '';
                return (
                  <>
                    {main}{' '}
                    {accent && (
                      <span
                        style={{
                          background: 'oklch(var(--primary-500) / 0.9)',
                          color: 'oklch(var(--foreground-950))',
                          padding: '0.02em 0.16em',
                          boxDecorationBreak: 'clone',
                          WebkitBoxDecorationBreak: 'clone',
                        }}
                      >
                        {accent}
                      </span>
                    )}
                  </>
                );
              })()}
            </h2>
            <p className="sonic-subline">
              An welchem Punkt stehst du?
            </p>
          </div>

          {/* Challenge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {challenges.map((challenge) => {
              const active = isActive(challenge.id);

              return (
                <div
                  key={challenge.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  style={{
                    background: active
                      ? 'oklch(var(--foreground-950))'
                      : '#ffffff',
                    border: active
                      ? '1px solid oklch(var(--primary-500) / 0.4)'
                      : '1px solid oklch(var(--foreground-950) / 0.1)',
                    borderRadius: 0,
                  }}
                  onMouseEnter={() => setHoveredCard(challenge.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setFocusedCard(challenge.id)}
                  onBlur={() => setFocusedCard(null)}
                >
                  {/* Lime accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 transition-all duration-500"
                    style={{
                      height: active ? '3px' : '2px',
                      background: active ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)',
                      boxShadow: active ? '0 0 20px rgba(200,212,0,0.6)' : 'none',
                    }}
                    aria-hidden="true"
                  />

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 md:p-8 flex flex-col h-full">
                    {/* Number + Icon row */}
                    <div className="flex items-start justify-between mb-3 md:mb-7">
                      <span
                        className="font-black leading-none transition-all duration-500 select-none text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
                        style={{
                          color: active ? 'rgba(200,212,0,0.15)' : 'rgba(0,0,0,0.06)',
                          letterSpacing: '-0.04em',
                          lineHeight: 1,
                        }}
                        aria-hidden="true"
                      >
                        {challenge.number}
                      </span>
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 overflow-hidden transition-all duration-500 flex-shrink-0"
                        style={{
                          border: active ? '1px solid oklch(var(--primary-500) / 0.4)' : '1px solid oklch(var(--primary-500) / 0.3)',
                        }}
                      >
                        <img
                          src={challenge.woodIcon}
                          alt={challenge.heading}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Heading */}
                    <h3
                      className="text-base sm:text-lg md:text-xl font-black mb-2 md:mb-3 leading-tight transition-colors duration-500"
                      style={{ color: active ? '#ffffff' : 'oklch(var(--foreground-950))' }}
                    >
                      {challenge.heading}
                    </h3>

                    {/* Divider line */}
                    <div
                      className="mb-3 md:mb-4 transition-all duration-500"
                      style={{
                        height: '1px',
                        background: active ? 'rgba(200,212,0,0.25)' : 'rgba(0,0,0,0.08)',
                      }}
                      aria-hidden="true"
                    />

                    <p
                      className="text-xs sm:text-sm leading-relaxed flex-1 mb-4 md:mb-6 transition-colors duration-500"
                      style={{ color: active ? 'rgba(255,255,255,0.7)' : '#6B7280' }}
                    >
                      {challenge.desc}
                    </p>

                    {/* CTA — navigates to Lösungen and opens the matching solution */}
                    <button
                      onClick={() => handleMehrDazu(challenge.solutionKey)}
                      className="inline-flex items-center gap-2 font-black text-[10px] sm:text-xs uppercase tracking-widest px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 whitespace-nowrap w-fit cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      style={{
                        background: active ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.07)',
                        color: active ? 'oklch(var(--foreground-950))' : '#6B7280',
                      }}
                    >
                      {challenge.cta}
                      <i
                        className="ri-arrow-down-line text-sm transition-transform duration-300"
                        style={{ transform: active ? 'translateY(3px)' : 'translateY(0)' }}
                      ></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
}