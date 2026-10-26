import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const emitSourcemaps = mode === "development";

  return {
    base: "/",

    build: {
      sourcemap: emitSourcemaps ? "inline" : false,
      minify: !emitSourcemaps,
      chunkSizeWarningLimit: 800,

      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;

            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/") ||
              id.includes("react/jsx-runtime")
            ) {
              return "vendor-react";
            }

            if (
              id.includes("/react-router/") ||
              id.includes("/react-router-dom/")
            ) {
              return "vendor-router";
            }

            if (id.includes("/motion/") || id.includes("/framer-motion/")) {
              return "vendor-motion";
            }

            return;
          },
        },
      },
    },

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",
        manifest: false,

        // Everything in public/ that isn't auto-picked by Vite
        includeAssets: [
          "favicon.ico",
          "favicon.svg",
          "robots.txt",
          "sitemap.xml",
          "humans.txt",
          "browserconfig.xml",
          "site.webmanifest",
          "me.jpg",
          "assets/**/*",
        ],

        workbox: {
          // Precache every built asset — the core of offline support
          globPatterns: [
            "**/*.{js,css,html,ico,png,jpg,jpeg,webp,avif,svg,gif,woff,woff2,ttf,otf,eot,json,xml,txt}",
          ],

          // Serve the cached shell for any navigation — this is what
          // prevents the 404 on refresh while offline
          navigateFallback: "/index.html",

          // Don't fall back for these paths — let the real files serve
          navigateFallbackDenylist: [
            /^\/api/,
            /^\/_vercel/,
            /^\/sw\.js/,
            /^\/workbox-/,
            /^\/assets\//,
          ],

          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,

          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,

          runtimeCaching: [
            // ── Tool screenshots — cached for 30 days ──
            {
              urlPattern: /^https:\/\/image\.thum\.io\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "site-screenshots",
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },

            // ── Everything image-related ──
            {
              urlPattern: ({ request }) => request.destination === "image",
              handler: "CacheFirst",
              options: {
                cacheName: "runtime-images",
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },

            // ── Font files (self-hosted, but safety net) ──
            {
              urlPattern: ({ request }) => request.destination === "font",
              handler: "CacheFirst",
              options: {
                cacheName: "runtime-fonts",
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },

            // ── Analytics: never block, never cache ──
            {
              urlPattern:
                /^https:\/\/(www\.)?(google-analytics|googletagmanager|plausible|umami|posthog)\./,
              handler: "NetworkOnly",
            },
          ],
        },

        devOptions: {
          enabled: false,
          type: "module",
        },
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
    },

    preview: {
      host: "0.0.0.0",
      port: 4173,
    },
  };
});
