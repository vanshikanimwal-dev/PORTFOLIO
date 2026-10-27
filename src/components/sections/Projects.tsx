"use client";

import { useEffect, useMemo, useState } from "react";
import { projects, projectCategories, topLanguages } from "@/data/projects";
import type { Project } from "@/data/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

const PAGE = 6;

export function Projects() {
  const reduced = usePrefersReducedMotion();
  const languages = topLanguages();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState<"updated" | "stars" | "name">("updated");
  const [visible, setVisible] = useState(PAGE);
  const [hover, setHover] = useState("STANDBY");
  const [active, setActive] = useState<Project | null>(null);
  const [ready, setReady] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = projects.filter((project) => {
      const categoryOk = category === "All" || project.category === category;
      const languageOk =
        language === "All" ||
        project.languages.some((item) => item.name === language) ||
        project.stack.includes(language);
      const haystack = `${project.name} ${project.description} ${project.readmeSummary}`.toLowerCase();
      const queryOk = needle.length === 0 || haystack.includes(needle);
      return categoryOk && languageOk && queryOk;
    });
    return [...list].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars || b.updatedAt.localeCompare(a.updatedAt);
      if (sort === "name") return a.name.localeCompare(b.name);
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [category, language, query, sort]);

  const featured = filtered.filter((project) => project.featured);
  const archive = filtered.filter((project) => !project.featured);
  const shown = archive.slice(0, visible);

  return (
    <section id="projects" className="section">
      <SectionHeading kicker="MISSION CONTROL" title="Projects" />
      <div className="console-head">
        <div>
          <p className="font-display text-2xl">PROJECT_CONSOLE v2.0</p>
          <p className="text-sm text-muted">
            &gt; filter --category={category.toLowerCase()}
            {language !== "All" ? ` --lang=${language}` : ""} {query}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="led" aria-hidden="true" />
          <span className="font-pixel text-hot">SELECTING: {hover}</span>
          <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
            <path d="M8 8 H28 L40 28 H58" fill="none" stroke="#FF2E9A" strokeWidth="2" />
            <circle cx="58" cy="28" r="3" fill="#00F0FF" />
          </svg>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <label className="field flex items-center gap-2 px-3 py-2">
          <span className="text-cyan" aria-hidden="true">
            &gt;
          </span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE);
            }}
            placeholder="search repos"
            aria-label="Search repositories"
          />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Project categories">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              className="lang-chip"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setVisible(PAGE);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="lang-chip"
            aria-pressed={language === "All"}
            onClick={() => setLanguage("All")}
          >
            All languages
          </button>
          {languages.map((item) => (
            <button
              key={item.name}
              type="button"
              className="lang-chip"
              aria-pressed={language === item.name}
              onClick={() => setLanguage(item.name)}
            >
              {item.name} {item.count}
            </button>
          ))}
          <label className="ml-auto text-sm text-muted">
            Sort
            <select
              className="ml-2 bg-panel2 px-2 py-1 text-ink"
              value={sort}
              onChange={(event) => setSort(event.target.value as "updated" | "stars" | "name")}
            >
              <option value="updated">Updated</option>
              <option value="stars">Stars</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>
      {!ready ? (
        <div className="grid gap-4 md:grid-cols-2" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton h-48" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="hud-panel p-6">No repositories match that query.</p>
      ) : (
        <>
          {featured.length > 0 ? (
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  featured
                  onOpen={setActive}
                  onHover={setHover}
                />
              ))}
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((project) => (
              <ProjectCard key={project.name} project={project} onOpen={setActive} onHover={setHover} />
            ))}
          </div>
          {visible < archive.length ? (
            <button type="button" className="neon-btn mt-5" onClick={() => setVisible((value) => value + PAGE)}>
              Load more ({archive.length - visible} left)
            </button>
          ) : (
            <p className="mt-4 text-sm text-muted">
              Showing {filtered.length} of {projects.length} public repositories.
            </p>
          )}
        </>
      )}
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
