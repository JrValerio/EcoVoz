import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

/**
 * Página de Links de Recursos
 * Contém uma lista detalhada de recursos úteis para diferentes tipos de deficiência.
 */
const LinksPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen px-6 py-8 ${
        theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'
      }`}
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">{t('linksPage.title')}</h1>
        <p className="text-lg text-center mt-4">{t('linksPage.subtitle')}</p>
      </header>

      {/* Recursos por Tipo de Deficiência */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">{t('linksPage.auditoryImpairment')}</h2>
        <div className="space-y-4">
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">{t('linksPage.surdosAssociaçao')}</h3>
            <p>{t('linksPage.surdosAssociaçaoDescription')}</p>
            <a
              href="https://www.feneis.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">{t('linksPage.centralInterpretes')}</h3>
            <p>{t('linksPage.centralInterpretesDescription')}</p>
            <a
              href="tel:+5511987654321"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.callNow')}
            </a>
          </div>
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Hand Talk</h3>
            <p>{t('linksPage.handTalkDescription')}</p>
            <a
              href="https://www.handtalk.me"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Surdos Online</h3>
            <p>{t('linksPage.surdosOnlineDescription')}</p>
            <a
              href="https://www.surdosonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
        </div>
      </section>

      {/* Recursos para Deficiência Visual */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">{t('linksPage.visualImpairment')}</h2>
        <div className="space-y-4">
          <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">{t('linksPage.brailleLibrary')}</h3>
            <p>{t('linksPage.brailleLibraryDescription')}</p>
            <a
              href="https://www.braille.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Be My Eyes</h3>
            <p>{t('linksPage.beMyEyesDescription')}</p>
            <a
              href="https://www.bemyeyes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Dorina Nowill</h3>
            <p>{t('linksPage.dorinaNowillDescription')}</p>
            <a
              href="https://www.fundacaodorina.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
        </div>
      </section>

      {/* Recursos para Deficiência Física */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">{t('linksPage.physicalImpairment')}</h2>
        <div className="space-y-4">
          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">{t('linksPage.wheelchairAssociation')}</h3>
            <p>{t('linksPage.wheelchairAssociationDescription')}</p>
            <a
              href="https://www.associacaorodas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Movimento Livre</h3>
            <p>{t('linksPage.movimentoLivreDescription')}</p>
            <a
              href="https://www.movimentolivre.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Instituto Rodrigo Mendes</h3>
            <p>{t('linksPage.rodrigoMendesDescription')}</p>
            <a
              href="https://www.rodrigomendes.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
        </div>
      </section>

      {/* Recursos para Deficiência Intelectual */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">{t('linksPage.intellectualImpairment')}</h2>
        <div className="space-y-4">
          <div className="bg-purple-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">{t('linksPage.apae')}</h3>
            <p>{t('linksPage.apaeDescription')}</p>
            <a
              href="https://www.apaebrasil.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
          <div className="bg-purple-100 dark:bg-gray-800 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold">Portal Inclusão Brasil</h3>
            <p>{t('linksPage.inclusaoBrasilDescription')}</p>
            <a
              href="https://www.inclusaobrasil.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 dark:text-blue-400 underline mt-2"
            >
              {t('linksPage.visitWebsite')}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12">
        <p className="text-sm">
          {t('linksPage.disclaimer')} <br />
          &copy; 2024 EcoVoz. {t('footer.rightsReserved')}
        </p>
      </footer>
    </div>
  );
};

export default LinksPage;
