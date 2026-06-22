export type SettingsPanelId =
  | "edit-profile"
  | "identity"
  | "background"
  | "interests"
  | "feed"
  | "lobby"
  | "explore"
  | "notifications"
  | "messages"
  | "permissions"
  | "help"
  | "location"
  | "location-perm"
  | "monetization"
  | "requirements"
  | "levels"
  | "qualify"
  | "channels"
  | "privacy"
  | "security"
  | "blocked"
  | "go-live"
  | "posting";

export type SettingsHelpItem = {
  id: string;
  label: string;
  hint?: string;
  section: string;
  keywords: string[];
  /** Opens inline editor on the settings page */
  panel?: SettingsPanelId;
  /** External page (legal docs, help articles only) */
  href?: string;
};

export const SETTINGS_HELP_INDEX: SettingsHelpItem[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    hint: "Photo, name, bio, username",
    section: "Your POP'IT",
    keywords: ["profile", "photo", "name", "bio", "username", "avatar"],
    panel: "edit-profile",
  },
  {
    id: "identity",
    label: "Identity & Specialty",
    hint: "Update who you are in the city",
    section: "Your POP'IT",
    keywords: ["identity", "lane", "gamer", "creator", "business", "specialty"],
    panel: "identity",
  },
  {
    id: "background",
    label: "Platform Background",
    hint: "Flags, identity vibes, city energy",
    section: "Your POP'IT",
    keywords: ["background", "flag", "theme", "wallpaper", "vibe"],
    panel: "background",
  },
  {
    id: "interests",
    label: "Interests",
    hint: "Tune your city feed",
    section: "Your POP'IT",
    keywords: ["interests", "feed", "topics", "onboarding"],
    panel: "interests",
  },
  {
    id: "feed",
    label: "Social Feed",
    hint: "For You, Reels, Thoughts defaults",
    section: "Experience",
    keywords: ["feed", "posts", "reels", "thoughts", "following"],
    panel: "feed",
  },
  {
    id: "lobby",
    label: "Lobby Home",
    hint: "Landing layout preferences",
    section: "Experience",
    keywords: ["home", "lobby", "landing", "welcome"],
    panel: "lobby",
  },
  {
    id: "explore",
    label: "Explore Tab",
    hint: "Discovery grid preferences",
    section: "Experience",
    keywords: ["explore", "discover", "world", "grid"],
    panel: "explore",
  },
  {
    id: "notifications",
    label: "Notifications",
    hint: "Likes, follows, live alerts",
    section: "Experience",
    keywords: ["notifications", "alerts", "likes", "follows"],
    panel: "notifications",
  },
  {
    id: "messages",
    label: "Messages",
    hint: "DM privacy and read receipts",
    section: "Experience",
    keywords: ["messages", "dm", "chat", "inbox"],
    panel: "messages",
  },
  {
    id: "permissions",
    label: "Device Permissions",
    hint: "Camera, photos, mic, alerts — ZIP for local",
    section: "Permissions & Privacy",
    keywords: ["permissions", "camera", "microphone", "location", "photos", "notifications"],
    panel: "permissions",
  },
  {
    id: "help",
    label: "Help Center",
    hint: "Learn what each section does",
    section: "Permissions & Privacy",
    keywords: ["help", "support", "guide", "faq"],
    href: "/help",
  },
  {
    id: "location",
    label: "Update My ZIP",
    hint: "Change your POP environment when you travel",
    section: "Location",
    keywords: ["location", "city", "zip", "zipcode", "gps", "nearby", "travel"],
    panel: "location",
  },
  {
    id: "location-perm",
    label: "ZIP & Location",
    hint: "How POP'IT uses your ZIP code",
    section: "Location",
    keywords: ["location permission", "zip", "gps access"],
    panel: "location-perm",
  },
  {
    id: "monetization",
    label: "Creator Program",
    hint: "Overview, levels, and how to earn",
    section: "Monetization",
    keywords: ["monetization", "earn", "creator", "money", "payout"],
    panel: "monetization",
  },
  {
    id: "requirements",
    label: "Eligibility Requirements",
    hint: "Followers, POP Score, account standing",
    section: "Monetization",
    keywords: ["eligibility", "requirements", "followers", "pop score"],
    panel: "requirements",
  },
  {
    id: "levels",
    label: "Creator Levels",
    hint: "POP Marks and unlocks by tier",
    section: "Monetization",
    keywords: ["levels", "tier", "pop marks"],
    panel: "levels",
  },
  {
    id: "qualify",
    label: "How to Qualify",
    hint: "Step-by-step path to monetization",
    section: "Monetization",
    keywords: ["qualify", "how to", "steps"],
    panel: "qualify",
  },
  {
    id: "channels",
    label: "Monetization Channels",
    hint: "Referrals, gifts, marketplace",
    section: "Monetization",
    keywords: ["channels", "referrals", "gifts", "marketplace"],
    panel: "channels",
  },
  {
    id: "terms",
    label: "Terms of Service",
    href: "/legal/terms",
    section: "Legal",
    keywords: ["terms", "tos", "legal"],
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "/legal/privacy",
    section: "Legal",
    keywords: ["privacy", "policy", "data"],
  },
  {
    id: "community",
    label: "Community Guidelines",
    href: "/legal/community-guidelines",
    section: "Legal",
    keywords: ["community", "guidelines", "rules"],
  },
  {
    id: "data-deletion",
    label: "Data Deletion",
    href: "/legal/data-deletion",
    section: "Legal",
    keywords: ["delete", "data", "account"],
  },
  {
    id: "privacy",
    label: "Privacy",
    hint: "Who can see your POP card",
    section: "Privacy & Account",
    keywords: ["privacy", "visibility", "who can see"],
    panel: "privacy",
  },
  {
    id: "security",
    label: "Security",
    hint: "Password and login",
    section: "Privacy & Account",
    keywords: ["security", "password", "login", "2fa"],
    panel: "security",
  },
  {
    id: "blocked",
    label: "Blocked Accounts",
    hint: "Manage blocked users",
    section: "Privacy & Account",
    keywords: ["blocked", "block", "mute"],
    panel: "blocked",
  },
  {
    id: "go-live",
    label: "Go Live",
    hint: "Camera, mic, and broadcasting",
    section: "Create",
    keywords: ["live", "broadcast", "stream", "camera", "microphone"],
    panel: "go-live",
  },
  {
    id: "posting",
    label: "Posting & Stories",
    hint: "Pages, reels, and stories",
    section: "Create",
    keywords: ["post", "story", "reel", "video", "upload"],
    panel: "posting",
  },
];

export function searchSettingsHelp(query: string): SettingsHelpItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SETTINGS_HELP_INDEX.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.hint?.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
  );
}

export function settingsSections(): string[] {
  return [...new Set(SETTINGS_HELP_INDEX.map((i) => i.section))];
}

export function itemsBySection(section: string): SettingsHelpItem[] {
  return SETTINGS_HELP_INDEX.filter((i) => i.section === section);
}

export function getSettingsItem(id: string): SettingsHelpItem | undefined {
  return SETTINGS_HELP_INDEX.find((i) => i.id === id);
}
