// AppRoutes.tsx

import React, { Suspense } from 'react';
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import { allRoutes, notFoundRoute, RouteConfig } from './RouteConfig';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  const renderRoutes = () =>
    allRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={renderRouteElement(route)}>
        {route.children && route.children.map((childRoute, childIndex) => (
          <Route
            key={childIndex}
            path={childRoute.path}
            element={renderRouteElement(childRoute)}
          />
        ))}
      </Route>
    ));

  const renderRouteElement = (route: RouteConfig) => (
    route.private ? (
      <PrivateRoute>
        <Suspense fallback={<div>Carregando...</div>}>
          <route.element />
        </Suspense>
      </PrivateRoute>
    ) : (
      <Suspense fallback={<div>Carregando...</div>}>
        <route.element />
      </Suspense>
    )
  );

  return (
    <Routes>
      {renderRoutes()}
      <Route path={notFoundRoute.path} element={<notFoundRoute.element />} />
    </Routes>
  );
};

export default AppRoutes;