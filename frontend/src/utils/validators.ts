// Valida email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Valida se o campo não está vazio
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isPasswordStrong = (password: string): boolean => {
  return password.length >= 8;
};
