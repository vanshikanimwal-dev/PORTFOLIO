"use client";

import { useState } from "react";
import { useGame } from "@/components/game/GameContext";
import { PixelCat, PixelCoin, PixelDoor } from "./sprites";

export function CoinButton() {
  const { addCoin } = useGame();
  return (
    <button type="button" className="sprite-btn spin" onClick={addCoin} aria-label="Collect a coin">
      <PixelCoin />
    </button>
  );
}

export function CatButton() {
  const { play } = useGame();
  const [meow, setMeow] = useState(false);

  return (
    <button
      type="button"
      className="sprite-btn"
      aria-label="Pixel cat"
      onClick={() => {
        play("meow");
        setMeow(true);
        window.setTimeout(() => setMeow(false), 900);
      }}
    >
      {meow ? <span className="meow">meow!</span> : null}
      <PixelCat className="wag" />
    </button>
  );
}

export function DoorLink({ href }: { href: string }) {
  const { play } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <a
      className={open ? "sprite-btn door is-open" : "sprite-btn door"}
      href={href}
      aria-label="Open the door to the next level"
      onClick={(event) => {
        event.preventDefault();
        play("click");
        setOpen(true);
        window.setTimeout(() => {
          window.location.hash = href;
        }, 280);
      }}
    >
      <PixelDoor />
    </a>
  );
}
