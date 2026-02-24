import { motion } from "motion/react";
import { kodeesData } from "../../data/kodees";
import { Instagram } from "lucide-react";

export const Social = () => {
  const data = kodeesData.social;

  return (
    <motion.section
      className="max-w-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <a
        href="https://instagram.com/tech_nomad5"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div
          className="bg-surface p-5 rounded-2xl transition-all duration-300 
                     group-hover:shadow-neumorph-hover"
          style={{
            boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Instagram className="w-4 h-4 text-accent/60" />
            <span className="text-sm text-accent">{data.handle}</span>
          </div>
          <p className="text-xs opacity-50 leading-relaxed">{data.note}</p>
        </div>
      </a>
    </motion.section>
  );
};
