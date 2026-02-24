import { motion } from "motion/react";

export const Closing = () => {
  return (
    <motion.section
      className="border-t border-accent/20 pt-8 mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <p className="text-sm opacity-60 leading-relaxed">
          KODÈS builds infrastructure for education and technology access across
          Africa.
        </p>
        <p className="text-sm font-light border-l-2 border-accent/30 pl-4">
          I build the systems behind that work.
        </p>
      </div>
    </motion.section>
  );
};
