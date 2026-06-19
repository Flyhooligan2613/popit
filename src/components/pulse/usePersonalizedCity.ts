"use client";

import { useEffect, useState } from "react";
import {
  getPersonalizedScenes,
  getUserInterests,
  type CityScene,
} from "@/lib/city/personalizedCity";

export function usePersonalizedCity() {
  const [scenes, setScenes] = useState<CityScene[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const userInterests = getUserInterests();
    setInterests(userInterests);
    setScenes(getPersonalizedScenes(userInterests));
  }, []);

  return { scenes, interests, isPersonalized: interests.length > 0 };
}
