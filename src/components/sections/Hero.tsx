"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useGame } from "@/components/game/GameContext";
import { CatButton } from "@/components/pixel/PixelActions";
import { PixelAvatar, PixelCloud, PixelLamp, PixelStar, PixelTree } from "@/components/pixel/sprites";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { play } = useGame();
  const [nameCount, setNameCount] = useState(reduced ? profile.name.length : 0);
  const [role, setRole] = useState(0);
  const name = profile.name.toUpperCase();

  useEffect(() => {
    if (reduced || nameCount >= name.length) return;
    const timer = window.setTimeout(() => setNameCount((value) => value + 1), 70);
    return () => window.clearTimeout(timer);
  }, [nameCount, name.length, reduced]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setRole((value) => (value + 1) % profile.typewriter.length), 1800);
    return () => window.clearInterval(timer);
  }, [reduced]);

  function start() {
    play("coin");
    document.body.classList.add("screen-flash");
    window.setTimeout(() => document.body.classList.remove("screen-flash"), 160);
    document.getElementById("level-01")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLButtonElement) {
        return;
      }
      start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // start is recreated each render and only scrolls plus plays a sound.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <section id="home" className="level hero-level">
      <div className="sky" aria-hidden="true">
        <PixelCloud className="cloud cloud-a drift" />
        <PixelCloud className="cloud cloud-b drift" />
        <PixelStar className="star star-a twinkle" />
        <PixelStar className="star star-b twinkle" />
        <PixelStar className="star star-c twinkle" />
      </div>
      <div className="screen-frame">
        <p className="year">2026</p>
        <h1>PORTFOLIO</h1>
        <p className="player-name" aria-label={profile.name}>
          {reduced ? name : name.slice(0, nameCount)}
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="role-line">{profile.typewriter[role]}</p>
        <button type="button" className="start-btn" onClick={start}>
          START
        </button>
      </div>
      <div className="hero-scene">
        <PixelLamp className="prop lamp" />
        <PixelAvatar className="prop avatar bob" title="Pixel portrait of Vanshika" />
        <CatButton />
        <PixelTree className="prop tree" />
      </div>
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
