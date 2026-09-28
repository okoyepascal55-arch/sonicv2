import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { getYouTubeId, youTubeEmbedUrl } from '@/lib/youtube';

/*
  Developer quote — same card as "Sonic Spirit & Faces" (/karriere) and
  "Die Stimmen hinter Sonic" (/ueber-uns): bordered two-column card with the
  portrait on the left and a dark quote panel on the right.
  Portrait:   Dashboard → Media → SRT → "SRT — Entwickler Jörg: Profilfoto"
  Text/Video: Dashboard → Text → Stimmen & Gesichter → SRT (also under Text → SRT)
  Without a portrait the left column shows a quiet monogram placeholder, so the
  layout never collapses into a different design.
*/
export default function JoergQuote() {
  const tBadge  = useText('srt_developer', 'srt-joerg-badge', 'Ein Wort vom Entwickler');
  const tName   = useText('srt_developer', 'srt-joerg-name',  'Jörg');
  const tTitle  = useText('srt_developer', 'srt-joerg-title', 'Entwickler der Sonic Retail Technology');
  const tQuote  = useText('srt_developer', 'srt-joerg-quote',
    'Das SRT ist kein Tool — es ist der direkte Draht zwischen dem, was am POS passiert, ' +
    'und der Entscheidung, die daraus folgen muss. Wir haben es so gebaut, dass Promoter ' +
    'damit arbeiten wollen, nicht müssen.');
  const tVideo  = useText('srt_developer', 'srt-joerg-video', '');
  const tHeading = useText('srt_developer', 'srt-joerg-heading', 'Wer hinter dem SRT steht.');

  const { images: photoImages } = useMediaStore('srt_joerg_photo');
  const photoUrl = photoImages[0]?.url ? resolveImageUrl(photoImages[0].url) : '';
  const ytId = getYouTubeId(tVideo);
  const initial = (tName.trim()[0] || 'J').toUpperCase();

  return (
    <section id="entwickler" className="sonic-section-md bg-white px-4 md:px-6">
      <div className="sonic-container">

        {/* Header — shared SRT header pattern */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>
              {tBadge}
            </span>
          </div>
          <h2 className="sonic-h2 text-foreground-950">{tHeading}</h2>
        </div>

        {/* Card — identical structure to the Sonic Faces story panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)', minHeight: 'clamp(420px, 42vw, 520px)' }}>

          {/* Portrait / video / placeholder */}
          <div className="relative overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)', minHeight: '340px' }}>
            {ytId ? (
              <iframe
                src={youTubeEmbedUrl(ytId)}
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${tName} — ${tTitle}`}
                loading="lazy"
              />
            ) : (
              <>
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={`${tName} — ${tTitle}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span
                      className="font-black leading-none select-none"
                      style={{ fontSize: 'clamp(160px, 22vw, 280px)', letterSpacing: '-0.06em', color: 'oklch(0.81 0.19 115 / 0.07)' }}
                    >
                      {initial}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.88) 0%, rgba(10,11,9,0.1) 55%, transparent 100%)' }} />
                <div className="absolute left-0 right-0 bottom-0 p-7 md:p-10">
                  <p className="font-black text-white leading-none tracking-tight mb-1" style={{ fontSize: 'clamp(32px,4vw,52px)', letterSpacing: '-0.03em' }}>
                    {tName}
                  </p>
                  <span className="text-[11px] font-bold text-white">{tTitle}</span>
                </div>
              </>
            )}
          </div>

          {/* Quote panel */}
          <div className="flex flex-col justify-between p-8 md:p-12" style={{ background: 'oklch(0.13 0.005 118)' }}>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] mb-8" style={{ color: 'oklch(0.81 0.19 115)' }}>
                {tTitle}
              </p>
              <i className="ri-double-quotes-l text-3xl mb-5 block" style={{ color: 'oklch(0.81 0.19 115 / 0.35)' }} aria-hidden="true" />
              <blockquote className="font-black leading-[1.28] text-white mb-8" style={{ fontSize: 'clamp(18px,2vw,26px)', letterSpacing: '-0.02em' }}>
                {tQuote}
              </blockquote>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-6 h-px flex-1" style={{ background: 'oklch(0.81 0.19 115 / 0.3)' }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                {tName} · {tTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
