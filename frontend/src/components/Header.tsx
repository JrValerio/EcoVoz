import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from './Button';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '@/assets/images/logo.jpg';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { t } = useTranslation();

  // Funções para login/logout
  const handleLogin = () => {
    // Simulação de login (pode ser substituído por chamada de API real)
    dispatch(setUser({ name: 'Amaro Junior', email: 'amarovsjr81@gmail.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  // Renderização dinâmica de login/logout
  const renderAuthSection = () => {
    if (user.name) {
      return (
        <div className="flex items-center space-x-4">
          <p className="hidden md:block">
            {t('welcome')}, <strong>{user.name}</strong>!
          </p>
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="bg-red-500 hover:bg-red-600"
            aria-label={t('logout')}
          >
            {t('logout')}
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleLogin}
        variant="primary"
        aria-label={t('login')}
      >
        {t('login')}
      </Button>
    );
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white flex flex-col md:flex-row md:justify-between items-center px-6 py-4 shadow-md">
      {/* Logo e título */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt={t('ecoVozLogo')}
          className="h-12 w-auto"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold">{t('ecoVoz')}</h1>
      </div>

      {/* Navegação */}
      <Navigation />

      {/* Alternador de Idioma */}
      <LanguageSwitcher />

      {/* Autenticação */}
      <nav className="mt-4 md:mt-0">{renderAuthSection()}</nav>
    </header>
  );
};

export default Header;
