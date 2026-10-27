"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#home", id: "home", label: "Home" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/blog", id: "blog", label: "Blog" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/blog")) {
      setActive("blog");
      return;
    }
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("nav-shell", compact && "is-compact")}>
      <Link href="/#home" className="logo glitch" data-text="VN//" aria-label="Vanshika Nimwal home">
        VN//
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((link) => (
          <Link key={link.id} href={link.href} aria-current={active === link.id ? "true" : undefined}>
            {link.label}
          </Link>
        ))}
        <NeonButton href="/resume.pdf" variant="ghost">
          Resume
        </NeonButton>
      </nav>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "✕" : "☰"}
      </button>
      {open ? (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-label="Mobile menu">
          {LINKS.map((link) => (
            <Link key={link.id} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <NeonButton href="/resume.pdf">Download Resume</NeonButton>
        </div>
      ) : null}
    </header>
  );
}
