import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap" style={{ padding: "48px 0" }}>
      <h1>Page not found</h1>
      <p>That page is not on this site.</p>
      <p>
        <Link className="btn primary" href="/">
          Return home
        </Link>
      </p>
    </section>
  );
}
