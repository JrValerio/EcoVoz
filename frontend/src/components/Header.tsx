import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '@/assets/images/Logo.jpg';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Renderiza login/logout dinamicamente
  const renderAuthSection = () => (
    isAuthenticated ? (
      <div className="flex items-center space-x-4">
        <p
          className="hidden md:block"
          aria-live="polite"
        >
          {t('header.welcome')}, <strong>{user.name}</strong>!
        </p>
        <Button
          onClick={async () => {
            await logout();
            navigate('/login'); // Redireciona para a página de login após logout
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
        onClick={() => navigate('/login')} // Redireciona para a página de login
        variant="primary"
        aria-label={t('header.login')}
      >
        {t('header.login')}
      </Button>
    )
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

      {/* Navegação */}
      <Navigation />

      {/* Menu Adicional */}
      <nav className="flex items-center space-x-6 mt-4 md:mt-0">
        <LanguageSwitcher />

        {/* Alternador de Tema */}
        <Button
          onClick={toggleTheme}
          variant="secondary"
          className="ml-4"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
        </Button>

        {/* Links para Profile e Help */}
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

      {/* Autenticação */}
      <div>{renderAuthSection()}</div>
    </header>
  );
};

export default Header;
