"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SettingsPageHeader from "@/components/settings/SettingsPageHeader";
import {
  CITY_UPDATED_EVENT,
  citySourceLabel,
  detectAndSaveCity,
  getCitySource,
  getResolvedCity,
  type CityUpdatedDetail,
} from "@/lib/location/cityDetection";

export default function LocationSettingsPage() {
  const [city, setCity] = useState("Your City");
  const [source, setSource] = useState<ReturnType<typeof getCitySource>>("default");
  const [detecting, setDetecting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setCity(getResolvedCity());
    setSource(getCitySource());

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<CityUpdatedDetail>).detail;
      setCity(detail.city);
      setSource(detail.source);
    };
    window.addEventListener(CITY_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CITY_UPDATED_EVENT, onUpdate);
  }, []);

  const handleDetect = async () => {
    setDetecting(true);
    setMessage(null);
    const result = await detectAndSaveCity({ prompt: true });
    setCity(result.city);
    setSource(result.source);
    setDetecting(false);
    if (result.source === "gps") {
      setMessage(`Updated to ${result.city} from your device GPS.`);
    } else {
      setMessage(
        "Could not read GPS. Allow location in your browser, then try again — or check Device Permissions."
      );
    }
  };

  return (
    <div className="profile-settings">
      <SettingsPageHeader
        title="Location"
        subtitle="Your city powers local feed, weather, and nearby discovery."
        backHref="/settings"
      />

      <div className="profile-settings__section">
        <div className="profile-settings__list">
          <div className="profile-settings__item profile-settings__item--static">
            <span>
              Current city
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                {city} · {citySourceLabel(source)}
              </span>
            </span>
          </div>
        </div>

        {message && <p className="profile-settings__notice">{message}</p>}

        <div className="profile-settings__list mt-3">
          <button
            type="button"
            className="profile-settings__item"
            disabled={detecting}
            onClick={() => void handleDetect()}
          >
            <span>
              {detecting ? "Detecting…" : "Detect from GPS"}
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Uses your device location — not time zone guesses
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </button>
          <Link href="/settings/permissions" className="profile-settings__item">
            <span>
              Location Permission
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Turn location on or off
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
          <Link href="/help/location" className="profile-settings__item">
            <span>
              Help: Why is my city wrong?
              <span className="block font-body text-[0.72rem] font-normal text-white/35">
                Troubleshooting steps
              </span>
            </span>
            <span className="profile-settings__chevron">›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
