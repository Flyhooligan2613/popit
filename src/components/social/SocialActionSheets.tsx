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
import { STORY_EFFECTS, storyEffectLabel, type StoryEffectId } from "@/lib/social/storyEffects";

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

const CREATE_OPTIONS = [
  { id: "live" as const, emoji: "🔴", label: "Go Live", hint: "Broadcast with sing-along" },
  { id: "story" as const, emoji: "✨", label: "Post to Story", hint: "24h · motion effects" },
  { id: "page" as const, emoji: "📄", label: "Post to Page", hint: "Share on your POP card" },
  { id: "reel" as const, emoji: "🎬", label: "Make Reel", hint: "Short vertical video" },
];

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
  const [reelCaption, setReelCaption] = useState("");
  const [storyEffect, setStoryEffect] = useState<StoryEffectId>("none");
  const [musicGenre, setMusicGenre] = useState<MusicGenre | "all">("all");

  const resetCopyrightAck = () => setCopyrightAck(false);

  const publish = async (kind: "thought" | "page" | "reel", text: string, title?: string) => {
    const user = await loadUserProfile();
    if (!user || !text.trim()) return;
    const trackLabel = selectedTrack ? `${selectedTrack.title} · ${selectedTrack.artist}` : undefined;
    const effectNote = storyEffect !== "none" ? ` · ${storyEffectLabel(storyEffect)}` : "";
    createPost({
      kind,
      text: text.trim(),
      title: title ? `${title}${effectNote}` : title,
      authorUsername: user.username,
      authorName: user.name,
      authorAccent: getIdentityAccent(user.identity),
      city: user.city,
      musicTrack: trackLabel,
    });
    setThoughtDraft("");
    setPageText("");
    setReelCaption("");
    setStoryEffect("none");
    closeSheet();
    router.push(kind === "reel" ? "/explore" : "/feed");
  };

  const postStory = async () => {
    const user = await loadUserProfile();
    if (!user) return;
    const trackLabel = selectedTrack ? `${selectedTrack.title} · ${selectedTrack.artist}` : undefined;
    const effect = storyEffectLabel(storyEffect);
    createPost({
      kind: "page",
      text: `Story moment · ${effect}`,
      title: `Story · ${effect}`,
      authorUsername: user.username,
      authorName: user.name,
      authorAccent: getIdentityAccent(user.identity),
      city: user.city,
      musicTrack: trackLabel,
    });
    setStoryEffect("none");
    closeSheet();
    router.push("/feed");
  };

  return (
    <AnimatePresence>
      {activeSheet === "create" && (
        <SheetShell title="Create" subtitle="Go live, story, page, or reel" onClose={closeSheet}>
          <div className="social-sheet__create-grid">
            {CREATE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="social-sheet__create-option"
                onClick={() => openSheet(opt.id)}
              >
                <span className="social-sheet__create-emoji">{opt.emoji}</span>
                <strong>{opt.label}</strong>
                <small>{opt.hint}</small>
              </button>
            ))}
          </div>
        </SheetShell>
      )}

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
        <SheetShell title="Post to Story" subtitle="24h city moment · motion & loop effects" onClose={closeSheet}>
          <p className="social-sheet__notice">{MUSIC_COPYRIGHT_NOTICE}</p>

          <label className="social-sheet__label">Motion effects</label>
          <div className="social-sheet__effects">
            {STORY_EFFECTS.map((fx) => (
              <button
                key={fx.id}
                type="button"
                className={`social-sheet__effect ${storyEffect === fx.id ? "is-selected" : ""}`}
                onClick={() => setStoryEffect(fx.id)}
              >
                <span className={`social-sheet__effect-preview ${fx.previewClass}`} aria-hidden />
                <span className="social-sheet__effect-copy">
                  <strong>{fx.label}</strong>
                  <small>{fx.description}</small>
                </span>
              </button>
            ))}
          </div>

          {selectedTrack && musicUsage === "story" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist} · {genreLabel(selectedTrack.genre)}
            </p>
          )}

          <button type="button" className="social-sheet__secondary" onClick={postStory}>
            Capture Story · {storyEffectLabel(storyEffect)}
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

      {activeSheet === "reel" && (
        <SheetShell title="Make Reel" subtitle="Short vertical clip for Explore & Feed" onClose={closeSheet}>
          <textarea
            className="social-sheet__textarea"
            placeholder="Caption your reel…"
            rows={3}
            value={reelCaption}
            onChange={(e) => setReelCaption(e.target.value)}
          />
          {selectedTrack && musicUsage === "story" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist}
            </p>
          )}
          <button type="button" className="social-sheet__secondary" onClick={() => openSheet("music", "story")}>
            Add Licensed Music
          </button>
          <button
            type="button"
            className="social-sheet__primary"
            onClick={() => publish("reel", reelCaption || "New reel in the city")}
            disabled={!reelCaption.trim()}
          >
            Publish Reel
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
