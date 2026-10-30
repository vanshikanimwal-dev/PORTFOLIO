"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, Sun, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const path = usePathname();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const line = Math.max(140, window.innerHeight * 0.35);
      let current = "home";
      for (const link of LINKS) {
        const node = document.getElementById(link.id);
        if (!node) continue;
        if (node.getBoundingClientRect().top - line <= 0) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    const onHide = () => document.documentElement.classList.toggle("tab-hidden", document.hidden);
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  return (
    <header className="nav">
      <Link className="brand" href="/#home">
        <Image src="/images/alien.png" alt="" width={40} height={36} className="brand-alien" />
        <span>VANSHIKA NIMWAL</span>
      </Link>
      <div className="nav-end">
      <button type="button" className="menu-btn" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Primary">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={path === "/projects" && link.id === "projects" ? "/projects" : `/#${link.id}`}
            aria-current={path === "/projects" ? (link.id === "projects" ? "page" : undefined) : active === link.id ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <Sun className="nav-sun" aria-hidden="true" />
      </div>
    </header>
  );
}
