"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";

export function BlogIndex({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [tag, setTag] = useState("All");
  const visible = useMemo(
    () => posts.filter((post) => tag === "All" || post.tags.includes(tag)),
    [posts, tag],
  );

  return (
    <div>
      <div className="pixel-tabs mb-4">
        <button type="button" aria-pressed={tag === "All"} onClick={() => setTag("All")}>
          All
        </button>
        {tags.map((item) => (
          <button key={item} type="button" aria-pressed={tag === item} onClick={() => setTag(item)}>
            {item}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {visible.map((post) => (
          <li key={post.slug} className="pixel-window window-body">
            <p className="text-sm text-muted">
              [{post.date}
              {" // "}
              {post.mood}] · {post.readingTime} min read
            </p>
            <h2 className="font-display text-4xl">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-muted">{post.excerpt}</p>
            <p className="mt-2 text-sm text-hot">{post.tags.join(" · ")}</p>
          </li>
        ))}
      </ul>
      {visible.length === 0 ? <p>No entries with that tag.</p> : null}
    </div>
  );
}
