import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

export default function JoergQuote() {
  const tBadge  = useText('srt_developer', 'srt-joerg-badge', 'Ein Wort vom Entwickler');
  const tName   = useText('srt_developer', 'srt-joerg-name',  'Jörg');
  const tTitle  = useText('srt_developer', 'srt-joerg-title', 'Entwickler der Sonic Retail Technology');
  const tQuote  = useText('srt_developer', 'srt-joerg-quote',
    'Das SRT ist kein Tool — es ist der direkte Draht zwischen dem, was am POS passiert, ' +
    'und der Entscheidung, die daraus folgen muss. Wir haben es so gebaut, dass Promoter ' +
    'damit arbeiten wollen, nicht müssen.');
  const tVideo  = useText('srt_developer', 'srt-joerg-video', '');

  const { images: photoImages } = useMediaStore('srt_joerg_photo');
  const photoUrl = photoImages[0]?.url ? resolveImageUrl(photoImages[0].url) : '';

  const hasMedia = photoUrl || tVideo;

  // Extract YouTube ID from URL or plain ID
  const ytId = tVideo
    ? tVideo.includes('youtu')
      ? tVideo.split(/[/?=v]/).filter(Boolean).slice(-1)[0]
      : tVideo
    : '';

  return (
    <section className="px-4 md:px-6" style={{ background: 'oklch(0.10 0.004 118)' }}>
      <div className="sonic-container">

        {/* Section header */}
        <div className="pt-14 md:pt-20 pb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span
              className="text-[11px] font-black uppercase tracking-[0.24em]"
              style={{ color: 'oklch(0.81 0.19 115)' }}
            >
              {tBadge}
            </span>
          </div>
          <h2 className="sonic-h2 text-white">
            Wer hinter dem SRT steht.
          </h2>
        </div>

        {/* Card — 2-col on desktop: media left, quote right */}
        <div
          className="flex flex-col gap-0 mb-14 md:mb-20 overflow-hidden"
          style={{ border: '1px solid oklch(1 0 0 / 0.08)' }}
        >
          <div
            className={`grid grid-cols-1 ${hasMedia ? 'lg:grid-cols-2' : ''}`}
            style={{ minHeight: hasMedia ? 'clamp(300px, 40vw, 440px)' : undefined }}
          >

            {/* Left — portrait or video */}
            {hasMedia && (
              <div
                className="relative overflow-hidden"
                style={{ background: 'oklch(0.13 0.005 118)', minHeight: 'clamp(240px, 30vw, 320px)' }}
              >
                {tVideo && ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${tName} — ${tTitle}`}
                    loading="lazy"
                  />
                ) : photoUrl ? (
                  <>
                    <img
                      src={photoUrl}
                      alt={`${tName} — ${tTitle}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    {/* Gradient overlay at bottom */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.88) 0%, rgba(10,11,9,0.1) 55%, transparent 100%)' }}
                    />
                    <div className="absolute left-0 right-0 bottom-0 p-7 md:p-10">
                      <p
                        className="font-black text-white leading-none tracking-tight mb-1"
                        style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.03em' }}
                      >
                        {tName}
                      </p>
                      <span className="text-[11px] font-bold text-primary-500 uppercase tracking-wider">
                        {tTitle}
                      </span>
                    </div>
                  </>
                ) : null}
              </div>
            )}

            {/* Right — quote panel */}
            <div
              className="flex flex-col justify-between p-8 md:p-12"
              style={{ background: 'oklch(0.13 0.005 118)' }}
            >
              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.28em] mb-8"
                  style={{ color: 'oklch(0.81 0.19 115)' }}
                >
                  {tTitle}
                </p>
                <i
                  className="ri-double-quotes-l text-3xl mb-5 block"
                  style={{ color: 'oklch(0.81 0.19 115 / 0.35)' }}
                  aria-hidden="true"
                />
                <blockquote
                  className="font-black leading-[1.28] text-white mb-8"
                  style={{ fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '-0.02em' }}
                >
                  {tQuote}
                </blockquote>
              </div>

              {/* Attribution */}
              <div
                className="flex items-center gap-3 pt-6 mt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span
                  className="w-6 h-px flex-1"
                  style={{ background: 'oklch(0.81 0.19 115 / 0.3)' }}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                  {tName} · {tTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
