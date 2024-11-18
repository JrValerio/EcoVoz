import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validação de e-mail
    if (!email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
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
      setSuccessMessage(response.data.message || 'Mensagem enviada com sucesso!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro desconhecido.');
      } else {
        setErrorMessage('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={isLoading}
      className="bg-white p-8 shadow-lg rounded w-full max-w-lg border border-gray-300"
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Entre em Contato
      </h1>

      {successMessage && (
        <p
          className="text-green-600 text-sm mb-4 border border-green-500 p-2 rounded bg-green-100"
          role="alert"
          aria-live="polite"
        >
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          className="text-red-600 text-sm mb-4 border border-red-500 p-2 rounded bg-red-100"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Digite seu nome"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Digite o assunto (opcional)"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensagem
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200 focus:border-blue-400"
          placeholder="Digite sua mensagem aqui..."
          rows={4}
          required
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
};

export default Contact;
