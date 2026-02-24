const CACHE_NAME = "brandon-kimathi-v1";
const API_CACHE_NAME = "brandon-kimathi-api-v1";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/preview_big.png",
  "/preview_small.png",
  "/og-image.png",
  "/offline.html",
];

// Routes to cache for offline viewing
const ROUTES_TO_CACHE = [
  "/",
  "/work",
  "/how-i-think",
  "/about",
  "/contact",
  "/kodees",
];

// Install event - precache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Pre-caching static assets");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log("✅ Pre-caching complete");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Pre-caching failed:", error);
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return (
                name.startsWith("brandon-kimathi-") &&
                name !== CACHE_NAME &&
                name !== API_CACHE_NAME
              );
            })
            .map((name) => {
              console.log("🗑️ Deleting old cache:", name);
              return caches.delete(name);
            }),
        );
      })
      .then(() => {
        console.log("🚀 Service Worker activated, claiming clients");
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle page navigations
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Handle static assets
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Default strategy: network first, cache fallback
  event.respondWith(networkFirst(request));
});

// Handle navigation requests (HTML pages)
async function handleNavigation(request) {
  try {
    // Try network first for fresh content
    const networkResponse = await fetch(request);

    // Cache the response for offline
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    // Offline - try to serve from cache
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // If page not in cache, try matching route without trailing slash
    const url = new URL(request.url);
    const routeWithoutSlash = url.pathname.replace(/\/$/, "");
    const cachedRoute = await caches.match(routeWithoutSlash);

    if (cachedRoute) {
      return cachedRoute;
    }

    // Ultimate fallback to offline page
    return caches.match("/offline.html");
  }
}

// Handle static assets (cache first, network fallback)
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Background update
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response);
          });
        }
      })
      .catch(() => {});
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error("Failed to fetch asset:", request.url);
    return new Response("", { status: 404, statusText: "Not Found" });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response("", { status: 404 });
  }
}

// Helper to check if request is for static asset
function isStaticAsset(request) {
  const extensions = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".webp",
    ".woff",
    ".woff2",
    ".ttf",
  ];
  return extensions.some((ext) => request.url.includes(ext));
}

// Background sync for when user comes back online
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-routes") {
    event.waitUntil(syncRoutes());
  }
});

// Sync routes when back online
async function syncRoutes() {
  const cache = await caches.open(CACHE_NAME);

  for (const route of ROUTES_TO_CACHE) {
    try {
      const response = await fetch(route);
      if (response.ok) {
        await cache.put(route, response);
        console.log("🔄 Synced route:", route);
      }
    } catch (error) {
      console.log("❌ Failed to sync route:", route);
    }
  }

  // Notify all clients that sync is complete
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: "SYNC_COMPLETE",
      routes: ROUTES_TO_CACHE,
    });
  });
}
