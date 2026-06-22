"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import IdentityProfileRouter from "@/components/identity/IdentityProfileRouter";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { findProfileByUsername } from "@/lib/identity/searchData";
import Link from "next/link";
import { EXPLORE_HOME_ROUTE } from "@/lib/session";

function resultToProfile(result: NonNullable<ReturnType<typeof findProfileByUsername>>): UserProfile {
  return {
    username: result.username,
    name: result.name,
    city: result.city,
    identity: result.identity,
    followers: result.followers,
    following: 0,
    pulseScore: 50,
    energy: result.live ? 80 : 50,
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
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function resolveProfile() {
      setLoading(true);

      if (username === "me") {
        router.replace("/pulse#profile");
        return;
      }

      const me = await loadUserProfile();
      if (cancelled) return;

      if (me.username.trim().toLowerCase() === username.trim().toLowerCase()) {
        setUser(me);
        setIsOwnProfile(true);
        setLoading(false);
        return;
      }

      const found = findProfileByUsername(username);
      setUser(found ? resultToProfile(found) : null);
      setIsOwnProfile(false);
      setLoading(false);
    }

    void resolveProfile();
    return () => {
      cancelled = true;
    };
  }, [username, router]);

  if (username === "me" || loading) {
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
