/**
 * Refresh src/data/projects.generated.json from the GitHub API.
 *
 * Usage:
 *   npm run sync:github
 *   npx tsx scripts/fetch-github.ts --offline scripts/_github-raw.json
 *
 * Requires network for the live path. GITHUB_TOKEN is optional and raises the rate limit.
 * If the API fails and a JSON file already exists, that file is left untouched.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { curation } from "../src/data/project-curation";

const USER = "vanshikanimwal-dev";
const OUT = resolve("src/data/projects.generated.json");

type RawRepo = {
  name: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  forks: number;
  updated: string;
  pushed: string;
  homepage: string | null;
  url: string;
  defaultBranch: string;
  size: number;
  readme: string;
};

const ENGINE = new Set([
  "CMake",
  "Makefile",
  "Batchfile",
  "PowerShell",
  "Shell",
  "Objective-C",
]);

const DART_ENGINE = new Set(["C", "C++", "Swift", "Kotlin"]);

function headers(): HeadersInit {
  const value: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vanshika-portfolio-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    value.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return value;
}

async function gh<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, { headers: headers() });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${path} ${body.slice(0, 180)}`);
  }
  return (await response.json()) as T;
}

function displayLanguages(languages: Record<string, number>, hasDart: boolean) {
  return Object.entries(languages)
    .filter(([name]) => {
      if (ENGINE.has(name)) return false;
      if (hasDart && DART_ENGINE.has(name)) return false;
      return true;
    })
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, bytes }));
}

function summarize(readme: string): string {
  const text = readme
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ");
  const lines = text
    .split(/\n+/)
    .map((line) => line.replace(/^#+\s*/, "").replace(/[*_`>|]/g, "").trim())
    .filter((line) => line.length > 40 && !line.startsWith("|") && !line.startsWith("---"));
  const joined = lines.slice(0, 3).join(" ");
  return joined.slice(0, 420);
}

function pickImage(readme: string): string | null {
  const urls = [...readme.matchAll(/!\[[^\]]*]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);
  const html = [...readme.matchAll(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/g)].map(
    (match) => match[1],
  );
  return (
    [...urls, ...html].find((url) => !/shields\.io|komarev\.com|img\.shields/i.test(url)) ?? null
  );
}

function normalize(repo: RawRepo) {
  const note = curation[repo.name];
  const hasDart = Object.prototype.hasOwnProperty.call(repo.languages, "Dart");
  const languages = displayLanguages(repo.languages, hasDart);
  const readmeSummary = summarize(repo.readme);
  const empty = repo.size === 0 || (!repo.readme.trim() && languages.length === 0 && repo.size < 3);
  const description =
    note?.description ??
    (readmeSummary || "TODO: this repository has no description or README.");

  return {
    name: repo.name,
    description,
    readmeSummary: readmeSummary || "No README summary is available for this repository.",
    category: note?.category ?? "Uncategorized",
    featured: Boolean(note?.featured),
    rank: note?.rank ?? null,
    primaryLanguage: languages[0]?.name ?? repo.language,
    languages,
    stack: note?.stack ?? [],
    topics: repo.topics,
    stars: repo.stars,
    forks: repo.forks,
    updatedAt: repo.updated,
    pushedAt: repo.pushed,
    homepage: repo.homepage || null,
    url: repo.url,
    defaultBranch: repo.defaultBranch,
    image: pickImage(repo.readme),
    empty,
    curated: Boolean(note),
  };
}

async function readmeText(name: string, branch: string): Promise<string> {
  const files = ["README.md", "readme.md", "README.MD", "Readme.md", "README"];
  for (const file of files) {
    const url = `https://raw.githubusercontent.com/${USER}/${name}/${branch}/${file}`;
    const response = await fetch(url, { headers: { "User-Agent": "vanshika-portfolio-sync" } });
    if (!response.ok) continue;
    const text = await response.text();
    if (text && !text.startsWith("404:")) return text.slice(0, 8000);
  }
  return "";
}

async function includeFork(name: string): Promise<boolean> {
  const commits = await gh<Array<{ sha: string }>>(
    `/repos/${USER}/${name}/commits?author=${USER}&per_page=1`,
  );
  return commits.length > 0;
}

async function fromApi(): Promise<RawRepo[]> {
  const repos: RawRepo[] = [];
  let page = 1;
  type ApiRepo = {
    name: string;
    description: string | null;
    fork: boolean;
    language: string | null;
    topics?: string[];
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    pushed_at: string;
    homepage: string | null;
    html_url: string;
    default_branch: string;
    size: number;
  };

  const collected: ApiRepo[] = [];
  while (true) {
    const batch = await gh<ApiRepo[]>(
      `/users/${USER}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
    );
    collected.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  for (const repo of collected) {
    if (repo.fork) {
      const own = await includeFork(repo.name);
      if (!own) {
        console.log(`skip fork without own commits: ${repo.name}`);
        continue;
      }
    }
    const languages = await gh<Record<string, number>>(`/repos/${USER}/${repo.name}/languages`);
    const readme = await readmeText(repo.name, repo.default_branch || "main");
    repos.push({
      name: repo.name,
      description: repo.description,
      fork: repo.fork,
      language: repo.language,
      languages,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated: repo.updated_at,
      pushed: repo.pushed_at,
      homepage: repo.homepage,
      url: repo.html_url,
      defaultBranch: repo.default_branch,
      size: repo.size,
      readme,
    });
    console.log(`synced ${repo.name}`);
  }
  return repos;
}

function fromCache(file: string): RawRepo[] {
  const payload = JSON.parse(readFileSync(file, "utf8")) as {
    repos: Array<RawRepo & { readme?: string }>;
  };
  return payload.repos.map((repo) => ({
    name: repo.name,
    description: repo.description ?? null,
    fork: Boolean(repo.fork),
    language: repo.language ?? null,
    languages: repo.languages ?? {},
    topics: repo.topics ?? [],
    stars: repo.stars ?? 0,
    forks: repo.forks ?? 0,
    updated: repo.updated,
    pushed: repo.pushed ?? repo.updated,
    homepage: repo.homepage ?? null,
    url: repo.url,
    defaultBranch: repo.defaultBranch,
    size: repo.size ?? 0,
    readme: repo.readme ?? "",
  }));
}

function writeProjects(raw: RawRepo[]) {
  const projects = raw.map(normalize).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.rank !== b.rank) return (a.rank ?? 99) - (b.rank ?? 99);
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  const featured = projects.filter((project) => project.featured).length;
  if (featured !== 6) {
    console.warn(`Expected 6 featured repos, found ${featured}.`);
  }
  writeFileSync(OUT, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(`Wrote ${projects.length} repos to ${OUT}`);
}

async function main() {
  const offlineIndex = process.argv.indexOf("--offline");
  try {
    if (offlineIndex !== -1) {
      const file = process.argv[offlineIndex + 1];
      if (!file) throw new Error("--offline needs a cache JSON path");
      writeProjects(fromCache(file));
      return;
    }
    writeProjects(await fromApi());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`GitHub sync failed: ${message}`);
    if (existsSync(OUT)) {
      console.error("Keeping the committed projects.generated.json.");
      process.exitCode = 0;
      return;
    }
    console.error("No fallback JSON exists yet.");
    process.exitCode = 1;
  }
}

void main();
