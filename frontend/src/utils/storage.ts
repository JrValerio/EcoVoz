// Salva um item no localStorage
export const saveToLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Recupera um item do localStorage
export const getFromLocalStorage = (key: string): unknown | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Remove um item do localStorage
export const removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
