import { motion } from "motion/react";
import { kodeesData } from "../../data/kodees";

export const Approach = () => {
  const data = kodeesData.approach;

  return (
    <motion.section
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl md:text-3xl font-light">Approach</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-base opacity-80 leading-relaxed">
            {data.principle}
          </p>

          <ul className="space-y-2">
            {data.practices.map((practice) => (
              <li
                key={practice}
                className="text-sm opacity-70 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                {practice}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-2 border-accent/30 pl-6 flex items-center">
          <p className="text-sm font-light italic">{data.conviction}</p>
        </div>
      </div>
    </motion.section>
  );
};
