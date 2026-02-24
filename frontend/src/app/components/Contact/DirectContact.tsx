import { motion } from "motion/react";
import { Mail, Linkedin } from "lucide-react";

export const DirectContact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 pt-6 border-t border-accent/10"
    >
      <p className="text-xs font-mono text-foreground/40 mb-3 text-center">
        Prefer direct communication?
      </p>

      <div className="flex items-center justify-center gap-3">
        <a
          href="mailto:brandon@example.com"
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center
                   shadow-neumorph hover:shadow-neumorph-hover transition-all duration-300
                   text-foreground/60 hover:text-accent group"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        </a>

        <a
          href="https://linkedin.com/in/brandon"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center
                   shadow-neumorph hover:shadow-neumorph-hover transition-all duration-300
                   text-foreground/60 hover:text-accent group"
        >
          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        </a>

        <div className="h-6 w-px bg-accent/10 mx-1" />

        <span className="text-xs text-foreground/40 font-mono">
          response within 24h
        </span>
      </div>
    </motion.div>
  );
};
