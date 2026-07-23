// components/work/photoCluster.tsx
//
// Messenger/Facebook-style photo grouping for a WorkJob's photo array.
// Layout is driven entirely by photos.length; the outer wrapper carries the
// only rounded corner + overflow-hidden, tiles butt up against a small gap.

import Image from "next/image";

type Props = {
  photos: string[];
  caption: string;
  onPhotoClick: (index: number) => void;
};

const TILE_HEIGHT = "h-72 sm:h-96";

function Tile({
  src,
  alt,
  className = "",
  onClick,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative block h-full w-full overflow-hidden ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
      {children}
    </button>
  );
}

export function PhotoCluster({ photos, caption, onPhotoClick }: Props) {
  if (photos.length === 1) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-card">
        <Tile src={photos[0]} alt={caption} onClick={() => onPhotoClick(0)} />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-[3px] overflow-hidden rounded-card ${TILE_HEIGHT}`}>
        {photos.map((photo, i) => (
          <Tile key={photo} src={photo} alt={caption} onClick={() => onPhotoClick(i)} />
        ))}
      </div>
    );
  }

  if (photos.length === 3) {
    return (
      <div
        className={`grid grid-cols-2 grid-rows-2 gap-[3px] overflow-hidden rounded-card ${TILE_HEIGHT}`}
      >
        <Tile
          src={photos[0]}
          alt={caption}
          className="row-span-2"
          onClick={() => onPhotoClick(0)}
        />
        <Tile src={photos[1]} alt={caption} onClick={() => onPhotoClick(1)} />
        <Tile src={photos[2]} alt={caption} onClick={() => onPhotoClick(2)} />
      </div>
    );
  }

  // 4 or more: even 2x2 grid, showing at most the first 4 tiles.
  const remaining = photos.length - 4;

  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 gap-[3px] overflow-hidden rounded-card ${TILE_HEIGHT}`}
    >
      {photos.slice(0, 4).map((photo, i) => (
        <Tile key={photo} src={photo} alt={caption} onClick={() => onPhotoClick(i)}>
          {i === 3 && remaining > 0 && (
            <span className="absolute inset-0 flex items-center justify-center bg-ink/55 font-display text-2xl font-bold text-white">
              +{remaining}
            </span>
          )}
        </Tile>
      ))}
    </div>
  );
}
