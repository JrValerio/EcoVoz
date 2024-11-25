import React, { lazy } from 'react';

/**
 * Interface para definir a configuração de uma rota.
 */
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType>;
  private: boolean;
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
  {
    path: '/gesture-recognition',
    element: lazy(() => import('../pages/GestureRecognition')),
    private: false,
  },
  {
    path: '/links',  
    element: lazy(() => import('../pages/LinksPage')),
    private: false,
  },
];

/**
 * Configuração das rotas privadas da aplicação, com suporte a rotas aninhadas.
 */
export const privateRoutes: RouteConfig[] = [
  { 
    path: '/dashboard', 
    element: lazy(() => import('../pages/Dashboard')), 
    private: true,  // Corrigido para tornar a rota privada
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
