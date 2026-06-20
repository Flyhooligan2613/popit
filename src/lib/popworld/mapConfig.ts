/** Miami — POP WORLD default city center */
export const MIAMI_CENTER: [number, number] = [-80.1918, 25.7617];

export const POP_WORLD_STYLE = "mapbox://styles/mapbox/dark-v11";

export const OPENING_CAMERA = {
  satellite: {
    center: MIAMI_CENTER,
    zoom: 10.8,
    pitch: 0,
    bearing: 0,
    duration: 0,
  },
  alive: {
    center: MIAMI_CENTER,
    zoom: 16.2,
    pitch: 62,
    bearing: -17,
    duration: 5800,
  },
  venueFocus: {
    zoom: 17.4,
    pitch: 58,
    bearing: -12,
    duration: 2200,
  },
} as const;

export const POP_WORLD_FOG = {
  color: "rgb(8, 14, 32)",
  "high-color": "rgb(28, 72, 180)",
  "horizon-blend": 0.04,
  "space-color": "rgb(6, 8, 18)",
  "star-intensity": 0.22,
} as const;

export const LAYER_IDS = {
  districtFill: "popworld-district-fill",
  districtGlow: "popworld-district-glow",
  districtLabels: "popworld-district-labels",
  buildings3d: "popworld-3d-buildings",
  venueExtrusion: "popworld-venue-extrusion",
  venueGlow: "popworld-venue-glow",
  venueWindows: "popworld-venue-windows",
  venueLegendary: "popworld-venue-legendary",
  roadsGlow: "popworld-roads-glow",
} as const;

export const SOURCE_IDS = {
  districts: "popworld-districts",
  venues: "popworld-venues",
} as const;

export function getMapboxToken(): string | undefined {
  return process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
}
