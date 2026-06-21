"use client";

import { memo } from "react";
import PopitLens from "@/components/profile/PopitLens";
import CreatorEconomyCard from "@/components/creator-economy/CreatorEconomyCard";
import ProfileReputationSummary from "@/components/reputation/ProfileReputationSummary";
import type { UserProfile } from "@/lib/identity/userProfile";
import type { ProfileTemplate } from "@/lib/identity/types";
import { getIdentityAccent } from "@/lib/identity/types";
import { buildUserReputation } from "@/lib/reputation/reputationEngine";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm">
      <h3 className="text-poster mb-3 text-lg uppercase tracking-wider text-white/90">{title}</h3>
      {children}
    </section>
  );
}

type ProfileIdentityExtrasProps = {
  user: UserProfile;
  template: ProfileTemplate;
};

function ProfileIdentityExtras({ user, template }: ProfileIdentityExtrasProps) {
  const accent = getIdentityAccent(user.identity);
  const reputation = buildUserReputation({
    followers: user.followers,
    following: user.following,
    popScoreRating: user.pulseScore,
    verified: user.verified,
    identity: user.identity,
    communitySince: 2024,
  });

  return (
    <div className="mt-3 flex flex-col gap-4">
      <ProfileReputationSummary
        reputation={reputation}
        followers={user.followers}
        following={user.following}
        accent={accent}
      />

      <CreatorEconomyCard
        variant={template === "creator" ? "creator" : "personal"}
        signals={{
          qualityReactions: user.followers * 0.3,
          meaningfulComments: user.following * 0.4,
          shares: user.followers * 0.08,
          saves: user.followers * 0.05,
          profileVisits: user.followers * 1.2,
          eventParticipationGenerated: Math.round(user.pulseScore * 0.6),
          restaurantVisitsInfluenced: Math.round(user.pulseScore * 0.35),
          liveStreamWatchTime: user.live ? 12000 : 2400,
          followerGrowth: Math.round(user.followers * 0.01),
          consistentPosting: 14,
          communityTrust: user.verified ? 0.88 : 0.62,
          accountAuthenticity: user.verified ? 0.92 : 0.7,
        }}
      />

      {template === "gamer" && (
        <Section title="Player Card">
          <p className="font-body text-sm text-white/70">Ranked playlists, squad highlights, and live queue status.</p>
        </Section>
      )}

      {template === "athlete" && (
        <Section title="Season Stats">
          <p className="font-body text-sm text-white/70">Game logs, training streaks, and fan momentum.</p>
        </Section>
      )}

      {template === "creator" && (
        <Section title="Creator Studio">
          <p className="font-body text-sm text-white/70">Uploads, collabs, and monetized city moments.</p>
        </Section>
      )}

      {template === "business" && (
        <Section title="Storefront">
          <p className="font-body text-sm text-white/70">Hours, offers, and customer pulse for your brand.</p>
        </Section>
      )}

      {(template === "restaurant" || template === "nightclub" || template === "dj") && (
        <Section title="Venue Pulse">
          <p className="font-body text-sm text-white/70">Live crowd energy, reservations, and tonight&apos;s vibe.</p>
        </Section>
      )}

      <Section title="Favorite Districts">
        <div className="flex flex-wrap gap-2">
          {["Wynwood", "Brickell", "South Beach", "Design District"].map((district) => (
            <span key={district} className="rounded-full border border-white/15 px-3 py-1 font-body text-xs text-white/70">
              {district}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Friends">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {["Alex", "Jordan", "Sam", "Riley"].map((friend) => (
            <div key={friend} className="flex shrink-0 flex-col items-center gap-1">
              <PopitLens name={friend} followers={1200 + friend.length * 400} size={48} accent={accent} followersBeneath={false} />
              <span className="font-body text-[0.55rem] text-white/50">{friend}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Achievements">
        <div className="flex flex-wrap gap-2">
          {["City Explorer", "Night Owl", "Pulse 90+", "District VIP"].map((badge) => (
            <span
              key={badge}
              className="rounded-lg border px-3 py-1.5 font-body text-xs"
              style={{ borderColor: `${accent}55`, color: accent }}
            >
              {badge}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default memo(ProfileIdentityExtras);
