import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxItem {
  image: string;
  title: string;
  category: string;
  description: string;
}

interface LightboxProps {
  items: LightboxItem[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Lightbox — unified fullscreen image viewer.
 *
 * Handles its own keyboard events (Escape, ArrowLeft, ArrowRight)
 * and click-outside-to-close. Uses the Sonic z-modal layer so it
 * always sits above navigation drawers.
 */
export default function Lightbox({
  items,
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen || items.length === 0) return null;

  const current = items[activeIndex] ?? items[0];

  return createPortal(
    <div
      className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center opacity-0 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-primary-500 hover:bg-primary-500 transition-all duration-standard ease-sonic group z-10 cursor-pointer"
        aria-label="Close lightbox"
      >
        <i className="ri-close-line text-2xl text-white group-hover:text-foreground-950" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm border-2 border-primary-500/40 px-6 py-3 z-10">
        <span className="text-white font-black text-lg">
          {activeIndex + 1} / {items.length}
        </span>
      </div>

      {/* Previous Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-primary-500 hover:bg-primary-500 transition-all duration-standard ease-sonic group cursor-pointer"
        aria-label="Previous image"
      >
        <i className="ri-arrow-left-line text-2xl text-white group-hover:text-foreground-950" />
      </button>

      {/* Next Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-primary-500 hover:bg-primary-500 transition-all duration-standard ease-sonic group cursor-pointer"
        aria-label="Next image"
      >
        <i className="ri-arrow-right-line text-2xl text-white group-hover:text-foreground-950" />
      </button>

      {/* Main Image */}
      <div
        className="max-w-6xl max-h-[80vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.title}
          className="max-w-full max-h-[80vh] object-contain"
          loading="lazy"
        />

        {/* Image Info Overlay — compact pill, image-first */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm border border-primary-500/40 px-5 py-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 whitespace-nowrap">
              {current.category}
            </span>
            <span className="text-white/50 text-[10px]">|</span>
            <span className="text-white font-bold text-xs truncate max-w-[200px]">{current.title}</span>
            <span className="text-white/30 text-xs tabular-nums ml-1">{activeIndex + 1}/{items.length}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}