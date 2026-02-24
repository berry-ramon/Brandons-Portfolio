import { motion } from "motion/react";

export const ClosingStatement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative mt-20 md:mt-24"
    >
      <div className="relative max-w-2xl mx-auto text-center">
        {/* Decorative element */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-px bg-accent/30" />

        <p className="text-base font-light leading-relaxed opacity-80 mb-3">
          Systems are judged by what they make possible.
        </p>

        <motion.p
          className="text-accent text-lg font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          The best architecture makes complexity invisible and evolution
          inevitable.
        </motion.p>
      </div>
    </motion.div>
  );
};
