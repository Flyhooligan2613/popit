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
      <ellipse cx="24" cy="38" rx="12" ry="3" fill="rgba(168,85,247,0.3)" />
      <path
        d="M18 14h12l-1.5 18H19.5L18 14z"
        fill="url(#night-glass)"
        stroke="#c084fc"
        strokeWidth="1.2"
      />
      <path d="M20 18h8v2H20v-2z" fill="#ff4d6d" opacity="0.85" />
      <circle cx="24" cy="12" r="2.5" fill="#00d4ff" filter="url(#night-glow)" />
      <path d="M10 8l3-2M38 8l-3-2" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <defs>
        <linearGradient id="night-glass" x1="18" y1="14" x2="30" y2="32">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="night-glow">
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
