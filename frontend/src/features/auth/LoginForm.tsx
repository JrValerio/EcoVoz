import React, { useState } from 'react';
import axios from 'axios';

/**
 * Componente de formulário de login.
 * Permite que o usuário faça login com email e senha.
 * Realiza validações básicas e envia os dados para o backend.
 */
const LoginForm: React.FC = () => {
  // Estados para controlar os valores dos campos do formulário, mensagens de erro/sucesso e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
   * Manipula o envio do formulário de login.
   * Realiza validações nos campos e envia a requisição para o backend.
   * Exibe mensagens de sucesso ou erro.
   * @param e Evento de submit do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (!email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      // Substitua pela URL correta da sua API de login
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        {
          email,
          password,
        },
      );

      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('authToken', token);

      setSuccess('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro. Tente novamente mais tarde.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="auth-form bg-white p-6 rounded shadow-md w-full max-w-sm"
      aria-busy={isLoading}
    >
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {/* Exibe mensagens de erro/sucesso */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {/* Campo de email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Campo de senha */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Botão de login */}
      <button
        type="submit"
        className={`w-full p-2 text-white rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};

export default LoginForm;
