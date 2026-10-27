"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { CircuitDivider } from "@/components/ui/CircuitDivider";
import { HoloCard } from "@/components/ui/HoloCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

const STATS = [
  { value: profile.github.publicRepos, label: "Public repositories" },
  { value: profile.github.followers, label: "GitHub followers" },
  { value: profile.certifications.length, label: "Certifications" },
  { value: profile.experience.filter((item) => item.kind === "internship").length, label: "Dated internships" },
];

function Counter({ value, label }: { value: number; label: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(value);
      return;
    }
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        setCurrent(Math.round(value * progress));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
      observer.disconnect();
    });
    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduced, value]);

  return (
    <div ref={ref} className="hud-panel px-4 py-3 text-center">
      <p className="font-display text-4xl text-pink">{current}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

function TerminalBio() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? profile.tagline.length : 0);
  const rest = profile.summary.slice(profile.tagline.length).trim();

  useEffect(() => {
    if (reduced || count >= profile.tagline.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 14);
    return () => window.clearTimeout(timer);
  }, [count, reduced]);

  const typed = reduced ? profile.tagline : profile.tagline.slice(0, count);
  const done = typed.length === profile.tagline.length;

  return (
    <div className="terminal text-left">
      <p className="text-cyan">&gt; whoami</p>
      <p>vanshika@greater-noida</p>
      <p className="mt-3 text-cyan">&gt; cat about.txt</p>
      <p>
        {typed}
        {done ? null : <span className="caret" aria-hidden="true"> </span>}
      </p>
      {done ? <p className="mt-2 text-muted">{rest}</p> : null}
    </div>
  );
}

export function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="section">
      <SectionHeading kicker="FILE // ABOUT" title="About Me" />
      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <HoloCard>
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border border-pink">
            {photoFailed ? (
              <div className="flex h-full items-center justify-center font-logo text-3xl text-pink">VN</div>
            ) : (
              <Image
                src={profile.github.avatar}
                alt="GitHub profile photo of Vanshika Nimwal. No portrait was included in the resume."
                fill
                sizes="192px"
                className="object-cover"
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>
          <h3 className="mt-4 text-center font-display text-3xl">{profile.name}</h3>
          <p className="text-center text-hot">{profile.headline}</p>
          <p className="text-center text-muted">{profile.location}</p>
          <p className="mt-3 text-center font-pixel text-xl text-pink">B.TECH IN PROGRESS</p>
          <p className="text-center text-sm text-muted">
            Availability is not listed on the resume. GitHub bio: {profile.github.bio}
          </p>
        </HoloCard>
        <TerminalBio />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Counter key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        Years of experience are not stated on the resume, so that counter is omitted. Dated internships run from May
        2025 to Mar 2026.
      </p>
      <CircuitDivider />
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-3xl">Education</h3>
          <div className="timeline">
            {profile.education.map((item) => (
              <article key={item.school}>
                <h4 className="font-display text-2xl">{item.school}</h4>
                <p>{item.credential}</p>
                <p className="text-muted">
                  {item.location} · {item.display}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-display text-3xl">Experience</h3>
          <div className="timeline">
            {profile.experience.map((item) => (
              <article key={`${item.org}-${item.role}`}>
                <h4 className="font-display text-2xl">
                  {item.role} · {item.org}
                </h4>
                <p className="text-hot">
                  {item.kind} · {item.display}
                </p>
                <ul className="mt-2 list-disc pl-5 text-muted">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-3 font-display text-3xl">Resume projects</h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {profile.resumeProjects.map((project) => (
            <article key={project.name} className="hud-panel p-4">
              <h4 className="font-display text-2xl">{project.name}</h4>
              <p className="text-sm text-muted">{project.stack.join(" · ")}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-3 flex gap-3">
                <a className="text-hot underline" href={project.repo}>
                  GitHub
                </a>
                {project.live ? (
                  <a className="text-hot underline" href={project.live}>
                    Live demo
                  </a>
                ) : (
                  <span className="text-muted">No live URL on the resume</span>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-3 font-display text-3xl">Certifications</h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {profile.certifications.map((item) => (
            <li key={item} className="chip justify-start px-3 py-2">
              ✦ {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">
          TODO: the resume heading says Certification and Achievements, but no separate achievements are listed.
          Hackathons are not named on the resume.
        </p>
      </div>
    </section>
  );
}
