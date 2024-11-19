import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { validateToken, login as loginService, logout as logoutService } from '../services/authService';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = Boolean(user.name && user.email);

  const saveToLocalStorage = (userData: UserData, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const clearFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    try {
      const response = await loginService(email, password); // Recebe o token e os dados do usuário
      const { token, user } = response as { token: string; user: { id: string; name: string; email: string } };
      if (!user || !user.id || !user.name || !user.email) {
        throw new Error('Dados do usuário inválidos.');
      }
      const userData = { id: user.id, name: user.name, email: user.email }; // Cria o userData completo
      dispatch(setUser(userData)); // Atualiza o estado global
      saveToLocalStorage(userData, token); // Persiste userData e token no LocalStorage
    } catch (error: unknown) {
      throw new Error((error as Error).message || 'Erro ao fazer login.');
    }
  };  const logout = async () => {
    try {
      await logoutService();
    } catch (error: unknown) {
      console.error('Erro ao fazer logout:', (error as Error)?.message);
    } finally {
      dispatch(clearUser());
      clearFromLocalStorage();
    }
  };

  const initializeAuth = async () => {
    console.log('Verificando autenticação...');
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.log('Nenhum token encontrado. Usuário não autenticado.');
      return;
    }

    try {
      const { user } = await validateToken(token); // Recebe o usuário autenticado
      const userData = { id: user.id, name: user.name, email: user.email };
      dispatch(setUser(userData)); // Atualiza o estado global
      saveToLocalStorage(userData, token); // Persiste no LocalStorage
    } catch (error: unknown) {
      console.error('Erro na autenticação:', (error as Error)?.message);
      clearFromLocalStorage();
      dispatch(clearUser());
      throw new Error('Autenticação falhou.');
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  };
};

export default useAuth;


