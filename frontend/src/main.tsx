import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
<<<<<<< HEAD
import './output.css';
=======
import './assets/styles/global.css';
>>>>>>> c5eaf2d2f34e4ab998d3b5749b22a754c50f7ee0

// Inicializa a aplicação React com o Redux Provider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
