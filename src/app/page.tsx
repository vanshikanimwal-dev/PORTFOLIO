import fs from "fs";
import path from "path";
import { HomeView } from "@/components/dashboard/HomeView";

export default function HomePage() {
  const showHeroPhoto = fs.existsSync(path.join(process.cwd(), "public", "images", "hero.png"));
  return <HomeView showHeroPhoto={showHeroPhoto} />;
}
