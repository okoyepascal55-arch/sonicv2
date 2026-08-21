import { useState, useEffect } from 'react';

/**
 * SkipLink — "Invisible Barrier #1" fix
 * Provides keyboard-only users a way to bypass the navigation
 * and jump directly to the main content area.
 */
export default function SkipLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setVisible(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <a
      href="#main-content"
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      className={`fixed top-4 left-4 z-[9999] px-6 py-3 bg-primary-500 text-background-50 font-black text-sm uppercase tracking-widest shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-500/50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      style={{ borderRadius: 0 }}
    >
      <i className="ri-arrow-down-line mr-2" />
      Zum Hauptinhalt springen
    </a>
  );
}