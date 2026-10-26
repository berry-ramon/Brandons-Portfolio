import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link as RouterLink,
  type LinkProps,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { MOTION } from "../motion/motion";
import { useMotionSetting } from "../hooks/useMotionSetting";

type TransitionState = { go: (to: string) => void; busy: boolean };
const TransitionContext = createContext<TransitionState | null>(null);
const labels: Record<string, string> = {
  "/": "HOME",
  "/work": "WORK",
  "/about": "ABOUT",
  "/how-i-think": "HOW I THINK",
  "/kodees": "KODÈS",
  "/contact": "CONTACT",
  "/terms": "TERMS",
  "/privacy": "PRIVACY",
};

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { reduced } = useMotionSetting();
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const [destination, setDestination] = useState("/");
  const timers = useRef<number[]>([]);
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const go = (to: string) => {
    if (phase !== "idle") return;
    const target = new URL(to, window.location.href);
    if (
      target.pathname === location.pathname &&
      !target.search &&
      !target.hash
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector("main h1")?.classList.add("opacity-70");
      later(
        () => document.querySelector("main h1")?.classList.remove("opacity-70"),
        220,
      );
      return;
    }
    setDestination(target.pathname);
    setPhase("closing");
    const close = reduced ? 190 : innerWidth < 768 ? 350 : 450;
    later(() => {
      navigate(`${target.pathname}${target.search}${target.hash}`);
      if (!target.hash && !target.search)
        window.scrollTo({ top: 0, behavior: "instant" });
      later(() => {
        setPhase("opening");
        later(
          () => {
            setPhase("idle");
            document
              .querySelector<HTMLElement>("main h1")
              ?.focus({ preventScroll: true });
          },
          reduced ? 210 : innerWidth < 768 ? 450 : 650,
        );
      }, 150);
    }, close);
    later(() => setPhase("idle"), 2500);
  };
  useEffect(() => clear, []);
  return (
    <TransitionContext.Provider value={{ go, busy: phase !== "idle" }}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="page-box"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.18 : 0.3 }}
            className="pointer-events-auto fixed inset-0 z-[100] overflow-hidden"
          >
            {[
              {
                key: "top",
                position: "inset-x-0 top-0 h-1/2",
                initial: { x: 0, y: "-100%" },
                open: { x: 0, y: "-100%" },
              },
              {
                key: "bottom",
                position: "inset-x-0 bottom-0 h-1/2",
                initial: { x: 0, y: "100%" },
                open: { x: 0, y: "100%" },
              },
              {
                key: "left",
                position: "inset-y-0 left-0 w-1/2",
                initial: { x: "-100%", y: 0 },
                open: { x: "-100%", y: 0 },
              },
              {
                key: "right",
                position: "inset-y-0 right-0 w-1/2",
                initial: { x: "100%", y: 0 },
                open: { x: "100%", y: 0 },
              },
            ].map((flap, index) => (
              <motion.div
                key={flap.key}
                initial={{ ...flap.initial, opacity: 1 }}
                animate={{
                  ...(phase === "closing" ? { x: 0, y: 0 } : flap.open),
                  opacity: 1,
                }}
                exit={{ ...flap.open, opacity: 0 }}
                transition={{
                  duration: reduced
                    ? 0.2
                    : phase === "closing"
                      ? innerWidth < 768
                        ? 0.35
                        : 0.45
                      : innerWidth < 768
                        ? 0.45
                        : 0.65,
                  ease: MOTION.ease,
                }}
                className={`absolute ${flap.position} border border-border-subtle bg-background-elevated`}
              >
                <svg
                  className="h-full w-full opacity-[0.08]"
                  viewBox="0 0 200 120"
                  fill="none"
                >
                  <path
                    d={`M${10 + index * 8} 100C45 20 95 110 190 20`}
                    stroke="currentColor"
                  />
                  <circle cx={45 + index * 30} cy="60" r="3" fill="#D97706" />
                </svg>
              </motion.div>
            ))}
            <div className="absolute inset-x-0 top-1/2 h-px bg-accent shadow-[0_0_8px_#D97706]" />
            <motion.p
              key={destination}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute inset-x-0 top-[calc(50%+1rem)] text-center font-mono text-[10px] text-foreground"
            >
              OPENING {labels[destination] ?? destination.toUpperCase()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export const TransitionLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function TransitionLink({ to, onClick, ...props }, ref) {
    const context = useContext(TransitionContext);
    const href =
      typeof to === "string"
        ? to
        : `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;
    if (!context)
      return <RouterLink ref={ref} to={to} onClick={onClick} {...props} />;
    return (
      <RouterLink
        ref={ref}
        to={to}
        onClick={(event) => {
          onClick?.(event);
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          event.preventDefault();
          context.go(href);
        }}
        {...props}
      />
    );
  },
);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context)
    throw new Error("usePageTransition must be used inside TransitionProvider");
  return context;
}
