"use client";

import Link from "next/link";
import { type CSSProperties, memo, useState, type ReactNode } from "react";
import PopitLens from "@/components/profile/PopitLens";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";
import { EXPLORE_HOME_ROUTE } from "@/lib/session";
import { buildUserReputation, formatLifetimePopScore } from "@/lib/reputation/reputationEngine";

export type ProfileMode = "pop" | "city" | "pulse";

type SocialProfileLayoutProps = {
  user: UserProfile;
  isOwnProfile?: boolean;
  children?: ReactNode;
};

const TABS: { id: ProfileMode; label: string; sub: string }[] = [
  { id: "pop", label: "POP", sub: "Grid" },
  { id: "city", label: "City", sub: "Feed" },
  { id: "pulse", label: "Pulse", sub: "Clips" },
];

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function SocialProfileLayout({ user, isOwnProfile = false, children }: SocialProfileLayoutProps) {
  const [mode, setMode] = useState<ProfileMode>("pop");
  const accent = getIdentityAccent(user.identity);
  const identityLabel =
    IDENTITY_OPTIONS.find((option) => option.id === user.identity)?.label ?? "Personal";
  const reputation = buildUserReputation({
    followers: user.followers,
    following: user.following,
    popScoreRating: user.pulseScore,
    verified: user.verified,
    identity: user.identity,
    communitySince: 2024,
  });

  const popItems = Array.from({ length: 9 }, (_, i) => ({
    id: `pop-${i}`,
    tint: i % 3 === 0 ? accent : i % 3 === 1 ? "#A855F7" : "#00D4FF",
  }));

  const cityPosts = [
    { title: "Checked in at Neon Lounge", body: user.currentVibe, time: "2h ago" },
    { title: "Posted a moment in Wynwood", body: "City energy was unreal tonight.", time: "5h ago" },
    { title: "Earned a new POP milestone", body: `Level ${reputation.level} unlocked in the city.`, time: "1d ago" },
  ];

  const pulseClips = [
    { label: "Live from the district", hue: accent },
    { label: "Behind the POP lens", hue: "#A855F7" },
    { label: "City pulse recap", hue: "#00D4FF" },
  ];

  return (
    <div className="profile-social" style={{ "--profile-accent": accent } as CSSProperties}>
      <div className="profile-social__topnav">
        <Link href={EXPLORE_HOME_ROUTE} className="profile-social__topnav-btn" aria-label="Home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
          </svg>
        </Link>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          @{user.username}
        </span>
        <Link href="/settings" className="profile-social__topnav-btn" aria-label="Settings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Link>
      </div>

      <div className="profile-social__header-wrap">
        {isOwnProfile && (
          <>
            <div className="profile-social__side-rail profile-social__side-rail--left">
              <button type="button" className="profile-social__side-action profile-social__side-action--live">
                <span className="profile-social__side-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M7 12a5 5 0 0 1 10 0" />
                  </svg>
                </span>
                Go Live
              </button>
            </div>
            <div className="profile-social__side-rail profile-social__side-rail--right">
              <button type="button" className="profile-social__side-action profile-social__side-action--story">
                <span className="profile-social__side-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </span>
                Story
              </button>
            </div>
          </>
        )}

        <div className="profile-social__hero">
          <PopitLens
            name={user.name}
            followers={user.followers}
            influence={user.pulseScore}
            verified={user.verified}
            live={user.live}
            accent={accent}
            size={112}
            followersBeneath={false}
          />
          <div className="profile-social__identity">
            <h1 className="profile-social__name">{user.name}</h1>
            <p className="profile-social__meta">
              {identityLabel}
              {user.identityTopicLabel ? ` · ${user.identityTopicLabel}` : ""} · {user.city}
            </p>
            <p className="profile-social__bio">{user.currentVibe}</p>
          </div>
        </div>

        <div className="profile-social__stats">
          <div className="profile-social__stat">
            <span className="profile-social__stat-value">{formatCount(user.followers)}</span>
            <span className="profile-social__stat-label">Followers</span>
          </div>
          <div className="profile-social__stat">
            <span className="profile-social__stat-value">{formatCount(user.following)}</span>
            <span className="profile-social__stat-label">Following</span>
          </div>
          <div className="profile-social__stat">
            <span className="profile-social__stat-value">
              {formatLifetimePopScore(reputation.lifetimePopScore)}
            </span>
            <span className="profile-social__stat-label">POP Score</span>
          </div>
        </div>

        {isOwnProfile && (
          <div className="profile-social__actions-row">
            <button type="button" className="profile-social__action-btn profile-social__action-btn--primary">
              Edit Profile
            </button>
            <button type="button" className="profile-social__action-btn">
              Share POP Card
            </button>
          </div>
        )}
      </div>

      <div className="profile-social__tabs" role="tablist" aria-label="Profile sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={mode === tab.id}
            className={`profile-social__tab ${mode === tab.id ? "is-active" : ""}`}
            onClick={() => setMode(tab.id)}
          >
            {tab.label}
            <span className="profile-social__tab-sub">{tab.sub}</span>
          </button>
        ))}
      </div>

      <div className="profile-social__panel">
        {mode === "pop" && (
          <div className="profile-social__pop-grid">
            {popItems.map((item) => (
              <div
                key={item.id}
                className="profile-social__pop-cell"
                style={{ background: `linear-gradient(145deg, ${item.tint}33, rgba(255,255,255,0.03))` }}
              />
            ))}
          </div>
        )}

        {mode === "city" && (
          <div className="profile-social__city-feed">
            {cityPosts.map((post) => (
              <article key={post.title} className="profile-social__city-card">
                <div className="profile-social__city-card-head">
                  <PopitLens name={user.name} followers={user.followers} size={36} accent={accent} followersBeneath={false} />
                  <div>
                    <p className="font-body text-sm font-semibold text-white">{user.name}</p>
                    <p className="font-body text-[0.65rem] text-white/38">{post.time}</p>
                  </div>
                </div>
                <div className="profile-social__city-media" />
                <div className="profile-social__city-card-body">
                  <strong>{post.title}</strong>
                  <p className="mt-1">{post.body}</p>
                </div>
              </article>
            ))}
            {children}
          </div>
        )}

        {mode === "pulse" && (
          <div className="profile-social__pulse-stack">
            {pulseClips.map((clip) => (
              <div
                key={clip.label}
                className="profile-social__pulse-card"
                style={{ background: `linear-gradient(160deg, ${clip.hue}44, #050505)` }}
              >
                <span className="profile-social__pulse-card-label">{clip.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SocialProfileLayout);
