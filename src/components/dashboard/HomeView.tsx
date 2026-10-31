"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Camera,
  Code2,
  FileText,
  Folder,
  Gamepad2,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Music,
  Palette,
  Plane,
  Settings,
  Shield,
  Target,
  View,
} from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ProjectCover } from "@/components/dashboard/ProjectCover";
import { SkillMark } from "@/components/skills/SkillMark";
import { Astronaut, GradCap, NextSign, PixelCat, Spark } from "@/components/pixel/Art";

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ? `reveal ${className}` : "reveal"}>{children}</div>;
}

function repoUrl(name: string | null) {
  if (!name) return null;
  return projects.find((project) => project.name === name)?.url ?? null;
}

const JOB_ICONS = [GraduationCap, View, GraduationCap, Settings, Code2] as const;
const INTEREST_ICONS = [Gamepad2, Plane, Music, Camera, BookOpen, Palette];

export function HomeView({ showHeroPhoto }: { showHeroPhoto: boolean }) {
  return (
    <>
      <section className="hero" id="home">
        <div className="wrap hero-grid">
          <Reveal>
            <p className="eyebrow hi">Hi, I&apos;m</p>
            <h1 className="name pixel">VANSHIKA NIMWAL</h1>
            <div className="roles">
              {site.roles.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="btn-row">
              <a className="btn mint" href="#projects">
                View My Projects <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="btn ghost" href="#contact">
                Contact Me
              </a>
            </div>
            <div className="social-row">
              <a href={site.github}>
                <FaGithub size={18} aria-hidden="true" /> GitHub
              </a>
              <a href={site.linkedin}>
                <FaLinkedin size={18} color="#0A66C2" aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </Reveal>
          <div className="hero-art">
            <span className="deco plus a" aria-hidden="true">+</span>
            <span className="deco plus b" aria-hidden="true">+</span>
            <span className="deco star a" aria-hidden="true">✦</span>
            <span className="deco star b" aria-hidden="true">✦</span>
            <div className="hero-frame">
              <span className="crown" aria-hidden="true">
                <svg viewBox="0 0 24 16" width="36" height="24">
                  <path fill="#FF4FA3" d="M2 14h20v2H2zM3 12l3-7 4 4 2-8 2 8 4-4 3 7z" />
                </svg>
              </span>
              {showHeroPhoto ? (
                <Image src="/images/hero.png" alt="Orange cat sitting at a laptop" width={640} height={640} className="hero-photo" />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <Reveal>
          <section className="panel edge-purple" id="about">
            <Ticks />
            <div className="about-grid">
              <div>
                <h2 className="about-title">
                  <Gamepad2 color="#34F5A5" aria-hidden="true" />
                  <span>About Me</span>
                </h2>
                <p>{site.about}</p>
              </div>
              <div className="nested">
                <div className="fact">
                  <i><MapPin size={16} color="#FF4FA3" /></i>
                  <span><strong>Location</strong><br />{site.levelUp.location}</span>
                </div>
                <div className="fact">
                  <i><GraduationCap size={16} color="#C084FC" /></i>
                  <span><strong>Education</strong><br />{site.levelUp.education[0]}<br />{site.levelUp.education[1]}</span>
                </div>
                <div className="fact">
                  <i><Target size={16} color="#FF4FA3" /></i>
                  <span><strong>Goal</strong><br />{site.levelUp.goal[0]}<br />{site.levelUp.goal[1]}</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-pink" id="research">
            <Ticks />
            <h2>
              <FileText aria-hidden="true" /> Research
            </h2>
            <div className="research-grid">
              {site.research.map((item) => (
                <article key={item.title} className="panel subcard edge-gold">
                  <Ticks />
                  <p className="chip">{item.kind}</p>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <a className="view" href={item.href}>
                    {item.label} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-cyan" id="skills">
            <Ticks />
            <div className="head">
              <h2><Gamepad2 aria-hidden="true" /> SKILLS</h2>
              <div className="side-label">Tools in my toolkit <span className="xp in"><i style={{ ["--fill" as string]: "72%" }} /></span> <span className="lv">Lv 3</span></div>
            </div>
            <div className="skill-grid">
              {Object.entries(site.skills).map(([group, items]) => (
                <article key={group} className="panel subcard edge-mint">
                  <Ticks />
                  <h3>{group}</h3>
                  <ul className="chips">
                    {items.map((item) => (
                      <li key={item}>
                        <SkillMark name={item} size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-pink" id="experience">
            <Ticks />
            <div className="head">
              <h2><Briefcase aria-hidden="true" /> EXPERIENCE</h2>
              <div className="side-label">XP earned <span className="xp in"><i style={{ ["--fill" as string]: "64%" }} /></span> <span className="lv">Lv 3</span></div>
            </div>
            <div className="exp-grid">
              {site.experience.map((job, index) => {
                const JobIcon = JOB_ICONS[index] ?? Briefcase;
                return (
                <article key={job.company} className={`panel subcard edge-${job.accent}${job.company === "Capital Bull Wave" ? " landscape" : ""}`}>
                  <Ticks />
                  <h3><JobIcon size={18} aria-hidden="true" /> {job.company}</h3>
                  <p>{job.role}</p>
                  {job.dates ? <p>{job.dates}</p> : null}
                  {job.note ? <p>{job.note}</p> : null}
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-gold" id="learning">
            <Ticks />
            <div className="head">
              <h2><Shield aria-hidden="true" /> CERTIFICATIONS & LEARNING</h2>
              <div className="side-label">Always learning... <span className="xp in"><i style={{ ["--fill" as string]: "40%" }} /></span></div>
            </div>
            <div className="cert-grid">
              {site.certifications.map((item) => (
                <article key={item.name} className={`panel subcard edge-${item.accent}`}>
                  <Ticks />
                  <h3>{item.name}</h3>
                </article>
              ))}
            </div>
            <p className="chip" style={{ marginTop: 16, width: "100%" }}>
              <Code2 size={16} aria-hidden="true" />
              <a href={site.dsaHref}>{site.dsa}</a>
              <ArrowRight size={16} aria-hidden="true" />
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-blue" id="projects">
            <Ticks />
            <div className="head">
              <h2><Folder aria-hidden="true" /> PROJECTS</h2>
              <a className="view" href="/projects">View All Projects <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="project-grid">
              {site.showcase.map((item) => {
                const href = item.planned ? null : repoUrl(item.repo);
                return (
                  <article key={item.title} className="panel subcard edge-purple">
                    <Ticks />
                    <div className="thumb">
                      {item.planned ? <span className="planned">PLANNED</span> : null}
                      <ProjectCover name={item.title} category="Mobile" />
                    </div>
                    <h3>{item.title}</h3>
                    <ul className="chips">
                      {item.chips.map((chip) => (
                        <li key={chip}>{chip}</li>
                      ))}
                    </ul>
                    <p>{item.description}</p>
                    {href ? (
                      <a className="view" href={href}>
                        View Project <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="panel edge-purple" id="education">
            <Ticks />
            <div className="edu">
            <div className="logo-frame">
              <Image className="sharda" src="/images/sharda.png" alt="Sharda University logo" width={217} height={273} />
            </div>
            <div>
              <h2><GraduationCap aria-hidden="true" /> EDUCATION</h2>
              <h3 style={{ color: "white", fontFamily: "var(--font-sans), sans-serif" }}>{site.education.degree}</h3>
              <p>{site.education.detail}</p>
              <p>{site.education.place}</p>
            </div>
            <div>
              <span className="lv">{site.education.years}</span>
              <GradCap className="sprite" />
            </div>
            </div>
          </section>
        </Reveal>

        <div className="split">
          <Reveal>
            <section className="panel edge-mint">
              <Ticks />
              <h2><Target aria-hidden="true" /> MISSIONS</h2>
              <ul className="check">
                {site.missions.map((item) => (
                  <li key={item}><span className="dot" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <Astronaut className="sprite float" />
            </section>
          </Reveal>
          <Reveal>
            <section className="panel edge-pink">
              <Ticks />
              <h2><Heart aria-hidden="true" /> INTERESTS</h2>
              <ul className="interests">
                {site.interests.map((item, index) => {
                  const Icon = INTEREST_ICONS[index] ?? Heart;
                  return (
                    <li key={item}>
                      <Icon size={20} aria-hidden="true" />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <section className="panel edge-mint" id="contact">
            <Ticks />
            <div className="connect">
            <PixelCat className="sprite" />
            <div>
              <h2 className="pixel-title">LET&apos;S CONNECT</h2>
              <p>{site.connect}</p>
              <div className="btn-row">
                <a className="btn mint" href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" /> Email Me</a>
                <a className="btn ghost" href={site.linkedin}><FaLinkedin size={16} aria-hidden="true" /> LinkedIn</a>
                <a className="btn ghost" href={site.github}><FaGithub size={16} aria-hidden="true" /> GitHub</a>
              </div>
            </div>
            <div>
              <NextSign className="sprite" />
              <Spark className="sprite" />
            </div>
            </div>
          </section>
        </Reveal>
      </div>
      <p className="footer-note">{site.footer}</p>
    </>
  );
}

function Ticks() {
  return (
    <>
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />
    </>
  );
}
