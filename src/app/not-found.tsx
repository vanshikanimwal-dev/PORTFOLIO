import Link from "next/link";

export default function NotFound() {
  return (
    <section className="level">
      <p className="level-kicker">404</p>
      <h1>Save not found</h1>
      <p className="fine">That page is not in this game.</p>
      <p>
        <Link className="start-btn" href="/">
          Return home
        </Link>
      </p>
    </section>
  );
}
