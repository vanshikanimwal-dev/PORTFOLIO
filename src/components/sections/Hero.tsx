"use client";

import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { profile } from "@/data/profile";
import { NeonCity } from "@/components/svg/NeonCity";
import { RoboticArm } from "@/components/svg/RoboticArm";
import { GlitchText } from "@/components/ui/GlitchText";
import { NeonButton } from "@/components/ui/NeonButton";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

const SOCIALS = [
  { href: profile.links.github, label: "GitHub", icon: SiGithub },
  { href: profile.links.linkedin, label: "LinkedIn", icon: LuLinkedin },
  { href: profile.links.leetcode, label: "LeetCode", icon: SiLeetcode },
  { href: `mailto:${profile.email}`, label: "Email", icon: FiMail },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [cpu, setCpu] = useState(27);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setCpu(20 + Math.round(Math.random() * 40));
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section
      id="home"
      className="hero"
      onMouseMove={(event) => {
        if (reduced) return;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        event.currentTarget.style.setProperty("--arm-x", x.toFixed(3));
        event.currentTarget.style.setProperty("--arm-y", y.toFixed(3));
      }}
    >
      <div className="hero-floor" aria-hidden="true" />
      <NeonCity />
      <RoboticArm side="left" />
      <RoboticArm side="right" />
      <div className="hud-readout left-5 top-28 hidden md:block" aria-hidden="true">
        <p>SYS.ONLINE</p>
        <p>NODE_07</p>
        <p>SIM.CPU {cpu}%</p>
      </div>
      <div className="hud-readout right-5 top-28 hidden text-right md:block" aria-hidden="true">
        <p>LOC GREATER NOIDA</p>
        <p>SIM.PING 24ms</p>
        <p>♡ ✦ ♡</p>
      </div>
      <div className="hero-copy">
        <p className="kicker">SYS.ONLINE ✦ GREATER NOIDA</p>
        <GlitchText as="h1" text={profile.name} className="hero-title" />
        <TypewriterText words={profile.typewriter} />
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{profile.tagline}</p>
        <p className="mt-3 font-pixel text-hot">
          {profile.github.publicRepos} public repos · {profile.github.followers} followers
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <NeonButton href="/#projects">View Projects</NeonButton>
          <NeonButton href="/resume.pdf" variant="ghost">
            Download Resume
          </NeonButton>
        </div>
        <ul className="mt-6 flex justify-center gap-3">
          {SOCIALS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-label={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink text-hot shadow-neon"
              >
                <item.icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <a href="#about" className="absolute bottom-6 left-1/2 z-[4] -translate-x-1/2 font-pixel text-xl text-hot">
        scroll ✦
      </a>
    </section>
  );
}
