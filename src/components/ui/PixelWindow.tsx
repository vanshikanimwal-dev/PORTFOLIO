"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

type Props = {
  title: string;
  label?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
  pinned?: boolean;
};

export function PixelWindow({ title, label, children, onClose, className, pinned = false }: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEntered(true);
  }, []);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (pinned || window.matchMedia("(max-width: 800px)").matches) return;
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
    <article
      className={`${className ? `pixel-window ${className}` : "pixel-window"}${entered ? " is-in" : ""}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
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
    </article>
  );
}
