import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuração do Vite
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
      'i18next-browser-languagedetector': require.resolve('i18next-browser-languagedetector'),
      'i18next-http-backend': require.resolve('i18next-http-backend'),
      'i18next': require.resolve('i18next'),
      'react-i18next': require.resolve('react-i18next'),
      'react-redux': require.resolve('react-redux'),
      'react-toastify': require.resolve('react-toastify'),
      'redux': require.resolve('redux'),
      'redux-thunk': require.resolve('redux-thunk'),
      'react-router-dom': require.resolve('react-router-dom'),
      'react-router-dom/server': require.resolve('react-router-dom/server'),
      'react-router-dom/client': require.resolve('react-router-dom/client'),
      'react-router-dom/server/matchRoutes': require.resolve('react-router-dom/server/matchRoutes'),
      'react-router-dom/server/getRouteParams': require.resolve('react-router-dom/server/getRouteParams'),
      'react-router-dom/server/renderRoutes': require.resolve('react-router-dom/server/renderRoutes'),
      'react-router-dom/server/renderMatches': require.resolve('react-router-dom/server/renderMatches'),
      
    },
  },
  base: './', // Define o diretório raiz do projeto
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'), 
      external: ['@reduxjs/toolkit', 'react-toastify', 'react-i18next', 
        '@vitejs/plugin-react', 'react-dom', 'react-redux'],
      
    },
  },
});
