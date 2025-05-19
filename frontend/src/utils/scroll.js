export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const handleAnchorClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute("href").slice(1);
  scrollToSection(targetId);
};
