import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function CoreValues() {
  const tBadge = useText('team_corevalues', 'team-values-badge', 'Our Values');
  const tHeading = useText('team_corevalues', 'team-values-heading', 'UNSERE WERTE');
  const tSub = useText('team_corevalues', 'team-values-sub', 'Vier Säulen, die unsere Arbeitsweise definieren');

  const { images: coreValuesImages } = useMediaStore('team_corevalues_images');
  const values = [
    {
      title: 'MENSCH',
      subtitle: 'People First',
      description: 'Menschen, die Marken prägen. Wir setzen auf Fachberater, die für die Marke brennen. Das Ergebnis? Transparent und messbar – jederzeit schwarz auf weiß nachvollziehbar.',
      icon: 'ri-user-heart-line',
      image: (coreValuesImages[0] && coreValuesImages[0].url) || 'https://www.sonic-group.de/wp-content/uploads/2023/01/2.jpg'
    },
    {
      title: 'MOTIVATION',
      subtitle: 'Individual Growth',
      description: 'Nicht jeder lässt sich durch dasselbe motivieren. Wettbewerbsfähige Bezahlung, Entwicklungsperspektiven und ein direkter Ansprechpartner im Projektteam – anstelle einer anonymen Hotline.',
      icon: 'ri-rocket-2-line',
      image: (coreValuesImages[1] && coreValuesImages[1].url) || 'https://www.sonic-group.de/wp-content/uploads/2023/01/3.jpg'
    },
    {
      title: 'DATEN',
      subtitle: 'Data-Driven',
      description: 'Entscheidungen beginnen mit Intuition – werden jedoch mit Daten analysiert, evaluiert und getroffen. Jahrelange Erfahrung und umfassende Daten helfen uns, die richtigen Maßnahmen zu entwickeln.',
      icon: 'ri-bar-chart-box-line',
      image: (coreValuesImages[2] && coreValuesImages[2].url) || 'https://www.sonic-group.de/wp-content/uploads/2023/01/4.jpg'
    },
    {
      title: 'WERKZEUG',
      subtitle: 'Modern Tools',
      description: 'Eigene Prozesse beherrschen – aber nicht alles selbst entwickeln. Unser Inhouse-IT-Team programmiert oder sourct gezielt die richtigen Tools für die Herausforderungen unserer Kunden.',
      icon: 'ri-tools-line',
      image: (coreValuesImages[3] && coreValuesImages[3].url) || 'https://www.sonic-group.de/wp-content/uploads/2023/01/5.jpg'
    }
  ];

  return (
    <section id="values" className="py-12 md:py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="text-3xl lg:text-5xl font-black text-foreground-950 mb-6 leading-tight tracking-tight relative inline-block">
            {tHeading}
          </h2>
          <p className="text-xl text-foreground-600 max-w-3xl mx-auto mt-4">
            {tSub}
          </p>
        </div>

        <div className="space-y-24">
          {values.map((value, index) => (
            <div 
              key={index}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="aspect-[4/3] overflow-hidden border border-foreground-200" style={{ borderRadius: 0 }}>
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                {/* Icon */}
                <div className="mb-6 inline-block relative">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#C8D400]/20 border-2 border-[#C8D400]/40" style={{ borderRadius: 0 }}>
                    <i className={`${value.icon} text-2xl text-[#C8D400]`}></i>
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-black text-foreground-950 mb-2 leading-tight tracking-tight">
                  {value.title}
                </h3>
                
                <p className="text-base text-[#C8D400] font-black mb-5 mt-2 uppercase tracking-wide">
                  {value.subtitle}
                </p>
                
                <p className="text-sm md:text-base leading-relaxed text-foreground-600">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
