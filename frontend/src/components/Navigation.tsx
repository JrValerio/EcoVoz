import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Interface para definir a estrutura de cada rota
interface Route {
  path: string; // Caminho da rota
  labelKey: string; // Chave para tradução do rótulo
}

/**
 * Componente de navegação que renderiza links para as diferentes rotas da aplicação.
 * Os links são traduzidos usando o i18next e recebem um estilo ativo quando a rota correspondente está ativa.
 */
const Navigation: React.FC = () => {
  const { t } = useTranslation();

  // Definição das rotas da aplicação
  const routes: Route[] = [
    { path: '/', labelKey: 'navigation.home' },
    { path: '/about', labelKey: 'navigation.about' },
    { path: '/contact', labelKey: 'navigation.contact' },
  ];

  // Estilos para os links (base e ativo)
  const baseStyle = 'text-white hover:text-gray-300 px-4 py-2';
  const activeStyle = 'border-b-2 border-white';

  return (
    <nav className="flex space-x-4">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : ''}`
          }
          end={route.path === '/'} // Define como 'end' para a rota raiz ('/')
          aria-current="page" // Indica a página atual para acessibilidade
        >
          {t(route.labelKey)} {/* Rótulo traduzido */}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
