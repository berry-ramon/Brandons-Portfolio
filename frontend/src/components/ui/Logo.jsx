import { useTheme } from "../../context/ThemeContext";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className={`logo ${theme}`}>
      <img
        src="/noBgColor.png"
        alt="Brandon Kimathi Logo"
        className="logo-img"
      />
    </div>
  );
};

export default Logo;
