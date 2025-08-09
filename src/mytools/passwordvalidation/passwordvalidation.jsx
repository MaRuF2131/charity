const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
export default validatePassword;