import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  initAnalytics,
  installErrorTracking,
  installExternalLinkTracking,
} from "./lib/analytics";

/* =========================================================
   SELF-HOSTED FONTS - no CDN, works offline from first paint
   ========================================================= */

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

/* =========================================================
   PWA - service worker registration + offline ready
   ========================================================= */

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onNeedRefresh() {
    // New version available - auto-update silently
    // (autoUpdate mode handles this; hook available if you want a UI)
  },
  onOfflineReady() {
    // First-visit install complete - site is now offline-ready
    document.dispatchEvent(new CustomEvent("pwa:offline-ready"));
    if (import.meta.env.DEV) {
      console.info("[PWA] Ready for offline use");
    }
  },
  onRegistered(registration) {
    if (import.meta.env.DEV) {
      console.info("[PWA] SW registered:", registration?.scope);
    }
    // Check for updates every hour while the tab is open
    if (registration) {
      setInterval(
        () => {
          registration.update();
        },
        60 * 60 * 1000,
      );
    }
  },
  onRegisterError(err) {
    console.warn("[PWA] Registration failed:", err);
  },
});

/* =========================================================
   ANALYTICS BOOT
   ========================================================= */

initAnalytics();
installExternalLinkTracking();
installErrorTracking();

/* =========================================================
   STRICT MODE
   ========================================================= */

function resolveStrictMode(): boolean {
  const raw = import.meta.env.VITE_ENABLE_STRICT_MODE;
  if (raw === "true") return true;
  if (raw === "false") return false;
  return import.meta.env.DEV;
}

const tree = resolveStrictMode() ? (
  <React.StrictMode>
    <App />
  </React.StrictMode>
) : (
  <App />
);

ReactDOM.createRoot(document.getElementById("root")!).render(tree);
