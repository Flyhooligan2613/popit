"use client";

import { useEffect } from "react";

const SW_URL = "/sw.js?v=7";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register(SW_URL, { scope: "/" }).catch(() => {});
  }, []);

  return null;
}
