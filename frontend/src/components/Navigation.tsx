import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = [
    { path: '/', labelKey: 'navigation.home' },
    { path: '/about', labelKey: 'navigation.about' },
    { path: '/contact', labelKey: 'navigation.contact' },
    { path: '/gesture-recognition', labelKey: 'navigation.gestureRecognition' },
  ];

  const baseStyle =
    'text-white hover:text-gray-300 px-4 py-2 no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-all duration-200';
  const activeStyle = 'font-bold';

  return (
    <nav className="relative">
      {/* Botão Hamburguer para dispositivos móveis */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white focus:outline-none"
        aria-label={menuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Lista de Navegação */}
      <ul
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:items-center absolute md:static top-20 left-1/2 transform -translate-x-1/2 md:transform-none w-4/5 md:w-auto bg-blue-600 md:bg-transparent z-20 p-4 md:p-0 shadow-lg md:shadow-none rounded-lg transition-all duration-300`}
        role="menu"
      >
        {routes.map((route) => (
          <li key={route.path} role="menuitem" className="mb-2 md:mb-0">
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : ''}`
              }
              end={route.path === '/'}
              aria-current={({ isActive }: { isActive: boolean }) =>
                isActive ? 'page' : undefined
              }
            >
              {t(route.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
