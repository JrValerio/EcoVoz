import api from './api';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Helper para extrair mensagens de erro
const getErrorMessage = (error: ApiError): string => {
  return error.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
};

// Login
export const login = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};

// Registro
export const register = async (name: string, email: string, password: string): Promise<{ message: string }> => {
  try {
    const response = await api.post('/register', { name, email, password });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};

// Logout
export const logout = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};

// Validação de Token
export const validateToken = async (token: string): Promise<{ user: { id: string; name: string; email: string } }> => {
  try {
    const response = await api.post('/auth/validate', { token });
    return response.data;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error as ApiError));
  }
};
