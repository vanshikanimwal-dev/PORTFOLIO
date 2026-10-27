"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/types";
import { formatDate } from "@/lib/utils";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const total = project?.languages.reduce((sum, language) => sum + language.bytes, 0) ?? 0;

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-label={project ? `${project.name} details` : "Project details"}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {project ? (
        <div>
          <header className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-pixel text-hot">
                {project.category} {project.featured ? "· FEATURED" : ""}
              </p>
              <h3 className="font-display text-4xl">{project.name}</h3>
            </div>
            <button type="button" className="neon-btn-ghost neon-btn" onClick={onClose}>
              Close
            </button>
          </header>
          <p>{project.description}</p>
          <div className="terminal mt-4">
            <p className="text-cyan">&gt; cat README</p>
            <p className="text-muted">{project.readmeSummary}</p>
          </div>
          {project.image ? (
            // Remote README images are arbitrary URLs, so a plain img keeps the optimizer from requiring every host.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={`${project.name} image from the README`} className="mt-4 max-h-64 rounded-lg" />
          ) : (
            <p className="mt-4 text-sm text-muted">TODO: no image was found in this README.</p>
          )}
          <div className="mt-4 space-y-2">
            {project.languages.length === 0 ? (
              <p className="text-muted">GitHub did not report language bytes for this repository.</p>
            ) : (
              project.languages.map((language) => (
                <div key={language.name}>
                  <div className="flex justify-between text-sm">
                    <span>{language.name}</span>
                    <span>{Math.round((language.bytes / total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-panel2">
                    <div
                      className="h-2 rounded-full bg-neon-gradient"
                      style={{ width: `${Math.max(4, (language.bytes / total) * 100)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <p className="mt-4 text-sm text-muted">
            Updated {formatDate(project.updatedAt)} · ★ {project.stars} · forks {project.forks}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.homepage ? (
              <a className="neon-btn" href={project.homepage} target="_blank" rel="noreferrer">
                Live
              </a>
            ) : null}
            <a className="neon-btn neon-btn-ghost" href={project.url} target="_blank" rel="noreferrer">
              Source
            </a>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
