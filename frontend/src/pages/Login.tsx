import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin } from '../utils/googleAuth';
import type { CredentialResponse } from '@react-oauth/google';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, initializeAuth } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  // Lógica do login com Google
  const onGoogleSuccess = async (response: CredentialResponse) => {
    const credential = response.credential ?? '';
    try {
      const data = await handleGoogleLogin(credential);
      localStorage.setItem('authToken', data.token);
      setAlert({ type: 'success', message: t('login.googleSuccess') });
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t('login.googleError') || 'Erro inesperado. Tente novamente.';
      setAlert({ type: 'error', message: errorMessage });
    }
  };
  
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!email || !password) {
      setAlert({ type: 'error', message: t('login.requiredFields') });
      return;
    }

    if (!validateEmail(email)) {
      setAlert({ type: 'error', message: t('login.invalidEmail') });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      setAlert({ type: 'success', message: t('login.success') });

      const redirectPath =
        new URLSearchParams(location.search).get('redirect') || '/dashboard';
      navigate(redirectPath);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : t('login.unknownError');
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
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded w-full max-w-md border border-gray-300 dark:border-gray-700"
        aria-busy={isLoading}
      >
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
          {t('login.title')}
        </h1>

        {alert && (
          <Alert type={alert.type} message={alert.message} aria-live="polite" />
        )}

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

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('login.loading') : t('login.submit')}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          {t('login.noAccount')}{' '}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('login.registerLink')}
          </Link>
        </p>

        <div className="mt-4 text-center">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() =>
              setAlert({ type: 'error', message: t('login.googleError') })
            }
          />
        </div>
      </form>
    </main>
  );
};

export default Login;
