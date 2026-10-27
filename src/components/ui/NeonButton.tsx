import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "solid" | "ghost";
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NeonButton({ href, variant = "solid", children, className, ...rest }: Props) {
  const classes = cn("neon-btn", variant === "ghost" && "neon-btn-ghost", className);
  if (!href) {
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  }
  if (href.startsWith("http") || href.endsWith(".pdf")) {
    const external = href.startsWith("http");
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : { download: true })}
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
