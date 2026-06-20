/** Minimal GeoJSON types — avoids extra dependency during install */

export type GeoPolygon = {
  type: "Polygon";
  coordinates: [number, number][][];
};

export type GeoFeature<P = Record<string, unknown>> = {
  type: "Feature";
  id?: string;
  properties: P;
  geometry: GeoPolygon;
};

export type GeoFeatureCollection<P = Record<string, unknown>> = {
  type: "FeatureCollection";
  features: GeoFeature<P>[];
};
