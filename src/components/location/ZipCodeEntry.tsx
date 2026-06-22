"use client";

import { useState } from "react";
import {
  detectZipFromGps,
  getLocationDisplayLabel,
  getPopitLocation,
  normalizeZipInput,
  saveZipCode,
} from "@/lib/location/zipLocation";

type ZipCodeEntryProps = {
  onSaved?: (city: string) => void;
  compact?: boolean;
  showGpsHelper?: boolean;
};

export default function ZipCodeEntry({ onSaved, compact, showGpsHelper = true }: ZipCodeEntryProps) {
  const existing = getPopitLocation();
  const [zip, setZip] = useState(existing?.zipCode ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLabel, setSavedLabel] = useState(existing ? getLocationDisplayLabel() : null);

  const handleSave = async () => {
    setBusy(true);
    setError(null);
    const result = await saveZipCode(zip);
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSavedLabel(getLocationDisplayLabel());
    onSaved?.(result.location.city);
  };

  const handleGps = async () => {
    setBusy(true);
    setError(null);
    const result = await detectZipFromGps();
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setZip(result.location.zipCode);
    setSavedLabel(getLocationDisplayLabel());
    onSaved?.(result.location.city);
  };

  return (
    <div className={`zip-entry ${compact ? "zip-entry--compact" : ""}`}>
      {!compact && (
        <p className="zip-entry__explain">
          POP&apos;IT uses your ZIP code — not constant GPS tracking — to power your local feed,
          weather, and POP environment. Traveling? Change your ZIP anytime in Settings.
        </p>
      )}

      <label className="settings-field">
        <span className="settings-field__label">ZIP code</span>
        <input
          className="settings-field__input zip-entry__input"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="e.g. 10001"
          value={zip}
          onChange={(e) => setZip(normalizeZipInput(e.target.value))}
        />
      </label>

      {savedLabel && <p className="zip-entry__current">Current: {savedLabel}</p>}
      {error && <p className="zip-entry__error">{error}</p>}

      <div className="zip-entry__actions">
        <button type="button" className="settings-panel__save" disabled={busy || zip.length < 5} onClick={() => void handleSave()}>
          {busy ? "Saving…" : "Set POP environment"}
        </button>
        {showGpsHelper && (
          <button type="button" className="zip-entry__secondary" disabled={busy} onClick={() => void handleGps()}>
            Find ZIP from device location
          </button>
        )}
      </div>
    </div>
  );
}
