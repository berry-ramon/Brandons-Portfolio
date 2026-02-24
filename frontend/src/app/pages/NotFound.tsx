import { motion } from "motion/react";
import { Link, useRouteError } from "react-router";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  const error = useRouteError();
  const is404 = !error || (error as any)?.status === 404;

  return (
    <>
      <SEO
        title={
          is404 ? "Page Not Found | Brandon Kimathi" : "Error | Brandon Kimathi"
        }
        description="The page you're looking for doesn't exist or has been moved. Return to homepage to explore software architecture and system design work."
        canonical="https://brandonkimathi.com/404"
        noindex={true}
      />

      <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8,
            }}
            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-accent/10 flex items-center justify-center relative"
            style={{
              boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
            }}
          >
            <AlertCircle className="w-12 h-12 text-accent" />

            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-accent/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Error code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-mono text-accent/60 tracking-wider">
              {is404 ? "404 ERROR" : "SYSTEM ERROR"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-light mt-4 mb-6"
          >
            {is404 ? "Page not found" : "Something went wrong"}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg opacity-70 mb-8 max-w-lg mx-auto"
          >
            {is404
              ? "The page you're looking for doesn't exist or has been moved. Let's get you back on track."
              : "An unexpected error occurred. Our systems have been notified."}
          </motion.p>

          {/* Show error in development */}
          {import.meta.env.DEV && error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-4 bg-red-500/10 rounded-xl text-left font-mono text-sm"
            >
              <p className="text-red-400 mb-2">Error details (dev only):</p>
              <pre className="text-foreground/60 text-xs overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </motion.div>
          )}

          {/* Divider with architectural element */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative max-w-xs mx-auto mb-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-accent/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs text-accent/40 font-mono">
                {is404 ? "PAGE.MISSING" : "SYSTEM.ERROR"}
              </span>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-dark-cocoa overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Return Home
              </span>
              <motion.div
                className="absolute inset-0 bg-accent-hover"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-foreground/80 hover:text-accent transition-all duration-300"
              style={{
                boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
              }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-accent/10"
          >
            <p className="text-sm text-foreground/40 mb-4 font-mono">
              EXPLORE INSTEAD
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { name: "Work", path: "/" },
                { name: "How I Think", path: "/how-i-think" },
                { name: "About", path: "/about" },
                { name: "KODÈS", path: "/kodees" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-foreground/60 hover:text-accent transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Subtle architectural element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.9 }}
            className="mt-16 flex justify-center gap-2"
          >
            <div className="w-1 h-1 rounded-full bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent/40" />
            <span className="text-[10px] font-mono text-foreground/20 ml-2">
              BRANDON KIMATHI · SYSTEM ARCHITECTURE
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
}
