import { useEffect, useState } from 'react';
import { resolveImageUrl } from '@/lib/mediaStore';

interface MediaStoreImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  rawUrl?: string;
  fallbackSrc?: string;
}

/**
 * Renders a Media Store asset without changing the Media Store contract.
 * The store remains authoritative; fallback is only used if the asset itself
 * cannot be rendered by the browser.
 */
export default function MediaStoreImage({ rawUrl, src, fallbackSrc, onError, ...props }: MediaStoreImageProps) {
  const source = rawUrl ?? src ?? '';
  const [currentSrc, setCurrentSrc] = useState(() => resolveImageUrl(source));

  useEffect(() => {
    setCurrentSrc(resolveImageUrl(source));
  }, [source]);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
