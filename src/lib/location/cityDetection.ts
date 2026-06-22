import { saveUserProfile, getUserProfile } from "@/lib/identity/userProfile";
import { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

export type CitySource = "gps" | "timezone" | "default";

export { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

const CITY_KEY = "popit:city";
const CITY_SOURCE_KEY = "popit:citySource";
const LOCATION_PROMPT_KEY = "popit:locationPromptSeen";

export const CITY_UPDATED_EVENT = "popit:cityUpdated";

export type CityUpdatedDetail = { city: string; source: CitySource };

/** US & common IANA zones → display city for feed personalization */
const TIMEZONE_CITY: Record<string, string> = {
  "America/New_York": "New York",
  "America/Detroit": "Detroit",
  "America/Chicago": "Chicago",
  "America/Denver": "Denver",
  "America/Phoenix": "Phoenix",
  "America/Los_Angeles": "Los Angeles",
  "America/Anchorage": "Anchorage",
  "Pacific/Honolulu": "Honolulu",
  "America/Boise": "Boise",
  "America/Indiana/Indianapolis": "Indianapolis",
  "America/Kentucky/Louisville": "Louisville",
  "America/Menominee": "Milwaukee",
  "America/North_Dakota/Center": "Fargo",
  "America/Juneau": "Juneau",
};

export function hasSeenLocationPrompt(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(LOCATION_PROMPT_KEY) === "1";
}

export function markLocationPromptSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCATION_PROMPT_KEY, "1");
}

export function getCitySource(): CitySource {
  if (typeof window === "undefined") return "default";
  const raw = localStorage.getItem(CITY_SOURCE_KEY);
  if (raw === "gps" || raw === "timezone" || raw === "default") return raw;
  return "default";
}

export function inferCityFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (TIMEZONE_CITY[tz]) return TIMEZONE_CITY[tz];
    if (tz.startsWith("America/")) {
      const segment = tz.split("/").pop() ?? "";
      return segment.replace(/_/g, " ");
    }
    if (tz.startsWith("US/")) {
      return tz.replace("US/", "").replace(/_/g, " ");
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_CITY_LABEL;
}

export function inferRegionFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("America/") || tz.startsWith("US/") || tz.startsWith("Pacific/Honolulu")) {
      return "United States";
    }
  } catch {
    /* fall through */
  }
  return "United States";
}

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      city?: string;
      locality?: string;
      principalSubdivision?: string;
    };
    return data.city || data.locality || data.principalSubdivision || null;
  } catch {
    return null;
  }
}

function persistCity(city: string, source: CitySource): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CITY_KEY, city);
  localStorage.setItem(CITY_SOURCE_KEY, source);
  saveUserProfile({ city });
  window.dispatchEvent(
    new CustomEvent<CityUpdatedDetail>(CITY_UPDATED_EVENT, { detail: { city, source } })
  );
}

function isLegacyDefault(city: string | null | undefined): boolean {
  if (!city) return true;
  const c = city.trim().toLowerCase();
  return c === LEGACY_DEFAULT_CITY.toLowerCase() || c === DEFAULT_CITY_LABEL.toLowerCase();
}

export function getStoredCity(): string | null {
  if (typeof window === "undefined") return null;
  const fromProfile = getUserProfile().city;
  if (fromProfile && !isLegacyDefault(fromProfile)) {
    return fromProfile;
  }
  const raw = localStorage.getItem(CITY_KEY);
  if (raw && !isLegacyDefault(raw)) return raw;
  return null;
}

/** Resolved label for UI — never silently assumes Miami */
export function getResolvedCity(): string {
  return getStoredCity() ?? inferCityFromTimezone();
}

/** Normalize profile/API city values (legacy Miami → detected city) */
export function normalizeProfileCity(city: string | null | undefined): string {
  if (!city || isLegacyDefault(city)) return getResolvedCity();
  return city;
}

export function requestGeolocationPosition(): Promise<GeolocationPosition | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      () => resolve(null),
      { enableHighAccuracy: false, maximumAge: 900_000, timeout: 12_000 }
    );
  });
}

export async function detectAndSaveCity(options?: {
  prompt?: boolean;
}): Promise<{ city: string; source: CitySource; region: string }> {
  if (options?.prompt) {
    markLocationPromptSeen();
  }

  const pos = await requestGeolocationPosition();
  if (pos) {
    const name = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    if (name) {
      persistCity(name, "gps");
      return { city: name, source: "gps", region: inferRegionFromTimezone() };
    }
  }

  const tzCity = inferCityFromTimezone();
  const source: CitySource = tzCity === DEFAULT_CITY_LABEL ? "default" : "timezone";
  persistCity(tzCity, source);
  return { city: tzCity, source, region: inferRegionFromTimezone() };
}

/** Run on boot when user has not picked a real city yet */
export async function bootstrapCityIfNeeded(): Promise<void> {
  if (typeof window === "undefined") return;
  const stored = getStoredCity();
  const source = getCitySource();
  if (stored && source === "gps") return;
  if (stored && source === "timezone" && !isLegacyDefault(stored)) return;

  try {
    const perm = await navigator.permissions?.query({ name: "geolocation" as PermissionName });
    if (perm?.state === "granted") {
      await detectAndSaveCity();
      return;
    }
  } catch {
    /* permissions API unavailable — fall through */
  }

  if (!stored || isLegacyDefault(stored)) {
    const tzCity = inferCityFromTimezone();
    persistCity(tzCity, tzCity === DEFAULT_CITY_LABEL ? "default" : "timezone");
  }
}

/** User declined GPS — save timezone-inferred city */
export function saveTimezoneFallbackCity(): { city: string; source: CitySource } {
  const city = inferCityFromTimezone();
  const source: CitySource = city === DEFAULT_CITY_LABEL ? "default" : "timezone";
  persistCity(city, source);
  return { city, source };
}
