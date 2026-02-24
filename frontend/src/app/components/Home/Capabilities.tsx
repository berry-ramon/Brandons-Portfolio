import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";

interface Capability {
  id: string;
  category: "Design" | "Systems" | "Infrastructure";
  title: string;
  outcome: string;
  context: string;
}

const capabilities: Capability[] = [
  {
    id: "product-architecture",
    category: "Systems",
    title: "Product Architecture",
    outcome: "Systems that scale without rewriting",
    context:
      "Data modeling, domain boundaries, and integration patterns that anticipate evolution rather than reacting to it.",
  },
  {
    id: "interaction-design",
    category: "Design",
    title: "Interaction Design",
    outcome: "Flows that feel inevitable",
    context:
      "Reducing cognitive load through progressive disclosure and contextual decision-making.",
  },
  {
    id: "infrastructure",
    category: "Infrastructure",
    title: "System Infrastructure",
    outcome: "Foundations that hold",
    context:
      "API design, auth flows, and service architecture that make complexity manageable.",
  },
  {
    id: "product-strategy",
    category: "Systems",
    title: "Product Strategy",
    outcome: "Direction over features",
    context:
      "Mapping business logic to system behavior before writing implementation code.",
  },
  {
    id: "design-systems",
    category: "Design",
    title: "Design Systems",
    outcome: "Consistency at scale",
    context:
      "Component architecture that enforces patterns without constraining expression.",
  },
  {
    id: "performance",
    category: "Infrastructure",
    title: "Performance Architecture",
    outcome: "Speed as a feature",
    context:
      "Optimization strategies that target real user impact, not synthetic metrics.",
  },
];

const categories = ["Design", "Systems", "Infrastructure"] as const;

export const Capabilities = () => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Systems");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCapabilities = capabilities.filter(
    (c) => c.category === activeCategory,
  );

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono">
            Capabilities
          </span>
          <h2 className="mt-2">What I bring to systems</h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-dark-cocoa/5 rounded-2xl w-fit">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setExpandedId(null);
              }}
              className={`
                px-5 py-2.5 text-sm font-mono rounded-xl transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-accent text-dark-cocoa shadow-neumorph-pressed"
                    : "text-foreground/60 hover:text-foreground/80"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Capabilities grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
        >
          {filteredCapabilities.map((capability) => (
            <motion.div key={capability.id} variants={fadeUp} className="group">
              <div
                className="bg-surface p-6 rounded-2xl shadow-neumorph cursor-pointer
                          transition-all duration-300 hover:shadow-neumorph-hover"
                onClick={() =>
                  setExpandedId(
                    expandedId === capability.id ? null : capability.id,
                  )
                }
              >
                {/* Always visible */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-accent text-lg font-medium">
                    {capability.title}
                  </h3>
                  <motion.span
                    className="text-accent/40 text-xl"
                    animate={{ rotate: expandedId === capability.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </div>

                <p className="text-sm font-light mb-3 opacity-80">
                  {capability.outcome}
                </p>

                {/* Expandable context */}
                <AnimatePresence>
                  {expandedId === capability.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-accent/10">
                        <p className="text-xs leading-relaxed opacity-60">
                          {capability.context}
                        </p>

                        {/* Subtle indicator */}
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-1 h-1 rounded-full bg-accent/40" />
                          <span className="text-[10px] uppercase tracking-wider text-accent/40 font-mono">
                            Click to collapse
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category indicator dot */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`
                    w-1.5 h-1.5 rounded-full
                    ${
                      capability.category === "Design"
                        ? "bg-accent/40"
                        : capability.category === "Systems"
                          ? "bg-accent/60"
                          : "bg-accent/80"
                    }
                  `}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs text-center font-mono text-foreground/40 mt-8"
        >
          Click any capability to expand → deeper context
        </motion.p>
      </div>
    </section>
  );
};
