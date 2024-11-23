import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface que define o formato do estado do usuário
interface UserState {
  username: string;
  id: string | null;
  name: string;
  email: string;
  role: string | null;
  loading: boolean;
  error: string | null;
}

// Estado inicial do usuário
const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  role: null,
  loading: false,
  error: null,
  username: '',
};

/**
 * Slice do Redux Toolkit para gerenciar o estado do usuário.
 * Contém reducers para definir, limpar, atualizar e gerenciar o estado de carregamento e erro do usuário.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Define o estado do usuário com base no payload da action.
     * @param state O estado atual do usuário.
     * @param action A action contendo o novo estado do usuário.
     */
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      state.id = action.payload.id ?? state.id;
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
      state.role = action.payload.role ?? state.role;
      state.error = null;
    },

    /**
     * Limpa o estado do usuário, definindo todas as propriedades para seus valores iniciais.
     * @param state O estado atual do usuário.
     */
    clearUser(state) {
      state.id = null;
      state.name = '';
      state.email = '';
      state.role = null;
      state.error = null;
    },

    /**
     * Atualiza a role do usuário.
     * @param state O estado atual do usuário.
     * @param action A action contendo a nova role do usuário.
     */
    updateRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },

    /**
     * Define o estado de carregamento do usuário.
     * @param state O estado atual do usuário.
     * @param action A action contendo o estado de carregamento.
     */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    /**
     * Define a mensagem de erro do usuário.
     * @param state O estado atual do usuário.
     * @param action A action contendo a mensagem de erro.
     */
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Exporta as actions e o reducer
export const { setUser, clearUser, updateRole, setLoading, setError } = userSlice.actions;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;