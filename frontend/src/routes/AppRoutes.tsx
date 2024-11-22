import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthWrapper from '../features/auth/AuthWrapper';
import { allRoutes, notFoundRoute } from './RouteConfig';

type AppRoutesProps = {
  fallback?: React.ReactNode;
};

const AppRoutes: React.FC<AppRoutesProps> = ({
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loader" aria-live="polite">Carregando...</span>
    </div>
  ),
}) => {
  const renderRoutes = () =>
    allRoutes.map(({ path, element: Element, private: isPrivate }, index) => {
      if (!path || !Element) return null;

      return (
        <Route
          key={index}
          path={path}
          element={
            isPrivate ? (
              // Protege rotas privadas com o componente PrivateRoute
              <AuthWrapper>
                <Element />
              </AuthWrapper>
            ) : (
              <Element />
            )
          }
        />
      );
    });

  return (
    <Suspense fallback={fallback}>
      <Routes>
        {renderRoutes()}
        <Route path={notFoundRoute.path} element={<notFoundRoute.element />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
