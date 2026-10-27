import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ComponentProps } from "react";
import { childrenToText, slugify } from "@/lib/utils";

function heading(level: 2 | 3) {
  const Tag = level === 2 ? "h2" : "h3";
  return function Heading(props: ComponentProps<"h2">) {
    const id = slugify(childrenToText(props.children));
    return <Tag id={id}>{props.children}</Tag>;
  };
}

export function PostBody({ source }: { source: string }) {
  return (
    <div className="diary">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, { theme: "github-dark", keepBackground: false }]],
          },
        }}
        components={{
          h2: heading(2),
          h3: heading(3),
        }}
      />
    </div>
  );
}
