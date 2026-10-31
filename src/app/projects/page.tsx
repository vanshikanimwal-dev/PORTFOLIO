import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { ProjectArchive } from "@/components/dashboard/ProjectArchive";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Public GitHub repositories by Vanshika Nimwal.",
};

function localImages() {
  const dir = path.join(process.cwd(), "public", "images", "projects");
  const found: Record<string, string> = {};
  if (!fs.existsSync(dir)) return found;
  const files = new Set(fs.readdirSync(dir));
  for (const project of projects) {
    const match = ["png", "jpg", "jpeg", "webp", "svg"].map((ext) => `${project.name}.${ext}`).find((file) => files.has(file));
    if (match) found[project.name] = `/images/projects/${match}`;
  }
  return found;
}

export default function ProjectsPage() {
  return <ProjectArchive images={localImages()} />;
}
