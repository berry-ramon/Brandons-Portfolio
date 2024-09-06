const { generateSW } = require("workbox-build");

generateSW({
  globDirectory: "./", // The root directory to cache
  globPatterns: [
    "**/*.{html,js,css,png,jpg,mp4}", // Files to cache
  ],
  swDest: "dist/sw.js", // Output service worker file
  skipWaiting: true, // This makes the new SW take control immediately
  clientsClaim: true, // This ensures the SW controls all pages
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|mp4)$/, // Cache media files
      handler: "CacheFirst",
      options: {
        cacheName: "media-cache",
        expiration: {
          maxEntries: 50, // Limit to 50 media files
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:html|js|css)$/, // Cache static resources
      handler: "StaleWhileRevalidate", // Always update in the background
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 30, // Limit to 30 entries
        },
      },
    },
  ],
}).then(({ count, size }) => {
  console.log(
    `Generated sw.js, which will precache ${count} files, totaling ${size} bytes.`
  );
});
