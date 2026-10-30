"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/components/game/GameContext";
import { PixelCoin } from "@/components/pixel/sprites";

const LINKS = [
  { href: "#home", id: "home", label: "HOME", icon: "H" },
  { href: "#level-01", id: "level-01", label: "ABOUT", icon: "A" },
  { href: "#level-02", id: "level-02", label: "MISSIONS", icon: "M" },
  { href: "#level-03", id: "level-03", label: "INVENTORY", icon: "I" },
  { href: "#level-04", id: "level-04", label: "DIARY", icon: "D" },
  { href: "#level-05", id: "level-05", label: "CONTACT", icon: "C" },
];

export function Hud() {
  const { sound, toggleSound, coins, popping, play, recruiter, toggleRecruiter, unlock } = useGame();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const seen = useState(() => new Set<string>())[0];

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) ratios.set(entry.target.id, entry.intersectionRatio);
          else ratios.delete(entry.target.id);
        }
        if (ratios.size === 0) return;
        if (ratios.size === 1 && ratios.has("home")) {
          setActive("home");
          return;
        }
        let best = "";
        let score = -1;
        ratios.forEach((ratio, id) => {
          if (id === "home") return;
          if (ratio >= score) {
            score = ratio;
            best = id;
          }
        });
        if (!best && ratios.has("home")) best = "home";
        if (best) setActive(best);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 1] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    seen.add(active);
    if (seen.size >= LINKS.length) unlock("all-levels", "All levels");
  }, [active, seen, unlock]);

  const xpLevel = progress < 0.25 ? 3 : progress < 0.5 ? 4 : progress < 0.75 ? 5 : 6;

  return (
    <header className="hud">
      <div className="hud-xp">
        <p>XP: DEV LEVEL 0{xpLevel}</p>
        <div
          className="xp-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Page progress"
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <PixelCoin className="hud-mark" />
      <nav className="hud-nav" aria-label="Levels">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-current={active === link.id ? "page" : undefined}
            onClick={() => play("click")}
          >
            <span className="nav-icon" aria-hidden="true">
              {link.icon}
            </span>
            <span className="nav-label">{link.label}</span>
          </a>
        ))}
      </nav>
      <div className="hud-player">
        <p>PLAYER 02</p>
        <p className={popping ? "coins is-pop" : "coins"}>COINS: {String(coins).padStart(3, "0")}</p>
        <button type="button" className="sound-toggle recruiter-toggle" aria-pressed={recruiter} onClick={toggleRecruiter}>
          RECRUITER MODE {recruiter ? "ON" : "OFF"}
        </button>
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
