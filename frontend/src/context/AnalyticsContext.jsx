import { createContext, useContext, useEffect } from "react";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize analytics
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID);
    }
  }, []);

  const trackEvent = (eventName, data = {}) => {
    if (window.gtag) {
      window.gtag("event", eventName, data);
    }
    console.log(`Tracking: ${eventName}`, data); // Fallback for development
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};
