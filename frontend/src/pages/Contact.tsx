import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import Alert from '../components/Alert';
import Button from '../components/Button';

/**
 * Componente que renderiza um formulário de contato.
 * Permite que o usuário envie uma mensagem com nome, email, assunto e mensagem.
 * Realiza validações no frontend e exibe mensagens de sucesso ou erro.
 */
const Contact: React.FC = () => {
  // Estados para controlar os valores dos campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Estado para indicar se o formulário está sendo enviado
  const [isLoading, setIsLoading] = useState(false);

  // Estado para exibir alertas de sucesso ou erro
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Hook para tradução
  const { t } = useTranslation();

  /**
   * Valida o formato de um email.
   * @param email O email a ser validado.
   * @returns True se o email for válido, false caso contrário.
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Manipula o envio do formulário de contato.
   * Realiza a validação do email e envia a requisição para o backend.
   * Exibe alertas de sucesso ou erro.
   * @param e Evento de submit do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!validateEmail(email)) {
      setAlert({ type: 'error', message: t('contact.emailInvalid') });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        subject,
        message,
      });

      setAlert({
        type: 'success',
        message: response.data.message || t('contact.successMessage'),
      });

      // Limpa os campos do formulário após o envio
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error: unknown) {
      // Captura e exibe erros do backend
      if (axios.isAxiosError(error)) {
        setAlert({
          type: 'error',
          message: error.response?.data?.message || t('contact.errorMessage'),
        });
      } else {
        setAlert({
          type: 'error',
          message: t('contact.unknownError'),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4">
      {/* Formulário de contato */}
      <form
        onSubmit={handleSubmit}
        aria-busy={isLoading}
        className="bg-white dark:bg-gray-900 p-8 shadow-lg rounded w-full max-w-lg border border-gray-300 dark:border-gray-700 animate-fade"
      >
        {/* Título do formulário */}
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6 text-center">
          {t('contact.title')}
        </h1>

        {/* Exibe um alerta se houver algum */}
        {alert && <Alert type={alert.type} message={alert.message} />}

        {/* Campo de nome */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('contact.name')}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300   
 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('contact.namePlaceholder')}
            required
          />
        </div>

        {/* Campo de email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('contact.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('contact.emailPlaceholder')}
            required
          />
        </div>

        {/* Campo de assunto */}
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('contact.subject')}
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('contact.subjectPlaceholder')}
          />
        </div>

        {/* Campo de mensagem */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded w-full focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-400 dark:focus:border-blue-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder={t('contact.messagePlaceholder')}
            rows={4}
            required
          />
        </div>

        {/* Botão de enviar */}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
        >
          {isLoading ? t('contact.sendingButton') : t('contact.submitButton')}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
