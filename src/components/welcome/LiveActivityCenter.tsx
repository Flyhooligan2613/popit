"use client";

import type { ActivityItem } from "./types";

type LiveActivityCenterProps = {
  items: ActivityItem[];
  speedSec: number;
  reducedMotion: boolean;
};

export default function LiveActivityCenter({ items, speedSec, reducedMotion }: LiveActivityCenterProps) {
  const loop = [...items, ...items];

  return (
    <section className="live-activity" aria-label="Live activity center">
      <div className="live-activity-header">
        <span className="live-activity-chevron" aria-hidden>
          ◀▶
        </span>
        <h2 className="live-activity-title font-display">Live Activity</h2>
        <span className="live-activity-chevron" aria-hidden>
          ◀▶
        </span>
      </div>

      <div className="live-activity-viewport">
        <div
          className={`live-activity-track ${reducedMotion ? "is-paused" : ""}`}
          style={{ "--marquee-duration": `${speedSec}s` } as Record<string, string>}
        >
          {loop.map((item, i) => (
            <article key={`${item.id}-${i}`} className="live-activity-item">
              <p className="live-activity-text font-body">
                {item.icon} {item.text}
              </p>
              <span className="live-activity-time">{item.time}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
