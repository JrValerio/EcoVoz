import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const linkStyle =
    'text-blue-500 hover:text-blue-700 px-2 py-1 rounded transition';

  return (
    <nav className="navigation">
      <NavLink to="/" className={linkStyle} end>
        Home
      </NavLink>
      <NavLink to="/about" className={linkStyle}>
        About
      </NavLink>
      <NavLink to="/contact" className={linkStyle}>
        Contact
      </NavLink>
    </nav>
  );
};

export default Navigation;
