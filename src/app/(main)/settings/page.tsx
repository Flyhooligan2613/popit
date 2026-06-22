"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PopitLens from "@/components/profile/PopitLens";
import { loadUserProfile } from "@/lib/identity/userProfile";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS } from "@/lib/identity/types";
import { WELCOME_LOBBY_ROUTE, logoutAndGoLanding } from "@/lib/session";
import {
  itemsBySection,
  searchSettingsHelp,
  settingsSections,
  type SettingsHelpItem,
} from "@/lib/settings/settingsHelpIndex";

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

function HelpRow({ item }: { item: SettingsHelpItem }) {
  return <SettingsRow label={item.label} hint={item.hint} href={item.href} />;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAndGoLanding();
  };

  const searchResults = useMemo(() => searchSettingsHelp(searchQuery), [searchQuery]);
  const sections = useMemo(() => settingsSections(), []);

  const accent = user ? getIdentityAccent(user.identity) : "#FF4D6D";
  const identityLabel = user
    ? IDENTITY_OPTIONS.find((option) => option.id === user.identity)?.label
    : null;

  return (
    <div className="profile-settings">
      <div className="profile-settings__hero">
        <div className="flex items-center justify-between">
          <Link href={WELCOME_LOBBY_ROUTE} className="profile-social__topnav-btn" aria-label="Back">
            ←
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

        <div className="profile-settings__search">
          <input
            type="search"
            className="profile-settings__search-input"
            placeholder="Search settings & help…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search settings and help"
          />
        </div>
      </div>

      {searchQuery.trim() ? (
        <div className="profile-settings__section">
          <p className="profile-settings__section-title">Search results</p>
          <div className="profile-settings__list">
            {searchResults.length === 0 ? (
              <p className="profile-settings__empty">No matches — try &quot;camera&quot;, &quot;location&quot;, or &quot;privacy&quot;</p>
            ) : (
              searchResults.map((item) => <HelpRow key={item.id} item={item} />)
            )}
          </div>
        </div>
      ) : (
        sections.map((section) => {
          const items = itemsBySection(section).filter((i) => i.id !== "edit-profile");
          if (section === "Privacy & Account") {
            return (
              <div key={section} className="profile-settings__section">
                <p className="profile-settings__section-title">{section}</p>
                <div className="profile-settings__list">
                  {items.map((item) => (
                    <HelpRow key={item.id} item={item} />
                  ))}
                  <SettingsRow
                    label={loggingOut ? "Signing out…" : "Log Out"}
                    onClick={handleLogout}
                    danger
                  />
                </div>
              </div>
            );
          }

          if (section === "Your POP'IT") {
            return (
              <div key={section} className="profile-settings__section">
                <p className="profile-settings__section-title">{section}</p>
                <div className="profile-settings__list">
                  <SettingsRow
                    label="Edit Profile"
                    hint="Photo, name, bio, identity lane"
                    href="/pulse#profile"
                  />
                  {items.map((item) => (
                    <HelpRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          }

          if (section === "Experience") {
            return (
              <div key={section} className="profile-settings__section">
                <p className="profile-settings__section-title">{section}</p>
                <div className="profile-settings__list">
                  {items.map((item) => (
                    <HelpRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={section} className="profile-settings__section">
              <p className="profile-settings__section-title">{section}</p>
              <div className="profile-settings__list">
                {items.map((item) => (
                  <HelpRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
