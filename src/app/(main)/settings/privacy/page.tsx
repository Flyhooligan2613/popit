"use client";

import Link from "next/link";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";

export default function PrivacySettingsPage() {
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
          <Link href="/help/privacy" className="profile-settings__item">
            <span>
              Who can see your profile
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Public, followers, or city-only visibility
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
          <Link href="/legal/privacy" className="profile-settings__item">
            <span>
              Privacy Policy
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                How POP&apos;IT handles your data
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
          <Link href="/settings/blocked" className="profile-settings__item">
            <span>
              Blocked Accounts
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Manage blocked users
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
