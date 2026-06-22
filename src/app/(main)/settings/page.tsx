"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PopitLens from "@/components/profile/PopitLens";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";
import { EXPLORE_HOME_ROUTE, WELCOME_LOBBY_ROUTE, logoutAndGoLanding } from "@/lib/session";

function SettingsRow({
  label,
  hint,
  onClick,
  href,
  danger,
}: {
  label: string;
  hint?: string;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}) {
  const className = `profile-settings__item ${danger ? "profile-settings__item--danger" : ""}`;
  const inner = (
    <>
      <span>
        {label}
        {hint && (
          <span className="block font-body text-[0.72rem] font-normal text-white/35">{hint}</span>
        )}
      </span>
      {!danger && <span className="profile-settings__chevron">›</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAndGoLanding();
  };

  const accent = user ? getIdentityAccent(user.identity) : "#FF4D6D";
  const identityLabel = user
    ? IDENTITY_OPTIONS.find((option) => option.id === user.identity)?.label
    : null;

  return (
    <div className="profile-settings">
      <div className="profile-settings__hero">
        <div className="flex items-center justify-between">
          <Link href={WELCOME_LOBBY_ROUTE} className="profile-social__topnav-btn" aria-label="Home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
            </svg>
          </Link>
          <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/50">Settings</p>
          <Link href="/pulse#profile" className="profile-social__topnav-btn" aria-label="Profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20a8 8 0 0 1 16 0" />
            </svg>
          </Link>
        </div>

        {user && (
          <div className="profile-settings__profile-row">
            <PopitLens
              name={user.name}
              followers={user.followers}
              verified={user.verified}
              live={user.live}
              accent={accent}
              size={72}
              followersBeneath={false}
            />
            <div>
              <p className="font-body text-lg font-bold text-white">{user.name}</p>
              <p className="font-body text-sm text-white/45">@{user.username}</p>
              <p className="font-body mt-1 text-xs uppercase tracking-wider text-white/35">
                {identityLabel}
                {user.identityTopicLabel ? ` · ${user.identityTopicLabel}` : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="profile-settings__section">
        <p className="profile-settings__section-title">Your POP'IT</p>
        <div className="profile-settings__list">
          <SettingsRow label="Edit Profile" hint="Photo, name, bio, identity lane" href="/pulse#profile" />
          <SettingsRow label="Identity & Specialty" hint="Update who you are in the city" href="/pulse#profile" />
          <SettingsRow
            label="Platform Background"
            hint="Flags, identity vibes, city energy"
            onClick={() => router.push("/onboarding?skipIntro=1&background=1")}
          />
          <SettingsRow label="Interests" hint="Tune your city feed" onClick={() => router.push("/onboarding?skipIntro=1")} />
        </div>
      </div>

      <div className="profile-settings__section">
        <p className="profile-settings__section-title">Experience</p>
        <div className="profile-settings__list">
          <SettingsRow label="Social Feed" hint="For You, Reels, Thoughts" href="/feed" />
          <SettingsRow label="Lobby Home" hint="Your city landing" href={WELCOME_LOBBY_ROUTE} />
          <SettingsRow label="Explore Tab" hint="Worldwide discovery grid" href={EXPLORE_HOME_ROUTE} />
          <SettingsRow label="Your City" href="/pulse" />
          <SettingsRow label="POP WORLD" href="/map" />
          <SettingsRow label="Notifications" href="/notifications" />
          <SettingsRow label="Messages" href="/messages" />
        </div>
      </div>

      <div className="profile-settings__section">
        <p className="profile-settings__section-title">Location</p>
        <div className="profile-settings__list">
          <SettingsRow
            label="Update My City"
            hint="Re-detect from GPS or time zone"
            onClick={() => {
              void import("@/lib/location/cityDetection").then(({ detectAndSaveCity }) =>
                detectAndSaveCity({ prompt: true })
              );
            }}
          />
        </div>
      </div>

      <div className="profile-settings__section">
        <p className="profile-settings__section-title">Legal</p>
        <div className="profile-settings__list">
          <SettingsRow label="Terms of Service" href="/legal/terms" />
          <SettingsRow label="Privacy Policy" href="/legal/privacy" />
          <SettingsRow label="Community Guidelines" href="/legal/community-guidelines" />
          <SettingsRow label="Data Deletion" href="/legal/data-deletion" />
          <SettingsRow label="All Policies" href="/legal" />
        </div>
      </div>

      <div className="profile-settings__section">
        <p className="profile-settings__section-title">Privacy & Account</p>
        <div className="profile-settings__list">
          <SettingsRow label="Privacy" hint="Who can see your POP card" />
          <SettingsRow label="Security" hint="Password and login" />
          <SettingsRow label="Blocked Accounts" />
          <SettingsRow
            label={loggingOut ? "Signing out…" : "Log Out"}
            onClick={handleLogout}
            danger
          />
        </div>
      </div>
    </div>
  );
}
