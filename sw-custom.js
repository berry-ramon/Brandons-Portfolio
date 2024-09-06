// const OFFLINE_URL = "/offline.html";
// const CACHE_NAME = "offline-cache-v1";

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         OFFLINE_URL,
//         "/index.html",
//         "/styles.css",
//         "/scripts.js",
//         // Add all your assets here
//       ]);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       fetch(event.request).catch(() => caches.match(OFFLINE_URL))
//     );
//   }
// });

// // Clean up old caches
// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       )
//     )
//   );
// });

// // Workbox injects manifest here:
// self.__WB_MANIFEST;
