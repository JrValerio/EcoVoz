import api from '../services/api';

export const handleGoogleLogin = async (idToken: string) => {
  try {
    const response = await api.post('/api/auth/google', { idToken });

    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('A resposta da API está vazia ou inválida.');
    }

    console.log('Resposta do backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na autenticação com Google no backend:', error);
    throw new Error('Falha ao autenticar com o Google. Verifique o backend.');
  }
};
