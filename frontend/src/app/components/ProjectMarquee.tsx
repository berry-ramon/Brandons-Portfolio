import { animate, motion, useInView, useMotionValue } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { openSourceTools, productionSites } from "../data/tools";
import { TransitionLink } from "./PageTransition";
import { useMotionSetting } from "../hooks/useMotionSetting";
import { ProjectLogo } from "../../components/ProjectLogo";

/* =========================================================
   ITEMS
   ---------------------------------------------------------
   Combined list of free tools + production sites.
   Each entry carries its URL so ProjectLogo can fetch the
   real /logo.png from the project's own domain.
   ========================================================= */

type MarqueeItem = {
  id: string;
  name: string;
  tag: "Tool" | "Site";
  url: string;
  monogram?: string;
};

const items: MarqueeItem[] = [
  ...openSourceTools.map((item) => ({
    id: item.id,
    name: item.name,
    tag: "Tool" as const,
    url: item.liveUrl,
  })),
  ...productionSites.map((item) => ({
    id: item.id,
    name: item.name,
    tag: "Site" as const,
    url: item.url,
    monogram: item.monogram,
  })),
];

/* =========================================================
   PROJECT MARQUEE
   ---------------------------------------------------------
   Continuously scrolling strip of every project.
   - Motion Value drives the horizontal translation
   - Duplicated list creates a seamless infinite loop
   - Pauses on hover, on pointer down (mobile), and when
     paused via the button
   - Respects prefers-reduced-motion via useMotionSetting
   ========================================================= */

export function ProjectMarquee() {
  const { reduced } = useMotionSetting();
  const section = useRef<HTMLDivElement>(null);
  const set = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const visible = useInView(section, { amount: 0.2 });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || !visible || !set.current) return;
    const distance = set.current.getBoundingClientRect().width;
    const speed = innerWidth < 768 ? 35 : 45;
    x.set(0);
    const controls = animate(x, -distance, {
      duration: distance / speed,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [paused, reduced, visible, x]);

  return (
    <div
      ref={section}
      className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      {/* Pause / Play control */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          aria-label={
            paused || reduced ? "Play project strip" : "Pause project strip"
          }
          aria-pressed={paused || reduced}
          onClick={() => setPaused(!paused)}
          className="grid size-11 place-items-center rounded-xl border border-border-subtle shadow-small transition-colors hover:bg-background-elevated"
        >
          {paused || reduced ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>

      {/* Scroll container */}
      <div
        className={
          reduced
            ? "hidden-scrollbar flex snap-x gap-3 overscroll-x-contain overflow-x-auto"
            : "overflow-hidden"
        }
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => window.setTimeout(() => setPaused(false), 600)}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => window.setTimeout(() => setPaused(false), 600)}
      >
        <motion.div style={reduced ? undefined : { x }} className="flex w-max">
          {[0, 1].map((copy) => (
            <div
              ref={copy === 0 ? set : undefined}
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex"
            >
              {items.map((item) => (
                <TransitionLink
                  tabIndex={copy ? -1 : undefined}
                  key={`${copy}-${item.id}`}
                  to={`/work?focus=${item.id}`}
                  className="group mr-2.5 flex h-[72px] w-[220px] shrink-0 items-center gap-2.5 rounded-2xl border border-border-subtle bg-background-elevated p-2.5 transition-all hover:-translate-y-0.5 hover:border-accent md:mr-3 md:h-28 md:w-[310px] md:gap-3 md:p-3"
                >
                  {/* Real project logo with fallback chain */}
                  <ProjectLogo
                    url={item.url}
                    name={item.name}
                    monogram={item.monogram}
                    size={48}
                  />

                  <span className="min-w-0 flex-1">
                    <b className="block truncate text-sm md:text-base">
                      {item.name}
                    </b>
                    <small className="text-xs text-foreground/65">
                      {item.tag}
                    </small>
                  </span>
                </TransitionLink>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
