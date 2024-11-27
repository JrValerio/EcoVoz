import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Componente que renderiza o rodapé da aplicação.
 * Exibe o copyright, links para páginas da aplicação e link para o LinkedIn.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center py-4 border-t border-gray-700">
      {/* Seção de copyright */}
      <section>
        <p>
          &copy; {currentYear} EcoVoz. {t('footer.copyright')}
        </p>
      </section>

      {/* Seção de navegação */}
      <nav className="mt-2">
        <ul className="flex justify-center space-x-4 text-sm">
          {/* Link para a página Sobre */}
          <li>
            <Link to="/about" className="hover:underline">
              {t('footer.nav.about')}
            </Link>
          </li>

          {/* Link para a página de Contato */}
          <li>
            <Link to="/contact" className="hover:underline">
              {t('footer.nav.contact')}
            </Link>
          </li>

          {/* Link para a página de Links de Recursos */}
          <li>
            <Link to="/links" className="hover:underline">
              {t('footer.nav.resources')}
            </Link>
          </li>

          {/* Link para o LinkedIn */}
          <li>
            <a
              href="https://www.linkedin.com/company/ecovoz-inclusiva"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('footer.nav.linkedin')}
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
