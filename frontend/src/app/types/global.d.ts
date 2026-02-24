// Add type definitions for Google Analytics
interface Window {
  gtag: (
    command: "config" | "event" | "js" | "set",
    targetId: string,
    config?: Record<string, any>,
  ) => void;
  dataLayer: any[];
}
