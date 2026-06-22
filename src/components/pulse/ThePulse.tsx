"use client";

import { useCallback, useEffect, useState } from "react";
import PullToRefresh from "@/components/ui/PullToRefresh";
import ProfileIdentityExtras from "@/components/profile/ProfileIdentityExtras";
import { getProfileTemplate } from "@/lib/identity/types";
import LivingCityBackground from "./LivingCityBackground";
import CityDistricts from "./CityDistricts";
import CityProfileHero from "./CityProfileHero";
import CommentThread from "@/components/comments/CommentThread";
import StoriesStrip from "@/components/social/StoriesStrip";
import CityLocalFeed from "@/components/social/CityLocalFeed";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { useSocialStore } from "@/lib/social/useSocialStore";

export default function ThePulse() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [feedKey, setFeedKey] = useState(0);
  const { state, refresh } = useSocialStore();

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  const handleRefresh = useCallback(async () => {
    const profile = await loadUserProfile();
    setUser(profile);
    setFeedKey((key) => key + 1);
    await new Promise((resolve) => window.setTimeout(resolve, 600));
  }, []);

  if (!user) {
    return <div className="absolute inset-0 bg-[#050505]" />;
  }

  const template = getProfileTemplate(user.identity);

  return (
    <PullToRefresh onRefresh={handleRefresh} className="pulse-page-scroll">
      <LivingCityBackground />
      <div className="city-hub-main app-page-pad pulse-page-scroll__content">
        <StoriesStrip stories={state.stories} onView={refresh} />
        <CityProfileHero key={`hero-${feedKey}`} user={user} />
        <CityLocalFeed city={user.city} />
        <CityDistricts key={`districts-${feedKey}`} />
        <div className="mt-5">
          <ProfileIdentityExtras user={user} template={template} />
        </div>
        <div className="mt-5">
          <CommentThread key={feedKey} />
        </div>
      </div>
    </PullToRefresh>
  );
}
