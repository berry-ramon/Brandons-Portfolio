// Register the service worker
export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              console.log("🔄 New service worker installing");

              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("🆕 New content available. Refresh to update.");

                  // Notify user of update
                  if (
                    window.confirm("New version available. Refresh to update?")
                  ) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Listen for messages from service worker
          navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data.type === "SYNC_COMPLETE") {
              console.log("🔄 Routes synced with cache:", event.data.routes);
            }
          });
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    });
  }
}

// Unregister service worker (for development)
export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
