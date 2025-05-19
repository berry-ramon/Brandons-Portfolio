import { motion } from "framer-motion";

const SkillCategory = ({ title, skills, onSkillClick }) => {
  return (
    <motion.div
      className="skill-category"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <h3 className="skill-category-title">{title}</h3>
      <ul className="skill-list">
        {skills.map((skill) => (
          <motion.li
            key={skill.name}
            onClick={() => onSkillClick(skill.name)}
            style={{ "--skill-color": skill.color }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="skill-icon" style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <div className="skill-content">
              <span>{skill.name}</span>
              <div className="skill-level">
                <div
                  className="level-bar"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                  }}
                />
              </div>
              <span className="level-percent">{skill.level}%</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCategory;
