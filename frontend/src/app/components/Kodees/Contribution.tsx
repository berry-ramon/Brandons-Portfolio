import { motion } from "motion/react";
import { kodeesData } from "../../data/kodees";

export const Contribution = () => {
  const data = kodeesData.contribution;

  return (
    <motion.section
      className="grid md:grid-cols-2 gap-12 md:gap-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-light mb-4">Contribution</h2>
        <ul className="space-y-2">
          {data.areas.map((area) => (
            <li
              key={area}
              className="text-sm opacity-70 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-accent/40" />
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-accent/5 p-8 rounded-2xl flex items-center">
        <p className="text-base italic opacity-80 leading-relaxed">
          "{data.core}"
        </p>
      </div>
    </motion.section>
  );
};
