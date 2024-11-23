// RouteConfig.ts

import React, { lazy } from 'react';

// Interface para configuração de rotas
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType>;
  private: boolean;
  children?: RouteConfig[];
}

// Configuração de rotas públicas
export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('../pages/Home')),
    private: false,
  },
  {
    path: '/about',
    element: lazy(() => import('../pages/About')),
    private: false,
  },
  {
    path: '/contact',
    element: lazy(() => import('../pages/Contact')),
    private: false,
  },
  {
    path: '/login',
    element: lazy(() => import('../pages/Login')),
    private: false,
  },
  {
    path: '/register',
    element: lazy(() => import('../pages/Register')),
    private: false,
  },
  {
    path: '/help',
    element: lazy(() => import('../pages/Help')),
    private: false,
  },
];

// Configuração de rotas privadas com aninhamento
export const privateRoutes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: lazy(() => import('../pages/Dashboard')),
    private: true,
    children: [
      {
        path: 'profile',
        element: lazy(() => import('../pages/Profile')),
        private: true,
      },
    ],
  },
];

// Exporta todas as rotas combinadas
export const allRoutes: RouteConfig[] = [...publicRoutes, ...privateRoutes];

// Rota para páginas não encontradas
export const notFoundRoute: RouteConfig = {
  path: '*',
  element: lazy(() => import('../pages/NotFound')),
  private: false,
};
