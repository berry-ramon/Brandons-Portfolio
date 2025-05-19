import { useState, useEffect } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import { fetchResume } from "../../api/portfolioService";
import { FaDownload, FaFilePdf, FaSpinner, FaRobot } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/Resume.css";

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { trackEvent } = useAnalytics();

  // Local placeholder image data URL
  const placeholderImage = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1035' viewBox='0 0 800 1035'><rect width='100%' height='100%' fill='%231a1a2e'/><text x='50%' y='50%' fill='white' font-family='Arial' font-size='24' text-anchor='middle'>CV Coming Soon</text></svg>`;

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = await fetchResume();
        setResume(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch resume, using placeholder:", err);
        setResume({
          imageUrl: placeholderImage,
          downloadUrl: null,
          status: "pending",
        });
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  const handleDownload = () => {
    if (!resume?.downloadUrl) return;

    setDownloading(true);
    trackEvent("resume_download_attempt");

    // Simulate download delay
    setTimeout(() => {
      window.open(resume.downloadUrl, "_blank");
      setDownloading(false);
      setDownloaded(true);
      trackEvent("resume_download_success");

      // Reset download state after 3 seconds
      setTimeout(() => setDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <section id="resume" className="resume-section">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="title-accent">//</span> Digital Curriculum
        </motion.h2>

        <div className="resume-container">
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="resume-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-animation">
                  <FaRobot className="ai-icon" />
                  <div className="loading-bar">
                    <div className="loading-progress"></div>
                  </div>
                  <p>Generating interactive CV...</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                className="resume-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="error-message">
                  <p>CV generation failed. Emergency backup activated.</p>
                  <p>Basic version available below.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="resume-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="resume-header">
                  <h3>Professional Dossier</h3>
                  <p className="resume-subtitle">
                    {resume.downloadUrl
                      ? "Full credentials available for immediate access"
                      : "Enhanced CV currently in development"}
                  </p>
                </div>

                <div className="resume-preview-container">
                  <div className="resume-preview">
                    <img
                      src={resume.imageUrl || placeholderImage}
                      alt="Resume Preview"
                      className="resume-image"
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                    />
                    <div className="preview-overlay">
                      {!resume.downloadUrl && (
                        <div className="coming-soon-badge">
                          <FaRobot />
                          <span>AI-Enhanced Version Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="resume-actions">
                  <motion.button
                    className={`download-btn ${!resume.downloadUrl ? "disabled" : ""}`}
                    onClick={handleDownload}
                    disabled={!resume.downloadUrl || downloading || downloaded}
                    whileHover={resume.downloadUrl ? { y: -2 } : {}}
                    whileTap={resume.downloadUrl ? { scale: 0.98 } : {}}
                  >
                    {downloading ? (
                      <>
                        <FaSpinner className="spin" />
                        <span>Preparing Download...</span>
                      </>
                    ) : downloaded ? (
                      <>
                        <IoMdCheckmarkCircleOutline />
                        <span>Download Complete!</span>
                      </>
                    ) : (
                      <>
                        <FaDownload />
                        <span>
                          {resume.downloadUrl
                            ? "Download Full Dossier"
                            : "Dossier Pending"}
                        </span>
                      </>
                    )}
                  </motion.button>

                  {!resume.downloadUrl && (
                    <div className="availability-notice">
                      <FaFilePdf />
                      <p>
                        Next-generation CV currently being enhanced with AI
                        analysis
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Resume;
