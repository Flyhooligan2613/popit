const PREFS_KEY = "popit:settingsPrefs";

export type SettingsPrefs = {
  profileVisibility: "public" | "followers" | "city";
  feedDefaultTab: "following" | "reels" | "thoughts";
  lobbyAnimations: boolean;
  exploreAutoplay: boolean;
  notifyLikes: boolean;
  notifyFollows: boolean;
  notifyLive: boolean;
  notifyMessages: boolean;
  dmRequests: "everyone" | "followers" | "none";
  readReceipts: boolean;
  livePublicByDefault: boolean;
  liveSaveReplay: boolean;
  postQuality: "auto" | "hd" | "data-saver";
  storyAutoShareFeed: boolean;
  monetizationEmail: string;
  monetizationTips: boolean;
  monetizationReferrals: boolean;
};

export const DEFAULT_SETTINGS_PREFS: SettingsPrefs = {
  profileVisibility: "public",
  feedDefaultTab: "following",
  lobbyAnimations: true,
  exploreAutoplay: true,
  notifyLikes: true,
  notifyFollows: true,
  notifyLive: true,
  notifyMessages: true,
  dmRequests: "everyone",
  readReceipts: true,
  livePublicByDefault: true,
  liveSaveReplay: false,
  postQuality: "auto",
  storyAutoShareFeed: false,
  monetizationEmail: "",
  monetizationTips: true,
  monetizationReferrals: false,
};

export function getSettingsPrefs(): SettingsPrefs {
  if (typeof window === "undefined") return DEFAULT_SETTINGS_PREFS;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_SETTINGS_PREFS;
    return { ...DEFAULT_SETTINGS_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS_PREFS;
  }
}

export function saveSettingsPrefs(partial: Partial<SettingsPrefs>) {
  if (typeof window === "undefined") return;
  const next = { ...getSettingsPrefs(), ...partial };
  localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  return next;
}

const BLOCKED_KEY = "popit:blockedUsers";

export function getBlockedUsers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BLOCKED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveBlockedUsers(users: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BLOCKED_KEY, JSON.stringify(users));
}
