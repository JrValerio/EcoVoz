import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig,
  executeImmediately: boolean = true // Controla se a requisição será feita automaticamente
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController(); // Suporte ao cancelamento
    const signal = controller.signal;

    try {
      const response = await axios.get<T>(url, { ...options, signal });
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || 'Erro desconhecido');
      } else {
        setError('Ocorreu um erro ao buscar os dados.');
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort(); // Cancela requisições em andamento
    };
  }, [url, options]);

  // Executa a requisição ao montar, se permitido
  useEffect(() => {
    if (executeImmediately) {
      fetchData();
    }
  }, [fetchData, executeImmediately]);

  return { data, loading, error, refetch: fetchData }; // Retorna o método refetch para chamadas manuais
};

export default useFetch;
