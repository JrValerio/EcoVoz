import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
};


const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = '/login',
  fallback = <div className="loading-spinner" aria-live="polite">Verificando autenticação...</div>,
}) => {
  const { isAuthenticated, isLoading } = useAuth(); // useAuth agora retorna `isLoading`
  
  // Renderiza fallback enquanto verifica autenticação
  if (isLoading) {
    
    return <>{fallback}</>;
  }

  // Redireciona se não estiver autenticado
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
