const OFFLINE_URL = "./offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        "/index.html",
        "/styles.css",
        "/scripts.js",
        "/images/android-chrome-192x192.png",
        "/images/android-chrome-512x512.png",
        "/images/apple-touch-icon.png",
        "/images/Author.jpg",
        "/images/contactme.png" // Add all essential assets
        // Add other assets you need offline
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
});
