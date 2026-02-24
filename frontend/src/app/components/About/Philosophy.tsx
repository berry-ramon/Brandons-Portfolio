import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";

export const Philosophy = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column - Bold statement with vertical accent */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono mb-4 block">
              Philosophy
            </span>

            <h2 className="text-2xl md:text-3xl font-light leading-relaxed">
              I treat product development as system design.
              <span className="text-accent block mt-3">
                Interfaces are outputs of structure, not the starting point.
              </span>
            </h2>

            {/* Vertical accent line */}
            <div className="hidden md:block absolute -right-6 top-0 bottom-0 w-px bg-accent/20" />
          </motion.div>

          {/* Right column - Supporting context */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed opacity-80"
            >
              The most resilient products share one characteristic: their
              architecture anticipated change. I map data relationships, define
              boundaries, and establish patterns before considering visual
              expression.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed opacity-80"
            >
              This approach ensures the system can absorb new requirements
              without fracturing. When structure precedes interface, complexity
              becomes manageable rather than chaotic.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm italic border-l-2 border-accent/30 pl-4"
            >
              Good architecture makes the right path the obvious one.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
