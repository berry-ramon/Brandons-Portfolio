import { motion } from "motion/react";
import NeuCard from "../NeuCard";

const engagementTypes = [
  {
    title: "Early-stage product architecture",
    description: "Foundations that scale from day one",
  },
  {
    title: "System restructuring & scaling",
    description: "Evolution without breaking",
  },
  {
    title: "Payment or platform infrastructure",
    description: "Critical path reliability",
  },
];

export const EngagementFilter = () => {
  return (
    <div className="mb-12">
      <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono mb-4 block">
        What This Conversation Is For
      </span>

      <div className="grid md:grid-cols-3 gap-4">
        {engagementTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <NeuCard pressed={false} className="h-full">
              <div className="relative">
                {/* Accent dot */}
                <div className="absolute -top-2 -left-2 w-2 h-2 rounded-full bg-accent/40" />

                <h3 className="text-sm font-medium text-accent mb-2">
                  {type.title}
                </h3>
                <p className="text-xs opacity-60">{type.description}</p>
              </div>
            </NeuCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
