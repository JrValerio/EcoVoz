import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const baseStyle = 'text-white hover:text-gray-300 px-4 py-2';
  const activeStyle = 'border-b-2 border-white';

  return (
    <nav className="flex space-x-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        Contact
      </NavLink>
    </nav>
  );
};

export default Navigation;
