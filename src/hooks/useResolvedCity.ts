"use client";

import { useEffect, useState } from "react";
import {
  CITY_UPDATED_EVENT,
  getResolvedCity,
  type CityUpdatedDetail,
} from "@/lib/location/cityDetection";

/** Subscribes to GPS / timezone city resolution across the app */
export function useResolvedCity(initial?: string | null) {
  const [city, setCity] = useState<string>(() => initial ?? getResolvedCity());

  useEffect(() => {
    setCity(getResolvedCity());

    const onCityUpdated = (event: Event) => {
      const detail = (event as CustomEvent<CityUpdatedDetail>).detail;
      if (detail?.city) setCity(detail.city);
    };

    window.addEventListener(CITY_UPDATED_EVENT, onCityUpdated);
    return () => window.removeEventListener(CITY_UPDATED_EVENT, onCityUpdated);
  }, []);

  return city;
}
