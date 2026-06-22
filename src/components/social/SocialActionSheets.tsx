"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSocialActions } from "@/lib/social/SocialActionsContext";
import { loadUserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { createPost } from "@/lib/social/socialStore";
import {
  LIVE_SINGALONG_NOTICE,
  MUSIC_COPYRIGHT_NOTICE,
  MUSIC_GENRES,
  genreLabel,
  tracksForUsage,
} from "@/lib/social/musicLibrary";
import type { MusicGenre } from "@/lib/social/musicLibrary";

function SheetShell({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="social-sheet-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="social-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="social-sheet__head">
          <div>
            <h2 className="social-sheet__title">{title}</h2>
            {subtitle && <p className="social-sheet__subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="social-sheet__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function SocialActionSheets() {
  const {
    activeSheet,
    closeSheet,
    openSheet,
    musicUsage,
    selectedTrack,
    thoughtDraft,
    setThoughtDraft,
    selectTrack,
    confirmMusicSelection,
  } = useSocialActions();
  const router = useRouter();
  const [copyrightAck, setCopyrightAck] = useState(false);
  const [pageText, setPageText] = useState("");
  const [liveTitle, setLiveTitle] = useState("");
  const [musicGenre, setMusicGenre] = useState<MusicGenre | "all">("all");

  const resetCopyrightAck = () => setCopyrightAck(false);

  const publish = async (kind: "thought" | "page" | "reel", text: string, title?: string) => {
    const user = await loadUserProfile();
    if (!user || !text.trim()) return;
    const trackLabel = selectedTrack ? `${selectedTrack.title} · ${selectedTrack.artist}` : undefined;
    createPost({
      kind,
      text: text.trim(),
      title,
      authorUsername: user.username,
      authorName: user.name,
      authorAccent: getIdentityAccent(user.identity),
      city: user.city,
      musicTrack: trackLabel,
    });
    setThoughtDraft("");
    setPageText("");
    closeSheet();
    router.push("/feed");
  };

  return (
    <AnimatePresence>
      {activeSheet === "live" && (
        <SheetShell title="Go Live" subtitle="Broadcast from the club — sing along on camera" onClose={closeSheet}>
          <p className="social-sheet__notice">{LIVE_SINGALONG_NOTICE}</p>
          {selectedTrack && (musicUsage === "liveSingAlong" || musicUsage === "liveBackground") && (
            <p className="social-sheet__track-pill">
              🎤 Sing along · {selectedTrack.title} · {selectedTrack.artist}
            </p>
          )}
          <label className="social-sheet__label">Stream title</label>
          <input
            className="social-sheet__input"
            placeholder="What's happening in the city?"
            value={liveTitle}
            onChange={(e) => setLiveTitle(e.target.value)}
          />
          <button
            type="button"
            className="social-sheet__secondary"
            onClick={() => openSheet("music", "liveSingAlong")}
          >
            Pick Sing-Along Track
          </button>
          <button
            type="button"
            className="social-sheet__primary"
            onClick={() => publish("reel", liveTitle || "Live in the city", "Go Live")}
          >
            Start Live
          </button>
        </SheetShell>
      )}

      {activeSheet === "story" && (
        <SheetShell title="Post to Story" subtitle="24h city moment · add music optional" onClose={closeSheet}>
          <p className="social-sheet__notice">{MUSIC_COPYRIGHT_NOTICE}</p>
          {selectedTrack && musicUsage === "story" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist} · {genreLabel(selectedTrack.genre)}
            </p>
          )}
          <button type="button" className="social-sheet__secondary" onClick={closeSheet}>
            Capture Story
          </button>
          <button
            type="button"
            className="social-sheet__secondary"
            onClick={() => openSheet("music", "story")}
          >
            Add Music (All Genres)
          </button>
        </SheetShell>
      )}

      {activeSheet === "page" && (
        <SheetShell title="Post to Page" subtitle="Share on your POP card" onClose={closeSheet}>
          <textarea
            className="social-sheet__textarea"
            placeholder="Write your city update…"
            rows={4}
            value={pageText}
            onChange={(e) => setPageText(e.target.value)}
          />
          {selectedTrack && musicUsage === "page" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist}
            </p>
          )}
          <button type="button" className="social-sheet__secondary" onClick={() => openSheet("music", "page")}>
            Add Licensed Music
          </button>
          <button
            type="button"
            className="social-sheet__primary"
            onClick={() => publish("page", pageText)}
            disabled={!pageText.trim()}
          >
            Publish
          </button>
        </SheetShell>
      )}

      {activeSheet === "thought" && (
        <SheetShell title="Thought Comment" subtitle="Quick city thought from your profile" onClose={closeSheet}>
          <textarea
            className="social-sheet__textarea"
            placeholder="Drop a thought into the city…"
            rows={4}
            value={thoughtDraft}
            onChange={(e) => setThoughtDraft(e.target.value)}
          />
          {selectedTrack && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist}
            </p>
          )}
          <button
            type="button"
            className="social-sheet__primary"
            onClick={() => publish("thought", thoughtDraft)}
            disabled={!thoughtDraft.trim()}
          >
            Post Thought
          </button>
        </SheetShell>
      )}

      {activeSheet === "music" && (
        <SheetShell
          title="Music Catalog"
          subtitle={
            musicUsage === "liveSingAlong"
              ? "Sing along on camera · all genres"
              : musicUsage === "liveBackground"
                ? "Live-safe background tracks"
                : "Browse by genre · like YouTube Music"
          }
          onClose={() => {
            resetCopyrightAck();
            setMusicGenre("all");
            closeSheet();
          }}
        >
          <p className="social-sheet__notice">
            {musicUsage === "liveSingAlong" ? LIVE_SINGALONG_NOTICE : MUSIC_COPYRIGHT_NOTICE}
          </p>
          <div className="social-sheet__genres">
            <button
              type="button"
              className={`social-sheet__genre ${musicGenre === "all" ? "is-active" : ""}`}
              onClick={() => setMusicGenre("all")}
            >
              All
            </button>
            {MUSIC_GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`social-sheet__genre ${musicGenre === g.id ? "is-active" : ""}`}
                onClick={() => setMusicGenre(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <label className="social-sheet__copyright">
            <input
              type="checkbox"
              checked={copyrightAck}
              onChange={(e) => setCopyrightAck(e.target.checked)}
            />
            <span>
              I understand music rights apply to how tracks are used in stories, posts, and live
              streams. POP&apos;IT may adjust catalog access as licensing evolves.
            </span>
          </label>
          <div className="social-sheet__tracks">
            {tracksForUsage(musicUsage, musicGenre).map((track) => (
              <button
                key={track.id}
                type="button"
                className={`social-sheet__track ${selectedTrack?.id === track.id ? "is-selected" : ""}`}
                onClick={() => selectTrack(track)}
              >
                <span>
                  <strong>{track.title}</strong>
                  <small>
                    {track.artist} · {track.duration} · {genreLabel(track.genre)}
                  </small>
                  {track.note && <small className="social-sheet__track-note">{track.note}</small>}
                </span>
                <span className="social-sheet__track-badge">
                  {track.usage.liveSingAlong ? "Sing-Along" : track.usage.liveBackground ? "Live OK" : "Story"}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="social-sheet__primary"
            disabled={!selectedTrack || !copyrightAck}
            onClick={() => {
              resetCopyrightAck();
              setMusicGenre("all");
              confirmMusicSelection();
            }}
          >
            Use Track
          </button>
        </SheetShell>
      )}
    </AnimatePresence>
  );
}
