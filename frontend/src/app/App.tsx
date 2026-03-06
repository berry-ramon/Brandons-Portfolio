import { BrowserRouter } from "react-router-dom"; // or HashRouter, MemoryRouter
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { registerServiceWorker } from "./serviceWorkerRegistration";
import { useEffect, useState } from "react";

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      console.log("📶 Back online");
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("📴 Offline mode");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {" "}
        {/* Add BrowserRouter here */}
        <div className={`app ${!isOnline ? "offline-mode" : ""}`}>
          <RouterProvider router={router} />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
