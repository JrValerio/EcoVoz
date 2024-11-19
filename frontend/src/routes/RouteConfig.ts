import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

// Interface para configuração de rotas
export interface RouteConfig {
  path: string; // Caminho da rota
  element: React.ComponentType; // Componente associado à rota
  private: boolean; // Define se a rota é protegida
}

// Configuração de rotas públicas
export const publicRoutes: RouteConfig[] = [
  { path: '/', element: Home, private: false },
  { path: '/about', element: About, private: false },
  { path: '/contact', element: Contact, private: false },
  { path: '/login', element: Login, private: false },
];

// Configuração de rotas privadas
export const privateRoutes: RouteConfig[] = [
  { path: '/dashboard', element: Dashboard, private: true },
];

// Exporta todas as rotas combinadas
export const allRoutes: RouteConfig[] = [...publicRoutes, ...privateRoutes];

// Rota para páginas não encontradas
export const notFoundRoute: RouteConfig = { path: '*', element: NotFound, private: false };
