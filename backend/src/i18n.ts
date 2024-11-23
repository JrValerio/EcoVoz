import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

// Configuração do i18next
i18n
  .use(Backend) // Usa o backend para carregar traduções do sistema de arquivos
  .use(LanguageDetector) // Detecta o idioma do usuário
  .init({
    ns: ['translation'], // Define o namespace 'translation'
    defaultNS: 'translation', // Define 'translation' como namespace padrão
    fallbackLng: 'en', // Define 'en' (inglês) como idioma fallback
    supportedLngs: ['en', 'pt'], // Define os idiomas suportados ('en' e 'pt')
    preload: ['en', 'pt'], // Pré-carrega os idiomas suportados
    backend: {
      loadPath: './src/locales/{{lng}}/{{ns}}.json', // Define o caminho para os arquivos de tradução
    },
    detection: {
      order: ['header', 'querystring', 'cookie', 'navigator'], // Define a ordem de detecção do idioma
      caches: ['cookie'], // Armazena o idioma detectado em um cookie
    },
    interpolation: {
      escapeValue: false, // Desativa o escape de valores HTML nas traduções
    },
  });

export default i18n;