"use client";

import type { ReactNode } from "react";
import { BootSequence } from "@/components/effects/BootSequence";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { HyperProvider } from "@/components/effects/HyperContext";
import { ParticleField } from "@/components/effects/ParticleField";
import { Scanlines } from "@/components/effects/Scanlines";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";

export function Chrome({ children }: { children: ReactNode }) {
  return (
    <HyperProvider>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Scanlines />
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />
      <BootSequence />
      <Nav />
      <main id="content" className="site-main">
        {children}
      </main>
      <Footer />
    </HyperProvider>
  );
}
