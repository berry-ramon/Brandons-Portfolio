import { motion } from "motion/react";
import { Layers, Code2, Plug, CreditCard, Network, Sparkles } from "lucide-react";
import NeuCard from "./NeuCard";

const capabilities = [
  {
    icon: <Layers className="w-5 h-5 text-accent" />,
    title: "UI / UX Design",
    description: "I design user flows that reduce friction and guide action intentionally. Interface clarity and usability strategy come first."
  },
  {
    icon: <Code2 className="w-5 h-5 text-accent" />,
    title: "Frontend Systems",
    description: "I build React architecture with clean state logic and structured component patterns that scale with the product."
  },
  {
    icon: <Plug className="w-5 h-5 text-accent" />,
    title: "API Design & Integration",
    description: "I structure REST APIs, authentication flows, and external service integrations with clarity and maintainability."
  },
  {
    icon: <CreditCard className="w-5 h-5 text-accent" />,
    title: "Payment Systems",
    description: "I architect mobile money integrations, card processing logic, and transaction lifecycle flows with precision."
  },
  {
    icon: <Network className="w-5 h-5 text-accent" />,
    title: "System Architecture & Planning",
    description: "I map data models, role-based structures, and system flows using Lucidchart before building anything."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-accent" />,
    title: "Research & Optimization",
    description: "I use AI-assisted research to refine performance, improve conversions, and strengthen product decisions."
  }
];

export default function Capabilities() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          What I Build With
        </motion.h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <NeuCard key={capability.title} hover delay={index * 0.08}>
              <div className="flex items-start gap-4">
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-background flex items-center justify-center"
                  style={{
                    boxShadow: "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)"
                  }}
                >
                  {capability.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-base">{capability.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            </NeuCard>
          ))}
        </div>
      </div>
    </section>
  );
}