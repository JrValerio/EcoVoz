import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { validateToken, login as loginService, logout as logoutService, LoginResponse, ValidateTokenResponse } from '../services/authService';

/**
 * Hook personalizado para gerenciar a autenticação do usuário.
 */
const useAuth = () => {
  const dispatch = useDispatch();

  // Seleciona o estado global do Redux
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user?.username && user?.email);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  /**
   * Salva os dados do usuário e o token no localStorage.
   */
  const saveToLocalStorage = (user: unknown, token: string) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      console.log('[SUCCESS] Dados salvos no localStorage:', { user, token });
    } catch (error) {
      console.error('[ERROR] Erro ao salvar no localStorage:', error);
    }
  };

  /**
   * Remove os dados do usuário e o token do localStorage.
   */
  const clearFromLocalStorage = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      console.log('[SUCCESS] LocalStorage limpo com sucesso.');
    } catch (error) {
      console.error('[ERROR] Erro ao limpar localStorage:', error);
    }
  };

  /**
   * Função de login.
   */
  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    try {
      const response = await loginService(email, password);
      const { token, user } = response as LoginResponse;

      if (!token || !user) {
        console.error('[ERROR] Erro na resposta de login:', response);
        throw new Error('Resposta de login inválida. Token ou usuário ausente.');
      }

      saveToLocalStorage(user, token);
      dispatch(setUser(user));
      console.log('[SUCCESS] Login concluído com sucesso.');
    } catch (error) {
      console.error('[ERROR] Erro no login:', error);
      throw new Error('Erro ao fazer login. Verifique as credenciais.');
    }
  };

  /**
   * Função de logout.
   */
  const logout = async (): Promise<void> => {
    try {
      await logoutService();
      console.log('[SUCCESS] Logout concluído com sucesso.');
    } catch (error) {
      console.error('[ERROR] Erro ao fazer logout:', error);
    } finally {
      dispatch(clearUser());
      clearFromLocalStorage();
    }
  };

  /**
   * Inicializa a autenticação (valida o token e restaura o estado).
   */
  const initializeAuth = async (): Promise<void> => {
    console.log('[INFO] Iniciando validação do token...');

    try {
      const response = await validateToken(); // Valida o token
      if (response.success && response.data?.user) {
        const { user } = response.data as ValidateTokenResponse; 

        if (!user || !user.id || !user.username || !user.email) {
          console.error('[ERROR] Dados do usuário inválidos:', user);
          throw new Error('Dados do usuário inválidos.');
        }

        saveToLocalStorage(user, localStorage.getItem('authToken') || '');
        dispatch(setUser(user));
        console.log('[SUCCESS] Autenticação inicializada com sucesso.');
      } else {
        console.warn('[WARN] Validação do token falhou:', response.error);
        throw new Error(response.error || 'Erro desconhecido na validação do token.');
      }
    } catch (error) {
      console.error('[ERROR] Erro na inicialização da autenticação:', error);
      dispatch(clearUser());
      localStorage.removeItem('authToken');
    }
  };

  // Efeito para inicializar a autenticação automaticamente ao carregar a aplicação
  useEffect(() => {
    initializeAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    initializeAuth,
  };
};

export default useAuth;