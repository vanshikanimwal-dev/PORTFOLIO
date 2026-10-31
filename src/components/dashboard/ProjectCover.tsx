import Image from "next/image";

type Props = {
  name: string;
  category: string;
  src?: string | null;
};

function hash(value: string) {
  let n = 0;
  for (const char of value) n = (n * 33 + char.charCodeAt(0)) >>> 0;
  return n;
}

const PALETTES = [
  ["#FF4FA3", "#7C3AED", "#22D3EE"],
  ["#34F5A5", "#2563EB", "#F9A8D4"],
  ["#FFD84D", "#F97316", "#8B5CF6"],
  ["#22D3EE", "#4F46E5", "#FF6EC7"],
  ["#A78BFA", "#DB2777", "#34F5A5"],
  ["#60A5FA", "#0EA5E9", "#FDE68A"],
];

function Scene({ category, accent }: { category: string; accent: string }) {
  if (category === "Mobile") {
    return (
      <g fill={accent}>
        <rect x="470" y="48" width="92" height="168" rx="12" />
        <rect x="482" y="64" width="68" height="120" fill="#0c1233" />
        <rect x="508" y="194" width="16" height="8" />
      </g>
    );
  }
  if (category === "Backend") {
    return (
      <g fill={accent}>
        <rect x="430" y="56" width="150" height="28" />
        <rect x="430" y="96" width="150" height="28" />
        <rect x="430" y="136" width="150" height="28" />
        <rect x="444" y="66" width="10" height="8" fill="#0c1233" />
        <rect x="444" y="106" width="10" height="8" fill="#0c1233" />
        <rect x="444" y="146" width="10" height="8" fill="#0c1233" />
      </g>
    );
  }
  if (category === "Games" || category === "XR") {
    return (
      <g fill={accent}>
        <rect x="468" y="70" width="28" height="28" />
        <rect x="508" y="70" width="28" height="28" />
        <rect x="488" y="110" width="28" height="28" />
        <rect x="448" y="150" width="108" height="16" />
      </g>
    );
  }
  return (
    <g fill={accent}>
      <rect x="430" y="52" width="160" height="120" rx="8" />
      <rect x="442" y="72" width="136" height="72" fill="#0c1233" />
      <rect x="442" y="152" width="48" height="8" fill="#0c1233" />
    </g>
  );
}

export function ProjectCover({ name, category, src }: Props) {
  if (src) {
    return <Image className="cover" src={src} alt="" width={640} height={280} />;
  }
  const n = hash(name);
  const [a, b, c] = PALETTES[n % PALETTES.length];
  const id = `cover-${name.replace(/[^a-z0-9]+/gi, "-")}`;
  return (
    <svg className="cover" viewBox="0 0 640 280" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${name} cover`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="55%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>
      <rect width="640" height="280" fill={`url(#${id})`} />
      {Array.from({ length: 18 }, (_, index) => (
        <rect
          key={index}
          x={(n + index * 97) % 620}
          y={(n / 3 + index * 53) % 250}
          width={index % 4 === 0 ? 4 : 2}
          height={index % 4 === 0 ? 4 : 2}
          fill="#ffffff"
          opacity={index % 3 === 0 ? 0.85 : 0.4}
        />
      ))}
      <Scene category={category} accent="#ffffff" />
    </svg>
  );
}
