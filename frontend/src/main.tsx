import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n/i18n';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App';
import store from './redux/store';
import './input.css';

// Inicializa a aplicação React com o Redux Provider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
