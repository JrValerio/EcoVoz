import axios from 'axios';
import api from './api';

// Interface para o retorno esperado da configuração
interface AppConfig {
  appName: string;
  version: string;
  environment: string;
  [key: string]: unknown; // Permite outros campos dinâmicos
}

/**
 * Função para buscar configurações do aplicativo.
 * Faz uma requisição GET para o endpoint /config e retorna os dados da resposta.
 * Em caso de erro, lança um erro com a mensagem apropriada.
 * @returns Promise que resolve com as configurações da aplicação.
 */
export const fetchAppConfig = async (): Promise<AppConfig> => {
  try {
    const response = await api.get('/config');
    return response.data; // Retorna os dados da resposta como AppConfig
  } catch (error: unknown) {
    console.error('[ERROR] Erro ao buscar configurações do aplicativo:', error);
  
    // Verifica se o erro é um erro do Axios
    if (axios.isAxiosError(error)) { 
      if (error.response) {
        // Erro na resposta da API
        console.error('Erro na resposta da API:', error.response.data);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Erro na requisição:', error.request);
      } else {
        // Algo aconteceu ao configurar a requisição
        console.error('Erro ao configurar a requisição:', error.message);
      }
    } else if (error instanceof Error) { 
      // Trata outros tipos de erro
      console.error('Erro:', error.message);
    }
  
    // Lança um erro com a mensagem apropriada
    const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : 'Não foi possível carregar as configurações.';
  
    throw new Error(errorMessage);
  }
  };