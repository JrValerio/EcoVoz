import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { allRoutes, notFoundRoute } from './RouteConfig';

type AppRoutesProps = {
  fallback?: React.ReactNode; // Permite personalizar o fallback
};

const AppRoutes: React.FC<AppRoutesProps> = ({
  fallback = <div aria-live="polite">Carregando...</div>, // Fallback padrão acessível
}) => {
  // Função para renderizar rotas dinamicamente
  const renderRoutes = () =>
    allRoutes.map(({ path, element: Element, private: isPrivate }, index) => {
      if (!path || !Element) return null; // Proteção contra erros

      return (
        <Route
          key={index}
          path={path}
          element={
            isPrivate ? (
              <PrivateRoute>
                <Element />
              </PrivateRoute>
            ) : (
              <Element />
            )
          }
        />
      );
    });

  return (
    <BrowserRouter>
      <Suspense fallback={fallback}>
        <Routes>
          {renderRoutes()}
          {/* Rota para páginas não encontradas */}
          <Route path={notFoundRoute.path} element={<notFoundRoute.element />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
