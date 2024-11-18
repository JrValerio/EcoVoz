import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Carrega traduções via HTTP (opcional)
  .use(LanguageDetector) // Detecta o idioma do navegador automaticamente
  .use(initReactI18next) // Integra com React
  .init({
    fallbackLng: 'en', // Idioma padrão se o idioma do usuário não for encontrado
    supportedLngs: ['en', 'pt'], // Idiomas suportados
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // Caminho dos arquivos de tradução
    },
    interpolation: {
      escapeValue: false // React já escapa os valores automaticamente
    }
  });

export default i18n;
