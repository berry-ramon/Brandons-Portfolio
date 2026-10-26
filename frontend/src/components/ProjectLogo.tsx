import { useEffect, useMemo, useState } from "react";

/* =========================================================
   PROJECT LOGO — caches remote image bytes
   ---------------------------------------------------------

   Resolution:

     KNOWN ORIGINS (in KNOWN_LOGOS):
       → try ONLY the mapped remote URL
       → no fallbacks, no guessing

     UNKNOWN ORIGINS:
       → cached winner from last session, then the chain:
         /logo.png → /assets/logo.png → /favicon.ico
         → /favicon.svg → /assets/favicon.ico

   Caching:
     - Successful responses are stored as blobs in Cache
       Storage under "project-logos-v1".
     - Rendered via URL.createObjectURL(blob) — no network
       on repeat visits.
     - Works fully offline after the first successful fetch.

   Auto-invalidation:
     - Hash of KNOWN_LOGOS + SOURCES is computed at load.
     - If it differs from the stored hash (data was edited),
       Cache Storage wipes, winner URLs wipe, all logos
       re-fetch fresh.
     - If unchanged, caches persist — instant loads.
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

  // ── KODÈS (www confirmed) ──
  "https://www.kodees.co.ke": "https://www.kodees.co.ke/logo.png",
  "https://kodees.co.ke": "https://www.kodees.co.ke/logo.png",

  "https://bookmine.vercel.app": "https://bookmine.vercel.app/favicon.ico",
  "https://shakshigrill.com": "https://shakshigrill.com/assets/favicon.ico",
  "https://www.shakshigrill.com": "https://shakshigrill.com/assets/favicon.ico",

  // ── Viable Surveyors (www confirmed) ──
  "https://www.viablesurveyors.com": "https://www.viablesurveyors.com/logo.png",
  "https://viablesurveyors.com": "https://www.viablesurveyors.com/logo.png",
};

const SOURCES = [
  "/logo.png",
  "/assets/logo.png",
  "/favicon.ico",
  "/favicon.svg",
  "/assets/favicon.ico",
] as const;

const CACHE_NAME = "project-logos-v1";
const WINNER_KEY_PREFIX = "project-logo:";
const VERSION_KEY = "project-logos:version";

/* ---------- Auto invalidation ---------- */

function computeDataVersion(): string {
  const payload = JSON.stringify({ known: KNOWN_LOGOS, sources: SOURCES });
  let hash = 5381;
  for (let i = 0; i < payload.length; i++) {
    hash = ((hash << 5) + hash + payload.charCodeAt(i)) | 0;
  }
  return `v${(hash >>> 0).toString(36)}`;
}

const DATA_VERSION = computeDataVersion();
let versionChecked = false;
const blobUrlCache = new Map<string, string>();

async function ensureFreshCache(): Promise<void> {
  if (versionChecked) return;
  versionChecked = true;

  let prev: string | null = null;
  try {
    prev = localStorage.getItem(VERSION_KEY);
  } catch {
    /* ignore */
  }

  if (prev === DATA_VERSION) return;

  const isFirstVisit = prev === null;

  try {
    await caches.delete(CACHE_NAME);
  } catch {
    /* ignore */
  }

  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(WINNER_KEY_PREFIX)) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignore */
  }

  blobUrlCache.forEach((u) => URL.revokeObjectURL(u));
  blobUrlCache.clear();

  try {
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
  } catch {
    /* ignore */
  }

  if (import.meta.env.DEV && !isFirstVisit) {
    console.info(
      `%c[ProjectLogo]%c data changed → caches cleared (${prev} → ${DATA_VERSION})`,
      "color:#a91e8a;font-weight:600",
      "color:#f59e0b;font-weight:600",
    );
  }
}

/* ---------- Cache Storage helpers ---------- */

async function readCachedBlob(url: string): Promise<Blob | null> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const resp = await cache.match(url);
    return resp ? await resp.blob() : null;
  } catch {
    return null;
  }
}

async function fetchAndCacheBlob(url: string): Promise<Blob | null> {
  try {
    const resp = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });

    if (!resp.ok) return null;

    const ct = (resp.headers.get("content-type") || "").toLowerCase();
    const isImage =
      ct.startsWith("image/") ||
      ct.includes("svg") ||
      ct.includes("xml") ||
      ct.includes("octet-stream");

    if (!isImage) return null;

    const cloned = resp.clone();
    const blob = await resp.blob();

    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(url, cloned);
    } catch {
      /* quota or private mode — still return blob */
    }

    return blob;
  } catch {
    return null;
  }
}

async function resolveImageUrl(url: string): Promise<string | null> {
  const existing = blobUrlCache.get(url);
  if (existing) return existing;

  let blob = await readCachedBlob(url);
  const source: "cache" | "network" = blob ? "cache" : "network";

  if (!blob) {
    blob = await fetchAndCacheBlob(url);
  }

  if (!blob) return null;

  const blobUrl = URL.createObjectURL(blob);
  blobUrlCache.set(url, blobUrl);

  if (import.meta.env.DEV) {
    console.info(
      `%c[ProjectLogo]%c ${source === "cache" ? "cache hit" : "fetched"} %c${url}`,
      "color:#a91e8a;font-weight:600",
      `color:${source === "cache" ? "#10b981" : "#f59e0b"};font-weight:600`,
      "color:#64748b;font-family:ui-monospace,monospace;font-size:11px",
    );
  }

  return blobUrl;
}

/* ---------- Winner URL (unknown origins only) ---------- */

function readWinnerUrl(origin: string): string | null {
  try {
    return localStorage.getItem(`${WINNER_KEY_PREFIX}${origin}`);
  } catch {
    return null;
  }
}

function writeWinnerUrl(origin: string, url: string): void {
  try {
    localStorage.setItem(`${WINNER_KEY_PREFIX}${origin}`, url);
  } catch {
    /* ignore */
  }
}

/* =========================================================
   COMPONENT
   ========================================================= */

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
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const origin = useMemo(() => {
    try {
      return new URL(url).origin;
    } catch {
      return "";
    }
  }, [url]);

  const candidates = useMemo(() => {
    if (!origin) return [] as string[];

    // Known origin: only the mapped URL, no fallbacks
    const known = KNOWN_LOGOS[origin];
    if (known) return [known];

    // Unknown: cached winner + full fallback chain
    const seen = new Set<string>();
    const ordered: string[] = [];
    const push = (u: string | null | undefined) => {
      if (u && !seen.has(u)) {
        seen.add(u);
        ordered.push(u);
      }
    };

    push(readWinnerUrl(origin));
    for (const s of SOURCES) push(`${origin}${s}`);

    return ordered;
  }, [origin]);

  const fallback = (monogram || name[0] || "?")
    .toString()
    .charAt(0)
    .toUpperCase();

  useEffect(() => {
    if (!candidates.length) {
      setAllFailed(true);
      return;
    }

    let cancelled = false;
    setImgSrc(null);
    setAllFailed(false);

    (async () => {
      await ensureFreshCache();
      if (cancelled) return;

      for (const candidate of candidates) {
        if (cancelled) return;

        const resolved = await resolveImageUrl(candidate);
        if (cancelled) return;

        if (resolved) {
          setImgSrc(resolved);
          if (!KNOWN_LOGOS[origin]) {
            writeWinnerUrl(origin, candidate);
          }
          return;
        }
      }

      if (!cancelled) setAllFailed(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [candidates, origin, attempt]);

  const retry = () => setAttempt((a) => a + 1);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {!imgSrc && (
        <button
          type="button"
          onClick={allFailed ? retry : undefined}
          disabled={!allFailed}
          className={`absolute inset-0 grid place-items-center border bg-background font-semibold shadow-pressed transition-colors ${
            allFailed
              ? "cursor-pointer border-amber-300 text-amber-600 hover:bg-amber-50"
              : "border-border-subtle text-foreground"
          }`}
          style={{ fontSize: size * 0.42 }}
          aria-label={allFailed ? `Retry loading ${name} logo` : undefined}
        >
          {fallback}
        </button>
      )}

      {imgSrc && (
        <img
          src={imgSrc}
          alt={`${name} logo`}
          width={size}
          height={size}
          decoding="async"
          className="relative h-full w-full bg-background object-contain"
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
}
