import { useState } from 'react';

/**
 * Hook customizado para gerenciar o estado do localStorage com o estado do React.
 *
 * @param key A chave para armazenar no localStorage.
 * @param initialValue O valor inicial para a chave.
 * @returns Uma tupla com o valor armazenado, uma função para atualizá-lo e uma função para removê-lo.
 */
const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Inicializa o estado com o valor do localStorage ou com o valor inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Verifica se o código está sendo executado em um ambiente de navegador
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return initialValue;
    }

    try {
      // Tenta obter o item do localStorage
      const item = localStorage.getItem(key);
      // Se o item existir, retorna o valor parseado; caso contrário, retorna o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, exibe um log de erro e retorna o valor inicial
      console.error('Erro ao acessar o localStorage:', error);
      return initialValue;
    }
  });

  /**
   * Define o valor no localStorage e atualiza o estado.
   * @param value O novo valor a ser definido.
   */
  const setValue = (value: T) => {
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return;
    }

    try {
      // Define o valor no localStorage
      localStorage.setItem(key, JSON.stringify(value));
      // Atualiza o estado com o novo valor
      setStoredValue(value);
    } catch (error) {
      console.error('Erro ao definir o valor no localStorage:', error);
    }
  };

  /**
   * Remove o valor do localStorage e atualiza o estado com o valor inicial.
   */
  const removeValue = () => {
    if (typeof window === 'undefined') {
      console.warn('localStorage não está disponível em ambientes fora do navegador.');
      return;
    }

    try {
      // Remove o valor do localStorage
      localStorage.removeItem(key);
      // Atualiza o estado com o valor inicial
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Erro ao remover o valor do localStorage:', error);
    }
  };

  // Retorna o valor armazenado, a função para definir o valor e a função para remover o valor
  return [storedValue, setValue, removeValue] as const;
};

export default useLocalStorage;