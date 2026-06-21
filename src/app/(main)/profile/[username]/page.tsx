"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import IdentityProfileRouter from "@/components/identity/IdentityProfileRouter";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { SEARCH_DIRECTORY } from "@/lib/identity/searchData";
import Link from "next/link";
import { EXPLORE_HOME_ROUTE } from "@/lib/session";
import { useState } from "react";

function resultToProfile(result: (typeof SEARCH_DIRECTORY)[number]): UserProfile {
  return {
    username: result.username,
    name: result.name,
    city: result.city,
    identity: result.identity,
    followers: result.followers,
    following: Math.round(result.followers * 0.05),
    pulseScore: 70 + (result.followers % 30),
    energy: result.live ? 95 : 72,
    verified: result.verified,
    live: result.live,
    currentVibe: result.tagline,
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const [user, setUser] = useState<UserProfile | null>(null);
  const isOwnProfile = username === "me";

  useEffect(() => {
    if (isOwnProfile) {
      router.replace("/pulse");
      return;
    }
    const found = SEARCH_DIRECTORY.find((result) => result.username === username);
    setUser(found ? resultToProfile(found) : null);
  }, [username, isOwnProfile, router]);

  if (isOwnProfile) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050505] px-6">
        <p className="text-poster text-xl uppercase text-white/70">Identity not found</p>
        <Link href="/search" className="font-body text-sm text-[#FF4D6D] hover:underline">
          Search the city
        </Link>
        <Link href={EXPLORE_HOME_ROUTE} className="font-body text-sm text-white/45 hover:underline">
          Back to Explore Home
        </Link>
      </div>
    );
  }

  return <IdentityProfileRouter user={user} isOwnProfile={isOwnProfile} />;
}
