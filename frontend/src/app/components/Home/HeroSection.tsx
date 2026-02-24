import { motion, useMotionValue, useTransform } from "motion/react";
import { slideIn, scaleIn } from "../../utils/motionVariants";
import Button from "../Button";

export const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gradientX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const gradientY = useTransform(mouseY, [-500, 500], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative bg-dark-cocoa text-muted-sand py-16 md:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 119, 6, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated radial gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(217, 119, 6, 0.12) 0%, transparent 50%)",
          x: gradientX,
          y: gradientY,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div variants={slideIn} initial="hidden" animate="visible">
            <motion.span
              className="block text-xs uppercase tracking-[0.3em] text-accent/50 mb-4 font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Product Systems Architect
            </motion.span>

            <h1 className="mb-5 text-4xl md:text-5xl font-light leading-tight">
              I design digital systems that{" "}
              <span className="text-accent">scale with intention</span>.
            </h1>

            <p className="text-base md:text-lg mb-8 opacity-80 max-w-xl leading-relaxed">
              Architecture defines what's possible. I build foundations that
              adapt as requirements evolve, making complexity feel inevitable
              rather than imposed.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button to="/#work" className="group">
                View Selected Systems
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
              <Button to="/how-i-think" variant="secondary">
                How I Think
              </Button>
            </div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />

              {/* Image container */}
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-accent/30 
                            shadow-neumorph-image overflow-hidden group"
              >
                <img
                  src="./me.jpg"
                  alt="Brandon Kimathi"
                  className="w-full h-full object-cover transition-transform duration-700 
                           group-hover:scale-105"
                />

                {/* Subtle overlay on hover */}
                <div
                  className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 
                              transition-colors duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
