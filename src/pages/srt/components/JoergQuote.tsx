import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import VoicesShowcase, { markLastWord, type Voice } from '@/components/feature/VoicesShowcase';

/*
  Developer voice — same design as „Sonic Spirit & Faces“ (/karriere) via VoicesShowcase (19.10.2026).
  One person → single portrait panel; no video (22.10.2026). Without an uploaded photo the
  portrait shows a „Foto folgt“ placeholder.
  Portrait:   Dashboard → Media → SRT → "SRT — Entwickler Jörg: Profilfoto"
  Text:       Dashboard → Text → Stimmen & Gesichter → SRT (also under Text → SRT)
*/
export default function JoergQuote() {
  const tBadge  = useText('srt_developer', 'srt-joerg-badge', 'Ein Wort vom Entwickler');
  const tName   = useText('srt_developer', 'srt-joerg-name',  'Jörg');
  const tTitle  = useText('srt_developer', 'srt-joerg-title', 'Entwickler des Sonic Reporting Tools');
  const tQuote  = useText('srt_developer', 'srt-joerg-quote',
    'Das SRT ist kein Tool — es ist der direkte Draht zwischen dem, was am POS passiert, ' +
    'und der Entscheidung, die daraus folgen muss. Wir haben es so gebaut, dass Promoter ' +
    'damit arbeiten wollen, nicht müssen.');
  const tHeading = useText('srt_developer', 'srt-joerg-heading', 'Wer hinter dem SRT steht.');

  const { images: photoImages } = useMediaStore('srt_joerg_photo');
  const photoUrl = photoImages[0]?.url ? resolveImageUrl(photoImages[0].url) : '';

  const voices: Voice[] = [{
    id: 'joerg',
    name: tName,
    role: tTitle,
    pullQuote: tQuote,
    image: photoUrl,
    storyLabel: 'Im Wortlaut',
  }];

  return <VoicesShowcase id="entwickler" eyebrow={tBadge} heading={markLastWord(tHeading, 'SRT')} voices={voices} />;
}
