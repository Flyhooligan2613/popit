"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import SettingsPanelContent from "@/components/settings/SettingsPanelContent";
import { loadUserProfile, type UserProfile } from "@/lib/identity/userProfile";

export default function PermissionsSettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile().then(setUser);
  }, []);

  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Permissions"
        subtitle="Same controls as onboarding — toggle anytime."
        backHref="/settings"
        right={
          <Link href="/help/permissions" className="profile-social__topnav-btn" aria-label="Help">
            ?
          </Link>
        }
      />
      <div className="profile-settings__section px-4">
        <SettingsPanelContent panelId="permissions" user={user} onUserChange={setUser} />
      </div>
    </div>
  );
}
