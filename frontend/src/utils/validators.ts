/**
 * Valida o formato de um endereço de email.
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Verifica se um campo não está vazio após remover espaços em branco.
 */
export const isNotEmpty = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.trim().length > 0;
};

/**
 * Verifica se uma senha tem pelo menos 8 caracteres.
 */
export const isPasswordStrong = (password: string): boolean => {
  if (typeof password !== 'string') {
    return false;
  }
  return password.length >= 8;
};