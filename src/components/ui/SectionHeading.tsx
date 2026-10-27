import { GlitchText } from "./GlitchText";

export function SectionHeading({
  kicker,
  title,
  id,
}: {
  kicker: string;
  title: string;
  id?: string;
}) {
  return (
    <header className="section-heading">
      <p className="kicker">{kicker}</p>
      <GlitchText as="h2" id={id} text={title} className="text-5xl md:text-6xl" />
    </header>
  );
}
