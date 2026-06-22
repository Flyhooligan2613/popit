"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMediaUrl } from "@/lib/media/mediaStorage";
import { getStoryItemsForUser } from "@/lib/social/liveStore";
import { STORY_EFFECTS } from "@/lib/social/storyEffects";
import type { StoryItem } from "@/lib/social/liveStore";

export default function StoryViewerScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("u") ?? "";
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const items = useMemo(() => (username ? getStoryItemsForUser(username) : []), [username]);
  const current: StoryItem | undefined = items[index];
  const effectClass = STORY_EFFECTS.find((e) => e.id === current?.effectId)?.previewClass ?? "";
  const mediaUrl = getMediaUrl(current?.mediaId);

  useEffect(() => {
    if (!current) return;
    setProgress(0);
    const start = Date.now();
    const duration = current.mediaType === "video" ? 12000 : 6000;
    const tick = window.setInterval(() => {
      const t = (Date.now() - start) / duration;
      setProgress(Math.min(1, t));
      if (t >= 1) {
        if (index < items.length - 1) setIndex((i) => i + 1);
        else router.back();
      }
    }, 50);
    return () => clearInterval(tick);
  }, [current, index, items.length, router]);

  if (!username || items.length === 0) {
    return (
      <div className="story-viewer story-viewer--empty">
        <p>No story available right now.</p>
        <button type="button" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="story-viewer">
      <div className="story-viewer__progress">
        {items.map((item, i) => (
          <span key={item.id} className="story-viewer__progress-seg">
            <span
              className="story-viewer__progress-fill"
              style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
            />
          </span>
        ))}
      </div>

      <button type="button" className="story-viewer__close" onClick={() => router.back()} aria-label="Close">
        ✕
      </button>

      <div className={`story-viewer__media-wrap ${effectClass}`}>
        {mediaUrl ? (
          current?.mediaType === "video" ? (
            <video src={mediaUrl} className="story-viewer__media" autoPlay playsInline muted loop />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaUrl} alt="" className="story-viewer__media" />
          )
        ) : (
          <div
            className="story-viewer__media story-viewer__media--fallback"
            style={{ background: `linear-gradient(160deg, ${current?.authorAccent}66, #050505)` }}
          />
        )}
      </div>

      <footer className="story-viewer__footer">
        <strong>{current?.authorName}</strong>
        {current?.caption && <p>{current.caption}</p>}
        {current?.musicTrack && <span>♪ {current.musicTrack}</span>}
      </footer>

      <button
        type="button"
        className="story-viewer__tap story-viewer__tap--prev"
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
        aria-label="Previous"
      />
      <button
        type="button"
        className="story-viewer__tap story-viewer__tap--next"
        onClick={() => (index < items.length - 1 ? setIndex((i) => i + 1) : router.back())}
        aria-label="Next"
      />
    </div>
  );
}
