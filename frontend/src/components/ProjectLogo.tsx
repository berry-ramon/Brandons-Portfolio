import { useEffect, useRef, useState } from "react";

/* =========================================================
   PROJECT LOGO
   ---------------------------------------------------------
   Fetches a logo from the project's own domain.
   Fallback chain (in order):
     1. /logo.png
     2. /assets/logo.png
     3. /favicon.ico
     4. /favicon.svg
     5. /assets/favicon.ico
     6. Letter monogram

   Notes:
   - loading="eager" is required because lazy-loading is
     unreliable inside transform-animated containers.
   - referrerPolicy is "origin" (not "no-referrer") so
     strict servers that reject null referrers still allow
     the request.
   - Handles the "cached before mount" case where onLoad
     may fire before React attaches the handler.
   ========================================================= */

const SOURCES = [
  "/logo.png",
  "/assets/logo.png",
  "/favicon.ico",
  "/favicon.svg",
  "/assets/favicon.ico",
] as const;

type Source = (typeof SOURCES)[number] | "error";

export function ProjectLogo({
  url,
  name,
  monogram,
  size = 40,
  className = "",
}: {
  url: string;
  name: string;
  monogram?: string;
  size?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Extract origin — e.g. "https://qr.brandonkimathi.top"
  let origin = "";
  try {
    origin = new URL(url).origin;
  } catch {
    origin = "";
  }

  const fallback = (monogram || name[0] || "?")
    .toString()
    .charAt(0)
    .toUpperCase();

  // Reset on URL change
  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [url]);

  const src: Source | string =
    index < SOURCES.length && origin ? `${origin}${SOURCES[index]}` : "error";
  const showImage = src !== "error";

  // Catch images that loaded before the onLoad handler attached
  // (very common for browser-cached images on remount)
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleError = () => {
    // Move to the next candidate in the chain
    if (index < SOURCES.length - 1) {
      setIndex((i) => i + 1);
      setLoaded(false);
    } else {
      setIndex(SOURCES.length);
    }
  };

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Monogram fallback — visible until the image loads */}
      {(!showImage || !loaded) && (
        <div
          className="absolute inset-0 grid place-items-center border border-border-subtle bg-background font-semibold text-foreground shadow-pressed"
          style={{ fontSize: size * 0.42 }}
        >
          {fallback}
        </div>
      )}

      {/* Actual logo image — eager loaded, no lazy deferral */}
      {showImage && (
        <img
          ref={imgRef}
          key={src}
          src={src}
          alt={`${name} logo`}
          width={size}
          height={size}
          loading="eager"
          decoding="async"
          referrerPolicy="origin"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`relative h-full w-full bg-background object-contain transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
}
