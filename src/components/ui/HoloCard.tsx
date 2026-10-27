"use client";

import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export function HoloCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn("holo-card p-5", className)}
      onMouseMove={(event) => {
        if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        event.currentTarget.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
    >
      <span className="shimmer" aria-hidden="true" />
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
      {children}
    </div>
  );
}
