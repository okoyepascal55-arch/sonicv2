import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import WoodenDivider from '../../../components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { images: detailHeroImages } = useMediaStore('casestudies_detail_heroes');

  // Case study data - in production this would come from an API or CMS
  const caseStudies: Record<string, any> = {
    'garmin-retail-transformation': {
      brand: 'Garmin',
      category: 'Consumer Electronics',
      heroImage: 'https://readdy.ai/api/search-image?query=modern%20retail%20store%20display%20featuring%20premium%20smartwatches%20and%20fitness%20trackers%20on%20elegant%20display%20stands%20with%20professional%20brand%20promoter%20demonstrating%20product%20features%20to%20interested%20customer%20contemporary%20retail%20environment%20bright%20lighting%20clean%20minimalist%20design&width=1600&height=900&seq=garmin-hero&orientation=landscape',
      challenge: 'Garmin faced significant challenges in the competitive consumer electronics market. Despite having innovative products, brand awareness remained low, and sales had plateaued. Traditional retail approaches weren\'t effectively communicating the value proposition of their advanced GPS and fitness technology to potential customers.',
      solution: 'SONIC implemented a comprehensive retail transformation strategy focusing on strategic point-of-sale placement, expert product demonstrations, and targeted customer engagement. Our trained brand ambassadors became product experts, capable of explaining complex features in accessible language and demonstrating real-world applications.',
      results: [
        { label: 'Revenue Growth', value: '+130%', icon: 'https://readdy.ai/api/search-image?query=wooden%20line%20chart%20upward%20trend%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-chart-result-icon&orientation=squarish' },
        { label: 'Daily Sales', value: '€2,178', icon: 'https://readdy.ai/api/search-image?query=wooden%20euro%20money%20coin%20currency%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-euro-icon&orientation=squarish' },
        { label: 'Customer Engagement', value: '+245%', icon: 'https://readdy.ai/api/search-image?query=wooden%20heart%20user%20customer%20love%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-heart-icon&orientation=squarish' },
        { label: 'Brand Awareness', value: '+89%', icon: 'https://readdy.ai/api/search-image?query=wooden%20lightbulb%20idea%20innovation%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-bulb-icon&orientation=squarish' },
      ],
      testimonial: 'SONIC transformed our retail presence. Their team\'s expertise and dedication drove unprecedented growth. The results exceeded our most optimistic projections.',
      author: 'Marketing Director, Garmin DACH',
      timeline: '6 months',
      locations: '45 retail locations across DACH region',
      teamSize: '120 trained brand ambassadors',
    },
    'samsung-mobile-experience': {
      brand: 'Samsung',
      category: 'Mobile Technology',
      heroImage: 'https://readdy.ai/api/search-image?query=premium%20smartphone%20retail%20display%20with%20latest%20mobile%20devices%20on%20modern%20display%20tables%20professional%20brand%20ambassador%20showing%20features%20to%20customers%20in%20contemporary%20electronics%20store%20with%20bright%20lighting%20sleek%20design%20interactive%20demonstration%20area&width=1600&height=900&seq=samsung-hero&orientation=landscape',
      challenge: 'In the highly competitive smartphone market, Samsung needed to differentiate their retail experience from competitors. Standard product displays weren\'t effectively showcasing the advanced features and ecosystem benefits that set Samsung devices apart.',
      solution: 'We created immersive product experiences that allowed customers to truly understand Samsung\'s technology advantages. Our trained specialists guided customers through hands-on demonstrations, highlighting unique features and ecosystem integration. Data-driven insights helped optimize messaging and positioning.',
      results: [
        { label: 'Market Share', value: '+18%', icon: 'https://readdy.ai/api/search-image?query=wooden%20pie%20chart%20circle%20segments%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-pie-result-icon&orientation=squarish' },
        { label: 'Conversion Rate', value: '34%', icon: 'https://readdy.ai/api/search-image?query=wooden%20exchange%20arrows%20conversion%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-exchange-icon&orientation=squarish' },
        { label: 'Customer Satisfaction', value: '96%', icon: 'https://readdy.ai/api/search-image?query=wooden%20star%20rating%20favorite%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-star-icon&orientation=squarish' },
        { label: 'Accessory Attachment', value: '+67%', icon: 'https://readdy.ai/api/search-image?query=wooden%20plus%20add%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-plus-icon&orientation=squarish' },
      ],
      testimonial: 'The SONIC team doesn\'t just sell products—they create experiences that convert browsers into buyers. Their understanding of our technology and ability to communicate it effectively has been invaluable.',
      author: 'Retail Manager, Samsung Electronics',
      timeline: '12 months',
      locations: '80+ retail locations',
      teamSize: '200+ brand specialists',
    },
    'dyson-premium-experience': {
      brand: 'Dyson',
      category: 'Home Appliances',
      heroImage: 'https://readdy.ai/api/search-image?query=luxury%20home%20appliance%20retail%20display%20featuring%20premium%20vacuum%20cleaners%20and%20air%20purifiers%20on%20sophisticated%20display%20stands%20with%20professional%20demonstrator%20showing%20product%20capabilities%20to%20engaged%20customers%20in%20upscale%20retail%20environment%20modern%20lighting%20elegant%20design&width=1600&height=900&seq=dyson-hero&orientation=landscape',
      challenge: 'Dyson\'s premium pricing required an exceptional in-store experience to justify the investment. Customers needed to understand the advanced engineering and long-term value proposition that differentiated Dyson from lower-priced alternatives.',
      solution: 'We implemented live demonstrations showcasing Dyson\'s superior technology and performance. Our technical experts provided personalized consultations, helping customers understand which products best suited their specific needs. The focus was on education and value demonstration rather than traditional sales tactics.',
      results: [
        { label: 'Sales Volume', value: '+167%', icon: 'https://readdy.ai/api/search-image?query=wooden%20shopping%20cart%20basket%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-cart-icon&orientation=squarish' },
        { label: 'Demo Conversion', value: '42%', icon: 'https://readdy.ai/api/search-image?query=wooden%20checkbox%20checkmark%20circle%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-check-icon&orientation=squarish' },
        { label: 'Repeat Customers', value: '+89%', icon: 'https://readdy.ai/api/search-image?query=wooden%20repeat%20refresh%20cycle%20arrows%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-repeat-icon&orientation=squarish' },
        { label: 'Customer Lifetime Value', value: '+124%', icon: 'https://readdy.ai/api/search-image?query=wooden%20diamond%20gem%20value%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=100&height=100&seq=wood-diamond-icon&orientation=squarish' },
      ],
      testimonial: 'SONIC\'s ability to communicate our technology\'s value has been game-changing for our retail performance. They understand that selling premium products requires a premium experience.',
      author: 'Head of Retail, Dyson Germany',
      timeline: '9 months',
      locations: '35 premium retail locations',
      teamSize: '85 technical specialists',
    },
  };

  const caseStudy = slug ? caseStudies[slug] : null;

  useSEO({
    title: caseStudy ? `${caseStudy.brand} Fallbeispiel | Retail Transformation | Sonic Group` : 'Fallbeispiel | Sonic Group',
    description: caseStudy
      ? `Fallbeispiel ${caseStudy.brand}: Wie Sonic Group die Retail-Performance durch strategische Markenaktivierung transformiert hat.`
      : 'Fallbeispiele von Sonic Group — Retail Activation Erfolge im DACH-Raum.',
    keywords: caseStudy
      ? `${caseStudy.brand.toLowerCase()}, retail transformation, markenaktivierung, fallbeispiel, pos aktivierung`
      : 'fallbeispiele, retail activation, markenaktivierung, pos aktivierung',
    canonical: slug ? `https://sonic-group.de/fallbeispiele/${slug}` : 'https://sonic-group.de/fallbeispiele',
  });

  // Override hero image from dashboard if available
  if (caseStudy && detailHeroImages[0]?.url) {
    caseStudy.heroImage = resolveImageUrl(detailHeroImages[0].url) || caseStudy.heroImage;
  }

  if (!caseStudy) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-foreground-950 mb-4">Fallbeispiel nicht gefunden</h1>
          <Link to="/fallbeispiele" className="text-primary-500 font-bold hover:text-foreground-950">
            ← Zurück zu den Fallbeispielen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] overflow-hidden bg-foreground-950" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <img
          src={caseStudy.heroImage}
          alt={caseStudy.brand}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
            <Link 
              to="/fallbeispiele" 
              className="inline-flex items-center text-primary-500 font-bold mb-6 hover:text-white transition-colors"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Zurück zu den Fallbeispielen
            </Link>
            <div className="bg-primary-500 text-foreground-950 px-4 py-2 inline-block font-black text-sm mb-4">
              {caseStudy.category}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4">
              {caseStudy.brand}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-foreground-200 max-w-3xl">
              Wie Sonic die Retail-Performance durch strategische Markenaktivierung transformiert hat
            </p>
          </div>
        </div>
      </section>

      <WoodenDivider variant="horizontal" />

      {/* Key Metrics */}
      <section className="sonic-section-md px-6 bg-white">
        <div className="sonic-container">
          <div className="grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 gap-6">
            {caseStudy.results.map((result: any, idx: number) => (
              <div key={idx} className="text-center bg-foreground-50 p-6 relative overflow-hidden group border border-foreground-100">
                {/* Wooden texture */}
                <div 
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{
                    backgroundImage: 'url(https://readdy.ai/api/search-image?query=ancient%20weathered%20barn%20wood%20plank%20texture%20rich%20brown%20grain%20natural%20aged%20timber%20surface%20rustic%20wooden%20background&width=800&height=600&seq=wood-texture-metrics&orientation=landscape)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img 
                      src={result.icon} 
                      alt={result.label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="text-4xl font-black text-primary-500 mb-2">{result.value}</div>
                  <div className="text-sm text-foreground-600 font-semibold">{result.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WoodenDivider variant="diagonal" />

      {/* Challenge Section */}
      <section className="sonic-section-lg md:px-4 md:px-6 bg-gradient-to-br from-background-100 via-white to-background-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <img 
                  src="https://readdy.ai/api/search-image?query=wooden%20target%20goal%20challenge%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-target-icon&orientation=squarish"
                  alt="Challenge"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground-950">
                Die Herausforderung
              </h2>
            </div>
            <p className="text-lg text-foreground-700 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <img 
                  src="https://readdy.ai/api/search-image?query=wooden%20lightbulb%20solution%20idea%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-solution-icon&orientation=squarish"
                  alt="Solution"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground-950">
                Unsere Lösung
              </h2>
            </div>
            <p className="text-lg text-foreground-700 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          <div className="bg-primary-500/5 p-8 border-l-4 border-primary-500">
            <p className="text-xl text-foreground-700 italic mb-4">"{caseStudy.testimonial}"</p>
            <p className="text-sm font-bold text-foreground-950">— {caseStudy.author}</p>
          </div>
        </div>
      </section>

      <WoodenDivider variant="horizontal" />

      {/* Project Details */}
      <section className="sonic-section-lg md:px-4 md:px-6 bg-white">
        <div className="sonic-container">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground-950 mb-12 text-center">
            Projektdetails
          </h2>
          <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center bg-foreground-50 p-8 relative overflow-hidden group border border-foreground-100">
              <div 
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{
                  backgroundImage: 'url(https://readdy.ai/api/search-image?query=ancient%20weathered%20barn%20wood%20plank%20texture%20rich%20brown%20grain%20natural%20aged%20timber%20surface%20rustic%20wooden%20background&width=800&height=600&seq=wood-texture-details&orientation=landscape)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=wooden%20clock%20time%20duration%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-clock-icon&orientation=squarish"
                    alt="Timeline"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Timeline</h3>
                <p className="text-2xl font-black text-primary-500">{caseStudy.timeline}</p>
              </div>
            </div>

            <div className="text-center bg-foreground-50 p-8 relative overflow-hidden group border border-foreground-100">
              <div 
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{
                  backgroundImage: 'url(https://readdy.ai/api/search-image?query=ancient%20weathered%20barn%20wood%20plank%20texture%20rich%20brown%20grain%20natural%20aged%20timber%20surface%20rustic%20wooden%20background&width=800&height=600&seq=wood-texture-details2&orientation=landscape)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=wooden%20map%20location%20pin%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-location-icon&orientation=squarish"
                    alt="Locations"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Locations</h3>
                <p className="text-2xl font-black text-primary-500">{caseStudy.locations}</p>
              </div>
            </div>

            <div className="text-center bg-foreground-50 p-8 relative overflow-hidden group border border-foreground-100">
              <div 
                className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{
                  backgroundImage: 'url(https://readdy.ai/api/search-image?query=ancient%20weathered%20barn%20wood%20plank%20texture%20rich%20brown%20grain%20natural%20aged%20timber%20surface%20rustic%20wooden%20background&width=800&height=600&seq=wood-texture-details3&orientation=landscape)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20icon%20carved%20from%20dark%20walnut%20wood%20rich%20brown%20grain%20texture%20natural%20material%20simple%20minimalist%20design%20on%20white%20background%20top%20view%20flat%20lay%20product%20photography&width=120&height=120&seq=wood-team-icon&orientation=squarish"
                    alt="Team"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground-950 mb-2">Team Size</h3>
                <p className="text-2xl font-black text-primary-500">{caseStudy.teamSize}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WoodenDivider variant="diagonal" />

      {/* CTA Section */}
      <section className="sonic-section-lg md:px-4 md:px-6 bg-gradient-to-br from-background-100 via-white to-background-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-black text-foreground-950 mb-6">
            Bereit, Ihre Retail-Performance zu transformieren?
          </h2>
          <p className="text-xl text-foreground-700 mb-8">
            Lassen Sie uns besprechen, wie Sonic ähnliche Ergebnisse für Ihre Marke erzielen kann
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/sonic-group/beratungsgespraech"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 text-foreground-950 px-8 py-4 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap inline-flex items-center"
            >
              Beratungsgespräch buchen
              <i className="ri-arrow-right-line ml-2"></i>
            </a>
            <Link
              to="/fallbeispiele"
              className="bg-white text-foreground-950 px-8 py-4 font-black hover:bg-gray-100 transition-all duration-300 whitespace-nowrap border-2 border-foreground-200 inline-flex items-center"
            >
              Weitere Fallbeispiele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
