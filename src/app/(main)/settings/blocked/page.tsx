"use client";

import Link from "next/link";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";

export default function BlockedSettingsPage() {
  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Blocked"
        subtitle="People you've blocked won't see your POP card or message you."
        backHref="/settings/privacy"
        right={
          <Link href="/help/blocked" className="profile-social__topnav-btn" aria-label="Help">
            ?
          </Link>
        }
      />

      <div className="profile-settings__section">
        <p className="profile-settings__empty-state">
          You haven&apos;t blocked anyone yet. Block someone from their profile menu when needed.
        </p>
        <div className="profile-settings__list mt-3">
          <Link href="/help/blocked" className="profile-settings__item">
            <span>
              How blocking works
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                What happens when you block someone
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
