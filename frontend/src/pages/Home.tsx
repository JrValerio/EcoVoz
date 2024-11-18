import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import VoiceInput from '../components/VoiceInput';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleRedirect = () => {
    if (user.name) {
      navigate('/dashboard');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Título da página */}
      <section className="w-full max-w-xl p-4">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to EcoVoz</h1>
        <p className="text-lg text-gray-700 mt-4">
          Your platform for accessibility and communication. Empowering individuals to connect and thrive with innovative tools designed for inclusivity.
        </p>
      </section>

      {/* Área condicional com base no estado do usuário */}
      <section className="mt-6 w-full max-w-md">
        {user.name ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Welcome back, <strong>{user.name}</strong>!
            </p>
            <button
              onClick={handleRedirect}
              aria-label="Go to your dashboard"
              className="w-full bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Link
              to="/login"
              aria-label="Login to your account"
              className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </Link>
            <Link
              to="/about"
              aria-label="Learn more about EcoVoz"
              className="block text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-300"
            >
              Learn More About Us
            </Link>
          </div>
        )}
      </section>

      {/* Componente de entrada de voz */}
      <VoiceInput />

      {/* Acesso rápido */}
      <section className="mt-10 text-gray-600">
        <p>Looking for help? Use the voice button to navigate the platform.</p>
      </section>
    </main>
  );
};

export default Home;
