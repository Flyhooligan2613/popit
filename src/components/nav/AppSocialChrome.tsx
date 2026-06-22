"use client";

import Link from "next/link";
import { memo, useEffect, useState } from "react";
import SidePopScoresDock from "@/components/nav/SidePopScoresDock";
import WeatherCornerButton from "@/components/nav/WeatherCornerButton";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { WELCOME_LOBBY_ROUTE } from "@/lib/session";
import { useSocialStore } from "@/lib/social/useSocialStore";
import { useSocialActionsOptional } from "@/lib/social/SocialActionsContext";
import type { MusicUsage } from "@/lib/social/musicLibrary";

type SideAction = {
  id: string;
  label: string;
  href?: string;
  accent?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  badge?: number;
};

function SideRailButton({ action }: { action: SideAction }) {
  const className = `city-hub-rail__btn ${action.accent ? "city-hub-rail__btn--accent" : ""}`;
  const inner = (
    <>
      <span className="city-hub-rail__icon">
        {action.icon}
        {action.badge ? <span className="city-hub-rail__badge">{action.badge}</span> : null}
      </span>
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

function AppSocialChrome() {
  const social = useSocialActionsOptional();
  const { state } = useSocialStore();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  if (!user) return null;

  const accent = getIdentityAccent(user.identity);
  const msgBadge = state.conversations.reduce((sum, c) => sum + c.unread, 0);
  const alertBadge = state.notifications.filter((n) => !n.read).length;

  const open = (sheet: "live" | "story" | "page" | "thought" | "music", musicUsage?: MusicUsage) => {
    social?.openSheet(sheet, musicUsage);
  };

  const rightActions: SideAction[] = [
    {
      id: "feed",
      label: "Feed",
      href: "/feed",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "home",
      label: "Home",
      href: WELCOME_LOBBY_ROUTE,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      ),
    },
    {
      id: "city",
      label: "Your City",
      href: "/pulse",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        </svg>
      ),
    },
    {
      id: "live",
      label: "Go Live",
      accent: "#FF4D6D",
      onClick: () => open("live"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M7 12a5 5 0 0 1 10 0" />
        </svg>
      ),
    },
    {
      id: "story",
      label: "Story",
      accent,
      onClick: () => open("story"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      id: "page",
      label: "Page",
      onClick: () => open("page"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      ),
    },
    {
      id: "inbox",
      label: "Inbox",
      href: "/messages",
      badge: msgBadge,
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
      id: "alerts",
      label: "Alerts",
      href: "/notifications",
      badge: alertBadge,
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
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="app-social-chrome" aria-hidden={false}>
      <WeatherCornerButton />
      <SidePopScoresDock user={user} />

      <nav className="city-hub-rail city-hub-rail--right app-social-chrome__rail" aria-label="City actions">
        {rightActions.map((action) => (
          <SideRailButton key={action.id} action={action} />
        ))}
      </nav>
    </div>
  );
}

export default memo(AppSocialChrome);
