"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories, skillTooltip, skills, type Skill } from "@/data/skills";
import { ConsolePhoto } from "@/components/pixel/ConsolePhoto";
import { PixelConsole } from "@/components/pixel/PixelConsole";
import { CoinButton, DoorLink } from "@/components/pixel/PixelActions";
import { PixelFlag, PixelKey, PixelPlant } from "@/components/pixel/sprites";
import { SkillMark } from "@/components/skills/SkillMark";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Section } from "@/components/ui/Section";

const languages = new Set(projects.flatMap((project) => project.languages.map((language) => language.name)));
const resumeSkills = skills.filter((skill) => skill.resume);

type Art = { console: string | null };

function ChipGrid({ items, size }: { items: Skill[]; size: number }) {
  const groups = skillCategories
    .map((category) => ({ category, items: items.filter((skill) => skill.category === category) }))
    .filter((group) => group.items.length > 0);
  return (
    <div className="chip-groups">
      {groups.map((group) => (
        <div key={group.category}>
          <p className="chip-label">{group.category}</p>
          <ul className="icon-grid">
            {group.items.map((skill) => (
              <li key={skill.name} tabIndex={0}>
                <SkillMark name={skill.name} size={size} />
                <span>{skill.name}</span>
                <span className="tip" role="tooltip">
                  {skillTooltip(skill)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function QuestLog() {
  const [tab, setTab] = useState<"EXPERIENCE" | "EDUCATION" | "COURSES">("EXPERIENCE");
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PixelWindow title="QUEST.LOG" label="Quest Log" pinned>
      <div className="pixel-tabs" aria-label="Quest log">
        {(["EXPERIENCE", "EDUCATION", "COURSES"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={tab === item} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      {tab === "EXPERIENCE"
        ? profile.experience.map((item) => {
            const id = `${item.role}-${item.org}`;
            const extra = item.points.slice(3);
            return (
              <article key={id} className="quest-mini">
                <h3>
                  {item.role}, {item.org}
                </h3>
                {item.display.trim().toUpperCase().startsWith("TODO") ? null : <p>{item.display}</p>}
                <ul>
                  {item.points.slice(0, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {extra.length > 0 && open === id ? (
                  <ul>
                    {extra.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
                {extra.length > 0 ? (
                  <button type="button" onClick={() => setOpen(open === id ? null : id)}>
                    {open === id ? "COLLAPSE" : "EXPAND"}
                  </button>
                ) : null}
              </article>
            );
          })
        : null}
      {tab === "EDUCATION"
        ? profile.education.map((item) => (
            <p key={item.school}>
              {item.credential}, {item.school}. {item.location}. {item.display}.
            </p>
          ))
        : null}
      {tab === "COURSES" ? (
        <ul className="chips">
          {profile.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </PixelWindow>
  );
}

export function About({ art }: { art: Art }) {
  const [more, setMore] = useState(false);
  return (
    <Section id="level-01" level="LEVEL 01" title="Meet The Player" subtitle={profile.headline}>
      <div className="about-col">
        <PixelWindow title="PLAYER.CARD" label="Hello !!" pinned>
          <p>Player: {profile.name}</p>
          <p>Role: {profile.headline}</p>
          <p className={more ? "" : "clamp-2"}>Mission: {more ? profile.summary : profile.tagline}</p>
          <button type="button" onClick={() => setMore((value) => !value)}>
            {more ? "SHOW LESS" : "READ MORE"}
          </button>
        </PixelWindow>
        <QuestLog />
      </div>
      <div className="console-wrap">
        {art.console ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="console-art" src={art.console} alt="Pixel console" />
        ) : (
          <PixelConsole>
            <ConsolePhoto />
          </PixelConsole>
        )}
      </div>
      <div className="about-col mastery-col">
        <PixelWindow title="WEAPONS" label="Weapons Mastery" pinned>
          <ChipGrid items={resumeSkills} size={24} />
        </PixelWindow>
        <PixelWindow title="SKILLS" label="Skills Mastery" pinned>
          <ChipGrid items={skills} size={24} />
        </PixelWindow>
      </div>
      <dl className="stat-row">
        <div>
          <dt>REPOS</dt>
          <dd>{projects.length}</dd>
        </div>
        <div>
          <dt>LANGUAGES</dt>
          <dd>{languages.size}</dd>
        </div>
      </dl>
      <div className="decor-strip">
        <CoinButton />
        <PixelKey className="decor" />
        <PixelPlant className="decor" />
        <PixelFlag className="decor" />
        <DoorLink href="#level-02" />
      </div>
    </Section>
  );
}
