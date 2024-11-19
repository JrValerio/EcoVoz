import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string; // Permite personalizar o redirecionamento
  fallback?: React.ReactNode; // Permite personalizar o fallback visual
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = '/login',
  fallback = <div className="loading-spinner" aria-live="polite">Verificando autenticação...</div>,
}) => {
  const { isAuthenticated, initializeAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await initializeAuth(); // Restaura o estado do usuário
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [initializeAuth]);

  // Renderiza o fallback enquanto verifica a autenticação
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Redireciona se não estiver autenticado
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
