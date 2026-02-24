import { motion } from "motion/react";
import { ReactNode } from "react";

type NeuCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  pressed?: boolean;
};

export default function NeuCard({ 
  children, 
  className = "", 
  hover = false,
  delay = 0,
  pressed = false
}: NeuCardProps) {
  const neuShadow = pressed 
    ? "shadow-[var(--neu-shadow-pressed)]" 
    : "shadow-[var(--neu-shadow-light),_var(--neu-shadow-dark)]";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4 } : {}}
      className={`bg-background relative z-10 ${neuShadow} rounded-[var(--radius)] p-6 transition-all duration-300 ${className}`}
      style={{
        boxShadow: pressed 
          ? "var(--neu-shadow-pressed)" 
          : "var(--neu-shadow-light), var(--neu-shadow-dark)"
      }}
    >
      {children}
    </motion.div>
  );
}
