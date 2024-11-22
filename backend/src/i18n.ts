import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

i18n
  .use(Backend) // Carrega arquivos de tradução do sistema de arquivos
  .use(LanguageDetector) // Detecta idioma a partir do cabeçalho HTTP ou query string
  .init({
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json', // Caminho para os arquivos de tradução
    },
    supportedLngs: ['en', 'pt'], // Idiomas suportados
    fallbackLng: 'en', // Idioma padrão
    preload: ['en', 'pt'], // Pré-carrega os idiomas disponíveis
    debug: true, // Logs de debug
    interpolation: {
      escapeValue: false, // Não escapa valores (para HTML)
    },
  });

export default i18n;
