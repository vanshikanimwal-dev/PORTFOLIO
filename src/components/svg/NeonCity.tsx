export function NeonCity() {
  return (
    <svg className="city" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05010A" stopOpacity="0" />
          <stop offset="100%" stopColor="#2a083f" />
        </linearGradient>
      </defs>
      <rect width="1440" height="320" fill="url(#sky)" />
      <g fill="#14061f">
        <rect x="40" y="120" width="70" height="200" />
        <rect x="130" y="70" width="50" height="250" />
        <rect x="200" y="150" width="90" height="170" />
        <rect x="320" y="90" width="40" height="230" />
        <rect x="380" y="160" width="110" height="160" />
        <rect x="520" y="40" width="60" height="280" />
        <rect x="600" y="130" width="80" height="190" />
        <rect x="710" y="80" width="46" height="240" />
        <rect x="780" y="150" width="120" height="170" />
        <rect x="930" y="60" width="54" height="260" />
        <rect x="1000" y="140" width="90" height="180" />
        <rect x="1120" y="100" width="40" height="220" />
        <rect x="1180" y="170" width="130" height="150" />
        <rect x="1330" y="90" width="70" height="230" />
      </g>
      <g fill="#FF2E9A">
        <rect x="58" y="150" width="10" height="8" />
        <rect x="150" y="110" width="8" height="8" />
        <rect x="540" y="80" width="12" height="8" />
        <rect x="950" y="100" width="10" height="8" />
        <rect x="1200" y="200" width="14" height="8" />
      </g>
      <g fill="#8B2CFF">
        <rect x="220" y="180" width="12" height="8" />
        <rect x="400" y="190" width="10" height="8" />
        <rect x="730" y="120" width="10" height="8" />
        <rect x="1020" y="170" width="12" height="8" />
      </g>
      <circle cx="1180" cy="48" r="16" fill="#FF6EC7" opacity="0.85" />
    </svg>
  );
}
