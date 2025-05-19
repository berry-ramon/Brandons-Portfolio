const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio/testimonials`);
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return response.json();
};

export const fetchSkills = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio/skills`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return response.json();
};

export const fetchResume = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio/resume`);
  if (!response.ok) {
    throw new Error("Failed to fetch resume");
  }
  return response.json();
};

export const submitContactForm = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit contact form");
  }

  return response.json();
};
