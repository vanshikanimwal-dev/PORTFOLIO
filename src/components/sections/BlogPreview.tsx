import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { PixelWindow } from "@/components/ui/PixelWindow";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="level-04" className="level">
      <p className="level-kicker">Level 04</p>
      <h2>Diary</h2>
      <p className="fine">Save files from project notes. Entries marked placeholder are not finished posts.</p>
      <div className="diary-grid">
        {posts.map((post) => (
          <PixelWindow key={post.slug} title="SAVE.FILE" label={post.date}>
            <p>
              {post.mood} · {post.readingTime} min
            </p>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.excerpt}</p>
            <p>{post.tags.join(" · ")}</p>
            {post.placeholder ? <p>PLACEHOLDER · edit this entry</p> : null}
          </PixelWindow>
        ))}
      </div>
      <p>
        <Link className="start-btn" href="/blog">
          Open the journal
        </Link>
      </p>
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
