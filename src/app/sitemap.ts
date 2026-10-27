import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const posts = getAllPosts().map((post) => ({
    url: `${site}/blog/${post.slug}`,
    lastModified: post.date,
  }));
  return [
    { url: site, lastModified: new Date() },
    { url: `${site}/blog`, lastModified: posts[0]?.lastModified ?? new Date() },
    ...posts,
  ];
}
