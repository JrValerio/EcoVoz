import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Route {
  path: string;
  labelKey: string; // Chave para o texto traduzido
}

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  // Rotas definidas dinamicamente
  const routes: Route[] = [
    { path: '/', labelKey: 'Home' },
    { path: '/about', labelKey: 'About' },
    { path: '/contact', labelKey: 'Contact' },
  ];

  // Classes base e ativas
  const baseStyle = 'text-white hover:text-gray-300 px-4 py-2';
  const activeStyle = 'border-b-2 border-white';

  return (
    <nav className="flex space-x-4">
      {routes.map((route) => (
        <NavLink
        key={route.path}
        to={route.path}
        className={({ isActive }: { isActive: boolean }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
        end={route.path === '/'} 
        aria-current="page"
      >
        {t(route.labelKey)}
      </NavLink>   
          
      ))}
    </nav>
  );
};

export default Navigation;
