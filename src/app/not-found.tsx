import { NeonButton } from "@/components/ui/NeonButton";

export default function NotFound() {
  return (
    <section className="section">
      <p className="kicker">404</p>
      <h1 className="font-display text-6xl">Signal lost</h1>
      <p className="mt-3 max-w-xl text-muted">That page is not in this portfolio.</p>
      <div className="mt-5">
        <NeonButton href="/">Return home</NeonButton>
      </div>
    </section>
  );
}
