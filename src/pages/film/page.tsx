/* ─────────────────────────────────────────────
   FILM-SEITE (/film) — 11.11.2026
   Versteckte Landingpage nur mit dem Sonic-Film, für Links aus PPTs etc.
   - Nicht im Menü, Footer oder in der Sitemap; noindex + robots.txt-Disallow.
   - DE Standard, Englisch per /film?lang=en oder DE/EN-Schalter oben rechts.
   - Texte: Dashboard → Text → Film-Seite. Video & Cover: Dashboard → Medien → Film-Seite
     (leer = es wird automatisch das Home-Video „Erlebe Sonic in 2 Minuten“ genutzt).
   - An/Aus: Dashboard → Seiten → Versteckte Seiten.
───────────────────────────────────────────── */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTextSection } from '@/hooks/useText';
import { useMediaStore } from '@/lib/mediaStore';
import { useLanguage } from '@/lib/language';
import { FILM_DEFAULTS } from '@/lib/textStoreFilm';
import SiteLogo from '@/components/base/SiteLogo';
import LanguageSwitch from '@/components/base/LanguageSwitch';

const FALLBACK_VIDEO_ID = '2H1rFHQsG4g';

/** Pulls the YouTube video id out of an embed/watch/short link. */
function youtubeId(url: string): string | null {
  const m = url.match(/(?:embed\/|watch\?v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function useNoIndex(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const created: HTMLElement[] = [];
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      const prev = el?.getAttribute('content') ?? null;
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); created.push(el); }
      el.setAttribute('content', content);
      return () => { if (prev !== null) el!.setAttribute('content', prev); };
    };
    const restoreRobots = setMeta('robots', 'noindex, nofollow');
    const restoreDesc = setMeta('description', description);
    return () => {
      document.title = prevTitle;
      restoreRobots(); restoreDesc();
      created.forEach((el) => el.remove());
    };
  }, [title, description]);
}

export default function FilmPage() {
  const lang = useLanguage();
  const stored = useTextSection('film_page_texts');
  const defaults = FILM_DEFAULTS.film_page_texts;
  const t = (k: string) => (stored[k]?.trim() ? stored[k] : defaults[k] ?? '');

  const { images: filmMedia } = useMediaStore('film_page_video');
  const { images: homeMedia } = useMediaStore('home_video');
  const cover = filmMedia[0]?.url || homeMedia[0]?.url || '';
  const rawVideo = filmMedia[1]?.url || homeMedia[1]?.url || '';
  const videoId = youtubeId(rawVideo) ?? FALLBACK_VIDEO_ID;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const posterUrl = cover || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  const [playing, setPlaying] = useState(false);

  useNoIndex(
    lang === 'en' ? 'Experience Sonic in 2 minutes | Sonic Group' : 'Erlebe Sonic in 2 Minuten | Sonic Group',
    t('sub'),
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-foreground-950 text-white">
      {/* Top bar: logo → homepage, language switch */}
      <header className="flex items-center justify-between px-5 md:px-10 py-5">
        <Link to="/" aria-label={lang === 'en' ? 'Sonic Group — Homepage' : 'Sonic Group — Zur Startseite'}>
          <SiteLogo alt="Sonic Group" className="h-8 md:h-10 w-auto" loading="eager" />
        </Link>
        <LanguageSwitch className="border-white/20 [&_button:not([aria-pressed=true])]:text-white/70" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-start md:justify-center pt-6 md:pt-0 px-4 md:px-6 pb-12">
        <div className="w-full" style={{ maxWidth: 1080 }}>
          {/* Headline */}
          <div className="text-center mb-8 md:mb-10">
            {t('eyebrow') && (
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-3">{t('eyebrow')}</p>
            )}
            <h1 className="sonic-h2 text-white">
              {t('headline')}{' '}
              <span
                style={{
                  background: 'oklch(var(--primary-500) / 0.9)',
                  color: 'oklch(var(--foreground-950))',
                  padding: '0.02em 0.16em',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
              >
                {t('headline-accent')}
              </span>
            </h1>
            {t('sub') && <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto">{t('sub')}</p>}
          </div>

          {/* Video */}
          <div className="relative w-full overflow-hidden border border-white/10 bg-black" style={{ aspectRatio: '16/9' }}>
            {!playing ? (
              <button
                type="button"
                className="group absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => setPlaying(true)}
                aria-label={lang === 'en' ? 'Play video' : 'Video abspielen'}
              >
                <img
                  src={posterUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/25" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'oklch(var(--primary-500))', borderRadius: '50%', boxShadow: '0 8px 32px rgba(200,212,0,0.35)' }}
                  >
                    <span
                      className="w-0 h-0 ml-1.5"
                      style={{ borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid oklch(var(--foreground-950))' }}
                    />
                  </span>
                </span>
                <span className="absolute bottom-5 left-0 right-0 text-center text-white/70 text-xs font-semibold uppercase tracking-[0.2em]">
                  {t('play')}
                </span>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="Sonic Group"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* CTA → homepage */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-foreground-950 font-black uppercase tracking-[0.12em] text-sm hover:bg-primary-400 transition-colors"
              style={{ borderRadius: 0 }}
            >
              {t('cta')}
              <i className="ri-arrow-right-line text-base" aria-hidden="true" />
            </Link>
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-primary-500 transition-colors"
            >
              <i className="ri-youtube-fill text-sm" aria-hidden="true" />
              {t('youtube')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
