/* =========================================================
   MAIN ENTRY — Brandon Kimathi Portfolio
   ---------------------------------------------------------
   Order matters here. Each import/statement runs in source
   order, so:

   1. Fonts first        → styles ready before first paint
   2. CSS                → global styles available to React
   3. PWA registration   → SW installs in parallel
   4. Analytics boot     → GA4 tag queued, listeners armed
   5. React render       → app mounts, RouteTracker fires
                           the first pageview
   ========================================================= */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* ---------- 1. Self-hosted fonts (no CDN, works offline) ---------- */

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";

import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

/* ---------- 2. Global CSS ---------- */

import "./index.css";

/* ---------- 3. PWA ---------- */

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onNeedRefresh() {
    // Auto-update mode handles this silently.
    // Hook available here if you ever want a "New version" toast.
  },
  onOfflineReady() {
    // First-visit install complete — site is now offline-ready.
    document.dispatchEvent(new CustomEvent("pwa:offline-ready"));
    if (import.meta.env.DEV) {
      console.info("[PWA] Ready for offline use");
    }
  },
  onRegistered(registration) {
    if (import.meta.env.DEV) {
      console.info("[PWA] SW registered · scope:", registration?.scope);
    }
    // Check for updates once an hour while the tab is open
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

/* ---------- 4. Analytics boot ----------
   initAnalytics() loads the GA4 tag (gtag.js — NOT gtm.js).
   installExternalLinkTracking() auto-captures outbound clicks.
   installErrorTracking() forwards JS errors as GA4 events.
   --------------------------------------------------------- */

import {
  initAnalytics,
  installErrorTracking,
  installExternalLinkTracking,
} from "./lib/analytics";

initAnalytics();
installExternalLinkTracking();
installErrorTracking();

/* ---------- 5. StrictMode gating ----------
   VITE_ENABLE_STRICT_MODE:
     "true"  → always on
     "false" → always off
     unset   → on in dev, off in prod (recommended)
   --------------------------------------------------------- */

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
