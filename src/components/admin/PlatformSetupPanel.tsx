"use client";

import { useEffect, useState } from "react";
import type { PlatformConfig } from "@/lib/admin/platformConfig";

type ToggleField = {
  key: keyof PlatformConfig;
  label: string;
  hint: string;
};

const TOGGLES: ToggleField[] = [
  { key: "signupsEnabled", label: "New signups", hint: "Allow new account registration" },
  { key: "liveStreamingEnabled", label: "Live streaming", hint: "Go Live from profile side rail" },
  { key: "commentsEnabled", label: "Comments & replies", hint: "Post comment threads across feeds" },
  { key: "monetizationEnabled", label: "Monetization program", hint: "Creator program pages and settings" },
  { key: "reelsEnabled", label: "Reels / Pulse clips", hint: "Short-form video surfaces" },
  { key: "exploreEnabled", label: "Explore tab", hint: "Worldwide discovery grid" },
  { key: "mapEnabled", label: "POP WORLD map", hint: "Map tab and venue layer" },
  { key: "maintenanceMode", label: "Maintenance mode", hint: "Show maintenance screen to users" },
];

export default function PlatformSetupPanel() {
  const [config, setConfig] = useState<PlatformConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => setConfig(data as PlatformConfig))
      .catch(() => setMessage("Could not load platform config."));
  }, []);

  const save = async () => {
    if (!config) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Save failed");
      const next = (await res.json()) as PlatformConfig;
      setConfig(next);
      setMessage("Platform settings saved.");
    } catch {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return <p className="admin-panel__loading">Loading platform config…</p>;
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel__head">
        <h1>Platform Setup</h1>
        <p>Feature flags and global controls — similar to internal ops tools at major social apps.</p>
      </header>

      <section className="admin-panel__section">
        <h2>Feature controls</h2>
        <div className="admin-toggle-grid">
          {TOGGLES.map((toggle) => (
            <label key={toggle.key} className="admin-toggle">
              <input
                type="checkbox"
                checked={Boolean(config[toggle.key])}
                onChange={(e) =>
                  setConfig((prev) => (prev ? { ...prev, [toggle.key]: e.target.checked } : prev))
                }
              />
              <span className="admin-toggle__copy">
                <strong>{toggle.label}</strong>
                <small>{toggle.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="admin-panel__section">
        <h2>Maintenance message</h2>
        <textarea
          className="admin-panel__textarea"
          value={config.maintenanceMessage}
          onChange={(e) => setConfig({ ...config, maintenanceMessage: e.target.value })}
          rows={3}
        />
      </section>

      <section className="admin-panel__section">
        <h2>Announcement banner</h2>
        <input
          className="admin-panel__input"
          value={config.announcementBanner ?? ""}
          onChange={(e) =>
            setConfig({ ...config, announcementBanner: e.target.value.trim() || null })
          }
          placeholder="Optional banner shown to all users"
        />
        <select
          className="admin-panel__select"
          value={config.announcementBannerType}
          onChange={(e) =>
            setConfig({
              ...config,
              announcementBannerType: e.target.value as PlatformConfig["announcementBannerType"],
            })
          }
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </section>

      {config.updatedAt > 0 && (
        <p className="admin-panel__meta">
          Last saved {new Date(config.updatedAt).toLocaleString()}
          {config.updatedBy ? ` by ${config.updatedBy}` : ""}
        </p>
      )}

      {message && <p className="admin-panel__message">{message}</p>}

      <button type="button" className="admin-panel__save" onClick={() => void save()} disabled={saving}>
        {saving ? "Saving…" : "Save platform settings"}
      </button>
    </div>
  );
}
