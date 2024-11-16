import React from 'react';
import useAuth from '../hooks/useAuth';

const AuthButton = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div className="flex items-center justify-center space-y-4 text-center">
      {isAuthenticated ? (
        <div>
          <p className="text-lg text-gray-700">Bem-vindo, {user.name}!</p>
          <button
            onClick={logout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            login({ name: 'João Silva', email: 'joao@example.com' })
          }
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      )}
    </div>
  );
};

export default AuthButton;
