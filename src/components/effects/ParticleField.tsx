"use client";

import { useEffect, useRef } from "react";
import { useHyper } from "@/components/effects/HyperContext";
import { usePrefersReducedMotion } from "@/components/hooks/usePrefersReducedMotion";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  depth: number;
  color: string;
  kind: "dot" | "spark";
};

const COLORS = ["#FF2E9A", "#B26BFF", "#8B2CFF", "#FF6EC7", "#00F0FF"];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const { hyper } = useHyper();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    const particles: Particle[] = [];

    const countFor = () => {
      const narrow = window.innerWidth < 768;
      const base = narrow ? 16 : 42;
      return Math.min(80, hyper ? Math.round(base * 1.7) : base);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const next = countFor();
      while (particles.length < next) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.8 + 0.6,
          speed: Math.random() * 0.45 + 0.15,
          depth: Math.random() * 0.8 + 0.2,
          color: COLORS[particles.length % COLORS.length],
          kind: particles.length % 9 === 0 ? "spark" : "dot",
        });
      }
      particles.length = next;
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      if (document.hidden) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.y -= particle.speed * (hyper ? 1.6 : 1);
        particle.x += Math.sin(particle.y * 0.01) * 0.25 + (mouseX - width / 2) * 0.0009 * particle.depth;
        if (particle.y < -8) {
          particle.y = height + 8;
          particle.x = Math.random() * width;
        }
        context.fillStyle = particle.color;
        context.shadowBlur = 12;
        context.shadowColor = particle.color;
        context.beginPath();
        if (particle.kind === "spark") {
          context.moveTo(particle.x, particle.y - particle.r * 3);
          context.lineTo(particle.x + particle.r, particle.y);
          context.lineTo(particle.x, particle.y + particle.r * 3);
          context.lineTo(particle.x - particle.r, particle.y);
        } else {
          context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        }
        context.closePath();
        context.fill();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [hyper, reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="particle-layer" aria-hidden="true" />;
}
