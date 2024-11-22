import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface que define o formato do estado do usuário
interface UserState {
  username: string;
  id: string | null;
  name: string;
  email: string;
  role: string | null;
  loading: boolean; // Indica se alguma ação está sendo processada
  error: string | null; // Armazena mensagens de erro
}

// Estado inicial do usuário
const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  role: null,
  loading: false,
  error: null,
  username: ''
};

// Slice do Redux Toolkit para gerenciar o estado do usuário
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      state.id = action.payload.id ?? state.id;
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
      state.role = action.payload.role ?? state.role;
      state.error = null; // Limpa erros ao atualizar o usuário
    },
    clearUser(state) {
      state.id = null;
      state.name = '';
      state.email = '';
      state.role = null;
      state.error = null;
    },
    updateRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Exporta as actions geradas automaticamente pelo Redux Toolkit
export const { setUser, clearUser, updateRole, setLoading, setError } = userSlice.actions;

// Selectors reutilizáveis
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;

// Exporta o reducer para uso no store do Redux
export default userSlice.reducer;
