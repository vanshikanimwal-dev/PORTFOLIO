"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

export function PixelCursor() {
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);
  const [hand, setHand] = useState(false);
  const [point, setPoint] = useState({ x: -40, y: -40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) {
      document.documentElement.classList.remove("has-pixel-cursor");
      setOn(false);
      return;
    }
    setOn(true);
    document.documentElement.classList.add("has-pixel-cursor");
    const move = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
      const target = event.target instanceof Element ? event.target : null;
      setHand(Boolean(target?.closest("a, button, input, textarea, select, summary")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-pixel-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);

  if (!on) return null;

  return <div className={hand ? "pixel-cursor is-hand" : "pixel-cursor"} style={{ left: point.x, top: point.y }} aria-hidden="true" />;
}
