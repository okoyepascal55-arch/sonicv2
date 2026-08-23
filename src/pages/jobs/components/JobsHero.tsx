import { Link } from 'react-router-dom';
import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';

interface Props {
  jobCount: number;
}

export default function JobsHero({ jobCount }: Props) {
  const { images: jobsHeroImages } = useMediaStore('jobs_hero');
  const heroImage = jobsHeroImages[0]?.url || 'https://readdy.ai/api/search-image?query=modern%20corporate%20office%20interior%20with%20open%20floor%20plan%20collaborative%20workspace%20German%20company%20bright%20natural%20light%20employees%20working%20together%20contemporary%20professional%20environment%20career%20opportunity%20growth&width=1920&height=800&seq=jobs-hero-bg-sonic-v1&orientation=landscape';

  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Karriere Sonic Group"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-28 left-6 z-20">
        <Link
          to="/karriere"
          className="inline-flex items-center gap-2 text-white/50 hover:text-primary-500 transition-colors text-xs font-bold uppercase tracking-wide"
        >
          <i className="ri-arrow-left-line" />
          Karriere
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        <SectionBadge text={jobCount > 0 ? `${jobCount} offene Stellen` : 'Stellenangebote'} variant="light" className="mb-5" />
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-5 leading-tight">
          DEINE KARRIERE<br />
          <span className="text-primary-500">BEI SONIC GROUP</span>
        </h1>
        <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto">
          Interne Sales-Positionen in Krefeld oder flexible Field-Promotion-Jobs im DACH-Raum.
          Wir suchen Menschen mit Energie.
        </p>
      </div>
    </section>
  );
}
