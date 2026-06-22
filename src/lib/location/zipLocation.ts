import { saveUserProfile, getUserProfile } from "@/lib/identity/userProfile";
import { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

export type LocationSource = "zip" | "gps-zip" | "default";

export type PopitLocation = {
  zipCode: string;
  city: string;
  state: string;
  stateAbbr: string;
  latitude: number;
  longitude: number;
  timezone: string;
  source: LocationSource;
};

export { DEFAULT_CITY_LABEL, LEGACY_DEFAULT_CITY } from "./constants";

const LOCATION_KEY = "popit:location";
const CITY_KEY = "popit:city";
const CITY_SOURCE_KEY = "popit:citySource";
const ZIP_KEY = "popit:zipCode";
const LOCATION_PROMPT_KEY = "popit:locationPromptSeen";

export const CITY_UPDATED_EVENT = "popit:cityUpdated";

export type CityUpdatedDetail = {
  city: string;
  source: LocationSource;
  zipCode?: string;
  state?: string;
  timezone?: string;
  location?: PopitLocation | null;
};

/** @deprecated use LocationSource */
export type CitySource = LocationSource;

const STATE_TIMEZONE: Record<string, string> = {
  AL: "America/Chicago",
  AK: "America/Anchorage",
  AZ: "America/Phoenix",
  AR: "America/Chicago",
  CA: "America/Los_Angeles",
  CO: "America/Denver",
  CT: "America/New_York",
  DE: "America/New_York",
  DC: "America/New_York",
  FL: "America/New_York",
  GA: "America/New_York",
  HI: "Pacific/Honolulu",
  ID: "America/Boise",
  IL: "America/Chicago",
  IN: "America/Indiana/Indianapolis",
  IA: "America/Chicago",
  KS: "America/Chicago",
  KY: "America/New_York",
  LA: "America/Chicago",
  ME: "America/New_York",
  MD: "America/New_York",
  MA: "America/New_York",
  MI: "America/Detroit",
  MN: "America/Chicago",
  MS: "America/Chicago",
  MO: "America/Chicago",
  MT: "America/Denver",
  NE: "America/Chicago",
  NV: "America/Los_Angeles",
  NH: "America/New_York",
  NJ: "America/New_York",
  NM: "America/Denver",
  NY: "America/New_York",
  NC: "America/New_York",
  ND: "America/Chicago",
  OH: "America/New_York",
  OK: "America/Chicago",
  OR: "America/Los_Angeles",
  PA: "America/New_York",
  RI: "America/New_York",
  SC: "America/New_York",
  SD: "America/Chicago",
  TN: "America/Chicago",
  TX: "America/Chicago",
  UT: "America/Denver",
  VT: "America/New_York",
  VA: "America/New_York",
  WA: "America/Los_Angeles",
  WV: "America/New_York",
  WI: "America/Chicago",
  WY: "America/Denver",
};

export function normalizeZipInput(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 5);
}

export function isValidZipCode(zip: string): boolean {
  return /^\d{5}$/.test(normalizeZipInput(zip));
}

async function resolveTimezone(lat: number, lng: number, stateAbbr: string): Promise<string> {
  try {
    const res = await fetch(
      `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lng}`
    );
    if (res.ok) {
      const data = (await res.json()) as { timeZone?: string };
      if (data.timeZone) return data.timeZone;
    }
  } catch {
    /* fall through to state map */
  }
  return STATE_TIMEZONE[stateAbbr] ?? "America/New_York";
}

type ZippopotamResponse = {
  "post code": string;
  places: {
    "place name": string;
    state: string;
    "state abbreviation": string;
    latitude: string;
    longitude: string;
  }[];
};

export async function lookupZipCode(zip: string): Promise<PopitLocation | null> {
  const normalized = normalizeZipInput(zip);
  if (!isValidZipCode(normalized)) return null;

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${normalized}`);
    if (!res.ok) return null;
    const data = (await res.json()) as ZippopotamResponse;
    const place = data.places[0];
    if (!place) return null;

    const latitude = parseFloat(place.latitude);
    const longitude = parseFloat(place.longitude);
    const stateAbbr = place["state abbreviation"];
    const timezone = await resolveTimezone(latitude, longitude, stateAbbr);

    return {
      zipCode: normalized,
      city: place["place name"],
      state: place.state,
      stateAbbr,
      latitude,
      longitude,
      timezone,
      source: "zip",
    };
  } catch {
    return null;
  }
}

function persistLocation(location: PopitLocation): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  localStorage.setItem(ZIP_KEY, location.zipCode);
  localStorage.setItem(CITY_KEY, location.city);
  localStorage.setItem(CITY_SOURCE_KEY, location.source);
  saveUserProfile({
    city: location.city,
    zipCode: location.zipCode,
    state: location.stateAbbr,
    timezone: location.timezone,
  });
  window.dispatchEvent(
    new CustomEvent<CityUpdatedDetail>(CITY_UPDATED_EVENT, {
      detail: {
        city: location.city,
        source: location.source,
        zipCode: location.zipCode,
        state: location.stateAbbr,
        timezone: location.timezone,
        location,
      },
    })
  );
}

export function getPopitLocation(): PopitLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCATION_KEY);
    if (raw) return JSON.parse(raw) as PopitLocation;
  } catch {
    /* ignore */
  }

  const profile = getUserProfile();
  if (profile.zipCode && profile.city) {
    return {
      zipCode: profile.zipCode,
      city: profile.city,
      state: profile.state ?? profile.city,
      stateAbbr: profile.state ?? "",
      latitude: profile.latitude ?? 40.7,
      longitude: profile.longitude ?? -74,
      timezone: profile.timezone ?? "America/New_York",
      source: "zip",
    };
  }
  return null;
}

export function getStoredZipCode(): string | null {
  const loc = getPopitLocation();
  if (loc?.zipCode) return loc.zipCode;
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ZIP_KEY);
}

function isLegacyDefault(city: string | null | undefined): boolean {
  if (!city) return true;
  const c = city.trim().toLowerCase();
  return c === LEGACY_DEFAULT_CITY.toLowerCase() || c === DEFAULT_CITY_LABEL.toLowerCase();
}

export function getStoredCity(): string | null {
  const loc = getPopitLocation();
  if (loc?.city) return loc.city;

  const fromProfile = getUserProfile().city;
  if (fromProfile && !isLegacyDefault(fromProfile)) return fromProfile;

  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CITY_KEY);
  if (raw && !isLegacyDefault(raw)) return raw;
  return null;
}

export function getResolvedCity(): string {
  const loc = getPopitLocation();
  if (loc) return loc.city;
  const stored = getStoredCity();
  if (stored) return stored;
  return DEFAULT_CITY_LABEL;
}

export function getLocationDisplayLabel(): string {
  const loc = getPopitLocation();
  if (!loc) return DEFAULT_CITY_LABEL;
  return `${loc.city}, ${loc.stateAbbr} · ${loc.zipCode}`;
}

export function getLocationTimezone(): string {
  return getPopitLocation()?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getCitySource(): LocationSource {
  return getPopitLocation()?.source ?? "default";
}

export function citySourceLabel(source: LocationSource | null): string {
  if (source === "zip") return "From your ZIP code";
  if (source === "gps-zip") return "ZIP detected from device";
  return "Set your ZIP in Settings";
}

export function hasSeenLocationPrompt(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(LOCATION_PROMPT_KEY) === "1";
}

export function markLocationPromptSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCATION_PROMPT_KEY, "1");
}

export function normalizeProfileCity(city: string | null | undefined): string {
  if (!city || isLegacyDefault(city)) return getResolvedCity();
  return city;
}

export async function saveZipCode(
  zip: string,
  source: LocationSource = "zip"
): Promise<{ ok: true; location: PopitLocation } | { ok: false; error: string }> {
  const location = await lookupZipCode(zip);
  if (!location) {
    return { ok: false, error: "Invalid ZIP — enter a 5-digit U.S. ZIP code." };
  }
  persistLocation({ ...location, source });
  return { ok: true, location: { ...location, source } };
}

async function reverseGeocodeZip(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { postcode?: string };
    return data.postcode?.replace(/\D/g, "").slice(0, 5) ?? null;
  } catch {
    return null;
  }
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

/** Detect ZIP from GPS (optional helper), then resolve full location */
export async function detectZipFromGps(): Promise<
  { ok: true; location: PopitLocation } | { ok: false; error: string }
> {
  const pos = await requestGeolocationPosition({ highAccuracy: true });
  if (!pos) {
    return { ok: false, error: "Could not read device location. Enter your ZIP manually." };
  }
  const zip = await reverseGeocodeZip(pos.coords.latitude, pos.coords.longitude);
  if (!zip) {
    return { ok: false, error: "Could not find a ZIP for your location. Enter it manually." };
  }
  const result = await saveZipCode(zip, "gps-zip");
  return result.ok ? result : { ok: false, error: result.error };
}

/** @deprecated use saveZipCode */
export async function detectAndSaveCity(options?: { prompt?: boolean }): Promise<{
  city: string;
  source: LocationSource;
  region: string;
  zipCode?: string;
}> {
  if (options?.prompt) markLocationPromptSeen();
  const existing = getPopitLocation();
  if (existing) {
    return {
      city: existing.city,
      source: existing.source,
      region: existing.state,
      zipCode: existing.zipCode,
    };
  }
  return { city: DEFAULT_CITY_LABEL, source: "default", region: "United States" };
}

export async function bootstrapCityIfNeeded(): Promise<void> {
  if (typeof window === "undefined") return;
  const loc = getPopitLocation();
  if (loc?.zipCode) return;

  const profileCity = getUserProfile().city;
  if (isLegacyDefault(profileCity)) {
    saveUserProfile({ city: DEFAULT_CITY_LABEL });
  }
}

/** @deprecated — ZIP is manual; skip leaves placeholder city */
export function saveTimezoneFallbackCity(): { city: string; source: LocationSource } {
  markLocationPromptSeen();
  return { city: DEFAULT_CITY_LABEL, source: "default" };
}

export function inferRegionFromTimezone(): string {
  const loc = getPopitLocation();
  if (loc?.state) return loc.state;
  return "United States";
}

export function inferCityFromTimezone(): string {
  return getResolvedCity();
}

export function estimateTempFromLocation(loc: PopitLocation | null, hour: number): number {
  const lat = loc?.latitude ?? 40.7;
  const base = Math.round(72 - (lat - 35) * 1.1);
  const hourOffset = hour >= 6 && hour < 10 ? -5 : hour >= 14 && hour < 17 ? 4 : hour >= 20 ? -7 : 0;
  return Math.max(28, Math.min(98, base + hourOffset));
}

export function hourInTimezone(timezone: string): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    }).formatToParts(new Date());
    const hour = parts.find((p) => p.type === "hour")?.value ?? "12";
    return parseInt(hour, 10);
  } catch {
    return new Date().getHours();
  }
}
