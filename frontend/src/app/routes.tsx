import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import Work from "./pages/Work";
import HowIThink from "./pages/HowIThink";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Kodees from "./pages/Kodees";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "work/:projectId", Component: Work },
      { path: "how-i-think", Component: HowIThink },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "kodees", Component: Kodees },
    ],
  },
]);
