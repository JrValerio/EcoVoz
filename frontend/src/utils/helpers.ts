/**
 * Capitaliza a primeira letra de uma string.
 */
export const capitalize = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Aguarda um determinado tempo em milissegundos.
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};