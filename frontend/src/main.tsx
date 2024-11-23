import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Importações 1  de estilo e polyfills
import './input.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Importações da aplicação
import './i18n/i18n'; // Configuração de internacionalização
import App from './App'; // Componente principal da aplicação
import store from './redux/store'; // Store do Redux
import { initializeApp } from './config/init'; // Função de inicialização da aplicação
import { ThemeProvider } from './context/ThemeContext'; // Provedor de tema
import GoogleAuthProvider from './providers/GoogleAuthProvider'; // Provedor de autenticação do Google

/**
 * Componente de tela de carregamento.
 * Exibe uma mensagem simples enquanto a aplicação está sendo carregada.
 */
const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600 text-xl">
    Carregando aplicação...
  </div>
);

/**
 * Componente de tela de erro.
 * Exibe uma mensagem de erro caso ocorra algum problema durante a inicialização da aplicação.
 * @param message Mensagem de erro a ser exibida.
 */
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

// Obtém o elemento root do DOM
const rootElement = document.getElementById('root');

// Verifica se o elemento root existe
if (!rootElement) {
  throw new Error("Elemento 'root' não encontrado no DOM.");
}

// Cria uma instância do ReactDOM
const root = ReactDOM.createRoot(rootElement);

/**
 * Função assíncrona para executar a aplicação.
 * Renderiza a tela de carregamento, inicializa a aplicação e renderiza o componente principal.
 * Em caso de erro, renderiza a tela de erro.
 */
async function runApp() {
  // Renderiza a tela de carregamento
  root.render(<LoadingScreen />);

  try {
    // Inicializa a aplicação
    console.log('Iniciando configuração da aplicação...');
    await initializeApp();
    console.log('Aplicação inicializada com sucesso.');

    // Renderiza o componente principal da aplicação
    root.render(
      <React.StrictMode>
        <Provider store={store}> {/* Provedor do Redux */}
          <ThemeProvider> {/* Provedor de tema */}
            <BrowserRouter> {/* Provedor de roteamento */}
              <GoogleAuthProvider> {/* Provedor de autenticação do Google */}
                <App /> {/* Componente principal */}
              </GoogleAuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );
  } catch (error: unknown) {
    const errorWithMessage = error as { message: string };
    root.render(<ErrorScreen message={errorWithMessage.message} />);
  }
}

// Executa a aplicação
runApp();