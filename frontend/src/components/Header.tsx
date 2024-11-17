import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from './Button';
import Navigation from './Navigation';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(setUser({ name: 'Amaro junior', email: 'amarovsjr81@gmail.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">{t('appName')}</h1>
      <Navigation />
      <nav>
        {user.name ? (
          <div className="flex items-center space-x-4">
            <p>
              {t('Welcome')}, <strong>{user.name}</strong>!
            </p>
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="bg-red-500 hover:bg-red-600"
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
