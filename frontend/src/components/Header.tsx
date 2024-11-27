import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

import Button from './Button';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from '@/assets/images/Logo.jpg';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../redux/store';

/**
 * Componente que renderiza o cabeçalho da aplicação.
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.user.name);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-4 shadow-md">
      {/* Topo com logo e botão de menu hamburguer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt={t('header.ecoVozLogo')}
            className="h-12 w-auto"
            aria-hidden="true"
          />
          <h1 className="text-2xl font-bold">{t('header.ecoVoz')}</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label={t(menuOpen ? 'header.closeMenu' : 'header.openMenu')}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu principal */}
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:justify-between mt-4 md:mt-0`}
      >
        {/* Navegação principal */}
        <Navigation />

        {/* Menu adicional com links e botões */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
          <LanguageSwitcher />
          <Button
            onClick={toggleTheme}
            variant="secondary"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
          </Button>
          {isAuthenticated && (
            <Button
              onClick={() => navigate('/profile')}
              variant="secondary"
              aria-label={t('header.profile')}
            >
              {t('header.profile')}
            </Button>
          )}
          <Button
            onClick={() => navigate('/help')}
            variant="secondary"
            aria-label={t('header.help')}
          >
            {t('header.help')}
          </Button>
        </div>

        {/* Seção de autenticação */}
        <div className="mt-4 md:mt-0">{renderAuthSection()}</div>
      </div>
    </header>
  );
};

export default Header;
