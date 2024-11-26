import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
      'i18next-browser-languagedetector': 'i18next-browser-languagedetector',
    },
  },
  base: './', // Ajuste conforme o ambiente de deploy
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api/auth': {
        target: 'https://ecovoz-d2hi.onrender.com',
        changeOrigin: true,
      },
    },
    cors: true, // Habilita o CORS para chamadas de API
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
      external: ['@reduxjs/toolkit'], // Inclua aqui apenas o que não será empacotado
    },
  },
});
