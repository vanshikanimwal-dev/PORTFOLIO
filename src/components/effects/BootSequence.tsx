"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

const LINES = [
  "> initializing portfolio.exe ... OK",
  "> loading profile: Vanshika Nimwal ... OK",
  `> syncing public repos: ${profile.github.publicRepos} ... OK`,
  "> mounting neon interface ... OK",
];

export function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    try {
      if (sessionStorage.getItem("vn-booted") === "1") {
        setVisible(false);
        return;
      }
    } catch {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => finish(), 1500);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduced]);

  function finish() {
    try {
      sessionStorage.setItem("vn-booted", "1");
    } catch {
      /* private mode */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="boot" role="dialog" aria-label="Portfolio boot sequence">
      <div className="mb-6 space-y-1 font-mono text-lg text-ink">
        {LINES.map((line, index) => (
          <p key={line} style={{ animationDelay: `${index * 0.22}s` }}>
            {line}
          </p>
        ))}
      </div>
      <button type="button" className="neon-btn-ghost neon-btn w-fit" onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
