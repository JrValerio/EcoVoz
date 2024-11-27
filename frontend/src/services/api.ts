import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { getAuthHeader } from '../utils/auth';
import { API_URL } from '../config';

/**
 * Configurações globais da instância Axios, incluindo URL base, headers, timeout e autenticação.
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    ...getAuthHeader(),
    'Content-Type': 'application/json',
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

/**
 * Intercepta requisições para adicionar autenticação automaticamente.
 */
api.interceptors.request.use((config) => {
  config.headers = Object.assign({}, axios.defaults.headers.common, config.headers, getAuthHeader());
  return config;
});

/**
 * Mensagens de erro mapeadas por status HTTP, com suporte a mensagens padrão.
 */
const errorMessages = {
  401: 'Token inválido ou expirado. Redirecionando para login.',
  403: 'Acesso negado. Você não tem permissão para esta ação.',
  408: 'Tempo limite da requisição excedido.',
  500: 'Erro interno do servidor.',
  default: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
};

/**
 * Tenta realizar a mesma requisição várias vezes em caso de falhas relacionadas à rede ou timeout.
 * 
 * @param config Configuração da requisição.
 * @param retries Número máximo de tentativas permitidas (padrão: 3).
 * @returns A resposta da requisição, se bem-sucedida.
 */
const retryRequest = async (config: AxiosRequestConfig, retries = 3): Promise<any> => {
  try {
    return await api(config);
  } catch (error: any) {
    const status = error.response?.status;
    const isRetryable = status === 500 || status === 503 || error.code === 'ECONNABORTED';

    if (retries > 0 && isRetryable) {
      console.warn(`Tentativa ${4 - retries} de ${3} falhou. Tentando novamente em 2 segundos...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

/**
 * Trata os erros de respostas da API, exibindo mensagens apropriadas e
 * redirecionando para login em caso de falha de autenticação.
 * 
 * @param error O erro capturado pela requisição.
 * @returns Rejeição da promessa com o status e a mensagem de erro.
 */
const handleApiResponseError = (error: any) => {
  const status = error.response?.status;
  const message =
    (error.response?.data as { message?: string })?.message ||
    (errorMessages as { [key: number]: string })[status] ||
    errorMessages.default;

  // Tratamento de timeout
  if (error.code === 'ECONNABORTED') {
    console.error('A requisição excedeu o tempo limite.');
    return Promise.reject({ status: 408, message: errorMessages[408] });
  }

  console.error('Erro na resposta da API:', error);

  // Tratamento de erros específicos
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

/**
 * Realiza uma requisição GET com suporte a tentativas, cancelamento e tratamento de erros.
 * 
 * @param url URL do endpoint.
 * @param options Opções adicionais da requisição Axios.
 * @returns Dados da resposta, se bem-sucedida.
 */
export const get = async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    ...options,
    method: 'GET',
    url,
    cancelToken: source.token,
  };

  try {
    const response = await retryRequest(config);
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  }
};

/**
 * Realiza uma requisição POST com suporte a tentativas, cancelamento e tratamento de erros.
 * 
 * @param url URL do endpoint.
 * @param data Dados enviados no corpo da requisição.
 * @param options Opções adicionais da requisição Axios.
 * @returns Dados da resposta, se bem-sucedida.
 */
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
    const response = await retryRequest(config);
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  }
};

/**
 * Realiza uma requisição PUT com suporte a tentativas, cancelamento e tratamento de erros.
 * 
 * @param url URL do endpoint.
 * @param data Dados enviados no corpo da requisição.
 * @param options Opções adicionais da requisição Axios.
 * @returns Dados da resposta, se bem-sucedida.
 */
export const put = async <T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    ...options,
    method: 'PUT',
    url,
    data,
    cancelToken: source.token,
  };

  try {
    const response = await retryRequest(config);
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  }
};

/**
 * Realiza uma requisição DELETE com suporte a tentativas, cancelamento e tratamento de erros.
 * 
 * @param url URL do endpoint.
 * @param options Opções adicionais da requisição Axios.
 * @returns Dados da resposta, se bem-sucedida.
 */
export const del = async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const config: AxiosRequestConfig = {
    ...options,
    method: 'DELETE',
    url,
    cancelToken: source.token,
  };

  try {
    const response = await retryRequest(config);
    return response as T;
  } catch (error) {
    return handleApiResponseError(error);
  }
};

export default api;
