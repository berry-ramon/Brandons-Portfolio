import { useState } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import { submitContactForm } from "../../api/portfolioService";
import SocialLinks from "../ui/SocialLinks";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import "../../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const { trackEvent } = useAnalytics();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.message.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent("contact_form_submit_attempt");

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        trackEvent("contact_form_submit_success");
      } else {
        throw new Error(response.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error.message || "Failed to send message. Please try again later.",
      });
      trackEvent("contact_form_submit_failure", { error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="title-accent">//</span> Get In Touch
        </h2>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p className="contact-subtext">
              Have a project in mind or want to discuss opportunities? Reach out
              and I'll get back to you within 24 hours.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:brandon@example.com">brandon@example.com</a>
                </div>
              </div>

              <div className="contact-method">
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </div>
              </div>

              <div className="contact-method">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Location</h4>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h4>Follow Me</h4>
              <SocialLinks />
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              {submitStatus && (
                <div
                  className={`form-status ${submitStatus.success ? "success" : "error"}`}
                >
                  {submitStatus.success ? (
                    <FaCheckCircle className="status-icon" />
                  ) : (
                    <FaExclamationCircle className="status-icon" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={
                    touched.name && !formData.name.trim() ? "error" : ""
                  }
                />
                {touched.name && !formData.name.trim() && (
                  <span className="error-message">Name is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className={
                    touched.email && !validateEmail(formData.email)
                      ? "error"
                      : ""
                  }
                />
                {touched.email && !validateEmail(formData.email) && (
                  <span className="error-message">Valid email is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                  className={
                    touched.message && !formData.message.trim() ? "error" : ""
                  }
                ></textarea>
                {touched.message && !formData.message.trim() && (
                  <span className="error-message">Message is required</span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting || !validateForm()}
                >
                  {submitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="send-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
