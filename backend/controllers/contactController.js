const contactService = require("../services/contactService");
const { validateContactForm } = require("../middlewares/validation");

exports.submitContactForm = async (req, res, next) => {
  try {
    // Validate form data
    const { error } = validateContactForm(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, phone, message } = req.body;

    // Save to database
    const contact = await contactService.saveContact({
      name,
      email,
      phone,
      message,
    });

    // Send email notification
    await contactService.sendContactEmail(contact);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
