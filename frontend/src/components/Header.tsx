import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from './Button';
import Navigation from './Navigation';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import './styles/Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(setUser({ name: 'John Doe', email: '0VtZP@example.com' }));
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const { t } = useTranslation();

  return (
    <header className="header">
      <h1>{t('appName')}</h1>
      <Navigation />
      <nav>
        {user.name ? (
          <div>
            <p>
              {t('welcome')}, <strong>{user.name}</strong>!
            </p>
            <Button
              onClick={handleLogout}
              className="logout-btn"
              variant="secondary"
            >
              {t('logout')}
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin} className="login-btn" variant="primary">
            {t('login')}
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
