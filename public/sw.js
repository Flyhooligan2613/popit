const CACHE = "popit-v5-overdrive";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))).then(() =>
        self.clients.claim()
      )
    )
  );
});

function isNetworkOnly(url) {
  return (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/onboarding") ||
    url.pathname === "/" ||
    url.pathname.includes("/brand/logo/") ||
    url.pathname.includes("popit-mark")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (isNetworkOnly(url)) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
