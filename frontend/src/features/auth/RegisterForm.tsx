import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import './styles.css';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação dos campos
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log(response.data); // or set it to a state variable for further processing
      setSuccess('Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {/* Exibe mensagens de erro/sucesso */}
      {error && <div className="error-message text-red-500">{error}</div>}
      {success && <div className="success-message text-green-500">{success}</div>}

      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your password"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full p-2 text-white rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;
