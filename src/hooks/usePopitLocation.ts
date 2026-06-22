"use client";

import { useEffect, useState } from "react";
import {
  CITY_UPDATED_EVENT,
  getLocationDisplayLabel,
  getLocationTimezone,
  getPopitLocation,
  getResolvedCity,
  getStoredZipCode,
  type CityUpdatedDetail,
  type PopitLocation,
} from "@/lib/location/zipLocation";

export function usePopitLocation() {
  const [location, setLocation] = useState<PopitLocation | null>(() => getPopitLocation());
  const [city, setCity] = useState(() => getResolvedCity());
  const [label, setLabel] = useState(() => getLocationDisplayLabel());
  const [zipCode, setZipCode] = useState(() => getStoredZipCode());
  const [timezone, setTimezone] = useState(() => getLocationTimezone());

  useEffect(() => {
    const sync = () => {
      setLocation(getPopitLocation());
      setCity(getResolvedCity());
      setLabel(getLocationDisplayLabel());
      setZipCode(getStoredZipCode());
      setTimezone(getLocationTimezone());
    };
    sync();

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CityUpdatedDetail>).detail;
      if (detail?.location) setLocation(detail.location);
      if (detail?.city) setCity(detail.city);
      if (detail?.zipCode) setZipCode(detail.zipCode);
      if (detail?.timezone) setTimezone(detail.timezone);
      setLabel(getLocationDisplayLabel());
    };

    window.addEventListener(CITY_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CITY_UPDATED_EVENT, onUpdate);
  }, []);

  return { location, city, label, zipCode, timezone };
}

/** @deprecated use usePopitLocation().city */
export function useResolvedCity(initial?: string | null) {
  const { city } = usePopitLocation();
  return initial ?? city;
}
