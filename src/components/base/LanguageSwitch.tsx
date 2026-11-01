import { LANGS, setLanguage, useLanguage } from '@/lib/language';

/** DE | EN switch — flat, lime for the active language. */
export default function LanguageSwitch({ className = '' }: { className?: string }) {
  const lang = useLanguage();
  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Sprache'}
      className={`flex items-stretch border border-foreground-950/15 ${className}`}
      style={{ borderRadius: 0 }}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => setLanguage(l)}
            aria-pressed={active}
            aria-label={l === 'de' ? 'Deutsch' : 'English'}
            className={`px-2.5 py-1.5 text-xs font-black tracking-[0.15em] uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 ${
              active ? 'bg-primary-500 text-foreground-950' : 'text-foreground-700 hover:text-primary-500'
            }`}
            style={{ borderRadius: 0 }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
