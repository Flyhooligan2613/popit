"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PullToRefresh from "@/components/ui/PullToRefresh";
import { WELCOME_LOBBY_ROUTE } from "@/lib/session";
import PopSearchBar from "@/components/nav/PopSearchBar";
import PopitLens from "@/components/profile/PopitLens";
import { useResolvedCity } from "@/hooks/useResolvedCity";
import { getLiveNearProfiles, type LiveNearFilter } from "@/lib/social/liveNearYou";
import { formatCount } from "@/lib/social/socialStore";

const FILTERS: { id: LiveNearFilter; label: string }[] = [
  { id: "near", label: "Near You" },
  { id: "live", label: "On Air" },
  { id: "creators", label: "Creators" },
  { id: "venues", label: "Venues" },
];

export default function PopitLiveHub() {
  const [filter, setFilter] = useState<LiveNearFilter>("near");
  const city = useResolvedCity();

  const profiles = useMemo(() => getLiveNearProfiles(city, filter), [city, filter]);
  const liveCount = profiles.filter((p) => p.live).length;

  const handleRefresh = async () => {
    await new Promise((r) => window.setTimeout(r, 500));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="explore-hub popit-live-hub">
      <div className="explore-hub__head app-page-pad">
        <div className="explore-hub__head-row">
          <Link href={WELCOME_LOBBY_ROUTE} className="social-page__back" aria-label="Back">
            ←
          </Link>
          <h1 className="explore-hub__title">POPIT Live</h1>
        </div>
        <p className="explore-hub__sub">
          {liveCount} live near {city} · profiles &amp; venues on air right now
        </p>
        <PopSearchBar className="explore-hub__search" />
      </div>

      <div className="explore-hub__filters app-page-pad" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`explore-hub__filter ${filter === f.id ? "is-active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="popit-live-hub__grid app-page-pad">
        {profiles.map((profile) => (
          <Link
            key={profile.username}
            href={`/profile/${profile.username}`}
            className={`popit-live-hub__tile ${profile.live ? "is-live" : ""}`}
            style={{
              background: `linear-gradient(145deg, ${profile.accent}44, #050505)`,
            }}
          >
            {profile.live && (
              <span className="popit-live-hub__rec">
                <span className="popit-live-hub__rec-dot" aria-hidden />
                LIVE
              </span>
            )}
            <div className="popit-live-hub__lens">
              <PopitLens
                name={profile.name}
                followers={profile.followers}
                verified={profile.verified}
                live={profile.live}
                accent={profile.accent}
                size={56}
                followersBeneath={false}
              />
            </div>
            <div className="popit-live-hub__meta">
              <span className="popit-live-hub__name">{profile.name}</span>
              <span className="popit-live-hub__hood">{profile.neighborhood} · {profile.distanceLabel}</span>
              {profile.live && profile.viewers != null && (
                <span className="popit-live-hub__viewers">{formatCount(profile.viewers)} watching</span>
              )}
              <span className="popit-live-hub__tag">{profile.tagline}</span>
            </div>
          </Link>
        ))}
      </div>
    </PullToRefresh>
  );
}
