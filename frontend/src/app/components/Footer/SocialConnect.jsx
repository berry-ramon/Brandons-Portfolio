import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/brandonkimathi",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/brandonkimathi",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/brandonkimathi",
    label: "Twitter",
  },
  {
    icon: Mail,
    href: "mailto:brandon@example.com",
    label: "Email",
  },
];

export const SocialConnect = () => {
  return (
    <div className="flex items-center justify-center md:justify-end gap-2">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
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
          aria-label={social.label}
        >
          {/* Subtle glow on hover */}
          <div
            className="absolute inset-0 rounded-xl bg-accent/0 group-hover:bg-accent/5 
                        transition-colors duration-300"
          />

          <social.icon className="w-4 h-4 relative z-10" />
        </motion.a>
      ))}
    </div>
  );
};
