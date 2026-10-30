import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Navbar />
      <main id="content">{children}</main>
    </>
  );
}
