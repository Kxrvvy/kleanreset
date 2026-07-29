// components/work/photoCluster.tsx
//
// Photo grid for a project. Layout is driven by photos.length; the outer
// wrapper carries the only rounded corner + overflow-hidden. Every tile is
// clickable (opens the lightbox at that photo); the last tile of a 5+ set
// shows a "+N Photos" overlay to signal the rest of the gallery.

import Image from "next/image";

type Props = {
  photos: string[];
  alt: string;
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
      className={`group/tile relative block h-full w-full overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover/tile:scale-105"
        sizes="(min-width: 704px) 672px, 100vw"
      />
      {children}
    </button>
  );
}

export function PhotoCluster({ photos, alt, onPhotoClick }: Props) {
  if (photos.length === 1) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-card">
        <Tile src={photos[0]} alt={alt} onClick={() => onPhotoClick(0)} />
      </div>
    );
  }

  if (photos.length === 2) {
    return (
      <div className={`grid grid-cols-2 gap-[3px] overflow-hidden rounded-card ${TILE_HEIGHT}`}>
        {photos.map((photo, i) => (
          <Tile key={photo} src={photo} alt={alt} onClick={() => onPhotoClick(i)} />
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
          alt={alt}
          className="row-span-2"
          onClick={() => onPhotoClick(0)}
        />
        <Tile src={photos[1]} alt={alt} onClick={() => onPhotoClick(1)} />
        <Tile src={photos[2]} alt={alt} onClick={() => onPhotoClick(2)} />
      </div>
    );
  }

  // 4 or more: even 2x2 grid, showing the first 4 tiles.
  const remaining = photos.length - 4;

  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 gap-[3px] overflow-hidden rounded-card ${TILE_HEIGHT}`}
    >
      {photos.slice(0, 4).map((photo, i) => (
        <Tile key={photo} src={photo} alt={alt} onClick={() => onPhotoClick(i)}>
          {i === 3 && remaining > 0 && (
            <span className="absolute inset-0 flex flex-col items-center justify-center bg-ink/60 text-white">
              <span className="font-display text-2xl font-bold sm:text-3xl">+{remaining}</span>
              <span className="text-xs font-semibold uppercase tracking-wide">Photos</span>
            </span>
          )}
        </Tile>
      ))}
    </div>
  );
}
