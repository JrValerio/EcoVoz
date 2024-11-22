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
  console.error('Erro capturado:', error); // Log do erro completo para debug
  return error.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
};

// Interface para o retorno do login
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Função de login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    console.log('Resposta da API:', response.data); // Verifica se os dados estão corretos

    const { token, user } = response.data as LoginResponse;

    // Validação explícita da resposta
    if (!token || !user || !user.id || !user.username || !user.email) {
      console.error('Erro na estrutura da resposta:', { token, user });
      throw new Error('Resposta da API não contém os dados esperados.');
    }

    return response.data; // Deve conter { token, user }
  } catch (error) {
    console.error('Erro no serviço de login:', getErrorMessage(error as ApiError));
    throw new Error(getErrorMessage(error as ApiError));
  }
};

// Função de registro
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  try {
    const response = await api.post('/api/auth/register', {
      username,
      email,
      password,
    });

    // Validação da resposta
    if (!response.data?.message) {
      throw new Error('Resposta da API não contém a mensagem esperada.');
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Erro no serviço de registro:', getErrorMessage(error as ApiError));
    throw new Error(getErrorMessage(error as ApiError));
  }
};

// Função de logout
export const logout = async (): Promise<void> => {
  try {
    // Opcional: Realize logout no backend, se necessário
    await api.post('/api/auth/logout');

    // Limpa o token do localStorage
    localStorage.removeItem('authToken');
    console.log('Logout realizado com sucesso.');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

// Interface para retorno da validação de token
interface ValidateTokenResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Função para validar o token
export const validateToken = async (token: string): Promise<ValidateTokenResponse> => {
  try {
    // Envia o token no cabeçalho para validação
    const response = await api.post(
      '/api/auth/validate',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Resposta da validação de token:', response.data);

    const { user } = response.data as ValidateTokenResponse;

    // Validação dos dados recebidos
    if (!user || !user.id || !user.username || !user.email) {
      throw new Error('Dados do usuário inválidos.');
    }

    return response.data;
  } catch (error: unknown) {
    console.error('Erro ao validar token:', getErrorMessage(error as ApiError));
    throw new Error(getErrorMessage(error as ApiError));
  }
};
