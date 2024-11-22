import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Configuração do i18next
i18n
  .use(HttpBackend) // Carrega arquivos de tradução remotamente via HTTP
  .use(LanguageDetector) // Detecta automaticamente o idioma do navegador
  .use(initReactI18next) // Integração com React
  .init({
    // Idiomas
    fallbackLng: 'en', // Idioma padrão caso o detectado não esteja disponível
    supportedLngs: ['en', 'pt'], // Lista de idiomas suportados
    debug: process.env.NODE_ENV === 'development', // Debug ativado apenas em ambiente de desenvolvimento

    // Configuração do backend
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Caminho para os arquivos de tradução
    },

    // Configuração da interpolação
    interpolation: {
      escapeValue: false, // React já faz a sanitização automaticamente
    },

    // Configuração de detecção de idioma
    detection: {
      order: ['querystring', 'localStorage', 'navigator'], // Ordem de detecção
      caches: ['localStorage'], // Onde armazenar o idioma detectado
    },
  });

export default i18n;
