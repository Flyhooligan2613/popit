import { deriveDistrictEnergy } from "@/lib/city/vibeEngine";
import { getVerifiedBusinessesForCity } from "./cityBusinesses";
import { lookupBoost } from "./venueLookup";
import { POP_WORLD_DISTRICTS } from "./districts";
import type { GeoFeature, GeoFeatureCollection } from "./geojson";
import type { PopWorldVenue } from "./types";

/** Build a rectangular footprint around a venue coordinate */
function footprint(
  lng: number,
  lat: number,
  widthDeg = 0.00045,
  depthDeg = 0.00035
): [number, number][] {
  const hw = widthDeg / 2;
  const hd = depthDeg / 2;
  return [
    [lng - hw, lat - hd],
    [lng + hw, lat - hd],
    [lng + hw, lat + hd],
    [lng - hw, lat + hd],
    [lng - hw, lat - hd],
  ];
}

/** Real Miami coordinates + building profiles for verified venues */
const VENUE_GEO: Record<
  string,
  { lng: number; lat: number; kind: PopWorldVenue["kind"]; baseHeight: number; maxHeight: number; w?: number; d?: number }
> = {
  "ultra-music-festival": { lng: -80.1858, lat: 25.7742, kind: "stage", baseHeight: 8, maxHeight: 28, w: 0.0012, d: 0.0008 },
  "kaseya-arena": { lng: -80.1877, lat: 25.7814, kind: "stadium", baseHeight: 12, maxHeight: 55, w: 0.0009, d: 0.0007 },
  "joes-pizza": { lng: -80.1308, lat: 25.7682, kind: "restaurant", baseHeight: 6, maxHeight: 18, w: 0.00035, d: 0.00028 },
  "kai-studios": { lng: -80.1982, lat: 25.8012, kind: "studio", baseHeight: 8, maxHeight: 32, w: 0.0005, d: 0.0004 },
  "liv-miami": { lng: -80.1224, lat: 25.8178, kind: "nightclub", baseHeight: 10, maxHeight: 42, w: 0.00055, d: 0.00045 },
  "lan-arena": { lng: -80.1952, lat: 25.7702, kind: "stadium", baseHeight: 8, maxHeight: 28, w: 0.0006, d: 0.0005 },
  "bayfront-park": { lng: -80.1860, lat: 25.7753, kind: "pier", baseHeight: 2, maxHeight: 12, w: 0.001, d: 0.0006 },
  "design-district-popup": { lng: -80.1932, lat: 25.8132, kind: "shopping", baseHeight: 6, maxHeight: 24, w: 0.00045, d: 0.00038 },
  "msg-garden": { lng: -73.9934, lat: 40.7505, kind: "stadium", baseHeight: 14, maxHeight: 58, w: 0.00085, d: 0.00065 },
  "barclays-center": { lng: -73.9752, lat: 40.6826, kind: "stadium", baseHeight: 12, maxHeight: 48, w: 0.00075, d: 0.0006 },
  "carbone-nyc": { lng: -74.0021, lat: 40.7261, kind: "restaurant", baseHeight: 6, maxHeight: 20, w: 0.00032, d: 0.00026 },
  "marquee-nyc": { lng: -74.0042, lat: 40.7478, kind: "nightclub", baseHeight: 10, maxHeight: 38, w: 0.0005, d: 0.0004 },
  "summit-vanderbilt": { lng: -73.9772, lat: 40.7527, kind: "shopping", baseHeight: 18, maxHeight: 65, w: 0.00055, d: 0.00042 },
  "soho-house-nyc": { lng: -74.0078, lat: 40.7394, kind: "nightclub", baseHeight: 8, maxHeight: 30, w: 0.00048, d: 0.00038 },
};

/** Build venues for the user's city world — verified anchors on real street grids */
export function buildPopWorldVenues(city?: string | null): PopWorldVenue[] {
  const businesses = getVerifiedBusinessesForCity(city);
  return businesses.map((biz) => {
    const geo = VENUE_GEO[biz.slug];
    if (!geo) return null;

    const boost = lookupBoost(biz.slug);

    return {
      id: biz.slug,
      businessSlug: biz.slug,
      name: biz.name,
      districtId: biz.districtId as PopWorldVenue["districtId"],
      kind: geo.kind,
      coordinates: [geo.lng, geo.lat],
      footprint: footprint(geo.lng, geo.lat, geo.w, geo.d),
      baseHeight: geo.baseHeight,
      maxHeight: geo.maxHeight,
      baseEnergy: Math.min(100, biz.energy + boost),
      signals: biz.vibeSignals,
      accentColor: biz.accentColor,
      verified: biz.verified,
      live: biz.live,
    };
  }).filter(Boolean) as PopWorldVenue[];
}

export function venuesToGeoJSON(venues: PopWorldVenue[]): GeoFeatureCollection {
  const features: GeoFeature[] = venues.map((v) => {
    const energy = deriveDistrictEnergy(v.signals, v.baseEnergy);
    const height = v.baseHeight + ((v.maxHeight - v.baseHeight) * energy) / 100;

    return {
      type: "Feature",
      id: v.id,
      properties: {
        id: v.id,
        name: v.name,
        slug: v.businessSlug,
        districtId: v.districtId,
        kind: v.kind,
        energy,
        accentColor: v.accentColor,
        height,
        verified: v.verified,
        live: v.live,
      },
      geometry: {
        type: "Polygon",
        coordinates: [v.footprint],
      },
    };
  });

  return { type: "FeatureCollection", features };
}

export function districtsToGeoJSON(): GeoFeatureCollection {
  return {
    type: "FeatureCollection",
    features: POP_WORLD_DISTRICTS.map((d) => ({
      type: "Feature",
      id: d.id,
      properties: {
        id: d.id,
        label: d.label,
        primary: d.primary,
        glow: d.glow,
        particleColor: d.particleColor,
      },
      geometry: {
        type: "Polygon",
        coordinates: [d.boundary],
      },
    })),
  };
}

export function getVenueBySlug(slug: string, city?: string | null): PopWorldVenue | undefined {
  return buildPopWorldVenues(city).find((v) => v.businessSlug === slug);
}
