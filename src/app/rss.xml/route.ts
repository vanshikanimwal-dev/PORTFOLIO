import { getAllPosts } from "@/lib/blog";
import { escapeXml, getSiteUrl } from "@/lib/utils";
import { profile } from "@/data/profile";

export function GET() {
  const site = getSiteUrl();
  const posts = getAllPosts();
  const items = posts
    .map(
      (post) => `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${site}/blog/${post.slug}</link>
        <guid>${site}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${escapeXml(post.excerpt)}</description>
      </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(profile.name)} — Diary</title>
      <link>${site}</link>
      <description>${escapeXml(profile.tagline)}</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
