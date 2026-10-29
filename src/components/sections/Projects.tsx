"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects, topLanguages } from "@/data/projects";
import type { Project } from "@/data/types";
import { PixelWindow } from "@/components/ui/PixelWindow";

const PAGE = 6;

function pattern(name: string) {
  const colors = ["#FF2E9A", "#3CFF9E", "#6C7BFF", "#FFE94D", "#8B2CFF"];
  let hash = 0;
  for (const char of name) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return { color: colors[hash % colors.length], cells: hash };
}

function stars(count: number) {
  const filled = Math.min(5, count);
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)} ${count}`;
}

export function Projects() {
  const languages = topLanguages();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState<"updated" | "stars" | "name">("updated");
  const [visible, setVisible] = useState(PAGE);
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects
      .filter((project) => {
        const categoryOk = category === "All" || project.category === category;
        const languageOk = language === "All" || project.languages.some((item) => item.name === language);
        const haystack = `${project.name} ${project.description}`.toLowerCase();
        return categoryOk && languageOk && (needle.length === 0 || haystack.includes(needle));
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (sort === "stars") return b.stars - a.stars || b.updatedAt.localeCompare(a.updatedAt);
        if (sort === "name") return a.name.localeCompare(b.name);
        return (a.rank ?? 99) - (b.rank ?? 99) || b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [category, language, query, sort]);

  const shown = filtered.slice(0, visible);
  const bytes = active ? active.languages.reduce((sum, item) => sum + item.bytes, 0) : 0;

  return (
    <section id="level-02" className="level">
      <p className="level-kicker">Level 02</p>
      <h2>Missions</h2>
      <p className="command">{`> filter --lang=${language === "All" ? "*" : language.toLowerCase()} --cat=${category.toLowerCase()} ${query}`}</p>
      <label className="pixel-field">
        <span>Search</span>
        <input
          value={query}
          aria-label="Search repositories"
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(PAGE);
          }}
        />
      </label>
      <div className="pixel-tabs" aria-label="Categories">
        {projectCategories.map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setVisible(PAGE); }}>
            {item}
          </button>
        ))}
      </div>
      <div className="pixel-tabs">
        <button type="button" aria-pressed={language === "All"} onClick={() => setLanguage("All")}>
          All languages
        </button>
        {languages.map((item) => (
          <button key={item.name} type="button" aria-pressed={language === item.name} onClick={() => setLanguage(item.name)}>
            {item.name}
          </button>
        ))}
        <label className="pixel-field inline">
          <span>Sort</span>
          <select value={sort} aria-label="Sort repositories" onChange={(event) => setSort(event.target.value as "updated" | "stars" | "name")}>
            <option value="updated">Updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      {shown.length === 0 ? <p className="fine">No repositories match that filter.</p> : null}
      <div className="quest-grid">
        {shown.map((project) => {
          const art = pattern(project.name);
          return (
            <article key={project.name} className="quest-card">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={`${project.name} image from the repository README`} />
              ) : (
                <svg className="quest-art" viewBox="0 0 8 5" shapeRendering="crispEdges" aria-hidden="true">
                  {Array.from({ length: 40 }, (_, index) => (
                    <rect
                      key={index}
                      x={index % 8}
                      y={Math.floor(index / 8)}
                      width="1"
                      height="1"
                      fill={(art.cells >> index % 8) & 1 ? art.color : "#070312"}
                    />
                  ))}
                </svg>
              )}
              <p className="quest-tag">{project.featured ? "BOSS" : "QUEST"}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="fine">
                {stars(project.stars)} · {project.forks} forks · {project.updatedAt.slice(0, 10)}
              </p>
              <ul className="chips">
                {(project.stack.length > 0 ? project.stack : project.languages.map((item) => item.name)).slice(0, 5).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="card-actions">
                {project.homepage ? (
                  <a href={project.homepage} target="_blank" rel="noreferrer">
                    PLAY
                  </a>
                ) : null}
                <a href={project.url} target="_blank" rel="noreferrer">
                  CODE
                </a>
                <button type="button" onClick={() => setActive(project)}>
                  INFO
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {visible < filtered.length ? (
        <button type="button" className="start-btn" onClick={() => setVisible((value) => value + PAGE)}>
          LOAD MORE SAVE FILES
        </button>
      ) : (
        <p className="fine">
          Showing {filtered.length} of {projects.length} public repositories.
        </p>
      )}
      {active ? (
        <div className="modal-layer" role="presentation" onClick={() => setActive(null)}>
          <div onClick={(event) => event.stopPropagation()}>
            <PixelWindow title={active.name} label={active.featured ? "BOSS" : "QUEST"} onClose={() => setActive(null)}>
              <p>{active.description}</p>
              <p className="fine">{active.readmeSummary}</p>
              <ul className="lang-bars">
                {active.languages.map((language) => (
                  <li key={language.name}>
                    <span>
                      {language.name} {bytes > 0 ? `${Math.round((language.bytes / bytes) * 100)}%` : ""}
                    </span>
                    <span className="bar">
                      <i style={{ width: bytes > 0 ? `${(language.bytes / bytes) * 100}%` : "0%" }} />
                    </span>
                  </li>
                ))}
              </ul>
              {active.languages.length === 0 ? <p>TODO: GitHub reported no language for this repository.</p> : null}
              {!active.image ? <p>No README image is stored for this repository.</p> : null}
              <div className="card-actions">
                {active.homepage ? (
                  <a href={active.homepage} target="_blank" rel="noreferrer">
                    PLAY
                  </a>
                ) : null}
                <a href={active.url} target="_blank" rel="noreferrer">
                  CODE
                </a>
              </div>
            </PixelWindow>
          </div>
        </div>
      ) : null}
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
