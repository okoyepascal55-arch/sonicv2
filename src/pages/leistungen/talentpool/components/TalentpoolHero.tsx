import React from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function TalentpoolHero() {
  const { images: talentpoolHeroImages } = useMediaStore('leistungen_talentpool_images');
  const heroImage = talentpoolHeroImages[0]?.url
    ? resolveImageUrl(talentpoolHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg';

  const tBadge = useText('leistungen_talentpool', 'talentpool-hero-badge', 'Talentepool');
  const tH1Line1 = useText('leistungen_talentpool', 'talentpool-hero-heading-line1', '>2.000 Talente.');
  const tH1Accent = useText('leistungen_talentpool', 'talentpool-hero-heading-accent', 'Festangestellt.');
  const tSubtitle = useText('leistungen_talentpool', 'talentpool-hero-subtitle', 'Keine Freelancer. Keine Zeitarbeit. Echte Markenbotschafter.');
  const tDesc = useText('leistungen_talentpool', 'talentpool-hero-description', 'Unser Talentepool umfasst über 2.000 handverlesene, festangestellte Markenbotschafter deutschlandweit — trainiert, motiviert und live in ihrer eigenen Zielerreichung getrackt.');

  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex flex-col justify-end overflow-hidden bg-foreground-950" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <img
        src={heroImage}
        alt="Talentepool Markenbotschafter"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/7 blur-[100px] pointer-events-none z-10" />

      <div className="relative z-20 w-full sonic-container px-4 md:px-8 pb-10 md:pb-14">
        {/* Breadcrumb */}
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
              <span className="w-1.5 h-1.5 bg-primary-500" />
              <span className="text-primary-500">{tBadge}</span>
            </div>

        {/* v3 eyebrow — 28px lime hairline + label */}


        <div className="flex items-center gap-3 mb-5 md:mb-6">


          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />


          <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tBadge}</span>


        </div>


        <h1 className="sonic-h1 text-white mb-5 md:mb-6">
          {tH1Line1}<br />
          <span className="text-primary-500">{tH1Accent}</span>
        </h1>

        <p className="text-sm md:text-base text-white/75 mb-3 leading-relaxed max-w-[520px]">
          {tSubtitle}
        </p>

        <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed mb-12">
          {tDesc}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Talentpool%20Anfrage`}
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-7 py-3 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            <i className="ri-calendar-line" />
            Beratungsgespräch buchen
          </a>

          <a
            href="/leistungen/staff-as-a-service"
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 font-black hover:border-primary-500 hover:text-primary-500 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            Staff as a Service
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}