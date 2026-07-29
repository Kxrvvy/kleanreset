// components/work/workPortfolio.tsx
//
// Filterable portfolio of real cleaning projects. Filters only show categories
// that actually have projects; switching filters re-renders the grid with a
// subtle fade. Each project is a portfolio card (title, description, photo
// gallery, areas cleaned); clicking any photo opens the lightbox.

"use client";

import { useMemo, useState } from "react";
import { PhotoCluster } from "@/components/work/photoCluster";
import { WorkModal } from "@/components/work/workModal";
import { CATEGORY_LABELS, type WorkCategory, type WorkProject } from "@/lib/workData";

type Props = { projects: WorkProject[] };
type Filter = WorkCategory | "all";
type OpenPhoto = { projectId: string; index: number };

export function WorkPortfolio({ projects }: Props) {
  const [active, setActive] = useState<Filter>("all");
  const [open, setOpen] = useState<OpenPhoto | null>(null);

  // Build the filter list from categories that actually have projects.
  const filters = useMemo<{ id: Filter; label: string }[]>(() => {
    const present = projects.reduce<WorkCategory[]>((acc, p) => {
      if (!acc.includes(p.category)) acc.push(p.category);
      return acc;
    }, []);
    return [
      { id: "all", label: "All" },
      ...present.map((c) => ({ id: c, label: CATEGORY_LABELS[c] })),
    ];
  }, [projects]);

  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);
  const activeProject = open ? projects.find((p) => p.id === open.projectId) ?? null : null;

  return (
    <div>
      {/* Category filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={isActive}
              className={`rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${isActive
                ? "bg-pine text-white"
                : "border border-line bg-card text-ink hover:bg-sea-mist/40"
                }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Projects — keyed so switching category triggers a subtle fade */}
      <div key={active} className="animate-fade-in mx-auto flex max-w-3xl flex-col gap-8">
        {visible.map((project) => (
          <article
            key={project.id}
            className="rounded-card border border-line bg-card p-5 shadow-sm sm:p-6"
          >
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{project.title}</h2>
            <p className="mt-2 text-ink-soft">{project.description}</p>

            <div className="mt-5">
              <PhotoCluster
                photos={project.photos}
                alt={project.title}
                onPhotoClick={(index) => setOpen({ projectId: project.id, index })}
              />
            </div>

            {project.areas.length > 0 && (
              <p className="mt-4 text-sm text-ink-soft">
                <span className="font-semibold text-ink">Areas cleaned:</span>{" "}
                {project.areas.join(" · ")}
              </p>
            )}
          </article>
        ))}
      </div>

      {activeProject && open && (
        <WorkModal
          project={activeProject}
          index={open.index}
          onClose={() => setOpen(null)}
          onIndexChange={(index) => setOpen({ projectId: activeProject.id, index })}
        />
      )}
    </div>
  );
}
