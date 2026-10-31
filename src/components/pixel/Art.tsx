type Props = { className?: string };

export function Alien({ className }: Props) {
  const rows = [
    ".KKK........KKK.",
    ".KPKKKK..KKKKPK.",
    "KKKKKPK..KPKKKKK",
    "KPPKKPKKKKPKKPPK",
    "KPKKPPPPPPPPKKPK",
    "KKKPPPPPPPPPPKKK",
    "KKPPPPPPPPPPPPKK",
    "KKPPKKPPPPKKPPKK",
    "PPPPKKPPPPKKPPPP",
    "KKPPPPPPPPPPPPKK",
    ".KPPPPPPPPPPPPK.",
    ".KKKPPKKKKPPKKK.",
    "...KPPK..KPPK...",
    ".KKKKKK..KKKKKK.",
    ".KPK........KPK.",
  ];
  const rects = rows.flatMap((row, y) =>
    [...row].flatMap((cell, x) => (cell === "." ? [] : [{ x, y, fill: cell === "K" ? "#111111" : "#C9A0F8" }])),
  );
  return (
    <svg className={className} viewBox="0 0 16 15" shapeRendering="crispEdges" aria-hidden="true">
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width="1" height="1" fill={rect.fill} />
      ))}
    </svg>
  );
}

export function Invader({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 12 8" shapeRendering="crispEdges" aria-hidden="true">
      <path
        fill="#FF4FA3"
        d="M2 0h2v1H2zM8 0h2v1H8zM1 1h3v1H1zM8 1h3v1H8zM0 2h12v1H0zM0 3h12v1H0zM1 4h2v1H1zM4 4h4v1H4zM9 4h2v1H9zM2 5h2v1H2zM8 5h2v1H8zM1 6h2v1H1zM9 6h2v1H9zM0 7h2v1H0zM10 7h2v1h-2z"
      />
    </svg>
  );
}

export function Moon({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#F7EEFF" d="M6 1h4v1H6zM4 2h2v1H4zM10 2h3v1h-3zM3 3h2v2H3zM11 3h2v1h-2zM2 5h2v4H2zM12 4h2v2h-2zM3 9h2v2H3zM11 6h1v3h-1zM4 11h3v1H4zM9 10h2v2H9zM6 12h4v1H6z" />
    </svg>
  );
}

export function Cloud({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 20 8" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#C9B6FF" d="M4 2h4v1H4zM3 3h8v1H3zM2 4h12v2H2zM5 6h8v1H5zM8 1h3v1H8z" />
    </svg>
  );
}

export function Skyline({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 80 24" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#2A1B6B" d="M0 10h6v14H0zM8 6h5v18H8zM15 12h4v12h-4zM21 4h6v20h-6zM29 9h4v15h-4zM35 3h7v21h-7zM44 8h5v16h-5zM51 5h6v19h-6zM59 11h4v13h-4zM65 7h6v17h-6zM73 12h7v12h-7z" />
      <g className="windows" fill="#FFD84D">
        <rect x="9" y="8" width="1" height="1" />
        <rect x="12" y="10" width="1" height="1" />
        <rect x="22" y="6" width="1" height="1" />
        <rect x="25" y="9" width="1" height="1" />
        <rect x="36" y="5" width="1" height="1" />
        <rect x="39" y="8" width="1" height="1" />
        <rect x="52" y="7" width="1" height="1" />
        <rect x="55" y="11" width="1" height="1" />
        <rect x="66" y="9" width="1" height="1" />
        <rect x="69" y="13" width="1" height="1" />
      </g>
    </svg>
  );
}

export function MountainFlag({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 48 32" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#24306B" d="M4 28h40v2H4z" />
      <path fill="#3A4A9A" d="M6 26 L18 10 L24 18 L30 8 L42 26z" />
      <path fill="#6C7BFF" d="M18 10 L22 16 L14 16z" />
      <path fill="#1B1038" d="M30 8h1v12h-1z" />
      <path className="flag-wave" fill="#FF4FA3" d="M31 8h8v1h-8zM31 9h6v1h-6zM31 10h8v1h-8z" />
      <path fill="#FFD84D" d="M8 6h1v1H8zM40 4h1v1h-1zM12 14h1v1h-1z" />
    </svg>
  );
}

export function Astronaut({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 32" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#F4F7FF" d="M8 4h8v2H8zM6 6h12v6H6zM8 12h8v2H8zM7 14h4v4H7zM13 14h4v4h-4zM8 18h3v4H8zM13 18h3v4h-3zM6 22h4v2H6zM14 22h4v2h-4z" />
      <path fill="#22D3EE" d="M8 7h8v4H8z" />
      <path fill="#FF4FA3" d="M16 2h1v6h-1zM17 2h5v1h-5zM17 3h4v1h-4z" />
      <path fill="#8B5CF6" d="M4 16h2v3H4z" />
    </svg>
  );
}

export function PixelCat({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 16" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#F4A261" d="M4 4h2v2H4zM14 4h2v2h-2zM4 6h12v4H4zM6 10h8v2H6z" />
      <path fill="#FFF6EA" d="M7 8h6v2H7z" />
      <path fill="#1B1038" d="M6 7h1v1H6zM11 7h1v1h-1z" />
      <path className="cat-tail" fill="#F4A261" d="M16 8h4v1h-4zM19 6h1v2h-1z" />
      <path fill="#34F5A5" d="M2 13h16v1H2zM1 14h18v1H1z" />
    </svg>
  );
}

export function NextSign({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 36 28" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#24306B" d="M4 16 L16 6 L28 16 L22 16 L22 24 L10 24 L10 16z" />
      <path fill="#8B5CF6" d="M16 22h1v6h-1z" />
      <rect x="18" y="14" width="14" height="8" fill="#FFD84D" />
      <path fill="#1B1038" d="M19 16h4v1h-4zM24 16h6v1h-6zM19 18h8v1h-8z" />
    </svg>
  );
}

export function GradCap({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 16" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#3BA7FF" d="M2 6 L12 2 L22 6 L12 10z" />
      <path fill="#8B5CF6" d="M6 8h12v4H6z" />
      <path fill="#FFD84D" d="M20 6h1v6h-1zM18 12h4v1h-4z" />
    </svg>
  );
}

export function Spark({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#FFD84D" d="M3 0h2v2H3zM3 6h2v2H3zM0 3h2v2H0zM6 3h2v2H6zM3 3h2v2H3z" />
    </svg>
  );
}
