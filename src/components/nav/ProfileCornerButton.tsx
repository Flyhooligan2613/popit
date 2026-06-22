"use client";

import { memo, useEffect, useState } from "react";
import LensProfileTransition from "@/components/profile/LensProfileTransition";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function ProfileCornerButton() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  if (!user) return null;

  const accent = getIdentityAccent(user.identity);

  return (
    <div className="profile-corner" aria-label="Your profile">
      <LensProfileTransition
        name={user.name}
        followers={user.followers}
        creatorLevel={5}
        influence={user.pulseScore}
        verified={user.verified}
        live={user.live}
        accent={accent}
        href="/pulse#profile"
        size={48}
      />
      <p className="profile-corner__followers">{formatFollowers(user.followers)} followers</p>
      <p className="profile-corner__name">{user.name.split(" ")[0]}</p>
    </div>
  );
}

export default memo(ProfileCornerButton);
