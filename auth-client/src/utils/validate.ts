export const checkPasswordErrors = (password: string) => {
  // Minimum length of 8 characters
  const minLength = 8;

  // Regular expressions to check for at least 1 letter, 1 number, and 1 special character
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Check the minimum length
  if (password.length < minLength) {
    return "• Minimum length of password 8 characters";
  }

  // Check for at least 1 letter
  if (!letterRegex.test(password)) {
    return "• password must Contains at least 1 letter";
  }

  // Check for at least 1 number
  if (!numberRegex.test(password)) {
    return "• password must Contains at least 1 number";
  }

  // Check for at least 1 special character
  if (!specialCharRegex.test(password)) {
    return "• password must Contains at least 1 special character";
  }

  // If all criteria are met, the password is valid
  return null;
};
