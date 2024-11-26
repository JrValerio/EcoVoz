import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

import Button from './Button';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from '@/assets/images/Logo.jpg';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente do cabeçalho da aplicação.
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderAuthSection = () =>
    isAuthenticated ? (
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
    <header className="bg-blue-600 dark:bg-gray-900 text-white shadow-lg">
      {/* Linha superior com o logo e menu hamburguer */}
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt={t('header.ecoVozLogo')}
            className="h-16 w-auto"
            aria-hidden="true"
          />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {/* Navegação Centralizada */}
          <Navigation className="flex space-x-6 text-lg font-semibold" />
        </div>

        {/* Menu Hamburguer para dispositivos menores */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menu adicional com idioma, tema e autenticação */}
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex justify-between items-center px-6 pb-3 md:pb-0`}
      >
        {/* Botões adicionais */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
          <LanguageSwitcher />

          <Button
            onClick={toggleTheme}
            variant="secondary"
            className="ml-4"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
          </Button>

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
