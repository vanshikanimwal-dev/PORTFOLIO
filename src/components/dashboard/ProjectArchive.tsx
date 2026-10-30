"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Folder, GitFork, Star } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";

const PAGE = 9;

const languages = Array.from(
  new Set(projects.flatMap((project) => project.languages.map((language) => language.name))),
).sort((a, b) => a.localeCompare(b));

function textOf(project: (typeof projects)[number]) {
  return project.description || project.readmeSummary || "";
}

export function ProjectArchive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (category !== "All" && project.category !== category) return false;
      if (language !== "All" && !project.languages.some((item) => item.name === language)) return false;
      if (!needle) return true;
      const haystack = [project.name, project.description, project.readmeSummary, project.category, ...project.stack, ...project.topics]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, category, language]);

  const visible = filtered.slice(0, shown);

  return (
    <div className="wrap" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <section className="panel edge-blue">
        <h1 style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Folder aria-hidden="true" /> Projects
        </h1>
        <p>Every public repository on GitHub.</p>
        <div className="filters">
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShown(PAGE);
            }}
            placeholder="Search projects"
            aria-label="Search projects"
          />
          <label>
            Category
            <select
              value={category}
              aria-label="Filter by category"
              onChange={(event) => {
                setCategory(event.target.value);
                setShown(PAGE);
              }}
            >
              {projectCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Language
            <select
              value={language}
              aria-label="Filter by language"
              onChange={(event) => {
                setLanguage(event.target.value);
                setShown(PAGE);
              }}
            >
              <option value="All">All</option>
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <p>
            SHOWING {visible.length} OF {filtered.length}
          </p>
        </div>
        <div className="archive">
          {visible.map((project) => (
            <article key={project.name} className="panel subcard edge-purple">
              <div className="thumb">
                <div className="banner" aria-hidden="true">
                  <span style={{ background: "#FF4FA3" }} />
                  <span style={{ background: "#8B5CF6" }} />
                  <span style={{ background: "#22D3EE" }} />
                </div>
              </div>
              <h2 style={{ color: "white", fontSize: 18 }}>{project.name}</h2>
              <p className="chip">{project.category}</p>
              {textOf(project) ? <p className="clamp-2">{textOf(project)}</p> : null}
              <p style={{ marginTop: "auto", display: "flex", gap: 12 }}>
                {project.stars > 0 ? (
                  <span>
                    <Star size={14} aria-hidden="true" /> {project.stars} <span className="sr-only">stars</span>
                  </span>
                ) : null}
                {project.forks > 0 ? (
                  <span>
                    <GitFork size={14} aria-hidden="true" /> {project.forks} <span className="sr-only">forks</span>
                  </span>
                ) : null}
              </p>
              <a className="view" href={project.homepage || project.url}>
                View Project <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        {shown < filtered.length ? (
          <button type="button" className="btn ghost" style={{ marginTop: 16 }} onClick={() => setShown((value) => value + PAGE)}>
            Load more
          </button>
        ) : null}
      </section>
    </div>
  );
}
