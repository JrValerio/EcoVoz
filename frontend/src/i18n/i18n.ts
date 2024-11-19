import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Carrega arquivos JSON de tradução via HTTP
  .use(LanguageDetector) // Detecta idioma do navegador automaticamente
  .use(initReactI18next) // Integração com React
  .init({
    fallbackLng: 'en', // Idioma padrão
    debug: true, // Ativa logs de debug
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Caminho para os arquivos de tradução
    },
    interpolation: {
      escapeValue: false, // React já escapa os valores automaticamente
    },
  });

export default i18n;
