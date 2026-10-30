import { projects } from "./projects";

export const skillCategories = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "Tools",
  "XR",
  "AI/Data",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export type Skill = {
  name: string;
  category: SkillCategory;
  resume: boolean;
  languages: string[];
  stack: string[];
  /** When set, the tooltip uses this count instead of a repo scan. */
  fixedCount?: number;
  fixedNote?: string;
};

export const skills: Skill[] = [
  { name: "Java", category: "Languages", resume: true, languages: ["Java"], stack: ["Java"] },
  { name: "C#", category: "Languages", resume: true, languages: ["C#"], stack: ["C#"] },
  { name: "Dart", category: "Languages", resume: true, languages: ["Dart"], stack: ["Dart"] },
  { name: "Python", category: "Languages", resume: true, languages: ["Python"], stack: ["Python"] },
  { name: "C++", category: "Languages", resume: true, languages: ["C++"], stack: ["C++"] },
  {
    name: "JavaScript",
    category: "Languages",
    resume: true,
    languages: ["JavaScript"],
    stack: ["JavaScript"],
  },
  {
    name: "TypeScript",
    category: "Languages",
    resume: false,
    languages: ["TypeScript"],
    stack: ["TypeScript"],
  },
  {
    name: "Solidity",
    category: "Languages",
    resume: false,
    languages: ["Solidity"],
    stack: ["Solidity"],
  },
  { name: "Flutter", category: "Frontend", resume: true, languages: [], stack: ["Flutter"] },
  { name: "React", category: "Frontend", resume: false, languages: [], stack: ["React"] },
  { name: "HTML", category: "Frontend", resume: true, languages: ["HTML"], stack: ["HTML"] },
  { name: "CSS", category: "Frontend", resume: true, languages: ["CSS"], stack: ["CSS"] },
  { name: "JavaFX", category: "Frontend", resume: true, languages: [], stack: ["JavaFX"] },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    resume: false,
    languages: [],
    stack: ["Tailwind CSS"],
  },
  {
    name: "Spring Boot",
    category: "Backend",
    resume: true,
    languages: [],
    stack: ["Spring Boot"],
  },
  { name: "Node.js", category: "Backend", resume: false, languages: [], stack: ["Node.js"] },
  { name: "FastAPI", category: "Backend", resume: false, languages: [], stack: ["FastAPI"] },
  { name: "Express", category: "Backend", resume: false, languages: [], stack: ["Express"] },
  {
    name: "PostgreSQL",
    category: "Databases",
    resume: true,
    languages: ["PLpgSQL"],
    stack: ["PostgreSQL"],
  },
  { name: "MySQL", category: "Databases", resume: true, languages: [], stack: ["MySQL"] },
  { name: "Redis", category: "Databases", resume: true, languages: [], stack: ["Redis"] },
  { name: "Firebase", category: "Databases", resume: true, languages: [], stack: ["Firebase"] },
  { name: "SQLite", category: "Databases", resume: false, languages: [], stack: ["SQLite"] },
  {
    name: "Git",
    category: "Tools",
    resume: true,
    languages: [],
    stack: [],
    fixedCount: projects.length,
    fixedNote: "Every public repository is a Git repo",
  },
  { name: "Docker", category: "Tools", resume: true, languages: ["Dockerfile"], stack: ["Docker"] },
  { name: "Postman", category: "Tools", resume: true, languages: [], stack: [] },
  { name: "Android Studio", category: "Tools", resume: true, languages: [], stack: [] },
  { name: "IntelliJ IDEA", category: "Tools", resume: true, languages: [], stack: [] },
  { name: "VS Code", category: "Tools", resume: true, languages: [], stack: [] },
  { name: "Vite", category: "Tools", resume: false, languages: [], stack: ["Vite"] },
  { name: "Figma", category: "Tools", resume: true, languages: [], stack: [] },
  { name: "Unity", category: "XR", resume: true, languages: [], stack: ["Unity"] },
  { name: "AR Foundation", category: "XR", resume: true, languages: [], stack: ["AR Foundation"] },
  { name: "Vuforia", category: "XR", resume: true, languages: [], stack: [] },
  { name: "Blender", category: "XR", resume: true, languages: [], stack: ["Blender"] },
  { name: "Streamlit", category: "AI/Data", resume: false, languages: [], stack: ["Streamlit"] },
];

export function skillUsage(skill: Skill) {
  if (typeof skill.fixedCount === "number") return skill.fixedCount;
  if (skill.languages.length === 0 && skill.stack.length === 0) return 0;
  return projects.filter((project) => {
    const byLanguage = project.languages.some((language) => skill.languages.includes(language.name));
    const byStack = project.stack.some((item) => skill.stack.includes(item));
    return byLanguage || byStack;
  }).length;
}

export function skillTooltip(skill: Skill) {
  const count = skillUsage(skill);
  const noun = count === 1 ? "repo" : "repos";
  if (count > 0) return `${skill.name}: used in ${count} ${noun}`;
  if (skill.resume) return `${skill.name}: listed on the resume`;
  return `${skill.name}: no synced repo was tagged with it`;
}

export const foundations = [
  "Object-oriented programming",
  "Data structures and algorithms",
  "REST API integration",
  "JSON handling",
  "API testing",
  "Idempotency and concurrency control",
  "Multithreading basics",
  "Material UI and Cupertino widgets",
] as const;
