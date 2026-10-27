import type { Project } from "@/data/types";
import { formatDate } from "@/lib/utils";

export function ProjectCard({
  project,
  featured,
  onOpen,
  onHover,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
  onHover: (name: string) => void;
}) {
  return (
    <article
      className={featured ? "project-card p-5 md:col-span-2" : "project-card p-4"}
      onMouseEnter={() => onHover(project.name)}
      onFocus={() => onHover(project.name)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-pixel text-lg text-hot">{project.category}</p>
        <p className="text-sm text-muted">
          ★ {project.stars} · forks {project.forks}
        </p>
      </div>
      <h3 className="glitch mt-1" data-text={project.name}>
        {project.name}
      </h3>
      <p className="mt-2 text-muted">{project.description}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {(project.languages.slice(0, 4).map((language) => language.name).length
          ? project.languages.slice(0, 4).map((language) => language.name)
          : project.stack.slice(0, 4)
        ).map((name) => (
          <li key={name} className="chip">
            {name}
          </li>
        ))}
        {project.languages.length === 0 && project.stack.length === 0 ? (
          <li className="chip">No language reported</li>
        ) : null}
      </ul>
      <p className="mt-3 text-sm text-muted">Updated {formatDate(project.updatedAt)}</p>
      <div className="mini-term mt-3 rounded-lg bg-[#05010acc] p-3 text-sm text-muted">
        {project.readmeSummary}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="neon-btn" onClick={() => onOpen(project)}>
          Open log
        </button>
        {project.homepage ? (
          <a className="neon-btn neon-btn-ghost" href={project.homepage} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : (
          <span className="neon-btn neon-btn-ghost opacity-60" aria-disabled="true">
            No live URL
          </span>
        )}
        <a className="neon-btn neon-btn-ghost" href={project.url} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </article>
  );
}
