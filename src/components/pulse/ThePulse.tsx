"use client";

import { useEffect, useState } from "react";
import LivingCityBackground from "./LivingCityBackground";
import CityDistricts from "./CityDistricts";
import PulseHero from "./PulseHero";
import CityIdentityBar from "./CityIdentityBar";
import CommentThread from "@/components/comments/CommentThread";
import { getUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";

export default function ThePulse() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <LivingCityBackground />

      <div className="pointer-events-none fixed right-4 top-4 z-20">
        {user && <CityIdentityBar user={user} />}
      </div>

      <div className="relative z-[1] mx-auto max-w-[680px] px-4 pb-28 pt-10">
        <PulseHero />
        <CityDistricts />
        <div className="mt-5">
          <CommentThread />
        </div>
      </div>
    </div>
  );
}
