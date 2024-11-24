// RouteConfig.ts

import React, { lazy } from 'react';

/**
 * Interface para definir a configuração de uma rota.
 */
export interface RouteConfig {
  /** Caminho da rota. */
  path: string;
  /** Componente a ser renderizado para a rota. */
  element: React.LazyExoticComponent<React.ComponentType>;
  /** Indica se a rota é privada (requer autenticação). */
  private: boolean;
  /** Rotas filhas (opcional, para rotas aninhadas). */
  children?: RouteConfig[];
}

/**
 * Configuração das rotas públicas da aplicação.
 */
export const publicRoutes: RouteConfig[] = [
  { 
    path: '/', 
    element: lazy(() => import('../pages/Home')), 
    private: false 
  },
  { 
    path: '/about', 
    element: lazy(() => import('../pages/About')), 
    private: false 
  },
  { 
    path: '/contact', 
    element: lazy(() => import('../pages/Contact')), 
    private: false 
  },
  { 
    path: '/login', 
    element: lazy(() => import('../pages/Login')), 
    private: false 
  },
  { 
    path: '/register', 
    element: lazy(() => import('../pages/Register')), 
    private: false 
  },
  { 
    path: '/help', 
    element: lazy(() => import('../pages/Help')), 
    private: false 
  },
];

/**
 * Configuração das rotas privadas da aplicação, com suporte a rotas aninhadas.
 */
export const privateRoutes: RouteConfig[] = [
  { 
    path: '/dashboard', 
    element: lazy(() => import('../pages/Dashboard')), 
    private: false,
    children: [
      { 
        path: 'profile', 
        element: lazy(() => import('../pages/Profile')), 
        private: true 
      },
    ]
  },
];

// Combina todas as rotas em um único array
export const allRoutes: RouteConfig[] = [...publicRoutes, ...privateRoutes];

// Rota para lidar com páginas não encontradas (404)
export const notFoundRoute: RouteConfig = { 
  path: '*', 
  element: lazy(() => import('../pages/NotFound')), 
  private: false 
};