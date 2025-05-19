import React from "react";
import { motion } from "framer-motion";
import {
  FiDatabase,
  FiCode,
  FiCloud,
  FiCpu,
  FiServer,
  FiLayers,
  FiGitBranch,
} from "react-icons/fi";
import { FaReact } from "react-icons/fa";

const TechStackCloud = () => {
  const techItems = [
    { icon: <FaReact size={20} />, name: "React", color: "#61DAFB" },
    { icon: <FiDatabase size={20} />, name: "Node.js", color: "#68A063" },
    { icon: <FiCode size={20} />, name: "TypeScript", color: "#3178C6" },
    { icon: <FiCloud size={20} />, name: "AWS", color: "#FF9900" },
    { icon: <FiCpu size={20} />, name: "GraphQL", color: "#E535AB" },
    { icon: <FiServer size={20} />, name: "Docker", color: "#2496ED" },
    { icon: <FiLayers size={20} />, name: "Next.js", color: "#000000" },
    { icon: <FiGitBranch size={20} />, name: "Git", color: "#F05032" },
  ];

  return (
    <div className="tech-orbit">
      {techItems.map((item, index) => {
        const angle = (index / techItems.length) * Math.PI * 2;
        const radius = 140;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={index}
            className="tech-orbiter"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: x,
              y: y,
              opacity: 1,
              transition: {
                delay: index * 0.15,
                type: "spring",
                stiffness: 50,
              },
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
          >
            <div className="tech-icon-container">
              <motion.div
                className="tech-icon"
                style={{ color: item.color }}
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {item.icon}
              </motion.div>
              <div className="tech-name">{item.name}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechStackCloud;
