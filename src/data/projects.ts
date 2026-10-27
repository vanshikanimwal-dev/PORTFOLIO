import raw from "./projects.generated.json";
import type { Project } from "./types";

export const projects = raw as Project[];

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))).sort((a, b) =>
    a.localeCompare(b),
  ),
];

export function topLanguages(limit = 8) {
  const counts = new Map<string, number>();
  for (const project of projects) {
    const seen = new Set<string>();
    for (const language of project.languages) {
      if (seen.has(language.name)) continue;
      seen.add(language.name);
      counts.set(language.name, (counts.get(language.name) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}
