"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  label?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
};

export function PixelWindow({ title, label, children, onClose, className }: Props) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 800px)").matches) return;
    drag.current = { x: event.clientX, y: event.clientY, left: offset.x, top: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setOffset({
      x: drag.current.left + event.clientX - drag.current.x,
      y: drag.current.top + event.clientY - drag.current.y,
    });
  }

  function onPointerUp() {
    drag.current = null;
  }

  return (
    <motion.article
      className={className ? `pixel-window ${className}` : "pixel-window"}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      initial={reduced ? false : { scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="window-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span>{title}</span>
        <span className="window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {onClose ? (
          <button type="button" className="window-close" onClick={onClose} aria-label={`Close ${title}`}>
            ×
          </button>
        ) : null}
      </div>
      {label ? <p className="window-label">{label}</p> : null}
      <div className="window-body">{children}</div>
    </motion.article>
  );
}
