// components/work/workModal.tsx
//
// Lightbox for a single WorkJob. Navigates only within that job's own
// photos array — the feed passes a fresh job + index in, this component
// owns none of the feed's state.

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { WorkJob } from "@/lib/workData";

type Props = {
  job: WorkJob;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function WorkModal({ job, index, onClose, onPrev, onNext }: Props) {
  const isFirst = index === 0;
  const isLast = index === job.photos.length - 1;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isFirst) onPrev();
      if (e.key === "ArrowRight" && !isLast) onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFirst, isLast, onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-2xl flex-col gap-4 rounded-card bg-card p-4 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: close button, top-left of the card */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Photo */}
        <div className="relative aspect-4/3 max-h-[60vh] w-full overflow-hidden rounded-card bg-paper">
          <Image
            src={job.photos[index]}
            alt={job.caption}
            fill
            className="object-contain"
          />

          {!isFirst && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink shadow-sm transition-colors hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {!isLast && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/90 text-ink shadow-sm transition-colors hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Caption + page counter */}
        <div className="flex items-start justify-between gap-4">
          <p className="min-w-0 flex-1 whitespace-pre-line text-sm font-medium text-ink">
            {job.caption}
          </p>
          <span className="shrink-0 whitespace-nowrap text-sm text-ink-soft">
            {index + 1} of {job.photos.length}
          </span>
        </div>
      </div>
    </div>
  );
}
