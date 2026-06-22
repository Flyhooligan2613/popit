/** City worlds — real street grids & verified venue anchors (not GPS tracking) */

export type CityWorldId = "miami" | "new-york" | "default";

export type CityWorldConfig = {
  id: CityWorldId;
  label: string;
  downtownLabel: string;
  center: [number, number];
  descentLine: string;
  aliveLine: string;
};

const WORLDS: Record<CityWorldId, CityWorldConfig> = {
  miami: {
    id: "miami",
    label: "Miami",
    downtownLabel: "Downtown Miami",
    center: [-80.1918, 25.7617],
    descentLine: "Descending into Miami…",
    aliveLine: "Brickell · Wynwood · South Beach online",
  },
  "new-york": {
    id: "new-york",
    label: "New York",
    downtownLabel: "Downtown New York",
    center: [-73.9857, 40.7484],
    descentLine: "Descending into Manhattan…",
    aliveLine: "Midtown · SoHo · Brooklyn online",
  },
  default: {
    id: "default",
    label: "Your City",
    downtownLabel: "Your City",
    center: [-80.1918, 25.7617],
    descentLine: "Scanning the city grid…",
    aliveLine: "Verified venues coming online",
  },
};

export function resolveCityWorldId(city?: string | null): CityWorldId {
  const c = (city ?? "").trim().toLowerCase();
  if (!c) return "miami";
  if (c.includes("new york") || c.includes("nyc") || c.includes("manhattan") || c.includes("brooklyn")) {
    return "new-york";
  }
  if (c.includes("miami") || c.includes("brickell") || c.includes("wynwood") || c.includes("south beach")) {
    return "miami";
  }
  return "miami";
}

export function getCityWorld(city?: string | null): CityWorldConfig {
  return WORLDS[resolveCityWorldId(city)];
}

export function getOpeningCameraForCity(city?: string | null) {
  const world = getCityWorld(city);
  return {
    satellite: {
      center: world.center,
      zoom: 10.8,
      pitch: 0,
      bearing: 0,
      duration: 0,
    },
    alive: {
      center: world.center,
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
}
