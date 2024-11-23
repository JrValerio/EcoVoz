import React, { useState } from 'react';
import axios from 'axios';

import Button from '../../components/Button';
import Alert from '../../components/Alert'; // Assuming Alert component is in the same directory as Button

/**
 * Componente de formulário de registro.
 * Permite que o usuário se registre com nome, email e senha.
 * Realiza validações básicas e envia os dados para o backend.
 */
const RegisterForm: React.FC = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Estados para controlar mensagens de erro, sucesso e carregamento
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
   * Manipula as mudanças nos campos de entrada do formulário.
   * Atualiza o estado do formulário com os novos valores.
   * @param e Evento de mudança do input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Manipula o envio do formulário de registro.
   * Realiza validações nos campos e envia a requisição para o backend.
   * Exibe mensagens de sucesso ou erro.
   * @param e Evento de submit do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação dos campos
    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    try {
      // Envia os dados para o backend
      const response = await axios.post(
        'http://localhost:4000/api/auth/register',
        formData,
      );
      console.log(response.data);
      setSuccess('Registro realizado com sucesso!');
      setFormData({ name: '', email: '', password: '' }); // Limpa o formulário
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message ||
            'Falha no registro. Por favor, tente novamente.',
        );
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="auth-form bg-white p-6 rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4">Registrar</h1>
      {/* Exibe mensagens de erro/sucesso */}
      {error && <Alert type="error" message={error} />}{' '}
      {/* Usando o componente Alert */}
      {success && <Alert type="success" message={success} />}{' '}
      {/* Usando o componente Alert */}
      {/* Campo de nome */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Digite seu nome"
          required
        />
      </div>
      {/* Campo de email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Digite seu email"
          required
        />
      </div>
      {/* Campo de senha */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Digite sua senha"
          required
        />
      </div>
      {/* Botão de registro */}
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full p-2 text-white rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Registrando...' : 'Registrar'}
      </Button>
    </form>
  );
};

export default RegisterForm;
