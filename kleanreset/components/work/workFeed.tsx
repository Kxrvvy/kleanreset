// components/work/workFeed.tsx
//
// Vertical feed of job posts (caption + photo cluster only, no header/
// avatar/timestamp). Owns which job/photo the lightbox is currently on.

"use client";

import { useState } from "react";
import type { WorkJob } from "@/lib/workData";
import { PhotoCluster } from "@/components/work/photoCluster";
import { WorkModal } from "@/components/work/workModal";

type Props = {
  jobs: WorkJob[];
};

type OpenPhoto = {
  jobId: string;
  index: number;
};

export function WorkFeed({ jobs }: Props) {
  const [open, setOpen] = useState<OpenPhoto | null>(null);

  const activeJob = open ? jobs.find((job) => job.id === open.jobId) ?? null : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {jobs.map((job) => (
        <article key={job.id} className="rounded-card border border-line bg-card p-4">
          <p className="mb-3 whitespace-pre-line text-ink">{job.caption}</p>
          <PhotoCluster
            photos={job.photos}
            caption={job.caption}
            onPhotoClick={(index) => setOpen({ jobId: job.id, index })}
          />
        </article>
      ))}

      {activeJob && open && (
        <WorkModal
          job={activeJob}
          index={open.index}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen({ jobId: activeJob.id, index: open.index - 1 })}
          onNext={() => setOpen({ jobId: activeJob.id, index: open.index + 1 })}
        />
      )}
    </div>
  );
}
