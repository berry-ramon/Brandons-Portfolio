import { motion } from "motion/react";
import { useState } from "react";
import SEO from "../components/SEO";
import NeuCard from "../components/NeuCard";
import Button from "../components/Button";
import { EngagementFilter } from "../components/Contact/EngagementFilter";
import { DirectContact } from "../components/Contact/DirectContact";
import { MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const buildWhatsAppMessage = () => {
    const message = `*New Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Project Context:*\n${formData.message}`;
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const whatsappMessage = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/254700000000?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Brandon Kimathi",
    description:
      "Get in touch for system architecture, technical leadership, or structured conversations about software development.",
    url: "https://brandonkimathi.com/contact",
    mainEntity: {
      "@type": "Person",
      name: "Brandon Kimathi",
      email: "hello@brandonkimathi.com",
      jobTitle: "Software Architecture Lead",
      worksFor: {
        "@type": "Organization",
        name: "KODÈS",
      },
    },
  };

  return (
    <>
      <SEO
        title="Contact | Brandon Kimathi — Software Architecture & System Design"
        description="Reach out for system architecture, technical leadership, or structured conversations about software development. I work with founders and teams building products that require structure."
        canonical="https://brandonkimathi.com/contact"
        ogTitle="Contact Brandon Kimathi"
        ogDescription="Start a conversation about system architecture and software development."
        structuredData={structuredData}
      />

      <div className="w-full min-h-screen bg-background relative overflow-hidden">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(217, 119, 6, 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <motion.span
              className="block text-xs uppercase tracking-[0.3em] text-accent/50 mb-3 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Start a Conversation
            </motion.span>

            <h1 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
              Serious systems deserve{" "}
              <span className="text-accent">serious thinking</span>.
            </h1>

            <p className="text-base opacity-70 max-w-2xl leading-relaxed">
              I collaborate with founders and teams building products that
              require structure, not shortcuts.
            </p>
          </motion.div>

          {/* Engagement Filter */}
          <EngagementFilter />

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <NeuCard className="relative overflow-hidden">
              <div className="absolute inset-0 shadow-neumorph-inset pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Name Field */}
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="name"
                    className="block mb-1 text-xs font-mono text-foreground/60"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background rounded-xl focus:outline-none 
                             transition-all duration-300 border-0 text-sm
                             focus:shadow-neumorph-focus disabled:opacity-50"
                    style={{
                      boxShadow:
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = "var(--neu-shadow-focus)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow =
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)";
                    }}
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="email"
                    className="block mb-1 text-xs font-mono text-foreground/60"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-background rounded-xl focus:outline-none 
                             transition-all duration-300 border-0 text-sm
                             focus:shadow-neumorph-focus disabled:opacity-50"
                    style={{
                      boxShadow:
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = "var(--neu-shadow-focus)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow =
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)";
                    }}
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="message"
                    className="block mb-1 text-xs font-mono text-foreground/60"
                  >
                    Project Context
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full px-4 py-3 bg-background rounded-xl focus:outline-none 
                             transition-all duration-300 border-0 text-sm resize-none
                             focus:shadow-neumorph-focus disabled:opacity-50"
                    style={{
                      boxShadow:
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)",
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = "var(--neu-shadow-focus)";
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow =
                        "var(--neu-shadow-inset-light), var(--neu-shadow-inset-dark)";
                    }}
                    placeholder="Brief description of what you're building..."
                  />
                </motion.div>

                <motion.div
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-2"
                >
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-xs font-mono text-foreground/40">
                      Message will be sent via WhatsApp
                    </p>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto min-w-[200px] relative overflow-hidden group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Opening WhatsApp...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Start Conversation
                          <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </form>
            </NeuCard>
          </motion.div>

          {/* Direct Contact Alternatives */}
          <DirectContact />

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-foreground/30 mt-8 font-mono"
          >
            I work best where structure matters.
          </motion.p>
        </div>
      </div>
    </>
  );
}
