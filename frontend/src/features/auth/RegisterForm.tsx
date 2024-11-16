import React, { useState } from 'react';

import Button from '../../components/Button';
import './styles.css';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples de exemplo
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // Limpeza de erro caso a validação passe
    setError(null);

    console.log('Register:', formData);
    // Aqui você pode fazer uma chamada à API ou ao Redux para registrar o usuário
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
      </div>

      {/* Exibe o erro caso algo não esteja correto */}
      {error && <div className="error-message">{error}</div>}

      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
