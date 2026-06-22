export type PlatformSection = {
  id: string;
  label: string;
  hint: string;
  href: string;
  keywords: string[];
};

export const PLATFORM_SECTIONS: PlatformSection[] = [
  { id: "explore", label: "Explore", hint: "Discover worldwide", href: "/explore", keywords: ["explore", "discover", "world", "trending"] },
  { id: "feed", label: "Feed", hint: "People you follow", href: "/feed", keywords: ["feed", "following", "posts", "videos", "reels"] },
  { id: "pulse", label: "Your City", hint: "Local creators & businesses", href: "/pulse", keywords: ["city", "local", "area", "miami", "nearby", "your city", "pulse"] },
  { id: "map", label: "POP WORLD", hint: "Live map & venues", href: "/map", keywords: ["map", "world", "venues", "live", "nightlife", "pop world"] },
  { id: "messages", label: "Messages", hint: "Direct messages", href: "/messages", keywords: ["messages", "inbox", "dm", "chat"] },
  { id: "notifications", label: "Notifications", hint: "Alerts & activity", href: "/notifications", keywords: ["notifications", "alerts", "activity"] },
  { id: "settings", label: "Settings", hint: "Account & preferences", href: "/settings", keywords: ["settings", "account", "profile", "privacy"] },
  { id: "search", label: "Search", hint: "Find people & places", href: "/search", keywords: ["search", "find", "lookup", "pop search"] },
];

export function searchPlatformSections(query: string): PlatformSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return PLATFORM_SECTIONS.slice(0, 4);
  return PLATFORM_SECTIONS.filter(
    (section) =>
      section.label.toLowerCase().includes(q) ||
      section.hint.toLowerCase().includes(q) ||
      section.keywords.some((k) => k.includes(q) || q.includes(k))
  );
}
