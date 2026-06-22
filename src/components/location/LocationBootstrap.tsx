"use client";

import { useEffect } from "react";
import { bootstrapCityIfNeeded } from "@/lib/location/cityDetection";
import LocationPermissionPrompt from "./LocationPermissionPrompt";

export default function LocationBootstrap() {
  useEffect(() => {
    void bootstrapCityIfNeeded();
  }, []);

  return <LocationPermissionPrompt />;
}
