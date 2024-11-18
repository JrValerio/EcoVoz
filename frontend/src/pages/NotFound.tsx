import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';


const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center animate-fadeIn">
      <h1 className="text-6xl font-bold text-red-500 drop-shadow-md">404</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-lg">
        {t('Oops! The page you are looking for does not exist.')}
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition duration-300"
      >
        <FaArrowLeft /> {t('Go Back to Home')}
      </Link>
    </div>
  );
};

export default NotFound;
