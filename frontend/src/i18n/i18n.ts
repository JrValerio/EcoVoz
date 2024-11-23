import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

/**
 * Configuração da biblioteca de internacionalização i18next.
 * Carrega as traduções, detecta o idioma do usuário e integra com o React.
 */
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Define o idioma padrão e os idiomas suportados
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],

    // Habilita logs de debug em ambiente de desenvolvimento
    debug: process.env.NODE_ENV === 'development',

    // Configuração do backend para carregar as traduções
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    // Desativa o escape de valores, pois o React já faz a sanitização
    interpolation: {
      escapeValue: false,
    },

    // Define a ordem de detecção de idioma e onde armazenar o idioma detectado
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;