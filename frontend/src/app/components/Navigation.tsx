import { Link, useLocation } from "react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../components/ThemeProvider";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const links = [
    { name: "Work", path: "/", id: "work" },
    { name: "How I Think", path: "/how-i-think", id: "philosophy" },
    { name: "About", path: "/about", id: "about" },
    { name: "Kodés", path: "/kodees", id: "kodees" },
    { name: "Contact", path: "/contact", id: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
        style={{
          boxShadow: scrolled
            ? "var(--neu-shadow-light), var(--neu-shadow-dark), 0 4px 20px rgba(0,0,0,0.1)"
            : "var(--neu-shadow-light), var(--neu-shadow-dark)",
        }}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-accent/20" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Name with architectural indicator */}
            <Link to="/" className="group relative flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center
                          group-hover:bg-accent/20 transition-colors duration-300"
              >
                <div
                  className="w-2 h-2 rounded-sm bg-accent/40 group-hover:bg-accent/60 
                            transition-colors duration-300"
                />
              </div>

              <span
                className="text-sm font-mono tracking-tight text-foreground/80 
                           group-hover:text-accent transition-colors duration-300"
              >
                Brandon Kimathi
              </span>

              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-accent/30 scale-x-0 
                         group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <div
                className="flex items-center gap-1 p-1 rounded-2xl bg-surface/50"
                style={{
                  boxShadow:
                    "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)",
                }}
              >
                {links.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link key={link.path} to={link.path} className="relative">
                      <motion.div
                        className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wide
                                  transition-all duration-300 relative z-10
                                  ${
                                    isActive
                                      ? "text-accent"
                                      : "text-foreground/60 hover:text-foreground/80"
                                  }`}
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                      >
                        {link.name}

                        {isActive && (
                          <motion.div
                            layoutId="activeNavBackground"
                            className="absolute inset-0 rounded-xl bg-accent/10 -z-0"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>

                      {isActive && (
                        <motion.div
                          layoutId="activeNavDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 
                                   rounded-full bg-accent"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <motion.button
                onClick={toggleTheme}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "var(--neu-shadow-hover)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "var(--neu-shadow-pressed)",
                }}
                className="ml-2 p-2.5 rounded-xl bg-surface transition-all duration-300
                         text-foreground/60 hover:text-accent relative overflow-hidden group"
                style={{
                  boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
                }}
                aria-label="Toggle theme"
              >
                <div
                  className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 
                            transition-colors duration-300 rounded-xl"
                />

                <motion.div
                  animate={{
                    rotate: theme === "dark" ? 180 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {theme === "light" ? (
                    <Moon className="w-3.5 h-3.5" />
                  ) : (
                    <Sun className="w-3.5 h-3.5" />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Header Actions */}
            <div className="md:hidden flex items-center gap-2 ">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-surface text-foreground/60"
                style={{
                  boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
                }}
              >
                {theme === "light" ? (
                  <Moon className="w-3.5 h-3.5" />
                ) : (
                  <Sun className="w-3.5 h-3.5" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-surface text-foreground/60 relative"
                style={{
                  boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                     from-transparent via-accent/20 to-transparent"
          animate={{
            opacity: scrolled ? 0.5 : 0.2,
            scaleX: scrolled ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.3,
              }}
              className="fixed top-0 right-0 h-full w-[280px] bg-surface z-50 md:hidden
                         shadow-2xl overflow-hidden"
              style={{
                boxShadow:
                  "var(--neu-shadow-dark), -4px 0 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Decorative top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r 
                            from-transparent via-accent/30 to-transparent"
              />

              {/* Menu Header */}
              <div className="pt-16 pb-6 px-6 border-b border-accent/10">
                <span className="text-xs font-mono text-accent/40 tracking-wider">
                  NAVIGATION
                </span>

                {/* Architectural element */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-accent/40" />
                  </div>
                  <span className="text-sm font-mono text-foreground/60">
                    Brandon Kimathi
                  </span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="px-4 py-6">
                {links.map((link, index) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between py-3 px-4 rounded-xl
                                  transition-all duration-300 group relative
                                  ${
                                    isActive
                                      ? "text-accent bg-accent/5"
                                      : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/5"
                                  }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-sm font-mono tracking-wide">
                          {link.name}
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                          />
                        )}

                        {/* Hover accent line */}
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 
                                   bg-accent/30 group-hover:h-6 transition-all duration-300"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-accent/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-foreground/30">
                    v{new Date().getFullYear()}.1
                  </span>

                  {/* Theme indicator in mobile menu */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-foreground/30">
                      {theme === "light" ? "Light" : "Dark"}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
