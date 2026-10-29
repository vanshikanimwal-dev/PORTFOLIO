import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Digital Diary",
  description: "Placeholder diary entries based on Vanshika Nimwal's public projects. Edit the MDX files to replace them.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags().map(([tag]) => tag);

  return (
    <section className="level">
      <p className="level-kicker">Level 04</p>
      <h1>Diary</h1>
      <p className="fine">
        These three entries are placeholders written from public README notes. Replace them by editing the files in
        content/blog.
      </p>
      <div className="mt-6">
        <BlogIndex posts={posts} tags={tags} />
      </div>
    </section>
  );
}
