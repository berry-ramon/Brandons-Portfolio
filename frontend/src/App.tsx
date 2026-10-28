import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { AnimatePresence, motion, useTransform } from "motion/react";
import {
  ArrowUpRight,
  AtSign,
  Boxes,
  ChevronLeft,
  FileText,
  Home as HomeIcon,
  Laptop,
  Layers,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Send,
  Shield,
  Smartphone,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { openSourceTools, productionSites } from "./app/data/tools";
import { privacySections, termsSections } from "./app/data/legal";
import {
  CONTACT,
  buildMessage,
  mailtoUrl,
  whatsappUrl,
  type ContactForm as ContactValues,
} from "./app/utils/contact";
import { projects as caseStudies } from "./app/data/projects";
import { ROLE_FULL, SITE_URL } from "./app/data/site";
import {
  AboutPage,
  KodeesPage,
  ProjectPage,
  ThinkingPage,
} from "./app/pages/ContentPages";
import {
  TransitionLink as Link,
  TransitionProvider,
  usePageTransition,
} from "./app/components/PageTransition";
import {
  MotionControl,
  MotionProvider,
  useMotionSetting,
} from "./app/hooks/useMotionSetting";
import { ProjectMarquee } from "./app/components/ProjectMarquee";
import { useScrollMotion } from "./app/hooks/useScrollMotion";
import { trackEvent, trackPageView } from "./lib/analytics";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Logo } from "./components/Logo";

const SITE = SITE_URL;
const DEFAULT_OG_IMAGE = `${SITE}/assets/icons/og-image.png`;
const routes = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/how-i-think", "How I think"],
  ["/kodees", "KODÈS"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;
const projects = [
  ...openSourceTools.map((p) => ({ ...p, kind: "Free tool", url: p.liveUrl })),
  ...productionSites.map((p) => ({
    ...p,
    kind: "Live website",
    tags: [p.role],
  })),
];

/* =========================================================
   ROUTE TRACKER
   ---------------------------------------------------------
   Fires a pageview event on every pathname change.
   Silent - no UI. Sent to whichever analytics provider
   is configured in src/lib/analytics.ts.
   ========================================================= */

function RouteTracker() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    const path = pathname + search + hash;
    // Defer slightly so any route-level title updates settle
    const timer = window.setTimeout(() => trackPageView(path), 100);
    return () => window.clearTimeout(timer);
  }, [pathname, search, hash]);
  return null;
}
function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

function ThemeButton() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      aria-label={`Use ${dark ? "light" : "dark"} theme`}
      onClick={() => {
        setDark(!dark);
        localStorage.setItem("theme", dark ? "light" : "dark");
      }}
      className="grid size-9 shrink-0 place-items-center rounded-lg border border-border-subtle bg-background-elevated shadow-neu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:size-11 md:rounded-xl"
    >
      {dark ? (
        <Sun size={16} className="md:h-[18px] md:w-[18px]" />
      ) : (
        <Moon size={16} className="md:h-[18px] md:w-[18px]" />
      )}
    </button>
  );
}

/* =========================================================
   MOBILE SIDEBAR
   ---------------------------------------------------------
   Slide-out drawer with the complete navigation list.
   - Slides in from the left
   - Locks body scroll while open
   - Closes on route change, backdrop tap, Escape, or X
   - Includes search shortcut + theme toggle in the footer
   ========================================================= */

function MobileSidebar({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const primaryLinks: { path: string; label: string; Icon: typeof HomeIcon }[] =
    [
      { path: "/", label: "Home", Icon: HomeIcon },
      { path: "/work", label: "Work", Icon: Layers },
      { path: "/how-i-think", label: "How I Think", Icon: Lightbulb },
      { path: "/kodees", label: "KODÈS", Icon: Boxes },
      { path: "/about", label: "About", Icon: User },
      { path: "/contact", label: "Contact", Icon: Mail },
    ];

  const secondaryLinks = [
    { path: "/terms", label: "Terms", Icon: FileText },
    { path: "/privacy", label: "Privacy", Icon: Shield },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed top-0 left-0 z-[70] h-dvh w-[85%] max-w-[320px] bg-background shadow-[0_0_40px_rgba(0,0,0,0.35)] flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-3 border-b border-border-subtle shrink-0">
          <Link
            to="/"
            onClick={onClose}
            className="flex min-w-0 items-center gap-2.5"
          >
            <Logo size={32} />
            <span className="min-w-0 truncate text-[15px] font-semibold tracking-tight">
              Brandon Kimathi
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-background-elevated"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-2">
          {primaryLinks.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 text-[14.5px] transition-colors ${
                  isActive
                    ? "bg-background-elevated font-semibold text-foreground"
                    : "text-foreground/75 hover:bg-background-elevated/50"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-accent" : "text-foreground/50"}
                />
                <span className="flex-1">{label}</span>
                {isActive && (
                  <span className="size-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}

          <div className="my-2 mx-4 border-t border-border-subtle" />

          {secondaryLinks.map(({ path, label, Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 text-[13.5px] transition-colors ${
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-foreground/60 hover:bg-background-elevated/50"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-accent" : "text-foreground/40"}
                />
                <span className="flex-1">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border-subtle p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shrink-0 space-y-2">
          <button
            onClick={() => {
              onClose();
              setTimeout(onSearch, 120);
            }}
            className="flex w-full items-center gap-3 rounded-xl border border-border-subtle bg-background-elevated px-3 py-2.5 text-sm shadow-neu"
          >
            <Search size={16} className="text-foreground/50" />
            <span className="flex-1 text-left">Search</span>
            <kbd className="font-mono text-[10px] text-foreground/50">⌘K</kbd>
          </button>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-foreground/60">Theme</span>
            <ThemeButton />
          </div>
        </div>
      </aside>
    </>
  );
}

function Navigation({ onSearch }: { onSearch: () => void }) {
  const location = useLocation();
  const [compact, setCompact] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let previous = scrollY;
    let expandTimer = 0;
    const update = () => {
      const next = scrollY;
      if (Math.abs(next - previous) > 5)
        setCompact(next > previous && next > 60);
      previous = next;
      window.clearTimeout(expandTimer);
      expandTimer = window.setTimeout(() => setCompact(false), 500);
    };
    const viewport = visualViewport;
    const resize = () =>
      setKeyboard(Boolean(viewport && viewport.height < innerHeight * 0.72));
    addEventListener("scroll", update, { passive: true });
    viewport?.addEventListener("resize", resize);
    return () => {
      removeEventListener("scroll", update);
      viewport?.removeEventListener("resize", resize);
      window.clearTimeout(expandTimer);
    };
  }, []);

  const topIfCurrent = (path: string) => {
    if (location.pathname === path)
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const title =
    routes.find(([path]) => path === location.pathname)?.[1] ??
    (location.pathname.startsWith("/work/") ? "Project" : "Page");
  const nested = !["/", "/work", "/kodees", "/contact"].includes(
    location.pathname,
  );

  return (
    <>
      {/* ===== MOBILE HEADER ===== */}
      <header className="fixed inset-x-0 top-0 z-40 h-[calc(3.5rem+env(safe-area-inset-top))] border-b border-border-subtle bg-background/95 pt-[env(safe-area-inset-top)] lg:hidden">
        <div className="flex h-14 items-center justify-between gap-1 px-2">
          {/* Left: hamburger or back */}
          {nested ? (
            <Link
              aria-label="Go back"
              to={location.pathname.startsWith("/work/") ? "/work" : "/"}
              className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-background-elevated"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-background-elevated"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Center: logo + title */}
          <Link
            to="/"
            onClick={() => topIfCurrent("/")}
            className="flex min-w-0 flex-1 items-center justify-center gap-2"
          >
            <Logo size={24} />
            <AnimatePresence mode="wait">
              <motion.span
                key={title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="truncate text-[15px] font-medium"
              >
                {title}
              </motion.span>
            </AnimatePresence>
          </Link>

          {/* Right: search + theme */}
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              aria-label="Search"
              onClick={onSearch}
              className="grid size-10 place-items-center rounded-lg hover:bg-background-elevated"
            >
              <Search size={18} />
            </button>
            <ThemeButton />
          </div>
        </div>
      </header>

      {/* ===== DESKTOP HEADER ===== */}
      <header className="fixed inset-x-0 top-0 z-40 hidden border-b border-border-subtle bg-background/95 lg:block">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-7 px-6">
          <Link
            to="/"
            onClick={() => topIfCurrent("/")}
            className="mr-auto flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <Logo size={32} />
            <span className="flex items-baseline gap-2">
              Brandon Kimathi
              <span className="font-mono text-[10px] font-normal text-foreground/65">
                KENYA
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {routes.map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={() => topIfCurrent(path)}
                className={`relative py-3 text-sm ${
                  location.pathname === path
                    ? "font-semibold after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:bg-accent"
                    : "text-foreground/70"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={onSearch}
            className="flex h-11 items-center gap-3 rounded-xl border border-border-subtle px-4 text-sm shadow-pressed"
          >
            <Search size={16} /> Search{" "}
            <kbd className="font-mono text-[10px]">Ctrl K</kbd>
          </button>
          <ThemeButton />
          <Link
            to="/contact"
            className="hidden min-h-11 items-center rounded-xl bg-accent px-5 font-semibold text-[#1C1917] shadow-neu lg:flex"
          >
            Talk to me
          </Link>
        </div>
      </header>

      {/* ===== BOTTOM NAV (mobile + tablet portrait) ===== */}
      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: keyboard ? 0 : 1,
          y: keyboard ? 72 : 0,
          height: compact ? 44 : 56,
        }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-x-3 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-40 flex items-center justify-around rounded-2xl border border-border-subtle bg-background-elevated px-1.5 shadow-neu lg:hidden"
      >
        {[
          ["/", HomeIcon, "Home"],
          ["/work", Layers, "Work"],
          ["search", Search, "Search"],
          ["/kodees", Boxes, "KODÈS"],
          ["/contact", Mail, "Contact"],
        ].map(([path, Icon, label]) =>
          path === "search" ? (
            <button
              key={label as string}
              aria-label="Search"
              onClick={onSearch}
              className="-mt-2 grid size-11 place-items-center rounded-full bg-accent text-[#1C1917] shadow-small"
            >
              <Search size={20} />
            </button>
          ) : (
            <Link
              key={path as string}
              to={path as string}
              onClick={() => topIfCurrent(path as string)}
              className={`flex min-h-11 min-w-12 flex-col items-center justify-center rounded-xl text-[10px] ${
                location.pathname === path ? "shadow-inset" : ""
              }`}
            >
              <Icon size={20} />
              <motion.span
                initial={false}
                animate={{
                  opacity: compact ? 0 : 1,
                  y: compact ? 5 : 0,
                  scale: compact ? 0.8 : 1,
                }}
              >
                {label as string}
              </motion.span>
            </Link>
          ),
        )}
      </motion.nav>

      {/* ===== SIDEBAR ===== */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSearch={onSearch}
      />
    </>
  );
}

function SearchPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const { go } = usePageTransition();
  const entries = useMemo(
    () =>
      [
        ...routes.map(([path, title]) => ({ title, path, detail: "Page" })),
        ...projects.map((p) => ({
          title: p.name,
          path: `/work?focus=${p.id}`,
          detail: p.kind,
        })),
      ].filter((x) =>
        `${x.title} ${x.detail}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [setOpen]);
  useEffect(() => {
    if (!open) return;
    const gap = innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gap) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [open]);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      className="fixed inset-0 z-50 bg-[#1C1917]/60 p-4 md:grid md:place-items-start md:pt-28"
    >
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border-subtle bg-background p-3 shadow-neu">
        <div className="flex items-center gap-2 rounded-xl border border-border-subtle px-3 shadow-pressed">
          <Search size={18} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects and pages"
            className="h-14 w-full bg-transparent outline-none"
          />
          <button
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center"
          >
            <X />
          </button>
        </div>
        <p className="px-3 pt-4 font-mono text-[10px] text-foreground/70">
          {q ? `${entries.length} RESULTS` : "WHAT YOU CAN SEARCH"}
        </p>
        <div className="hidden-scrollbar max-h-[60dvh] overscroll-contain overflow-y-auto py-2">
          {entries.map((x, index) => (
            <motion.button
              key={`${q}-${x.path}-${x.title}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: Math.min(index, 7) * 0.05 }}
              onClick={() => {
                setOpen(false);
                window.setTimeout(() => go(x.path), 120);
              }}
              className="flex min-h-14 w-full items-center rounded-xl px-3 text-left hover:bg-background-elevated focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="font-medium">{x.title}</span>
              <span className="ml-auto font-mono text-[10px] text-foreground/70">
                {x.detail}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pattern() {
  const { progress, velocity, reduced, lowPower } = useScrollMotion();
  const y = useTransform(() =>
    reduced ? 0 : progress.get() * (lowPower ? 35 : 70) + velocity.get(),
  );
  const x = useTransform(() =>
    reduced ? 0 : progress.get() * (lowPower ? 12 : 24),
  );
  return (
    <motion.svg
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      exit={{ opacity: 0 }}
      style={{ x, y }}
      className="pointer-events-none absolute right-0 top-0 h-full w-2/3"
      viewBox="0 0 400 300"
      fill="none"
    >
      <path
        d="M10 80C90 20 150 140 230 80S350 20 390 70M10 130c80-60 140 60 220 0s120-55 160-10M10 180c80-60 140 60 220 0s120-55 160-10"
        stroke="currentColor"
      />
      <circle cx="230" cy="80" r="5" fill="#D97706" />
    </motion.svg>
  );
}
export const Reveal = ({ children }: { children: React.ReactNode }) => {
  const { reduced } = useMotionSetting();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 8 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? -8 : -18 }}
      transition={{ duration: reduced ? 0.2 : 0.55 }}
    >
      {children}
    </motion.div>
  );
};

/* =========================================================
   SEO
   Enhanced with full Open Graph + Twitter Card + image
   ========================================================= */
export function SEO({
  title,
  description,
  image,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}) {
  const { pathname } = useLocation();
  const url = SITE + (pathname === "/" ? "/" : pathname);
  const ogImage = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* ---------- Core ---------- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex,nofollow"
            : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        }
      />
      {/* ---------- Open Graph ---------- */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Brandon Kimathi" />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} /> {/* ← ADD */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="fb:app_id" content="966242223397117" /> {/* ← ADD */}
      {/* ---------- Twitter Card ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={url} /> {/* ← ADD */}
      <meta name="twitter:creator" content="@brandonkimathi" />
    </Helmet>
  );
}

const Section = ({
  label,
  title,
  children,
  id,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) => (
  <section
    id={id}
    className="relative overflow-hidden border-t border-border-subtle px-3.5 py-7 md:px-8 md:py-20 lg:py-28"
  >
    <Pattern />
    <div className="relative mx-auto max-w-7xl">
      <p className="mb-2.5 font-mono text-[10px] tracking-widest text-foreground/70 md:mb-5 md:text-[11px]">
        {label}
      </p>
      <h2 className="max-w-3xl text-lg font-semibold tracking-tight md:text-3xl lg:text-5xl">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

function Home() {
  const [imgError, setImgError] = useState(false);

  return (
    <Reveal>
      <SEO
        title="Brandon Kimathi | Software Architect"
        description="Brandon Kimathi builds websites, apps and payment tools that stay fast, safe and ready to grow."
      />
      <main id="main" className="overflow-hidden">
        <section className="relative mx-auto grid max-w-7xl items-center gap-3 px-3.5 py-6 md:min-h-[72dvh] md:grid-cols-12 md:gap-10 md:px-8 md:py-20 lg:min-h-[82dvh] lg:py-28">
          <Pattern />
          <div className="relative md:col-span-8">
            <p className="mb-2 font-mono text-[10px] tracking-widest md:mb-5 md:text-[11px]">
              BRANDON KIMATHI / KENYA
            </p>
            <h1 className="max-w-4xl text-[26px] font-semibold leading-[1.02] tracking-tight md:text-5xl lg:text-[4.5rem]">
              I build the software that keeps businesses running smoothly.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-snug text-foreground/75 md:mt-7 md:text-lg md:leading-relaxed">
              Websites, apps and payment tools that stay fast, stay safe and are
              ready to grow. I guide software design at KODÈS.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event("open-search"))}
              className="mt-3 flex h-10 w-full max-w-lg items-center gap-2 rounded-xl border border-border-subtle bg-background px-3 text-left text-[13px] shadow-inset md:mt-6 md:h-11"
            >
              <Search size={16} /> Search my site
            </button>
            <p className="mt-2 font-mono text-[10px] md:mt-4 md:text-[11px]">
              {ROLE_FULL}
            </p>

            {/* ===== Buttons - centered on mobile, left on desktop ===== */}
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:mt-8 md:justify-start md:gap-3">
              <Link
                className="flex min-h-11 items-center rounded-xl bg-accent px-4 text-[13px] font-semibold text-[#1C1917] shadow-neu md:px-5 md:text-base"
                to="/work"
              >
                See my work
              </Link>
              <Link
                className="flex min-h-11 items-center rounded-xl border border-border-subtle px-4 text-[13px] shadow-neu md:px-5 md:text-base"
                to="/contact"
              >
                Talk to me
              </Link>
            </div>
          </div>

          {/* ===== Profile photo - portrait aspect preserves head ===== */}
          <div className="relative md:col-span-4">
            <div className="mx-auto aspect-[4/5] w-full max-w-[200px] rounded-2xl border border-border-subtle bg-background-elevated p-2 shadow-neu md:max-w-none md:rounded-[28px] md:p-5">
              <div className="relative h-full w-full overflow-hidden rounded-xl shadow-pressed md:rounded-2xl">
                {imgError ? (
                  <div className="grid h-full place-items-center">
                    <span className="text-4xl font-semibold text-foreground/20 md:text-6xl">
                      BK
                    </span>
                  </div>
                ) : (
                  <img
                    src="/assets/images/brandon-kimathi.jpg"
                    alt="Brandon Kimathi"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover object-top"
                    fetchPriority="high"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <Section
          id="what-i-do"
          label="01 / WHAT I DO"
          title="I plan it, build it and keep it running."
        >
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "Plan",
                "I map out how everything should fit together. This saves time and money later.",
              ],
              [
                "Build",
                "I build logins, payments, data and the links between apps.",
              ],
              [
                "Keep it running",
                "I make sure what I build stays quick, safe and ready for more users.",
              ],
            ].map(([a, b]) => (
              <article
                key={a}
                className="rounded-3xl border border-border-subtle bg-background-elevated p-6 shadow-neu"
              >
                <h3 className="text-xl font-semibold">{a}</h3>
                <p className="mt-4 leading-relaxed text-foreground/70">{b}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="projects-strip"
          label="02 / MY WORK"
          title="A quick look at what I have built"
        >
          <ProjectMarquee />
        </Section>

        <Section
          id="how-i-work"
          label="03 / HOW I WORK"
          title="Four rules I follow."
        >
          <div className="mt-8 max-w-3xl space-y-3">
            {[
              "Plan first, design second",
              "Finish one journey before adding more",
              "Build payments in from the start",
              "Build to last",
            ].map((x, i) => (
              <details
                key={x}
                className="rounded-2xl border border-border-subtle bg-background-elevated p-5 shadow-neu"
              >
                <summary className="cursor-pointer font-medium">
                  {String(i + 1).padStart(2, "0")} / {x}
                </summary>
                <p className="mt-4 text-foreground/70">
                  Simple, proven choices make software easier to use and change.
                </p>
              </details>
            ))}
          </div>
        </Section>

        <Section
          id="contact-cta"
          label="04 / SAY HELLO"
          title="Have something you want built? Tell me about it."
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="flex min-h-11 items-center rounded-xl bg-accent px-5 font-semibold text-[#1C1917]"
              href={whatsappUrl(
                "Hello Brandon, I found your website and would like to talk about a project.",
              )}
            >
              Message on WhatsApp
            </a>
            <a
              className="flex min-h-11 items-center rounded-xl border border-border-subtle px-5 shadow-neu"
              href={`mailto:${CONTACT.email}`}
            >
              Send an email
            </a>
          </div>
        </Section>
      </main>
    </Reveal>
  );
}

/* =========================================================
   SITE PREVIEW THUMBNAIL
   ---------------------------------------------------------
   Screenshot via thum.io (more reliable than mShots).
   States: loading (skeleton + spinner) → loaded → error.
   Timeout: 12s. Retry button appears on error.
   ========================================================= */

function SitePreviewThumb({
  url,
  name,
  monogram,
  onTryLive,
}: {
  url: string;
  name: string;
  monogram?: string;
  onTryLive: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const fallback = monogram || name[0];

  // thum.io - free, reliable, no key needed.
  // URL format: /get/width/W/crop/H/noanimate/<raw-url>
  const screenshotUrl = `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}?_=${attempt}`;

  // Timeout per attempt
  useEffect(() => {
    if (status !== "loading") return;
    const t = window.setTimeout(() => setStatus("error"), 12000);
    return () => window.clearTimeout(t);
  }, [status, attempt]);

  // Reset on URL change
  useEffect(() => {
    setStatus("loading");
    setAttempt(0);
  }, [url]);

  const retry = () => {
    setStatus("loading");
    setAttempt((a) => a + 1);
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-background-elevated shadow-pressed">
      {/* ---------- LOADING ---------- */}
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-foreground/[0.03]">
          <span className="animate-pulse text-3xl font-semibold text-foreground/25 md:text-4xl">
            {fallback}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span>Loading preview…</span>
          </div>
        </div>
      )}

      {/* ---------- ERROR / TIMEOUT ---------- */}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-foreground/[0.03]">
          <span className="text-3xl font-semibold text-foreground/30 md:text-4xl">
            {fallback}
          </span>
          <span className="text-[9px] text-foreground/50">
            Preview unavailable
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              retry();
            }}
            className="text-[9px] font-semibold text-accent underline hover:opacity-80"
          >
            Retry
          </button>
        </div>
      )}

      {/* ---------- SCREENSHOT ---------- */}
      {status !== "error" && (
        <img
          key={`${url}-${attempt}`}
          src={screenshotUrl}
          alt={`${name} website screenshot`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={(e) => {
            const img = e.currentTarget;
            // thum.io returns a tiny gray placeholder on cold cache -
            // treat anything under 200x150 as a failure so users see
            // the fallback instead of a gray rectangle.
            if (img.naturalWidth < 200 || img.naturalHeight < 150) {
              setStatus("error");
            } else {
              setStatus("loaded");
            }
          }}
          onError={() => {
            setStatus("error");
            try {
              trackEvent("preview_screenshot_error", { site: name, url });
            } catch {
              /* analytics optional */
            }
          }}
        />
      )}

      {/* ---------- DOMAIN BADGE ---------- */}
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 z-10 rounded bg-background/85 px-1.5 py-0.5 font-mono text-[8px] shadow-sm backdrop-blur-sm">
        {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
      </div>

      {/* ---------- TRY LIVE - always visible ---------- */}
      <button
        onClick={onTryLive}
        aria-label={`Try ${name} live`}
        className="group/live absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded bg-background/90 px-1.5 py-0.5 text-[9px] font-semibold shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-[#1C1917]"
      >
        Try live <ArrowUpRight size={9} />
      </button>
    </div>
  );
}

/* =========================================================
   SITE PREVIEW MODAL
   ---------------------------------------------------------
   Device toggle (Phone / Laptop). Each frame contains a live
   iframe. States: loading → ready | timeout.

   If the iframe never loads in 10s, we show the timeout state
   with a prominent "Open site" CTA - but the iframe stays
   mounted underneath in case it loads late.
   ========================================================= */

function SitePreviewModal({
  site,
  onClose,
}: {
  site: { url: string; name: string } | null;
  onClose: () => void;
}) {
  const online = useOnlineStatus();
  const [device, setDevice] = useState<"phone" | "laptop">("phone");
  const [status, setStatus] = useState<"loading" | "ready" | "timeout">(
    "loading",
  );
  const [iframeKey, setIframeKey] = useState(0);

  // Reset loading state on open / device change / site change
  useEffect(() => {
    if (!site) return;
    if (!online) return;
    setStatus("loading");
    setIframeKey((k) => k + 1);
    const t = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "timeout" : s));
    }, 10000);
    return () => window.clearTimeout(t);
  }, [site?.url, device, online]);

  // Escape to close + body scroll lock
  useEffect(() => {
    if (!site) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [site, onClose]);

  if (!site) return null;

  const handleIframeLoad = () => {
    window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "ready" : s));
    }, 1500);
  };

  const sandboxProps =
    "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals allow-downloads";

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0a]/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${site.name}`}
    >
      {/* ---------- TOP BAR ---------- */}
      <div
        className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2 md:px-5 md:py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white md:text-base">
            {site.name}
          </p>
          <p className="truncate font-mono text-[10px] text-white/50 md:text-xs">
            {site.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </p>
        </div>

        {/* Device toggle */}
        <div className="flex shrink-0 gap-0.5 rounded-lg bg-white/10 p-0.5">
          <button
            onClick={() => setDevice("phone")}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition md:gap-1.5 md:px-2.5 md:py-1.5 md:text-[11px] ${
              device === "phone"
                ? "bg-white text-[#1C1917]"
                : "text-white/70 hover:text-white"
            }`}
            aria-pressed={device === "phone"}
          >
            <Smartphone size={11} className="md:h-3 md:w-3" />
            <span className="hidden sm:inline">Phone</span>
          </button>
          <button
            onClick={() => setDevice("laptop")}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold transition md:gap-1.5 md:px-2.5 md:py-1.5 md:text-[11px] ${
              device === "laptop"
                ? "bg-white text-[#1C1917]"
                : "text-white/70 hover:text-white"
            }`}
            aria-pressed={device === "laptop"}
          >
            <Laptop size={11} className="md:h-3 md:w-3" />
            <span className="hidden sm:inline">Laptop</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-1.5">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-semibold text-white hover:bg-white/20 md:gap-1.5 md:px-2.5 md:py-1.5 md:text-[11px]"
          >
            Open <ArrowUpRight size={10} className="md:h-3 md:w-3" />
          </a>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/20 md:p-2"
            aria-label="Close preview"
          >
            <X size={14} className="md:h-4 md:w-4" />
          </button>
        </div>
      </div>

      {/* ---------- PREVIEW AREA ---------- */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-auto p-3 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== OFFLINE STATE — replaces everything else ===== */}
        {!online && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a]/85 p-6 text-center">
            <div className="rounded-full bg-amber-500/15 p-3 text-amber-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M2 2l20 20M8.5 8.5a7 7 0 0110 0M5 12a10 10 0 015-2.5M12 20h.01" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">
              You&apos;re offline
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-white/60">
              Live previews need a connection. If you&apos;ve visited{" "}
              {site.name} before, it may still load from cache — otherwise
              reconnect to try again.
            </p>
          </div>
        )}

        {/* ===== LOADING OVERLAY ===== */}
        {online && status === "loading" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0a0a]/85">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-4 text-sm font-medium text-white">
              Loading {site.name}…
            </p>
            <p className="mt-1 text-xs text-white/50">
              This may take up to 10 seconds
            </p>
          </div>
        )}

        {/* ===== TIMEOUT OVERLAY ===== */}
        {online && status === "timeout" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a]/85 p-6 text-center">
            <div className="rounded-full bg-amber-500/15 p-3 text-amber-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 9v4M12 17h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-white">
              Preview is taking a while
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-white/60">
              This site may block embedding, or it&apos;s slow to load. Try
              opening it directly.
            </p>
            <div className="flex gap-2">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-[#1C1917]"
              >
                Open site →
              </a>
              <button
                onClick={() => {
                  setStatus("loading");
                  setIframeKey((k) => k + 1);
                  window.setTimeout(() => {
                    setStatus((s) => (s === "loading" ? "timeout" : s));
                  }, 10000);
                }}
                className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ===== DEVICE FRAME — only render when online ===== */}
        {online &&
          (device === "phone" ? (
            <div className="relative aspect-[9/19.5] h-[min(75vh,700px)] max-w-[95vw]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-[#2a2a2a] via-[#1C1917] to-[#2a2a2a] p-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                {/* Notch */}
                <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black md:h-6" />

                {/* Screen — relative so the iframe positions inside */}
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-800">
                  <iframe
                    key={`phone-${iframeKey}`}
                    src={site.url}
                    title={`${site.name} phone preview`}
                    className="absolute left-0 top-0 h-full border-0 bg-white"
                    style={{ width: "calc(100% + 20px)" }}
                    sandbox={sandboxProps}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={handleIframeLoad}
                  />
                </div>

                {/* Home indicator */}
                <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-black/40" />
              </div>
            </div>
          ) : (
            <div className="flex w-full max-w-[900px] flex-col items-center">
              {/* Screen */}
              <div className="relative aspect-[16/10] w-full rounded-t-xl bg-gradient-to-b from-[#2a2a2a] to-[#1C1917] p-2 pb-0 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="absolute left-1/2 top-1 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#4a4a4a]" />

                {/* Screen — relative so iframe positions inside */}
                <div className="relative h-full w-full overflow-hidden rounded-t-md bg-neutral-800 ring-1 ring-white/10">
                  <iframe
                    key={`phone-${iframeKey}`}
                    src={site.url}
                    title={`${site.name} phone preview`}
                    className="absolute left-0 top-0 h-full border-0 bg-white"
                    style={{ width: "calc(100% + 20px)" }}
                    sandbox={sandboxProps}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={handleIframeLoad}
                  />
                </div>
              </div>

              {/* Base */}
              <div className="relative h-4 w-[108%] rounded-b-2xl bg-gradient-to-b from-[#2a2a2a] to-[#1C1917] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-[#1C1917]" />
              </div>
            </div>
          ))}
      </div>

      {/* ---------- BOTTOM NOTE ---------- */}
      <p className="shrink-0 border-t border-white/10 px-3 py-2 text-center text-[10px] text-white/50 md:py-3 md:text-xs">
        If the preview appears blank, the site blocks embedding —{" "}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          open in a new tab
        </a>
      </p>
    </div>
  );
}
/* =========================================================
   INLINE PREVIEW
   ---------------------------------------------------------
   Renders a live interactive iframe directly in the page.
   No modal, no device frame - just the site, scrollable.

   The iframe is 20px wider than its container, and the
   container clips the overflow. This hides the scrollbar
   while leaving scrolling fully functional.

   Height: 400px mobile / 600px desktop.
   ========================================================= */

export function InlinePreview({ url, name }: { url: string; name: string }) {
  const online = useOnlineStatus();
  const [status, setStatus] = useState<"loading" | "ready" | "timeout">(
    "loading",
  );
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (!online) return;
    setStatus("loading");
    const t = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "timeout" : s));
    }, 10000);
    return () => window.clearTimeout(t);
  }, [url, iframeKey, online]);

  const handleLoad = () => {
    window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "ready" : s));
    }, 1500);
  };

  const sandboxProps =
    "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-modals allow-downloads";

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-border-subtle bg-neutral-900 shadow-neu md:h-[600px]">
      {/* ---------- OFFLINE STATE ---------- */}
      {!online && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background-elevated p-6 text-center">
          <div className="rounded-full bg-amber-500/15 p-3 text-amber-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2l20 20M8.5 8.5a7 7 0 0110 0M5 12a10 10 0 015-2.5M12 20h.01" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-foreground">
            You&apos;re offline
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-foreground/60">
            Live previews need a connection. The rest of this page works offline
            — reconnect to load {name}.
          </p>
        </div>
      )}

      {/* ---------- LOADING ---------- */}
      {online && status === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background-elevated">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-accent" />
          <p className="mt-3 text-sm font-medium text-foreground/70">
            Loading {name}…
          </p>
          <p className="mt-1 text-xs text-foreground/50">
            This may take up to 10 seconds
          </p>
        </div>
      )}

      {/* ---------- TIMEOUT ---------- */}
      {online && status === "timeout" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background-elevated p-6 text-center">
          <div className="rounded-full bg-amber-500/15 p-3 text-amber-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 9v4M12 17h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-foreground">
            Preview is taking a while
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-foreground/60">
            This site may block embedding or is slow to load. Try opening it
            directly.
          </p>
          <div className="flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-[#1C1917]"
            >
              Open site →
            </a>
            <button
              onClick={() => {
                setStatus("loading");
                setIframeKey((k) => k + 1);
              }}
              className="rounded-lg border border-border-subtle px-4 py-2 text-xs font-semibold shadow-neu"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* ---------- LIVE IFRAME (only when online) ---------- */}
      {online && (
        <iframe
          key={iframeKey}
          src={url}
          title={`${name} live preview`}
          className="absolute left-0 top-0 h-full border-0 bg-white"
          style={{ width: "calc(100% + 20px)" }}
          sandbox={sandboxProps}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const [params, setParams] = useSearchParams();
  const [activePreview, setActivePreview] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const focus = params.get("focus");

  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`project-${focus}`);
    if (!el) return;
    setFilter("All");
    let clearFocusTimer: number | undefined;
    const scrollTimer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-accent");
      clearFocusTimer = window.setTimeout(() => {
        el.classList.remove("ring-2", "ring-accent");
        setParams({}, { replace: true });
      }, 1600);
    }, 250);
    return () => {
      window.clearTimeout(scrollTimer);
      if (clearFocusTimer !== undefined) window.clearTimeout(clearFocusTimer);
      el.classList.remove("ring-2", "ring-accent");
    };
  }, [focus, setParams]);

  const shown = projects.filter((p) => filter === "All" || p.kind === filter);

  const openPreview = (url: string, name: string) => {
    try {
      trackEvent("preview_launch", { site: name, url });
    } catch {
      /* analytics optional */
    }
    setActivePreview({ url, name });
  };

  return (
    <Reveal>
      <SEO
        title="Work | Nubby, Pocket Plan and more"
        description="See Nubby, Pocket Plan, free tools, live websites and case studies by Brandon Kimathi."
      />
      <main
        id="main"
        className="mx-auto max-w-7xl px-3.5 py-7 md:px-8 md:py-24"
      >
        <p className="font-mono text-[10px] md:text-[11px]">01 / WORK</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:mt-4 md:text-7xl">
          Useful work, out in the world.
        </h1>
        <div className="hidden-scrollbar sticky top-12 z-20 -mx-1 mt-4 flex gap-2 overscroll-x-contain overflow-x-auto bg-background/95 p-1 md:top-20 md:-mx-2 md:mt-8 md:p-2">
          {["All", "Free tool", "Live website", "Case study"].map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={`min-h-11 shrink-0 rounded-xl border border-border-subtle px-3 text-[13px] md:px-4 md:text-base ${
                filter === x ? "shadow-pressed" : "shadow-neu"
              }`}
            >
              {x === "All" ? x : `${x}s`}
            </button>
          ))}
        </div>

        {/* ===== GRID - 1 / 2 / 3 columns ===== */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 md:mt-8 md:gap-3.5 lg:grid-cols-3">
          {shown.map((p) => (
            <motion.article
              layout
              id={`project-${p.id}`}
              key={p.id}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-border-subtle bg-background-elevated p-2 shadow-neu md:rounded-2xl md:p-2.5"
            >
              <SitePreviewThumb
                url={p.url}
                name={p.name}
                monogram={"monogram" in p ? p.monogram : undefined}
                onTryLive={() => openPreview(p.url, p.name)}
              />

              <p className="mt-2 font-mono text-[9px] text-foreground/60 md:text-[10px]">
                {p.kind}
              </p>
              <h2 className="mt-0.5 text-[13px] font-semibold leading-tight md:text-base">
                {p.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-foreground/70 md:text-xs">
                {p.description}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {p.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded px-1.5 py-0.5 text-[9px] shadow-pressed md:text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-1.5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={p.url}
                  className="flex min-h-8 flex-1 items-center justify-center gap-1 rounded-lg bg-accent px-2 text-[11px] font-semibold text-[#1C1917] md:text-xs"
                >
                  Open <ArrowUpRight size={11} />
                </a>
                {"repoUrl" in p && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={p.repoUrl}
                    className="flex min-h-8 items-center rounded-lg px-2.5 text-[11px] shadow-neu md:text-xs"
                  >
                    Code
                  </a>
                )}
              </div>
            </motion.article>
          ))}

          {(filter === "All" || filter === "Case study") &&
            caseStudies.map((p) => (
              <motion.article
                layout
                id={`project-${p.id}`}
                key={p.id}
                className="rounded-xl border border-border-subtle bg-background-elevated p-2 shadow-neu md:rounded-2xl md:p-2.5"
              >
                <p className="font-mono text-[9px] md:text-[10px]">
                  CASE STUDY
                </p>
                <h2 className="mt-0.5 text-[13px] font-semibold leading-tight md:text-base">
                  {p.name}
                </h2>
                <p className="mt-1 text-[11px] font-medium leading-snug md:text-xs">
                  {p.tagline}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-foreground/70 md:text-xs">
                  {p.description}
                </p>
                <Link
                  to={`/work/${p.id}`}
                  className="mt-2 inline-flex min-h-8 items-center rounded-lg bg-accent px-2.5 text-[11px] font-semibold text-[#1C1917] md:text-xs"
                >
                  Read case study
                </Link>
              </motion.article>
            ))}
        </div>
      </main>

      {/* ===== MODAL ===== */}
      <SitePreviewModal
        site={activePreview}
        onClose={() => setActivePreview(null)}
      />
    </Reveal>
  );
}

function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactValues & { consent: boolean }>();
  const [sent, setSent] = useState("");
  const [lastChannel, setLastChannel] = useState<"wa" | "mail" | null>(null);

  const send = (channel: "wa" | "mail") =>
    handleSubmit((f) => {
      const msg = buildMessage(f);
      setSent(msg);
      setLastChannel(channel);
      if (channel === "wa")
        window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
      else location.href = mailtoUrl(`Website enquiry: ${f.topic}`, msg);
    });

  const contactMethods = [
    {
      Icon: Phone,
      label: "Phone",
      value: CONTACT.phoneDisplay,
      href: `tel:${CONTACT.phoneTel}`,
      hint: "Mon–Fri, 9am–6pm EAT",
      accent: "text-foreground",
      bg: "bg-background-elevated",
    },
    {
      Icon: Mail,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      hint: "Replies within 24 hours",
      accent: "text-foreground",
      bg: "bg-background-elevated",
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat directly",
      href: `https://wa.me/${CONTACT.waNumber}`,
      hint: "Fastest response",
      accent: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <Reveal>
      <SEO
        title="Contact Brandon Kimathi | Call, WhatsApp or Email"
        description="Get in touch with Brandon Kimathi - software architect at KODÈS. Reach out by phone, WhatsApp, or email about a project, website, or collaboration."
      />
      <main
        id="main"
        className="mx-auto max-w-6xl px-3.5 py-7 md:px-8 md:py-24"
      >
        {/* ===== HERO HEADER ===== */}
        <p className="font-mono text-[10px] md:text-[11px]">01 / CONTACT</p>
        <h1
          tabIndex={-1}
          className="mt-2 max-w-2xl text-2xl font-semibold leading-tight tracking-tight outline-none md:mt-4 md:text-6xl"
        >
          Have something in mind? Let&apos;s talk.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/70 md:mt-5 md:text-base">
          Whether it&apos;s a new project, a website that needs building, or a
          payments problem to solve - send a message and I&apos;ll reply within
          one working day.
        </p>

        {/* ===== TWO-COLUMN LAYOUT ===== */}
        <div className="mt-8 grid gap-6 md:mt-14 md:grid-cols-5 md:gap-8 lg:gap-12">
          {/* LEFT: CONTACT METHODS + TRUST SIGNALS */}
          <aside className="md:col-span-2 md:sticky md:top-24 md:self-start">
            <h2 className="mb-3 font-mono text-[10px] tracking-widest text-foreground/60 md:mb-4">
              DIRECT CHANNELS
            </h2>

            <div className="space-y-2.5 md:space-y-3">
              {contactMethods.map(
                ({ Icon, label, value, href, hint, accent, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-3 rounded-2xl border border-border-subtle bg-background-elevated p-3.5 shadow-neu transition-all hover:-translate-y-0.5 hover:shadow-medium md:p-4"
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl ${bg} ${accent} md:size-11`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-foreground/50 md:text-[10px]">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-[13.5px] font-semibold leading-tight md:text-sm">
                        {value}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-foreground/60 md:text-xs">
                        {hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="mt-1 shrink-0 text-foreground/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </a>
                ),
              )}
            </div>

            {/* Response expectation card */}
            <div className="mt-4 rounded-2xl border border-border-subtle bg-background-elevated p-3.5 shadow-neu md:mt-5 md:p-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <span className="text-[10px] font-bold">i</span>
                </span>
                <p className="text-[11.5px] leading-relaxed text-foreground/70 md:text-xs">
                  <strong className="text-foreground">Nothing is stored</strong>{" "}
                  - messages go straight to WhatsApp or your email app. No
                  database, no tracking.
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT: FORM */}
          <div className="md:col-span-3">
            <form
              id="contact-form"
              className="space-y-4 rounded-2xl border border-border-subtle bg-background-elevated p-4 shadow-neu md:space-y-5 md:rounded-3xl md:p-6 lg:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <h2 className="text-base font-semibold md:text-lg">
                  Send a message
                </h2>
                <p className="mt-1 text-[12px] text-foreground/60 md:text-[13px]">
                  Fill this in and choose how you&apos;d like to send it.
                </p>
              </div>

              {/* Name + Email side by side on larger phones/desktop */}
              <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                    <User size={12} className="text-foreground/50" />
                    Name <span className="text-accent">*</span>
                  </span>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Enter your name",
                      minLength: { value: 2, message: "At least 2 characters" },
                    })}
                    placeholder="Your name"
                    className="h-11 w-full rounded-xl border border-border-subtle bg-background px-3 text-[14px] shadow-pressed outline-none transition-colors focus:border-accent focus:outline-2 focus:outline-accent/20 md:h-12"
                  />
                  {errors.name && (
                    <span className="mt-1 block text-[11px] text-red-500">
                      {String(errors.name.message)}
                    </span>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                    <AtSign size={12} className="text-foreground/50" />
                    Email <span className="text-accent">*</span>
                  </span>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Enter your email",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="you@email.com"
                    className="h-11 w-full rounded-xl border border-border-subtle bg-background px-3 text-[14px] shadow-pressed outline-none transition-colors focus:border-accent focus:outline-2 focus:outline-accent/20 md:h-12"
                  />
                  {errors.email && (
                    <span className="mt-1 block text-[11px] text-red-500">
                      {String(errors.email.message)}
                    </span>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                  <Phone size={12} className="text-foreground/50" />
                  Phone{" "}
                  <span className="font-normal normal-case tracking-normal text-foreground/40">
                    (optional)
                  </span>
                </span>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+254 7XX XXX XXX"
                  className="h-11 w-full rounded-xl border border-border-subtle bg-background px-3 text-[14px] shadow-pressed outline-none transition-colors focus:border-accent focus:outline-2 focus:outline-accent/20 md:h-12"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                  <MessageCircle size={12} className="text-foreground/50" />
                  What&apos;s this about? <span className="text-accent">*</span>
                </span>
                <select
                  {...register("topic", { required: "Pick a topic" })}
                  className="h-11 w-full rounded-xl border border-border-subtle bg-background px-3 text-[14px] shadow-pressed outline-none transition-colors focus:border-accent focus:outline-2 focus:outline-accent/20 md:h-12"
                >
                  <option value="">Choose a topic</option>
                  <option>A new project</option>
                  <option>A website or app</option>
                  <option>Payments or online selling</option>
                  <option>Working with KODÈS</option>
                  <option>Something else</option>
                </select>
                {errors.topic && (
                  <span className="mt-1 block text-[11px] text-red-500">
                    {String(errors.topic.message)}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                  <Send size={12} className="text-foreground/50" />
                  Message <span className="text-accent">*</span>
                </span>
                <textarea
                  {...register("message", {
                    required: "Enter a message",
                    minLength: {
                      value: 10,
                      message: "Please write at least 10 characters",
                    },
                    maxLength: 1000,
                  })}
                  rows={4}
                  placeholder="Tell me a bit about what you have in mind…"
                  className="hidden-scrollbar w-full resize-none rounded-xl border border-border-subtle bg-background p-3 text-[14px] leading-relaxed shadow-pressed outline-none transition-colors focus:border-accent focus:outline-2 focus:outline-accent/20"
                />
                <span className="mt-1 flex items-center justify-between text-[11px] text-foreground/50">
                  <span>
                    {errors.message && (
                      <span className="text-red-500">
                        {String(errors.message.message)}
                      </span>
                    )}
                  </span>
                  <span className="font-mono tabular-nums">
                    {watch("message")?.length || 0} / 1000
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 rounded-xl border border-border-subtle bg-background p-3">
                <input
                  type="checkbox"
                  {...register("consent", {
                    required: "Please accept to continue",
                  })}
                  className="mt-0.5 size-4 shrink-0 accent-accent"
                />
                <span className="text-[12px] leading-snug text-foreground/70">
                  I agree to send this message. I&apos;ve read the{" "}
                  <Link className="underline hover:text-accent" to="/privacy">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link className="underline hover:text-accent" to="/terms">
                    Terms
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <span className="block text-[11px] text-red-500">
                  {String(errors.consent.message)}
                </span>
              )}

              <div className="flex flex-col gap-2 border-t border-border-subtle pt-4 sm:flex-row md:gap-3">
                <button
                  type="button"
                  onClick={send("wa")}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-[13.5px] font-semibold text-[#1C1917] shadow-neu transition-all hover:-translate-y-0.5 hover:shadow-medium md:text-sm"
                >
                  <MessageCircle size={16} />
                  Send on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={send("mail")}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border-subtle px-4 text-[13.5px] font-semibold shadow-neu transition-all hover:-translate-y-0.5 hover:shadow-medium md:text-sm"
                >
                  <Mail size={16} />
                  Send by email
                </button>
              </div>

              {sent && lastChannel && (
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-600">
                    <span className="text-[11px] font-bold">✓</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium text-foreground">
                      {lastChannel === "wa"
                        ? "Opening WhatsApp…"
                        : "Opening your email app…"}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-foreground/60">
                      Didn&apos;t open?{" "}
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard
                            .writeText(sent)
                            .then(() => toast.success("Message copied"))
                        }
                        className="font-medium underline hover:text-accent"
                      >
                        Copy message
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </Reveal>
  );
}

function Legal({ kind }: { kind: "terms" | "privacy" }) {
  const data = kind === "terms" ? termsSections : privacySections;
  const name = kind === "terms" ? "Terms and Conditions" : "Privacy Policy";
  return (
    <Reveal>
      <SEO
        title={`${name} | Brandon Kimathi`}
        description={`${name} for brandonkimathi.top.`}
      />
      <main id="main" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px]">LEGAL / 25 OCTOBER 2026</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-7xl">{name}</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_16rem]">
          <article className="rounded-3xl border border-border-subtle bg-background-elevated p-6 shadow-neu md:p-10">
            {data.map((s) => (
              <section id={s.id} key={s.id} className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-semibold">{s.heading}</h2>
                {s.body.map((p) => (
                  <p
                    key={p}
                    className="mt-4 max-w-prose leading-relaxed text-foreground/75"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </article>
          <nav className="order-first self-start rounded-2xl p-4 shadow-pressed lg:sticky lg:top-24 lg:order-last">
            {data.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block py-2 text-sm">
                {s.heading}
              </a>
            ))}
          </nav>
        </div>
      </main>
    </Reveal>
  );
}

function Simple({ name }: { name: string }) {
  return (
    <Reveal>
      <SEO
        title={`${name} | Brandon Kimathi`}
        description={`${name} by Brandon Kimathi.`}
      />
      <main
        id="main"
        className="mx-auto min-h-[70dvh] max-w-5xl px-5 py-16 md:px-8 md:py-24"
      >
        <p className="font-mono text-[11px]">
          BRANDON KIMATHI / {name.toUpperCase()}
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
          {name}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-foreground/70">
          I plan and build software that stays useful as needs change.
        </p>
        <div className="mt-10 flex gap-3">
          <Link to="/work" className="rounded-xl p-4 shadow-neu">
            See my work
          </Link>
          <Link to="/contact" className="rounded-xl p-4 shadow-neu">
            Contact me
          </Link>
          <Link to="/" className="rounded-xl p-4 shadow-neu">
            Home
          </Link>
        </div>
      </main>
    </Reveal>
  );
}

function Footer() {
  const { pathname } = useLocation();
  const top = (path: string) => {
    if (pathname === path) window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer
      id="footer"
      className="relative mx-3 mb-20 overflow-hidden rounded-t-[22px] border border-border-subtle bg-background-elevated px-4 py-6 shadow-medium md:mx-6 md:mb-0 md:px-10 md:py-12"
    >
      <Pattern />
      <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-3 md:gap-10">
        <div>
          <Logo size={44} className="mb-3 md:mb-4" />
          <h2 className="text-lg font-semibold md:text-2xl">Brandon Kimathi</h2>
          <p className="mt-1 text-xs text-foreground/70 md:mt-2 md:text-base">
            Software that stays fast, safe and ready to grow.
          </p>
        </div>
        <div className="hidden grid-cols-2 gap-3 md:grid">
          {routes.map(([p, n]) => (
            <Link key={p} to={p} onClick={() => top(p)}>
              {n}
            </Link>
          ))}
          <Link to="/terms" onClick={() => top("/terms")}>
            Terms
          </Link>
          <Link to="/privacy" onClick={() => top("/privacy")}>
            Privacy
          </Link>
        </div>
        <div className="text-xs md:text-base">
          <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a>
          <a
            className="ml-4 md:ml-0 md:mt-3 md:block"
            href={`mailto:${CONTACT.email}`}
          >
            {CONTACT.email}
          </a>
          <div className="flex items-end justify-between gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-3 min-h-11 rounded-xl px-3 shadow-small md:mt-5 md:px-4"
            >
              Back to top
            </button>
            <MotionControl />
          </div>
        </div>
      </div>
      <p className="relative mx-auto mt-4 max-w-7xl text-[10px] text-foreground/70 md:mt-12 md:text-xs">
        © {new Date().getFullYear()} Brandon Kimathi
      </p>
    </footer>
  );
}

function NotFound() {
  return (
    <main
      id="main"
      className="grid min-h-[80dvh] place-items-center p-5 text-center"
    >
      <SEO
        noindex
        title="Page not found | Brandon Kimathi"
        description="This page could not be found."
      />
      <div className="rounded-3xl border border-border-subtle p-10 shadow-pressed">
        <p className="font-mono text-sm">404 / EMPTY BOX</p>
        <h1 className="mt-4 text-4xl font-semibold">This page is not here.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="p-3 underline">
            Home
          </Link>
          <Link to="/work" className="p-3 underline">
            Work
          </Link>
          <Link to="/contact" className="p-3 underline">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}

function Shell() {
  const [search, setSearch] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const open = () => setSearch(true);
    addEventListener("open-search", open);
    return () => removeEventListener("open-search", open);
  }, []);
  useEffect(() => {
    if (!location.hash && !location.search)
      window.scrollTo({ top: 0, behavior: "instant" });
    const heading = document.querySelector<HTMLElement>("main h1");
    window.setTimeout(() => heading?.focus({ preventScroll: true }), 100);
  }, [location.pathname]);
  return (
    <>
      <RouteTracker />
      <Breadcrumbs />

      <a
        href="#main"
        className="fixed left-3 top-3 z-[70] -translate-y-20 rounded-xl bg-accent p-3 text-[#1C1917] focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navigation onSearch={() => setSearch(true)} />
      <div className="pt-[calc(3.5rem+env(safe-area-inset-top))] lg:pt-20">
        {" "}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-i-think" element={<ThinkingPage />} />
            <Route path="/kodees" element={<KodeesPage />} />
            <Route path="/work/:projectId" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <SearchPalette open={search} setOpen={setSearch} />
      <Toaster richColors />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MotionProvider>
        <BrowserRouter>
          <TransitionProvider>
            <Shell />
          </TransitionProvider>
        </BrowserRouter>
      </MotionProvider>
    </HelmetProvider>
  );
}
