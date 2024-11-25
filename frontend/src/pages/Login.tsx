import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import Alert from '../components/Alert';
import GoogleAuthProvider from '../providers/GoogleAuthProvider';
import { isValidEmail } from '../utils/validators';
import { useAuthHandlers } from '../hooks/useAuthHandlers';
import useAuth from '../hooks/useAuth';

/**
 * Componente que renderiza a página de login.
 * Permite que o usuário faça login com email e senha ou com o Google.
 */
const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleGoogleLoginSuccess, handleSubmit } = useAuthHandlers();

  // Estados para controlar os valores dos campos do formulário, exibir alertas e indicar o estado de carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redireciona o usuário para o dashboard se estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Manipula o envio do formulário de login.
   * Verifica campos obrigatórios, valida email e realiza o login.
   * @param e Evento de envio do formulário.
   */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      await handleSubmit(email, password, setIsLoading);
      toast.success(t('login.success'));
      const redirectPath =
        new URLSearchParams(location.search).get('redirect') || '/dashboard';
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: t('login.unknownError') });
    }
  };

  /**
   * Manipula o sucesso do login com o Google.
   * Recebe as credenciais do Google e executa a autenticação.
   * @param response Resposta da API do Google.
   */
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    setGoogleLoading(true);
    try {
      const credential = response.credential;
      if (!credential) {
        throw new Error('Credencial do Google não fornecida.');
      }
      await handleGoogleLoginSuccess(credential, setGoogleLoading);
      toast.success(t('login.success'));
    } catch (error) {
      console.error('Google login error:', error);
      setAlert({ type: 'error', message: t('login.googleError') });
    }
  };

  return (
    <main
      className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
      role="main"
    >
      {/* Formulário de login */}
      <form
        onSubmit={handleFormSubmit}
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
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
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
          <GoogleAuthProvider>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                setAlert({ type: 'error', message: t('login.googleError') })
              }
            />
          </GoogleAuthProvider>
        </div>
      </form>
    </main>
  );
};

export default Login;
