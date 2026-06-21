"use client";

import type { UserReputation } from "@/lib/reputation/types";
import { formatLifetimePopScore } from "@/lib/reputation/reputationEngine";
import PopMark from "@/components/pop-marks/PopMark";
import { formatCompactCount } from "@/lib/reputation/reputationEngine";

type ProfileReputationSummaryProps = {
  reputation: UserReputation;
  followers: number;
  following: number;
  accent?: string;
};

type StatRow = { label: string; value: string | number };

export default function ProfileReputationSummary({
  reputation,
  followers,
  following,
  accent = "#A855F7",
}: ProfileReputationSummaryProps) {
  const rows: StatRow[] = [
    { label: "Helpful Reviews", value: formatCompactCount(reputation.helpfulReviews) },
    { label: "Positive Community Rating", value: `${reputation.positiveCommunityRating.toFixed(0)}%` },
    { label: "Live Streams", value: formatCompactCount(reputation.liveStreams) },
    { label: "Events Attended", value: formatCompactCount(reputation.eventsAttended) },
    { label: "Businesses Supported", value: formatCompactCount(reputation.businessesSupported) },
    { label: "Photos Shared", value: formatCompactCount(reputation.photosShared) },
    { label: "Comments Posted", value: formatCompactCount(reputation.commentsPosted) },
    { label: "Followers", value: formatCompactCount(followers) },
    { label: "Following", value: formatCompactCount(following) },
    { label: "Community Since", value: reputation.communitySince },
  ];

  return (
    <section className="profile-reputation" style={{ "--rep-accent": accent } as React.CSSProperties}>
      <header className="profile-reputation__header">
        <h3 className="profile-reputation__title">Reputation Summary</h3>
        <p className="profile-reputation__tagline">The community knows who you are</p>
      </header>

      <div className="profile-reputation__hero">
        <div className="profile-reputation__score-block">
          <span className="profile-reputation__label">POP Score</span>
          <span className="profile-reputation__score">{formatLifetimePopScore(reputation.lifetimePopScore)}</span>
        </div>
        <div className="profile-reputation__level-block">
          <span className="profile-reputation__label">Level</span>
          <span className="profile-reputation__level">
            {reputation.level} – {reputation.levelTitle}
          </span>
          {reputation.popMark && (
            <span className="profile-reputation__mark">
              <PopMark tier={reputation.popMark} size={24} animate={false} interactive={false} />
            </span>
          )}
        </div>
      </div>

      <div className="profile-reputation__trust-row">
        {reputation.trustLabel && (
          <span className="profile-reputation__trust-badge">{reputation.trustLabel}</span>
        )}
        <span className="profile-reputation__achievements">{reputation.achievementCount} achievements</span>
        <span className="profile-reputation__tenure">
          {reputation.yearsOnPlatform} yr{reputation.yearsOnPlatform === 1 ? "" : "s"} on POP&apos;IT
        </span>
      </div>

      <dl className="profile-reputation__grid">
        {rows.map((row) => (
          <div key={row.label} className="profile-reputation__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
