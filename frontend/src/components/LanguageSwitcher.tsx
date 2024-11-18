import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        EN
      </button>
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
