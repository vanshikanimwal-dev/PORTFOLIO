"use client";

import { useState } from "react";
import { foundations, skillCategories, skillTooltip, skillUsage, skills } from "@/data/skills";
import type { SkillCategory } from "@/data/skills";
import { SkillIcon } from "@/components/skills/SkillIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  const [category, setCategory] = useState<SkillCategory | "All">("All");
  const visible = skills.filter((skill) => category === "All" || skill.category === category);

  return (
    <section id="skills" className="section circuit-bg">
      <SectionHeading kicker="LOADOUT" title="Skills" />
      <p className="mb-4 max-w-3xl text-muted">
        Languages come from the resume and from GitHub language stats. Flutter engine files such as CMake, Swift, and
        Objective-C are not counted. Proficiency bars are omitted because neither the resume nor GitHub reports a level.
      </p>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        <button type="button" className="lang-chip" aria-pressed={category === "All"} onClick={() => setCategory("All")}>
          All
        </button>
        {skillCategories.map((item) => (
          <button
            key={item}
            type="button"
            className="lang-chip"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((skill) => (
          <li key={skill.name}>
            <div className="skill-tile" tabIndex={0}>
              <SkillIcon name={skill.name} />
              <span className="font-display text-xl">{skill.name}</span>
              <span className="tooltip" role="tooltip">
                {skillTooltip(skill)}
              </span>
            </div>
            <p className="sr-only">{skillTooltip(skill)}. Repo count {skillUsage(skill)}.</p>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="mb-2 font-display text-2xl">Foundations from the resume</h3>
        <ul className="flex flex-wrap gap-2">
          {foundations.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
