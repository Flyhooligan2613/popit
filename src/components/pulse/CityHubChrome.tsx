"use client";

import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/navigation";
import LensProfileTransition from "@/components/profile/LensProfileTransition";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { createModeRoute } from "@/lib/social/createRoutes";
import { EXPLORE_HOME_ROUTE } from "@/lib/session";

type SideAction = {
  id: string;
  label: string;
  href?: string;
  accent?: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

function SideRailButton({ action }: { action: SideAction }) {
  const className = `city-hub-rail__btn ${action.accent ? "city-hub-rail__btn--accent" : ""}`;

  const inner = (
    <>
      <span className="city-hub-rail__icon">{action.icon}</span>
      <span className="city-hub-rail__label">{action.label}</span>
    </>
  );

  if (action.href) {
    return (
      <Link href={action.href} aria-label={action.label} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={action.label} className={className} onClick={action.onClick}>
      {inner}
    </button>
  );
}

type CityHubChromeProps = {
  user: UserProfile;
  children: React.ReactNode;
};

function CityHubChrome({ user, children }: CityHubChromeProps) {
  const accent = getIdentityAccent(user.identity);
  const router = useRouter();

  const rightActions: SideAction[] = [
    {
      id: "home",
      label: "Explore Home",
      href: EXPLORE_HOME_ROUTE,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      ),
    },
    {
      id: "live",
      label: "Go Live",
      accent: "#FF4D6D",
      onClick: () => router.push(createModeRoute("live")),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M7 12a5 5 0 0 1 10 0" />
        </svg>
      ),
    },
    {
      id: "story",
      label: "Add Story",
      accent,
      onClick: () => router.push(createModeRoute("story")),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      id: "inbox",
      label: "Inbox",
      href: "/messages",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      href: "/search",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Alerts",
      href: "/notifications",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      href: "/settings",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
  ];

  return (
    <div className="city-hub">
      <aside className="city-hub-dock city-hub-dock--left" aria-label="Your profile">
        <LensProfileTransition
          user={user}
          accent={accent}
          href="/pulse#profile"
          size={92}
          allowPhotoChange
        />
        <p className="city-hub-dock__name">{user.name.split(" ")[0]}</p>
        <p className="city-hub-dock__city">{user.city}</p>
      </aside>

      <nav className="city-hub-rail city-hub-rail--right" aria-label="City actions">
        {rightActions.map((action) => (
          <SideRailButton key={action.id} action={action} />
        ))}
      </nav>

      <div className="city-hub-main">{children}</div>
    </div>
  );
}

export default memo(CityHubChrome);
