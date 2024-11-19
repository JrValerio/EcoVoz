import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './i18n/i18n'; 
import './input.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import store from './redux/store';

// Verifica se o elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Elemento 'root' não encontrado no DOM.");
}

// Simula carregamento de configurações
async function loadAppSettings() {
  console.log('Carregando configurações da aplicação...');
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

// Simula inicialização de autenticação
async function initializeAuth() {
  console.log('Verificando autenticação...');
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

// Inicializa a aplicação
async function initializeApp() {
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerText = 'Carregando aplicação...';
  document.body.appendChild(loadingScreen);

  try {
    console.log('Inicializando aplicação...');
    await Promise.all([loadAppSettings(), initializeAuth()]);
    console.log('Inicialização concluída!');

    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      );
    } else {
      throw new Error("Elemento 'root' não encontrado no DOM.");
    }
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    const errorMessage = document.createElement('div');
    errorMessage.innerText = 'Erro ao carregar a aplicação. Por favor, tente novamente.';
    document.body.appendChild(errorMessage);
  } finally {
    document.body.removeChild(loadingScreen);
  }
}
// Chama a inicialização
initializeApp();
