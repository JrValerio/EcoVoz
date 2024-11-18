import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Validação básica antes de enviar a requisição
    if (!username || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setIsLoading(true); // Ativa estado de carregamento

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      setMessage(response.data.message || 'Cadastro realizado com sucesso!');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Erro ao realizar o cadastro.');
      } else {
        setError('Erro ao realizar o cadastro.');
      }
    } finally {
      setIsLoading(false); // Desativa estado de carregamento
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded w-full max-w-md"
        aria-labelledby="register-form-title"
      >
        <h1
          id="register-form-title"
          className="text-2xl font-bold text-gray-700 mb-4"
        >
          Cadastro
        </h1>
        {message && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded shadow">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded shadow">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
