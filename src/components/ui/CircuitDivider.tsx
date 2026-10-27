"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CircuitDivider() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 800 48" className="mx-auto my-2 block h-10 w-full max-w-5xl" aria-hidden="true">
      <motion.path
        d="M10 24 H220 L250 8 H420 L450 36 H780"
        fill="none"
        stroke="#FF2E9A"
        strokeWidth="1.5"
        initial={reduced ? false : { pathLength: 0, opacity: 0.3 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 6px #FF2E9A)" }}
      />
      <circle cx="250" cy="8" r="3.5" fill="#00F0FF" />
      <circle cx="450" cy="36" r="3.5" fill="#B26BFF" />
    </svg>
  );
}
