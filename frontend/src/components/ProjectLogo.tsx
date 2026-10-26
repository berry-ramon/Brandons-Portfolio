import { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   PROJECT LOGO
   ---------------------------------------------------------
   Resolution order:
     1. KNOWN_LOGOS[origin]       → hardcoded DB
     2. localStorage cache        → previous session's winner
     3. Standard fallback chain   → 5 candidates

   Failure handling:
     - 404 → move to next candidate, clear stale cache
     - Timeout (5s) → mark as "recently failed" in sessionStorage
       for 10 minutes, but DO NOT clear KNOWN_LOGOS choice
     - Recently-failed URLs are skipped on this page load

   Console tags:
     [known]    — from KNOWN_LOGOS
     [cached]   — from localStorage
     [fresh]    — from fallback chain
     [timeout]  — gave up waiting
     ✗          — all candidates failed
   ========================================================= */

const KNOWN_LOGOS: Record<string, string> = {
  // ── My tools ──
  "https://qr.brandonkimathi.top": "https://qr.brandonkimathi.top/favicon.svg",
  "https://cutout.brandonkimathi.top":
    "https://cutout.brandonkimathi.top/assets/favicon.ico",
  "https://favicon.brandonkimathi.top":
    "https://favicon.brandonkimathi.top/assets/favicon.ico",
  "https://note.brandonkimathi.top": "https://note.brandonkimathi.top/logo.png",
  "https://budget.brandonkimathi.top":
    "https://budget.brandonkimathi.top/assets/logo.png",

  // ── Production sites ──
  "https://www.cartzuri.com": "https://www.cartzuri.com/favicon.ico",
  "https://cartzuri.com": "https://www.cartzuri.com/favicon.ico",
  "https://veldris.kodees.co.ke": "https://veldris.kodees.co.ke/logo.png",
  "https://kodees.co.ke": "https://kodees.co.ke/logo.png",
  "https://bookmine.vercel.app": "https://bookmine.vercel.app/favicon.ico",
  "https://shakshigrill.com": "https://shakshigrill.com/assets/favicon.ico",
  "https://www.shakshigrill.com": "https://shakshigrill.com/assets/favicon.ico",
  "https://viablesurveyors.com": "https://viablesurveyors.com/logo.png",
  "https://www.viablesurveyors.com": "https://viablesurveyors.com/logo.png",
};

const SOURCES = [
  "/logo.png",
  "/assets/logo.png",
  "/favicon.ico",
  "/favicon.svg",
  "/assets/favicon.ico",
] as const;

const CACHE_PREFIX = "project-logo:";
const FAILED_PREFIX = "pf:";
const FAILED_TTL_MS = 10 * 60 * 1000; // 10 minutes
const LOAD_TIMEOUT_MS = 5000; // give up after 5s

/* ---------- localStorage cache (persistent) ---------- */

function readCache(origin: string): string | null {
  try {
    return localStorage.getItem(`${CACHE_PREFIX}${origin}`);
  } catch {
    return null;
  }
}

function writeCache(origin: string, url: string) {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${origin}`, url);
  } catch {
    /* ignore */
  }
}

/* ---------- sessionStorage failures (per-tab) ---------- */

function markFailed(url: string) {
  try {
    sessionStorage.setItem(`${FAILED_PREFIX}${url}`, String(Date.now()));
  } catch {
    /* ignore */
  }
}

function isRecentlyFailed(url: string): boolean {
  try {
    const raw = sessionStorage.getItem(`${FAILED_PREFIX}${url}`);
    if (!raw) return false;
    return Date.now() - Number(raw) < FAILED_TTL_MS;
  } catch {
    return false;
  }
}

function clearFailed(url: string) {
  try {
    sessionStorage.removeItem(`${FAILED_PREFIX}${url}`);
  } catch {
    /* ignore */
  }
}

/* ---------- Log dedupe ---------- */

const logged = new Set<string>();

/* ---------- Component ---------- */

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
  const [timedOut, setTimedOut] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const origin = useMemo(() => {
    try {
      return new URL(url).origin;
    } catch {
      return "";
    }
  }, [url]);

  /* ---------- Build candidates (skip recently failed) ---------- */

  const allCandidates = useMemo(() => {
    if (!origin) return [] as string[];

    const seen = new Set<string>();
    const ordered: string[] = [];
    const push = (u: string | null | undefined) => {
      if (!u || seen.has(u)) return;
      seen.add(u);
      ordered.push(u);
    };

    push(KNOWN_LOGOS[origin]);
    push(readCache(origin));
    for (const s of SOURCES) push(`${origin}${s}`);

    return ordered;
  }, [origin]);

  // Skip anything that failed in the last 10 minutes, but if EVERYTHING
  // failed, fall back to trying the full list (better than showing monogram
  // forever if the network recovered)
  const candidates = useMemo(() => {
    const fresh = allCandidates.filter((u) => !isRecentlyFailed(u));
    return fresh.length > 0 ? fresh : allCandidates;
  }, [allCandidates]);

  const fallback = (monogram || name[0] || "?")
    .toString()
    .charAt(0)
    .toUpperCase();

  /* ---------- Reset on origin change ---------- */

  useEffect(() => {
    setIndex(0);
    setLoaded(false);
    setTimedOut(false);
  }, [origin]);

  const src = candidates[index] ?? "error";
  const showImage = src !== "error";

  /* ---------- Timeout watchdog ---------- */

  useEffect(() => {
    if (!showImage || loaded) return;

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      // This src has been trying to load for LOAD_TIMEOUT_MS
      markFailed(src);
      setTimedOut(true);
      setLoaded(false);

      const logKey = `${name}:${src}:timeout`;
      if (!logged.has(logKey)) {
        logged.add(logKey);
        console.warn(
          `%c[ProjectLogo]%c ${name} %c⏱%c timeout after ${LOAD_TIMEOUT_MS / 1000}s — %c${src}`,
          "color:#a91e8a;font-weight:600",
          "color:#1c1917;font-weight:500",
          "color:#f59e0b;font-weight:600",
          "color:#64748b;font-size:11px",
          "color:#94a3b8;font-family:ui-monospace,monospace",
        );
      }

      // Move to the next candidate
      advance();
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, loaded, showImage]);

  /* ---------- Success ---------- */

  const commitSuccess = (finalSrc: string) => {
    window.clearTimeout(timeoutRef.current);
    setLoaded(true);
    setTimedOut(false);
    clearFailed(finalSrc);

    if (!origin || !finalSrc) return;

    const knownUrl = KNOWN_LOGOS[origin];
    const cachedUrl = readCache(origin);
    const wasCached = cachedUrl === finalSrc;
    const isKnown = knownUrl === finalSrc;

    if (!wasCached) writeCache(origin, finalSrc);

    let tag: "known" | "cached" | "fresh";
    if (isKnown) tag = "known";
    else if (wasCached) tag = "cached";
    else tag = "fresh";

    const logKey = `${name}:${finalSrc}`;
    if (logged.has(logKey)) return;
    logged.add(logKey);

    const tagColor =
      tag === "known" ? "#0ea5e9" : tag === "cached" ? "#10b981" : "#f59e0b";

    console.info(
      `%c[ProjectLogo]%c ${name} %c✓%c %c${tag}%c ${finalSrc}`,
      "color:#a91e8a;font-weight:600",
      "color:#1c1917;font-weight:500",
      "color:#10b981;font-weight:600",
      `color:${tagColor};font-weight:600;font-family:ui-monospace,monospace`,
      "color:#64748b;font-family:ui-monospace,monospace;font-size:11px",
    );
  };

  /* ---------- Advance to next candidate ---------- */

  const advance = () => {
    window.clearTimeout(timeoutRef.current);
    setLoaded(false);
    setTimedOut(false);
    setIndex((i) => i + 1);
  };

  /* ---------- Explicit error (404 / CORS / blocked) ---------- */

  const handleError = () => {
    const failed = candidates[index];

    if (failed) {
      markFailed(failed);

      // Only clear the localStorage cache if the winner fails AND
      // it's not the KNOWN_LOGOS entry (timeouts shouldn't wipe DB)
      if (failed === readCache(origin) && failed !== KNOWN_LOGOS[origin]) {
        try {
          localStorage.removeItem(`${CACHE_PREFIX}${origin}`);
        } catch {
          /* ignore */
        }
      }
    }

    if (index < candidates.length - 1) {
      advance();
    } else {
      window.clearTimeout(timeoutRef.current);
      setIndex(candidates.length);

      const logKey = `${name}:__failed__`;
      if (!logged.has(logKey)) {
        logged.add(logKey);
        console.warn(
          `%c[ProjectLogo]%c ${name} %c✗%c all candidates failed for ${origin || url}`,
          "color:#a91e8a;font-weight:600",
          "color:#1c1917;font-weight:500",
          "color:#ef4444;font-weight:600",
          "color:#64748b;font-family:ui-monospace,monospace;font-size:11px",
        );
      }
    }
  };

  /* ---------- Catch pre-mounted load events ---------- */

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.complete) return;
    if (img.naturalWidth === 0) return;
    if (src !== "error") commitSuccess(src);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  /* ---------- Render ---------- */

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {(!showImage || !loaded) && (
        <div
          className={`absolute inset-0 grid place-items-center border bg-background font-semibold shadow-pressed ${
            timedOut
              ? "border-amber-300 text-amber-600"
              : "border-border-subtle text-foreground"
          }`}
          style={{ fontSize: size * 0.42 }}
        >
          {timedOut ? "!" : fallback}
        </div>
      )}

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
          // CRITICAL: no-referrer avoids Vercel and other servers rejecting
          // cross-origin image requests from localhost
          referrerPolicy="no-referrer"
          onLoad={() => commitSuccess(src)}
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
