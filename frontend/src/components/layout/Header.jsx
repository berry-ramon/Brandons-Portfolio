import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiUser,
  FiCode,
  FiTool,
  FiAward,
  FiFileText,
  FiMail,
} from "react-icons/fi";
import "../../styles/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About Me", icon: <FiUser size={18} /> },
    { id: "projects", label: "Projects", icon: <FiCode size={18} /> },
    { id: "skills", label: "Skills", icon: <FiTool size={18} /> },
    { id: "testimonials", label: "Testimonials", icon: <FiAward size={18} /> },
    { id: "resume", label: "Resume", icon: <FiFileText size={18} /> },
    { id: "contact", label: "Contact", icon: <FiMail size={18} /> },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""} ${theme}`}>
      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
        tabIndex={mobileMenuOpen ? 0 : -1}
      />

      <div className="header-container">
        <Logo />

        <nav className={`nav-desktop ${theme}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="nav-link">
                  <span className="nav-link-icon">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle>
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </ThemeToggle>
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <nav className="nav-mobile" aria-label="Mobile navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
