import { motion, useMotionValue, useTransform } from "motion/react";
import { fadeIn } from "../../utils/motionVariants";

export const ProductPhilosophy = () => {
  const gradientX = useMotionValue(0);
  const gradientY = useMotionValue(0);

  return (
    <section className="py-16 md:py-20 bg-dark-cocoa text-muted-sand relative overflow-hidden">
      {/* Slow gradient drift */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 60%, rgba(217, 119, 6, 0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 40% 70%, rgba(217, 119, 6, 0.15) 0%, transparent 60%)",
            "radial-gradient(circle at 30% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Bold statement */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Good systems feel <span className="text-accent">inevitable</span>,
              not imposed.
            </h2>

            {/* Vertical accent line - visible on desktop */}
            <div className="hidden md:block w-px h-16 bg-accent/30 mt-8" />
          </motion.div>

          {/* Right: Supporting paragraph */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Vertical divider line */}
            <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-accent/20" />

            <p className="text-base md:text-lg leading-relaxed opacity-90 mb-6">
              I design flows that reduce friction, clarify decisions, and make
              complex systems feel natural. The interface is a consequence of
              structure, not its definition.
            </p>

            <p className="text-sm opacity-70 italic border-l-2 border-accent/30 pl-4">
              Good UI is not decoration it's direction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
