import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Button from './Button';
import Navigation from './Navigation';
import logo from '@/assets/images/logo.jpg';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(setUser({ name: 'Amaro Junior', email: 'amarovsjr81@gmail.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white flex flex-col md:flex-row md:justify-between items-center px-6 py-4 shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="EcoVoz Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-bold">{t('EcoVoz')}</h1>
      </div>
      <Navigation />
      <nav className="mt-4 md:mt-0">
        {user.name ? (
          <div className="flex items-center space-x-4">
            <p>
              {t('Welcome')}, <strong>{user.name}</strong>!
            </p>
            <Button
              onClick={handleLogout}
              variant="secondary"
              className={clsx('bg-red-500 hover:bg-red-600')}
            >
              {t('logout')}
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin} variant="primary">
            {t('login')}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
