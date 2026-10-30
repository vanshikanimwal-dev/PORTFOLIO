"use client";

import type { ReactNode } from "react";
import { PixelCursor } from "@/components/effects/PixelCursor";
import { GameProvider } from "@/components/game/GameContext";
import { Footer } from "@/components/sections/Footer";
import { Hud } from "@/components/ui/Hud";
import { LevelFlash } from "@/components/ui/LevelFlash";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function Chrome({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <LoadingScreen />
      <PixelCursor />
      <Hud />
      <LevelFlash />
      <main id="content">{children}</main>
      <Footer />
    </GameProvider>
  );
}
