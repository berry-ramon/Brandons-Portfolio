import { motion } from "motion/react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" />,
    url: "http://www.linkedin.com/in/brandon-kimathi-9542a8301",
  },
  {
    name: "GitHub",
    icon: <Github className="w-4 h-4" />,
    url: "http://github.com/berry-ramon",
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
    url: "https://www.instagram.com/tech_nomad5/",
  },
  {
    name: "Email",
    icon: <Mail className="w-4 h-4" />,
    url: "mailto:hello@brandonkimathi.com",
  },
];

export const SocialConnect = () => {
  return (
    <div className="flex items-center justify-center md:justify-end gap-2">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + index * 0.05 }}
          whileHover={{
            y: -2,
            boxShadow: "var(--neu-shadow-hover)",
          }}
          whileTap={{
            scale: 0.95,
            boxShadow: "var(--neu-shadow-pressed)",
          }}
          className="relative w-10 h-10 rounded-xl bg-dark-cocoa flex items-center 
                     justify-center text-foreground/50 hover:text-accent 
                     transition-all duration-300 group"
          style={{
            boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
          }}
          aria-label={link.name}
        >
          {/* Subtle glow on hover */}
          <div
            className="absolute inset-0 rounded-xl bg-accent/0 group-hover:bg-accent/5 
                        transition-colors duration-300"
          />

          <span className="relative z-10">{link.icon}</span>
        </motion.a>
      ))}
    </div>
  );
};
