/**
 * Salva um item no localStorage.
 */
export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[ERROR] Erro ao salvar item '${key}' no localStorage:`, error);
  }
};

/**
 * Recupera um item do localStorage.
 */
export const getFromLocalStorage = (key: string): unknown | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`[ERROR] Erro ao recuperar item '${key}' do localStorage:`, error);
    return null;
  }
};

/**
 * Remove um item do localStorage.
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[ERROR] Erro ao remover item '${key}' do localStorage:`, error);
  }
};