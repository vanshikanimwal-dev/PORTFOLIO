import type { ReactNode } from "react";

export function PixelConsole({ children }: { children: ReactNode }) {
  return (
    <div className="handheld">
      <div className="handheld-screen">
        {children}
        <span className="sticker sticker-a" aria-hidden="true">
          ★
        </span>
        <span className="sticker sticker-b" aria-hidden="true">
          ★
        </span>
      </div>
      <div className="handheld-controls" aria-hidden="true">
        <span className="pad" />
        <span className="round-btn" />
        <span className="round-btn alt" />
      </div>
    </div>
  );
}
