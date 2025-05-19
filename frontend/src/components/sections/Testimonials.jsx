import { useState, useEffect } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import TestimonialCard from "../ui/TestimonialCard";
import { fetchTestimonials } from "../../api/portfolioService";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import "../../styles/Testimonials.css";

// Demo testimonials data matching your projects
const DEMO_TESTIMONIALS = [
  {
    id: 1,
    name: "CTO",
    position: "E-commerce Platform (FIKAH.co.ke)",
    text: "The developer delivered an exceptional e-commerce solution that increased our conversion rate by 35%. Their attention to payment gateway integration specific to the Kenyan market was particularly impressive.",
    rating: 5,
    imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  {
    id: 2,
    name: "Product Manager",
    position: "Event Management System",
    text: "Working with this developer on our event platform was a game-changer. They implemented complex ticket management features with flawless execution, even under tight deadlines.",
    rating: 4,
    imageUrl: "https://randomuser.me/api/portraits/lego/2.jpg",
  },
  {
    id: 3,
    name: "Lead Developer",
    position: "Educational Platform (Kodees.co.ke)",
    text: "Their work on our learning management system was outstanding. The interactive coding environment they built has received overwhelmingly positive feedback from our students.",
    rating: 5,
    imageUrl: "https://randomuser.me/api/portraits/lego/3.jpg",
  },
  {
    id: 4,
    name: "DevOps Engineer",
    position: "M-Pesa Integration Project",
    text: "The payment callback handler system they architected has processed over 50,000 transactions without a single failure. Their understanding of financial systems is remarkable.",
    rating: 5,
    imageUrl: "https://randomuser.me/api/portraits/lego/4.jpg",
  },
  {
    id: 5,
    name: "UI/UX Designer",
    position: "WAECON Consulting Portal",
    text: "Collaborating on the consulting platform was a pleasure. They implemented our complex design system perfectly while suggesting technical improvements we hadn't considered.",
    rating: 4,
    imageUrl: "https://randomuser.me/api/portraits/lego/5.jpg",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        // First try to fetch from backend
        const data = await fetchTestimonials();

        // If we get valid data from backend, use it
        if (data && data.length > 0) {
          setTestimonials(data);
          trackEvent("testimonials_loaded", { source: "backend" });
        }
        // If no data from backend, use demo data
        else {
          setTestimonials(DEMO_TESTIMONIALS);
          trackEvent("testimonials_loaded", { source: "demo" });
        }
      } catch (err) {
        console.error("Failed to fetch testimonials, using demo data:", err);
        setTestimonials(DEMO_TESTIMONIALS);
        trackEvent("testimonials_loaded", {
          source: "demo",
          error: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, [trackEvent]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    trackEvent("testimonial_navigate", { direction: "next" });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    trackEvent("testimonial_navigate", { direction: "prev" });
  };

  if (loading) return <div className="loading">Loading testimonials...</div>;
  if (error)
    return <div className="error">Error loading testimonials: {error}</div>;

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        <h2 className="section-title">
          <span className="title-accent">//</span> Client Feedback
        </h2>

        <div className="testimonials-carousel">
          <button
            className="carousel-control prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="testimonials-slider">
            {testimonials.length > 0 && (
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            )}
          </div>

          <button
            className="carousel-control next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(index);
                trackEvent("testimonial_dot_click", { index });
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
