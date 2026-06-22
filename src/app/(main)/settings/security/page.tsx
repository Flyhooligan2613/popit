"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import SettingsPanelContent from "@/components/settings/SettingsPanelContent";
import { loadUserProfile, type UserProfile } from "@/lib/identity/userProfile";

export default function SecuritySettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Security"
        subtitle="Password, login, and account protection."
        backHref="/settings"
        right={
          <Link href="/help/security" className="profile-social__topnav-btn" aria-label="Help">
            ?
          </Link>
        }
      />
      <div className="profile-settings__section">
        <div className="profile-settings__list">
          <div className="profile-settings__inline-panel profile-settings__inline-panel--page">
            <SettingsPanelContent panelId="security" user={user} onUserChange={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
