"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProfileAvatarLens from "@/components/profile/ProfileAvatarLens";
import { loadUserProfile, PROFILE_UPDATE_EVENT } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { LIVE_UPDATE_EVENT } from "@/lib/social/liveStore";
import { syncLiveProfileState } from "@/lib/identity/liveProfileSync";

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function ProfileCornerButton() {
  const [user, setUser] = useState<UserProfile | null>(null);

  const refresh = useCallback(() => {
    syncLiveProfileState();
    void loadUserProfile().then(setUser);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROFILE_UPDATE_EVENT, refresh);
    window.addEventListener(LIVE_UPDATE_EVENT, refresh);
    return () => {
      window.removeEventListener(PROFILE_UPDATE_EVENT, refresh);
      window.removeEventListener(LIVE_UPDATE_EVENT, refresh);
    };
  }, [refresh]);

  if (!user) return null;

  const accent = getIdentityAccent(user.identity);

  return (
    <div className="profile-corner" aria-label="Your profile">
      <ProfileAvatarLens
        user={user}
        accent={accent}
        size={48}
        followersBeneath={false}
        allowPhotoChange
        onPhotoUpdated={refresh}
      />
      <Link href="/pulse#profile" className="profile-corner__followers">
        {formatFollowers(user.followers)} followers
      </Link>
      <Link href="/pulse#profile" className="profile-corner__name">
        {user.name.split(" ")[0]}
      </Link>
    </div>
  );
}

export default memo(ProfileCornerButton);
