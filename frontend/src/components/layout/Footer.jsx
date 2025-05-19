import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SocialLinks from "../ui/SocialLinks";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaCode,
  FaServer,
  FaDatabase,
  FaTerminal,
  FaSatelliteDish,
} from "react-icons/fa";
import {
  SiVite,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiJest,
} from "react-icons/si";
import "../../styles/Footer.css";

const Footer = () => {
  const { theme } = useTheme();
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.min(100, Math.floor(Math.random() * 40) + 60),
        memory: Math.min(100, Math.floor(Math.random() * 30) + 65),
        network: Math.min(100, Math.floor(Math.random() * 50) + 50),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`footer ${theme}`}>
      {/* Binary rain background */}
      <div className="binary-rain">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="binary-column"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array(50)
              .fill()
              .map((_, j) => (Math.random() > 0.5 ? "1" : "0"))}
          </div>
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="scanlines"></div>

      {/* Grid distortion effect */}
      <div className="grid-distortion"></div>

      {/* Cityscape silhouette */}
      <div className="cityscape"></div>

      {/* Interactive holographic projector */}
      <div
        className="hologram-projector"
        onClick={() => setTerminalVisible(!terminalVisible)}
      >
        <div className="hologram-beam"></div>
      </div>

      {/* Cybernetic circuit borders */}
      <div className="circuit-border"></div>

      {/* AR Marker */}
      <div className="ar-marker"></div>

      {/* Holographic QR Code */}
      <div className="qr-hologram"></div>

      {/* Cybernetic Eye Scanner */}
      <div className="eye-scanner">
        <div className="scanner-beam"></div>
      </div>

      <div className="footer-container">
        {/* Holographic grid background */}
        <div className="holographic-grid">
          <div className="grid-layer grid-layer-1"></div>
          <div className="grid-layer grid-layer-2"></div>
          <div className="grid-layer grid-layer-3"></div>
        </div>

        {/* Floating particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                "--size": `${Math.random() * 4 + 2}px`,
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
                "--delay": `${Math.random() * 5}s`,
                "--duration": `${Math.random() * 10 + 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Interactive Terminal */}
        {terminalVisible && (
          <motion.div
            className="cyber-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="terminal-header">
              <span>SYSTEM_TERMINAL</span>
              <div className="system-stats">
                <span>CPU: {systemStats.cpu}%</span>
                <span>MEM: {systemStats.memory}%</span>
                <span>NET: {systemStats.network}%</span>
              </div>
              <button
                onClick={() => setTerminalVisible(false)}
                className="terminal-close"
              >
                X
              </button>
            </div>
            <div className="terminal-body">
              <p>&gt; INITIALIZING FOOTER SYSTEMS...</p>
              <p>&gt; CONNECTION ESTABLISHED</p>
              <p>&gt; LAST LOGIN: {new Date().toLocaleString()}</p>
              <p>
                &gt; STATUS: <span className="status-active">ACTIVE</span>
              </p>
              <p>&gt; RUNNING DIAGNOSTICS...</p>
              <p>&gt; ALL SYSTEMS NOMINAL</p>
              <p>&gt; READY FOR USER INPUT</p>
            </div>
          </motion.div>
        )}

        <div className="footer-content">
          {/* Brand section */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>
              <span className="name-glitch" data-text="BRANDON">
                <span className="glitch-layer glitch-1">BRANDON</span>
                <span className="glitch-layer glitch-2">BRANDON</span>
                <span className="glitch-layer glitch-3">BRANDON</span>
                <span className="glitch-main">BRANDON</span>
              </span>
              <span className="name-glitch accent" data-text="KIMATHI">
                <span className="glitch-layer glitch-1">KIMATHI</span>
                <span className="glitch-layer glitch-2">KIMATHI</span>
                <span className="glitch-layer glitch-3">KIMATHI</span>
                <span className="glitch-main">KIMATHI</span>
              </span>
            </h3>

            <p className="title-beam">
              <span className="beam-text">FULL-STACK DEVELOPER PORTFOLIO</span>
              <span className="beam-underline"></span>
            </p>

            <div className="tech-signal">
              <div className="signal-dot"></div>
              <div className="signal-bars">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
              </div>
              <span>SECURE CONNECTION ESTABLISHED</span>
            </div>
          </motion.div>

          {/* Navigation links */}
          <div className="footer-links">
            <motion.div
              className="link-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="link-title">
                <span>QUICK ACCESS</span>
                <span className="title-underline"></span>
              </h4>
              <ul>
                {[
                  { name: "About", href: "#about" },
                  { name: "Projects", href: "#projects" },
                  { name: "Skills", href: "#skills" },
                  { name: "Experience", href: "#experience" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.href} className="holographic-link">
                      <span className="link-number">0{index + 1}</span>
                      <span className="link-text">{link.name}</span>
                      <span className="link-arrow">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="link-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="link-title">
                <span>RESOURCES</span>
                <span className="title-underline"></span>
              </h4>
              <ul>
                {[
                  { name: "Resume", href: "#resume" },
                  { name: "Case Studies", href: "#cases" },
                  { name: "Testimonials", href: "#testimonials" },
                  { name: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.href} className="holographic-link">
                      <span className="link-number">0{index + 5}</span>
                      <span className="link-text">{link.name}</span>
                      <span className="link-arrow">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social links section */}
          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="link-title">
              <span>NETWORK CONNECTION</span>
              <span className="title-underline"></span>
            </h4>

            <div className="social-grid">
              <SocialLinks />
            </div>

            <div className="connection-status">
              <div className="pulse-dot"></div>
              <div className="data-transfer">
                <div className="data-packet"></div>
                <div className="data-packet"></div>
                <div className="data-packet"></div>
              </div>
              <span>DATA TRANSFER ACTIVE</span>
            </div>

            <div className="encryption-status">
              <FaSatelliteDish className="encryption-icon" />
              <span>ENCRYPTION: AES-256</span>
            </div>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="copyright-beam">
            <div className="copyright-text">
              &copy; {new Date().getFullYear()} BRANDON KIMATHI. ALL SYSTEMS
              OPERATIONAL.
            </div>
            <div className="system-status">
              <div className="status-dot"></div>
              <span>STATUS: NOMINAL</span>
            </div>
          </div>

          <div className="tech-stack">
            <span className="powered-by">POWERED BY:</span>
            <div className="tech-icons">
              <FaReact className="tech-icon" title="React" />
              <SiTypescript className="tech-icon" title="TypeScript" />
              <SiNextdotjs className="tech-icon" title="Next.js" />
              <SiTailwindcss className="tech-icon" title="Tailwind CSS" />
              <SiGraphql className="tech-icon" title="GraphQL" />
              <FaNodeJs className="tech-icon" title="Node.js" />
              <FaServer className="tech-icon" title="Server" />
              <FaDatabase className="tech-icon" title="Database" />
              <SiJest className="tech-icon" title="Jest" />
              <SiVite className="tech-icon" title="Vite" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
