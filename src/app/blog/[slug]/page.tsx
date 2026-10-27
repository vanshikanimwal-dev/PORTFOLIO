import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/PostBody";
import { getAllPosts, getNeighbors, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Entry missing" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { newer, older } = getNeighbors(slug);

  return (
    <article className="section mx-auto max-w-3xl">
      <p className="kicker">
        [{post.date}
        {" // "}
        {post.mood}] · {post.readingTime} min
      </p>
      <h1 className="font-display text-5xl md:text-6xl">{post.title}</h1>
      {post.placeholder ? (
        <p className="mt-3 text-hot">PLACEHOLDER — edit content/blog/{post.slug}.mdx before treating this as a published post.</p>
      ) : null}
      <div className="mt-6 grid gap-6 lg:grid-cols-[180px_1fr]">
        <aside>
          <p className="font-pixel text-hot">INDEX</p>
          <ul className="mt-2 space-y-1 text-sm">
            {post.headings.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </aside>
        <PostBody source={post.content} />
      </div>
      <nav className="mt-8 flex justify-between gap-4 text-hot" aria-label="Adjacent entries">
        {older ? <Link href={`/blog/${older.slug}`}>← {older.title}</Link> : <span />}
        {newer ? <Link href={`/blog/${newer.slug}`}>{newer.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
