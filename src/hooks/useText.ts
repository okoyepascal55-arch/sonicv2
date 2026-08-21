import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { getTextSections, type TextSection } from '@/lib/textStore';

/* ── In-memory cache to avoid repeated localStorage reads ── */
let cachedSections: TextSection[] | null = null;
let cacheVersion = 0;

function getSectionsSnapshot(): TextSection[] {
  if (!cachedSections) {
    cachedSections = getTextSections();
  }
  return cachedSections;
}

function invalidateCache(): void {
  cachedSections = null;
  cacheVersion++;
}

const listeners = new Set<() => void>();

function subscribeToStore(cb: () => void): () => void {
  listeners.add(cb);
  const onUpdate = () => {
    invalidateCache();
    cb();
  };
  window.addEventListener('text-store-update', onUpdate);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('text-store-update', onUpdate);
  };
}

/* ── Low-level: look up a single entry value ── */
function findEntryValue(
  sections: TextSection[],
  sectionKey: string,
  entryId: string,
): string | undefined {
  const section = sections.find((s) => s.key === sectionKey);
  if (!section) return undefined;
  const entry = section.entries.find((e) => e.id === entryId);
  return entry?.value;
}

/* ── Primary hook: reactive single text value ── */
export function useText(sectionKey: string, entryId: string, fallback = ''): string {
  const sections = useSyncExternalStore(
    subscribeToStore,
    getSectionsSnapshot,
    getSectionsSnapshot,
  );
  const value = findEntryValue(sections, sectionKey, entryId);
  return value ?? fallback;
}

/* ── Hook: get ALL entries for a section as a record ── */
export function useTextSection(sectionKey: string): Record<string, string> {
  const sections = useSyncExternalStore(
    subscribeToStore,
    getSectionsSnapshot,
    getSectionsSnapshot,
  );

  const section = sections.find((s) => s.key === sectionKey);
  if (!section) return {};

  const record: Record<string, string> = {};
  for (const entry of section.entries) {
    record[entry.id] = entry.value;
  }
  return record;
}

/* ── Hook: get multiple entries at once ── */
export function useTextMany(
  pairs: Array<{ sectionKey: string; entryId: string }>,
): Record<string, string> {
  const sections = useSyncExternalStore(
    subscribeToStore,
    getSectionsSnapshot,
    getSectionsSnapshot,
  );

  const result: Record<string, string> = {};
  for (const { sectionKey, entryId } of pairs) {
    const val = findEntryValue(sections, sectionKey, entryId);
    if (val !== undefined) result[entryId] = val;
  }
  return result;
}