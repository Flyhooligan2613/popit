"use client";

import PopitLens from "@/components/profile/PopitLens";
import PopSearchBar from "@/components/nav/PopSearchBar";
import { markStoryViewed } from "@/lib/social/socialStore";
import type { StoryRing } from "@/lib/social/types";
import { useSocialActionsOptional } from "@/lib/social/SocialActionsContext";

type StoriesStripProps = {
  stories: StoryRing[];
  onView?: () => void;
};

export default function StoriesStrip({ stories, onView }: StoriesStripProps) {
  const social = useSocialActionsOptional();
  const ownStory = stories.find((s) => s.isOwn);
  const otherStories = stories.filter((s) => !s.isOwn);

  const handleStory = (story: StoryRing) => {
    if (story.isOwn) {
      social?.openSheet("story");
      return;
    }
    markStoryViewed(story.id);
    onView?.();
  };

  return (
    <div className="stories-zone" aria-label="Stories and search">
      <PopSearchBar />

      <div className="stories-strip">
        <div className="stories-strip__track">
          <button
            type="button"
            className="stories-strip__item"
            onClick={() => social?.openSheet("thought")}
            aria-label="Post a thought"
          >
            <span className="stories-strip__ring stories-strip__ring--thought">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="stories-strip__name">Thought</span>
          </button>

          {ownStory && (
            <button
              type="button"
              className="stories-strip__item"
              onClick={() => handleStory(ownStory)}
              aria-label="Your story"
            >
              <span className="stories-strip__ring stories-strip__ring--own">
                <span className="stories-strip__own">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </span>
              </span>
              <span className="stories-strip__name">Your Story</span>
            </button>
          )}

          {otherStories.map((story) => (
            <button
              key={story.id}
              type="button"
              className="stories-strip__item"
              onClick={() => handleStory(story)}
              aria-label={`${story.name} story`}
            >
              <span
                className={`stories-strip__ring ${story.viewed ? "is-viewed" : ""} ${story.isLive ? "is-live" : ""}`}
                style={{ "--story-accent": story.accent } as React.CSSProperties}
              >
                <PopitLens
                  name={story.name}
                  followers={0}
                  verified={story.verified}
                  live={story.isLive}
                  accent={story.accent}
                  size={54}
                  followersBeneath={false}
                />
              </span>
              <span className="stories-strip__name">{story.name.split(" ")[0]}</span>
              {story.isLive && <span className="stories-strip__live">LIVE</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
