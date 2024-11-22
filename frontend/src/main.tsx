import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './input.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './i18n/i18n';
import App from './App';
import store from './redux/store';
import { initializeApp } from './config/init';
import { ThemeProvider } from './context/ThemeContext'; 
import GoogleAuthProvider from './providers/GoogleAuthProvider';

// Componentes de Feedback Visual
const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600 text-xl">
    Carregando aplicação...
  </div>
);

const ErrorScreen: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-600 text-center">
    <h1 className="text-2xl font-bold text-red-800 mb-4">
      Erro ao carregar a aplicação
    </h1>
    <p className="text-lg">
      {message || 'Por favor, tente novamente mais tarde.'}
    </p>
  </div>
);

// Inicialização da Aplicação
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento 'root' não encontrado no DOM.");
}

const root = ReactDOM.createRoot(rootElement);

async function runApp() {
  root.render(<LoadingScreen />); // Tela de carregamento

  try {
    console.log('Iniciando configuração da aplicação...');
    await initializeApp(); // Configurações iniciais
    console.log('Aplicação inicializada com sucesso.');

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider> {/* Contexto do tema aplicado globalmente */}
            <BrowserRouter>
              <GoogleAuthProvider>
                <App />
              </GoogleAuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Erro durante a inicialização:', error);
    root.render(<ErrorScreen message={(error as Error)?.message} />);
  }

}
runApp();
