import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";
import NeuCard from "../NeuCard";

const decisionPrinciples = [
  "I prioritize structural clarity over feature expansion",
  "Design for maintainability before optimization",
  "Map boundaries before defining interfaces",
  "Let data models dictate system behavior",
];

const optimizationPrinciples = [
  "I optimize for change tolerance over initial speed",
  "Reduce complexity at integration points",
  "Make state changes explicit and traceable",
  "Build for observability from day one",
];

export const OperatingPrinciples = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono">
            Operating Principles
          </span>
          <h2 className="mt-2">How I Make Decisions</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Decision Making */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <NeuCard>
              <h3 className="text-accent text-lg font-medium mb-6">
                How I Make Decisions
              </h3>

              <div className="space-y-4">
                {decisionPrinciples.map((principle, index) => (
                  <motion.div key={index} variants={fadeUp} className="group">
                    <p className="text-sm opacity-80 leading-relaxed">
                      {principle}
                    </p>
                    {index < decisionPrinciples.length - 1 && (
                      <div className="w-full h-px bg-accent/10 mt-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            </NeuCard>
          </motion.div>

          {/* What I Optimize For */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <NeuCard>
              <h3 className="text-accent text-lg font-medium mb-6">
                What I Optimize For
              </h3>

              <div className="space-y-4">
                {optimizationPrinciples.map((principle, index) => (
                  <motion.div key={index} variants={fadeUp} className="group">
                    <p className="text-sm opacity-80 leading-relaxed">
                      {principle}
                    </p>
                    {index < optimizationPrinciples.length - 1 && (
                      <div className="w-full h-px bg-accent/10 mt-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            </NeuCard>
          </motion.div>
        </div>

        {/* Closing principle statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm font-mono text-accent/60 border-t border-accent/10 pt-6">
            These principles remain stable as requirements change.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
