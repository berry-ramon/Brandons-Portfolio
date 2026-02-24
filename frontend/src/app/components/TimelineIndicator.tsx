import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export const TimelineIndicator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
    >
      {/* Timeline track */}
      <div className="absolute inset-0 w-px bg-accent/10" />

      {/* Animated progress line */}
      <motion.div
        className="absolute top-0 left-0 w-px bg-accent/40 origin-top"
        style={{ height: lineHeight }}
      />

      {/* Dots at each principle position */}
      <div className="absolute inset-0 flex flex-col justify-around">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-surface border border-accent/30" />
            <motion.div
              className="absolute -left-2 w-4 h-4 rounded-full bg-accent/5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
