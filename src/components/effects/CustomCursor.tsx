"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [point, setPoint] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) {
      document.documentElement.classList.remove("has-cursor");
      setEnabled(false);
      return;
    }
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const onMove = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
      const target = event.target instanceof Element ? event.target : null;
      setHot(Boolean(target?.closest("a, button, input, textarea, summary, [role='button']")));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        className={hot ? "cursor-ring is-hot" : "cursor-ring"}
        style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
        aria-hidden="true"
      />
      <div
        className="cursor-dot"
        style={{ transform: `translate3d(${point.x}px, ${point.y}px, 0)` }}
        aria-hidden="true"
      />
    </>
  );
}
