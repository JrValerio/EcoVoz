import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

/**
 * Configuração da biblioteca de internacionalização i18next.
 * Carrega as traduções, detecta o idioma do usuário e integra com o React.
 */
i18n
  .use(HttpBackend) // Usa o HttpBackend para carregar traduções de um servidor
  .use(LanguageDetector) // Detecta o idioma do usuário (navegador, localStorage)
  .use(initReactI18next) // Inicializa o i18next para React
  .init({
    // Define o idioma padrão caso o idioma do usuário não seja suportado
    fallbackLng: 'en', 
    // Define os idiomas suportados pela aplicação
    supportedLngs: ['en', 'pt'], 

    // Habilita logs de debug em modo de desenvolvimento
    debug: process.env.NODE_ENV === 'development', 

    // Configuração do backend para carregar as traduções
    backend: {
      // Define o caminho para os arquivos de tradução no servidor
      loadPath: '/locales/{{lng}}/translation.json', 
    },

    // Desativa o escape de valores HTML nas traduções (React já faz isso)
    interpolation: {
      escapeValue: false, 
    },

    // Define a ordem de detecção de idioma e onde armazenar o idioma detectado
    detection: {
      // Ordem de detecção: querystring, localStorage, navegador
      order: ['querystring', 'localStorage', 'navigator'], 
      // Armazena o idioma detectado no localStorage
      caches: ['localStorage'], 
    },
  });

export default i18n;