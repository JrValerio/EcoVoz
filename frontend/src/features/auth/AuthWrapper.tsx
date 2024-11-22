import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // Para salvar a rota atual

  if (isLoading) {
    // Exibe um spinner ou qualquer feedback enquanto o estado de autenticação está sendo verificado
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader" aria-live="polite">
          Loading...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para a página de login, incluindo a rota original como query param
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
