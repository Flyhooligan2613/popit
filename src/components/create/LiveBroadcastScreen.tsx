"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PopitLens from "@/components/profile/PopitLens";
import { loadUserProfile, saveUserProfile, type UserProfile } from "@/lib/identity/userProfile";
import { endLiveForCurrentUser } from "@/lib/identity/liveProfileSync";
import { getIdentityAccent } from "@/lib/identity/types";
import {
  requestLiveMedia,
  stopMediaStream,
  switchCameraStream,
  type FacingMode,
} from "@/lib/media/mediaCapture";
import {
  addLiveComment,
  bumpLiveEngagement,
  getActiveLiveSession,
  simulateLiveActivity,
  startLiveSession,
} from "@/lib/social/liveStore";
import { createPost } from "@/lib/social/socialStore";
import { formatCount } from "@/lib/social/socialStore";

export default function LiveBroadcastScreen() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<ReturnType<typeof startLiveSession> | null>(null);

  const [facing, setFacing] = useState<FacingMode>("user");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<{ id: string; name: string; text: string }[]>([]);
  const [commentDraft, setCommentDraft] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const bindStream = useCallback((mediaStream: MediaStream) => {
    stopMediaStream(streamRef.current);
    streamRef.current = mediaStream;
    setStream(mediaStream);
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      void videoRef.current.play().catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    loadUserProfile().then(setUser);
    void (async () => {
      const result = await requestLiveMedia();
      if (!result.ok || !result.stream) {
        setError(result.error ?? "Could not access camera.");
        return;
      }
      bindStream(result.stream);
    })();
    return () => {
      stopMediaStream(streamRef.current);
      if (sessionRef.current) {
        endLiveForCurrentUser();
      }
    };
  }, [bindStream]);

  useEffect(() => {
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }, [muted]);

  useEffect(() => {
    if (!isLive || !sessionRef.current) return;
    const sessionId = sessionRef.current.id;
    const sync = () => {
      const s = getActiveLiveSession();
      if (!s) return;
      setViewerCount(s.viewerCount);
      setLikeCount(s.likeCount);
      setComments(s.comments.map((c) => ({ id: c.id, name: c.name, text: c.text })));
    };
    sync();
    const tick = window.setInterval(() => {
      simulateLiveActivity(sessionId);
      sync();
    }, 4500);
    return () => clearInterval(tick);
  }, [isLive]);

  const flipCamera = async () => {
    const next: FacingMode = facing === "user" ? "environment" : "user";
    const result = await switchCameraStream(streamRef.current, next, true);
    if (result.ok && result.stream) {
      setFacing(next);
      bindStream(result.stream);
    }
  };

  const goLive = async () => {
    if (!user || !stream) {
      setError("Enable camera & mic before going live.");
      return;
    }
    const liveTitle = title.trim() || "Live in the city";
    saveUserProfile({ live: true });
    const session = startLiveSession({
      broadcasterUsername: user.username,
      broadcasterName: user.name,
      broadcasterAccent: getIdentityAccent(user.identity),
      title: liveTitle,
      city: user.city,
    });
    sessionRef.current = session;
    createPost({
      kind: "reel",
      text: liveTitle,
      title: "Go Live",
      authorUsername: user.username,
      authorName: user.name,
      authorAccent: getIdentityAccent(user.identity),
      city: user.city,
    });
    setIsLive(true);
    setViewerCount(session.viewerCount);
  };

  const endLive = async () => {
    stopMediaStream(streamRef.current);
    endLiveForCurrentUser();
    setIsLive(false);
    sessionRef.current = null;
    router.push("/live");
  };

  const sendComment = () => {
    if (!commentDraft.trim() || !sessionRef.current || !user) return;
    addLiveComment(sessionRef.current.id, {
      username: user.username,
      name: user.name,
      text: commentDraft.trim(),
    });
    setCommentDraft("");
    setComments((prev) => [...prev.slice(-20), { id: `me-${Date.now()}`, name: user.name, text: commentDraft.trim() }]);
  };

  const accent = user ? getIdentityAccent(user.identity) : "#FF4D6D";

  return (
    <div className="live-screen live-screen--broadcast">
      <div className="live-screen__video-wrap">
        {error && !stream ? (
          <div className="live-screen__error">
            <p>{error}</p>
            <Link href="/settings/permissions">Open permissions</Link>
          </div>
        ) : (
          <video
            ref={videoRef}
            className={`live-screen__video ${facing === "user" ? "is-mirror" : ""} ${cameraOff ? "is-off" : ""}`}
            autoPlay
            playsInline
            muted
          />
        )}
        <div className="live-screen__gradient" aria-hidden />
      </div>

      <header className="live-screen__top">
        {!isLive ? (
          <button type="button" className="live-screen__icon-btn" onClick={() => router.back()} aria-label="Close">
            ✕
          </button>
        ) : (
          <div className="live-screen__host">
            {user && (
              <PopitLens
                name={user.name}
                followers={user.followers}
                accent={accent}
                size={36}
                followersBeneath={false}
              />
            )}
            <div>
              <strong>{user?.name ?? "You"}</strong>
              <span>{title.trim() || "Live in the city"}</span>
            </div>
          </div>
        )}
        {isLive && (
          <div className="live-screen__stats">
            <span className="live-screen__live-pill">LIVE</span>
            <span>{formatCount(viewerCount)} watching</span>
          </div>
        )}
      </header>

      {isLive && (
        <div className="live-screen__comments" aria-live="polite">
          {comments.slice(-6).map((c) => (
            <p key={c.id} className="live-screen__comment">
              <strong>{c.name}</strong> {c.text}
            </p>
          ))}
        </div>
      )}

      <aside className="live-screen__rail">
        <button type="button" className="live-screen__rail-btn" onClick={() => bumpLiveEngagement(sessionRef.current!.id, 3)} aria-label="Send hearts">
          ❤️
          <span>{formatCount(likeCount)}</span>
        </button>
        <button type="button" className="live-screen__rail-btn" onClick={() => void flipCamera()} aria-label="Flip camera">
          🔄
        </button>
        <button type="button" className="live-screen__rail-btn" onClick={() => setMuted((m) => !m)} aria-label="Toggle mic">
          {muted ? "🔇" : "🎙"}
        </button>
        <button type="button" className="live-screen__rail-btn" onClick={() => setCameraOff((c) => !c)} aria-label="Toggle camera">
          {cameraOff ? "📷" : "🎥"}
        </button>
        <button type="button" className="live-screen__rail-btn" aria-label="Share">
          ↗
        </button>
      </aside>

      <footer className="live-screen__bottom">
        {!isLive ? (
          <>
            <input
              className="live-screen__title-input"
              placeholder="What's happening in the city?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="live-screen__pre-actions">
              <button type="button" className="live-screen__secondary" onClick={() => void flipCamera()}>
                Flip
              </button>
              <button type="button" className="live-screen__go-live" onClick={() => void goLive()} disabled={!stream}>
                Go Live
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              className="live-screen__comment-input"
              placeholder="Reply to viewers…"
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendComment()}
            />
            <button type="button" className="live-screen__end-btn" onClick={() => void endLive()}>
              End Live
            </button>
          </>
        )}
      </footer>
    </div>
  );
}
