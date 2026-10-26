import type { LioraAsset } from '../data/assets';

type Props = {
  asset: LioraAsset;
  /** Matches the CSS layout width so the browser picks the smallest usable file. */
  sizes?: string;
  className?: string;
  /** Set on the hero image only; everything else lazy-loads. */
  priority?: boolean;
  objectPosition?: string;
  /** 'contain' keeps the whole frame visible, e.g. inside the lightbox. */
  fit?: 'cover' | 'contain';
};

const base = import.meta.env.BASE_URL;

/**
 * Renders a Liora photograph with a WebP srcset and a JPEG fallback.
 * When the photograph has not been supplied, an elegant monogram panel is
 * shown instead — never unrelated stock photography.
 */
export default function Photo({
  asset,
  sizes = '100vw',
  className = '',
  priority = false,
  objectPosition,
  fit = 'cover',
}: Props) {
  if (!asset.file) return <Placeholder label={asset.description} className={className} />;

  const srcSet = asset.widths
    .map((w) => `${base}images/liora/${asset.file}-${w}.webp ${w}w`)
    .join(', ');

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={`${base}images/liora/${asset.file}.jpg`}
        alt={asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full ${className}`}
        style={{ objectFit: fit, ...(objectPosition ? { objectPosition } : {}) }}
      />
    </picture>
  );
}

export function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — photograph to come`}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-espresso/[0.055] px-6 text-center ${className}`}
    >
      <span className="font-serif text-4xl text-espresso/35 select-none">L</span>
      <span className="eyebrow text-espresso/45">{label}</span>
      <span className="text-[0.6875rem] font-light tracking-wide text-espresso/35">
        Photograph to come
      </span>
    </div>
  );
}
