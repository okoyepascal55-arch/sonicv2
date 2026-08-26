import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function TrainingDevelopment() {
  const tBadge = useText('team_training', 'team-training-badge', 'Growth & Development');
  const tHeading = useText('team_training', 'team-training-heading', 'TRAINING & ENTWICKLUNG');
  const tSub = useText('team_training', 'team-training-sub', 'Wir investieren kontinuierlich in die Entwicklung unserer Mitarbeiter.');

  const { images: trainingImages } = useMediaStore('team_training_image');
  const trainingImg = trainingImages[0]?.url || 'https://readdy.ai/api/search-image?query=professional%20training%20session%20with%20instructor%20teaching%20group%20of%20engaged%20employees%20in%20modern%20bright%20classroom%20setting%20collaborative%20learning%20environment%20minimal%20design%20clean&width=800&height=1000&seq=team-training-v2&orientation=portrait';

  const programs = [
    {
      title: 'Brand Training',
      description: 'Intensive Schulungen zu Produkten, Markenidentität und Verkaufstechniken',
      icon: 'ri-book-open-line'
    },
    {
      title: 'Career Development',
      description: 'Klare Entwicklungspfade und Aufstiegsmöglichkeiten innerhalb des Unternehmens',
      icon: 'ri-line-chart-line'
    },
    {
      title: 'Continuous Learning',
      description: 'Regelmäßige Weiterbildungen und Zugang zu modernen Lernplattformen',
      icon: 'ri-graduation-cap-line'
    },
    {
      title: 'Mentorship',
      description: 'Erfahrene Kollegen als Mentoren für persönliche und berufliche Entwicklung',
      icon: 'ri-user-star-line'
    }
  ];

  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-white">
      <div className="sonic-container">
        <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
          </div>
            <h2 className="sonic-h2 text-foreground-950 mb-5">
              {tHeading}
            </h2>
            <p className="text-base md:text-lg text-foreground-600 mb-10 leading-relaxed">
              {tSub}
            </p>

            <div className="space-y-4">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 bg-white border border-foreground-100 hover:border-primary-500/40 hover:bg-white transition-all duration-300"
                  style={{ borderRadius: 0 }}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-500/15 flex-shrink-0" style={{ borderRadius: 0 }}>
                    <i className={`${program.icon} text-lg text-primary-500`}></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-foreground-950 mb-1 uppercase tracking-wide leading-tight">{program.title}</h3>
                    <p className="text-sm text-foreground-500 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden border border-foreground-200" style={{ borderRadius: 0, aspectRatio: '4/5' }}>
              <img
                src={trainingImg}
                alt="Training Session"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Lime accent corner */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary-500/15 border-2 border-primary-500/30 -z-10" style={{ borderRadius: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
