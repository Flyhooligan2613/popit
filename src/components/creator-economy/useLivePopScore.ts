"use client";

import { useEffect, useState } from "react";
import { buildCreatorEconomyProfile, buildDemoEconomyProfile } from "@/lib/creator-economy/buildProfile";
import type { CreatorEconomyProfile } from "@/lib/creator-economy/types";

export function useLivePopScore(reducedMotion: boolean): CreatorEconomyProfile {
  const [profile, setProfile] = useState(() => buildDemoEconomyProfile());

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setProfile((prev) => {
        const s = prev.popScore.signals;
        return buildCreatorEconomyProfile({
          qualityReactions: s.qualityReactions * 12_000 + Math.random() * 80,
          meaningfulComments: s.meaningfulComments * 800 + Math.random() * 3,
          shares: s.shares * 2_500 + Math.random() * 6,
          saves: s.saves * 1_800 + Math.random() * 4,
          profileVisits: s.profileVisits * 5_000 + 12,
          eventParticipationGenerated:
            s.eventParticipationGenerated * 400 + (Math.random() > 0.7 ? 1 : 0),
          restaurantVisitsInfluenced:
            s.restaurantVisitsInfluenced * 250 + (Math.random() > 0.82 ? 1 : 0),
          liveStreamWatchTime: s.liveStreamWatchTime * 50_000 + 40,
          followerGrowth: s.followerGrowth * 600 + 1,
          consistentPosting: 18,
          communityTrust: Math.min(0.98, s.communityTrust + 0.002),
          accountAuthenticity: 0.82,
        });
      });
    }, 7500);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  return profile;
}
