import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from './Button';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '@/assets/images/Logo.jpg';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../redux/store';

/**
 * Componente que renderiza o cabeçalho da aplicação.
 * Exibe o logotipo, título, navegação, alternador de tema, links para perfil e ajuda, e botões de login/logout.
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.user.name); // Obtém o nome de usuário do estado global do Redux

  /**
   * Renderiza a seção de autenticação, exibindo o botão de login ou logout,
   * e a mensagem de boas-vindas, se o usuário estiver autenticado.
   * @returns A seção de autenticação renderizada.
   */
  const renderAuthSection = () =>
    isAuthenticated ? (
      <div className="flex items-center space-x-4">
        <p className="hidden md:block" aria-live="polite">
          {t('header.welcome')}, <strong>{userName}</strong>!
        </p>
        <Button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          variant="secondary"
          className="bg-red-500 hover:bg-red-600"
          aria-label={t('header.logout')}
        >
          {t('header.logout')}
        </Button>
      </div>
    ) : (
      <Button
        onClick={() => navigate('/login')}
        variant="primary"
        aria-label={t('header.login')}
      >
        {t('header.login')}
      </Button>
    );

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white flex flex-col md:flex-row md:justify-between items-center px-6 py-4 shadow-md">
      {/* Logo e título */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt={t('header.ecoVozLogo')}
          className="h-12 w-auto"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold">{t('header.ecoVoz')}</h1>
      </div>

      {/* Navegação principal */}
      <Navigation />

      {/* Menu adicional com links e botões */}
      <nav className="flex items-center space-x-6 mt-4 md:mt-0">
        <LanguageSwitcher />

        {/* Botão para alternar o tema */}
        <Button
          onClick={toggleTheme}
          variant="secondary"
          className="ml-4"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
        </Button>

        {/* Links para perfil e ajuda, condicional para usuários autenticados */}
        {isAuthenticated && (
          <>
            <Button
              onClick={() => navigate('/profile')}
              variant="secondary"
              aria-label={t('header.profile')}
            >
              {t('header.profile')}
            </Button>
          </>
        )}
        <Button
          onClick={() => navigate('/help')}
          variant="secondary"
          aria-label={t('header.help')}
        >
          {t('header.help')}
        </Button>
      </nav>

      {/* Seção de autenticação (login/logout) */}
      <div>{renderAuthSection()}</div>
    </header>
  );
};

export default Header;
