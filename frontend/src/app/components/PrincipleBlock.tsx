import { motion } from "motion/react";
import { type Principle } from "../data/principles";

interface PrincipleBlockProps {
  principle: Principle;
  index: number;
  isAlternate: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const PrincipleBlock = ({
  principle,
  index,
  isAlternate,
}: PrincipleBlockProps) => {
  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      className={`relative flex ${isAlternate ? "md:justify-end" : "md:justify-start"}`}
    >
      <div
        className={`
        w-full md:w-5/12 group
        ${isAlternate ? "md:mr-[8.33%]" : "md:ml-[8.33%]"}
      `}
      >
        <motion.div
          className="relative bg-surface p-6 rounded-2xl shadow-neumorph 
                     transition-shadow duration-500 hover:shadow-neumorph-hover"
          whileHover="hover"
          initial="rest"
        >
          {/* Eyebrow */}
          <motion.span
            className="block text-xs uppercase tracking-[0.2em] text-accent/40 mb-2 font-mono"
            variants={{
              rest: { color: "rgba(var(--accent), 0.4)" },
              hover: { color: "rgba(var(--accent), 0.7)" },
            }}
            transition={{ duration: 0.3 }}
          >
            {principle.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-accent mb-3 text-xl font-medium"
            variants={{
              rest: { x: 0 },
              hover: { x: 4 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {principle.title}
          </motion.h2>

          {/* Summary */}
          <p className="text-base font-light mb-4 text-foreground/90">
            {principle.summary}
          </p>

          {/* Content */}
          <p className="text-sm leading-relaxed opacity-70 mb-5">
            {principle.content}
          </p>

          {/* Emphasis line */}
          <motion.div
            className="border-l-2 border-accent/30 pl-4 py-1"
            variants={{
              rest: { borderColor: "rgba(var(--accent), 0.3)" },
              hover: { borderColor: "rgba(var(--accent), 0.8)" },
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm italic text-foreground/80">
              {principle.emphasis}
            </p>
          </motion.div>

          {/* Subtle hover glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            variants={{
              rest: {
                boxShadow: "0 0 0 rgba(var(--accent), 0)",
                opacity: 0,
              },
              hover: {
                boxShadow: "0 0 30px rgba(var(--accent), 0.1)",
                opacity: 1,
              },
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
