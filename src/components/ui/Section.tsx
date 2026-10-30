import type { ReactNode } from "react";
import { Marquee } from "@/components/ui/Marquee";

type Props = {
  id: string;
  level: string;
  title: string;
  subtitle?: string;
  extras?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export function Section({ id, level, title, subtitle, extras, footer, children }: Props) {
  return (
    <section id={id} className={id === "home" ? "level hero-level" : "level"}>
      <Marquee text={title} />
      <div className="container">
        <div className="heading-row">
          <div>
            {id === "home" ? <p className="hero-label">2026 PORTFOLIO</p> : <p className="level-kicker">{level}</p>}
            <h2 className="section-title">{title}</h2>
            {subtitle ? <p className="section-sub">{subtitle}</p> : null}
          </div>
          {extras ? <div className="heading-extras">{extras}</div> : null}
        </div>
        <div className="section-grid">{children}</div>
        <div className="ground" aria-hidden="true" />
        {footer}
      </div>
    </section>
  );
}
