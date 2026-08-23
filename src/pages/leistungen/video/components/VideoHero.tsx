import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import LimeBadge from '@/components/base/LimeBadge';

export default function VideoHero() {
  const { images: videoHeroImages } = useMediaStore('leistungen_video_images');
  const heroImage = videoHeroImages[0]?.url
    ? resolveImageUrl(videoHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg';

  const tBadge = useText('leistungen_video', 'video-hero-badge', '(Live) Video');
  const tH1Line1 = useText('leistungen_video', 'video-hero-heading-line1', 'Live verkaufen.');
  const tH1Accent = useText('leistungen_video', 'video-hero-heading-accent', 'Digital begeistern.');
  const tSubtitle = useText('leistungen_video', 'video-hero-subtitle', 'Erlebbar werden — Videocontent und Live-Video-Kanäle mit unseren Markenbotschaftern.');
  const tDesc = useText('leistungen_video', 'video-hero-description', 'Für Produktberatung, Sales und Service-Support. E-Commerce, Retail-Display, QR-Code — alles aus einer Hand.');

  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex flex-col justify-end overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <img
        src={heroImage}
        alt="Live Video Produktion"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/6 blur-[100px] pointer-events-none z-10" />

      <div className="relative z-20 w-full sonic-container px-4 md:px-8 pb-10 md:pb-14">
                <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
              <span className="w-1.5 h-1.5 bg-primary-500" />
              <span className="text-primary-500">{tBadge}</span>
            </div>

        <h1 className="sonic-h1 text-white mb-5 md:mb-6">
          {tH1Line1}<br />
          <span className="text-primary-500">{tH1Accent}</span>
        </h1>
        <p className="text-sm md:text-base text-white/75 mb-3 leading-relaxed max-w-[520px]">
          {tSubtitle}
        </p>
        <p className="text-xs md:text-sm text-white/55 max-w-[480px] leading-relaxed mb-8">
          {tDesc}
        </p>

        <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-8 border-t border-white/15 pt-5">
          {[
            { val: '>50.000', label: '1:1 Live Video Calls' },
            { val: 'Ø 6 Min.', label: 'Beratungsdauer' },
            { val: '100 %', label: 'Managed Service' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-primary-500 tabular-nums">{s.val}</div>
              <div className="text-white/45 text-xs font-bold uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Live%20Video%20Beratung`}
            className="inline-flex items-center gap-2 bg-primary-500 text-white font-black px-7 py-3 hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
            style={{ borderRadius: 0 }}
          >
            <i className="ri-calendar-line"></i>
            Beratung buchen
          </a>
          <a
            href="/leistungen/pos-full-service"
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 font-black hover:border-primary-500 hover:text-primary-500 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            POS Full Service
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}