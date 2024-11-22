import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import VoiceInput from '../components/VoiceInput';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const handleRedirect = () => {
    if (user.name) {
      navigate('/dashboard');
    }
  };

  return (
    <main
      className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 text-center overflow-hidden"
      role="main"
    >
      {/* Título da página */}
      <section className="w-full max-w-xl p-4">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {t('home.welcome')}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
          {t('home.description')}
        </p>
      </section>

      {/* Área condicional com base no estado do usuário */}
      <section className="mt-6 w-full max-w-md">
        {user.name ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t('home.welcomeBack')}, <strong>{user.name}</strong>!
            </p>
            <button
              onClick={handleRedirect}
              aria-label={t('home.goToDashboard')}
              className="w-full bg-green-600 dark:bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-500"
            >
              {t('home.goToDashboard')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Link
              to="/login"
              aria-label={t('home.login')}
              className="block w-full text-center bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
            >
              {t('home.login')}
            </Link>
            <Link
              to="/about"
              aria-label={t('home.learnMore')}
              className="block text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500"
            >
              {t('home.learnMore')}
            </Link>
          </div>
        )}
      </section>

      {/* Componente de Reconhecimento de Voz */}
      <section className="mt-10 w-full max-w-md">
        <VoiceInput />
      </section>

      {/* Acesso rápido */}
      <section className="mt-10 text-gray-600 dark:text-gray-400">
        <p>{t('home.voiceNavigation')}</p>
      </section>
    </main>
  );
};

export default Home;
