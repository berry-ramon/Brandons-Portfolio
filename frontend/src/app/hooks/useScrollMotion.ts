import { useEffect, useMemo, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { useMotionSetting } from "./useMotionSetting";

export function useScrollMotion() {
  const { reduced } = useMotionSetting();
  const progress = useMotionValue(0);
  const velocity = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, { stiffness: 120, damping: 24, mass: .35 });
  const [lowPower] = useState(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    return navigator.hardwareConcurrency <= 4 || (memory !== undefined && memory <= 4);
  });
  useEffect(() => {
    if (reduced) {
      progress.set(0);
      velocity.set(0);
      return;
    }
    let previousY = scrollY;
    let previousTime = performance.now();
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const now = performance.now();
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        const delta = scrollY - previousY;
        const elapsed = Math.max(16, now - previousTime);
        progress.set(scrollY / max);
        velocity.set(lowPower ? 0 : Math.max(-40, Math.min(40, delta / elapsed * 16)));
        previousY = scrollY;
        previousTime = now;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [lowPower, progress, reduced, velocity]);
  return useMemo(() => ({ progress, velocity: smoothVelocity, reduced, lowPower }), [lowPower, progress, reduced, smoothVelocity]);
}
