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
      'i18next-browser-languagedetector': 'i18next-browser-languagedetector',      
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
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux'],
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
