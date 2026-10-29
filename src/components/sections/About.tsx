import Image from "next/image";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillTooltip, skills } from "@/data/skills";
import { PixelConsole } from "@/components/pixel/PixelConsole";
import { CoinButton, DoorLink } from "@/components/pixel/PixelActions";
import { PixelBat, PixelFlag, PixelKey, PixelPlant, PixelStar } from "@/components/pixel/sprites";
import { PixelWindow } from "@/components/ui/PixelWindow";

const languages = new Set(projects.flatMap((project) => project.languages.map((language) => language.name)));
const resumeSkills = skills.filter((skill) => skill.resume);

export function About() {
  return (
    <section id="level-01" className="level">
      <p className="level-kicker">Level 01</p>
      <h2>Meet the player</h2>
      <p className="mint-name">{profile.name}</p>
      <div className="about-layout">
        <PixelWindow title="PLAYER.CARD" label="Hello !!">
          <p>Player: {profile.name}</p>
          <p>Role: {profile.headline}</p>
          <p>Mission: {profile.tagline}</p>
          <p>Status: {profile.github.bio}</p>
          <p>TODO: availability is not stated on the resume.</p>
        </PixelWindow>
        <div className="console-wrap">
          <PixelConsole>
            <Image
              src={profile.github.avatar}
              alt="GitHub profile photo of Vanshika Nimwal. The resume did not include a portrait."
              width={128}
              height={128}
              className="pixel-photo"
            />
          </PixelConsole>
        </div>
        <PixelWindow title="WEAPONS" label="Weapons Mastery">
          <ul className="weapon-list">
            {resumeSkills.map((skill) => (
              <li key={skill.name} tabIndex={0} className="weapon">
                <span className="pixel-badge" aria-hidden="true">
                  {skill.name.slice(0, 2).toUpperCase()}
                </span>
                {skill.name}
                <span className="tip" role="tooltip">
                  {skillTooltip(skill)}
                </span>
              </li>
            ))}
          </ul>
        </PixelWindow>
        <PixelWindow title="QUEST.LOG" label="Training Log">
          {profile.education.map((item) => (
            <p key={item.school}>
              {item.credential}, {item.school}. {item.location}. {item.display}.
            </p>
          ))}
          <ul>
            {profile.certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {profile.experience.map((item) => (
            <article key={`${item.role}-${item.org}`}>
              <h3>
                {item.role}, {item.org}
              </h3>
              <p>
                {item.kind} · {item.display}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
          <p>TODO: no separate achievements or named hackathon are listed on the resume.</p>
        </PixelWindow>
        <PixelWindow title="SKILLS" label="Skills Mastery">
          <ul>
            {skills.map((skill) => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ul>
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
        <div>
          <dt>YEARS XP</dt>
          <dd>TODO</dd>
        </div>
        <div>
          <dt>PROJECTS SHIPPED</dt>
          <dd>TODO</dd>
        </div>
      </dl>
      <p className="fine">
        Years of experience and a shipped-project count are not on the resume. Dated internships run May 2025–Mar 2026.
      </p>
      <div className="decor-strip">
        <CoinButton />
        <PixelKey className="decor" />
        <PixelPlant className="decor" />
        <PixelBat className="decor flap" />
        <PixelFlag className="decor" />
        <PixelStar className="decor twinkle" />
        <DoorLink href="#level-02" />
      </div>
      <div className="ground" aria-hidden="true" />
    </section>
  );
}
