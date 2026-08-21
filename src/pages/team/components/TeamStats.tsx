import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

export default function TeamStats() {
  const tBadge = useText('team_stats', 'team-stats-badge', 'Our Numbers');
  const tHeading = useText('team_stats', 'team-stats-heading', 'ZAHLEN, DIE SPRECHEN');
  const tSub = useText('team_stats', 'team-stats-sub', 'Über ein Jahrzehnt Erfahrung mit den größten Marken');

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats = [
    {
      number: '650.000+',
      label: 'Man-Days Delivered',
      icon: 'ri-calendar-check-line'
    },
    {
      number: '500+',
      label: 'Successful Projects',
      icon: 'ri-trophy-line'
    },
    {
      number: '100.000+',
      label: 'POS Implementations',
      icon: 'ri-store-3-line'
    },
    {
      number: '13+',
      label: 'Years Experience',
      icon: 'ri-time-line'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="text-3xl lg:text-5xl font-black text-foreground-950 mb-6 leading-tight tracking-tight">
            {tHeading}
          </h2>
          <p className="text-xl text-foreground-600 max-w-3xl mx-auto">
            {tSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Featured stat — full width on mobile, spans 1 col + taller on desktop */}
          <div 
            className="lg:col-span-1 lg:row-span-1 relative p-8 md:p-10 bg-white transition-all border border-foreground-100 cursor-pointer flex flex-col justify-center"
            style={{
              borderRadius: 0,
              minHeight: '200px',
              transform: hoveredIndex === 0 ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoveredIndex === 0 ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
              className="absolute bottom-0 left-0 right-0 transition-all duration-300"
              style={{
                height: hoveredIndex === 0 ? '3px' : '0px',
                background: '#C8D400'
              }}
            />
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                style={{
                  borderRadius: 0,
                  background: hoveredIndex === 0 ? '#C8D400' : 'rgba(200,212,0,0.12)'
                }}
              >
                <i className={`${stats[0].icon} text-2xl transition-colors duration-300`}
                  style={{ color: hoveredIndex === 0 ? '#111' : '#C8D400' }}
                ></i>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-black mb-1 text-[#C8D400]">{stats[0].number}</div>
                <div className="text-sm text-foreground-500 uppercase tracking-wider font-semibold">{stats[0].label}</div>
              </div>
            </div>
          </div>

          {/* Remaining 3 stats */}
          {stats.slice(1).map((stat, index) => {
            const realIndex = index + 1;
            return (
            <div 
              key={realIndex}
              className="relative p-6 md:p-8 bg-white transition-all border border-foreground-100 cursor-pointer flex items-center gap-4"
              style={{
                borderRadius: 0,
                transform: hoveredIndex === realIndex ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredIndex === realIndex ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={() => setHoveredIndex(realIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: hoveredIndex === realIndex ? '3px' : '0px',
                  background: '#C8D400'
                }}
              />
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                style={{
                  borderRadius: 0,
                  background: hoveredIndex === realIndex ? '#C8D400' : 'rgba(200,212,0,0.12)'
                }}
              >
                <i className={`${stat.icon} text-xl transition-colors duration-300`}
                  style={{ color: hoveredIndex === realIndex ? '#111' : '#C8D400' }}
                ></i>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black mb-0.5 text-foreground-950">{stat.number}</div>
                <div className="text-xs text-foreground-500 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}