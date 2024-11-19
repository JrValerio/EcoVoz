import React from 'react';
import useAuth from '../hooks/useAuth';
import Button from './Button'; // Usa o componente Button para consistência
import { useTranslation } from 'react-i18next';

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {isAuthenticated ? (
        <div>
          <p className="text-lg text-gray-700">
            {t('Welcome')}, <strong>{user.name}</strong>!
          </p>
          <Button
            onClick={logout}
            variant="danger"
            ariaLabel={t('Logout')}
          >
            {t('Logout')}
          </Button>
        </div>
      ) : (
        <Button
          onClick={() =>
            login('João Silva', 'joao@example.com')
          }
          variant="primary"
          ariaLabel={t('Login')}
        >
          {t('Login')}
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
