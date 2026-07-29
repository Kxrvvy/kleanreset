// components/work/workModal.tsx
//
// Portfolio lightbox for a single project. Browse all of that project's photos
// with prev/next, keyboard arrows, a count, and a thumbnail strip. Owns none
// of the portfolio's state — index changes are reported via onIndexChange.

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { WorkProject } from "@/lib/workData";

type Props = {
  project: WorkProject;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function WorkModal({ project, index, onClose, onIndexChange }: Props) {
  const total = project.photos.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isFirst) onIndexChange(index - 1);
      if (e.key === "ArrowRight" && !isLast) onIndexChange(index + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, isFirst, isLast, onClose, onIndexChange]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col gap-4 rounded-card bg-card p-4 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: title + count + close */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold text-ink">{project.title}</p>
            <p className="text-xs text-ink-soft">
              {index + 1} / {total}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Photo */}
        <div className="relative aspect-4/3 max-h-[58vh] w-full overflow-hidden rounded-card bg-paper">
          <Image
            src={project.photos[index]}
            alt={`${project.title} — photo ${index + 1}`}
            fill
            className="object-contain"
            sizes="(min-width: 768px) 768px, 100vw"
          />

          {!isFirst && (
            <button
              type="button"
              onClick={() => onIndexChange(index - 1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink shadow-sm transition-colors hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {!isLast && (
            <button
              type="button"
              onClick={() => onIndexChange(index + 1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink shadow-sm transition-colors hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Thumbnail strip (scrollable) */}
        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {project.photos.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === index}
                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-2 transition-all sm:h-14 sm:w-20 ${i === index ? "ring-pine" : "ring-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                <Image src={photo} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
