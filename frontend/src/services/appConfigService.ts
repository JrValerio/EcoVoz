import api from './api';

// Interface para o retorno esperado da configuração
interface AppConfig {
  appName: string;
  version: string;
  environment: string;
  [key: string]: unknown; // Permite outros campos dinâmicos, se necessário
}

// Helper para extrair mensagens de erro
const getErrorMessage = (error: unknown): string => {
  const apiError = error as { response?: { data?: { message?: string } } };
  return apiError?.response?.data?.message || 'Não foi possível carregar as configurações.';
};

// Função para buscar configurações do aplicativo
export const fetchAppConfig = async (): Promise<AppConfig> => {
  try {
    const response = await api.get('/config'); // Endpoint fixo
    return response.data; // Retorna as configurações
  } catch (error) {
    console.error('Erro ao buscar configurações do aplicativo:', error);
    throw new Error(getErrorMessage(error));
  }
};
