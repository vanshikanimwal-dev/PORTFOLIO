import { About } from "@/components/sections/About";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Marquee } from "@/components/ui/Marquee";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <Hero />
      <Marquee text="About Me" />
      <About />
      <Marquee text="Missions" />
      <Projects />
      <Marquee text="Inventory" />
      <Skills />
      <Marquee text="Diary" />
      <BlogPreview posts={posts} />
      <Marquee text="Final Boss" />
      <Contact />
    </>
  );
}
