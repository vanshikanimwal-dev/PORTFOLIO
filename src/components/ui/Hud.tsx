"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/components/game/GameContext";
import { PixelCloud, PixelHeart } from "@/components/pixel/sprites";

const LINKS = [
  { href: "#level-01", label: "L1", name: "About" },
  { href: "#level-02", label: "L2", name: "Missions" },
  { href: "#level-03", label: "L3", name: "Inventory" },
  { href: "#level-04", label: "L4", name: "Diary" },
  { href: "#level-05", label: "L5", name: "Contact" },
];

export function Hud() {
  const { sound, toggleSound, coins, play } = useGame();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="hud">
      <div className="hud-xp">
        <p>XP: DEV LEVEL 03</p>
        <div className="xp-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Page progress">
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <PixelCloud className="hud-cloud drift" />
      <nav className="hud-nav" aria-label="Levels">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} aria-label={link.name} onClick={() => play("click")}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="hud-player">
        <p>PLAYER 02</p>
        <div className="hearts" aria-hidden="true">
          <PixelHeart />
          <PixelHeart />
          <PixelHeart />
        </div>
        <p className="coins">COINS: {String(coins).padStart(3, "0")}</p>
        <button
          type="button"
          className="sound-toggle"
          aria-pressed={sound}
          aria-label={sound ? "Mute sound" : "Unmute sound"}
          onClick={toggleSound}
        >
          {sound ? "SND ON" : "SND OFF"}
        </button>
      </div>
    </header>
  );
}
