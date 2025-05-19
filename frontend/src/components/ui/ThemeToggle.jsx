import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi"; // Importing from Feather icons
import { FaMoon, FaSun } from "react-icons/fa"; // Alternative from Font Awesome

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className={`theme-toggle ${animate ? "animate" : ""}`}
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FiMoon size={18} /> // Feather icon
      ) : (
        // or <FaMoon size={18} /> for Font Awesome
        <FiSun size={18} /> // Feather icon
        // or <FaSun size={18} /> for Font Awesome
      )}
    </button>
  );
};

export default ThemeToggle;
