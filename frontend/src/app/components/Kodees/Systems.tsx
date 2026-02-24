import { motion } from "motion/react";
import { kodeesData } from "../../data/kodees";
import { useState } from "react";

export const Systems = () => {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const systems = kodeesData.systems;

  return (
    <motion.section
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl md:text-3xl font-light">Systems</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {systems.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() =>
              setActiveSystem(activeSystem === system.id ? null : system.id)
            }
            className={`
              bg-surface p-6 rounded-2xl cursor-pointer transition-all duration-500
              ${
                activeSystem === system.id
                  ? "shadow-neumorph-hover ring-1 ring-accent/20"
                  : "shadow-neumorph hover:shadow-neumorph-hover"
              }
            `}
            style={{
              boxShadow:
                activeSystem === system.id
                  ? "var(--neu-shadow-hover)"
                  : "var(--neu-shadow-light), var(--neu-shadow-dark)",
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium">{system.name}</h3>
              <motion.span
                className="text-accent/40"
                animate={{ rotate: activeSystem === system.id ? 45 : 0 }}
              >
                +
              </motion.span>
            </div>

            <p className="text-sm opacity-70 mb-4">{system.description}</p>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: activeSystem === system.id ? "auto" : 0,
                opacity: activeSystem === system.id ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-accent/10">
                <span className="text-xs font-mono text-accent/40 block mb-2">
                  Purpose
                </span>
                <ul className="space-y-1">
                  {system.purpose.map((item) => (
                    <li
                      key={item}
                      className="text-xs opacity-60 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
