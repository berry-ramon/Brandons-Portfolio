import React from "react";
import { motion } from "framer-motion";

const GlowEffect = ({
  position = "top-right",
  color = "var(--color-primary)",
  size = "300px",
}) => {
  const positions = {
    "top-right": { top: "-15%", right: "-15%" },
    "top-left": { top: "-15%", left: "-15%" },
    "bottom-right": { bottom: "-15%", right: "-15%" },
    "bottom-left": { bottom: "-15%", left: "-15%" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  };

  return (
    <motion.div
      className="glow-effect"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        zIndex: 0,
        ...positions[position],
      }}
    />
  );
};

export default GlowEffect;
