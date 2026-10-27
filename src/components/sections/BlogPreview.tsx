import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="blog" className="section">
      <SectionHeading kicker="DIARY.LOG" title="Digital Diary" />
      <div className="hud-panel p-5">
        <p className="font-pixel text-xl text-hot">DIARY.LOG · ENCRYPTED</p>
        <ul className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[#ff2e9a55] pb-4">
              <p className="text-sm text-muted">
                [{post.date}
                {" // "}
                {post.mood}] · {post.readingTime} min
              </p>
              <h3 className="font-display text-3xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-muted">{post.excerpt}</p>
              {post.placeholder ? <p className="text-sm text-hot">PLACEHOLDER · edit this entry</p> : null}
            </li>
          ))}
        </ul>
        <Link href="/blog" className="neon-btn mt-4 inline-flex">
          Open the diary
        </Link>
      </div>
    </section>
  );
}
