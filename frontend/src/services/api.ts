import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, CancelTokenSource } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// Centraliza mensagens de erro
const errorMessages = {
  401: 'Token inválido ou expirado. Redirecionando para login.',
  403: 'Acesso negado. Você não tem permissão para esta ação.',
  408: 'Tempo limite da requisição excedido.',
  500: 'Erro interno do servidor.',
  default: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
};

// Função para adicionar o token de autenticação ao cabeçalho
const addAuthToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Função para realizar retry da requisição
const retryRequest = async (config: AxiosRequestConfig, retries = 3): Promise<any> => {
  try {
    return await api(addAuthToken(config));
  } catch (error: any) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.message.includes('Network Error'))) {
      console.warn(`Tentativa ${4 - retries} de ${3} falhou. Tentando novamente em 2 segundos...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

// Função para tratar erros da API
const handleApiResponseError = (error: any) => {
  const status = error.response?.status;
  const message = (error.response?.data as { message?: string })?.message || (errorMessages as { [key: number]: string })[status] || errorMessages.default;

  if (error.code === 'ECONNABORTED') {
    console.error('A requisição excedeu o tempo limite.');
    return Promise.reject({ status: 408, message: errorMessages[408] });
  }

  console.error('Erro na resposta da API:', error);

  if (status === 401) {
    console.warn(errorMessages[401]);
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  } else if (status === 403) {
    console.warn(errorMessages[403]);
  } else if (status && status >= 400 && status < 500) {
    console.warn(`Erro de cliente (${status}): ${message}`);
  } else if (!status || status >= 500) {
    console.error(errorMessages[500]);
  }

  return Promise.reject({ status, message });
};

// Função para realizar requisições GET com loading, retry e cancelamento
export const get = async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    ...options,
    method: 'GET',
    url,
    cancelToken: source.token,
  };

  try {
    // Exibir loading aqui (ex: setIsLoading(true))
    const response = await retryRequest(config);
    // Esconder loading aqui (ex: setIsLoading(false))
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  } finally {
    // Esconder loading aqui (ex: setIsLoading(false))
  }
};

// Função para realizar requisições POST com loading, retry e cancelamento
export const post = async <T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    ...options,
    method: 'POST',
    url,
    data,
    cancelToken: source.token,
  };

  try {
    // Exibir loading aqui (ex: setIsLoading(true))
    const response = await retryRequest(config);
    // Esconder loading aqui (ex: setIsLoading(false))
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  } finally {
    // Esconder loading aqui (ex: setIsLoading(false))
  }
};

// ... outras funções para PUT, DELETE, etc.

export default api;