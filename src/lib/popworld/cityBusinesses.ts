import { VERIFIED_BUSINESSES } from "@/lib/city/businesses";
import { NYC_VERIFIED_BUSINESSES } from "@/lib/city/nycBusinesses";
import type { VerifiedBusiness } from "@/lib/city/businesses";
import { resolveCityWorldId } from "./cityWorlds";
import { lookupBoost } from "./venueLookup";

export function getVerifiedBusinessesForCity(city?: string | null): VerifiedBusiness[] {
  const worldId = resolveCityWorldId(city);
  if (worldId === "new-york") return NYC_VERIFIED_BUSINESSES;
  return VERIFIED_BUSINESSES;
}

export function rankBusinessesWithLookups(city?: string | null) {
  const businesses = getVerifiedBusinessesForCity(city);
  return [...businesses]
    .map((b) => ({
      ...b,
      lookupBoost: lookupBoost(b.slug),
      displayEnergy: Math.min(100, b.energy + lookupBoost(b.slug)),
    }))
    .sort((a, b) => b.displayEnergy - a.displayEnergy);
}
