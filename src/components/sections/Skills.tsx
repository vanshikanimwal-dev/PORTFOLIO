"use client";

import { useMemo, useState } from "react";
import { skillCategories, skillTooltip, skillUsage, skills, type SkillCategory } from "@/data/skills";
import { SkillMark } from "@/components/skills/SkillMark";
import { Section } from "@/components/ui/Section";

export function Skills() {
  const grouped = useMemo(() => {
    const counts = skillCategories.map((category) => ({
      category,
      items: skills
        .filter((skill) => skill.category === category)
        .slice()
        .sort((a, b) => skillUsage(b) - skillUsage(a) || a.name.localeCompare(b.name)),
    }));
    const kept = counts.filter((group) => group.items.length >= 2);
    const other = counts.filter((group) => group.items.length < 2).flatMap((group) => group.items);
    const tabs: { category: SkillCategory | "Other"; items: typeof skills }[] = kept.map((group) => ({
      category: group.category,
      items: group.items,
    }));
    if (other.length > 0) {
      tabs.push({
        category: "Other",
        items: other.slice().sort((a, b) => skillUsage(b) - skillUsage(a) || a.name.localeCompare(b.name)),
      });
    }
    return tabs;
  }, []);

  const [tab, setTab] = useState<(typeof grouped)[number]["category"]>(grouped[0]?.category ?? "Languages");
  const visible = grouped.find((group) => group.category === tab)?.items ?? [];

  return (
    <Section id="level-03" level="LEVEL 03" title="Inventory" subtitle="Tools from the resume and the repositories">
      <div className="pixel-tabs" aria-label="Skill groups">
        {grouped.map((group) => (
          <button key={group.category} type="button" aria-pressed={tab === group.category} onClick={() => setTab(group.category)}>
            {group.category}
          </button>
        ))}
      </div>
      <ul className="inventory">
        {visible.map((skill) => (
          <li key={skill.name} tabIndex={0} className="slot">
            <SkillMark name={skill.name} size={40} />
            <span>{skill.name}</span>
            <span className="tip" role="tooltip">
              {skillTooltip(skill)}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
