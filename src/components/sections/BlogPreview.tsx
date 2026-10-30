import Link from "next/link";
import { profile } from "@/data/profile";
import type { PostMeta } from "@/lib/blog";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Section } from "@/components/ui/Section";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  const published = posts.filter((post) => !post.placeholder);
  return (
    <Section id="level-04" level="LEVEL 04" title="Diary" subtitle="Project notes">
      {published.length === 0 ? (
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
      ) : (
        <div className="diary-grid">
          {published.map((post) => (
            <PixelWindow key={post.slug} title="SAVE.FILE" label={post.date} pinned>
              <p>
                {post.mood} · {post.readingTime} min
              </p>
              <h3>{post.title}</h3>
              <p className="clamp-2">{post.excerpt}</p>
              <p>{post.tags.join(" · ")}</p>
              <p>
                <Link href={`/blog/${post.slug}`}>READ</Link>
              </p>
            </PixelWindow>
          ))}
        </div>
      )}
    </Section>
  );
}
