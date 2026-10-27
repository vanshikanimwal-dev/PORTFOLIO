"use client";

import { useHyper } from "@/components/effects/HyperContext";

export function Footer() {
  const { hyper } = useHyper();
  return (
    <footer className="relative z-[3] flex flex-wrap items-center justify-between gap-3 border-t border-[#ff2e9a66] px-[4vw] py-6 text-sm text-muted">
      <p>© {new Date().getFullYear()} Vanshika Nimwal. built with 💗 + caffeine</p>
      <p>{hyper ? "HYPER NEON ✦" : "SYS.IDLE"}</p>
      <a href="#home" className="neon-btn neon-btn-ghost">
        Back to top
      </a>
      <p className="sr-only">Easter egg: the Konami code toggles hyper neon mode.</p>
    </footer>
  );
}
