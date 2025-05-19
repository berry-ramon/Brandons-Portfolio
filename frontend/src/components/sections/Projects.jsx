import { useState, useEffect } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../../styles/Projects.css";

const projectsData = [
  {
    id: "fikah",
    title: "FIKAH",
    description:
      "E-commerce platform for FIKAH featuring product listings, cart functionality, and secure checkout. Built with Next.js and integrated with payment gateways for Kenyan market.",
    imageUrl:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/fikah-ecommerce",
    liveUrl: "https://fikah.co.ke",
    tags: ["Next.js", "E-commerce", "Payment Gateway", "Kenyan Market"],
    featured: true,
    unsplashCredit: "Photo by fauxels",
  },
  {
    id: "event-platform",
    title: "EventBuzz",
    description:
      "Comprehensive event management system with ticket sales, attendee tracking, and organizer tools. Supports multiple event types with custom registration flows.",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/event-management",
    liveUrl: "https://event-management-platform-ten.vercel.app",
    tags: ["React", "Node.js", "MongoDB", "Ticketing"],
    featured: true,
    unsplashCredit: "Photo by Austin Distel",
  },
  {
    id: "KODÈS",
    title: "KODÈS",
    description:
      "Educational platform offering coding courses and resources with interactive learning modules, progress tracking, and certification.",
    imageUrl:
      "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/kodees-platform",
    liveUrl: "https://kodees.co.ke",
    tags: ["MERN Stack", "Education", "E-learning", "Interactive"],
    featured: false,
    unsplashCredit: "Photo by Compare Fibre",
  },
  {
    id: "exam-portal",
    title: "KODÈS Exam-Portal",
    description:
      "Secure online examination platform with proctoring features, automatic grading, and result analytics for educational institutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/online-exam-system",
    liveUrl: "https://exams.kodees.co.ke",
    tags: ["React", "Node.js", "Exam Proctoring", "Education"],
    featured: false,
    unsplashCredit: "Photo by ThisisEngineering",
  },
  {
    id: "mpesa-callback",
    title: "M-Pesa Callback Handler",
    description:
      "Robust payment processing system handling M-Pesa transactions with webhook integration, transaction verification, and reconciliation features.",
    imageUrl:
      "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80",
    githubUrl: "https://github.com/yourusername/mpesa-callback",
    liveUrl:
      "https://m-pesa-callback-swnx-6afqdle0r-berry-ramons-projects.vercel.app",
    tags: ["Node.js", "M-Pesa API", "Payment Processing", "Kenyan Tech"],
    featured: false,
    unsplashCredit: "Photo by Tech Daily",
  },

  {
    id: "mobile-app-kotlin",
    title: "Task Management App (Kotlin)",
    description:
      "Android task management application with offline capabilities, cloud sync, and productivity analytics built with Kotlin and Jetpack Compose.",
    imageUrl:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&id=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/task-manager-android",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.yourdomain.taskmanager",
    tags: ["Kotlin", "Android", "Jetpack Compose", "Mobile"],
    featured: true,
    unsplashCredit: "Photo by Bram Naus",
  },

  {
    id: "Neema-Hidaya",
    title: "Neema Hidaya Media & Publishing",
    description:
      "Complete bookshop management system with inventory tracking, online ordering, and digital publishing platform for authors and content creators.",
    imageUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/neemahidaya-bookshop",
    liveUrl: "https://neemahidaya.com",
    tags: ["Inventory Management", "E-commerce", "Publishing", "CMS"],
    featured: true,
    unsplashCredit: "Photo by Annie Spratt",
  },
  {
    id: "waecon",
    title: "WAECON Supermarket Chain",
    description:
      "Omnichannel retail management system for supermarket chain with inventory control, POS integration, and customer loyalty programs.",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/waecon-supermarket",
    liveUrl: "https://waecon.com",
    tags: ["Retail Tech", "POS System", "Inventory", "Omnichannel"],
    featured: true,
    unsplashCredit: "Photo by Karolina Grabowska",
  },
  {
    id: "nexus-hotel",
    title: "Nexus Horizon Hotel System",
    description:
      "Comprehensive hotel management platform with integrated POS, QR code room keys, housekeeping automation, and guest experience management.",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/nexus-hotel-system",
    liveUrl: "https://nexushorizon.com",
    tags: ["Hospitality Tech", "QR Integration", "POS System", "Automation"],
    featured: true,
    unsplashCredit: "Photo by Avi Richards",
  },
  {
    id: "quantum-shield",
    title: "Quantum Shield Insurance Platform",
    description:
      "Unified insurance management system with policy administration, claims processing, risk assessment, and customer portal across all insurance products.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/quantum-shield",
    liveUrl: "https://quantumshield.com",
    tags: ["Insurance Tech", "Unified Platform", "Risk Analysis", "FinTech"],
    featured: true,
    unsplashCredit: "Photo by Pepi Stojanovski",
  },
  {
    id: "pulse-digital",
    title: "Pulse Digital Marketing Suite",
    description:
      "End-to-end digital marketing platform with campaign management, analytics, automation, and AI-powered optimization tools for marketing teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/pulse-digital",
    liveUrl: "https://pulsedigital.agency",
    tags: ["Marketing Tech", "AI Automation", "Analytics", "Campaigns"],
    featured: false,
    unsplashCredit: "Photo by Campaign Creators",
  },
  {
    id: "titan-fitness",
    title: "Titan Fitness Management",
    description:
      "Complete gym management system with member tracking, class scheduling, payment processing, and wearable device integration for fitness analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    githubUrl: "https://github.com/yourusername/titan-fitness",
    liveUrl: "https://titanfitness.app",
    tags: ["Fitness Tech", "Member Management", "Wearable Integration", "SaaS"],
    featured: false,
    unsplashCredit: "Photo by Victor Freitas",
  },
];
const ProjectCard = ({ project, onClick, isSelected }) => {
  return (
    <motion.div
      className={`project-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(project)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
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
            <span>View Details</span>
          </div>
        </div>
      </div>
      <div className="project-card-info">
        <h3>{project.title}</h3>
        <p className="project-card-description">
          {project.shortDescription ||
            project.description.substring(0, 80) + "..."}
        </p>
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="modal-backdrop" onClick={onClose} />

      <motion.div
        className="modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-image-container">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="modal-image"
          />
          <div className="image-credit">{project.unsplashCredit}</div>
        </div>

        <div className="modal-body">
          <h2>{project.title}</h2>

          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
              >
                <FaGithub className="link-icon" />
                <span>View Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link primary"
              >
                <FaExternalLinkAlt className="link-icon" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProjects(projectsData);
      setLoading(false);
    }, 800);
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    trackEvent("project_view", {
      projectId: project.id,
      projectTitle: project.title,
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="holographic-spinner"></div>
        <p className="loading-text">Initializing Project Matrix...</p>
      </div>
    );

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="title-accent neon-text">//</span>Project Archive
        </motion.h2>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
              isSelected={selectedProject?.id === project.id}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
