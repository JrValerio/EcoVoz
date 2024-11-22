import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Cria uma instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', // Define a URL base da API
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo padrão
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000, // Define o tempo limite da requisição (10s padrão)
});

// Interceptor de requisição: Adiciona o token de autenticação ao cabeçalho
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken'); // Recupera o token do localStorage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho Authorization
    }
    return config; // Retorna a configuração da requisição
  },
  (error) => {
    console.error('Erro na configuração da requisição:', error);
    return Promise.reject(error); // Rejeita a promessa para tratar o erro
  }
);

// Interceptor de resposta: Trata erros e respostas
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log opcional para depuração de respostas bem-sucedidas
    console.debug('Resposta da API:', response);
    return response; // Retorna a resposta diretamente se estiver tudo OK
  },
  (error) => {
    // Captura o status e a mensagem do erro
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message ||
      'Ocorreu um erro inesperado. Por favor, tente novamente.';

    console.error('Erro na resposta da API:', { status, message });

    // Tratamento para erros de autenticação (401)
    if (status === 401) {
      console.warn('Token inválido ou expirado. Redirecionando para login.');
      localStorage.removeItem('authToken'); // Remove o token inválido do localStorage
      window.location.href = '/login'; // Redireciona o usuário para a página de login
    }

    // Tratamento para erros de autorização (403)
    if (status === 403) {
      console.warn('Acesso negado. Você não tem permissão para esta ação.');
    }

    // Tratamento para erros de cliente (400-499)
    if (status && status >= 400 && status < 500) {
      console.warn(`Erro de cliente (${status}): ${message}`);
    }

    // Tratamento para erros de servidor (500+)
    if (!status || status >= 500) {
      console.error('Erro interno do servidor ou falha na conexão.');
    }

    // Rejeita a promessa com os detalhes do erro
    return Promise.reject({ status, message });
  }
);

export default api;
