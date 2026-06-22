"use client";

import Link from "next/link";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";

export default function SecuritySettingsPage() {
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
          <Link href="/help/security" className="profile-settings__item">
            <span>
              Password &amp; login
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Change password and secure your account
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
          <Link href="/legal/data-deletion" className="profile-settings__item">
            <span>
              Delete my data
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Request account and data removal
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
