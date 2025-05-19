const portfolioService = require("../services/portfolioService");

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await portfolioService.getAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await portfolioService.getAllTestimonials();
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await portfolioService.getAllSkills();
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

exports.getResume = async (req, res, next) => {
  try {
    const resume = await portfolioService.getResume();
    res.json(resume);
  } catch (err) {
    next(err);
  }
};
