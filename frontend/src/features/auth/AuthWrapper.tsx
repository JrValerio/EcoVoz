import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface Props {
  children: React.ReactNode;
}

/**
 * Componente que verifica a autenticação do usuário e redireciona para o login se necessário.
 * Exibe um indicador de carregamento enquanto verifica o estado de autenticação.
 * @param children Os componentes filhos que serão renderizados se o usuário estiver autenticado.
 * @returns O componente renderizado, ou um indicador de carregamento, ou um redirecionamento para o login.
 */
const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Se estiver carregando a autenticação, exibe um indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader" aria-live="polite">
          Carregando...
        </span>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login com a URL atual como parâmetro de redirecionamento
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // Se estiver autenticado, renderiza os componentes filhos
  return <>{children}</>;
};

export default AuthWrapper;