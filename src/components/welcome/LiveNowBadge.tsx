"use client";

type LiveNowBadgeProps = {
  exploringCount: number;
};

export default function LiveNowBadge({ exploringCount }: LiveNowBadgeProps) {
  return (
    <div className="live-now-badge">
      <span className="live-now-pill font-body">
        <span className="live-now-dot" aria-hidden />
        LIVE NOW
      </span>
      <span className="live-now-count font-display">{exploringCount.toLocaleString()} Exploring</span>
    </div>
  );
}
