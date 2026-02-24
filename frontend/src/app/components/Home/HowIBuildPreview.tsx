import { motion } from "motion/react";
import { fadeUp } from "../../utils/motionVariants";

const buildPrinciples = [
  {
    anchor: "Structure",
    description: "Map relationships before interfaces",
    icon: "⎔",
  },
  {
    anchor: "Flow",
    description: "Complete journeys over features",
    icon: "⇢",
  },
  {
    anchor: "Scale",
    description: "Foundations that adapt silently",
    icon: "⬈",
  },
];

export const HowIBuildPreview = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono">
            Approach
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {buildPrinciples.map((principle, index) => (
            <motion.div
              key={principle.anchor}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div
                className="bg-surface p-6 rounded-2xl shadow-neumorph 
                            transition-all duration-500 
                            hover:shadow-neumorph-hover hover:-translate-y-1"
              >
                <span
                  className="block text-2xl mb-3 text-accent/60 group-hover:text-accent/90 
                               transition-colors duration-300"
                >
                  {principle.icon}
                </span>
                <h3 className="text-accent mb-2 text-lg font-medium">
                  {principle.anchor}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
