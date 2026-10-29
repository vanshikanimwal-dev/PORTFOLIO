"use client";

import { useState } from "react";
import { skillCategories, skillTooltip, skills, type SkillCategory } from "@/data/skills";

export function Skills() {
  const [tab, setTab] = useState<SkillCategory>("Languages");
  const visible = skills.filter((skill) => skill.category === tab);

  return (
    <section id="level-03" className="level">
      <p className="level-kicker">Level 03</p>
      <h2>Inventory</h2>
      <div className="pixel-tabs" aria-label="Skill groups">
        {skillCategories.map((category) => (
          <button key={category} type="button" aria-pressed={tab === category} onClick={() => setTab(category)}>
            {category}
          </button>
        ))}
      </div>
      <ul className="inventory">
        {visible.map((skill) => (
          <li key={skill.name} tabIndex={0} className="slot">
            <span className="pixel-badge" aria-hidden="true">
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
            <span>{skill.name}</span>
            <span className="tip" role="tooltip">
              {skillTooltip(skill)}
            </span>
          </li>
        ))}
      </ul>
      <p className="fine">Power levels are omitted. Neither the resume nor GitHub reports a proficiency score.</p>
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
