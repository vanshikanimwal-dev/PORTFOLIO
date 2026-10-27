import { About } from "@/components/sections/About";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <BlogPreview posts={posts} />
      <Contact />
    </>
  );
}
