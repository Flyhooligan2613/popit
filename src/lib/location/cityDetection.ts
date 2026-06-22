import { saveUserProfile, getUserProfile } from "@/lib/identity/userProfile";
import { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

export type CitySource = "gps" | "timezone" | "default";

export { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

const CITY_KEY = "popit:city";
const CITY_SOURCE_KEY = "popit:citySource";
const LOCATION_PROMPT_KEY = "popit:locationPromptSeen";

export const CITY_UPDATED_EVENT = "popit:cityUpdated";

export type CityUpdatedDetail = { city: string; source: CitySource };

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

/** Timezone hint only — never used as a display city unless user explicitly accepts fallback */
export function inferCityFromTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("America/") || tz.startsWith("US/")) {
      const segment = tz.split("/").pop() ?? "";
      if (segment) return segment.replace(/_/g, " ");
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

/** Resolved label for UI — only shows GPS-stored city or placeholder until detected */
export function getResolvedCity(): string {
  const stored = getStoredCity();
  if (stored) return stored;
  const source = getCitySource();
  if (source === "gps") return getUserProfile().city || DEFAULT_CITY_LABEL;
  return DEFAULT_CITY_LABEL;
}

export function citySourceLabel(source: CitySource | null): string {
  if (source === "gps") return "From your device GPS";
  if (source === "timezone") return "Estimated from time zone";
  return "Not detected yet";
}

/** Normalize profile/API city values (legacy Miami → detected city) */
export function normalizeProfileCity(city: string | null | undefined): string {
  if (!city || isLegacyDefault(city)) return getResolvedCity();
  return city;
}

export function requestGeolocationPosition(options?: {
  highAccuracy?: boolean;
}): Promise<GeolocationPosition | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      () => resolve(null),
      {
        enableHighAccuracy: options?.highAccuracy ?? false,
        maximumAge: options?.highAccuracy ? 0 : 900_000,
        timeout: options?.highAccuracy ? 20_000 : 12_000,
      }
    );
  });
}

export async function detectAndSaveCity(options?: {
  prompt?: boolean;
}): Promise<{ city: string; source: CitySource; region: string }> {
  if (options?.prompt) {
    markLocationPromptSeen();
  }

  const pos = await requestGeolocationPosition({ highAccuracy: Boolean(options?.prompt) });
  if (pos) {
    const name = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    if (name) {
      persistCity(name, "gps");
      return { city: name, source: "gps", region: inferRegionFromTimezone() };
    }
  }

  const existing = getStoredCity();
  if (existing) {
    return { city: existing, source: getCitySource(), region: inferRegionFromTimezone() };
  }

  const tzCity = inferCityFromTimezone();
  const source: CitySource = tzCity === DEFAULT_CITY_LABEL ? "default" : "timezone";
  if (options?.prompt) {
    persistCity(tzCity, source);
  }
  return { city: tzCity, source, region: inferRegionFromTimezone() };
}

/** Run on boot — prefer GPS when permission already granted */
export async function bootstrapCityIfNeeded(): Promise<void> {
  if (typeof window === "undefined") return;
  const stored = getStoredCity();
  const source = getCitySource();
  if (stored && source === "gps") return;

  try {
    const perm = await navigator.permissions?.query({ name: "geolocation" as PermissionName });
    if (perm?.state === "granted") {
      const result = await detectAndSaveCity({ prompt: false });
      if (result.source === "gps") return;
    }
  } catch {
    /* permissions API unavailable */
  }

  if (!stored || isLegacyDefault(stored)) {
    /* Do not persist timezone guess as city — wait for user GPS prompt */
    const profileCity = getUserProfile().city;
    if (isLegacyDefault(profileCity)) {
      saveUserProfile({ city: DEFAULT_CITY_LABEL });
    }
  }
}

/** User declined GPS — save timezone-inferred city as fallback */
export function saveTimezoneFallbackCity(): { city: string; source: CitySource } {
  const city = inferCityFromTimezone();
  const source: CitySource = city === DEFAULT_CITY_LABEL ? "default" : "timezone";
  persistCity(city, source);
  return { city, source };
}
