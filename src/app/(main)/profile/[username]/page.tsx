"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import IdentityProfileRouter from "@/components/identity/IdentityProfileRouter";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { SEARCH_DIRECTORY } from "@/lib/identity/searchData";

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
  const params = useParams();
  const username = typeof params.username === "string" ? params.username : "";
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (username === "me") {
      loadUserProfile().then(setUser);
      return;
    }
    const found = SEARCH_DIRECTORY.find((r) => r.username === username);
    setUser(found ? resultToProfile(found) : null);
  }, [username]);

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050505] px-6">
        <p className="text-poster text-xl uppercase text-white/70">Identity not found</p>
        <Link href="/search" className="font-body text-sm text-[#FF4D6D] hover:underline">
          Search the city
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <Link
        href="/pulse"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur-md"
        aria-label="Back to Your City"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </Link>
      <IdentityProfileRouter user={user} />
    </div>
  );
}
