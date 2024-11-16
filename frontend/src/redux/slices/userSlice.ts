import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface que define o formato do estado do usuário
interface UserState {
  id: string | null; // Identificação única do usuário
  name: string; // Nome do usuário
  email: string; // Email do usuário
  role: string | null; // Role do usuário (ex.: 'admin', 'user', etc.)
}

// Estado inicial do usuário
const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  role: null,
};

// Slice do Redux Toolkit para gerenciar o estado do usuário
const userSlice = createSlice({
  name: 'user', // Nome do slice
  initialState, // Estado inicial
  reducers: {
    /**
     * Atualiza os dados do usuário no estado.
     * Permite atualizações parciais, ou seja, apenas os campos fornecidos na ação serão alterados.
     */
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      state.id = action.payload.id ?? state.id;
      state.name = action.payload.name ?? state.name;
      state.email = action.payload.email ?? state.email;
      state.role = action.payload.role ?? state.role;
    },

    /**
     * Redefine o estado do usuário para os valores iniciais.
     */
    clearUser(state) {
      state.id = null;
      state.name = '';
      state.email = '';
      state.role = null;
    },

    /**
     * Atualiza apenas o campo `role` do estado do usuário.
     */
    updateRole(state, action: PayloadAction<string | null>) {
      state.role = action.payload;
    },
  },
});

// Exporta as actions geradas automaticamente pelo Redux Toolkit
export const { setUser, clearUser, updateRole } = userSlice.actions;

// Exporta o reducer para uso na store do Redux
export default userSlice.reducer;
