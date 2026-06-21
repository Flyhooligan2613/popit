"use client";

import { useCallback, useEffect, useState } from "react";
import PullToRefresh from "@/components/ui/PullToRefresh";
import LivingCityBackground from "./LivingCityBackground";
import CityDistricts from "./CityDistricts";
import PulseHero from "./PulseHero";
import CityIdentityBar from "./CityIdentityBar";
import CommentThread from "@/components/comments/CommentThread";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";

export default function ThePulse() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  const handleRefresh = useCallback(async () => {
    const profile = await loadUserProfile();
    setUser(profile);
    setFeedKey((key) => key + 1);
    await new Promise((resolve) => window.setTimeout(resolve, 600));
  }, []);

  return (
    <PullToRefresh onRefresh={handleRefresh} className="absolute inset-0 overflow-y-auto">
      <LivingCityBackground />

      <div className="pointer-events-none fixed right-4 top-4 z-20">
        {user && <CityIdentityBar user={user} />}
      </div>

      <div className="relative z-[1] mx-auto max-w-[680px] px-4 pb-28 pt-10">
        <PulseHero key={feedKey} />
        <CityDistricts key={`districts-${feedKey}`} />
        <div className="mt-5">
          <CommentThread key={feedKey} />
        </div>
      </div>
    </PullToRefresh>
  );
}
