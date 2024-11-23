import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Componente que permite ao usuário alternar entre os idiomas suportados pela aplicação.
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  /**
   * Função para alternar o idioma da aplicação.
   * @param lng O código do idioma para o qual alternar (ex: 'en', 'pt').
   */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      {/* Botão para alternar para inglês */}
      <button
        onClick={() => changeLanguage('en')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        EN
      </button>

      {/* Botão para alternar para português */}
      <button
        onClick={() => changeLanguage('pt')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;