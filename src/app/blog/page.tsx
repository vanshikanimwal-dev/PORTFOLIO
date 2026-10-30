import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { profile } from "@/data/profile";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Diary",
  description: "Notes by Vanshika Nimwal.",
};

export default function BlogPage() {
  const posts = getAllPosts().filter((post) => !post.placeholder);
  if (posts.length === 0) {
    return (
      <section className="level">
        <div className="container">
          <p className="level-kicker">LEVEL 04</p>
          <h1 className="section-title">Diary</h1>
          <div className="section-grid">
            <PixelWindow title="JOURNAL" label="Diary" pinned>
              <div className="notebook" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>Quest journal loading...</p>
              <p className="blink-cursor" aria-hidden="true">
                _
              </p>
              <p>
                <a href={profile.links.github}>GitHub profile</a>
              </p>
            </PixelWindow>
          </div>
        </div>
      </section>
    );
  }

  const tags = getAllTags().map(([tag]) => tag);
  return (
    <section className="level">
      <div className="container">
        <p className="level-kicker">LEVEL 04</p>
        <h1 className="section-title">Diary</h1>
        <div className="section-grid">
          <BlogIndex posts={posts} tags={tags} />
        </div>
      </div>
    </section>
  );
}
