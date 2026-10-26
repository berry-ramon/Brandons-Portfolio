/* =========================================================
   ANALYTICS
   ---------------------------------------------------------
   One API surface. Swap providers via VITE_ANALYTICS_PROVIDER.
   - ga4        → Google Analytics 4
   - plausible  → Plausible
   - umami      → Umami
   - posthog    → PostHog
   - console    → Dev only (logs to console)
   - none       → No-op (privacy-first default)
   ========================================================= */

type Provider = "ga4" | "plausible" | "umami" | "posthog" | "console" | "none";

type EventProps = Record<string, string | number | boolean | null | undefined>;

/* ---------- PostHog global type ----------
   The stub array has `.init` and `._i` set immediately when the
   provider is configured, but `.capture` is not present until
   the real PostHog SDK loads and replaces the stub.
   So all methods are optional - call sites use `?.()`.
   ----------------------------------------- */

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

const PROVIDER: Provider =
  (import.meta.env.VITE_ANALYTICS_PROVIDER as Provider) || "none";

/* ---------- Init ---------- */

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__analyticsReady) return;
  window.__analyticsReady = true;

  switch (PROVIDER) {
    case "ga4": {
      const id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
      if (!id) {
        console.warn("[analytics] GA4 provider selected but no ID set");
        return;
      }
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`, true);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", id, {
        anonymize_ip: true,
        send_page_view: false, // we send manually on route change
      });
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

      /* PostHog's official stub pattern.
         `window.posthog` becomes a queue array immediately.
         When the real SDK loads (async), it drains the queue
         and replaces `window.posthog` with the full instance. */
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
        capture_pageview: false, // manual pageview tracking
      });
      break;
    }

    case "console": {
      console.info("[analytics] Console provider active");
      break;
    }

    case "none":
    default:
      /* silent no-op */
      break;
  }

  if (import.meta.env.DEV && PROVIDER === "none") {
    console.info(
      "[analytics] No provider set - events will be logged to console only.",
    );
  }
}

function injectScript(src: string, async = false): void {
  const s = document.createElement("script");
  s.src = src;
  s.async = async;
  document.head.appendChild(s);
}

/* ---------- Page views ---------- */

export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;

  const url = window.location.origin + path;
  const docTitle = title || document.title;

  if (import.meta.env.DEV || PROVIDER === "console") {
    console.info("[analytics] pageview", { path, title: docTitle, url });
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
  }
}

/* ---------- Events ---------- */

export function trackEvent(name: string, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  if (import.meta.env.DEV || PROVIDER === "console") {
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
  }
}

/* ---------- External link clicks ---------- */

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

/* ---------- Auto-track all external links ---------- */

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

  // Use capture so we see the click before route change happens
  document.addEventListener("click", handler, { capture: true });

  // Also catch middle-click and ctrl/cmd-click (opens new tab)
  document.addEventListener(
    "auxclick",
    handler as unknown as (e: Event) => void,
    { capture: true },
  );
}

/* ---------- Unhandled errors ---------- */

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
