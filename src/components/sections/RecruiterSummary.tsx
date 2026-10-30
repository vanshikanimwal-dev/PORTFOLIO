import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const bosses = ["CertiChain", "PayFlow", "AlgoVerse"]
  .map((name) => projects.find((project) => project.name === name))
  .filter((project) => project != null);

const resumeSkills = skills.filter((skill) => skill.resume).slice(0, 12);

export function RecruiterSummary() {
  return (
    <section className="recruiter-sheet container" aria-label="Recruiter summary">
      <p className="level-kicker">RECRUITER MODE</p>
      <h2 className="section-title">{profile.name}</h2>
      <p className="section-sub">{profile.headline}</p>
      <p className="clamp-3">{profile.tagline}</p>
      <ul className="chips">
        {resumeSkills.map((skill) => (
          <li key={skill.name}>{skill.name}</li>
        ))}
      </ul>
      <div className="recruiter-projects">
        {bosses.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <p className="clamp-3">{project.description}</p>
            <p>
              <a href={project.url}>CODE</a>
              {project.homepage ? <a href={project.homepage}> PLAY</a> : null}
            </p>
          </article>
        ))}
      </div>
      <ol className="timeline">
        {profile.experience.map((item) => (
          <li key={`${item.role}-${item.org}`}>
            <strong>
              {item.role}, {item.org}
            </strong>
            {item.display.trim().toUpperCase().startsWith("TODO") ? null : <span> · {item.display}</span>}
          </li>
        ))}
      </ol>
      {profile.education.map((item) => (
        <p key={item.school}>
          {item.credential}, {item.school}. {item.display}.
        </p>
      ))}
      <div className="footer-actions">
        <a className="start-btn" href="/resume.pdf">
          RESUME
        </a>
        <a className="start-btn resume-btn" href="#level-05">
          CONTACT
        </a>
      </div>
    </section>
  );
}
