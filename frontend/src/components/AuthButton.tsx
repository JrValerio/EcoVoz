import React from 'react';

import useAuth from '../hooks/useAuth';

const AuthButton = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <button
          onClick={() =>
            login({ name: 'João Silva', email: 'joao@example.com' })
          }
        >
          Entrar
        </button>
      )}
    </div>
  );
};

export default AuthButton;
