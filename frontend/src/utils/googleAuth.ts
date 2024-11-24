import api from '../services/api';
import { toast } from 'react-toastify'; // Importe o toast para exibir mensagens de erro

/**
 * Função para lidar com o login do Google.
 * Envia o idToken para o backend e lida com a resposta.
 * @param idToken O token de ID do Google.
 * @returns Os dados do usuário e o token de autenticação.
 */
export const handleGoogleLogin = async (idToken: string) => {
  try {
    const response = await api.post('/api/auth/google', { idToken });

    // Valida a resposta da API
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Resposta inválida da API. Falha ao fazer login.');
    }

    console.log('Resposta do backend:', response.data);
    return response.data;
  } catch (error: any) { // any para lidar com o erro
    console.error('Erro na autenticação com Google no backend:', error);

    // Tratamento de erro mais específico
    if (error.response) {
      // Erro na resposta da API
      console.error('Erro na resposta da API:', error.response.data);
      toast.error(error.response.data.message || 'Falha ao fazer login.');
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error('Erro na requisição:', error.request);
      toast.error('Erro de rede. Verifique sua conexão.');
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Erro ao configurar a requisição:', error.message);
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }

    // Lança um erro para ser tratado no componente que chama a função
    throw new Error('Falha ao autenticar com o Google.'); 
  }
};