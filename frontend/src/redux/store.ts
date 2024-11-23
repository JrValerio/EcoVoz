import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

/**
 * Configuração da store Redux.
 * Inclui o reducer para o estado do usuário e middlewares para serialização e Redux DevTools.
 */
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/loginSuccess'],
        ignoredPaths: ['user.token'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Inferência de tipos para RootState e AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;