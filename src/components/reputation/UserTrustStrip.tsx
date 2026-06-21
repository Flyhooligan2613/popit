"use client";

import Link from "next/link";
import PopMark from "@/components/pop-marks/PopMark";
import PopitLens from "@/components/profile/PopitLens";
import type { UserReputation } from "@/lib/reputation/types";
import { formatLifetimePopScore } from "@/lib/reputation/reputationEngine";
import { POP_MARK_CONFIG } from "@/lib/pop-marks/types";
import type { PopMarkTier } from "@/lib/pop-marks/types";

type UserTrustStripProps = {
  username: string;
  displayName: string;
  reputation: UserReputation;
  accent?: string;
  profileHref?: string;
  compact?: boolean;
  showAchievements?: boolean;
};

function markColorLabel(tier: PopMarkTier): string {
  const key = tier === "diamond" ? "legend" : tier;
  const title = POP_MARK_CONFIG[key as keyof typeof POP_MARK_CONFIG]?.title ?? "";
  if (title.includes("Gold")) return "Gold";
  if (title.includes("Green")) return "Green";
  if (title.includes("Blue")) return "Blue";
  if (title.includes("Legend")) return "Legend";
  if (title.includes("ICON")) return "ICON";
  return title.replace(" POP Mark", "");
}

export default function UserTrustStrip({
  username,
  displayName,
  reputation,
  accent = "#A855F7",
  profileHref,
  compact = false,
  showAchievements = false,
}: UserTrustStripProps) {
  const href = profileHref ?? `/profile/${username}`;

  return (
    <div className={`user-trust-strip ${compact ? "is-compact" : ""}`}>
      <div className="user-trust-strip__head">
        <Link href={href} className="user-trust-strip__name">
          @{username}
        </Link>
        {reputation.popMark && (
          <span className="user-trust-strip__mark-row">
            <PopMark tier={reputation.popMark} size={16} animate={false} interactive={false} />
            <span className="user-trust-strip__mark-label">
              {markColorLabel(reputation.popMark)} POP Mark
            </span>
          </span>
        )}
      </div>
      <p className="user-trust-strip__stats">
        POP Score: <strong>{formatLifetimePopScore(reputation.lifetimePopScore)}</strong>
        <span className="user-trust-strip__dot" aria-hidden>
          •
        </span>
        Level {reputation.level}
        {reputation.trustLabel && (
          <>
            <span className="user-trust-strip__dot" aria-hidden>
              •
            </span>
            <span className="user-trust-strip__trust" style={{ color: accent }}>
              {reputation.trustLabel}
            </span>
          </>
        )}
      </p>
      {showAchievements && (
        <p className="user-trust-strip__meta">
          {reputation.achievementCount} achievements · {reputation.yearsOnPlatform} yr
          {reputation.yearsOnPlatform === 1 ? "" : "s"} on POP&apos;IT
        </p>
      )}
      <span className="sr-only">{displayName}</span>
    </div>
  );
}
