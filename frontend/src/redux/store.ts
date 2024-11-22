import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Configuração do store Redux
const store = configureStore({
  reducer: {
    user: userReducer, // Reducer para gerenciar o estado do usuário
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/loginSuccess'], // Exemplo de ações ignoradas
        ignoredPaths: ['user.token'], // Ignorar caminhos específicos no estado
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Ativar Redux DevTools em desenvolvimento
});

// Tipos globais do Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
