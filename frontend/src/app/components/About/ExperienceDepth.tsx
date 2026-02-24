import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";
import NeuCard from "../NeuCard";

const systems = [
  {
    title: "Payment Infrastructure",
    description:
      "Multi-currency processing with compliance automation and reconciliation flows built into the core architecture.",
  },
  {
    title: "Admin Operations Systems",
    description:
      "Unified dashboards with granular access control, audit logging, and cross-team data visibility.",
  },
  {
    title: "Analytics Engines",
    description:
      "Real-time event stream processing with custom funnel analysis and behavioral modeling.",
  },
  {
    title: "API & Platform Layers",
    description:
      "Centralized gateway architecture handling authentication, rate limiting, and service orchestration.",
  },
];

export const ExperienceDepth = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono">
            Depth
          </span>
          <h2 className="mt-2">Systems I've Built</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {systems.map((system, index) => (
            <motion.div key={system.title} variants={fadeUp}>
              <NeuCard hover delay={index * 0.1}>
                <div className="relative">
                  {/* Accent line */}
                  <div className="absolute -top-6 -left-6 w-12 h-0.5 bg-accent/30" />

                  <h3 className="text-accent text-lg font-medium mb-3">
                    {system.title}
                  </h3>

                  <p className="text-sm opacity-70 leading-relaxed">
                    {system.description}
                  </p>

                  {/* Subtle indicator */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                    <span className="text-[10px] uppercase tracking-wider text-accent/40 font-mono">
                      Production systems
                    </span>
                  </div>
                </div>
              </NeuCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
