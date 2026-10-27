import { cn } from "@/lib/utils";

export function RoboticArm({ side }: { side: "left" | "right" }) {
  const id = `arm-grad-${side}`;
  return (
    <svg
      className={cn("arm", side === "left" ? "arm-left" : "arm-right")}
      viewBox="0 0 280 520"
      role="img"
      aria-label={side === "left" ? "Decorative robotic arm typing on a holographic keyboard" : "Decorative robotic arm pointing inward"}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6EC7" />
          <stop offset="100%" stopColor="#8B2CFF" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round">
        <circle cx="150" cy="64" r="26" fill="#150826" />
        <path d="M150 90 V210" />
        <circle cx="150" cy="224" r="14" fill="#150826" />
        <path className="arm-lower" d="M150 238 C150 310 96 340 78 400" />
        <path d="M78 400 l-30 34 M78 400 l6 40 M78 400 l34 24" />
        {side === "left" ? (
          <g>
            <rect x="18" y="438" width="132" height="52" rx="10" />
            {Array.from({ length: 8 }).map((_, index) => (
              <rect
                key={index}
                x={32 + (index % 4) * 28}
                y={450 + Math.floor(index / 4) * 16}
                width="16"
                height="8"
                fill="#FF2E9A"
                stroke="none"
              />
            ))}
          </g>
        ) : (
          <path d="M78 400 L40 470" stroke="#00F0FF" />
        )}
      </g>
    </svg>
  );
}
