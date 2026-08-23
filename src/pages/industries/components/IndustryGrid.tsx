import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function IndustryGrid() {
  const tBadge = useText('industries_grid', 'industries-grid-badge', 'Unsere Sektoren');
  const tHeading = useText('industries_grid', 'industries-grid-heading', 'BRANCHEN-EXPERTISE.');
  const tSub = useText('industries_grid', 'industries-grid-sub', 'Bewährte Erfolge in verschiedenen Sektoren mit maßgeschneiderten Strategien.');

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { images: gridImages } = useMediaStore('industries_grid_images');

  const industries = [
    {
      title: 'Consumer Electronics',
      description: 'TVs, smartphones, wearables, audio equipment, and smart home devices',
      brands: ['Philips', 'Canon', 'Garmin', 'TCL', 'OPPO'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20electronics%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-electronics-chestnut&orientation=squarish',
      image: (gridImages[0] && gridImages[0].url) || 'https://readdy.ai/api/search-image?query=modern%20consumer%20electronics%20display%20with%20smartphones%20smartwatches%20and%20audio%20devices%20in%20premium%20retail%20setting%20clean%20professional%20lighting&width=800&height=600&seq=industry-electronics&orientation=landscape',
      stats: ['100,000+ POS', '€2B+ Sales Influenced']
    },
    {
      title: 'Home Appliances',
      description: 'Kitchen appliances, vacuum cleaners, coffee machines, and household electronics',
      brands: ['Groupe SEB', 'Tefal', 'Krups', 'Rowenta', 'WMF'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20home%20appliance%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-appliance-chestnut&orientation=squarish',
      image: (gridImages[1] && gridImages[1].url) || 'https://readdy.ai/api/search-image?query=premium%20kitchen%20appliances%20and%20home%20electronics%20displayed%20in%20modern%20showroom%20with%20clean%20white%20background%20professional%20product%20photography&width=800&height=600&seq=industry-appliances&orientation=landscape',
      stats: ['24% Cost Reduction', '130+ POS Locations']
    },
    {
      title: 'Beauty & Personal Care',
      description: 'Cosmetics, skincare, haircare, and professional beauty equipment',
      brands: ['L\'Oréal', 'Professional Beauty Brands'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20beauty%20cosmetics%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-beauty-chestnut&orientation=squarish',
      image: (gridImages[2] && gridImages[2].url) || 'https://readdy.ai/api/search-image?query=luxury%20beauty%20and%20cosmetics%20products%20elegantly%20displayed%20in%20premium%20retail%20environment%20with%20soft%20lighting%20and%20clean%20aesthetic&width=800&height=600&seq=industry-beauty&orientation=landscape',
      stats: ['Premium Positioning', 'Expert Training']
    },
    {
      title: 'Lifestyle & Wellness',
      description: 'Fitness equipment, wellness products, and lifestyle brands',
      brands: ['Vorwerk', 'Melitta', 'Avoury'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20heart%20wellness%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-wellness-chestnut&orientation=squarish',
      image: (gridImages[3] && gridImages[3].url) || 'https://readdy.ai/api/search-image?query=wellness%20and%20lifestyle%20products%20including%20fitness%20equipment%20and%20premium%20lifestyle%20brands%20in%20modern%20retail%20space%20bright%20clean%20environment&width=800&height=600&seq=industry-lifestyle&orientation=landscape',
      stats: ['1,987% Growth', 'Cross-Selling Success']
    },
    {
      title: 'Automotive & Mobility',
      description: 'Navigation systems, dashcams, and automotive accessories',
      brands: ['Garmin Automotive'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20car%20automobile%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-car-chestnut&orientation=squarish',
      image: (gridImages[4] && gridImages[4].url) || 'https://readdy.ai/api/search-image?query=automotive%20navigation%20systems%20and%20car%20accessories%20displayed%20in%20modern%20retail%20setting%20with%20professional%20lighting%20and%20clean%20background&width=800&height=600&seq=industry-automotive&orientation=landscape',
      stats: ['130% Revenue Growth', '€2,178/day Average']
    },
    {
      title: 'Entertainment & Media',
      description: 'Streaming services, entertainment systems, and media subscriptions',
      brands: ['Sky', 'Entertainment Providers'],
      woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20television%20tv%20icon%20carved%20from%20dark%20chestnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background&width=64&height=64&seq=wood-tv-chestnut&orientation=squarish',
      image: (gridImages[5] && gridImages[5].url) || 'https://readdy.ai/api/search-image?query=entertainment%20and%20streaming%20service%20promotional%20display%20in%20modern%20retail%20environment%20with%20screens%20and%20media%20equipment%20clean%20professional%20setup&width=800&height=600&seq=industry-entertainment&orientation=landscape',
      stats: ['Subscription Growth', 'Customer Acquisition']
    }
  ];

  return (
    <section id="industries" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container">
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="sonic-h2 text-foreground-950 mb-4">
            {tHeading}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 max-w-3xl mx-auto">
            {tSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 gap-5">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                borderRadius: 0,
                transform: hoveredCard === index ? 'translateY(-6px)' : 'translateY(0)',
                background: hoveredCard === index ? 'oklch(var(--foreground-950))' : '#ffffff',
                boxShadow: hoveredCard === index
                  ? '0 28px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,212,0,0.3)'
                  : '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Lime accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 z-10 transition-all duration-500"
                style={{
                  height: hoveredCard === index ? '3px' : '2px',
                  background: hoveredCard === index ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.2)',
                  boxShadow: hoveredCard === index ? '0 0 20px rgba(200,212,0,0.6)' : 'none',
                }}
              />

              <div className="relative h-56 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Wooden icon */}
                <div className="absolute top-5 left-5">
                  <div className="w-14 h-14 overflow-hidden" style={{ outline: '1px solid rgba(139,90,43,0.2)' }}>
                    <img
                      src={industry.woodIcon}
                      alt={industry.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-black mb-2 transition-colors duration-500 leading-tight tracking-tight" style={{ color: hoveredCard === index ? '#fff' : '#1A1A1A' }}>
                  {industry.title}
                </h3>

                <div className="mb-1 transition-all duration-500" style={{ height: '1px', background: hoveredCard === index ? 'rgba(200,212,0,0.25)' : 'rgba(0,0,0,0.08)' }} />

                <p className="text-sm leading-relaxed mb-5 mt-3 transition-colors duration-500" style={{ color: hoveredCard === index ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
                  {industry.description}
                </p>

                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 transition-colors duration-500" style={{ color: hoveredCard === index ? 'rgba(200,212,0,0.6)' : '#9CA3AF' }}>Wichtige Marken</p>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.brands.map((brand, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-black uppercase tracking-wider transition-all duration-500"
                        style={{
                          borderRadius: 0,
                          background: hoveredCard === index ? 'rgba(200,212,0,0.12)' : 'rgba(0,0,0,0.05)',
                          color: hoveredCard === index ? 'oklch(var(--primary-500))' : '#6B7280',
                          border: hoveredCard === index ? '1px solid rgba(200,212,0,0.25)' : '1px solid transparent',
                        }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {industry.stats.map((stat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-black uppercase tracking-wider transition-all duration-500"
                      style={{
                        borderRadius: 0,
                        background: hoveredCard === index ? 'rgba(200,212,0,0.15)' : 'rgba(200,212,0,0.08)',
                        color: hoveredCard === index ? 'oklch(var(--primary-500))' : '#6b7280',
                        border: '1px solid rgba(200,212,0,0.2)',
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
