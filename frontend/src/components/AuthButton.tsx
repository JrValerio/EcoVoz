import React from 'react';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';
import Button from './Button';

/**
 * Componente que renderiza um botão de autenticação.
 * Exibe um botão de "Login" se o usuário não estiver autenticado e um botão de "Logout" com o nome do usuário se estiver autenticado.
 */
const AuthButton: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {isAuthenticated ? (
        // Se o usuário estiver autenticado, exibe o nome do usuário e o botão de logout
        <div>
          <p className="text-lg text-gray-700">
            {t('authButton.welcome')}, <strong>{user.name}</strong>!
          </p>
          <Button
            onClick={logout}
            variant="danger"
            ariaLabel={t('authButton.logout')}
          >
            {t('authButton.logout')}
          </Button>
        </div>
      ) : (
        // Se o usuário não estiver autenticado, exibe o botão de login
        <Button
          onClick={() => login('João Silva', 'joao@example.com')}
          variant="primary"
          ariaLabel={t('authButton.login')}
        >
          {t('authButton.login')}
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
