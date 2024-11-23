import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';
import { handleGoogleLogin } from '../utils/googleAuth';
import { isValidEmail } from '../utils/validators';

/**
 * Componente que renderiza a página de login.
 * Permite que o usuário faça login com email e senha ou com o Google.
 */
const Login: React.FC = () => {
  // Estados para controlar os valores dos campos do formulário, exibir alertas e indicar o estado de carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Hooks para tradução, autenticação, navegação e localização
  const { t } = useTranslation();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redireciona o usuário para o dashboard se estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Manipula o sucesso do login com o Google.
   * Obtém as credenciais do Google, envia para o backend, 
   * salva o token e o usuário no localStorage e redireciona para o dashboard.
   * @param response Resposta da API do Google.
   */
  const handleGoogleLoginSuccess = async (response: CredentialResponse): Promise<void> => {
    setGoogleLoading(true);
    try {
      const { credential } = response;

      if (!credential) {
        console.error('[ERROR] Credencial não fornecida');
        toast.error(t('login.googleError'));
        return;
      }

      console.log('[INFO] Resposta do Google:', response);
      const backendResponse = await handleGoogleLogin(credential);
      console.log('[INFO] Dados recebidos do backend:', backendResponse);

      const { token, user } = backendResponse;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(t('login.success'));
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('[ERROR] Erro ao realizar login com Google:', error);
      toast.error(
        (error as { message: string }).message || t('login.googleError'),
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  /**
   * Manipula o envio do formulário de login.
   * Realiza a autenticação do usuário com email e senha.
   * Redireciona para o dashboard ou para a URL especificada na query string em caso de sucesso.
   * @param e Evento de submit do formulário.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setAlert(null);

    if (!email || !password) {
      setAlert({ type: 'error', message: t('login.requiredFields') });
      return;
    }

    if (!isValidEmail(email)) {
      setAlert({ type: 'error', message: t('login.invalidEmail') });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      setAlert({ type: 'success', message: t('login.success') });

      const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';
      navigate(redirectPath);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('login.unknownError');
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
      role="main"
    >
      {/* Formulário de login */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded w-full max-w-md border border-gray-300 dark:border-gray-700"
        aria-busy={isLoading}
      >
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          {t('login.title')}
        </h1>

        {/* Exibe um alerta se houver algum */}
        {alert && (
          <Alert type={alert.type} message={alert.message} aria-live="polite" />
        )}

        {/* Campo de email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('login.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('login.emailPlaceholder')}
            required
          />
        </div>

        {/* Campo de senha */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('login.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border 1  border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('login.passwordPlaceholder')}
            required
          />
        </div>

        {/* Botão de submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('login.loading') : t('login.submit')}
        </button>

        {/* Link para registro */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          {t('login.noAccount')}{' '}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('login.registerLink')}
          </Link>
        </p>

        {/* Botão de login com o Google */}
        <div className="mt-4 text-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setAlert({ type: 'error', message: t('login.googleError') })}
            useOneTap
          />
        </div>
      </form>
    </main>
  );
};

export default Login;