"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import SettingsPanelContent from "@/components/settings/SettingsPanelContent";
import { loadUserProfile, type UserProfile } from "@/lib/identity/userProfile";

export default function PrivacySettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Privacy"
        subtitle="Control who sees your POP card and city activity."
        backHref="/settings"
        right={
          <Link href="/help/privacy" className="profile-social__topnav-btn" aria-label="Help">
            ?
          </Link>
        }
      />
      <div className="profile-settings__section">
        <div className="profile-settings__list">
          <div className="profile-settings__inline-panel profile-settings__inline-panel--page">
            <SettingsPanelContent panelId="privacy" user={user} onUserChange={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
