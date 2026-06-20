const CACHE = "popit-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
        if (response.ok && event.request.method === "GET") {
          cache.put(event.request, response.clone());
        }
        return response;
      }))
    )
  );
});
