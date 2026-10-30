import type { Metadata } from "next";
import { ProjectArchive } from "@/components/dashboard/ProjectArchive";

export const metadata: Metadata = {
  title: "Projects",
  description: "Public GitHub repositories by Vanshika Nimwal.",
};

export default function ProjectsPage() {
  return <ProjectArchive />;
}
