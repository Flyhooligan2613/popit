"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import PopitLens from "@/components/profile/PopitLens";
import EngagementBar from "./EngagementBar";
import { formatCount } from "@/lib/social/socialStore";
import type { SocialPost } from "@/lib/social/types";

type ReelsFeedProps = {
  reels: SocialPost[];
  onLike: (id: string) => void;
  onRepost: (id: string) => void;
  onSave: (id: string) => void;
};

export default function ReelsFeed({ reels, onLike, onRepost, onSave }: ReelsFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || reels.length === 0) return;
    const index = Math.round(el.scrollTop / el.clientHeight);
    setActiveIndex(Math.min(index, reels.length - 1));
  }, [reels.length]);

  if (reels.length === 0) {
    return (
      <div className="reels-feed reels-feed--empty">
        <p className="font-body text-sm text-white/45">No reels yet — post a Pulse clip from the side rail.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="reels-feed" onScroll={handleScroll}>
      {reels.map((reel, i) => (
        <section key={reel.id} className="reels-feed__slide">
          <div
            className="reels-feed__video"
            style={{ background: `linear-gradient(180deg, ${reel.mediaHue ?? reel.authorAccent}66, #050505)` }}
          >
            {reel.live && <span className="reels-feed__live">LIVE · {formatCount(reel.likes)} watching</span>}
            {reel.musicTrack && <span className="reels-feed__sound">♪ {reel.musicTrack}</span>}
          </div>

          <div className="reels-feed__side">
            <Link href={`/profile/${reel.authorUsername}`} className="reels-feed__avatar">
              <PopitLens
                name={reel.authorName}
                followers={0}
                verified={reel.verified}
                live={reel.live}
                accent={reel.authorAccent}
                size={48}
                followersBeneath={false}
              />
            </Link>
            <EngagementBar
              post={reel}
              onLike={() => onLike(reel.id)}
              onRepost={() => onRepost(reel.id)}
              onSave={() => onSave(reel.id)}
              compact
            />
          </div>

          <div className="reels-feed__caption">
            <p className="reels-feed__user">@{reel.authorUsername}</p>
            <p className="reels-feed__text">{reel.text}</p>
            {reel.venue && <p className="reels-feed__venue">📍 {reel.venue}</p>}
          </div>

          {i === activeIndex && (
            <span className="reels-feed__counter" aria-hidden>
              {activeIndex + 1} / {reels.length}
            </span>
          )}
        </section>
      ))}
    </div>
  );
}
