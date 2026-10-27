"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

export function TypewriterText({ words }: { words: readonly string[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index] ?? "";

  useEffect(() => {
    if (reduced) return;
    const done = count === word.length;
    const empty = count === 0;
    const delay = deleting ? 40 : done ? 1400 : 70;
    const timer = window.setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
        return;
      }
      if (deleting && empty) {
        setDeleting(false);
        setIndex((value) => (value + 1) % words.length);
        return;
      }
      setCount((value) => value + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [count, deleting, reduced, word.length, words.length]);

  const shown = reduced ? words[0] : word.slice(0, count);

  return (
    <p className="mt-3 font-display text-2xl text-hot md:text-3xl" aria-live="polite">
      {shown}
      <span className="caret" aria-hidden="true">
        {" "}
      </span>
    </p>
  );
}
