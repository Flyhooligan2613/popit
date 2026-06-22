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

type SideAction = {
  id: string;
  label: string;
  href?: string;
  accent?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  badge?: number;
  variant?: "create";
};

function SideRailButton({ action }: { action: SideAction }) {
  const className = [
    "city-hub-rail__btn",
    action.accent ? "city-hub-rail__btn--accent" : "",
    action.variant === "create" ? "city-hub-rail__btn--create" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  if (!user) return null;

  const accent = getIdentityAccent(user.identity);
  const msgBadge = state.conversations.reduce((sum, c) => sum + c.unread, 0);
  const alertBadge = state.notifications.filter((n) => !n.read).length;

  const rightActions: SideAction[] = [
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
      id: "create",
      label: "Create",
      variant: "create",
      accent,
      onClick: () => social?.openSheet("create"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 8v8M8 12h8" />
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

      <button
        type="button"
        className={`city-hub-rail__pull-tab ${railOpen ? "is-open" : ""}`}
        aria-expanded={railOpen}
        aria-label={railOpen ? "Hide actions menu" : "Show actions menu"}
        onClick={() => setRailOpen((open) => !open)}
      >
        <span className="city-hub-rail__pull-arrow" aria-hidden>
          {railOpen ? "›" : "‹"}
        </span>
      </button>

      <nav
        className={`city-hub-rail city-hub-rail--right app-social-chrome__rail ${railOpen ? "is-open" : "is-collapsed"}`}
        aria-label="City actions"
      >
        {rightActions.map((action) => (
          <SideRailButton key={action.id} action={action} />
        ))}
      </nav>
    </div>
  );
}

export default memo(AppSocialChrome);
