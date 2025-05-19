import { useAnalytics } from "../../context/AnalyticsContext";
import SkillCategory from "../ui/SkillCategory";
import "../../styles/Skills.css";

// Correct React Icons Imports
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaNpm,
  FaFigma,
  FaDocker,
  FaSass,
  FaUsers,
  FaLaptopCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiLinux,
} from "react-icons/si";
import {
  GiBrain,
  GiPuzzle,
  GiTrophy,
  GiTalk,
  GiTimeBomb,
} from "react-icons/gi";
import { IoLink } from "react-icons/io5";
import { VscVm } from "react-icons/vsc"; // VS Code icon alternative

const Skills = () => {
  const { trackEvent } = useAnalytics();

  const skillCategories = [
    {
      title: "Frontend Engineering",
      skills: [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", level: 95 },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", level: 90 },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", level: 88 },
        { name: "React", icon: <FaReact />, color: "#61DAFB", level: 85 },
        {
          name: "TypeScript",
          icon: <SiTypescript />,
          color: "#3178C6",
          level: 80,
        },
        { name: "SASS/SCSS", icon: <FaSass />, color: "#CC6699", level: 85 },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933", level: 82 },
        {
          name: "Express.js",
          icon: <SiExpress />,
          color: "#000000",
          level: 80,
        },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", level: 78 },
        { name: "MySQL", icon: <SiMysql />, color: "#336791", level: 75 },
        { name: "PHP", icon: <SiPhp />, color: "#777BB4", level: 70 },
        { name: "REST APIs", icon: <IoLink />, color: "#FF6B6B", level: 85 },
      ],
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: 85 },
        { name: "VS Code", icon: <VscVm />, color: "#007ACC", level: 90 },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED", level: 75 },
        { name: "Linux", icon: <SiLinux />, color: "#333333", level: 80 },
        { name: "npm/yarn", icon: <FaNpm />, color: "#CB3837", level: 85 },
        { name: "Figma", icon: <FaFigma />, color: "#F24E1E", level: 70 },
      ],
    },
    {
      title: "Professional Skills",
      skills: [
        {
          name: "Technical Architecture",
          icon: <GiBrain />,
          color: "#FFD700",
          level: 85,
        },
        {
          name: "Agile Teamwork",
          icon: <FaUsers />,
          color: "#FF6347",
          level: 90,
        },
        {
          name: "System Design",
          icon: <GiPuzzle />,
          color: "#32CD32",
          level: 80,
        },
        {
          name: "Technical Leadership",
          icon: <GiTrophy />,
          color: "#20B2AA",
          level: 85,
        },
        {
          name: "Client Communication",
          icon: <GiTalk />,
          color: "#6A5ACD",
          level: 88,
        },
        {
          name: "Project Management",
          icon: <GiTimeBomb />,
          color: "#FF8C00",
          level: 80,
        },
      ],
    },
  ];

  const handleSkillClick = (skillName) => {
    trackEvent("skill_view", { skill: skillName });
  };

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="title-accent">//</span> Technical Competencies
        </h2>

        <div className="skills-grid">
          {skillCategories.map((category) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
              onSkillClick={handleSkillClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
