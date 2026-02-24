import { motion } from "motion/react";
import { fadeIn, slideIn, scaleIn } from "../../utils/motionVariants";

export const HeroIdentity = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle background radial */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(217, 119, 6, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text Column */}
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <motion.span
              className="block text-xs uppercase tracking-[0.3em] text-accent/50 mb-4 font-mono"
              variants={fadeIn}
            >
              About
            </motion.span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-5 leading-tight">
              I design systems with{" "}
              <span className="text-accent">long-term integrity</span>.
            </h1>

            <p className="text-base md:text-lg opacity-80 max-w-xl leading-relaxed">
              I build foundations that adapt as requirements evolve.
              Architecture determines what's possible I ensure it enables rather
              than constrains.
            </p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-2xl" />

              {/* Neumorphic frame */}
              <div
                className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden
                            shadow-neumorph-image border-2 border-accent/10"
              >
                <img
                  src="./me.jpg"
                  alt="Brandon Kimathi"
                  className="w-full h-full object-cover"
                />

                {/* Soft accent border glow */}
                <div
                  className="absolute inset-0 rounded-2xl border border-accent/20 
                              shadow-[0_0_30px_rgba(217,119,6,0.15)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
