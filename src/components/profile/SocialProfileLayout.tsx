"use client";

import Link from "next/link";
import { type CSSProperties, memo, useMemo, useState, type ReactNode } from "react";
import PopitLens from "@/components/profile/PopitLens";
import FeedPostCard from "@/components/social/FeedPostCard";
import ThoughtCard from "@/components/social/ThoughtCard";
import PostCommentsSheet from "@/components/social/PostCommentsSheet";
import { useSocialActionsOptional } from "@/lib/social/SocialActionsContext";
import { getPostsForUser } from "@/lib/social/socialStore";
import { useSocialStore } from "@/lib/social/useSocialStore";
import { usePostCommentsSheet } from "@/hooks/usePostCommentsSheet";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";
import { WELCOME_LOBBY_ROUTE } from "@/lib/session";
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
  const [mode, setMode] = useState<ProfileMode>("city");
  const social = useSocialActionsOptional();
  const { like, save, repost, follow, state } = useSocialStore();
  const { commentPost, openComments, closeComments } = usePostCommentsSheet();
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

  const userPosts = useMemo(
    () => getPostsForUser(user.username),
    [user.username, state]
  );

  const popItems = userPosts;
  const cityPosts = userPosts.filter((p) => p.kind !== "reel");
  const pulseClips = userPosts.filter((p) => p.kind === "reel");

  const kindLabel = (kind: string) => {
    if (kind === "reel") return "REEL";
    if (kind === "thought") return "THOUGHT";
    if (kind === "checkin") return "CHECK-IN";
    return "POST";
  };

  return (
    <div className="profile-social" style={{ "--profile-accent": accent } as CSSProperties}>
      <div className="profile-social__topnav">
        <Link href={WELCOME_LOBBY_ROUTE} className="profile-social__topnav-btn" aria-label="Home">
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
              <button
                type="button"
                className="profile-social__side-action profile-social__side-action--live"
                onClick={() => social?.openSheet("live")}
              >
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
              <button
                type="button"
                className="profile-social__side-action profile-social__side-action--story"
                onClick={() => social?.openSheet("story")}
              >
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
            <Link href="/settings" className="profile-social__action-btn profile-social__action-btn--primary">
              Edit Profile
            </Link>
            <Link href="/feed" className="profile-social__action-btn">
              Open Feed
            </Link>
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
            {popItems.length === 0 && (
              <p className="font-body col-span-3 px-2 py-6 text-center text-sm text-white/40">
                {isOwnProfile ? "Your posts will appear here. Share from the side rail." : "No posts yet."}
              </p>
            )}
            {popItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="profile-social__pop-cell"
                style={{
                  background: `linear-gradient(145deg, ${item.mediaHue ?? accent}44, rgba(255,255,255,0.03))`,
                }}
                onClick={() => setMode("city")}
                aria-label={`View ${kindLabel(item.kind)}`}
              >
                <span className="profile-social__pop-cell-label">{kindLabel(item.kind)}</span>
                {item.text && <span className="profile-social__pop-cell-caption">{item.text.slice(0, 40)}</span>}
              </button>
            ))}
          </div>
        )}

        {mode === "city" && (
          <div className="profile-social__city-feed">
            {cityPosts.length === 0 && (
              <p className="font-body px-2 py-6 text-center text-sm text-white/40">No city posts yet.</p>
            )}
            {cityPosts.map((post) =>
              post.kind === "thought" ? (
                <ThoughtCard
                  key={post.id}
                  post={post}
                  onLike={() => like(post.id)}
                  onRepost={() => repost(post.id)}
                  onSave={() => save(post.id)}
                  onComment={() => openComments(post)}
                />
              ) : (
                <FeedPostCard
                  key={post.id}
                  post={post}
                  onLike={() => like(post.id)}
                  onRepost={() => repost(post.id)}
                  onSave={() => save(post.id)}
                  onComment={() => openComments(post)}
                />
              )
            )}
            {children}
          </div>
        )}

        {mode === "pulse" && (
          <div className="profile-social__pulse-stack">
            {pulseClips.length === 0 && (
              <p className="font-body px-2 py-6 text-center text-sm text-white/40">No Pulse clips yet.</p>
            )}
            {pulseClips.map((clip) => (
              <div
                key={clip.id}
                className="profile-social__pulse-card"
                style={{ background: `linear-gradient(160deg, ${clip.mediaHue ?? accent}44, #050505)` }}
              >
                <span className="profile-social__pulse-card-label">{clip.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <PostCommentsSheet post={commentPost} onClose={closeComments} />
    </div>
  );
}

export default memo(SocialProfileLayout);
