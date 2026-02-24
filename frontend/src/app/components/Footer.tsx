import { motion } from "motion/react";
import { SocialConnect } from "./SocialConnect";

export default function Footer() {
  const year = new Date().getFullYear();

  const navigationLinks = [
    { name: "Work", path: "/" },
    { name: "About", path: "/about" },
    { name: "How I Think", path: "/how-i-think" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-dark-cocoa text-muted-sand pt-16 pb-8 mt-20 relative overflow-hidden"
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top divider with gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r 
                    from-transparent via-accent/30 to-transparent"
      />

      {/* Subtle inner shadow at top */}
      <div
        className="absolute top-0 left-0 right-0 h-20 
                    bg-gradient-to-b from-dark-cocoa/50 to-transparent 
                    pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main footer content - 3-column grid on desktop */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 pb-12">
          {/* Identity Block - Left */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono mb-3 block">
              Brandon Kimathi
            </span>

            <h3 className="text-lg font-light mb-2 text-foreground/90">
              I design structured digital systems.
            </h3>

            <p className="text-xs font-mono text-foreground/40 tracking-wide">
              Architecture. Flow. Longevity.
            </p>

            {/* Subtle architectural element */}
            <div className="hidden md:block w-12 h-px bg-accent/30 mt-6" />
          </motion.div>

          {/* Navigation Block - Center */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent/40 font-mono mb-4 block">
              Navigate
            </span>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
              {navigationLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300
                           relative group"
                >
                  {link.name}

                  {/* Subtle underline animation */}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent/30 
                                 scale-x-0 group-hover:scale-x-100 transition-transform 
                                 duration-300 origin-left"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect Block - Right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-right"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent/40 font-mono mb-4 block">
              Connect
            </span>

            <SocialConnect />

            {/* Availability indicator */}
            <div className="flex items-center justify-center md:justify-end gap-2 mt-4">
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
              <span className="text-[10px] font-mono text-foreground/30 tracking-wider">
                available for strategic work
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom legal strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 mt-4 border-t border-accent/10 flex flex-col md:flex-row 
                     justify-between items-center gap-4 text-xs"
        >
          <p className="font-mono text-foreground/30 order-2 md:order-1">
            © {year} Brandon Kimathi
          </p>

          <div className="flex items-center gap-4 order-1 md:order-2">
            <span className="text-foreground/20 text-[10px] font-mono tracking-widest">
              STRUCTURED WITH INTENTION
            </span>

            {/* Vertical divider */}
            <span className="hidden md:block w-px h-3 bg-accent/20" />

            <span className="text-foreground/20 text-[10px] font-mono">
              v{new Date().getFullYear()}.1
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
