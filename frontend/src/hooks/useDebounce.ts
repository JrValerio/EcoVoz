import { useState, useEffect } from 'react';

/**
 * Hook que implementa a técnica de debounce para um valor.
 * 
 * @param value O valor a ser "debounced".
 * @param delay O tempo de espera em milissegundos antes de atualizar o valor "debounced".
 * @returns O valor "debounced".
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configura um timeout que atualiza o estado após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timeout quando o componente é desmontado ou quando o valor ou delay mudam
    return () => clearTimeout(handler); 
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;