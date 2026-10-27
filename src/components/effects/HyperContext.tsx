"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type HyperValue = {
  hyper: boolean;
  toggle: () => void;
};

const HyperContext = createContext<HyperValue>({ hyper: false, toggle: () => undefined });

export function useHyper() {
  return useContext(HyperContext);
}

export function HyperProvider({ children }: { children: ReactNode }) {
  const [hyper, setHyper] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("hyper", hyper);
  }, [hyper]);

  useEffect(() => {
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      index = key === SEQUENCE[index] ? index + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (index === SEQUENCE.length) {
        setHyper((value) => !value);
        index = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <HyperContext.Provider value={{ hyper, toggle: () => setHyper((value) => !value) }}>
      <p className="sr-only" aria-live="polite">
        {hyper ? "Hyper neon mode on" : ""}
      </p>
      {children}
    </HyperContext.Provider>
  );
}
