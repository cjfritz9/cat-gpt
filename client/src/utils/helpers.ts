export const validateLoginInputs = (email: string, password: string) => {
  if (!email.includes('@') || !email.includes('.')) {
    return 'Invalid email, try again';
  }
  if (password.length < 7) {
    return 'Password must be 8+ characters';
  }
  if (password.length > 255) {
    return 'Password must be less than 255 characters';
  }
  return 'valid inputs';
};

export const validateRegistrationInputs = (
  email: string,
  password: string,
  confirmPass: string
) => {
  const validationResponse = validateLoginInputs(email, password);

  if (validationResponse !== 'valid inputs') return validationResponse;
  if (password !== confirmPass) {
    return 'Passwords must match';
  }
  return 'valid inputs';
};
