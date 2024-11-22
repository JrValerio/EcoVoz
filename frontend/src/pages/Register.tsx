import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // Validações
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Manipulação do envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    // Validação de campos obrigatórios
    if (!username || !email || !password || !confirmPassword) {
      setAlert({ type: 'error', message: t('register.allFieldsRequired') });
      return;
    }

    // Validação de email
    if (!validateEmail(email)) {
      setAlert({ type: 'error', message: t('register.emailInvalid') });
      return;
    }

    // Validação de senha
    if (!validatePassword(password)) {
      setAlert({ type: 'error', message: t('register.passwordTooShort') });
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: t('register.passwordMismatch') });
      return;
    }

    setIsLoading(true);

    try {
      // Envia os dados para o backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      // Exibe mensagem de sucesso
      setAlert({ type: 'success', message: response.data.message || t('register.successMessage') });

      // Limpa os campos do formulário
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      // Captura e exibe erros do backend
      if (axios.isAxiosError(err) && err.response) {
        setAlert({ type: 'error', message: err.response.data.message || t('register.errorMessage') });
      } else {
        setAlert({ type: 'error', message: t('register.unknownError') });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded w-full max-w-md border border-gray-300 dark:border-gray-700"
        aria-labelledby="register-form-title"
        aria-busy={isLoading}
      >
        <h1
          id="register-form-title"
          className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center"
        >
          {t('register.title')}
        </h1>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('register.username')}
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('register.usernamePlaceholder')}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('register.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('register.emailPlaceholder')}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('register.password')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('register.passwordPlaceholder')}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('register.confirmPassword')}
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('register.confirmPasswordPlaceholder')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('register.sending') : t('register.submit')}
        </button>
      </form>
    </div>
  );
};

export default Register;
