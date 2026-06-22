"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Map, { type MapRef } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  applyPopWorldAtmosphere,
  addPopWorldLayers,
  setDistrictLabelOpacity,
  setVenueHighlight,
} from "@/lib/popworld/mapLayers";
import {
  getMapboxToken,
  POP_WORLD_STYLE,
} from "@/lib/popworld/mapConfig";
import { getOpeningCameraForCity } from "@/lib/popworld/cityWorlds";
import { buildPopWorldVenues } from "@/lib/popworld/venues";
import { getResolvedCity } from "@/lib/location/cityDetection";
import type { PopWorldCameraPhase } from "@/lib/popworld/types";
import "./popworld.css";

type PopWorldMapProps = {
  city?: string;
  selectedVenueId: string | null;
  onVenueSelect: (venueId: string) => void;
  onPhaseChange?: (phase: PopWorldCameraPhase) => void;
  onReady?: () => void;
};

const PHASE_DELAYS: Record<PopWorldCameraPhase, number> = {
  satellite: 0,
  descent: 600,
  "buildings-rise": 2800,
  "lights-on": 4200,
  districts: 5000,
  "venues-glow": 5600,
  alive: 6200,
};

export default function PopWorldMap({
  city: cityProp,
  selectedVenueId,
  onVenueSelect,
  onPhaseChange,
  onReady,
}: PopWorldMapProps) {
  const city = cityProp ?? getResolvedCity();
  const mapRef = useRef<MapRef>(null);
  const token = getMapboxToken();
  const openingCamera = getOpeningCameraForCity(city);
  const venues = buildPopWorldVenues(city);
  const [phase, setPhase] = useState<PopWorldCameraPhase>("satellite");
  const [mapLoaded, setMapLoaded] = useState(false);
  const openingRan = useRef(false);

  const runOpening = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map || openingRan.current) return;
    openingRan.current = true;

    map.jumpTo({
      center: openingCamera.satellite.center,
      zoom: openingCamera.satellite.zoom,
      pitch: openingCamera.satellite.pitch,
      bearing: openingCamera.satellite.bearing,
    });

    setDistrictLabelOpacity(map, 0);

    const phases: PopWorldCameraPhase[] = [
      "satellite",
      "descent",
      "buildings-rise",
      "lights-on",
      "districts",
      "venues-glow",
      "alive",
    ];

    phases.forEach((p) => {
      setTimeout(() => {
        setPhase(p);
        onPhaseChange?.(p);

        if (p === "districts") {
          setDistrictLabelOpacity(map, 0.7);
        }
        if (p === "alive") {
          map.flyTo({
            ...openingCamera.alive,
            essential: true,
          });
          onReady?.();
        }
      }, PHASE_DELAYS[p]);
    });

    setTimeout(() => {
      map.flyTo({
        center: openingCamera.alive.center,
        zoom: 14.5,
        pitch: 35,
        bearing: -12,
        duration: 3200,
        essential: true,
      });
    }, PHASE_DELAYS.descent);
  }, [onPhaseChange, onReady, openingCamera]);

  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    applyPopWorldAtmosphere(map);
    addPopWorldLayers(map, venues);
    setMapLoaded(true);
    setTimeout(runOpening, 400);
  }, [venues, runOpening]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapLoaded) return;
    setVenueHighlight(map, selectedVenueId);

    if (selectedVenueId) {
      const venue = venues.find((v) => v.id === selectedVenueId);
      if (venue) {
        map.flyTo({
          center: venue.coordinates,
          zoom: openingCamera.venueFocus.zoom,
          pitch: openingCamera.venueFocus.pitch,
          bearing: openingCamera.venueFocus.bearing,
          duration: openingCamera.venueFocus.duration,
          essential: true,
        });
      }
    }
  }, [selectedVenueId, mapLoaded, venues, openingCamera]);

  const handleClick = useCallback(
    (event: MapMouseEvent) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      const features = map.queryRenderedFeatures(event.point, {
        layers: ["popworld-venue-extrusion", "popworld-venue-glow"],
      });

      const feature = features[0] as { properties?: Record<string, unknown> } | undefined;
      const venueId = feature?.properties?.id as string | undefined;
      if (venueId) onVenueSelect(venueId);
    },
    [onVenueSelect]
  );

  if (!token) {
    return (
      <div className="popworld-missing-token">
        <p className="popworld-missing-token__title">POP WORLD</p>
        <p className="popworld-missing-token__body">
          Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code>.env.local</code> to launch the living city.
        </p>
        <a
          href="https://account.mapbox.com/access-tokens/"
          target="_blank"
          rel="noopener noreferrer"
          className="popworld-missing-token__link"
        >
          Get a Mapbox token →
        </a>
      </div>
    );
  }

  return (
    <div className="popworld-map-wrap">
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        initialViewState={{
          longitude: openingCamera.satellite.center[0],
          latitude: openingCamera.satellite.center[1],
          zoom: openingCamera.satellite.zoom,
          pitch: 0,
          bearing: 0,
        }}
        mapStyle={POP_WORLD_STYLE}
        attributionControl={false}
        antialias
        onLoad={handleLoad}
        onClick={handleClick}
        style={{ width: "100%", height: "100%" }}
        interactiveLayerIds={["popworld-venue-extrusion", "popworld-venue-glow"]}
        cursor="pointer"
      />

      <div className={`popworld-phase popworld-phase--${phase}`} aria-hidden>
        <span className="popworld-phase__glow" />
      </div>

      <div className="popworld-particles" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="popworld-particle" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      <div className="popworld-vignette" aria-hidden />
    </div>
  );
}
