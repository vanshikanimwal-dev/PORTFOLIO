import type { SimpleIcon } from "simple-icons";
import {
  siAndroidstudio,
  siBlender,
  siCplusplus,
  siCss,
  siDart,
  siDocker,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siHtml5,
  siIntellijidea,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRedis,
  siSharp,
  siSolidity,
  siSpringboot,
  siSqlite,
  siStreamlit,
  siTailwindcss,
  siTypescript,
  siUnity,
  siVite,
  siJavascript,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Python: siPython,
  "C#": siSharp,
  "C++": siCplusplus,
  Dart: siDart,
  Solidity: siSolidity,
  Flutter: siFlutter,
  React: siReact,
  HTML: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  "Spring Boot": siSpringboot,
  "Node.js": siNodedotjs,
  FastAPI: siFastapi,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Redis: siRedis,
  Firebase: siFirebase,
  SQLite: siSqlite,
  Git: siGit,
  Docker: siDocker,
  Postman: siPostman,
  "Android Studio": siAndroidstudio,
  "IntelliJ IDEA": siIntellijidea,
  Vite: siVite,
  Figma: siFigma,
  Unity: siUnity,
  Blender: siBlender,
  Streamlit: siStreamlit,
};

function glyph(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return Array.from({ length: 25 }, (_, index) => ((hash >> (index % 16)) & 1 ? "1" : "0"));
}

export function SkillMark({ name, size = 16 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (icon) {
    return (
      <svg className="skill-icon" viewBox="0 0 24 24" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true" style={{ width: size, height: size }}>
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }
  const cells = glyph(name);
  return (
    <svg className="skill-icon" viewBox="0 0 5 5" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true" style={{ width: size, height: size }}>
      {cells.map((cell, index) =>
        cell === "1" ? <rect key={index} x={index % 5} y={Math.floor(index / 5)} width="1" height="1" fill="currentColor" /> : null,
      )}
    </svg>
  );
}
