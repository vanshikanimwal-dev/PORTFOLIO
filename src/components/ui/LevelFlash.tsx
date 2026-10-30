"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

const LEVELS = [
  { id: "home", label: "LEVEL 00 START!" },
  { id: "level-01", label: "LEVEL 01 START!" },
  { id: "level-02", label: "LEVEL 02 START!" },
  { id: "level-03", label: "LEVEL 03 START!" },
  { id: "level-04", label: "LEVEL 04 START!" },
  { id: "level-05", label: "LEVEL 05 START!" },
];

export function LevelFlash() {
  const reduced = usePrefersReducedMotion();
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;
    const seen = new Set<string>();
    try {
      const raw = window.sessionStorage.getItem("level-flashes");
      if (raw) (JSON.parse(raw) as string[]).forEach((id) => seen.add(id));
    } catch {
      /* ignore */
    }
    const nodes = LEVELS.map((level) => document.getElementById(level.id)).filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target.id)) continue;
          seen.add(entry.target.id);
          try {
            window.sessionStorage.setItem("level-flashes", JSON.stringify([...seen]));
          } catch {
            /* ignore */
          }
          const label = LEVELS.find((level) => level.id === entry.target.id)?.label ?? "LEVEL START!";
          setBanner(label);
          window.setTimeout(() => setBanner(null), 1000);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reduced]);

  if (!banner) return null;
  return (
    <button type="button" className="level-flash" onClick={() => setBanner(null)}>
      {banner}
    </button>
  );
}
