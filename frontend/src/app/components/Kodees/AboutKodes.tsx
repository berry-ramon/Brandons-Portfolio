import { motion } from "motion/react";
import { kodeesData } from "../../data/kodees";

export const AboutKodes = () => {
  const data = kodeesData.organization;

  return (
    <motion.section
      className="grid md:grid-cols-2 gap-12 md:gap-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-light mb-4">
          About {data.name}
        </h2>
        <p className="text-base opacity-70 leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-accent/40 font-mono mb-3 block">
            Initiatives
          </span>
          <ul className="space-y-2">
            {data.initiatives.map((item) => (
              <li
                key={item}
                className="text-sm opacity-70 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-2 border-accent/20 pl-4">
          <p className="text-sm italic opacity-80">{data.mission}</p>
        </div>
      </div>
    </motion.section>
  );
};
