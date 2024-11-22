import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { RootState } from './store'; // Importe o tipo RootState do seu arquivo de configuração do store
import userReducer from './slices/userSlice';

// Função para criar o mockStore com estado inicial e reducers customizados
export const createMockStore = (
  preloadedState?: Partial<RootState>, // Estado inicial opcional
  customReducers?: ReducersMapObject,   // Reducers customizados opcionais
) => {
  const rootReducer = combineReducers({
    [userReducer.name]: userReducer,
    ...customReducers,
  });

  return configureStore({
    reducer: rootReducer,
    preloadedState, // Estado inicial
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Desativa verificações de serialização
      }),
  });
};

// MockStore padrão
const mockStore = createMockStore();

export type MockRootState = ReturnType<typeof mockStore.getState>;
export type MockAppDispatch = typeof mockStore.dispatch;

export default mockStore;
