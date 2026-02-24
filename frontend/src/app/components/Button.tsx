import { Link } from "react-router";
import { motion } from "motion/react";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  icon?: React.ReactNode;
};

export default function Button({ 
  children, 
  to, 
  onClick, 
  variant = "primary",
  type = "button",
  className = "",
  icon
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[var(--radius)] transition-all duration-300 relative";
  
  const variantStyles = {
    primary: "bg-accent text-dark-cocoa hover:bg-accent-hover",
    secondary: "bg-background text-foreground"
  };
  
  const neuStyles = variant === "primary" 
    ? "" 
    : "shadow-[var(--neu-shadow-light),_var(--neu-shadow-dark)]";

  const Component = motion.button;

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variantStyles[variant]} ${neuStyles} ${className}`}>
        <motion.span 
          className="flex items-center gap-2"
          whileHover={{ y: -1 }} 
          transition={{ duration: 0.2 }}
        >
          {children}
          {icon}
        </motion.span>
      </Link>
    );
  }

  return (
    <Component
      type={type}
      onClick={onClick}
      whileTap={{ 
        scale: 0.98,
        boxShadow: variant === "secondary" ? "var(--neu-shadow-pressed)" : undefined 
      }}
      whileHover={{ 
        y: -2,
        boxShadow: variant === "primary" 
          ? "0 6px 20px rgba(217, 119, 6, 0.35)" 
          : undefined
      }}
      transition={{ duration: 0.2 }}
      className={`${baseStyles} ${variantStyles[variant]} ${neuStyles} ${className}`}
      style={variant === "secondary" ? {
        boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)"
      } : undefined}
    >
      <span className="flex items-center gap-2">
        {children}
        {icon}
      </span>
    </Component>
  );
}