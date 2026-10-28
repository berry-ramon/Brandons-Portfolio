/* =========================================================
   ANALYTICS — GA4 by default
   ---------------------------------------------------------
   Provider is chosen by VITE_ANALYTICS_PROVIDER, but falls
   back to "ga4" so the site tracks out of the box.

   The GA4 measurement ID is hardcoded as a fallback —
   VITE_GA4_MEASUREMENT_ID can override it per environment
   (dev / preview / prod) if you want separate properties.

   GA4 tag endpoint: https://www.googletagmanager.com/gtag/js
   ↑ That's the correct URL for GA4 — the "googletagmanager"
   domain is a historical artifact. GTM itself uses a different
   endpoint (gtm.js) which we do NOT use here.
   ========================================================= */

type Provider = "ga4" | "plausible" | "umami" | "posthog" | "console" | "none";

type EventProps = Record<string, string | number | boolean | null | undefined>;

/* ---------- Constants ---------- */

const DEFAULT_GA4_ID = "G-CLTC450YQJ";

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || DEFAULT_GA4_ID;

const PROVIDER: Provider =
  (import.meta.env.VITE_ANALYTICS_PROVIDER as Provider) || "ga4";

/* ---------- Global type declarations ---------- */

type PostHogQueueItem = [string, Record<string, unknown>, number];

type PostHogClient = {
  init?: (key: string, options?: Record<string, unknown>) => void;
  capture?: (name: string, props?: EventProps) => void;
  identify?: (distinctId: string, props?: EventProps) => void;
  reset?: () => void;
  _i?: PostHogQueueItem[];
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    plausible?: (name: string, opts?: { props?: EventProps }) => void;
    umami?: { track: (name: string, props?: EventProps) => void };
    posthog?: PostHogClient;
    __analyticsReady?: boolean;
  }
}

/* =========================================================
   INIT
   ========================================================= */

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__analyticsReady) return;
  window.__analyticsReady = true;

  switch (PROVIDER) {
    case "ga4": {
      if (!GA4_ID) {
        console.warn(
          "[analytics] GA4 selected but no measurement ID available",
        );
        return;
      }

      // 1. Load the GA4 tag asynchronously
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(script);

      // 2. Set up the dataLayer queue
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };

      // 3. Configure GA4
      window.gtag("js", new Date());
      window.gtag("config", GA4_ID, {
        anonymize_ip: true,
        send_page_view: false, // we fire pageviews manually on route change
        cookie_flags: "SameSite=None;Secure",
      });

      if (import.meta.env.DEV) {
        console.info(`[analytics] GA4 initialized with ${GA4_ID}`);
      }
      break;
    }

    case "plausible": {
      const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
      if (!domain) {
        console.warn("[analytics] Plausible selected but no domain set");
        return;
      }
      const s = document.createElement("script");
      s.defer = true;
      s.src = "https://plausible.io/js/script.tagged-events.js";
      s.dataset.domain = domain;
      document.head.appendChild(s);
      break;
    }

    case "umami": {
      const id = import.meta.env.VITE_UMAMI_WEBSITE_ID;
      const src =
        import.meta.env.VITE_UMAMI_SCRIPT_URL ||
        "https://cloud.umami.is/script.js";
      if (!id) {
        console.warn("[analytics] Umami selected but no ID set");
        return;
      }
      const s = document.createElement("script");
      s.defer = true;
      s.src = src;
      s.dataset.websiteId = id;
      document.head.appendChild(s);
      break;
    }

    case "posthog": {
      const key = import.meta.env.VITE_POSTHOG_KEY;
      const host =
        import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";
      if (!key) {
        console.warn("[analytics] PostHog selected but no key set");
        return;
      }
      (function (t: Window & typeof globalThis, e: Document) {
        const existing = t.posthog as
          | (PostHogClient & { push?: (...args: unknown[]) => void })
          | undefined;
        const p =
          existing ??
          (Object.assign([], {
            _i: [] as PostHogQueueItem[],
            init: function (k: string, o: Record<string, unknown>) {
              p._i!.push([k, o, Date.now()]);
            },
          }) as unknown as PostHogClient & {
            push?: (...args: unknown[]) => void;
          });

        t.posthog = p;

        const script = e.createElement("script");
        script.async = true;
        script.src = `${host}/static/array.js`;
        e.head.appendChild(script);
      })(window, document);

      window.posthog?.init?.(key, {
        api_host: host,
        capture_pageview: false,
      });
      break;
    }

    case "console": {
      console.info("[analytics] Console provider active — events log only");
      break;
    }

    case "none":
    default:
      /* silent no-op */
      break;
  }
}

/* =========================================================
   PAGE VIEWS
   ========================================================= */

export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;

  const url = window.location.origin + path;
  const docTitle = title || document.title;

  if (import.meta.env.DEV) {
    console.info("[analytics] pageview", { path, title: docTitle });
  }

  switch (PROVIDER) {
    case "ga4":
      window.gtag?.("event", "page_view", {
        page_path: path,
        page_title: docTitle,
        page_location: url,
      });
      break;
    case "plausible":
      window.plausible?.("pageview", { props: { path } });
      break;
    case "umami":
      window.umami?.track("pageview", { path, title: docTitle });
      break;
    case "posthog":
      window.posthog?.capture?.("$pageview", {
        $current_url: url,
        path,
        title: docTitle,
      });
      break;
    case "console":
      console.info("[analytics] pageview →", path);
      break;
  }
}

/* =========================================================
   EVENTS
   ========================================================= */

export function trackEvent(name: string, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  if (import.meta.env.DEV) {
    console.info("[analytics] event", name, props);
  }

  switch (PROVIDER) {
    case "ga4":
      window.gtag?.("event", name, props);
      break;
    case "plausible":
      window.plausible?.(name, { props });
      break;
    case "umami":
      window.umami?.track(name, props);
      break;
    case "posthog":
      window.posthog?.capture?.(name, props);
      break;
    case "console":
      console.info("[analytics] event →", name, props);
      break;
  }
}

/* =========================================================
   OUTBOUND LINKS
   ========================================================= */

export function trackExternalLink(url: string, label?: string): void {
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    host = "unknown";
  }
  trackEvent("external_link_click", {
    url,
    host,
    label: label ?? null,
    from: window.location.pathname,
  });
}

export function installExternalLinkTracking(): void {
  if (typeof document === "undefined") return;

  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest("a") as HTMLAnchorElement | null;
    if (!anchor || !anchor.href) return;

    const isExternal = anchor.origin !== window.location.origin;
    const isDownload = anchor.hasAttribute("download");
    const isFile =
      /\.(pdf|zip|docx?|xlsx?|pptx?|csv|ics|png|jpe?g|svg|mp4|mov)$/i.test(
        anchor.pathname,
      );

    if (isExternal) {
      trackExternalLink(anchor.href, anchor.textContent?.trim());
    } else if (isDownload || isFile) {
      trackEvent("file_download", {
        url: anchor.href,
        filename: anchor.getAttribute("download") || anchor.pathname,
      });
    }
  };

  document.addEventListener("click", handler, { capture: true });
  document.addEventListener(
    "auxclick",
    handler as unknown as (e: Event) => void,
    { capture: true },
  );
}

/* =========================================================
   ERROR TRACKING
   ========================================================= */

export function installErrorTracking(): void {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    trackEvent("js_error", {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      col: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    trackEvent("unhandled_promise", {
      message:
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "Unknown",
    });
  });
}
