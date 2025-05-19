export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.message) {
    errors.message = "Message is required";
  } else if (values.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};
