import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
// import "./SocialLinks.css";

const SocialLinks = () => {
  const socialPlatforms = [
    {
      name: "LinkedIn",
      url: "http://www.linkedin.com/in/brandon-kimathi-9542a8301",
      icon: <FaLinkedin />,
      color: "#0A66C2",
    },
    {
      name: "GitHub",
      url: "http://github.com/berry-ramon",
      icon: <FaGithub />,
      color: "#333",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/Tech_Nomad5",
      icon: <FaTwitter />,
      color: "#1DA1F2",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/0758170917",
      icon: <FaWhatsapp />,
      color: "#25D366",
    },
  ];

  return (
    <div className="social-links">
      {socialPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.name}
          className="social-link"
          style={{ "--icon-color": platform.color }}
        >
          {platform.icon}
          <span className="social-tooltip">{platform.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
