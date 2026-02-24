import { motion } from "motion/react";
import { fadeUp } from "../../utils/motionVariants";
import NeuCard from "../NeuCard";
import Button from "../Button";

export const ClosingSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <NeuCard className="relative overflow-hidden">
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-neumorph-inset pointer-events-none" />

            <div className="relative z-10">
              <motion.span
                className="block text-xs uppercase tracking-[0.3em] text-accent/50 mb-3 font-mono"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Longevity
              </motion.span>

              <h2 className="mb-4 text-2xl md:text-3xl font-light">
                Longevity is <span className="text-accent">designed</span>, not
                hoped for.
              </h2>

              <p className="text-base opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Systems that scale. Foundations that hold. Products that evolve
                without breaking. Architecture is the only thing that outlasts
                implementation.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button to="/contact" className="group">
                  Start a Strategic Conversation
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </NeuCard>
        </motion.div>
      </div>
    </section>
  );
};
