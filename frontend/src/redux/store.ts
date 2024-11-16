import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';

// Configuração do store Redux
const store = configureStore({
  reducer: {
    user: userReducer, // Reducer para gerenciar o estado do usuário
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desativa verificações de serialização se necessário
    }),
  devTools: import.meta.env.VITE_APP_ENV !== 'production', // Habilita Redux DevTools em ambientes de desenvolvimento
});

// Tipos para o estado global e dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
