import { FaEye, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ProjectCard = ({ project, onClick, isSelected }) => {
  return (
    <div
      className={`project-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(project)}
    >
      {isSelected && (
        <div className="selection-indicator">
          <IoMdCheckmarkCircleOutline className="indicator-icon" />
          <span>Selected</span>
        </div>
      )}
      <div className="project-image-container">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="project-thumbnail"
        />
        <div className="project-hover-overlay">
          <div className="hover-content">
            <FaEye className="hover-icon" />
            <span>View Project</span>
          </div>
        </div>
      </div>
      <div className="project-card-info">
        <h3>{project.title}</h3>
        <p className="project-card-description">
          {project.shortDescription ||
            project.description.substring(0, 100) + "..."}
        </p>
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
