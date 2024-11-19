import { useState } from 'react';

/**
 * Custom hook for managing localStorage with React state.
 * @param key - The key to store in localStorage.
 * @param initialValue - The initial value for the key.
 * @returns A tuple with the stored value, a function to update it, and a function to remove it.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error('Erro ao definir o valor no localStorage:', error);
    }
  };

  const removeValue = () => {
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return;
    }

    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Erro ao remover o valor do localStorage:', error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

// Example usage of the useLocalStorage hook
const [username, setUsername, removeUsername] = useLocalStorage('username', '');
console.log(`Username: ${username}`);
setUsername('NovoUsuario');
removeUsername();