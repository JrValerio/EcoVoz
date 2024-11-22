import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { validateToken, login as loginService, logout as logoutService } from '../services/authService';


interface UserData {
  id: string;
  username: string;
  email: string;
}

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user.username && user.email);
  const isLoading = user.loading;

  // Salva os dados do usuário e o token no localStorage
  const saveToLocalStorage = (userData: UserData, token: string) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', token);
      console.log('Dados salvos no localStorage:', { userData, token });
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  // Remove os dados do usuário e o token do localStorage
  const clearFromLocalStorage = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      console.log('LocalStorage limpo com sucesso.');
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  };

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    try {
      const response = await loginService(email, password);
      const { token, user } = response as { token: string; user: UserData };

      if (!token || !user || !user.id || !user.username || !user.email) {
        throw new Error('Erro na resposta de login. Token ou usuário ausente.');
      }

      saveToLocalStorage(user, token);
      dispatch(setUser(user));
      console.log('Login concluído com sucesso.');
    } catch (error: unknown) {
      console.error('Erro no login:', error);
      throw new Error('Erro ao fazer login. Verifique as credenciais.');
    }
  };

  // Função de logout
  const logout = async (): Promise<void> => {
    try {
      await logoutService();
    } catch (error: unknown) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      dispatch(clearUser());
      clearFromLocalStorage();
      console.log('Logout concluído.');
    }
  };

  // Inicializa a autenticação (valida o token e restaura o estado)
  const initializeAuth = async (): Promise<void> => {
    const token = localStorage.getItem('authToken');
    console.log('Token recuperado do localStorage:', token);

    if (!token) {
      console.warn('Nenhum token encontrado. Usuário não autenticado.');
      dispatch(clearUser());
      return;
    }

    try {
      const response = await validateToken(token);
      const { user } = response;

      if (!user || !user.id || !user.username || !user.email) {
        throw new Error('Dados do usuário inválidos.');
      }

      dispatch(setUser(user));
      console.log('Autenticação inicializada com sucesso.');
    } catch (error) {
      console.error('Erro na autenticação:', error);
      dispatch(clearUser());
      clearFromLocalStorage();
    }
  };

  // Efeito para inicializar a autenticação automaticamente
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
