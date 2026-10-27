import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HudPanel({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("hud-panel p-5", className)}>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      <header className="mb-3 flex items-center justify-between gap-3 font-pixel text-hot">
        <span>{title}</span>
        {status ? <span className="text-muted">{status}</span> : null}
      </header>
      {children}
    </section>
  );
}
