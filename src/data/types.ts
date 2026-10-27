export type ExperienceKind = "internship" | "employment" | "freelance";

export type Experience = {
  role: string;
  org: string;
  kind: ExperienceKind;
  display: string;
  start: string | null;
  end: string | null;
  points: string[];
};

export type ResumeProject = {
  name: string;
  stack: string[];
  repo: string;
  live: string | null;
  points: string[];
};

export type ProjectLanguage = {
  name: string;
  bytes: number;
};

export type Project = {
  name: string;
  description: string;
  readmeSummary: string;
  category: string;
  featured: boolean;
  rank: number | null;
  primaryLanguage: string | null;
  languages: ProjectLanguage[];
  stack: string[];
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  homepage: string | null;
  url: string;
  defaultBranch: string;
  image: string | null;
  empty: boolean;
  curated: boolean;
};

export type CurationEntry = {
  category: string;
  featured?: boolean;
  rank?: number;
  description: string;
  stack?: string[];
};
