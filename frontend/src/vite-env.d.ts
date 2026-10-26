/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_STRICT_MODE?: "true" | "false";
  readonly VITE_SITE_URL?: string;
  readonly VITE_ANALYTICS_PROVIDER?:
    | "ga4"
    | "plausible"
    | "umami"
    | "posthog"
    | "console"
    | "none";
  readonly VITE_GA4_MEASUREMENT_ID?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_UMAMI_WEBSITE_ID?: string;
  readonly VITE_UMAMI_SCRIPT_URL?: string;
  readonly VITE_POSTHOG_KEY?: string;
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
