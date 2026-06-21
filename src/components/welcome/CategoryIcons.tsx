"use client";

type IconProps = { className?: string };

export function IconRestaurants({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <ellipse cx="24" cy="34" rx="14" ry="4" fill="rgba(255,120,40,0.25)" />
      <path d="M14 18h20l-2 14H16L14 18z" fill="url(#burger-bun)" />
      <path d="M16 24h16v3H16v-3z" fill="#8B4513" />
      <path d="M16 27h16v2.5H16V27z" fill="#22c55e" />
      <path d="M16 29.5h16V32H16v-2.5z" fill="#ff4d6d" />
      <defs>
        <linearGradient id="burger-bun" x1="14" y1="18" x2="34" y2="32">
          <stop stopColor="#ffb347" />
          <stop offset="1" stopColor="#ff8a00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconEvents({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M8 36h32" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 36V22l8-8 8 8v14" stroke="#c084fc" strokeWidth="2" fill="rgba(168,85,247,0.15)" />
      <path d="M12 14l6-6M36 14l-6-6" stroke="#ff4d6d" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="10" r="3" fill="#ff4d6d" filter="url(#glow)" />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export function IconTrending({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M26 6L12 26h10l-2 16 18-24H28l2-12z"
        fill="url(#bolt)"
        stroke="#00d4ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="bolt" x1="12" y1="6" x2="38" y2="42">
          <stop stopColor="#00d4ff" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconNearby({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="16" stroke="#22c55e" strokeWidth="1.5" opacity="0.5" />
      <circle cx="24" cy="24" r="10" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
      <path d="M24 24 L24 8 A16 16 0 0 1 36 18 Z" fill="rgba(34,197,94,0.25)" />
      <circle cx="24" cy="24" r="3" fill="#22c55e" />
      <circle cx="30" cy="18" r="2" fill="#ff4d6d" />
    </svg>
  );
}

export function CategoryIcon({ theme, className }: { theme: string; className?: string }) {
  switch (theme) {
    case "card-restaurants":
      return <IconRestaurants className={className} />;
    case "card-events":
      return <IconEvents className={className} />;
    case "card-trending":
      return <IconTrending className={className} />;
    case "card-nearby":
      return <IconNearby className={className} />;
    default:
      return null;
  }
}
