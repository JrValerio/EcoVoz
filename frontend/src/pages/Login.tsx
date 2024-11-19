import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { login } from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      const { token } = await login(email, password);
      setMessage('Login realizado com sucesso!');
      setEmail('');
      setPassword('');

      // Salva o token no localStorage ou contexto global
      localStorage.setItem('authToken', token);

      // Redireciona para o Dashboard
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Login</h1>

        {message && <Alert type="success" message={message} />}
        {error && <Alert type="error" message={error} />}

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
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrando...' : 'Login'}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
