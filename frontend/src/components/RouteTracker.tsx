import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

export function RouteTracker() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const path = pathname + search + hash;
    // Defer slightly so the page title settles if the route sets it
    const timer = window.setTimeout(() => {
      trackPageView(path);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [pathname, search, hash]);

  return null;
}
