"use client";

import { useCallback, useEffect, useState } from "react";
import PullToRefresh from "@/components/ui/PullToRefresh";
import ProfileIdentityExtras from "@/components/profile/ProfileIdentityExtras";
import { getProfileTemplate } from "@/lib/identity/types";
import LivingCityBackground from "./LivingCityBackground";
import CityDistricts from "./CityDistricts";
import CityProfileHero from "./CityProfileHero";
import CityHubChrome from "./CityHubChrome";
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

  if (!user) {
    return <div className="absolute inset-0 bg-[#050505]" />;
  }

  const template = getProfileTemplate(user.identity);

  return (
    <PullToRefresh onRefresh={handleRefresh} className="absolute inset-0 overflow-y-auto">
      <LivingCityBackground />
      <CityHubChrome user={user}>
        <CityProfileHero key={`hero-${feedKey}`} user={user} />
        <CityDistricts key={`districts-${feedKey}`} />
        <div className="mt-5">
          <ProfileIdentityExtras user={user} template={template} />
        </div>
        <div className="mt-5">
          <CommentThread key={feedKey} />
        </div>
      </CityHubChrome>
    </PullToRefresh>
  );
}
