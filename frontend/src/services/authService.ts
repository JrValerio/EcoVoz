import api from './api';

// Interface para tratar erros retornados pela API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Helper para extrair mensagens de erro
const getErrorMessage = (error: ApiError): string => {
  console.error('[ERROR] Erro na requisição:', error); // Log do erro completo para debug
  return error.response?.data?.message || 'Ocorreu um erro na requisição. Tente novamente.';
};

// Interfaces para os retornos
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ValidateTokenResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

/**
 * Função de login.
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/api/auth/login', { email, password });

    const { token, user } = response.data as LoginResponse;

    // Validação explícita da resposta
    if (!token || !user || !user.id || !user.username || !user.email) {
      console.error('[ERROR] Erro na estrutura da resposta:', { token, user });
      throw new Error('Resposta da API não contém os dados esperados.');
    }

    console.log('[SUCCESS] Login realizado com sucesso.');
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};

/**
 * Função de registro.
 */
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  try {
    const response = await api.post('/api/auth/register', { username, email, password });

    if (!response.data?.message) {
      console.error('[ERROR] Erro na estrutura da resposta:', response.data);
      throw new Error('Resposta da API não contém a mensagem esperada.');
    }

    console.log('[SUCCESS] Registro realizado com sucesso.');
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};

/**
 * Função de logout.
 */
export const logout = async (): Promise<void> => {
  try {
    await api.post('/api/auth/logout');
    localStorage.removeItem('authToken'); // Limpa o token localmente
    console.log('[SUCCESS] Logout realizado com sucesso.');
  } catch (error) {
    console.error('[ERROR] Erro ao fazer logout:', getErrorMessage(error as ApiError));
  }
};

/**
 * Função para validar o token.
 */
export const validateToken = async () => {
  const token = localStorage.getItem('authToken'); // Recupera o token do localStorage
  if (!token) {
    console.warn('[WARN] Nenhum token encontrado no localStorage.');
    return { success: false, error: 'Nenhum token encontrado.' };
  }

  try {
    const response = await api.post(
      '/api/auth/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      }
    );

    console.log('[SUCCESS] Validação de token bem-sucedida:', response.data);
    return { success: true, data: response.data }; // Retorna os dados do backend
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[ERROR] Erro ao validar token:', error);
      return { success: false, error: error.message };
    } else {
      console.error('[ERROR] Erro ao validar token:', error);
      return { success: false, error: 'Erro desconhecido ao validar token.' };
    }
  }
};