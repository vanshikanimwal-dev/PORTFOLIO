"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";
import { PixelAvatar } from "@/components/pixel/sprites";

export function LoadingScreen() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  if (!visible) return null;

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <PixelAvatar className="run" title="Running pixel avatar" />
      <p>LOADING... ▓▓▓▓░░</p>
      <button type="button" onClick={() => setVisible(false)}>
        Skip
      </button>
    </div>
  );
}
