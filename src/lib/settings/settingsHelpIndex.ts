export type SettingsHelpItem = {
  id: string;
  label: string;
  hint?: string;
  href: string;
  section: string;
  keywords: string[];
};

export const SETTINGS_HELP_INDEX: SettingsHelpItem[] = [
  {
    id: "edit-profile",
    label: "Edit Profile",
    hint: "Photo, name, bio, identity lane",
    href: "/pulse#profile",
    section: "Your POP'IT",
    keywords: ["profile", "photo", "name", "bio", "username", "avatar"],
  },
  {
    id: "identity",
    label: "Identity & Specialty",
    hint: "Update who you are in the city",
    href: "/help/identities",
    section: "Your POP'IT",
    keywords: ["identity", "lane", "gamer", "creator", "business", "specialty"],
  },
  {
    id: "background",
    label: "Platform Background",
    hint: "Flags, identity vibes, city energy",
    href: "/onboarding?skipIntro=1&background=1",
    section: "Your POP'IT",
    keywords: ["background", "flag", "theme", "wallpaper", "vibe"],
  },
  {
    id: "interests",
    label: "Interests",
    hint: "Tune your city feed",
    href: "/onboarding?skipIntro=1",
    section: "Your POP'IT",
    keywords: ["interests", "feed", "topics", "onboarding"],
  },
  {
    id: "feed",
    label: "Social Feed",
    hint: "For You, Reels, Thoughts",
    href: "/help/feed",
    section: "Experience",
    keywords: ["feed", "posts", "reels", "thoughts", "following"],
  },
  {
    id: "lobby",
    label: "Lobby Home",
    hint: "Your city landing",
    href: "/onboarding?skipIntro=1&explore=1",
    section: "Experience",
    keywords: ["home", "lobby", "landing", "welcome"],
  },
  {
    id: "explore",
    label: "Explore Tab",
    hint: "Worldwide discovery grid",
    href: "/explore",
    section: "Experience",
    keywords: ["explore", "discover", "world", "grid"],
  },
  {
    id: "notifications",
    label: "Notifications",
    hint: "Likes, follows, live alerts",
    href: "/notifications",
    section: "Experience",
    keywords: ["notifications", "alerts", "likes", "follows"],
  },
  {
    id: "messages",
    label: "Messages",
    hint: "Direct lens-to-lens chat",
    href: "/messages",
    section: "Experience",
    keywords: ["messages", "dm", "chat", "inbox"],
  },
  {
    id: "permissions",
    label: "Device Permissions",
    hint: "Location, camera, photos, mic, alerts",
    href: "/settings/permissions",
    section: "Permissions & Privacy",
    keywords: ["permissions", "camera", "microphone", "location", "photos", "notifications"],
  },
  {
    id: "help",
    label: "Help Center",
    hint: "Learn what each section does",
    href: "/help",
    section: "Permissions & Privacy",
    keywords: ["help", "support", "guide", "faq"],
  },
  {
    id: "location",
    label: "Update My City",
    hint: "Detect from GPS on your device",
    href: "/settings/location",
    section: "Location",
    keywords: ["location", "city", "gps", "nearby", "detect", "new york"],
  },
  {
    id: "location-perm",
    label: "Location Permission",
    hint: "Turn location on or off",
    href: "/settings/permissions",
    section: "Location",
    keywords: ["location permission", "gps access"],
  },
  {
    id: "monetization",
    label: "Creator Program",
    hint: "Overview, levels, and how to earn",
    href: "/monetization",
    section: "Monetization",
    keywords: ["monetization", "earn", "creator", "money", "payout"],
  },
  {
    id: "requirements",
    label: "Eligibility Requirements",
    hint: "Followers, POP Score, account standing",
    href: "/monetization/requirements",
    section: "Monetization",
    keywords: ["eligibility", "requirements", "followers", "pop score"],
  },
  {
    id: "levels",
    label: "Creator Levels",
    hint: "POP Marks and unlocks by tier",
    href: "/monetization/levels",
    section: "Monetization",
    keywords: ["levels", "tier", "pop marks"],
  },
  {
    id: "qualify",
    label: "How to Qualify",
    hint: "Step-by-step path to monetization",
    href: "/monetization/how-to-qualify",
    section: "Monetization",
    keywords: ["qualify", "how to", "steps"],
  },
  {
    id: "channels",
    label: "Monetization Channels",
    hint: "Referrals, gifts, marketplace",
    href: "/monetization/channels",
    section: "Monetization",
    keywords: ["channels", "referrals", "gifts", "marketplace"],
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
    href: "/settings/privacy",
    section: "Privacy & Account",
    keywords: ["privacy", "visibility", "who can see"],
  },
  {
    id: "security",
    label: "Security",
    hint: "Password and login",
    href: "/settings/security",
    section: "Privacy & Account",
    keywords: ["security", "password", "login", "2fa"],
  },
  {
    id: "blocked",
    label: "Blocked Accounts",
    hint: "Manage blocked users",
    href: "/settings/blocked",
    section: "Privacy & Account",
    keywords: ["blocked", "block", "mute"],
  },
  {
    id: "go-live",
    label: "Go Live",
    hint: "Camera, mic, and broadcasting",
    href: "/help/go-live",
    section: "Create",
    keywords: ["live", "broadcast", "stream", "camera", "microphone"],
  },
  {
    id: "posting",
    label: "Posting & Stories",
    hint: "Pages, reels, and stories",
    href: "/help/posting",
    section: "Create",
    keywords: ["post", "story", "reel", "video", "upload"],
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
