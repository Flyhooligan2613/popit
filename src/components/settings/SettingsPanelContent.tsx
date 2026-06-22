"use client";

import { useCallback, useEffect, useState } from "react";
import { MapPin, Camera, ImageIcon, Mic, Bell } from "lucide-react";
import BackgroundPicker from "@/components/onboarding/BackgroundPicker";
import PermissionSettingsPanel, {
  type PermissionCardConfig,
} from "@/components/settings/PermissionSettingsPanel";
import {
  SettingsChipGroup,
  SettingsField,
  SettingsInput,
  SettingsPanelShell,
  SettingsSelect,
  SettingsTextarea,
  SettingsToggle,
} from "@/components/settings/SettingsFormControls";
import {
  getUserInterests,
  saveUserInterests,
  type InterestId,
} from "@/lib/city/personalizedCity";
import {
  getPlatformBackgroundId,
  savePlatformBackground,
} from "@/lib/identity/platformBackgrounds";
import {
  loadUserProfile,
  saveUserIdentity,
  saveUserProfile,
  type UserProfile,
} from "@/lib/identity/userProfile";
import { getIdentityAccent, IDENTITY_OPTIONS, type IdentityType } from "@/lib/identity/types";
import ZipCodeEntry from "@/components/location/ZipCodeEntry";
import {
  getLocationDisplayLabel,
  getPopitLocation,
} from "@/lib/location/zipLocation";
import type { SettingsPanelId } from "@/lib/settings/settingsHelpIndex";
import {
  getBlockedUsers,
  getSettingsPrefs,
  saveBlockedUsers,
  saveSettingsPrefs,
  type SettingsPrefs,
} from "@/lib/settings/settingsPrefs";

const PERMISSIONS: PermissionCardConfig[] = [
  {
    id: "location",
    label: "Location",
    title: "ZIP-based local discovery",
    description: "Enter your ZIP so feed, weather, and time match your POP environment.",
    Icon: MapPin,
    accent: "from-[#FF4D6D]/20 to-[#FF7A00]/10",
    glow: "rgba(255,77,109,0.25)",
  },
  {
    id: "camera",
    label: "Camera",
    title: "Capture & post",
    description: "Take photos and videos for posts, stories, and reels.",
    Icon: Camera,
    accent: "from-[#A855F7]/20 to-[#7C3AED]/10",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    id: "photos",
    label: "Photos",
    title: "Gallery uploads",
    description: "Choose whether POP'IT can access your photo library.",
    Icon: ImageIcon,
    accent: "from-[#00D4FF]/20 to-[#0099FF]/10",
    glow: "rgba(0,212,255,0.22)",
    photos: true,
  },
  {
    id: "microphone",
    label: "Microphone",
    title: "Live & audio",
    description: "Required for Go Live, voice, and video with sound.",
    Icon: Mic,
    accent: "from-[#FF7A00]/20 to-[#FF4D6D]/10",
    glow: "rgba(255,122,0,0.22)",
  },
  {
    id: "notifications",
    label: "Notifications",
    title: "Push alerts",
    description: "Get notified when your city is popping.",
    Icon: Bell,
    accent: "from-[#A855F7]/20 to-[#00D4FF]/10",
    glow: "rgba(168,85,247,0.22)",
  },
];

const INTEREST_OPTIONS: { id: InterestId; label: string }[] = [
  { id: "gaming", label: "Gaming" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "travel", label: "Travel" },
  { id: "photography", label: "Photo" },
  { id: "food", label: "Food" },
  { id: "nightlife", label: "Nightlife" },
  { id: "fashion", label: "Fashion" },
  { id: "fitness", label: "Fitness" },
  { id: "technology", label: "Tech" },
  { id: "movies", label: "Movies" },
  { id: "business", label: "Business" },
];

type SettingsPanelContentProps = {
  panelId: SettingsPanelId;
  user: UserProfile | null;
  onUserChange: (user: UserProfile) => void;
};

export default function SettingsPanelContent({
  panelId,
  user,
  onUserChange,
}: SettingsPanelContentProps) {
  const [prefs, setPrefs] = useState<SettingsPrefs>(() => getSettingsPrefs());
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [identity, setIdentity] = useState<IdentityType>("personal");
  const [topicLabel, setTopicLabel] = useState("");
  const [backgroundId, setBackgroundId] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [blocked, setBlocked] = useState<string[]>([]);
  const [blockInput, setBlockInput] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setPrefs(getSettingsPrefs());
    setInterests(getUserInterests());
    setBlocked(getBlockedUsers());
    setCity(getPopitLocation()?.city ?? "");
    setLocationLabel(getLocationDisplayLabel());
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setBio(user.currentVibe);
      setIdentity(user.identity);
      setTopicLabel(user.identityTopicLabel ?? "");
      setBackgroundId(user.platformBackgroundId ?? getPlatformBackgroundId());
    }
  }, [panelId, user]);

  const flashSaved = useCallback(() => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }, []);

  const wrapSave = (fn: () => void) => {
    setSaving(true);
    fn();
    setSaving(false);
    flashSaved();
  };

  if (!user && panelId !== "help") {
    return <p className="settings-panel__empty">Loading your profile…</p>;
  }

  switch (panelId) {
    case "edit-profile":
      return (
        <SettingsPanelShell
          title="Edit profile"
          saved={saved}
          saving={saving}
          onSave={() =>
            wrapSave(() => {
              saveUserProfile({ name, username, currentVibe: bio });
              onUserChange({ ...user!, name, username, currentVibe: bio });
            })
          }
        >
          <SettingsField label="Display name" hint="Shown on your POP card">
            <SettingsInput value={name} onChange={(e) => setName(e.target.value)} />
          </SettingsField>
          <SettingsField label="Username" hint="Your @handle">
            <SettingsInput value={username} onChange={(e) => setUsername(e.target.value)} />
          </SettingsField>
          <SettingsField label="Bio" hint="Short vibe line under your profile">
            <SettingsTextarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </SettingsField>
          <SettingsField label="POP environment" hint="From your ZIP — change in Location settings">
            <SettingsInput value={locationLabel || city || "Set your ZIP in Location"} readOnly />
          </SettingsField>
          <SettingsField label="Profile photo" hint="Photo upload coming soon">
            <SettingsInput type="file" accept="image/*" disabled />
          </SettingsField>
        </SettingsPanelShell>
      );

    case "identity":
      return (
        <SettingsPanelShell
          title="Identity & specialty"
          saved={saved}
          saving={saving}
          onSave={() =>
            wrapSave(() => {
              saveUserIdentity(identity);
              saveUserProfile({ identity, identityTopicLabel: topicLabel || undefined });
              onUserChange({ ...user!, identity, identityTopicLabel: topicLabel || undefined });
            })
          }
        >
          <SettingsField label="Primary lane" hint="How you show up in the city">
            <SettingsChipGroup
              options={IDENTITY_OPTIONS.map((o) => ({ id: o.id, label: o.label }))}
              selected={identity}
              onChange={(id) => setIdentity(id as IdentityType)}
            />
          </SettingsField>
          <SettingsField label="Specialty tag" hint="e.g. PC Master Race, Brickell Creator">
            <SettingsInput
              value={topicLabel}
              onChange={(e) => setTopicLabel(e.target.value)}
              placeholder="Optional specialty"
            />
          </SettingsField>
        </SettingsPanelShell>
      );

    case "background":
      return (
        <SettingsPanelShell
          title="Platform background"
          saved={saved}
          saving={saving}
          onSave={() =>
            wrapSave(() => {
              const id = backgroundId ?? getPlatformBackgroundId();
              savePlatformBackground(id);
              saveUserProfile({ platformBackgroundId: id });
              onUserChange({ ...user!, platformBackgroundId: id });
            })
          }
        >
          <BackgroundPicker
            selected={backgroundId}
            onSelect={setBackgroundId}
            accent={getIdentityAccent(user!.identity)}
            identity={user!.identity}
          />
        </SettingsPanelShell>
      );

    case "interests":
      return (
        <SettingsPanelShell
          title="Interests"
          saved={saved}
          saving={saving}
          onSave={() =>
            wrapSave(() => {
              saveUserInterests(interests);
            })
          }
        >
          <SettingsField label="City feed topics" hint="Pick what your city highlights">
            <SettingsChipGroup
              options={INTEREST_OPTIONS}
              selected={interests}
              onChange={(next) => setInterests(next as string[])}
              multi
            />
          </SettingsField>
        </SettingsPanelShell>
      );

    case "feed":
      return (
        <SettingsPanelShell
          title="Social feed"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsField label="Default tab" hint="Opens first when you visit Feed">
            <SettingsChipGroup
              options={[
                { id: "following", label: "Following" },
                { id: "reels", label: "Reels" },
                { id: "thoughts", label: "Thoughts" },
              ]}
              selected={prefs.feedDefaultTab}
              onChange={(id) => setPrefs({ ...prefs, feedDefaultTab: id as SettingsPrefs["feedDefaultTab"] })}
            />
          </SettingsField>
        </SettingsPanelShell>
      );

    case "lobby":
      return (
        <SettingsPanelShell
          title="Lobby home"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsToggle
            label="Motion & animations"
            hint="Card pops and live activity motion on home"
            checked={prefs.lobbyAnimations}
            onChange={(lobbyAnimations) => setPrefs({ ...prefs, lobbyAnimations })}
          />
        </SettingsPanelShell>
      );

    case "explore":
      return (
        <SettingsPanelShell
          title="Explore tab"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsToggle
            label="Autoplay previews"
            hint="Play muted clips in the discovery grid"
            checked={prefs.exploreAutoplay}
            onChange={(exploreAutoplay) => setPrefs({ ...prefs, exploreAutoplay })}
          />
        </SettingsPanelShell>
      );

    case "notifications":
      return (
        <SettingsPanelShell
          title="Notifications"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsToggle label="Likes" checked={prefs.notifyLikes} onChange={(notifyLikes) => setPrefs({ ...prefs, notifyLikes })} />
          <SettingsToggle label="New followers" checked={prefs.notifyFollows} onChange={(notifyFollows) => setPrefs({ ...prefs, notifyFollows })} />
          <SettingsToggle label="Live alerts" checked={prefs.notifyLive} onChange={(notifyLive) => setPrefs({ ...prefs, notifyLive })} />
          <SettingsToggle label="Messages" checked={prefs.notifyMessages} onChange={(notifyMessages) => setPrefs({ ...prefs, notifyMessages })} />
        </SettingsPanelShell>
      );

    case "messages":
      return (
        <SettingsPanelShell
          title="Messages"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsField label="Who can message you">
            <SettingsSelect
              value={prefs.dmRequests}
              onChange={(e) =>
                setPrefs({ ...prefs, dmRequests: e.target.value as SettingsPrefs["dmRequests"] })
              }
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers only</option>
              <option value="none">No one</option>
            </SettingsSelect>
          </SettingsField>
          <SettingsToggle
            label="Read receipts"
            hint="Let others see when you've read a message"
            checked={prefs.readReceipts}
            onChange={(readReceipts) => setPrefs({ ...prefs, readReceipts })}
          />
        </SettingsPanelShell>
      );

    case "permissions":
      return (
        <SettingsPanelShell title="Device permissions">
          <PermissionSettingsPanel permissions={PERMISSIONS} variant="settings" />
        </SettingsPanelShell>
      );

    case "location":
      return (
        <SettingsPanelShell title="Your ZIP & POP environment">
          <ZipCodeEntry
            onSaved={(nextCity) => {
              setCity(nextCity);
              setLocationLabel(getLocationDisplayLabel());
              if (user) {
                const loc = getPopitLocation();
                saveUserProfile({
                  city: nextCity,
                  zipCode: loc?.zipCode,
                  state: loc?.stateAbbr,
                  timezone: loc?.timezone,
                });
                onUserChange({
                  ...user,
                  city: nextCity,
                  zipCode: loc?.zipCode,
                  state: loc?.stateAbbr,
                  timezone: loc?.timezone,
                });
              }
              flashSaved();
            }}
          />
          {locationLabel && locationLabel !== "Your City" && (
            <p className="settings-panel__note">Active environment: {locationLabel}</p>
          )}
        </SettingsPanelShell>
      );

    case "location-perm":
      return (
        <SettingsPanelShell title="Location (ZIP-based)">
          <p className="settings-panel__note">
            POP&apos;IT uses your ZIP code instead of continuous GPS. Enter or update it below.
          </p>
          <ZipCodeEntry
            compact
            onSaved={() => flashSaved()}
          />
        </SettingsPanelShell>
      );

    case "privacy":
      return (
        <SettingsPanelShell
          title="Privacy"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsField label="Profile visibility" hint="Who can see your POP card">
            <SettingsSelect
              value={prefs.profileVisibility}
              onChange={(e) =>
                setPrefs({
                  ...prefs,
                  profileVisibility: e.target.value as SettingsPrefs["profileVisibility"],
                })
              }
            >
              <option value="public">Public</option>
              <option value="followers">Followers only</option>
              <option value="city">City only</option>
            </SettingsSelect>
          </SettingsField>
        </SettingsPanelShell>
      );

    case "security":
      return (
        <SettingsPanelShell
          title="Security"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => {
            /* placeholder — wire to auth provider later */
          })}
        >
          <SettingsField label="Email" hint="Login email for this account">
            <SettingsInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </SettingsField>
          <SettingsField label="New password">
            <SettingsInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </SettingsField>
          <p className="settings-panel__note">Password changes will connect to your auth provider in a future update.</p>
        </SettingsPanelShell>
      );

    case "blocked":
      return (
        <SettingsPanelShell
          title="Blocked accounts"
          saved={saved}
          saving={saving}
          onSave={() =>
            wrapSave(() => {
              saveBlockedUsers(blocked);
            })
          }
        >
          <SettingsField label="Block a username">
            <div className="settings-inline-add">
              <SettingsInput
                value={blockInput}
                onChange={(e) => setBlockInput(e.target.value)}
                placeholder="@username"
              />
              <button
                type="button"
                className="settings-inline-add__btn"
                onClick={() => {
                  const handle = blockInput.trim().replace(/^@/, "");
                  if (!handle || blocked.includes(handle)) return;
                  setBlocked([...blocked, handle]);
                  setBlockInput("");
                }}
              >
                Block
              </button>
            </div>
          </SettingsField>
          {blocked.length === 0 ? (
            <p className="settings-panel__empty">No blocked accounts yet.</p>
          ) : (
            <ul className="settings-blocked-list">
              {blocked.map((handle) => (
                <li key={handle}>
                  <span>@{handle}</span>
                  <button
                    type="button"
                    onClick={() => setBlocked(blocked.filter((h) => h !== handle))}
                  >
                    Unblock
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SettingsPanelShell>
      );

    case "monetization":
      return (
        <SettingsPanelShell
          title="Creator program"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsField label="Payout email">
            <SettingsInput
              type="email"
              value={prefs.monetizationEmail}
              onChange={(e) => setPrefs({ ...prefs, monetizationEmail: e.target.value })}
              placeholder="payout@example.com"
            />
          </SettingsField>
          <SettingsToggle
            label="Accept tips"
            checked={prefs.monetizationTips}
            onChange={(monetizationTips) => setPrefs({ ...prefs, monetizationTips })}
          />
          <SettingsToggle
            label="Referral earnings"
            checked={prefs.monetizationReferrals}
            onChange={(monetizationReferrals) => setPrefs({ ...prefs, monetizationReferrals })}
          />
        </SettingsPanelShell>
      );

    case "requirements":
      return (
        <SettingsPanelShell title="Eligibility requirements">
          <ul className="settings-checklist">
            <li className={user!.followers >= 1000 ? "is-met" : ""}>1,000+ followers</li>
            <li className={user!.pulseScore >= 70 ? "is-met" : ""}>POP Score 70+</li>
            <li>Verified identity lane</li>
            <li>Clean account standing</li>
          </ul>
          <p className="settings-panel__note">You currently have {user!.followers.toLocaleString()} followers and POP {user!.pulseScore}.</p>
        </SettingsPanelShell>
      );

    case "levels":
      return (
        <SettingsPanelShell title="Creator levels">
          <SettingsChipGroup
            options={[
              { id: "spark", label: "Spark" },
              { id: "pulse", label: "Pulse" },
              { id: "wave", label: "Wave" },
              { id: "city", label: "City Icon" },
            ]}
            selected="spark"
            onChange={() => {}}
          />
          <p className="settings-panel__note">Level perks and unlocks will expand here.</p>
        </SettingsPanelShell>
      );

    case "qualify":
      return (
        <SettingsPanelShell title="How to qualify">
          <ol className="settings-steps">
            <li>Complete your profile and pick your lane</li>
            <li>Post consistently in your city feed</li>
            <li>Build followers and POP Score</li>
            <li>Apply when eligibility is met</li>
          </ol>
        </SettingsPanelShell>
      );

    case "channels":
      return (
        <SettingsPanelShell title="Monetization channels">
          <SettingsToggle
            label="Live gifts"
            checked={prefs.monetizationTips}
            onChange={(monetizationTips) => setPrefs({ ...prefs, monetizationTips })}
          />
          <SettingsToggle
            label="Marketplace listings"
            checked={prefs.monetizationReferrals}
            onChange={(monetizationReferrals) => setPrefs({ ...prefs, monetizationReferrals })}
          />
          <SettingsToggle
            label="Brand partnerships"
            checked={false}
            onChange={() => {}}
          />
          <p className="settings-panel__note">Channel toggles are placeholders — adjust as you wire payouts.</p>
        </SettingsPanelShell>
      );

    case "go-live":
      return (
        <SettingsPanelShell
          title="Go live"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsToggle
            label="Public by default"
            hint="New streams visible to your city"
            checked={prefs.livePublicByDefault}
            onChange={(livePublicByDefault) => setPrefs({ ...prefs, livePublicByDefault })}
          />
          <SettingsToggle
            label="Save replay to Pulse"
            checked={prefs.liveSaveReplay}
            onChange={(liveSaveReplay) => setPrefs({ ...prefs, liveSaveReplay })}
          />
        </SettingsPanelShell>
      );

    case "posting":
      return (
        <SettingsPanelShell
          title="Posting & stories"
          saved={saved}
          saving={saving}
          onSave={() => wrapSave(() => saveSettingsPrefs(prefs))}
        >
          <SettingsField label="Upload quality">
            <SettingsSelect
              value={prefs.postQuality}
              onChange={(e) =>
                setPrefs({ ...prefs, postQuality: e.target.value as SettingsPrefs["postQuality"] })
              }
            >
              <option value="auto">Auto</option>
              <option value="hd">HD</option>
              <option value="data-saver">Data saver</option>
            </SettingsSelect>
          </SettingsField>
          <SettingsToggle
            label="Share stories to city feed"
            checked={prefs.storyAutoShareFeed}
            onChange={(storyAutoShareFeed) => setPrefs({ ...prefs, storyAutoShareFeed })}
          />
        </SettingsPanelShell>
      );

    default:
      return null;
  }
}
