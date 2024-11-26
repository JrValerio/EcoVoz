import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { getAuthHeader } from '../utils/auth';
import { API_URL } from "../config";

/**
 * Cria uma instância do Axios com configurações padrão para a aplicação.
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://ecovoz-d2hi.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

/**
 * Intercepta as requisições para incluir o token de autenticação no cabeçalho.
 */
api.interceptors.request.use((config) => {
  config.headers = Object.assign({}, axios.defaults.headers.common, config.headers, getAuthHeader());
  return config;
});

// Mensagens de erro centralizadas
const errorMessages = {
  401: 'Token inválido ou expirado. Redirecionando para login.',
  403: 'Acesso negado. Você não tem permissão para esta ação.',
  408: 'Tempo limite da requisição excedido.',
  500: 'Erro interno do servidor.',
  default: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
};


/**
 * Tenta realizar a requisição novamente em caso de falha, 
 * com um número máximo de tentativas.
 * @param config A configuração da requisição.
 * @param retries O número de tentativas restantes.
 * @returns A resposta da requisição, se bem-sucedida.
 */
const retryRequest = async (config: AxiosRequestConfig, retries = 3): Promise<any> => {
  try {
    return await api(config); // Removeu a chamada addAuthToken(config)
  } catch (error: any) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.message.includes('Network Error'))) {
      console.warn(`Tentativa ${4 - retries} de ${3} falhou. Tentando novamente em 2 segundos...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

/**
 * Trata erros da API, exibindo mensagens de erro apropriadas e 
 * realizando ações como redirecionamento em caso de erro de autenticação.
 * @param error O erro da API.
 * @returns Uma Promise rejeitada com a mensagem de erro.
 */
const handleApiResponseError = (error: any) => {
  const status = error.response?.status;
  const message = (error.response?.data as { message?: string })?.message 
    || (errorMessages as { [key: number]: string })[status] 
    || errorMessages.default;

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

/**
 * Realiza uma requisição GET com suporte a loading, retry e cancelamento.
 * @param url A URL da requisição.
 * @param options Opções da requisição Axios.
 * @returns Uma Promise que resolve com os dados da resposta ou rejeita com um erro.
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

/**
 * Realiza uma requisição POST com suporte a loading, retry e cancelamento.
 * @param url A URL da requisição.
 * @param data Os dados a serem enviados na requisição.
 * @param options Opções da requisição Axios.
 * @returns Uma Promise que resolve com os dados da resposta ou rejeita com um erro.
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

const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/endpoint`);
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

// ... outras funções para PUT, DELETE, etc.

export default api;