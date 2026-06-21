"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSocialActions } from "@/lib/social/SocialActionsContext";
import {
  LIVE_MUSIC_NOTICE,
  MUSIC_COPYRIGHT_NOTICE,
  tracksForUsage,
} from "@/lib/social/musicLibrary";

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
  const [copyrightAck, setCopyrightAck] = useState(false);

  const resetCopyrightAck = () => setCopyrightAck(false);

  return (
    <AnimatePresence>
      {activeSheet === "live" && (
        <SheetShell title="Go Live" subtitle="Broadcast to the city" onClose={closeSheet}>
          <p className="social-sheet__notice">{LIVE_MUSIC_NOTICE}</p>
          <label className="social-sheet__label">Stream title</label>
          <input className="social-sheet__input" placeholder="What's happening in the city?" />
          <button type="button" className="social-sheet__primary" onClick={closeSheet}>
            Start Live
          </button>
        </SheetShell>
      )}

      {activeSheet === "story" && (
        <SheetShell title="Post to Story" subtitle="24h city moment" onClose={closeSheet}>
          <p className="social-sheet__notice">{MUSIC_COPYRIGHT_NOTICE}</p>
          {selectedTrack && musicUsage === "story" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist}
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
            Add Licensed Music
          </button>
        </SheetShell>
      )}

      {activeSheet === "page" && (
        <SheetShell title="Post to Page" subtitle="Share on your POP card" onClose={closeSheet}>
          <textarea className="social-sheet__textarea" placeholder="Write your city update…" rows={4} />
          {selectedTrack && musicUsage === "page" && (
            <p className="social-sheet__track-pill">
              ♪ {selectedTrack.title} · {selectedTrack.artist}
            </p>
          )}
          <button type="button" className="social-sheet__secondary" onClick={() => openSheet("music", "page")}>
            Add Licensed Music
          </button>
          <button type="button" className="social-sheet__primary" onClick={closeSheet}>
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
          <button type="button" className="social-sheet__primary" onClick={closeSheet}>
            Post Thought
          </button>
        </SheetShell>
      )}

      {activeSheet === "music" && (
        <SheetShell
          title="Add Music"
          subtitle={
            musicUsage === "liveBackground"
              ? "Live-safe tracks only"
              : "Licensed for thoughts, stories, and posts"
          }
          onClose={() => {
            resetCopyrightAck();
            closeSheet();
          }}
        >
          <p className="social-sheet__notice">{MUSIC_COPYRIGHT_NOTICE}</p>
          <label className="social-sheet__copyright">
            <input
              type="checkbox"
              checked={copyrightAck}
              onChange={(e) => setCopyrightAck(e.target.checked)}
            />
            <span>
              I understand licensed sync tracks cannot be used in live video backgrounds. POP&apos;IT
              may remove content that violates music rights.
            </span>
          </label>
          <div className="social-sheet__tracks">
            {tracksForUsage(musicUsage).map((track) => (
              <button
                key={track.id}
                type="button"
                className={`social-sheet__track ${selectedTrack?.id === track.id ? "is-selected" : ""}`}
                onClick={() => selectTrack(track)}
              >
                <span>
                  <strong>{track.title}</strong>
                  <small>{track.artist} · {track.duration}</small>
                  {track.note && <small className="social-sheet__track-note">{track.note}</small>}
                </span>
                <span className="social-sheet__track-badge">
                  {track.usage.liveBackground ? "Live OK" : "No Live BG"}
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
