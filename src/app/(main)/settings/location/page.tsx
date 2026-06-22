"use client";

import { useEffect, useState } from "react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import SettingsPanelContent from "@/components/settings/SettingsPanelContent";
import { loadUserProfile, type UserProfile } from "@/lib/identity/userProfile";

export default function LocationSettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Location"
        subtitle="Your ZIP powers local feed, weather, and time — change it when you travel."
        backHref="/settings"
      />
      <div className="profile-settings__section">
        <div className="profile-settings__list">
          <div className="profile-settings__inline-panel profile-settings__inline-panel--page">
            <SettingsPanelContent panelId="location" user={user} onUserChange={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
