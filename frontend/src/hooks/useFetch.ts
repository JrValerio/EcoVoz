import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook customizado para realizar requisições HTTP usando Axios.
 *
 * @param url URL da requisição.
 * @param options Opções da requisição Axios (opcional).
 * @param executeImmediately Indica se a requisição deve ser feita ao montar o componente (padrão: true).
 * @returns Um objeto com os dados da resposta, estado de carregamento, erro e uma função para refazer a requisição.
 */
const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig,
  executeImmediately: boolean = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelRequest, setCancelRequest] = useState<(() => void) | null>(null); // Estado para armazenar a função de cancelamento

  /**
   * Função para buscar os dados da API.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get<T>(url, { ...options, signal });
      setData(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || 'Erro desconhecido na requisição.');
      } else {
        setError('Ocorreu um erro ao buscar os dados.');
      }
    } finally {
      setLoading(false);
    }

    // Armazena a função de cancelamento no estado
    setCancelRequest(() => () => controller.abort()); 
  }, [url, options]);

  // Executa a requisição ao montar o componente, se executeImmediately for true
  useEffect(() => {
    if (executeImmediately) {
      fetchData();
    }
  }, [fetchData, executeImmediately]);

  // Limpa a requisição ao desmontar o componente
  useEffect(() => {
    return () => {
      if (cancelRequest) {
        cancelRequest();
      }
    };
  }, [cancelRequest]);

  // Retorna os dados, o estado de carregamento, o erro e a função para refazer a requisição
  return { data, loading, error, refetch: fetchData };
};

export default useFetch;