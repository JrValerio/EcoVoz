import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { RootState } from './store';
import userReducer from './slices/userSlice';

/**
 * Cria um mockStore para testes com estado inicial e reducers customizados.
 * @param preloadedState Estado inicial da store (opcional).
 * @param customReducers Reducers adicionais para a store (opcional).
 * @returns Um mockStore configurado.
 */
export const createMockStore = (
  preloadedState?: Partial<RootState>,
  customReducers?: ReducersMapObject,
) => {
  const rootReducer = combineReducers({
    [userReducer.name]: userReducer,
    ...customReducers,
  });

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Cria um mockStore padrão
const mockStore = createMockStore();

// Tipos para o mockStore
export type MockRootState = ReturnType<typeof mockStore.getState>;
export type MockAppDispatch = typeof mockStore.dispatch;

export default mockStore;