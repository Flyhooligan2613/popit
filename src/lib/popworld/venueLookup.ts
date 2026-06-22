const LOOKUP_KEY = "popit:venueLookups";

type LookupMap = Record<string, number>;

function readLookups(): LookupMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOOKUP_KEY);
    return raw ? (JSON.parse(raw) as LookupMap) : {};
  } catch {
    return {};
  }
}

function saveLookups(map: LookupMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOOKUP_KEY, JSON.stringify(map));
}

/** Track when a user opens / searches a verified venue — boosts map ranking */
export function recordVenueLookup(slug: string) {
  const map = readLookups();
  map[slug] = (map[slug] ?? 0) + 1;
  saveLookups(map);
}

export function getVenueLookupCount(slug: string): number {
  return readLookups()[slug] ?? 0;
}

export function lookupBoost(slug: string): number {
  const count = getVenueLookupCount(slug);
  return Math.min(12, count * 2);
}

export function topLookupSlugs(limit = 6): string[] {
  return Object.entries(readLookups())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug);
}
