import React from "react";
import { motion } from "framer-motion";

const ProfileImage = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 6,
    color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`,
  }));

  return (
    <div className="profile-container">
      <motion.div
        className="profile-frame"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
      >
        <img
          src="/profilePicMe.jpeg"
          alt="Brandon"
          className="profile-img"
          loading="lazy"
        />
        <div className="profile-glow"></div>
        <div className="profile-grid"></div>
      </motion.div>

      <div className="orbit-ring">
        <div className="ring-core"></div>
      </div>

      <div className="particle-field">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              transition: {
                delay: particle.delay,
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${50 + particle.x}%`,
              top: `${50 + particle.y}%`,
              backgroundColor: particle.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileImage;
