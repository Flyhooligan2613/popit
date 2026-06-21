"use client";

import { useEffect } from "react";

const SW_URL = "/sw.js?v=6";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    void caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))));

    navigator.serviceWorker
      .register(SW_URL, { updateViaCache: "none", scope: "/" })
      .then((registration) => {
        registration.update();
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch(() => {});
  }, []);

  return null;
}
