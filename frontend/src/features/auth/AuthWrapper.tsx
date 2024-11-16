import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthWrapper;
