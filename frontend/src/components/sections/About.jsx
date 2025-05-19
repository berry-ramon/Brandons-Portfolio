import { useState, useEffect, useRef } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import {
  FiDownload,
  FiMail,
  FiCode,
  FiLayers,
  FiCpu,
  FiAward,
} from "react-icons/fi";
import ProfileImage from "../ui/ProfileImage";
import TechStackCloud from "../ui/TechStackCloud";
import GlowEffect from "../ui/GlowEffect";
import "../../styles/About.css";

// Default static data
const DEFAULT_DATA = {
  name: "Brandon Kimathi",
  title: "Senior Full-Stack Engineer",
  description: [
    "Senior Full-Stack Engineer with 5+ years of experience building scalable web applications and leading development teams.",
    "Currently specializing in React 19, Next.js 15, Node.js 22, and Cloud Architecture with AWS/GCP.",
    "Passionate about AI integration, Web3 technologies, and creating exceptional developer experiences.",
  ],
  stats: {
    projects: 50,
    clients: 15,
    experience: 5,
  },
  professions: [
    "Full-Stack Developer",
    "React Specialist",
    "UI/UX Designer",
    "Cloud Architect",
    "AI Enthusiast",
    "Tech Innovator",
  ],
  techStack: [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "GraphQL",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
};

const About = () => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [typedText, setTypedText] = useState("");
  const { trackEvent } = useAnalytics();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const typingTimeoutRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hero-data");
        if (!response.ok) throw new Error("Network response was not ok");
        const serverData = await response.json();
        setData({ ...DEFAULT_DATA, ...serverData });
      } catch (error) {
        console.error("Failed to fetch hero data, using defaults:", error);
        setData(DEFAULT_DATA);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 150;

    const type = () => {
      const currentProfession =
        data.professions[currentIndex % data.professions.length];

      if (isDeleting) {
        currentText = currentProfession.substring(0, currentText.length - 1);
      } else {
        currentText = currentProfession.substring(0, currentText.length + 1);
      }

      setTypedText(currentText);

      if (!isDeleting && currentText === currentProfession) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentIndex++;
        typingSpeed = 500;
      } else {
        typingSpeed = isDeleting ? 30 : 100 + Math.random() * 50;
      }

      typingTimeoutRef.current = setTimeout(type, typingSpeed);
    };

    typingTimeoutRef.current = setTimeout(type, 1000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [data.professions]);

  const handleActionClick = (actionType) => {
    trackEvent(`${actionType}_button_click`, { section: "about" });
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      {/* Cyberpunk background elements */}
      <div className="data-matrix"></div>
      <div className="radar-scan"></div>

      {/* Glow effects */}
      <GlowEffect position="top-right" color="var(--color-primary)" />
      <GlowEffect position="bottom-left" color="var(--color-secondary)" />
      <GlowEffect position="center" color="var(--color-accent)" size="600px" />

      {/* Grid effects */}
      <div className="holographic-grid" />
      <div className="binary-stream" />

      <div className="about-container">
        <motion.div
          className="about-content"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Title section with glitch effect */}
          <motion.div variants={itemVariants}>
            <h4 className="section-subtitle hud-element">
              <FiAward className="icon" />
              <span className="glitch-effect" data-text="ABOUT ME">
                ABOUT ME
              </span>
            </h4>
          </motion.div>

          {/* Main heading with enhanced cyberpunk styling */}
          <motion.h1
            variants={itemVariants}
            className="glitch-effect"
            data-text={`Hi, I'm ${data.name.split(" ")[0]}`}
          >
            Hi, I'm{" "}
            <span className="highlight pixel-border">
              {data.name.split(" ")[0]}
            </span>
          </motion.h1>

          {/* Typing animation with console effect */}
          <motion.div
            className="typing-container hud-element"
            variants={itemVariants}
          >
            <span className="typing-cursor"></span>
            <span className="profession-text console-text">{typedText}</span>
          </motion.div>

          {/* Description with enhanced cyberpunk styling */}
          <motion.div className="about-text" variants={itemVariants}>
            {data.description.map((paragraph, index) => (
              <p key={index} className="console-text">
                {index === 0 && <FiCode className="inline-icon" />}
                {index === 1 && <FiLayers className="inline-icon" />}
                {index === 2 && <FiCpu className="inline-icon" />}
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Stats grid with HUD styling */}
          <motion.div
            className="stats-grid hud-element"
            variants={itemVariants}
          >
            <div className="stat-item">
              <div className="stat-number">{data.stats.projects}+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{data.stats.clients}+</div>
              <div className="stat-label">Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{data.stats.experience}+</div>
              <div className="stat-label">Years</div>
            </div>
          </motion.div>

          {/* Action buttons with enhanced effects */}
          <motion.div className="about-actions" variants={itemVariants}>
            <motion.button
              className="btn-primary pixel-border"
              onClick={() => handleActionClick("hire")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="btn-icon" /> Hire Me
            </motion.button>
            <motion.button
              className="btn-secondary pixel-border"
              onClick={() => handleActionClick("contract")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="btn-icon" /> Download CV
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image and tech stack section */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <ProfileImage />
          <TechStackCloud items={data.techStack} />
          <div className="neon-ring" />
          <div className="particle-field" />
        </motion.div>
      </div>

      {/* Enhanced floating UI elements */}
      <div className="floating-ui hud-element">
        <div className="connection-status">
          <div className="signal-strength">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
          <span>SYSTEM CONNECTED</span>
        </div>
        <div className="data-transfer">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="packet"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
