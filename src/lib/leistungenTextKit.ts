/* Shared helper for the Leistungen dashboard sections (content review 30.09.2026). */
import type { TextEntry, TextSection } from './textStore';

export type EntryType = TextEntry['type'];

/** One dashboard entry. Long values get a multiline editor automatically. */
export const e = (id: string, label: string, type: EntryType, value: string): TextEntry => ({
  id, label, description: '', type, value, ...(value.length > 70 ? { multiline: true } : {}),
});

/** One dashboard section on a Leistungen page. */
export const section = (key: string, label: string, pagePath: string, description: string, entries: TextEntry[]): TextSection => ({
  key, label, pageGroupId: 'leistungen', pagePath, description, entries,
});
