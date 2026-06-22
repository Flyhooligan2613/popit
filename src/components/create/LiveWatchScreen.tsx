"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PopitLens from "@/components/profile/PopitLens";
import {
  bumpLiveEngagement,
  getActiveLiveSession,
  getWatchCommentsForSession,
  LIVE_UPDATE_EVENT,
  simulateLiveActivity,
  type LiveSession,
} from "@/lib/social/liveStore";
import { formatCount } from "@/lib/social/socialStore";
import { findProfileByUsername } from "@/lib/identity/searchData";
import { getIdentityAccent } from "@/lib/identity/types";

type LiveWatchScreenProps = {
  username: string;
};

export default function LiveWatchScreen({ username }: LiveWatchScreenProps) {
  const router = useRouter();
  const [session, setSession] = useState<LiveSession | null>(null);
  const [comments, setComments] = useState(getWatchCommentsForSession(null));
  const [liked, setLiked] = useState(false);
  const [likeBurst, setLikeBurst] = useState(0);

  const profile = findProfileByUsername(username);

  const syncSession = () => {
    const active = getActiveLiveSession();
    if (active && active.broadcasterUsername.toLowerCase() === username.toLowerCase()) {
      setSession(active);
      setComments(getWatchCommentsForSession(active));
    } else {
      setSession(null);
      setComments([]);
    }
  };

  useEffect(() => {
    syncSession();
    window.addEventListener(LIVE_UPDATE_EVENT, syncSession);
    return () => window.removeEventListener(LIVE_UPDATE_EVENT, syncSession);
  }, [username]);

  useEffect(() => {
    if (!session) return;
    const tick = window.setInterval(() => {
      simulateLiveActivity(session.id);
      const next = getActiveLiveSession();
      if (next) {
        setSession(next);
        setComments(getWatchCommentsForSession(next));
      }
    }, 5000);
    return () => clearInterval(tick);
  }, [session]);

  const name = session?.broadcasterName ?? profile?.name ?? username;
  const accent = session?.broadcasterAccent ?? (profile ? getIdentityAccent(profile.identity) : "#FF4D6D");
  const title = session?.title ?? `${name} is live`;
  const viewers = session?.viewerCount ?? 0;
  const likes = (session?.likeCount ?? 0) + likeBurst;

  const sendHeart = () => {
    setLiked(true);
    setLikeBurst((n) => n + 1);
    if (session) bumpLiveEngagement(session.id, 1);
  };

  if (!session) {
    return (
      <div className="live-screen live-screen--watch flex flex-col items-center justify-center gap-4 px-6">
        <p className="font-body text-sm text-white/60">This broadcast has ended or is not available.</p>
        <Link href="/live" className="font-body text-sm text-[#FF4D6D] hover:underline">
          Back to POPIT Live
        </Link>
        <button type="button" className="font-body text-sm text-white/45 hover:underline" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="live-screen live-screen--watch">
      <div
        className="live-screen__video-wrap live-screen__video-wrap--placeholder"
        style={{
          background: `linear-gradient(165deg, ${accent}55 0%, #050505 45%, ${accent}22 100%)`,
        }}
      >
        <div className="live-screen__gradient" aria-hidden />
        <div className="live-screen__watch-badge">LIVE</div>
      </div>

      <header className="live-screen__top">
        <button type="button" className="live-screen__icon-btn" onClick={() => router.back()} aria-label="Close">
          ✕
        </button>
        <Link href={`/profile/${username}`} className="live-screen__host">
          <PopitLens name={name} followers={profile?.followers ?? 0} accent={accent} size={36} followersBeneath={false} live />
          <div>
            <strong>{name}</strong>
            <span>{title}</span>
          </div>
        </Link>
        <div className="live-screen__stats">
          <span className="live-screen__live-pill">LIVE</span>
          <span>{formatCount(viewers)}</span>
        </div>
      </header>

      <div className="live-screen__comments" aria-live="polite">
        {comments.slice(-8).map((c) => (
          <p key={c.id} className="live-screen__comment">
            <strong>{c.name}</strong> {c.text}
          </p>
        ))}
      </div>

      <aside className="live-screen__rail">
        <button type="button" className={`live-screen__rail-btn ${liked ? "is-active" : ""}`} onClick={sendHeart} aria-label="Like">
          ❤️
          <span>{formatCount(likes)}</span>
        </button>
        <button type="button" className="live-screen__rail-btn" aria-label="Gift">
          🎁
        </button>
        <button type="button" className="live-screen__rail-btn" aria-label="Share">
          ↗
        </button>
        <Link href={`/profile/${username}`} className="live-screen__rail-btn" aria-label="Profile">
          👤
        </Link>
      </aside>

      <footer className="live-screen__bottom">
        <input className="live-screen__comment-input" placeholder="Say something…" readOnly />
        <button type="button" className="live-screen__follow-btn">
          Follow
        </button>
      </footer>
    </div>
  );
}
