"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useGame } from "@/components/game/GameContext";
import { CatButton } from "@/components/pixel/PixelActions";
import { PixelAvatar, PixelCloud, PixelLamp, PixelStar, PixelTree } from "@/components/pixel/sprites";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";
import { Section } from "@/components/ui/Section";

const ROLES = [profile.headline, ...profile.experience.map((item) => item.role)];

type Art = { avatar: string | null; cat: string | null; tree: string | null; lamp: string | null };

export function Hero({ art }: { art: Art }) {
  const reduced = usePrefersReducedMotion();
  const { play } = useGame();
  const [role, setRole] = useState(0);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setRole((value) => (value + 1) % ROLES.length), 1800);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    let last = window.scrollY;
    let timer = 0;
    const onScroll = () => {
      const hero = document.getElementById("home");
      const rect = hero?.getBoundingClientRect();
      const inside = rect ? rect.bottom > 0 && rect.top < window.innerHeight : false;
      const moving = Math.abs(window.scrollY - last) > 2 && inside;
      last = window.scrollY;
      if (!moving) return;
      setWalking(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setWalking(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <Section id="home" level="HOME" title="Vanshika Nimwal" footer={<Facts />}>
      <div className="sky" aria-hidden="true">
        <PixelCloud className="cloud cloud-a drift" />
        <PixelCloud className="cloud cloud-b drift" />
        <PixelStar className="star star-a twinkle" />
        <PixelStar className="star star-b twinkle" />
        <PixelStar className="star star-c twinkle" />
      </div>
      <div className="screen-frame">
        <p className="role-line">{ROLES[role]}</p>
        <button type="button" className="start-btn" onClick={start}>
          START
        </button>
        <p className="hero-hint">Press Enter</p>
      </div>
      <div className="hero-scene">
        {art.lamp ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="prop lamp" src={art.lamp} alt="" />
        ) : (
          <PixelLamp className="prop lamp" />
        )}
        {art.avatar ? (
          <span className={walking ? "avatar-sheet is-walking" : "avatar-sheet"} role="img" aria-label="Pixel portrait of Vanshika" />
        ) : (
          <PixelAvatar className={walking ? "prop avatar is-walking" : "prop avatar bob"} title="Pixel portrait of Vanshika" />
        )}
        {art.cat ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="prop" src={art.cat} alt="Pixel cat" />
        ) : (
          <CatButton />
        )}
        {art.tree ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="prop tree" src={art.tree} alt="" />
        ) : (
          <PixelTree className="prop tree" />
        )}
      </div>
    </Section>
  );
}

function Facts() {
  return (
    <ul className="quick-facts">
      <li>{profile.headline}</li>
      <li>{profile.location}</li>
      <li>Flutter · Java · Spring Boot · Unity</li>
      <li>PROJECTS: {projects.length}</li>
      <li>
        <a href="/resume.pdf">RESUME</a>
      </li>
      <li>
        <a href={profile.links.github}>GITHUB</a>
      </li>
      <li>
        <a href={profile.links.linkedin}>LINKEDIN</a>
      </li>
    </ul>
  );
}
