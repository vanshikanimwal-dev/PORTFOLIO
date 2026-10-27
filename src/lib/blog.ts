import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./utils";

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  mood: string;
  placeholder: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
  headings: { id: string; text: string; level: number }[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function headings(content: string) {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const text = match[2].replace(/[#*`]/g, "").trim();
      return { id: slugify(text), text, level: match[1].length };
    })
    .filter((item): item is { id: string; text: string; level: number } => Boolean(item));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingTime: readingTime(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content),
    content,
    headings: headings(content),
  };
}

export function getNeighbors(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAllTags() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}
