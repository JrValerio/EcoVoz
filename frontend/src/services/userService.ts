import api from './api';

// Serviço para atualizar o perfil do usuário
export const updateUserProfile = async (
  userId: string,
  updates: { name?: string; email?: string }
) => {
  try {
    const response = await api.put(`/api/users/${userId}`, updates); // API para atualizar o usuário
    return response.data; // Retorna os dados atualizados
  } catch (error: unknown) {
    console.error('Erro ao atualizar o perfil:', error);
    throw new Error('Erro ao atualizar o perfil. Tente novamente.');
  }
};
