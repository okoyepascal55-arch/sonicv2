/* Motion control (accessibility, WCAG 2.2.2 + prefers-reduced-motion).
   Moving content stops when the visitor's system asks for reduced motion
   or when they use the keyboard-only "Bewegungen anhalten" switch (SkipLink).
   No visual change for everyone else. */
import { useEffect, useState } from 'react';

const CLASS = 'motion-paused';
const KEY = 'sonic_motion_paused';
const EVENT = 'motion-pref-change';

const reducedQuery = () =>
  typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export function isMotionPaused(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains(CLASS) || !!reducedQuery()?.matches;
}

export function isUserPaused(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains(CLASS);
}

export function setUserPaused(paused: boolean): void {
  document.documentElement.classList.toggle(CLASS, paused);
  try { localStorage.setItem(KEY, paused ? '1' : '0'); } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event(EVENT));
}

/** Restore the visitor's choice on load (call once). */
export function initMotionPreference(): void {
  try { if (localStorage.getItem(KEY) === '1') document.documentElement.classList.add(CLASS); } catch { /* ignore */ }
}

/** true while moving content must stand still. */
export function useMotionPaused(): boolean {
  const [paused, setPaused] = useState(isMotionPaused);
  useEffect(() => {
    const update = () => setPaused(isMotionPaused());
    const mq = reducedQuery();
    mq?.addEventListener('change', update);
    window.addEventListener(EVENT, update);
    return () => { mq?.removeEventListener('change', update); window.removeEventListener(EVENT, update); };
  }, []);
  return paused;
}
