"use client";

import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import { markStoryViewed } from "@/lib/social/socialStore";
import type { StoryRing } from "@/lib/social/types";
import { useSocialActionsOptional } from "@/lib/social/SocialActionsContext";

type StoriesStripProps = {
  stories: StoryRing[];
  onView?: () => void;
};

export default function StoriesStrip({ stories, onView }: StoriesStripProps) {
  const social = useSocialActionsOptional();

  const handleStory = (story: StoryRing) => {
    if (story.isOwn) {
      social?.openSheet("story");
      return;
    }
    markStoryViewed(story.id);
    onView?.();
  };

  return (
    <div className="stories-strip" aria-label="Stories">
      <div className="stories-strip__track">
        {stories.map((story) => (
          <button
            key={story.id}
            type="button"
            className="stories-strip__item"
            onClick={() => handleStory(story)}
            aria-label={`${story.name} story`}
          >
            <span
              className={`stories-strip__ring ${story.viewed && !story.isOwn ? "is-viewed" : ""} ${story.isLive ? "is-live" : ""}`}
              style={{ "--story-accent": story.accent } as React.CSSProperties}
            >
              {story.isOwn ? (
                <span className="stories-strip__own">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </span>
              ) : (
                <PopitLens
                  name={story.name}
                  followers={0}
                  verified={story.verified}
                  live={story.isLive}
                  accent={story.accent}
                  size={54}
                  followersBeneath={false}
                />
              )}
            </span>
            <span className="stories-strip__name">{story.isOwn ? "Your Story" : story.name.split(" ")[0]}</span>
            {story.isLive && <span className="stories-strip__live">LIVE</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StoryViewerPlaceholder({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="story-viewer">
      <div className="story-viewer__progress">
        <span className="story-viewer__bar is-active" />
      </div>
      <div className="story-viewer__head">
        <strong>{name}</strong>
        <button type="button" onClick={onClose} aria-label="Close story">
          ×
        </button>
      </div>
      <div className="story-viewer__body">
        <p className="story-viewer__hint">24h city moment · tap sides to skip</p>
      </div>
    </div>
  );
}
