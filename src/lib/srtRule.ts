/* ─────────────────────────────────────────────
   SRT language rule (Website-Review 11/2026): the SRT is feminine.
   „die SRT · in der SRT · mit der SRT · zur SRT" — never „das/im/dem SRT".
   Applied to every German text (defaults and values saved in the dashboard).
   Compounds such as „im SRT-Dashboard" are left alone: there the article
   belongs to the compound („das Dashboard"), not to the SRT.
───────────────────────────────────────────── */

const NOT_COMPOUND = '(?![-\\w])';

// „… Sonic Reporting Tool" phrases become „… SRT (Sonic Reporting Tool)".
const TOOL = 'Sonic Reporting Tools?(?:\\s*\\(SRT\\))?';
const TOOL_RULES: Array<[RegExp, string]> = [
  [new RegExp(`\\bim ${TOOL}${NOT_COMPOUND}`, 'g'), 'in der SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bIm ${TOOL}${NOT_COMPOUND}`, 'g'), 'In der SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bdas ${TOOL}${NOT_COMPOUND}`, 'g'), 'die SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bDas ${TOOL}${NOT_COMPOUND}`, 'g'), 'Die SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bdem ${TOOL}${NOT_COMPOUND}`, 'g'), 'der SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bdes ${TOOL}${NOT_COMPOUND}`, 'g'), 'der SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bunseres ${TOOL}${NOT_COMPOUND}`, 'g'), 'unserer SRT (Sonic Reporting Tool)'],
  [new RegExp(`\\bzum ${TOOL}${NOT_COMPOUND}`, 'g'), 'zur SRT (Sonic Reporting Tool)'],
];

const SRT = `SRTs?${NOT_COMPOUND}`;
const SRT_RULES: Array<[RegExp, string]> = [
  [new RegExp(`\\bim ${SRT}`, 'g'), 'in der SRT'],
  [new RegExp(`\\bIm ${SRT}`, 'g'), 'In der SRT'],
  [new RegExp(`\\bIM ${SRT}`, 'g'), 'IN DER SRT'],
  [new RegExp(`\\bdas ${SRT}`, 'g'), 'die SRT'],
  [new RegExp(`\\bDas ${SRT}`, 'g'), 'Die SRT'],
  [new RegExp(`\\bDAS ${SRT}`, 'g'), 'DIE SRT'],
  [new RegExp(`\\bdem ${SRT}`, 'g'), 'der SRT'],
  [new RegExp(`\\bDem ${SRT}`, 'g'), 'Der SRT'],
  [new RegExp(`\\bdes ${SRT}`, 'g'), 'der SRT'],
  [new RegExp(`\\bzum ${SRT}`, 'g'), 'zur SRT'],
  [new RegExp(`\\bvom ${SRT}`, 'g'), 'von der SRT'],
  [new RegExp(`\\bins ${SRT}`, 'g'), 'in die SRT'],
  [new RegExp(`\\bunserem ${SRT}`, 'g'), 'unserer SRT'],
  [new RegExp(`\\bunseres ${SRT}`, 'g'), 'unserer SRT'],
];

// Pronouns that pointed back to „das SRT" in existing sentences.
const PRONOUN_FIXES: Array<[string, string]> = [
  ['Die SRT ist das zentrale Nervensystem — es verbindet', 'Die SRT ist das zentrale Nervensystem — sie verbindet'],
  ['Die SRT ist kein Tool — es ist', 'Die SRT ist kein Tool — sie ist'],
  ['Wir haben es so gebaut, dass Promoter', 'Wir haben sie so gebaut, dass Promoter'],
  ['über die SRT, das KPIs', 'über die SRT, die KPIs'],
];

export function applySrtRule(text: string): string {
  if (!text || (!text.includes('SRT') && !text.includes('Sonic Reporting Tool'))) return text;
  let out = text;
  for (const [re, to] of TOOL_RULES) out = out.replace(re, to);
  for (const [re, to] of SRT_RULES) out = out.replace(re, to);
  for (const [from, to] of PRONOUN_FIXES) if (out.includes(from)) out = out.split(from).join(to);
  // A phrase that already named the tool gets no doubled bracket: „SRT (Sonic Reporting Tool) (SRT)".
  return out.replace(/SRT \(Sonic Reporting Tool\)\s*\(SRT\)/g, 'SRT (Sonic Reporting Tool)');
}
