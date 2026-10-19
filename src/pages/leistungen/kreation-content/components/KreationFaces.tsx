import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import VoicesShowcase, { markLastWord, type Voice } from '@/components/feature/VoicesShowcase';

const PEOPLE = [
  {
    id: 'robert',
    name: 'Robert H.',
    role: 'Creative Director',
    pullQuote: '"Kreation ist kein Zufall. Es ist das Ergebnis von Präzision, Mut und einem tiefen Verständnis für Marken und Menschen."',
    bio: 'Robert leitet die kreative Ausrichtung bei Sonic. Als Creative Director verbindet er strategisches Denken mit visueller Exzellenz — und gibt Markenauftritten eine unverwechselbare Handschrift.',
  },
  {
    id: 'inga',
    name: 'Inga L.',
    role: 'Jr. Art Direktorin',
    pullQuote: '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte.“',
    bio: 'Inga ist Teil des Creation Teams und begleitet Projekte von der ersten Idee bis zur Umsetzung. Von Design und Social Media bis zu kreativen Konzepten und Events — sie gibt Marken ihre visuelle Identität.',
  },
];

export default function KreationFaces() {
  // Dashboard → Text → Stimmen & Gesichter → Tab „Kreation“
  const tBadge         = useText('kreation_team_header', 'kreation-team-badge',   'Kreation Team');
  const tHeading       = useText('kreation_team_header', 'kreation-team-heading', 'Die Köpfe hinter der Kreation.');
  const tRobertName    = useText('kreation_voice_robert', 'robert-name',      'Robert H.');
  const tIngaName      = useText('kreation_voice_inga',   'inga-name',        'Inga L.');
  const tRobertRole    = useText('kreation_voice_robert', 'robert-role',      'Creative Director');
  const tRobertQuote   = useText('kreation_voice_robert', 'robert-pullquote', '„Kreation ist kein Zufall. Es ist das Ergebnis von Präzision, Mut und einem tiefen Verständnis für Marken und Menschen.“');
  const tRobertBio     = useText('kreation_voice_robert', 'robert-bio',       'Robert leitet die kreative Ausrichtung bei Sonic. Als Creative Director verbindet er strategisches Denken mit visueller Exzellenz — und gibt Markenauftritten eine unverwechselbare Handschrift.');
  const tIngaRole      = useText('kreation_voice_inga',   'inga-role',        'Jr. Art Direktorin');
  const tIngaQuote     = useText('kreation_voice_inga',   'inga-pullquote',   '„Die besten Karrierewege lassen sich nicht planen. Manchmal entwickelt sich aus einem Praktikum genau der Ort, an dem man wachsen möchte.“');
  const tIngaBio       = useText('kreation_voice_inga',   'inga-bio',         'Inga ist Teil des Creation Teams und begleitet Projekte von der ersten Idee bis zur Umsetzung. Von Design und Social Media bis zu kreativen Konzepten und Events — sie gibt Marken ihre visuelle Identität.');

  // Override PEOPLE with textStore values
  const resolvedPeople = [
    { ...PEOPLE[0], name: tRobertName.trim() || PEOPLE[0].name, role: tRobertRole.trim() || PEOPLE[0].role, pullQuote: tRobertQuote.trim() || PEOPLE[0].pullQuote, bio: tRobertBio },
    { ...PEOPLE[1], name: tIngaName.trim()   || PEOPLE[1].name, role: tIngaRole.trim()   || PEOPLE[1].role, pullQuote: tIngaQuote.trim()   || PEOPLE[1].pullQuote, bio: tIngaBio   },
  ];

  const { images: img0 } = useMediaStore('kreation_faces_robert');
  const { images: img1 } = useMediaStore('kreation_faces_inga');
  const dbImages = [img0[0], img1[0]];

  const getImg = (idx: number) => {
    const item = dbImages[idx];
    const url = item?.url ? resolveImageUrl(item.url) : null;
    return url || (idx === 0
      ? 'https://readdy.ai/api/search-image?query=professional%20man%20creative%20director%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20artistic%20modern%20agency&width=600&height=800&seq=kf-robert-01&orientation=portrait'
      : 'https://readdy.ai/api/search-image?query=professional%20woman%20content%20head%20creative%20confident%20editorial%20portrait%20dark%20background%20studio%20lighting%20modern%20agency&width=600&height=800&seq=kf-inga-02&orientation=portrait');
  };

  const voices: Voice[] = resolvedPeople.map((p, i) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    pullQuote: p.pullQuote,
    image: getImg(i),
    paragraphs: p.bio.split(/\n\s*\n/),
  }));

  return (
    <VoicesShowcase
      id="team"
      eyebrow={tBadge}
      heading={markLastWord(tHeading)}
      voices={voices}
      storyLabel="Über mich"
      nextLabel="Nächste Stimme"
    />
  );
}
