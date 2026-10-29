"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type SoundName = "coin" | "click" | "level" | "meow";

type GameValue = {
  sound: boolean;
  toggleSound: () => void;
  coins: number;
  addCoin: () => void;
  play: (name: SoundName) => void;
  levelUp: boolean;
};

const GameContext = createContext<GameValue | null>(null);

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

let sharedAudio: AudioContext | null = null;

function audioContext() {
  if (!sharedAudio) sharedAudio = new AudioContext();
  return sharedAudio;
}

function tone(ctx: AudioContext, frequency: number, at: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.04, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(at);
  osc.stop(at + duration);
}

function playNow(name: SoundName) {
  const ctx = audioContext();
  void ctx.resume();
  const now = ctx.currentTime;
  if (name === "coin") {
    tone(ctx, 880, now, 0.08);
    tone(ctx, 1320, now + 0.09, 0.12);
  } else if (name === "click") {
    tone(ctx, 240, now, 0.05);
  } else if (name === "meow") {
    tone(ctx, 620, now, 0.08);
    tone(ctx, 420, now + 0.08, 0.12);
  } else {
    [523, 659, 784, 1046].forEach((frequency, step) => tone(ctx, frequency, now + step * 0.09, 0.1));
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(false);
  const [coins, setCoins] = useState(0);
  const [levelUp, setLevelUp] = useState(false);
  const soundRef = useRef(false);

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  useEffect(() => {
    const onHide = () => document.documentElement.classList.toggle("tab-hidden", document.hidden);
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  useEffect(() => {
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      index = key === KONAMI[index] ? index + 1 : key === KONAMI[0] ? 1 : 0;
      if (index === KONAMI.length) {
        index = 0;
        setLevelUp(true);
        if (soundRef.current) playNow("level");
        window.setTimeout(() => setLevelUp(false), 1600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<GameValue>(
    () => ({
      sound,
      toggleSound: () => setSound((current) => !current),
      coins,
      addCoin: () => {
        setCoins((current) => current + 1);
        if (soundRef.current) playNow("coin");
      },
      play: (name) => {
        if (soundRef.current) playNow(name);
      },
      levelUp,
    }),
    [sound, coins, levelUp],
  );

  return (
    <GameContext.Provider value={value}>
      {children}
      {levelUp ? (
        <p className="level-up" role="status">
          Level Up!
        </p>
      ) : null}
    </GameContext.Provider>
  );
}

export function useGame() {
  const value = useContext(GameContext);
  if (!value) throw new Error("useGame must be used inside GameProvider");
  return value;
}
