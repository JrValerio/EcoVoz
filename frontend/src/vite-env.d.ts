/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  // Adicione outras variáveis conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
