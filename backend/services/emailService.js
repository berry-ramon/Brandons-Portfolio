const nodemailer = require("nodemailer");
const config = require("../config");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

exports.sendContactEmail = async (contactData) => {
  try {
    // Email to admin
    await transporter.sendMail({
      from: `"Portfolio Contact" <${config.email.user}>`,
      to: config.email.adminEmail,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"Brandon Kimathi" <${config.email.user}>`,
      to: contactData.email,
      subject: "Thank you for contacting me",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${contactData.name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <blockquote>${contactData.message}</blockquote>
        <p>Best regards,</p>
        <p>Brandon Kimathi</p>
      `,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email notification");
  }
};
