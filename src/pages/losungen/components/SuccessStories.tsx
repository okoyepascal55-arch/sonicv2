import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

export default function SuccessStories() {
  const tBadge = useText('losungen_stories', 'losungen-stories-badge', 'Erfolgsgeschichten');
  const tHeading = useText('losungen_stories', 'losungen-stories-heading', 'SONIC PERFORMT.');
  const tSub = useText('losungen_stories', 'losungen-stories-sub', 'Was unsere Kunden über die Zusammenarbeit sagen.');
  const tLink = useText('losungen_stories', 'losungen-stories-link', 'Fallstudie lesen');

  const stories = [
    {
      company: 'Garmin',
      quote: '„Seit 2021 verbindet GARMIN und SONIC eine erfolgreiche Partnerschaft im Bereich Verkaufsunterstützung am POS. Wir empfehlen Sonic uneingeschränkt weiter."',
      author: 'Dana Eichinger',
      position: 'Director Marketing DACH, Garmin Deutschland GmbH',
      logo: 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      link: '/fallbeispiele/garmin'
    },
    {
      company: 'Groupe SEB',
      quote: '„Hier finde ich, ohne großes Excel Kung-Fu, was ich benötige. Die SRT ist ein nützliches Tool und erleichtert unsere tägliche Arbeit."',
      author: 'Ramin Dirinpur',
      position: 'Sales Promotion & Sales Training Manager, Groupe SEB Deutschland GmbH',
      logo: 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      link: '/fallbeispiele/groupe-seb'
    },
    {
      company: 'Philips TV & Sound',
      quote: '„Durch die SRT können wir live in unsere Projekte reinschauen und jederzeit sehen, wie unsere Erwartungen erfüllt werden."',
      author: 'Murat Yatkin',
      position: 'Managing Director DACH, Philips TV & Sound @TP Vision',
      logo: 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887',
      link: '/fallbeispiele/philips'
    },
    {
      company: 'Avoury',
      quote: '„Die Zusammenarbeit mit Sonic hat unsere Marktpräsenz deutlich gestärkt. Professionell, zuverlässig und messbar erfolgreich."',
      author: 'Marketing Director',
      position: 'Avoury',
      logo: 'https://cdn.brandfetch.io/melitta.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX',
      link: '/fallbeispiele'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4 leading-tight tracking-tight uppercase">
            {tHeading}
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto">
            {tSub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-foreground-100 hover:border-[#C8D400]/40 group"
              style={{ borderRadius: 0 }}
            >
              {/* Logo */}
              <div className="h-16 mb-6 flex items-center justify-center">
                <img
                  src={story.logo}
                  alt={`${story.company} logo`}
                  className="max-h-full max-w-[180px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Quote */}
              <blockquote className="text-foreground-700 text-lg leading-relaxed mb-6 italic">
                {story.quote}
              </blockquote>

              {/* Author */}
              <div className="mb-6">
                <p className="font-black text-[#1a1a1a]">{story.author}</p>
                <p className="text-sm text-foreground-600">{story.position}</p>
              </div>

              {/* CTA */}
              <a
                href={story.link}
                className="inline-flex items-center gap-2 text-[#C8D400] font-bold hover:gap-4 transition-all duration-300 cursor-pointer group-hover:text-foreground-950"
              >
                <span className="whitespace-nowrap">{tLink}</span>
                <i className="ri-arrow-right-line text-lg"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}