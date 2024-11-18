import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center py-4 border-t border-gray-700">
      <section>
        <p>&copy; {currentYear} EcoVoz. All rights reserved.</p>
      </section>
      <nav className="mt-2">
        <ul className="flex justify-center space-x-4 text-sm">
          <li>
            <Link to="/about" className="hover:underline">
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contato
            </Link>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sua-pagina"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
