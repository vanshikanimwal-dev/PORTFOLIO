import type { IconType } from "react-icons";
import { VscVscode } from "react-icons/vsc";
import {
  SiAndroidstudio,
  SiBlender,
  SiCplusplus,
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPostman,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSharp,
  SiSolidity,
  SiSpringboot,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiVite,
} from "react-icons/si";

const ICONS: Record<string, IconType> = {
  Java: SiOpenjdk,
  "C#": SiSharp,
  Dart: SiDart,
  Python: SiPython,
  "C++": SiCplusplus,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Solidity: SiSolidity,
  Flutter: SiFlutter,
  React: SiReact,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  "Spring Boot": SiSpringboot,
  "Node.js": SiNodedotjs,
  FastAPI: SiFastapi,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  Firebase: SiFirebase,
  SQLite: SiSqlite,
  Git: SiGit,
  Docker: SiDocker,
  Postman: SiPostman,
  "Android Studio": SiAndroidstudio,
  "IntelliJ IDEA": SiIntellijidea,
  "VS Code": VscVscode,
  Vite: SiVite,
  Figma: SiFigma,
  Unity: SiUnity,
  Blender: SiBlender,
  Streamlit: SiStreamlit,
};

export function SkillIcon({ name }: { name: string }) {
  const Icon = ICONS[name];
  if (!Icon) {
    return (
      <span aria-hidden="true" className="font-pixel text-3xl text-pink">
        ✦
      </span>
    );
  }
  return <Icon aria-hidden="true" />;
}
