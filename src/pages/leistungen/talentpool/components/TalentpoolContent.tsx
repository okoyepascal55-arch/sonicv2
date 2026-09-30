import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';

const TALENTPOOL_CHALLENGE_ICONS = ['ri-user-unfollow-line', 'ri-loop-right-line', 'ri-eye-off-line'];

const SOLUTION_BASE = [
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20shield%20check%20protection%20trust%20employment%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-shield-talent-01&orientation=squarish',
    number: '01',
    icon: 'ri-shield-check-line',
    tags: ['Bei Sonic angestellt', 'Verlässlich'],
  },
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20graduation%20cap%20training%20knowledge%20product%20education%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-grad-talent-02&orientation=squarish',
    number: '02',
    icon: 'ri-graduation-cap-line',
    tags: ['Produktwissen', 'Schulung'],
  },
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20screen%20analytics%20reporting%20live%20data%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-dash-talent-03&orientation=squarish',
    number: '03',
    icon: 'ri-dashboard-line',
    tags: ['Echtzeit', 'Motivation'],
  },
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20nationwide%20reach%20germany%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-pin-talent-04&orientation=squarish',
    number: '04',
    icon: 'ri-map-pin-2-line',
    tags: ['Deutschlandweit', '>1.800 Talente'],
  },
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20star%20person%20specialized%20expert%20talent%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-star-talent-05&orientation=squarish',
    number: '05',
    icon: 'ri-user-star-line',
    tags: ['Kategorie-Training', 'Expertise'],
  },
  {
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20performance%20tracking%20analytics%20kpi%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chart-talent-06&orientation=squarish',
    number: '06',
    icon: 'ri-bar-chart-2-line',
    tags: ['Standort-Check-in', 'Transparenz'],
  },
];

const PROFILE_BASE = [
  {
    number: '01',
    icon: 'ri-user-star-line',
    tags: ['POS-Aktivierung', 'Beratung & Verkauf', 'Demo & Erklärung'],
    imgIndex: 0,
  },
  {
    number: '02',
    icon: 'ri-video-line',
    tags: ['Live-Video-Calls', 'Online-Shop-Integration', 'After-Sales'],
    imgIndex: 1,
  },
  {
    number: '03',
    icon: 'ri-presentation-line',
    tags: ['Händlerschulungen', 'Produktwissen', 'Retail-Coaching'],
    imgIndex: 2,
  },
  {
    number: '04',
    icon: 'ri-calendar-event-line',
    tags: ['Instore-Events', 'Roadshows', 'Messen & Promotions'],
    imgIndex: 3,
  },
];

const FALLBACK_PROFILES = [
  'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg',
];

const STAT_COUNT = 4;

export default function TalentpoolContent() {
  const { images: profileImages } = useMediaStore('leistungen_talentpool_profiles_images');
  const tCh = useLeistungenText('leistungen_talentpool_challenges');
  const tSol = useLeistungenText('leistungen_talentpool_solution');
  const tSt = useLeistungenText('leistungen_talentpool_stats');
  const tPr = useLeistungenText('leistungen_talentpool_profiles');
  const TALENTPOOL_CHALLENGES: ChallengeItem[] = TALENTPOOL_CHALLENGE_ICONS.map((icon, i) => ({
    icon, title: tCh[`c${i + 1}-title`], desc: tCh[`c${i + 1}-desc`], trigger: tCh[`c${i + 1}-trigger`],
  }));
  const SOLUTIONS = SOLUTION_BASE.map((s, i) => ({ ...s, accent: tSol[`s${i + 1}-accent`], title: tSol[`s${i + 1}-title`], desc: tSol[`s${i + 1}-desc`] }));
  const PROFILES = PROFILE_BASE.map((p, i) => ({ ...p, type: tPr[`p${i + 1}-type`], accent: tPr[`p${i + 1}-accent`], desc: tPr[`p${i + 1}-desc`] }));
  const STATS = Array.from({ length: STAT_COUNT }, (_, i) => ({ value: tSt[`stat-${i + 1}-value`], label: tSt[`stat-${i + 1}-label`] }));
  const tChallengeHeading = useText('leistungen_talentpool_content', 'talentpool-challenge-heading', 'Wechselnde Gesichter. Kein Markenwissen. Kein ROI.');
  const tChallengeSub = useText('leistungen_talentpool_content', 'talentpool-challenge-sub', 'Wer Personal nur über lose Netzwerke bucht, bekommt selten echte Markenbotschafter.');
  const tSolutionHeading = useText('leistungen_talentpool_content', 'talentpool-solution-heading', 'Der Sonic-Talentpool. Menschen, die wir kennen.');
  const tSolutionSub = useText('leistungen_talentpool_content', 'talentpool-solution-sub', 'Handverlesen, geschult und im Einsatz bei Sonic angestellt. Daten liefern die Fakten, Menschen den Unterschied.');
  const tProfilesHeading = useText('leistungen_talentpool_content', 'talentpool-profiles-heading', '4 Rollen. Ein Ansprechpartner.');
  const tProfilesSub = useText('leistungen_talentpool_content', 'talentpool-profiles-sub', 'Jeden Talent-Typ aus einer Hand — koordiniert, geschult und live getrackt.');

  const getProfileImg = (index: number) => {
    const item = profileImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_PROFILES[index];
  };

  return (
    <>
      {/* ── Challenge Section — shared component with black bg ── */}
      <ChallengeSection
        id="herausforderung"
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={TALENTPOOL_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── Solution Section (light warm bg — directly after dark ChallengeSection) ── */}
      <section id="loesung" className="sonic-section-md bg-white px-4 md:px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />

        <div className="sonic-container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tSol['eyebrow']}</span>
              </div>
              <h2 className="sonic-h2 text-foreground-950 mb-3">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-foreground-950/40 text-sm leading-relaxed max-w-xs lg:text-right">
              {tSolutionSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTIONS.map((s) => (
              <div
                key={s.number}
                className="relative overflow-hidden p-6"
                style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)' }}
              >
                <div
                  className="absolute bottom-3 right-4 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '4.5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}
                >
                  {s.number}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 overflow-hidden mb-4 flex-shrink-0 relative" style={{ background: 'rgba(0,0,0,0.06)' }}>
                    {s.woodIcon ? (
                      <img src={s.woodIcon} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className={`${s.icon} text-lg`} style={{ color: 'oklch(var(--primary-500))' }} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">{s.accent}</span>
                  <h3 className="text-base font-black text-foreground-950 mt-1 mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-foreground-950/55 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip — dark, runs into talentprofile section visually ── */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>
      <section id="stats" className="bg-foreground-950 px-4 md:px-6 pb-0">
        <div className="sonic-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary-500/10 border border-primary-500/10 overflow-hidden">
            {STATS.map((s, i) => (
              <div key={i} className="bg-foreground-950 p-6 md:p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors duration-300" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="sonic-h2 text-primary-500 mb-1.5 relative z-10">{s.value}</div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider leading-snug relative z-10">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Talent Profiles (horizontal scroll, dark bg — intentional alternation) ── */}
      <section id="talentprofile" className="sonic-section-md bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/4 blur-3xl pointer-events-none" />
        <div className="sonic-container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tPr['eyebrow']}</span>
              </div>
              <h2 className="sonic-h2 text-white mb-3">{tProfilesHeading}</h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:text-right">
              {tProfilesSub}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILES.map((p, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="absolute bottom-2 right-3 font-black leading-none select-none pointer-events-none z-0"
                  style={{ fontSize: '4.5rem', color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}
                >
                  {p.number}
                </div>

                <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                  <img src={getProfileImg(idx)} alt={p.type} className="w-full h-full object-cover object-top" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1" style={{ background: 'oklch(var(--primary-500))', color: '#111' }}>{p.type}</span>
                  </div>
                </div>

                <div className="relative z-10 p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5" style={{ background: 'rgba(200,212,0,0.5)' }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(200,212,0,0.6)' }}>{p.accent}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
