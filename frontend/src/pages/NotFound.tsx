import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

/**
 * Componente que renderiza a página "Não Encontrado" (404).
 */
const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center animate-fadeIn"
      role="main"
    >
      {/* Código de erro */}
      <h1
        className="text-6xl font-bold text-red-500 drop-shadow-md"
        aria-label="404 - Página não encontrada"
      >
        404
      </h1>

      {/* Mensagem de erro */}
      <p className="text-lg text-gray-700 mt-4 max-w-lg" role="alert">
        {t('notFound.message', 'Oops! A página que você está procurando não existe.')}
      </p>

      {/* Botão para voltar à home */}
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition duration-300"
        aria-label={t('notFound.goBack', 'Voltar para a página inicial')}
      >
        <FaArrowLeft aria-hidden="true" /> {/* Ícone de seta para a esquerda */}
        {t('notFound.goBack', 'Voltar para a página inicial')}
      </Link>
    </div>
  );
};

export default NotFound;