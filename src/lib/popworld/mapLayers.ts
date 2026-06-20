import type { GeoJSONSource, Map as MapboxMap } from "mapbox-gl";
import { LAYER_IDS, POP_WORLD_FOG, SOURCE_IDS } from "./mapConfig";
import { districtsToGeoJSON, venuesToGeoJSON } from "./venues";
import type { PopWorldVenue } from "./types";

export function applyPopWorldAtmosphere(map: MapboxMap) {
  map.setFog(POP_WORLD_FOG);

  if (!map.getSource("mapbox-dem")) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
  }
  map.setTerrain({ source: "mapbox-dem", exaggeration: 1.15 });
}

export function addPopWorldLayers(map: MapboxMap, venues: PopWorldVenue[]) {
  if (!map.getSource(SOURCE_IDS.districts)) {
    map.addSource(SOURCE_IDS.districts, {
      type: "geojson",
      data: districtsToGeoJSON(),
    });
  }

  if (!map.getSource(SOURCE_IDS.venues)) {
    map.addSource(SOURCE_IDS.venues, {
      type: "geojson",
      data: venuesToGeoJSON(venues),
    });
  }

  if (!map.getLayer(LAYER_IDS.buildings3d)) {
    map.addLayer({
      id: LAYER_IDS.buildings3d,
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 13,
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "height"],
          0, "#0c0e18",
          50, "#141828",
          120, "#1a2040",
        ],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "min_height"],
        "fill-extrusion-opacity": 0.82,
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.districtGlow)) {
    map.addLayer({
      id: LAYER_IDS.districtGlow,
      type: "fill",
      source: SOURCE_IDS.districts,
      paint: {
        "fill-color": ["get", "primary"],
        "fill-opacity": 0.06,
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.districtFill)) {
    map.addLayer({
      id: LAYER_IDS.districtFill,
      type: "line",
      source: SOURCE_IDS.districts,
      paint: {
        "line-color": ["get", "primary"],
        "line-width": 2,
        "line-opacity": 0.35,
        "line-blur": 1,
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.districtLabels)) {
    map.addLayer({
      id: LAYER_IDS.districtLabels,
      type: "symbol",
      source: SOURCE_IDS.districts,
      layout: {
        "text-field": ["get", "label"],
        "text-size": 11,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.18,
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
        "text-anchor": "center",
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-color": "rgba(0,0,0,0.8)",
        "text-halo-width": 1.5,
        "text-opacity": 0.7,
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.venueGlow)) {
    map.addLayer({
      id: LAYER_IDS.venueGlow,
      type: "fill",
      source: SOURCE_IDS.venues,
      paint: {
        "fill-color": ["get", "accentColor"],
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["get", "energy"],
          0, 0.05,
          40, 0.15,
          60, 0.28,
          80, 0.42,
          90, 0.58,
        ],
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.venueExtrusion)) {
    map.addLayer({
      id: LAYER_IDS.venueExtrusion,
      type: "fill-extrusion",
      source: SOURCE_IDS.venues,
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "energy"],
          0, "#1a1a2e",
          30, ["get", "accentColor"],
          60, ["get", "accentColor"],
          90, "#ffffff",
        ],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["get", "energy"],
          0, 0.45,
          60, 0.78,
          90, 0.95,
        ],
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.venueWindows)) {
    map.addLayer({
      id: LAYER_IDS.venueWindows,
      type: "line",
      source: SOURCE_IDS.venues,
      paint: {
        "line-color": ["get", "accentColor"],
        "line-width": [
          "interpolate",
          ["linear"],
          ["get", "energy"],
          20, 0.5,
          60, 2,
          90, 3.5,
        ],
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["get", "energy"],
          0, 0.1,
          40, 0.45,
          80, 0.85,
        ],
        "line-blur": 0.5,
      },
    });
  }

  if (!map.getLayer(LAYER_IDS.venueLegendary)) {
    map.addLayer({
      id: LAYER_IDS.venueLegendary,
      type: "fill-extrusion",
      source: SOURCE_IDS.venues,
      filter: [">=", ["get", "energy"], 90],
      paint: {
        "fill-extrusion-color": "#ffffff",
        "fill-extrusion-height": ["+", ["get", "height"], 8],
        "fill-extrusion-base": ["get", "height"],
        "fill-extrusion-opacity": 0.35,
      },
    });
  }
}

export function refreshVenueEnergy(map: MapboxMap, venues: PopWorldVenue[]) {
  const source = map.getSource(SOURCE_IDS.venues) as GeoJSONSource | undefined;
  source?.setData(venuesToGeoJSON(venues));
}

export function setDistrictLabelOpacity(map: MapboxMap, opacity: number) {
  if (map.getLayer(LAYER_IDS.districtLabels)) {
    map.setPaintProperty(LAYER_IDS.districtLabels, "text-opacity", opacity);
  }
}

export function setVenueHighlight(map: MapboxMap, venueId: string | null) {
  const extrusionLayer = LAYER_IDS.venueExtrusion;
  if (!map.getLayer(extrusionLayer)) return;

  if (venueId) {
    map.setPaintProperty(extrusionLayer, "fill-extrusion-opacity", [
      "case",
      ["==", ["get", "id"], venueId],
      1,
      [
        "interpolate",
        ["linear"],
        ["get", "energy"],
        0, 0.35,
        60, 0.65,
        90, 0.85,
      ],
    ]);
  }
}
