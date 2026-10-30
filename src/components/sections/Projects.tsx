"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects, topLanguages } from "@/data/projects";
import type { Project } from "@/data/types";
import { useGame } from "@/components/game/GameContext";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Section } from "@/components/ui/Section";

const PAGE = 6;
const BANNER_COLORS = ["#FF2E9A", "#3CFF9E", "#6C7BFF", "#FFE94D", "#8B2CFF", "#FFB3E6", "#F7EEFF"];
const INK = "#070312";
const PAPER = "#F5E9FF";

function hashName(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function channel(value: number) {
  const s = value / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const hi = Math.max(luminance(a), luminance(b));
  const lo = Math.min(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

function inkFor(background: string) {
  const onInk = contrast(background, INK);
  const onPaper = contrast(background, PAPER);
  if (onInk >= 4.5 && onInk >= onPaper) return INK;
  return PAPER;
}

function bannerColors(name: string) {
  const hash = hashName(name);
  const background = BANNER_COLORS[hash % BANNER_COLORS.length];
  const accent = BANNER_COLORS[(hash + 3) % BANNER_COLORS.length];
  const ink = inkFor(background);
  const safeAccent = contrast(accent, ink) >= 4.5 ? accent : background;
  return { background, accent: safeAccent, ink };
}

function usableImage(src: string | null) {
  if (!src) return false;
  const lower = src.toLowerCase();
  return !lower.includes("theme=dark") && !lower.includes("070312") && !lower.includes("black");
}

function Banner({ project, large = false }: { project: Project; large?: boolean }) {
  const colors = bannerColors(project.name);
  const initials = (project.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "??").toUpperCase();
  if (usableImage(project.image) && project.image) {
    return (
      <div className={large ? "quest-art is-large" : "quest-art"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt="" />
        <b style={{ color: colors.ink, background: colors.background }}>{initials}</b>
      </div>
    );
  }
  return (
    <div className={large ? "quest-art is-large" : "quest-art"} role="img" aria-label={`${project.category} banner for ${project.name}`}>
      <span style={{ background: colors.background }} />
      <span style={{ background: colors.accent }} />
      <b style={{ color: colors.ink }}>{initials}</b>
    </div>
  );
}

const BOSSES = ["CertiChain", "PayFlow", "AlgoVerse"];

const ARCHITECTURE: Record<string, string[]> = {
  CertiChain: ["Admin site", "Spring Boot API", "PostgreSQL", "MinIO", "Local chain or Sepolia"],
  PayFlow: ["Flutter client", "Spring Boot API", "PostgreSQL", "Redis", "Mock gateway"],
  AlgoVerse: ["Browser demo", "JavaFX desktop app"],
};

function sentences(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function statLine(project: Project) {
  const parts: string[] = [];
  if (project.primaryLanguage) parts.push(project.primaryLanguage);
  if (project.stars > 0) parts.push(`${project.stars} ${project.stars === 1 ? "star" : "stars"}`);
  if (project.forks > 0) parts.push(`${project.forks} ${project.forks === 1 ? "fork" : "forks"}`);
  if (project.updatedAt) parts.push(project.updatedAt.slice(0, 10));
  return parts.join(" · ");
}

function PixelSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pixel-select">
      <button type="button" aria-expanded={open} aria-label={label} onClick={() => setOpen((current) => !current)}>
        {label}: {value}
      </button>
      {open ? (
        <ul role="listbox" aria-label={label}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Briefing({ project, onClose }: { project: Project; onClose: () => void }) {
  const parts = sentences(project.description);
  const objective = parts[0];
  const features = parts.slice(1);
  const diagram = ARCHITECTURE[project.name] ?? [];
  return (
    <PixelWindow title={project.name} label="BRIEFING" onClose={onClose}>
      {objective ? (
        <>
          <h3>OBJECTIVE</h3>
          <p>{objective}</p>
        </>
      ) : null}
      {diagram.length > 0 ? (
        <>
          <h3>ARCHITECTURE</h3>
          <ol className="pixel-diagram">
            {diagram.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ol>
        </>
      ) : null}
      {project.stack.length > 0 ? (
        <>
          <h3>TECH STACK</h3>
          <ul className="chips">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {features.length > 0 ? (
        <>
          <h3>KEY FEATURES</h3>
          <ul>
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}
      {parts.length > 1 ? (
        <>
          <h3>WHAT I BUILT</h3>
          <p>{project.description}</p>
        </>
      ) : null}
      <h3>LINKS</h3>
      <div className="card-actions">
        <a href={project.url} target="_blank" rel="noreferrer">
          CODE
        </a>
        {project.homepage ? (
          <a href={project.homepage} target="_blank" rel="noreferrer">
            PLAY
          </a>
        ) : null}
      </div>
    </PixelWindow>
  );
}

export function Projects() {
  const { unlock } = useGame();
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

  const bosses = filtered.filter((project) => BOSSES.includes(project.name));
  const rest = filtered.filter((project) => !BOSSES.includes(project.name));
  const shown = rest.slice(0, visible);
  const visibleCount = bosses.length + shown.length;
  const bytes = active ? active.languages.reduce((sum, item) => sum + item.bytes, 0) : 0;
  const langLabel = language === "All" ? "all" : language.toLowerCase();
  const catLabel = category === "All" ? "all" : category.toLowerCase();

  return (
    <Section id="level-02" level="LEVEL 02" title="Missions" subtitle="Public repositories">
      <p className="command">{`> filter --lang=${langLabel} --cat=${catLabel}`}</p>
      <div className="mission-toolbar">
        <label className="pixel-field search-field">
          <span className="sr-only">Search missions</span>
          <input
            value={query}
            placeholder="> search missions..."
            aria-label="Search missions"
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE);
            }}
          />
        </label>
        <div className="toolbar-row">
          <div className="pixel-tabs" aria-label="Categories">
            {projectCategories.map((item) => (
              <button
                key={item}
                type="button"
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
          <div className="toolbar-controls">
            <PixelSelect
              label="Language"
              value={language}
              options={["All", ...languages.map((item) => item.name)]}
              onChange={(value) => {
                setLanguage(value);
                setVisible(PAGE);
              }}
            />
            <PixelSelect
              label="Sort"
              value={sort === "updated" ? "Updated" : sort === "stars" ? "Stars" : "Name"}
              options={["Updated", "Stars", "Name"]}
              onChange={(value) => setSort(value === "Stars" ? "stars" : value === "Name" ? "name" : "updated")}
            />
          </div>
        </div>
      </div>
      {bosses.length === 0 && shown.length === 0 ? <p className="fine">No repositories match that filter.</p> : null}
      {bosses.length > 0 ? (
        <div className="boss-row">
          {bosses.map((project) => {
            const tags = (project.stack.length > 0 ? project.stack : project.languages.map((item) => item.name)).slice(0, 4);
            return (
              <article key={project.name} className="boss-card">
                <Banner project={project} large />
                <div>
                  <p className="quest-tag">BOSS</p>
                  <h3>{project.name}</h3>
                  <p className="clamp-3">{project.description}</p>
                  <ul className="chips">
                    {tags.map((item) => (
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
                    <button
                      type="button"
                      onClick={() => {
                        setActive(project);
                        unlock("briefing", "Mission briefing");
                      }}
                    >
                      BRIEFING
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
      <div className="quest-grid">
        {shown.map((project) => {
          const tags = (project.stack.length > 0 ? project.stack : project.languages.map((item) => item.name)).slice(0, 4);
          const extra = Math.max(0, (project.stack.length > 0 ? project.stack.length : project.languages.length) - 4);
          return (
            <article key={project.name} className="quest-card">
              <Banner project={project} />
              <p className="quest-tag">{project.featured ? "BOSS" : "QUEST"}</p>
              <h3>{project.name}</h3>
              <p className="desc">{project.description}</p>
              <p className="quest-stats">{statLine(project)}</p>
              <ul className="chips">
                {tags.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                {extra > 0 ? <li>+{extra}</li> : null}
              </ul>
              <div className="card-actions">
                <a href={project.url} target="_blank" rel="noreferrer">
                  CODE
                </a>
                {project.homepage ? (
                  <a href={project.homepage} target="_blank" rel="noreferrer">
                    LIVE
                  </a>
                ) : null}
                <button type="button" onClick={() => setActive(project)}>
                  INFO
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="fine">
        SHOWING {visibleCount} OF {filtered.length}
      </p>
      {visible < rest.length ? (
        <button type="button" className="start-btn" onClick={() => setVisible((value) => value + PAGE)}>
          LOAD MORE SAVE FILES
        </button>
      ) : null}
      {active ? (
        <div className="modal-layer" role="presentation" onClick={() => setActive(null)}>
          <div role="dialog" aria-modal="true" aria-label={active.name} onClick={(event) => event.stopPropagation()}>
            {BOSSES.includes(active.name) ? (
              <Briefing project={active} onClose={() => setActive(null)} />
            ) : (
            <PixelWindow title={active.name} label={active.featured ? "BOSS" : "QUEST"} onClose={() => setActive(null)}>
              <p>{active.description}</p>
              <ul className="lang-bars">
                {active.languages.map((item) => (
                  <li key={item.name}>
                    <span>
                      {item.name} {bytes > 0 ? `${Math.round((item.bytes / bytes) * 100)}%` : ""}
                    </span>
                    <span className="bar">
                      <i style={{ width: bytes > 0 ? `${(item.bytes / bytes) * 100}%` : "0%" }} />
                    </span>
                  </li>
                ))}
              </ul>
              {active.languages.length === 0 ? <p>No language was reported for this repository.</p> : null}
              <div className="card-actions">
                <a href={active.url} target="_blank" rel="noreferrer">
                  CODE
                </a>
                {active.homepage ? (
                  <a href={active.homepage} target="_blank" rel="noreferrer">
                    LIVE
                  </a>
                ) : null}
              </div>
            </PixelWindow>
            )}
          </div>
        </div>
      ) : null}
    </Section>
  );
}
